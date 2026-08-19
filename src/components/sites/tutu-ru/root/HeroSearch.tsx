"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  BedIcon,
  PlaneIcon,
  TrainIcon,
  BusIcon,
  SuburbanIcon,
  TourIcon,
  CarIcon,
  JarvelIcon,
} from "@/components/sites/tutu-ru/shared/TransportIcons";

type ModeId =
  | "hotels"
  | "avia"
  | "train"
  | "bus"
  | "suburban"
  | "tours"
  | "carrent"
  | "jarvel";

interface ModeDef {
  id: ModeId;
  label: string;
  icon: React.ReactNode;
  badge?: { text: string; className: string };
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 shrink-0">
      <path
        d="M12 3 5 5.5V11c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V5.5L12 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M9.2 12.2l1.8 1.8 3.8-3.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WalkerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 shrink-0">
      <circle cx="9" cy="4.5" r="1.6" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M9 8c-1.5 0-2.5 1-2.8 2.3L5 15h2l.6 5h2l.6-4.5.9 1.5.7 3h2l-1-4.5-1.7-2.7.6-2.8 1.6 1.5 2.7.6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3 shrink-0" fill={filled ? "#FFB118" : "none"}>
      <path
        d="M12 3.5l2.5 5.2 5.7.8-4.1 4 1 5.7L12 16.5l-5.1 2.7 1-5.7-4.1-4 5.7-.8L12 3.5Z"
        stroke={filled ? "#FFB118" : "currentColor"}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SwapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-tutu-muted">
      <path
        d="M7 7h11l-3-3M17 17H6l3 3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const MODES: ModeDef[] = [
  { id: "hotels", label: "Отели", icon: <BedIcon className="h-6 w-6" /> },
  { id: "avia", label: "Авиабилеты", icon: <PlaneIcon className="h-6 w-6" /> },
  { id: "train", label: "Ж/д билеты", icon: <TrainIcon className="h-6 w-6" /> },
  { id: "bus", label: "Автобусы", icon: <BusIcon className="h-6 w-6" /> },
  { id: "suburban", label: "Электрички", icon: <SuburbanIcon className="h-6 w-6" /> },
  {
    id: "tours",
    label: "Туры",
    icon: <TourIcon className="h-6 w-6" />,
    badge: { text: "Кешбэк до 7%", className: "bg-[#FC5D2C]" },
  },
  { id: "carrent", label: "Аренда авто", icon: <CarIcon className="h-6 w-6" /> },
  {
    id: "jarvel",
    label: "Джарвел",
    icon: <JarvelIcon className="h-6 w-6" />,
    badge: { text: "ИИ-помощник", className: "bg-[#6F5DF6]" },
  },
];

