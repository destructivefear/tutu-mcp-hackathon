# tutu.ru root — behaviors (scope: first 1/3 of page)

## Sticky header
Header + orange promo strip sit in a normal-flow wrapper that becomes `position: sticky; top: 0` once you scroll past it (confirmed via computed style `position: sticky` on the inner nav wrapper). Background navy `#0D0B68`, no shadow/size change observed on scroll within the scoped area.

## Hero mode tabs (click-driven, NOT scroll-driven)
Confirmed by inspection: 8 round icon buttons (Отели, Авиабилеты, Ж/д билеты, Автобусы, Электрички, Туры, Аренда авто, Джарвел). Default active = Авиабилеты (filled purple circle `#6F5DF6`, white icon; inactive = white circle, dark icon, label below in white/gray text).
- Trigger: click on a tab button
- Before: `background-color: transparent/white`
- After (active): `background-color: #6F5DF6`, icon color white
- Transition: simple color transition (~150ms), no layout shift
- Effect on form: full site swaps the 4-6 input fields under the tabs to match the selected transport mode. For this clone, implement client-side React state; only the Авиабилеты layout needs the exact 6-field form (Откуда/Куда/Когда/Обратно/Пассажиры/CTA) — other tabs may reuse a simplified 2-3 field placeholder layout since deep functional parity isn't required, but the tab click itself MUST update visually and be keyboard/mouse clickable.

## Carousel pill tabs (click-driven)
Both "Это выгодно!" (Все/Самолёты/Поезда) and "Развеяться на выходных" (из Москвы/из Санкт-Петербурга/из Казани) use the same pattern:
- Pill button row, active = solid purple fill `#6F5DF6` + white text, inactive = white fill + dark text
- Trigger: click
- Transition: background-color transition ~150ms
- Per user's explicit scope reduction: do NOT fetch/build separate card datasets for every tab. Clicking switches the active pill state; the card row can keep showing the same (default tab's) cards. This keeps the interaction real and clickable without requiring full per-tab content cloning.

## Carousel horizontal scroll
Card rows are horizontally scrollable containers. A circular arrow button sits at the right edge (and left edge once scrolled) that advances the scroll position.
- Trigger: click on arrow button
- Mechanism: `ref.current.scrollBy({ left: 340, behavior: 'smooth' })`
- No autoplay/auto-cycling observed.

## Hover states
- Buttons (purple CTA, pill tabs): slight darken on hover (`#6F5DF6` → `#5C4BE0`), cursor pointer
- Cards: subtle `box-shadow` lift + `transform: translateY(-2px)` on hover is a reasonable, unobtrusive approximation (exact hover shadow values weren't captured precisely; keep it subtle, e.g. `shadow-md` on hover)
- Nav links: underline or color shift on hover

## Toggle switch ("Искать отели в новой вкладке")
Standard on/off switch, purple when on. Purely visual state toggle, no real new-tab behavior needed (or optionally could actually open in new tab — not required).

## Floating "Турбоскидки" badge
`position: fixed`, bottom-right, stays pinned through the whole scroped scroll range (verified visible identically across all captured scroll screenshots at the same viewport position). Circular badge with a pinwheel-style graphic — decorative only, no confirmed click target required for this scope.

## Responsive
Not deeply tested for this scope per user's simplified ask, but implement standard Tailwind responsive stacking as a reasonable default:
- ≥1024px: layouts as described (multi-column, horizontal carousels with visible multiple cards)
- <1024px: promo duo and simple-banner sections stack to single column; hero search fields stack vertically; carousels remain horizontally scrollable (this is the natural mobile pattern and requires no extra work beyond flex-wrap/stack)
