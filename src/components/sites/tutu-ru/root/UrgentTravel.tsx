"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  SwitchArrowsIcon,
  ChevronDownIcon,
  ClockIcon,
  CalendarIcon,
} from "@/components/sites/tutu-ru/shared/MiscIcons";
import type { ModeKey, ResultCard, UrgentTravelResult } from "@/lib/urgent-travel-search";
import "./urgent-travel.css";

const MODES: Record<ModeKey, { label: string; genitive: string; img: string }> = {
  plane: { label: "Самолёт", genitive: "самолёты", img: "/sites/tutu-ru/root/images/mode-plane.png" },
  train: { label: "Поезд", genitive: "поезда", img: "/sites/tutu-ru/root/images/mode-train.png" },
  bus: { label: "Автобус", genitive: "автобусы", img: "/sites/tutu-ru/root/images/mode-bus.png" },
  suburban: { label: "Электрички", genitive: "электрички", img: "/sites/tutu-ru/root/images/mode-suburban.png" },
};

const ALL_MODES: ModeKey[] = ["plane", "train", "bus", "suburban"];

const BADGE_IMAGE: Record<ResultCard["key"], string> = {
  fastest: "/sites/tutu-ru/root/images/badge-fastest.png",
  cheapest: "/sites/tutu-ru/root/images/badge-cheap.png",
};

const CITIES = [
  "Москва",
  "Санкт-Петербург",
  "Казань",
  "Нижний Новгород",
  "Екатеринбург",
  "Новосибирск",
  "Самара",
  "Ростов-на-Дону",
  "Краснодар",
  "Сочи",
  "Воронеж",
  "Пермь",
  "Уфа",
  "Волгоград",
  "Калининград",
  "Тула",
  "Ярославль",
  "Рязань",
  "Тверь",
  "Владимир",
  "Псков",
  "Великий Новгород",
  "Петрозаводск",
  "Мурманск",
];

const QUICK_PICK_CITIES = ["Санкт-Петербург", "Москва"];

const MONTH_SHORT = [
  "янв", "фев", "мар", "апр", "мая", "июн",
  "июл", "авг", "сен", "окт", "ноя", "дек",
];
const WD_SHORT = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
const TIME_OPTIONS = Array.from({ length: 24 }, (_, h) => `${String(h).padStart(2, "0")}:00`);

const BUDGET_OPTIONS = [
  { value: "unlimited", label: "Не ограничен" },
  { value: "5000", label: "До 5 000 ₽" },
  { value: "10000", label: "До 10 000 ₽" },
  { value: "20000", label: "До 20 000 ₽" },
];

const TRANSFER_OPTIONS = [
  { value: "any", label: "С пересадками" },
  { value: "direct", label: "Без пересадок" },
] as const;

