# План «Б» — Tutu AI-хакатон

Продукт: **«Срочно добраться» / «План «Б»»** (`/urgent`) — сравнивает
самолёт, поезд, автобус и электричку одновременно и находит способ успеть к
конкретному сроку, а не просто купить билет на дату. Построен поверх
публичного MCP-сервера Tutu (`https://mcp.tutu.ru/mcp`, `search_multitransport`).

Остальная часть сайта (главная `/` — hero-поиск, карусели предложений, отели,
промо-баннеры) — статичная витрина для визуального контекста; реальная логика
и интеграция с MCP есть только на странице «План «Б»». Подробности — в
[CURRENT_STATE.md](CURRENT_STATE.md).

## Прод

**https://tutu.666.ad/urgent** — актуальный прод, фича «План «Б»».
Витрина (главная) — на **https://tutu.666.ad**.

## Запуск

```bash
npm install
npm run dev
```

Открыть [http://localhost:3000](http://localhost:3000) — там будет главная
витрина; сама фича — по кнопке «Срочно добраться» в шапке или напрямую на
[http://localhost:3000/urgent](http://localhost:3000/urgent).

```bash
npm run build   # прод-сборка
npm run lint    # ESLint
npx tsc --noEmit  # проверка типов
```

## Стек

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4.
Бэкенд — один read-only route handler
(`src/app/api/urgent-travel/search/route.ts`), проксирующий поиск в
`mcp.tutu.ru/mcp` (JSON-RPC, без ключей и авторизации). Никакой БД, `.env`
или auth в проекте нет.
