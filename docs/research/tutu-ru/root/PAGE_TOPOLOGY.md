# tutu.ru — главная страница — топология (первая треть)

Scope decision (explicit user instruction): clone only the first ~1/3 of the page
(from top through the "Море + скидки до 25%" banner). Everything below that
(Заряжены на отдых, Больше впечатлений, Авто, Фишки Туту, FAQ, SEO sitemap grid,
footer) is OUT OF SCOPE for this pass.

Viewport reference: desktop 1440px, page max content width ~1336px centered.
Primary font in source: "Tutu Sans" (proprietary, not redistributable) →
substituted with Google Font "Golos Text" (great Cyrillic support, similar
geometric grotesque feel), wired in `src/app/layout.tsx` as `--font-golos`.

## Sections, top → bottom

1. **SiteHeader** (`sticky`, navy `#0D0B68`)
   - Logo "tutu", primary nav links, "Войти" button (primary purple), hamburger icon
   - Directly below: full-width orange promo strip banner (dismissible-looking, just an image banner + link)
   - INTERACTION: nav links are plain links (no real navigation target needed, `href="#"`), hover states on links/buttons

2. **HeroSearch** (same navy panel, rounded 32px bottom corners, continues header's background)
   - H1-style headline "Путешествуйте выгодно" (white, 38px/600)
   - Trust badges row (3 pill badges: guarantee, travelers count, app rating stars)
   - Plane+cloud illustration image, top-right, decorative
   - Mode-selector icon tabs: Отели / Авиабилеты (default active) / Ж/д билеты / Автобусы / Электрички / Туры / Аренда авто / Джарвел — round icon buttons, active = filled purple circle
   - **INTERACTION MODEL: click-driven.** Clicking a mode tab changes the active icon (purple fill) and swaps the search form fields below (we only need Авиабилеты's form wired with real inputs; other modes can just switch the active tab visually and show a placeholder/simplified form — full functional booking flow is out of scope, this is a static clone)
   - Search form row: Откуда / swap icon / Куда / Когда / Обратно / Пассажиры-selector / "Найти авиабилеты" button (purple, rounded 10px)
   - Quick-fill link pairs under each of the first 4 fields (e.g. "Москва" "Санкт-Петербург" under Откуда)
   - Toggle switch "Искать отели в новой вкладке" far right

3. **PromoDuo** (two cards side by side, white section directly below hero, pulled up over hero's rounded bottom corner)
   - Left: light gray `#F0F0F5` card — heading, subtext, purple "Забронировать" button
   - Right: purple gradient card with real photo background (chair on beach) — bold headline overlay "СЧАСТЛИВЫЕ НЕДЕЛИ -20% НА ЖИЛЬЁ"

4. **DealsCarousel — "Это выгодно!"** (orange gradient section, rounded corners, decorative background texture)
   - Gradient `linear-gradient(90deg, #FC5D2C 25%, #FFB118)`
   - Heading (white) + subtext + "Все билеты" link button (white pill) top-right
   - Pill tabs: Все (active, purple fill) / Самолёты / Поезда
   - **INTERACTION MODEL: click-driven tabs** — switches which cards show (we only have real data for "Все"; Самолёты/Поезда tabs should be clickable and visually switch active state, can reuse same card set — no separate data required since content-cloning of every tab state is out of scope per user)
   - Horizontal card carousel, 4 cards visible, right-edge arrow nav button (circular, white, chevron)
   - Card: photo (rounded top corners), price (bold) + old price (strikethrough) + discount badge (orange pill "-31%"), route text bold, small round airline-logo icon + date/duration/stops text

5. **PlainCarousel — "Отели по суперцене"** (white bg section)
   - Heading + subtext, no tab pills, no "see all" link visible in first row
   - Horizontal card carousel, arrow nav button appears on hover at right edge
   - Card: square-ish photo with rating badge (green pill, top-left, e.g. "7.7"), star+city+guests line, hotel name, price + discount badge + old price struck through

6. **TabbedCarousel — "Развеяться на выходных на поезде"** (purple/magenta gradient section, rounded corners)
   - Background: photographic blurred gradient, approximate as `linear-gradient(135deg, #8A3FF0 0%, #C23FD6 50%, #EF5AA8 100%)`
   - Heading (white) + pill tabs: из Москвы (active) / из Санкт-Петербурга / из Казани
   - **INTERACTION MODEL: click-driven tabs**, same simplification as section 4 (visual switch only, reuse the "из Москвы" 4 cards)
   - Horizontal card carousel, 4 cards, arrow nav
   - Card: city photo, route text bold, "от N ч M мин в пути" muted text, price "от N ₽" bold

7. **SimpleBanner — "Море + скидки до 25%"** (light gray `#F0F0F5` section, 2-column)
   - Left: heading + subtext + purple "Найти билеты" button
   - Right: full-bleed photo (family on beach), rounded right corners

8. **FloatingBadge — "Турбоскидки"**
   - Circular badge image, fixed position bottom-right of viewport (`position: fixed`), stays visible across the whole scroped scroll range, z-index above content
   - INTERACTION: decorative, likely a hover/spin animation on the pinwheel graphic in the source — approximate with a slow CSS `animation: spin` on the inner pinwheel if easy, otherwise static is acceptable

## Global layer notes
- Header + Hero share one navy rounded panel (`kite-panel-static-brand-deep` in source), radius 32px only at the bottom corners of the hero part
- Page content max-width ~1336px, centered, side padding ~24px at desktop, sections stack full-width with the light gray page background (`#FFFFFF` body, `#F0F0F5` for muted cards)
- Card carousels: no native browser scrollbar shown; arrow buttons scroll the row (`scrollBy` on click). Implement as `overflow-x-auto` flex row with `scroll-snap-type: x mandatory` + JS-free CSS scroll, arrow buttons calling `scrollBy({left: ±340, behavior: 'smooth'})`
- No smooth-scroll library (Lenis etc.) detected — native scroll only
- No scroll-triggered header shrink observed within this scope (header stays same size while sticky)
