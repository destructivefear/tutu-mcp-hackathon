# TrainWeekendCarousel ("Развеяться на выходных на поезде") Specification

## Overview
- Target file: `src/components/sites/tutu-ru/root/TrainWeekendCarousel.tsx` (client component, default export)
- Interaction model: click-driven pill tabs (visual only, reuse same 4 cards for every tab) + horizontal carousel scroll
- Import `PillTabs` from `@/components/sites/tutu-ru/shared/PillTabs` and `CarouselRow` from `@/components/sites/tutu-ru/shared/CarouselRow`
- Section wrapper: `<section className="max-w-[1336px] mx-auto px-6 my-8">` containing `<div className="relative overflow-hidden rounded-[24px] p-8" style={{ background: "linear-gradient(135deg, #8A3FF0 0%, #C23FD6 50%, #EF5AA8 100%)" }}>`

## DOM structure
1. `<h2 className="text-white text-[32px] font-semibold">Развеяться на выходных на поезде</h2>`
2. `<PillTabs tabs={["из Москвы", "из Санкт-Петербурга", "из Казани"]} defaultTab="из Москвы" variant="dark" className="mt-5" />`
3. `<CarouselRow className="mt-5">` with 4 cards, each `<div className="snap-start shrink-0 w-[260px] bg-white rounded-2xl overflow-hidden shadow-sm">`:
   - img `h-40 w-full object-cover`
   - padding-4: `<p className="font-semibold">{route}</p>`, `<p className="text-xs text-tutu-muted mt-1">{duration}</p>`, `<p className="text-lg font-bold mt-2">от {price} ₽</p>`

## Card data (verbatim)
1. img `city-spb.webp`, route "Москва — Санкт-Петербург", duration "от 5 ч 20 м в пути", price "2 281"
2. img `city-nnov.webp`, route "Москва — Нижний Новгород", duration "от 3 ч 48 м в пути", price "2 832"
3. img `city-yaroslavl.webp`, route "Москва — Ярославль", duration "от 3 ч 24 м в пути", price "1 181"
4. img `city-ryazan.webp`, route "Москва — Рязань", duration "от 2 ч 5 м в пути", price "1 723"

All images at `/sites/tutu-ru/root/images/<filename>`.

## Computed styles
- Gradient background as specified (approximation of source's photographic blurred purple/magenta panel)
- Panel radius 24px, card radius 16px

## Text content
Heading "Развеяться на выходных на поезде"; tabs "из Москвы","из Санкт-Петербурга","из Казани"; card data above verbatim

## Responsive
- ≥1024px: 4 cards visible, arrows shown
- <1024px: horizontal scroll unchanged
