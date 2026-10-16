💼 Karanveer's Developer Portfolio

A modern, fast, responsive personal portfolio built with React, Vite, and Tailwind CSS. Designed to highlight full-stack projects, software engineering skills, verifiable certifications, and professional experience with sleek interactive animations and interactive UI components.

🚀 Live Demo

Deployed URL: https://karanveer-singh-portfolio.vercel.app/


🌟 Features

⚡ Blazing Fast Build & Performance: Powered by Vite and React 18 for instantaneous Hot Module Replacement (HMR).

🎨 Modern Visual Design: Custom background animations, glassmorphism cards, interactive particle/gradient backdrops, and responsive layouts for mobile, tablet, and desktop screens.

📂 Featured Projects Showcase:

Fluxora: Modern web experience platform with high-fidelity UI and smooth interactions.

Studora: Educational / productivity management suite.

BrainBlitz: Interactive quiz & trivia platform built with dynamic state handling.

📜 Verified Certifications & Credentials:

Infosys Springboard: Backend Development with Python, APIs, and Database Systems.

Udemy: Python Programming Zero to Hero Masterclass.

DeepLearning.AI / Vanderbilt: Prompt Engineering for Generative AI.

ICISFT: International Conference Participation & Technical Paper presentation.

📄 Resume Integration: One-click preview and download of resume.pdf.

📬 Contact & Social Links: Direct outreach channels via LinkedIn, GitHub, and email.

🛠️ Tech Stack

Frontend & Core

Framework: React 18

Build Tool: Vite

Styling: Tailwind CSS / Vanilla CSS3 modules

Icons: Custom SVG Icon sprite sheet (icons.svg) & Lucide / React Icons

Linting & Code Quality: ESLint with modern flat config (eslint.config.js)

📁 Project Directory Structure

portfolio/
├── public/
│   ├── brainblitz-preview.png     # BrainBlitz project screenshot
│   ├── fluxora-preview.png        # Fluxora project screenshot
│   ├── studora-preview.png        # Studora project screenshot
│   ├── icisft-cert.png            # Conference certificate preview
│   ├── infosys-cert.png           # Infosys certificate preview
│   ├── prompt-engineering-cert.png# Prompt Engineering certificate
│   ├── Udemy_python.png           # Udemy Python certification preview
│   ├── icons.svg                  # SVG icons vector sprite
│   ├── karan.svg                  # Brand avatar / signature icon
│   └── resume.pdf                 # Downloadable resume
├── src/
│   ├── assets/                    # Static branding and hero graphics
│   ├── Background.jsx             # Animated canvas / gradient backdrop
│   ├── Navigation.jsx             # Sticky responsive navbar with smooth scroll
│   ├── data.js                    # Centralized project, skill, and cert data
│   ├── App.jsx                    # Root portfolio composition
│   └── main.jsx                   # React DOM entry point
├── eslint.config.js               # ESLint configuration
├── index.html                     # HTML5 entry template & metadata
├── package.json                   # Project dependencies and scripts
├── vite.config.js                 # Vite bundler configuration
└── README.md                      # Project documentation


⚙️ Getting Started Locally

Prerequisites

Node.js (version 18.x or higher recommended)

npm (bundled with Node.js) or pnpm / yarn

1. Clone the repository

git clone https://github.com/your-username/portfolio.git
cd portfolio


2. Install dependencies

npm install


3. Start local development server

npm run dev


Open your browser and navigate to http://localhost:5173/ (or the port specified in your terminal).

4. Create production build

npm run build


This generates an optimized, minified bundle inside the dist/ folder ready for deployment.

5. Preview production build locally

npm run preview


🚢 Deployment

This project can be deployed seamlessly on any modern static hosting service:

Vercel: Import your GitHub repo, select framework preset Vite, and deploy.

Netlify: Set build command to npm run build and publish directory to dist.

GitHub Pages: Build the project and deploy the dist directory via gh-pages or GitHub Actions.

🤝 Contributing & Feedback

Contributions, feedback, and suggestions are always welcome!
Feel free to open an issue or submit a pull request.

📄 License

This repository is licensed under the MIT License.