# SeaBanner + FloatingBadge Specification

Two small, unrelated-but-trivial pieces bundled into one task since each is tiny.

## Part A — SeaBanner
- Target file: `src/components/sites/tutu-ru/root/SeaBanner.tsx` (server component, default export `SeaBanner`)
- Section wrapper: `<section className="max-w-[1336px] mx-auto px-6 my-10">`
- DOM: `<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch rounded-2xl overflow-hidden bg-tutu-surface">`
  - Left: `<div className="flex flex-col justify-center gap-3 p-8">`
    - `<h3 className="text-2xl font-semibold text-tutu-text">Море + скидки до 25%</h3>`
    - `<p className="text-sm text-tutu-muted">Отдыхайте за границей выгодно и без визы</p>`
    - `<button className="self-start rounded-[10px] bg-tutu-primary hover:bg-tutu-primary-hover text-white font-semibold text-sm px-5 py-2.5 mt-2">Найти билеты</button>`
  - Right: `<div className="min-h-[200px] bg-cover bg-center" style={{ backgroundImage: "url(/sites/tutu-ru/root/images/banner-sea-discount.webp)" }} />`
- Text verbatim: "Море + скидки до 25%"; "Отдыхайте за границей выгодно и без визы"; "Найти билеты"
- Responsive: ≥1024px 2 columns, <1024px stacks (image on top or bottom, `order` not critical — keep text first)

## Part B — FloatingBadge
- Target file: `src/components/sites/tutu-ru/root/FloatingBadge.tsx` (client component if adding animation, default export `FloatingBadge`)
- DOM: `<div className="fixed bottom-6 right-6 z-40 hidden md:block">`
  - `<button type="button" aria-label="Турбоскидки" className="block h-[88px] w-[88px] hover:scale-105 transition-transform cursor-pointer">`
    - `<img src="/sites/tutu-ru/root/images/turbo-badge.webp" alt="Турбоскидки" className="h-full w-full object-contain drop-shadow-lg" />`
- This is rendered once at the page level (not inside a section), fixed to viewport, stays visible while scrolling through the whole page
- No real click action needed; hover scale is a nice small affordance
- Hidden on mobile (`hidden md:block`) since source shows it primarily as a desktop decorative element and it would overlap mobile content

## Assets
`/sites/tutu-ru/root/images/banner-sea-discount.webp`, `/sites/tutu-ru/root/images/turbo-badge.webp`
