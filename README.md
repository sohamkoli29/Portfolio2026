# Portfolio 2026

Personal portfolio website of **Soham Koli**, a Computer Science Engineering student and full-stack developer. It showcases projects, skills, and contact details in a fast, responsive single-page app built with React and Vite.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup Guide](#setup-guide)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Customization](#customization)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Tech Stack

- **Framework:** React
- **Build Tool:** Vite
- **Linting:** ESLint
- **Language:** JavaScript (JSX)

> Add any other libraries you use (Tailwind CSS, Framer Motion, React Router, EmailJS, etc.) from your `package.json`.

---

## Features

- Responsive layout for mobile, tablet, and desktop
- Project showcase section
- Skills and tech stack overview
- Contact section
- Fast dev experience with Vite HMR and optimized production builds

---

## Prerequisites

- **Node.js** v18 or higher (v20+ recommended) — [Download](https://nodejs.org/)
- **npm** v9 or higher
- **Git**

```bash
node -v
npm -v
git --version
```

---

## Setup Guide

### 1. Clone the repository

```bash
git clone https://github.com/sohamkoli29/Portfolio2026.git
cd Portfolio2026
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables (only if your project uses them)

Create a `.env` file in the project root:

```bash
# macOS / Linux
touch .env

# Windows (PowerShell)
New-Item .env -ItemType File
```

See [Environment Variables](#environment-variables).

### 4. Start the development server

```bash
npm run dev
```

Open **http://localhost:5173** in your browser.

### 5. Build for production

```bash
npm run build
npm run preview
```

The production build is generated in `dist/`.

---

## Environment Variables

Vite only exposes variables prefixed with `VITE_`. Skip this section if your portfolio doesn't need any.

| Variable            | Description                          |
| ------------------- | ------------------------------------ |
| `VITE_EXAMPLE_KEY`  | Replace with your real variable (e.g. contact form service key) |

Access in code:

```js
const key = import.meta.env.VITE_EXAMPLE_KEY;
```

Never commit `.env`. Restart the dev server after changing values.

---

## Available Scripts

| Command           | Description                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start the dev server with HMR       |
| `npm run build`   | Create a production build in `dist/` |
| `npm run preview` | Preview the production build        |
| `npm run lint`    | Run ESLint                          |

---

## Project Structure

```
Portfolio2026/
├── public/              # Static assets (images, favicon, resume, etc.)
├── src/                 # React components, styles, and app logic
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

---

## Customization

1. **Personal info:** update your name, bio, and links in the relevant components inside `src/`.
2. **Projects:** add or edit entries in the projects data/component.
3. **Images and resume:** place files in `public/` and reference them with root paths (e.g. `/resume.pdf`).
4. **Page title and favicon:** edit `index.html` and replace the favicon in `public/`.

---

## Deployment

### Vercel / Netlify

1. Import the GitHub repository.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Add environment variables if you use any.

### GitHub Pages

1. In `vite.config.js`, set `base: '/Portfolio2026/'`.
2. Build and publish the `dist/` folder (e.g. with the `gh-pages` package or a GitHub Actions workflow).

---

## Troubleshooting

**Port 5173 already in use**
```bash
npm run dev -- --port 3000
```

**Install errors**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Blank page after deploying to a subpath**
Set the correct `base` in `vite.config.js`.

**Images not loading**
Files in `public/` must be referenced from the root (`/image.png`), not with a relative `public/` prefix.

---

## License

No license specified yet. Add a `LICENSE` file (e.g. MIT) if you want others to reuse the code.

---

**Author:** [Soham Koli](https://github.com/sohamkoli29)
