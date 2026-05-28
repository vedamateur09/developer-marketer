# Design System

## Color Strategy: Full Palette (two named registers)

### Marketeer Palette (mode: .marketeer-mode)
| Token | Value | Role |
|-------|-------|------|
| mk-bg | #F5F0E8 | Page background — warm cream |
| mk-ink | #1A1A1A | Primary text, borders |
| mk-yellow | #FFE500 | Primary accent, hero fill |
| mk-red | #FF4C39 | CTA buttons, active word-swap state |
| mk-blue | #1C1CF0 | Progress bar, card hover shadows |
| mk-strip | #1A1A1A | Film strip background |

### Developer Palette (mode: .developer-mode)
| Token | Value | Role |
|-------|-------|------|
| dev-bg | #0D1117 | Page background — GitHub dark |
| dev-surface | #161B22 | Cards, terminal block |
| dev-border | #30363D | Borders, dividers |
| dev-text | #E6EDF3 | Primary text |
| dev-muted | #8B949E | Secondary text, labels |
| dev-orange | #F54E00 | PostHog accent, progress bar |
| dev-green | #00FF87 | Terminal commands |

## Typography

### Marketeer Mode
- **Display / Hero**: Playfair Display, 900 weight, serif — "I Make / Developers Give a Damn."
- **Body / UI**: DM Sans — readable, modern, friendly
- **Labels / Monospace accents**: Space Mono — section eyebrows, footer code lines
- **Hero size**: clamp(3rem, 8vw, 7rem) with WebkitTextStroke: 2px #1A1A1A

### Developer Mode
- **All code / headings**: JetBrains Mono — consistent with IDE aesthetic
- **Body / prose**: Inter — clean technical prose
- **Code tokens**: JetBrains Mono with syntax color classes (.token-keyword, .token-string, etc.)

### Scale
- Body line length: 65–75ch maximum
- Terminal line height: 1.65
- Card body: text-sm (14px), leading-relaxed

## Spacing Rhythm
All sections use: `px-6 md:px-16` horizontal padding, `py-16` or `py-20` vertical padding.
Exception: HeroSection uses `min-h-screen` with `pt-24 pb-12`.

## Component Patterns

### Cards
- **Marketeer work cards**: `mk-card` class (white bg, 1.5px #1A1A1A border) + inline `borderTop: 3px solid accent` + subtle `background: accent + 0C` tint. Large decorative numbers as primary accent mechanism. NO border-left (banned side-stripe).
- **Developer code cards**: `dev-code-card` class (surface bg, dev-border) with orange hover glow.
- **NO** side-stripe borders (border-left/right > 1px as colored accent) — absolute ban.

### Buttons
- Primary CTA: `#FF4C39` pill, DM Sans 700, padding 16px 32px, border-radius 9999px
- Footer contacts: transparent outline pill, 2px border, magnetic hover effect
- Toggle: pill-shaped tablist with animated `layoutId="toggle-pill"` background (yellow/#FFE500 in marketeer, orange/#F54E00 in developer)

### Motion
- Page transitions: screen-split curtain (two panels from edges, 600ms each phase)
- Fade-in sections: opacity 0→1, y 40→0, ease [0.21, 0.47, 0.32, 0.98], 700ms
- Word swap: y 100%→0% in, y 0%→-100% out, duration 0.5s, ease [0.76, 0, 0.24, 1]
- Spring: stiffness 150–380, damping 15–42, no bounce/elastic
- NO CSS layout property animations

## Absolute Bans
1. Side-stripe borders (border-left/right > 1px as colored accent on cards)
2. Gradient text (background-clip: text)
3. Glassmorphism used decoratively
4. Hero-metric template (big number + small label + gradient)
5. Identical card grids (icon + heading + text, no variation)
6. Em dashes in copy (use comma, colon, semicolon, or parentheses)
7. Bounce / elastic spring animations
