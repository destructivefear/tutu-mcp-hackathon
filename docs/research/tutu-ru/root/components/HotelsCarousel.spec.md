# HotelsCarousel ("Отели по суперцене") Specification

## Overview
- Target file: `src/components/sites/tutu-ru/root/HotelsCarousel.tsx` (can be server component; only the carousel scroll needs the client `CarouselRow`)
- Interaction model: static heading, carousel scroll only (no tabs)
- Import `CarouselRow` from `@/components/sites/tutu-ru/shared/CarouselRow`
- Section wrapper: `<section className="max-w-[1336px] mx-auto px-6 my-10">`

## DOM structure
1. `<h2 className="text-[32px] font-semibold text-tutu-text">Отели по суперцене</h2>`
2. `<p className="text-tutu-muted text-sm mt-1">Классные варианты с выгодой — специально для вас</p>`
3. `<CarouselRow className="mt-5">` with 6 cards, each `<div className="snap-start shrink-0 w-[220px]">`:
   - Photo container `relative rounded-2xl overflow-hidden h-[160px]`: `<img className="h-full w-full object-cover" />` + rating badge absolute top-2 left-2 `bg-[#2E7D32] text-white text-xs font-bold rounded-md px-1.5 py-0.5`
   - Below photo, `mt-2` text block: meta line `flex items-center gap-1 text-xs text-tutu-muted` — star icon + "N★  Город · 26 авг – 27 авг · 2 гостя", then `<p className="font-semibold text-sm mt-1">{hotel name}</p>`, then price row `flex items-center gap-2 mt-1`: `<span className="font-bold">{price} ₽</span>` + discount badge (`bg-[#E9E4FF] text-tutu-primary text-xs font-bold rounded-full px-1.5`) + old price struck through in `text-xs text-tutu-muted line-through`

## Card data (verbatim, use these exact 6 entries)
1. img `hotel-food-city.jpg`, rating 7.7, "4★ Москва", "Отель Фуд Сити", price 4646, discount "-10%", old 5162
2. img `hotel-apartstel.jpg`, rating 9.4, "3★ Санкт-Петербург", "Отель ApartStel/АпартСтель", price 4417, discount "-10%", old 4908
3. img `hotel-gavan.jpg`, rating 8.7, "4★ Казань", "Мини-отель Гавань", price 6745, discount "-14%", old 7843
4. img `hotel-ayti.jpg`, rating 9.0, "3★ Москва", "Отель АйТи", price 6066, discount "-10%", old 6740
5. img `hotel-cronwell.jpg`, rating 9.2, "4★ Санкт-Петербург", "Отель Cronwell Inn Стремянная", price 9146, discount "-10%", old 10162
6. img `hotel-hostel.jpg`, rating 8.4, "3★ Москва", "Хостел...", price 3664, discount "-10%", old 4071

All images are already at `/sites/tutu-ru/root/images/<filename>`. Date/guests text for every card: "26 авг - 27 авг · 2 гостя".

## Computed styles
- Rating badge bg `#2E7D32` (green), white text, bold, small rounded rect
- Card image radius 16px (top corners at minimum, full rounded is fine since photo is the whole card top)
- Price bold `text-base`, discount badge bg `#E9E4FF` text `#6F5DF6`

## Text content
Heading "Отели по суперцене"; subtext "Классные варианты с выгодой — специально для вас"; card data as listed above

## Responsive
- ≥1024px: ~5-6 cards visible, arrows shown
- <1024px: horizontal scroll, `w-[220px] shrink-0` cards unchanged
