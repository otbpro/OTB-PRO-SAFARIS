# OTB PRO SAFARIS

**Uganda's Premier Safari & Tours Consultant** — established 2009, Kampala, Uganda.

## Project Overview

A complete, production-ready static website for OTB PRO SAFARIS, designed with realistic media content tailored to a Ugandan safari and eco-tourism brand.

## Pages

| File | Description |
|------|-------------|
| `index.html` | Home page — hero, why-us features, 6 featured tour cards, destination showcase, testimonials, CTA |
| `tours.html` | Tour packages — 8 detailed safari listings with filter bar (primates, wildlife, adventure, birding, culture) |
| `gallery.html` | Photo gallery — 20-item masonry grid with category filters and keyboard-accessible lightbox |
| `about.html` | About page — company story, team profiles, conservation commitment, certifications |
| `contact.html` | Contact & booking — enquiry form, FAQ accordion, map placeholder, direct WhatsApp/call CTAs |

## Assets

```
css/styles.css   — Complete stylesheet (CSS custom properties, responsive grid, animations)
js/main.js       — Vanilla JS (sticky nav, mobile menu, gallery lightbox, scroll-reveal, counter animation)
```

## Design System

- **Palette:** Forest Green `#1a6b3c` · Gold `#c8960c` · Cream `#fdf6e3`
- **Typography:** Playfair Display (headings) + Lato (body) via Google Fonts
- **Layout:** CSS Grid + Flexbox, fully responsive (mobile → desktop)
- **Images:** Themed CSS gradient placeholders — drop in real photos by replacing `.img-placeholder` elements with `<img>` tags

## Content Highlights

- 8 detailed tour packages: Gorilla Trekking, Queen Elizabeth Safari, Murchison Falls, Chimp Tracking, Birding Safari, White-water Rafting, Rhino Tracking, Cultural Trail
- 6 guest testimonials from international travellers
- 6 team member profiles
- 6 accreditation badges (Uganda Tourism Board, AUTO, UWA, TripAdvisor, IATA, Eco-Tourism Uganda)
- 6-question FAQ with native `<details>` accordion
- Full booking enquiry form with tour, budget, accommodation and date selectors

## Local Development

Open any `.html` file directly in a browser — no build step required.

```bash
# Optional: serve with any static file server
npx serve .
# or
python3 -m http.server 8080
```