function plural(n: number, one: string, few: string, many: string) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function addDays(d: Date, n: number) {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + n);
  return copy;
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function toDateParam(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

interface CityComboboxProps {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  hideLabel?: boolean;
  quickPicks?: string[];
  error?: string;
}

function CityCombobox({ id, label, value, placeholder, onChange, hideLabel, quickPicks, error }: CityComboboxProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);

  const query = value.trim().toLowerCase();
  const exactMatch = CITIES.some((c) => c.toLowerCase() === query);
  const filtered =
    query === "" || exactMatch ? CITIES : CITIES.filter((c) => c.toLowerCase().includes(query));

  useEffect(() => {
    if (active < 0) return;
    listRef.current
      ?.querySelector(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const select = (city: string) => {
    onChange(city);
    setOpen(false);
    setActive(-1);
  };

  return (
    <div className="ut-field ut-combo">
      <span className={hideLabel ? "ut-label ut-sr" : "ut-label"} id={`${id}-label`}>
        {label}
      </span>
      <input
        id={id}
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-autocomplete="list"
        aria-activedescendant={active >= 0 ? `${id}-opt-${active}` : undefined}
        aria-labelledby={`${id}-label`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        autoComplete="off"
        spellCheck={false}
        className={error ? "ut-input ut-input--invalid" : "ut-input"}
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
          setActive(0);
        }}
        onFocus={() => {
          setOpen(true);
          setActive(-1);
        }}
        onBlur={() => {
          setOpen(false);
          setActive(-1);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            if (!open) {
              setOpen(true);
              setActive(0);
            } else {
              setActive((a) => Math.min(a + 1, filtered.length - 1));
            }
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((a) => Math.max(a - 1, 0));
          } else if (e.key === "Enter") {
            const pick = filtered[active];
            if (open && active >= 0 && pick) {
              e.preventDefault();
              select(pick);
            }
          } else if (e.key === "Escape") {
            setOpen(false);
            setActive(-1);
          }
        }}
      />
      {open && (
        <ul
          className="ut-combo-list"
          role="listbox"
          id={`${id}-list`}
          aria-labelledby={`${id}-label`}
          ref={listRef}
        >
          {filtered.length === 0 ? (
            <li className="ut-combo-empty">Такого города нет в списке</li>
          ) : (
            filtered.map((city, i) => (
              <li
                key={city}
                id={`${id}-opt-${i}`}
                role="option"
                aria-selected={city.toLowerCase() === query}
                data-index={i}
                data-active={i === active ? "true" : undefined}
                className="ut-combo-opt"
                onMouseDown={(e) => e.preventDefault()}
                onMouseEnter={() => setActive(i)}
                onClick={() => select(city)}
              >
                {city}
              </li>
            ))
          )}
        </ul>
      )}
      {quickPicks && quickPicks.length > 0 && (
        <div className="ut-combo-quick">
          {quickPicks.map((city) => (
            <button
              key={city}
              type="button"
              className="ut-combo-quick-chip"
              onClick={() => select(city)}
            >
              {city}
            </button>
          ))}
        </div>
      )}
      {error && (
        <p className="ut-field-error" id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

interface PickerOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface PickerFieldProps {
  id: string;
  label: string;
  value: string;
  options: PickerOption[];
  onChange: (value: string) => void;
  mono?: boolean;
  placeholder?: string;
  hideLabel?: boolean;
  LeadIcon?: typeof ClockIcon;
  error?: string;
}

function PickerField({ id, label, value, options, onChange, mono, placeholder, hideLabel, LeadIcon, error }: PickerFieldProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (active < 0) return;
    listRef.current
      ?.querySelector(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const openList = () => {
    const sel = options.findIndex((o) => o.value === value && !o.disabled);
    const firstEnabled = options.findIndex((o) => !o.disabled);
    setActive(sel >= 0 ? sel : firstEnabled);
    setOpen(true);
  };

  const select = (opt: PickerOption) => {
    if (opt.disabled) return;
    onChange(opt.value);
    setOpen(false);
  };

  const step = (dir: 1 | -1) => {
    setActive((a) => {
      let n = a;
      for (let s = 0; s < options.length; s++) {
        n = (n + dir + options.length) % options.length;
        if (!options[n].disabled) break;
      }
      return n;
    });
  };

  return (
    <div className="ut-field ut-combo">
      <span className={hideLabel ? "ut-label ut-sr" : "ut-label"} id={`${id}-label`}>
        {label}
      </span>
      <button
        id={id}
        type="button"
        className={[
          "ut-input ut-picker",
          mono ? "ut-picker-mono" : "",
          error ? "ut-input--invalid" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-labelledby={`${id}-label`}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-activedescendant={open && active >= 0 ? `${id}-opt-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onBlur={() => setOpen(false)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            if (!open) openList();
            else step(e.key === "ArrowDown" ? 1 : -1);
          } else if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!open) openList();
            else if (active >= 0 && options[active]) select(options[active]);
          } else if (e.key === "Escape") {
            setOpen(false);
          }
        }}
      >
        {LeadIcon && <LeadIcon className="ut-picker-lead" />}
        <span className={selected ? "ut-picker-value" : "ut-picker-value ut-picker-placeholder"}>
          {selected?.label ?? placeholder ?? value}
        </span>
        <ChevronDownIcon className="ut-picker-caret" />
      </button>
      {open && (
        <ul
          className="ut-combo-list ut-picker-list"
          role="listbox"
          id={`${id}-list`}
          aria-labelledby={`${id}-label`}
          ref={listRef}
        >
          {options.map((opt, i) => (
            <li
              key={opt.value}
              id={`${id}-opt-${i}`}
              role="option"
              aria-selected={opt.value === value}
              aria-disabled={opt.disabled || undefined}
              data-index={i}
              data-active={i === active ? "true" : undefined}
              className="ut-combo-opt"
              onMouseDown={(e) => e.preventDefault()}
              onMouseEnter={() => {
                if (!opt.disabled) setActive(i);
              }}
              onClick={() => select(opt)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
      {error && (
        <p className="ut-field-error" id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

type Status = "idle" | "loading" | "done" | "error";

const MIN_LOADING_MS = 700;
const SKELETON_ROWS = [0, 1, 2];

export default function UrgentTravel() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [deadlineDate, setDeadlineDate] = useState<Date | null>(null);
  const [deadlineTime, setDeadlineTime] = useState<string | null>(null);
  const [modes, setModes] = useState<Set<ModeKey>>(new Set(ALL_MODES));
  const [transfers, setTransfers] = useState<"any" | "direct">("any");
  const [budget, setBudget] = useState("unlimited");

  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<UrgentTravelResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const resultsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (status !== "loading") return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    resultsRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }, [status]);

  const toggleMode = (m: ModeKey) => {
    setModes((prev) => {
      const next = new Set(prev);
      if (next.has(m)) next.delete(m);
      else next.add(m);
      return next;
    });
  };

  const selectedModes = ALL_MODES.filter((m) => modes.has(m));

  const fromError =
    submitAttempted && !from.trim() ? "Укажите город отправления" : undefined;
  const toError = submitAttempted && !to.trim() ? "Укажите город назначения" : undefined;
  const dayError = submitAttempted && !deadlineDate ? "Выберите день" : undefined;
  const timeError = submitAttempted && !deadlineTime ? "Выберите время" : undefined;
  const modesError =
    submitAttempted && selectedModes.length === 0
      ? "Выберите хотя бы один вид транспорта"
      : undefined;

  const now = new Date();
  const dayOptions = Array.from({ length: 7 }, (_, i) => {
    const d = startOfDay(addDays(now, i));
    const wd = WD_SHORT[d.getDay()];
    const label = `${wd[0].toUpperCase()}${wd.slice(1)}, ${d.getDate()} ${MONTH_SHORT[d.getMonth()]}`;
    return { date: d, label, disabled: i === 0 && now.getHours() === 23 };
  });

  const selectedDayLabel = deadlineDate
    ? (dayOptions.find((opt) => sameDay(opt.date, deadlineDate))?.label ?? "")
    : "";
  const dayFieldOptions: PickerOption[] = dayOptions.map((opt) => ({
    value: opt.label,
    label: opt.label,
    disabled: opt.disabled,
  }));
  const timeFieldOptions: PickerOption[] = TIME_OPTIONS.map((t) => ({
    value: t,
    label: t,
    disabled:
      deadlineDate !== null && sameDay(deadlineDate, now) && Number(t.slice(0, 2)) <= now.getHours(),
  }));

  const pickDay = (label: string) => {
    const opt = dayOptions.find((o) => o.label === label);
    if (!opt) return;
    setDeadlineDate(opt.date);
    if (deadlineTime && sameDay(opt.date, new Date())) {
      const h = new Date().getHours();
      if (Number(deadlineTime.slice(0, 2)) <= h) {
        setDeadlineTime(`${String(Math.min(h + 1, 23)).padStart(2, "0")}:00`);
      }
    }
  };

  const count = result?.count ?? 0;
  const cards = result?.cards ?? [];
  const extraRows = result?.extraRows ?? [];

  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    if (status !== "done") return;
    let raf = 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      raf = requestAnimationFrame(() => setDisplayCount(count));
      return () => cancelAnimationFrame(raf);
    }
    const duration = 450;
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setDisplayCount(Math.round(count * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [status, count]);

  const summaryText =
    selectedModes.length === ALL_MODES.length
      ? "Искали все виды транспорта."
      : selectedModes.length === 0
        ? "Выберите хотя бы один вид транспорта."
        : `Искали только: ${selectedModes.map((m) => MODES[m].genitive).join(", ")}.`;

  const waysWord = plural(count, "способ", "способа", "способов");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitAttempted(true);

    if (!from.trim() || !to.trim() || !deadlineDate || !deadlineTime || selectedModes.length === 0) {
      return;
    }
    setStatus("loading");
    setErrorMessage(null);

    try {
      const [response] = await Promise.all([
        fetch("/api/urgent-travel/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            from,
            to,
            earliestDate: toDateParam(now),
            deadlineDate: toDateParam(deadlineDate),
            deadlineTime,
            modes: selectedModes,
            directOnly: transfers === "direct",
            priceMax: budget === "unlimited" ? null : Number(budget),
          }),
        }),
        // Keeps the search skeleton on screen long enough to read as a real
        // lookup, even when the API answers near-instantly.
        new Promise((resolve) => setTimeout(resolve, MIN_LOADING_MS)),
      ]);
      const data = await response.json();
      if (!response.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Не удалось получить данные");
        return;
      }
      setResult(data as UrgentTravelResult);
      setStatus("done");
    } catch {
      setStatus("error");
      setErrorMessage("Не удалось связаться с сервером. Попробуйте ещё раз.");
    }
  };

  const openOffer = (checkoutUrl: string | null, searchResultsUrl: string | null) => {
    const url = checkoutUrl ?? searchResultsUrl;
    if (url) window.open(url, "_blank", "noopener");
  };

  const fromChanged = result && result.resolvedFrom && result.resolvedFrom.toLowerCase() !== from.trim().toLowerCase();
  const toChanged = result && result.resolvedTo && result.resolvedTo.toLowerCase() !== to.trim().toLowerCase();

  return (
    <div className="ut-page">
      <header className="ut-head">
        <div className="ut-wrap ut-head-grid">
          <div>
            <nav className="ut-crumbs" aria-label="Хлебные крошки">
              <Link href="/">Главная</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">План «Б»</span>
            </nav>

            <h1 className="ut-title">План «Б»</h1>

            <p className="ut-sub">
              Рейс отменили или опаздываете? Сравним все виды транспорта и найдём способ успеть
              точно к сроку.
            </p>
          </div>

          <div className="ut-hero-art">
            <img
              src="/sites/tutu-ru/root/images/plan-b-hero.png"
              alt="Иллюстрация: оранжевый будильник и белый самолёт, облетающий его по пунктирной дуге"
              decoding="async"
            />
          </div>
        </div>
      </header>

      <form className="ut-form ut-wrap" onSubmit={handleSubmit}>
        <section className="ut-stage" aria-labelledby="ut-stage-route">
          <div className="ut-stage-head">
            <h2 className="ut-stage-title" id="ut-stage-route">Маршрут и срок</h2>
            <span className="ut-stage-subtitle">Когда надо быть на месте</span>
          </div>
          <div className="ut-route">
            <CityCombobox
              id="ut-from"
              label="Откуда"
              value={from}
              placeholder="Откуда"
              onChange={setFrom}
              hideLabel
              quickPicks={QUICK_PICK_CITIES}
              error={fromError}
            />

            <button
              type="button"
              className="ut-swap"
              aria-label="Поменять местами"
              onClick={() => {
                setFrom(to);
                setTo(from);
              }}
            >
              <SwitchArrowsIcon />
            </button>

            <CityCombobox
              id="ut-to"
              label="Куда"
              value={to}
              placeholder="Куда"
              onChange={setTo}
              hideLabel
              quickPicks={QUICK_PICK_CITIES}
              error={toError}
            />

            <div className="ut-route-when">
              <PickerField
                id="ut-day"
                label="День"
                value={selectedDayLabel}
                placeholder="Когда"
                options={dayFieldOptions}
                onChange={pickDay}
                hideLabel
                LeadIcon={CalendarIcon}
                error={dayError}
              />
              <PickerField
                id="ut-time"
                label="Время"
                value={deadlineTime ?? ""}
                placeholder="Время"
                options={timeFieldOptions}
                onChange={setDeadlineTime}
                mono
                hideLabel
                LeadIcon={ClockIcon}
                error={timeError}
              />
            </div>
          </div>
        </section>

        <section className="ut-stage" aria-labelledby="ut-stage-modes">
          <h2 className="ut-stage-title" id="ut-stage-modes">Транспорт</h2>
          <div className={modesError ? "ut-modes ut-modes--invalid" : "ut-modes"}>
            {ALL_MODES.map((m) => {
              const active = modes.has(m);
              return (
                <button
                  key={m}
                  type="button"
                  className="ut-mode"
                  aria-pressed={active}
                  onClick={() => toggleMode(m)}
                >
                  <img className="ut-mode-img" src={MODES[m].img} alt="" decoding="async" />
                  <span className="ut-mode-label">{MODES[m].label}</span>
                </button>
              );
            })}
          </div>
          {modesError && (
            <p className="ut-field-error" role="alert">
              {modesError}
            </p>
          )}
        </section>

        <section className="ut-stage" aria-labelledby="ut-stage-conditions">
          <h2 className="ut-stage-title" id="ut-stage-conditions">Условия</h2>
          <div className="ut-conditions">
            <div>
              <span className="ut-label" id="ut-transfers-label">Пересадки</span>
              <div className="ut-seg" role="group" aria-labelledby="ut-transfers-label">
                {TRANSFER_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className="ut-seg-btn"
                    aria-pressed={transfers === opt.value}
                    onClick={() => setTransfers(opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="ut-label" id="ut-budget-label">Бюджет</span>
              <div className="ut-chips" role="group" aria-labelledby="ut-budget-label">
                {BUDGET_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className="ut-chip"
                    aria-pressed={budget === opt.value}
                    onClick={() => setBudget(opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="ut-submit">
          <button
            type="submit"
            className="ut-submit-btn"
            disabled={selectedModes.length === 0 || status === "loading"}
          >
            {status === "loading" ? "Ищем везде…" : "Найти как успеть"}
          </button>
        </div>
      </form>

      {status !== "idle" && selectedModes.length > 0 && (
        <section
          className="ut-results"
          aria-live="polite"
          aria-label="Результаты подбора"
          ref={resultsRef}
        >
          <div className="ut-wrap">
            <div className="ut-results-inner">
              {status === "loading" && (
                <>
                  <p className="ut-results-summary">Ищем варианты…</p>
                  <div className="ut-board" aria-hidden="true">
                    <div className="ut-board-head">
                      <span className="ut-board-head-mode">Транспорт</span>
                      <span>Отправление</span>
                      <span>Прибытие</span>
                      <span>В пути</span>
                      <span>Цена</span>
                      <span aria-hidden="true"></span>
                      <span className="ut-sr">Действие</span>
                    </div>
                    <ul className="ut-board-rows">
                      {SKELETON_ROWS.map((i) => (
                        <li key={i} className="ut-row ut-row--skeleton">
                          <div className="ut-cell ut-cell--mode">
                            <span className="ut-skel" style={{ width: "60%" }} />
                          </div>
                          <div className="ut-cell ut-cell--num ut-cell--depart">
                            <span className="ut-skel" style={{ width: "55%" }} />
                          </div>
                          <div className="ut-cell ut-cell--num ut-cell--arrive">
                            <span className="ut-skel" style={{ width: "55%" }} />
                          </div>
                          <div className="ut-cell ut-cell--num ut-cell--time">
                            <span className="ut-skel" style={{ width: "65%" }} />
                          </div>
                          <div className="ut-cell ut-cell--num ut-cell--price">
                            <span className="ut-skel" style={{ width: "75%" }} />
                          </div>
                          <div className="ut-cell ut-cell--badge">
                            <span className="ut-skel" style={{ width: "70%", height: "40px" }} />
                          </div>
                          <div className="ut-cell ut-cell--action">
                            <span className="ut-skel ut-skel--btn" />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {status === "error" && (
                <p className="ut-notice ut-notice--error">{errorMessage}</p>
              )}

              {status === "done" && result && result.count === 0 && (
                <>
                  {result.unavailableModes.length > 0 && (
                    <p className="ut-notice">
                      {result.unavailableModes.map((m) => MODES[m].label).join(", ")}: сервис
                      сейчас недоступен, попробуйте ещё раз чуть позже.
                    </p>
                  )}
                  <p className="ut-notice">
                    На этот день ничего не нашлось. Попробуйте другой день, время или снимите
                    ограничение по бюджету.
                  </p>
                </>
              )}

              {status === "done" && result && result.count > 0 && (
                <>
                  <h2 className="ut-results-title">
                    <span className="ut-sr">
                      Нашли {count} {waysWord} успеть
                    </span>
                    <span aria-hidden="true">
                      Нашли <span className="ut-count">{displayCount}</span> {waysWord} успеть
                    </span>
                  </h2>
                  <p className="ut-results-summary">{summaryText}</p>

                  {(fromChanged || toChanged) && (
                    <p className="ut-notice">
                      Уточнили маршрут: {result.resolvedFrom} → {result.resolvedTo}
                    </p>
                  )}

                  {result.deadlineMissed && (
                    <p className="ut-notice">
                      К выбранному сроку успеть не получится — вот ближайшие варианты.
                    </p>
                  )}

                  {result.unavailableModes.length > 0 && (
                    <p className="ut-notice">
                      {result.unavailableModes.map((m) => MODES[m].label).join(", ")}: данные
                      временно недоступны.
                    </p>
                  )}

                  <div className="ut-board">
                    <div className="ut-board-head" aria-hidden="true">
                      <span className="ut-board-head-mode">Транспорт</span>
                      <span>Отправление</span>
                      <span>Прибытие</span>
                      <span>В пути</span>
                      <span>Цена</span>
                      <span aria-hidden="true"></span>
                      <span className="ut-sr">Действие</span>
                    </div>
                    <ul className="ut-board-rows">
                      {cards.map((card) => {
                        return (
                          <li
                            key={card.key}
                            className={
                              card.key === "fastest" ? "ut-row ut-row--priority" : "ut-row"
                            }
                          >
                            <div className="ut-cell ut-cell--mode">
                              <span className="ut-modecell">{MODES[card.mode].label}</span>
                            </div>
                            <div className="ut-cell ut-cell--num ut-cell--depart" data-label="Отправление">
                              <span className="ut-sr">Отправление: </span>
                              <span className="ut-num">{card.departureTime}</span>
                              {card.departureStation && (
                                <span className="ut-num-sub">{card.departureStation}</span>
                              )}
                            </div>
                            <div className="ut-cell ut-cell--num ut-cell--arrive" data-label="Прибытие">
                              <span className="ut-sr">Прибытие: </span>
                              <span className="ut-num">{card.arrivalTime}</span>
                              {card.arrivalStation && (
                                <span className="ut-num-sub">{card.arrivalStation}</span>
                              )}
                            </div>
                            <div className="ut-cell ut-cell--num ut-cell--time" data-label="В пути">
                              <span className="ut-sr">В пути: </span>
                              <span className="ut-num">{card.duration}</span>
                              {card.hasTransfer && (
                                <span className="ut-num-sub">с пересадками</span>
                              )}
                            </div>
                            <div className="ut-cell ut-cell--num ut-cell--price" data-label="Цена">
                              <span className="ut-sr">Цена: </span>
                              <span className="ut-num ut-num--price">
                                {card.price.toLocaleString("ru-RU")} ₽
                              </span>
                            </div>
                            <div className="ut-cell ut-cell--badge">
                              {BADGE_IMAGE[card.key] && (
                                <span className="ut-tag">
                                  <img
                                    src={BADGE_IMAGE[card.key]}
                                    alt={card.badge}
                                    className="ut-tag-img"
                                  />
                                </span>
                              )}
                            </div>
                            <div className="ut-cell ut-cell--action">
                              <button
                                type="button"
                                className="ut-pick"
                                onClick={() => openOffer(card.checkoutUrl, card.searchResultsUrl)}
                                disabled={!card.checkoutUrl && !card.searchResultsUrl}
                              >
                                Выбрать
                              </button>
                            </div>
                          </li>
                        );
                      })}
                      {extraRows.map((row) => (
                          <li key={row.key} className="ut-row">
                            <div className="ut-cell ut-cell--mode">
                              <span className="ut-modecell">{MODES[row.mode].label}</span>
                            </div>
                            <div className="ut-cell ut-cell--num ut-cell--depart" data-label="Отправление">
                              <span className="ut-sr">Отправление: </span>
                              <span className="ut-num">{row.departureTime}</span>
                              {row.departureStation && (
                                <span className="ut-num-sub">{row.departureStation}</span>
                              )}
                            </div>
                            <div className="ut-cell ut-cell--num ut-cell--arrive" data-label="Прибытие">
                              <span className="ut-sr">Прибытие: </span>
                              <span className="ut-num">{row.arrivalTime}</span>
                              {row.arrivalStation && (
                                <span className="ut-num-sub">{row.arrivalStation}</span>
                              )}
                            </div>
                            <div className="ut-cell ut-cell--num ut-cell--time" data-label="В пути">
                              <span className="ut-sr">В пути: </span>
                              <span className="ut-num">{row.duration}</span>
                              {row.hasTransfer && (
                                <span className="ut-num-sub">с пересадками</span>
                              )}
                            </div>
                            <div className="ut-cell ut-cell--num ut-cell--price" data-label="Цена">
                              <span className="ut-sr">Цена: </span>
                              <span className="ut-num ut-num--price">
                                {row.price.toLocaleString("ru-RU")} ₽
                              </span>
                            </div>
                            <div className="ut-cell ut-cell--action">
                              <button
                                type="button"
                                className="ut-pick"
                                onClick={() => openOffer(row.checkoutUrl, row.searchResultsUrl)}
                                disabled={!row.checkoutUrl && !row.searchResultsUrl}
                              >
                                Выбрать
                              </button>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>

                </>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
