import { searchUrgentTravel, type ModeKey } from "@/lib/urgent-travel-search";

const VALID_MODES: ModeKey[] = ["plane", "train", "bus", "suburban"];

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Некорректное тело запроса" }, { status: 400 });
  }

  const from = typeof body.from === "string" ? body.from.trim() : "";
  const to = typeof body.to === "string" ? body.to.trim() : "";
  const earliestDate = typeof body.earliestDate === "string" ? body.earliestDate : "";
  const deadlineDate = typeof body.deadlineDate === "string" ? body.deadlineDate : "";
  const deadlineTime = typeof body.deadlineTime === "string" ? body.deadlineTime : null;
  const modes = Array.isArray(body.modes)
    ? body.modes.filter((m): m is ModeKey => VALID_MODES.includes(m as ModeKey))
    : [];
  const directOnly = body.directOnly === true;
  const priceMax = typeof body.priceMax === "number" ? body.priceMax : null;

  if (!from || !to) {
    return Response.json({ error: "Укажите города отправления и назначения" }, { status: 400 });
  }
  if (!deadlineDate) {
    return Response.json({ error: "Укажите дату" }, { status: 400 });
  }
  if (modes.length === 0) {
    return Response.json({ error: "Выберите хотя бы один вид транспорта" }, { status: 400 });
  }

  try {
    const result = await searchUrgentTravel({
      from,
      to,
      earliestDate: earliestDate || deadlineDate,
      deadlineDate,
      deadlineTime,
      modes,
      directOnly,
      priceMax,
    });
    return Response.json(result);
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Не удалось получить данные" },
      { status: 502 },
    );
  }
}
