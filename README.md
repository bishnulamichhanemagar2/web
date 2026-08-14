# S&B Nexus — Objects for Considered Living

A full-stack furniture & everyday goods storefront built with React + Vite and a small Node.js API.

![Stack](https://img.shields.io/badge/React-18-blue) ![Stack](https://img.shields.io/badge/Vite-6-purple) ![Stack](https://img.shields.io/badge/Node.js-20-green)

## Features

- **Editorial storefront** — hero, story, and about sections with view routing via URL hash
- **Product grid** — 25 products with category & material pills, search, and sort (price ↑↓, A–Z)
- **Loading skeleton** — shimmer placeholders while the API loads
- **Empty state** — clear message + "Clear filters" button when nothing matches
- **Shopping bag** — slide-in drawer with quantity controls, subtotal, and free-shipping threshold
- **Checkout flow** — shipping method + Card / Pay-on-delivery, posts to the API
- **Wishlist** — heart toggle on every card, persists to `localStorage`, with "move to bag"
- **Quick view** — click any product card to open a fast look at details and actions
- **Admin control panel** — live stats (products, orders, revenue) and order status flow
  (New → Processing → Shipped → Delivered) via `PATCH /api/orders/:id`
- **Toast notifications** — subtle confirmations for cart, wishlist, and order actions
- **Mobile menu** — hamburger navigation on small screens
- **Responsive** — grid and typography scale down to a two-column mobile layout
- **Accessibility** — focus rings, ARIA labels, `prefers-reduced-motion` support, Escape-to-close

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Start the API server  (http://localhost:5174)
npm run server

# 3. Start the Vite dev server  (http://localhost:5173)
npm run dev
```

Open http://localhost:5173 in your browser.

> The Vite dev server proxies `/api` requests to the Node server through
> `vite.config.js` — no extra configuration needed.

## Scripts

| Command           | Description                            |
| ----------------- | -------------------------------------- |
| `npm run dev`     | Start Vite dev server (port 5173)      |
| `npm run server`  | Start the Node API server (port 5174)  |
| `npm run build`   | Production build of the client         |
| `npm run preview` | Preview the production build           |
| `npm run lint`    | Run Oxlint over the source             |

## API

| Method | Endpoint            | Description                                    |
| ------ | ------------------- | ---------------------------------------------- |
| GET    | `/api/products`     | List all products                              |
| GET    | `/api/orders`       | List all placed orders                         |
| POST   | `/api/orders`       | Create an order `{ items, total, shipping, payment }` |
| PATCH  | `/api/orders/:id`   | Update an order status (`New`, `Processing`, `Shipped`, `Delivered`) |

Orders are held in memory, so restarting the API resets them.

## Project structure

```
├── index.html          # Entry HTML, fonts, favicon
├── vite.config.js      # Dev server + /api proxy
├── server/index.js     # Node API (products + orders)
└── src/
    ├── main.jsx        # React bootstrap
    ├── App.jsx         # Storefront application
    ├── App.css         # Section-based styles
    └── index.css       # Global foundation & design tokens
```

## Design notes

- Warm palette: deep teal ink, ivory cream, terracotta orange, sage, and butter yellow
- Type pairing: DM Sans for structure, Playfair Display for editorial accents
- Max content width 1440px with generous vw-based spacing