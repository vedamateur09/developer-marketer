# Portfolio — Dual-Persona Website

A single-page portfolio site with a **MARKETEER ↔ DEVELOPER** mode toggle. Built to apply for a Developer Marketer role at PostHog.

## Setup

```bash
cd portfolio
npm install
npm run dev       # dev server at http://localhost:5173
npm run build     # production build → portfolio/dist/
npm run preview   # preview the production build
```

## Deploy

The build output in `portfolio/dist/` is a static site ready for Vercel, Netlify, or GitHub Pages. For Vercel: point the root directory to `portfolio/`.

## Placeholders to fill in

Search for these strings across `portfolio/src/` and replace with real values:

| Placeholder | Replace with |
|---|---|
| `[YOUR_NAME]` | Your full name |
| `[YOUR_EMAIL]` | Your contact email |
| `[YOUR_LINKEDIN_URL]` | Your LinkedIn profile URL |
| `[SUBSTACK_URL]` | Your Substack profile link |
| `[SUBSTACK_ARTICLE_1_TITLE]` | Title of first Substack essay |
| `[SUBSTACK_ARTICLE_2_TITLE]` | Title of second Substack essay |
| `[MEME_PAGE_URL]` | Link to Logo Crimes archive |
| `[PLACEHOLDER_USE_CASE]` | Per-node tooltip text in architecture diagram (in `ArchitectureDiagram.jsx`, the `NODE_TOOLTIPS` object) |
| `[X]`, `[Y]` | Real metrics from ZS work (in `TerminalHero.jsx` and code cards) |

## Tech stack

- React 19 + Vite 8
- Tailwind CSS v3
- Framer Motion 12
- @xyflow/react 12 (interactive architecture diagram)
- Lucide React (icons)
- Google Fonts CDN
