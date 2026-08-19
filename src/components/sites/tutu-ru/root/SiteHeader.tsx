"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LogoMark } from "@/components/sites/tutu-ru/shared/LogoMark";
import {
  WalletIcon,
  HeartIcon,
  PlaneIcon,
  TrainIcon,
  BusIcon,
  BedIcon,
  SuburbanIcon,
  TourIcon,
  CarIcon,
  AeroexpressIcon,
  BoltIcon,
} from "@/components/sites/tutu-ru/shared/TransportIcons";

const NAV_LINKS = ["Это выгодно!", "Автопутешествия", "Маршруты", "Справочная", "Путеводитель"];

const MENU_TOP = [
  { label: "Кошелёк", icon: WalletIcon },
  { label: "Избранное", icon: HeartIcon },
];

const MENU_TRANSPORT = [
  { label: "Авиабилеты", icon: PlaneIcon },
  { label: "Ж/д билеты", icon: TrainIcon },
  { label: "Автобусы", icon: BusIcon },
  { label: "Отели", icon: BedIcon },
  { label: "Электрички", icon: SuburbanIcon },
  { label: "Туры", icon: TourIcon },
  { label: "Аренда авто", icon: CarIcon },
  { label: "Аэроэкспрессы", icon: AeroexpressIcon },
];

const MENU_BOTTOM = [{ label: "Срочно добраться", icon: BoltIcon, href: "/urgent" }];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [menuOpen]);

  return (
    <>
      <div className="sticky top-0 z-50 bg-tutu-navy">
        <nav className="mx-auto flex max-w-[1336px] items-center justify-between px-6 py-2">
        {/* Logo */}
        <Link href="/" className="shrink-0 cursor-pointer">
          <LogoMark className="h-[46px] w-auto" />
        </Link>

        {/* Everything else: nav links + favorite + login + menu, one group, uniform gap */}
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href="/urgent"
              className="flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full bg-[#FC5D2C]/15 px-3 py-1 text-[15px] font-semibold text-[#FFB118] transition-colors duration-150 hover:bg-[#FC5D2C]/25"
            >
              <BoltIcon className="h-4 w-4" />
              Срочно добраться
            </Link>
            {NAV_LINKS.map((label) => (
              <a
                key={label}
                href="#"
                className="cursor-pointer whitespace-nowrap text-[15px] font-normal text-white/90 transition-colors duration-150 hover:text-white"
              >
                {label}
              </a>
            ))}
          </div>

          <a
            href="#"
            className="hidden lg:flex cursor-pointer items-center gap-1.5 whitespace-nowrap text-[15px] font-normal text-white/90 transition-colors duration-150 hover:text-white"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
            </svg>
            Избранное
          </a>

          <button
            type="button"
            className="flex h-8 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-[10px] bg-tutu-primary px-3 text-[15px] font-medium text-white transition-colors duration-150 hover:bg-tutu-primary-hover"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" />
            </svg>
            Войти
          </button>

          <div className="relative" ref={menuRef}>
            <button
              type="button"
              aria-label="Меню"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-white transition-colors duration-150 hover:bg-white/10"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                aria-hidden="true"
              >
                {menuOpen ? (
                  <path d="M5 5l14 14M19 5 5 19" />
                ) : (
                  <>
                    <path d="M4 7h16" />
                    <path d="M4 12h16" />
                    <path d="M4 17h16" />
                  </>
                )}
              </svg>
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] w-[344px] rounded-2xl bg-white px-4 py-2 shadow-[0_4px_8px_rgba(0,0,0,0.1)]">
                {MENU_BOTTOM.map(({ label, icon: Icon, href }) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="flex h-10 cursor-pointer items-center gap-2 text-[15px] font-semibold text-[#FC5D2C] transition-colors duration-150 hover:text-[#e2501f]"
                  >
                    <Icon className="h-6 w-6 shrink-0 text-[#FC5D2C]" />
                    {label}
                  </Link>
                ))}

                <div className="my-2 h-px bg-[#D5D5E6]" />

                {MENU_TOP.map(({ label, icon: Icon }) => (
                  <a
                    key={label}
                    href="#"
                    onClick={() => setMenuOpen(false)}
                    className="flex h-10 cursor-pointer items-center gap-2 text-[15px] text-tutu-text transition-colors duration-150 hover:text-tutu-primary"
                  >
                    <Icon className="h-6 w-6 shrink-0 text-[#8D86FF]" />
                    {label}
                  </a>
                ))}

                <div className="my-2 h-px bg-[#D5D5E6]" />

                {MENU_TRANSPORT.map(({ label, icon: Icon }) => (
                  <a
                    key={label}
                    href="#"
                    onClick={() => setMenuOpen(false)}
                    className="flex h-10 cursor-pointer items-center gap-2 text-[15px] text-tutu-text transition-colors duration-150 hover:text-tutu-primary"
                  >
                    <Icon className="h-6 w-6 shrink-0 text-[#8D86FF]" />
                    {label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
        </nav>
      </div>

      {/* Promo strip — outside the sticky bar, scrolls away with the page */}
      <div className="bg-tutu-navy">
        <div className="mx-auto mb-6 max-w-[1336px] px-6">
          <a href="#" className="block cursor-pointer">
            <img
              src="/sites/tutu-ru/root/images/promo-strip-banner.webp"
              alt="Забронируйте авиабилет до повышения цены"
              className="h-10 w-full rounded-2xl object-cover"
            />
          </a>
        </div>
      </div>
    </>
  );
}
