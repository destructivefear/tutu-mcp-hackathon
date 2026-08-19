# PromoDuo Specification

## Overview
- Target file: `src/components/sites/tutu-ru/root/PromoDuo.tsx` (default export `PromoDuo`, server component fine, no interactivity beyond hover)
- Interaction model: static, hover on button only
- Renders in normal page flow (white background section), max-width 1336px centered, padding-x 24px, padding-y 32px

## DOM structure
`<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">`
1. Left card: `<div className="bg-tutu-surface rounded-2xl p-8 flex flex-col justify-center gap-3">`
   - `<h3 className="text-xl font-semibold text-tutu-text">Скидка 20% на жильё в Калининграде и Сухуме</h3>`
   - `<p className="text-sm text-tutu-muted">Бронируйте по промокоду WOW-3</p>`
   - `<button className="self-start rounded-[10px] bg-tutu-primary hover:bg-tutu-primary-hover text-white font-semibold text-sm px-5 py-2.5 mt-2">Забронировать</button>`
2. Right card: `<div className="relative rounded-2xl overflow-hidden min-h-[220px] bg-cover bg-center" style={{ backgroundImage: "url(/sites/tutu-ru/root/images/promo-happy-weeks.webp)" }}>`
   - Overlay gradient for text legibility: absolute inset-0 `bg-gradient-to-r from-[#8A3FF0]/70 via-transparent to-transparent`
   - Text block, absolute bottom-left padding 8, white bold uppercase: `<div className="absolute left-8 bottom-8 text-white"><p className="text-2xl font-extrabold leading-tight">СЧАСТЛИВЫЕ<br/>НЕДЕЛИ</p><p className="text-lg font-bold mt-1">-20% НА ЖИЛЬЁ</p></div>`

## Computed styles
- Left card bg `#F0F0F5`, radius 16px
- Button bg `#6F5DF6` hover `#5C4BE0`, radius 10px

## Assets
- `/sites/tutu-ru/root/images/promo-happy-weeks.webp`

## Text content (verbatim)
"Скидка 20% на жильё в Калининграде и Сухуме"; "Бронируйте по промокоду WOW-3"; "Забронировать"; "СЧАСТЛИВЫЕ НЕДЕЛИ"; "-20% НА ЖИЛЬЁ"

## Responsive
- ≥1024px: 2 columns side by side, equal width
- <1024px: stacks to 1 column, right card min-height 200px
