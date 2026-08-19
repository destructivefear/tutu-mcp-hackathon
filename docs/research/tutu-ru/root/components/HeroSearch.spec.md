# HeroSearch Specification

## Overview
- Target file: `src/components/sites/tutu-ru/root/HeroSearch.tsx` (client component, default export `HeroSearch`)
- Interaction model: click-driven mode tabs (React `useState`)
- This section sits directly below SiteHeader, same navy background, so render a `<section className="bg-tutu-navy rounded-b-[32px] pb-10">` wrapping everything below, inner content max-width 1336px centered, padding-x 24px, padding-top 32px

## DOM structure
1. `<h1 className="text-white text-[38px] font-semibold leading-[1.2]">Путешествуйте выгодно</h1>` (use h1 here since it's the page's visual hero headline, even though source used h2 — acceptable for a landing page's single hero)
2. Trust badges row, `flex gap-3 mt-4`, three pill badges `<div className="flex items-center gap-1.5 rounded-full bg-white/10 text-white text-[13px] px-3 py-1.5">`:
   - "🛡 22 года работаем для вас" (use a small shield SVG instead of emoji)
   - "🚶 42 млн путешествуют с нами" (walker/people SVG)
   - "★★★★☆ 4,84 — рейтинг приложения" (render 5 small star SVGs, 4 filled gold `#FFB118` + 1 half/outline, then text)
3. Decorative plane image: `<img src="/sites/tutu-ru/root/images/hero-plane.webp" alt="" className="hidden lg:block absolute right-6 top-6 w-[280px] h-auto pointer-events-none select-none" />` — parent section needs `relative` positioning for this to place correctly top-right
4. Mode tabs row, `flex gap-6 mt-8 overflow-x-auto`, 8 items, each a `<button>` with a 48px circular icon container + label below (12px gap), label `text-white text-[13px]` (`text-white/70` when inactive... actually keep label white always, only icon circle changes fill):
   - Icon circle: `w-12 h-12 rounded-full flex items-center justify-center transition-colors`, active = `bg-tutu-primary` with white icon, inactive = `bg-white` with `text-tutu-navy` icon
   - Items in order: Отели (bed icon), Авиабилеты (plane icon, **default active**), Ж/д билеты (train icon), Автобусы (bus icon), Электрички (rail icon), Туры (palm/suitcase icon — also render a small orange "Кешбэк до 7%" badge pill above this icon), Аренда авто (car icon), Джарвел (gear/sparkle icon — also render a small purple "ИИ-помощник" badge pill above this icon)
   - Use simple inline SVG line icons (12-16px viewBox, stroke-based) for each — they don't need to be pixel-exact, just recognizable silhouettes
   - Clicking any icon sets it active (`useState<string>('avia')`), only one active at a time
5. Search form card, `mt-6 bg-white rounded-2xl flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-gray-200 overflow-hidden`:
   - Only render the full field set when active mode is "Авиабилеты" (default); for any other active mode, render a simplified 2-field row (`Откуда` / `Куда` placeholder inputs + same CTA button) inside the same card — this keeps the tab-click behavior real without requiring full per-mode form parity (explicitly reduced scope)
   - Авиабилеты fields, each `flex-1 px-5 py-3.5`: label above (`text-xs text-tutu-muted`) + plain-text value below (`text-[15px] text-tutu-text font-medium`), implemented as real `<input>` styled borderless with placeholder text, NOT disabled — user can type:
     - "Откуда" placeholder "Откуда", with a swap icon (⇄) button between this and "Куда" field, circular white bg, subtle border
     - "Куда" placeholder "Куда"
     - "Когда" placeholder "Когда"
     - "Обратно" placeholder "Обратно"
     - "Кто летит" — value text "1 пассажир, эконом"
   - CTA button, `bg-tutu-primary hover:bg-tutu-primary-hover text-white font-semibold rounded-[10px] px-6 mx-3 my-3 lg:my-0 whitespace-nowrap`: "Найти авиабилеты"
6. Quick-link row directly under the form, `flex gap-6 mt-3 text-[13px]`: under "Откуда"/"Куда" columns show two link pairs `<button className="text-white/80 hover:text-white underline-offset-2 hover:underline">`: "Москва" "Санкт-Петербург" (for Откуда) and "Санкт-Петербург" "Москва" (for Куда), and under "Когда"/"Обратно": "Сегодня" "Завтра" and "Завтра" "Послезавтра". Clicking one fills the corresponding input's value (simple `useState` per field, wire the CTA-adjacent quick links to `setState` on the relevant input).
7. Far right (same row or wraps below on smaller screens): toggle switch — `<label className="flex items-center gap-2 text-white text-[13px]">Искать отели в новой вкладке<Switch /></label>` — build `Switch` as a small inline styled `<button role="switch">` (44x24px pill, purple `#6F5DF6` when on, gray `#3a3875` when off, white circle thumb sliding via `translate-x`), default ON, clickable to toggle `useState<boolean>`

## Computed styles
- Background: `#0D0B68` (same navy as header — this section is visually continuous with SiteHeader, just place them adjacent in the page, no visible seam)
- H1: `font-size: 38px; font-weight: 600; line-height: 45.6px; color: white`
- CTA button bg `#6F5DF6` hover `#5C4BE0`, radius 10px
- Search card: `border-radius: 16px`, `background: white`

## Assets
- `/sites/tutu-ru/root/images/hero-plane.webp` (already downloaded to `public/sites/tutu-ru/root/images/hero-plane.webp`)

## Text content (verbatim)
"Путешествуйте выгодно"; "22 года работаем для вас"; "42 млн путешествуют с нами"; "4,84 — рейтинг приложения"; mode labels: "Отели", "Авиабилеты", "Ж/д билеты", "Автобусы", "Электрички", "Туры", "Аренда авто", "Джарвел"; badges "Кешбэк до 7%", "ИИ-помощник"; field labels "Откуда","Куда","Когда","Обратно","Кто летит"; value "1 пассажир, эконом"; button "Найти авиабилеты"; quick links "Москва","Санкт-Петербург","Сегодня","Завтра","Послезавтра"; toggle label "Искать отели в новой вкладке"

## Responsive
- ≥1024px: mode tabs single row, search form single row (flex-row)
- <1024px: mode tabs row becomes horizontally scrollable (`overflow-x-auto`), search form stacks fields vertically (`flex-col`), plane illustration hidden (`hidden lg:block`), toggle row wraps below CTA button
