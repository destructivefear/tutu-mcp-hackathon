import { callMcpTool } from "@/lib/tutu-mcp";

export type ModeKey = "plane" | "train" | "bus" | "suburban";

const MODE_TO_TRANSPORT: Record<ModeKey, string> = {
  plane: "avia",
  train: "railway",
  bus: "bus",
  suburban: "etrain",
};

const TRANSPORT_TO_MODE: Record<string, ModeKey> = {
  avia: "plane",
  railway: "train",
  bus: "bus",
  etrain: "suburban",
};

export interface UrgentTravelInput {
  from: string;
  to: string;
  earliestDate: string; // YYYY-MM-DD — today, lower bound of the search window
  deadlineDate: string; // YYYY-MM-DD — day the traveller must arrive by
  deadlineTime: string | null; // "HH:00" or null
  modes: ModeKey[];
  directOnly: boolean;
  priceMax: number | null;
}

// What the client sends back verbatim to /api/urgent-travel/checkout when the
// traveller clicks "Выбрать" — `ref` is opaque, forwarded as-is into
// create_checkout_link's arguments. Offers only carry a ready-made
// `checkout_url` for etrain; every other mode needs this extra round trip
// to land on the actual seat/room-selection page instead of a bare search
// results listing.
export interface CheckoutPayload {
  transport: string;
  ref: Record<string, unknown>;
}

export interface ResultCard {
  key: "fastest" | "cheapest";
  badge: string;
  mode: ModeKey;
  price: number;
  duration: string;
  departureTime: string;
  departureStation: string;
  arrivalTime: string;
  arrivalStation: string;
  hasTransfer: boolean;
  checkoutPayload: CheckoutPayload | null;
  searchResultsUrl: string | null;
}

export interface ExtraRow {
  key: string;
  mode: ModeKey;
  duration: string;
  price: number;
  departureTime: string;
  departureStation: string;
  arrivalTime: string;
  arrivalStation: string;
  hasTransfer: boolean;
  checkoutPayload: CheckoutPayload | null;
  searchResultsUrl: string | null;
}

export interface UrgentTravelResult {
  count: number;
  cards: ResultCard[];
  extraRows: ExtraRow[];
  deadlineMissed: boolean;
  unavailableModes: ModeKey[];
  resolvedFrom: string | null;
  resolvedTo: string | null;
}

interface McpOffer {
  offer_id: string;
  transport: string;
  price: { amount: number; currency: string };
  duration_min: number;
  search_results_url?: string;
  checkout_ref?: Record<string, unknown>;
  segments_count?: number;
  departure_at: string;
  arrival_at: string;
  legs?: Array<{ from: string; to: string }>;
}

interface McpMultitransportResponse {
  variants: McpOffer[];
  meta: {
    from: { name: string };
    to: { name: string };
    unavailable?: Array<{ mode: string }>;
  };
}

const MONTH_SHORT = [
  "янв", "фев", "мар", "апр", "мая", "июн",
  "июл", "авг", "сен", "окт", "ноя", "дек",
];

// The MCP always returns departure_at/arrival_at with the UTC offset of the
// station itself (e.g. a Moscow departure and a Yekaterinburg arrival carry
// different offsets on the same offer) — so reading the wall-clock digits
// straight out of the ISO string, with no Date()/timezone math, already IS
// that point's local time. Converting through Date() would silently re-cast
// it into the browser's own timezone instead.
function formatLocal(iso: string): string {
  const day = Number(iso.slice(8, 10));
  const month = Number(iso.slice(5, 7));
  const time = iso.slice(11, 16);
  return `${day} ${MONTH_SHORT[month - 1]}, ${time}`;
}

// `legs[].from`/`to` shapes differ per mode — rail/avia/etrain send
// "City — Station name (internal id)" (avia airports add a trailing
// ", терм. B" AFTER the code, e.g. "Шереметьево (SVO), терм. B"), bus sends
// a bare stop name with no city prefix at all, and etrain occasionally
// falls back to "City, <code>" when it has no real station name. The city
// itself is already known from the search form, so this keeps only the
// station/terminal part: it drops internal ids and IATA-style codes
// (always a bare alphanumeric token in parens, never real words) wherever
// they appear — not just at the end — so a trailing terminal note survives;
// a bare numeric fallback isn't a station name, so it's dropped rather than
// shown as noise.
function stationLabel(raw: string | undefined): string {
  if (!raw) return "";
  let label = raw.replace(/\s*\(\w{2,10}\)/g, "");
  const dashIndex = label.indexOf(" — ");
  if (dashIndex !== -1) label = label.slice(dashIndex + 3);
  if (/,\s*\d+$/.test(label)) return "";
  return label.trim();
}

