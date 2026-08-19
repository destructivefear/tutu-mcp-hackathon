# DealsCarousel ("Это выгодно!") Specification

## Overview
- Target file: `src/components/sites/tutu-ru/root/DealsCarousel.tsx` (client component, default export `DealsCarousel`)
- Interaction model: click-driven pill tabs (visual only, reuse same 4 cards for every tab) + horizontal carousel scroll
- Import `PillTabs` from `@/components/sites/tutu-ru/shared/PillTabs` and `CarouselRow` from `@/components/sites/tutu-ru/shared/CarouselRow`
- Section wrapper: `<section className="max-w-[1336px] mx-auto px-6 my-8">` containing an inner colored panel: `<div className="relative overflow-hidden rounded-[24px] p-8" style={{ background: "linear-gradient(90deg, #FC5D2C 25%, #FFB118)" }}>`

## DOM structure (inside the gradient panel)
1. Top row `flex items-start justify-between flex-wrap gap-4`:
   - Left: `<h2 className="text-white text-[32px] font-semibold">Это выгодно!</h2>` + `<p className="text-white/90 text-sm mt-1 max-w-md">Цены ниже средних за последние 10 дней. Обновляем постоянно, заглядывайте чаще</p>`
   - Right: `<button className="rounded-full bg-white text-tutu-text font-semibold text-sm px-4 py-2 flex items-center gap-1 hover:bg-white/90">Все билеты →</button>`
2. `<PillTabs tabs={["Все", "Самолёты", "Поезда"]} defaultTab="Все" className="mt-5" />`
3. `<CarouselRow className="mt-5">` containing 4 cards (each `<div className="snap-start shrink-0 w-[260px] bg-white rounded-2xl overflow-hidden shadow-sm">`):
   - Card 1: img `/sites/tutu-ru/root/images/deal-baku.webp`, price "15 196 ₽" old-price "22 104 ₽" (strikethrough, gray) discount badge "-31%" (bg `#FFE5DC` text `#FC5D2C` rounded-full px-2 text-xs font-bold), route "Москва — Баку", meta line: small colored circle icon + "18 сентября, 09:50 – 14:05" then muted "3ч 15м · прямой"
   - Card 2: img `/sites/tutu-ru/root/images/deal-sochi.jpg`, price "14 315 ₽" old "18 381 ₽" discount "-22%", route "Новосибирск — Сочи", "15 сентября, 05:35 – 06:50", "5ч 15м · прямой"
   - Card 3: img `/sites/tutu-ru/root/images/deal-sochi.jpg`, price "10 430 ₽" old "11 430 ₽" discount "-8%", route "Москва — Сочи", "1 октября, 16:50 – 20:35", "3ч 45м · прямой"
   - Card 4: img `/sites/tutu-ru/root/images/deal-sochi.jpg`, price "10 746 ₽" old "11 235 ₽" discount "-4%", route "Санкт-Петербург — Сочи", "22 сентября, 08:50 – 13:15", "4ч 25м · прямой"
   - Card internal layout: image `h-36 w-full object-cover`, padding-4 content: price row (`text-xl font-bold` + strikethrough `text-sm text-tutu-muted line-through` + discount badge, all `flex items-center gap-2`), route (`font-semibold mt-1`), meta row (`flex items-center gap-1.5 text-xs text-tutu-muted mt-2`) with a small 16px colored circle (`bg-blue-600 rounded-full` placeholder for airline logo) + times, then duration/stops on its own line below

## Computed styles
- Gradient: `linear-gradient(90deg, #FC5D2C 25%, #FFB118)`
- Panel radius 24px
- Card radius 16px, white bg
- Discount badge: bg `#FFE5DC`, text `#FC5D2C`, font-weight 700, text-xs, rounded-full, padding `2px 8px`

## Assets
`/sites/tutu-ru/root/images/deal-baku.webp`, `/sites/tutu-ru/root/images/deal-sochi.jpg` (reused for 3 cards)

## Text content
See card list above verbatim; heading "Это выгодно!"; subtext "Цены ниже средних за последние 10 дней. Обновляем постоянно, заглядывайте чаще"; button "Все билеты"

## Responsive
- ≥1024px: ~4 cards visible, arrows shown
- <1024px: cards remain `w-[260px] shrink-0`, row scrolls horizontally by touch, arrow buttons hidden (CarouselRow already handles this via `hidden md:flex` on arrows)