export default function HeroSearch() {
  const [activeMode, setActiveMode] = useState<ModeId>("avia");
  const [hotelsNewTab, setHotelsNewTab] = useState(true);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [depart, setDepart] = useState("");
  const [ret, setRet] = useState("");

  const [simpleFrom, setSimpleFrom] = useState("");
  const [simpleTo, setSimpleTo] = useState("");

  const isAvia = activeMode === "avia";

  return (
    <section className="bg-tutu-navy rounded-b-[32px] pb-10 relative overflow-hidden">
      <div className="max-w-[1336px] mx-auto px-6 pt-8 relative">
        <h1 className="text-white text-[38px] font-semibold leading-[1.2]">
          Путешествуйте выгодно
        </h1>

        <div className="flex gap-3 mt-4 flex-wrap">
          <div className="flex items-center gap-1.5 rounded-full bg-white/10 text-white text-[13px] px-3 py-1.5">
            <ShieldIcon />
            22 года работаем для вас
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-white/10 text-white text-[13px] px-3 py-1.5">
            <WalkerIcon />
            42 млн путешествуют с нами
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-white/10 text-white text-[13px] px-3 py-1.5">
            <span className="flex items-center gap-0.5">
              {[0, 1, 2, 3].map((i) => (
                <StarIcon key={i} filled />
              ))}
              <StarIcon filled={false} />
            </span>
            4,84 — рейтинг приложения
          </div>
        </div>

        <img
          src="/sites/tutu-ru/root/images/hero-plane.webp"
          alt=""
          className="hidden lg:block absolute right-6 top-6 w-[280px] h-auto pointer-events-none select-none"
        />

        <div className="flex gap-6 mt-8 overflow-x-auto">
          {MODES.map((mode) => {
            const active = mode.id === activeMode;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => setActiveMode(mode.id)}
                className="flex flex-col items-center gap-1 shrink-0"
              >
                <span className="flex h-4 items-center justify-center">
                  {mode.badge && (
                    <span
                      className={cn(
                        "whitespace-nowrap rounded-full px-1.5 py-0.5 text-[10px] font-medium leading-none text-white",
                        mode.badge.className
                      )}
                    >
                      {mode.badge.text}
                    </span>
                  )}
                </span>
                <span
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                    active ? "bg-tutu-primary text-white" : "bg-white text-tutu-navy"
                  )}
                >
                  {mode.icon}
                </span>
                <span className="text-white text-[13px] mt-2">{mode.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 bg-white rounded-2xl flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-gray-200 overflow-hidden">
          {isAvia ? (
            <>
              <div className="flex-1 h-14 px-5 flex flex-col justify-center min-w-0">
                {from && <label className="text-xs text-tutu-muted block">Откуда</label>}
                <input
                  type="text"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="Откуда"
                  className="w-full text-[15px] text-tutu-text font-medium outline-none bg-transparent placeholder:text-tutu-muted placeholder:font-normal"
                />
              </div>

              <button
                type="button"
                aria-label="Поменять местами"
                onClick={() => {
                  setFrom(to);
                  setTo(from);
                }}
                className="hidden lg:flex items-center justify-center h-8 w-8 rounded-full border border-gray-200 bg-white -mx-4 z-10 shrink-0"
              >
                <SwapIcon />
              </button>

              <div className="flex-1 h-14 px-5 flex flex-col justify-center min-w-0">
                {to && <label className="text-xs text-tutu-muted block">Куда</label>}
                <input
                  type="text"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="Куда"
                  className="w-full text-[15px] text-tutu-text font-medium outline-none bg-transparent placeholder:text-tutu-muted placeholder:font-normal"
                />
              </div>

              <div className="flex-1 h-14 px-5 flex flex-col justify-center min-w-0">
                {depart && <label className="text-xs text-tutu-muted block">Когда</label>}
                <input
                  type="text"
                  value={depart}
                  onChange={(e) => setDepart(e.target.value)}
                  placeholder="Когда"
                  className="w-full text-[15px] text-tutu-text font-medium outline-none bg-transparent placeholder:text-tutu-muted placeholder:font-normal"
                />
              </div>

              <div className="flex-1 h-14 px-5 flex flex-col justify-center min-w-0">
                {ret && <label className="text-xs text-tutu-muted block">Обратно</label>}
                <input
                  type="text"
                  value={ret}
                  onChange={(e) => setRet(e.target.value)}
                  placeholder="Обратно"
                  className="w-full text-[15px] text-tutu-text font-medium outline-none bg-transparent placeholder:text-tutu-muted placeholder:font-normal"
                />
              </div>

              <div className="flex-1 h-14 px-5 flex flex-col justify-center min-w-0">
                <label className="text-xs text-tutu-muted block">Кто летит</label>
                <p className="w-full text-[15px] text-tutu-text font-medium">1 пассажир, эконом</p>
              </div>

              <button
                type="button"
                className="bg-tutu-primary hover:bg-tutu-primary-hover text-white font-semibold rounded-[10px] px-6 mx-3 my-3 lg:my-2 whitespace-nowrap shrink-0"
              >
                Найти авиабилеты
              </button>
            </>
          ) : (
            <>
              <div className="flex-1 h-14 px-5 flex flex-col justify-center min-w-0">
                {simpleFrom && <label className="text-xs text-tutu-muted block">Откуда</label>}
                <input
                  type="text"
                  value={simpleFrom}
                  onChange={(e) => setSimpleFrom(e.target.value)}
                  placeholder="Откуда"
                  className="w-full text-[15px] text-tutu-text font-medium outline-none bg-transparent placeholder:text-tutu-muted placeholder:font-normal"
                />
              </div>
              <div className="flex-1 h-14 px-5 flex flex-col justify-center min-w-0">
                {simpleTo && <label className="text-xs text-tutu-muted block">Куда</label>}
                <input
                  type="text"
                  value={simpleTo}
                  onChange={(e) => setSimpleTo(e.target.value)}
                  placeholder="Куда"
                  className="w-full text-[15px] text-tutu-text font-medium outline-none bg-transparent placeholder:text-tutu-muted placeholder:font-normal"
                />
              </div>
              <button
                type="button"
                className="bg-tutu-primary hover:bg-tutu-primary-hover text-white font-semibold rounded-[10px] px-6 mx-3 my-3 lg:my-2 whitespace-nowrap shrink-0"
              >
                Найти
              </button>
            </>
          )}
        </div>

        {isAvia && (
          <div className="flex gap-8 mt-3 text-[13px] flex-wrap">
            <div>
              <button
                type="button"
                onClick={() => setFrom("Москва")}
                className="text-white/80 hover:text-white hover:underline underline-offset-2 mr-3"
              >
                Москва
              </button>
              <button
                type="button"
                onClick={() => setFrom("Санкт-Петербург")}
                className="text-white/80 hover:text-white hover:underline underline-offset-2 mr-3"
              >
                Санкт-Петербург
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={() => setTo("Санкт-Петербург")}
                className="text-white/80 hover:text-white hover:underline underline-offset-2 mr-3"
              >
                Санкт-Петербург
              </button>
              <button
                type="button"
                onClick={() => setTo("Москва")}
                className="text-white/80 hover:text-white hover:underline underline-offset-2 mr-3"
              >
                Москва
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={() => setDepart("Сегодня")}
                className="text-white/80 hover:text-white hover:underline underline-offset-2 mr-3"
              >
                Сегодня
              </button>
              <button
                type="button"
                onClick={() => setDepart("Завтра")}
                className="text-white/80 hover:text-white hover:underline underline-offset-2 mr-3"
              >
                Завтра
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={() => setRet("Завтра")}
                className="text-white/80 hover:text-white hover:underline underline-offset-2 mr-3"
              >
                Завтра
              </button>
              <button
                type="button"
                onClick={() => setRet("Послезавтра")}
                className="text-white/80 hover:text-white hover:underline underline-offset-2 mr-3"
              >
                Послезавтра
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center justify-end gap-2 mt-4">
          <span className="text-white text-[13px]">Искать отели в новой вкладке</span>
          <button
            type="button"
            role="switch"
            aria-checked={hotelsNewTab}
            onClick={() => setHotelsNewTab((v) => !v)}
            className={cn(
              "relative h-6 w-11 rounded-full transition-colors",
              hotelsNewTab ? "bg-tutu-primary" : "bg-white/20"
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform",
                hotelsNewTab ? "translate-x-[22px]" : "translate-x-0.5"
              )}
            />
          </button>
        </div>
      </div>
    </section>
  );
}