function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h} ч ${String(m).padStart(2, "0")} м`;
}

// The MCP only takes a single `departure_date` per call — there is no
// "arrive by" search. "When do I need to be there" means the traveller may
// depart any day from now through the deadline (tonight included), so every
// date in that window has to be queried and merged before ranking by
// price/duration — searching only the deadline day itself would hide a
// same-night departure that gets there just as fast or faster.
function enumerateDates(from: string, to: string): string[] {
  const dates: string[] = [];
  const cur = new Date(`${from}T00:00:00Z`);
  const end = new Date(`${to}T00:00:00Z`);
  if (Number.isNaN(cur.getTime()) || Number.isNaN(end.getTime()) || cur > end) {
    return [to];
  }
  while (cur.getTime() <= end.getTime()) {
    dates.push(cur.toISOString().slice(0, 10));
    cur.setUTCDate(cur.getUTCDate() + 1);
  }
  return dates;
}

export async function searchUrgentTravel(input: UrgentTravelInput): Promise<UrgentTravelResult> {
  const dates = enumerateDates(input.earliestDate, input.deadlineDate);

  const responses = await Promise.all(
    dates.map((date) =>
      callMcpTool<McpMultitransportResponse>("search_multitransport", {
        origin: input.from,
        destination: input.to,
        departure_date: date,
        modes: input.modes.map((m) => MODE_TO_TRANSPORT[m]),
        direct_only: input.directOnly,
        price_max: input.priceMax,
        optimize_for: "price",
        page_size: 30,
      }),
    ),
  );

  const offers = responses.flatMap((r) => r.variants ?? []);
  const unavailableModes = Array.from(
    new Set(
      responses
        .flatMap((r) => r.meta.unavailable ?? [])
        .map((u) => TRANSPORT_TO_MODE[u.mode])
        .filter((m): m is ModeKey => Boolean(m)),
    ),
  );
  const resolvedFrom = responses.find((r) => r.meta.from?.name)?.meta.from?.name ?? null;
  const resolvedTo = responses.find((r) => r.meta.to?.name)?.meta.to?.name ?? null;

  let deadlineMissed = false;
  let effective = offers;

  if (offers.length > 0) {
    const time = input.deadlineTime ?? "23:59";
    const offset = offers[0].arrival_at.slice(-6);
    const deadlineIso = `${input.deadlineDate}T${time}:00${offset}`;
    const deadlineMs = new Date(deadlineIso).getTime();
    const filtered = offers.filter((o) => new Date(o.arrival_at).getTime() <= deadlineMs);

    if (filtered.length > 0) {
      effective = filtered;
    } else {
      deadlineMissed = true;
      effective = [...offers].sort(
        (a, b) => new Date(a.arrival_at).getTime() - new Date(b.arrival_at).getTime(),
      );
    }
  }

  if (effective.length === 0) {
    return {
      count: 0,
      cards: [],
      extraRows: [],
      deadlineMissed: false,
      unavailableModes,
      resolvedFrom,
      resolvedTo,
    };
  }

  const toCardFields = (o: McpOffer) => ({
    mode: TRANSPORT_TO_MODE[o.transport],
    price: o.price.amount,
    duration: formatDuration(o.duration_min),
    departureTime: formatLocal(o.departure_at),
    departureStation: stationLabel(o.legs?.[0]?.from),
    arrivalTime: formatLocal(o.arrival_at),
    arrivalStation: stationLabel(o.legs?.[0]?.to),
    hasTransfer: (o.segments_count ?? 1) > 1,
    // create_checkout_link's default mode opens the seat/room-selection page —
    // no seats or passengers required up front — which is what "Выбрать"
    // should land on. o.checkout_url doesn't cover that: search_multitransport
    // only fills it in for etrain, so avia/rail/bus offers need this payload
    // resolved into a real link on demand, at click time.
    checkoutPayload: o.checkout_ref ? { transport: o.transport, ref: o.checkout_ref } : null,
    searchResultsUrl: o.search_results_url ?? null,
  });

  const cheapestOffer = effective.reduce((a, b) => (b.price.amount < a.price.amount ? b : a));
  // Once the deadline is already unreachable, "shortest duration" is the wrong
  // headline metric — a 1h flight that departs at 23:35 and lands after
  // midnight is not more useful than a slower option that actually arrives
  // sooner. In that fallback the primary card should be whichever offer gets
  // there first in absolute terms (`effective` is already arrival-sorted).
  const fastestOffer = deadlineMissed
    ? effective[0]
    : effective.reduce((a, b) => (b.duration_min < a.duration_min ? b : a));

  const cards: ResultCard[] = [
    {
      key: "fastest",
      badge: deadlineMissed ? "Прибудет раньше всех" : "Быстрее всего",
      ...toCardFields(fastestOffer),
    },
    { key: "cheapest", badge: "Дешевле всего", ...toCardFields(cheapestOffer) },
  ];

  const usedIds = new Set([fastestOffer.offer_id, cheapestOffer.offer_id]);
  const extraRows: ExtraRow[] = effective
    .filter((o) => !usedIds.has(o.offer_id))
    .sort((a, b) =>
      deadlineMissed
        ? new Date(a.arrival_at).getTime() - new Date(b.arrival_at).getTime()
        : a.price.amount - b.price.amount,
    )
    .map((o) => ({
      key: o.offer_id,
      ...toCardFields(o),
    }));

  return {
    count: effective.length,
    cards,
    extraRows,
    deadlineMissed,
    unavailableModes,
    resolvedFrom,
    resolvedTo,
  };
}
