# Karanveer's Interactive Developer Portfolio

An immersive, ocean-inspired portfolio built with React and Vite. The experience presents projects, skills, credentials, and contact details as a scroll-driven expedition rather than a collection of static pages.

## Live Demo

**Production:** https://karanveer-singh-portfolio.vercel.app/

## Experience highlights

### Interactive ocean environment

- Procedural WebGL water, horizon lighting, caustics, depth haze, and abyss color transitions.
- A visible moving sun with atmospheric bloom, shifting light rays, and a reflective sun track across the surface.
- A device-pixel-ratio-aware canvas for sharper rendering on high-density screens.
- A lightweight 2D marine-life layer with fish, jellyfish, rays, bubbles, and distant particles.
- Pointer parallax and smooth scroll interpolation make the scene respond to the visitor.
- Click or touch the water to create expanding surface ripples and disturb nearby marine life.
- Wind-driven micro-ripples and changing foam highlights keep the water active even when the visitor is still.
- Rendering pauses when the tab is hidden and quality adapts for smaller or lower-power devices.

### Scroll-driven portfolio system

- The page maps scroll progress to expedition depth, atmospheric pressure, temperature, and visual zones.
- Smooth navigation jumps between Surface, Capabilities, Projects, Credentials, Trajectory, and Lighthouse sections.
- Sticky navigation updates its depth readout and active zone as the visitor explores.
- Intro progress can be skipped, making the experience accessible to returning visitors.

### High-interaction content

- Skill topology: select or hover a skill to reveal connected technologies and filter by domain.
- Project schematics with responsive cards, hover elevation, project previews, and live links.
- Credential archive with certificate dossier modals, keyboard Escape handling, and touch-safe scrolling.
- Command palette for quickly jumping to zones and running portfolio queries.
- Lighthouse console with searchable commands, copy-email action, social links, and contact form.
- Responsive mobile navigation with scroll locking, safe-area spacing, and large touch targets.

### Accessibility and performance

- Honors `prefers-reduced-motion` by reducing or disabling non-essential animation.
- Uses passive scroll listeners, `requestAnimationFrame`, visibility detection, and lazy section rendering.
- Keeps modal and mobile-menu focus interactions isolated from the page behind them.
- Uses semantic buttons, labels, keyboard shortcuts, and readable contrast for primary controls.

## Featured content

- **Fluxora** — modern web experience platform.
- **Studora** — education and productivity management suite.
- **BrainBlitz** — interactive quiz and trivia platform.
- Certifications from Infosys Springboard, Udemy, DeepLearning.AI/Vanderbilt, and ICISFT.
- Downloadable resume and direct LinkedIn, GitHub, and email links.

## Technology

- React 19
- Vite
- WebGL fragment shaders and Canvas 2D
- Vanilla CSS-in-JSX for the visual system
- Lucide React, React Icons, Framer Motion, GSAP, and supporting UI utilities
- ESLint with the flat configuration format

## Project structure

```text
portfolio/
├── public/
│   ├── *-preview.png       # Project previews
│   ├── *-cert.png          # Certificate images
│   ├── icons.svg           # SVG icon sprite
│   ├── karan.svg           # Brand mark
│   └── resume.pdf          # Downloadable resume
├── src/
│   ├── App.jsx             # Portfolio sections and interactive systems
│   ├── Background.jsx      # WebGL ocean and 2D marine-life layers
│   ├── Navigation.jsx      # Expedition navigation and reveal helpers
│   ├── data.js             # Centralized portfolio content
│   └── main.jsx            # React entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Run locally

### Requirements

- Node.js 18 or newer
- npm

### Install and start development

```bash
git clone https://github.com/karanveernov-png/Karanveer_Portfolio.git
cd Karanveer_Portfolio
npm install
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173/`.

### Validate and build

```bash
npm run lint
npm run build
npm run preview
```

`npm run build` creates the deployable production bundle in `dist/`. `npm run preview` serves that bundle locally.

## Deployment

The project is a static Vite application and can be deployed to Vercel, Netlify, GitHub Pages, or any static host.

| Platform | Build command | Output directory |
| --- | --- | --- |
| Vercel | `npm run build` | `dist` |
| Netlify | `npm run build` | `dist` |
| GitHub Pages | `npm run build` | `dist` |

## Customization

1. Update portfolio content in `src/data.js`.
2. Replace preview, certificate, or resume files in `public/`.
3. Tune the visual and interaction systems in `src/Background.jsx`, `src/Navigation.jsx`, and `src/App.jsx`.
4. Run `npm run build` before deploying.

## License

This repository is licensed under the MIT License.
