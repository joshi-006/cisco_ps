# Club Merch Order Consolidator

A React app that consolidates club members' merchandise orders into a vendor-ready summary. Members' orders are validated against a vendor catalog, aggregated per variant, and totalled.

**Live demo:** https://joshi-006.github.io/cisco_ps/

## Features

- **Vendor catalog** — fixed list of orderable variants (item, size, colour, unit price)
- **Editable orders table** — add, edit, or delete member orders inline
- **Validation** with precedence: blank fields → duplicate order ID → invalid quantity → unknown variant, with a clear error banner for the first failing row
- **Consolidated summary** — units and revenue per variant in catalog order, with proportional unit bars and grand totals in rupees

## Tech stack

- [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
- [Vitest](https://vitest.dev/) for unit tests
- Deployed to GitHub Pages via GitHub Actions on every push to `main`

## Project structure

```
src/
  domain/       # pure business logic (normalize, validate, consolidate) + tests
  data/         # vendor catalog and built-in sample orders
  components/   # presentational React components
  utils/        # formatting helpers
  styles/       # global theme
```

## Getting started

```bash
npm install
npm run dev      # start dev server
npm test         # run unit tests
npm run build    # production build
```
