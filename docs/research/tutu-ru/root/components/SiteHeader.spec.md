# SiteHeader Specification

## Overview
- Target file: `src/components/sites/tutu-ru/root/SiteHeader.tsx` (client component, default export `SiteHeader`)
- Interaction model: static layout, hover states on links/buttons only

## DOM structure
`<div className="sticky top-0 z-50 bg-tutu-navy">` containing:
1. Inner nav row, max-width 1336px centered, horizontal padding 24px, height ~78px, flex row `justify-between items-center`:
   - Left: logo — render text "tutu" as a styled wordmark: `<span className="text-white">tu</span><span className="text-[#6F5DF6]">tu</span>` at `font-size: 28px; font-weight: 800;` (approximates the real two-tone SVG logo)
   - Center-left: nav links row, gap 24px, each `<a href="#" className="text-white/90 hover:text-white text-[15px] font-medium">`: "Это выгодно!", "Автопутешествия", "Справочная", "Путеводитель"
   - Right: `<a href="#" className="flex items-center gap-2 text-white/90 hover:text-white text-[15px]">♥ Избранное</a>`, then a purple button `<button className="flex items-center gap-2 rounded-[10px] bg-tutu-primary hover:bg-tutu-primary-hover text-white text-[15px] font-semibold px-4 py-2.5">Войти</button>` with a small person-icon SVG before the text, then a hamburger icon button (3 horizontal lines, white, 24x24) on the far right, white/10 hover circle background
2. Below the nav row: full-width orange promo strip, `max-width 1336px centered`, `rounded-2xl`, height ~40px, background `linear-gradient(90deg, #FC5D2C, #FFB118)` (approximation of the "hot sale" banner image), centered white bold text: `МОЩНАЯ РАСПРОДАЖА БИЛЕТОВ НА МОРЕ` — render "МОЩНАЯ" and "МОРЕ" each wrapped in a small black/white highlight chip (rounded-md bg-black/10 px-1) to mimic the yellow-highlighted words in the source; margin-bottom 24px before hero content starts (hero is a separate component, this component only renders header+strip)

## Computed styles
- Header bg: `#0D0B68` (exact, from getComputedStyle)
- Nav link color: `rgba(255,255,255,0.9)`, hover `#FFFFFF`, font-size 15px, font-weight 500
- "Войти" button: bg `#6F5DF6`, hover `#5C4BE0`, border-radius 10px, color white, font-weight 600, font-size 15px, padding `10px 16px`
- Logo font-size 28px, font-weight 800, letter-spacing -0.02em

## States & behaviors
- All links/buttons: `transition-colors duration-150`, `cursor-pointer`
- Sticky: `position: sticky; top: 0; z-index: 50` confirmed from source (computed `position: sticky` on the equivalent wrapper)

## Assets
None (icons are inline SVG — simple person outline for login button, 3-line hamburger, heart outline for Избранное). Keep icons minimal inline `<svg>`.

## Text content (verbatim)
Nav: "Это выгодно!", "Автопутешествия", "Справочная", "Путеводитель"
Right: "Избранное", "Войти"
Promo strip: "МОЩНАЯ РАСПРОДАЖА БИЛЕТОВ НА МОРЕ"

## Responsive
- ≥1024px: full nav row as described
- <1024px: hide the 4 middle nav links and "Избранное" (use `hidden lg:flex`), keep logo, Войти button, hamburger always visible
- Promo strip: font-size drops to 13px on mobile, padding adjusts, text stays on one line with `truncate` if needed
