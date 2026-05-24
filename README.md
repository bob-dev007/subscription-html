# Subscription Landing Page

A modular, production-style subscription landing page built with HTML, Tailwind utility classes, and scoped CSS files.

## Overview

This project uses a section-based architecture where the main entry page (`index.html`) dynamically loads reusable HTML partials from `sections/` and `shared/` using `include.js`.

## Project Structure

```text
.
|-- index.html               # Main page shell
|-- include.js               # HTML partial loader
|-- sections/                # Reusable page sections
|-- shared/                  # Shared UI fragments (e.g. modal)
|-- pages/                   # Additional standalone pages
|-- src/css/                 # Component and global styles
|-- assets/images/           # Static image assets
`-- tailwind.config.js       # Tailwind content paths
```

## Tech Stack

- HTML5
- Tailwind CSS (CDN)
- Custom CSS modules
- Vanilla JavaScript (`fetch`-based include system)

## How to Run

Because `include.js` loads section files with `fetch()`, the site must run from a local HTTP server. Opening `index.html` directly with `file://` will not work correctly.

### Option 1: VS Code Live Server

1. Open the project in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html` and select **Open with Live Server**.

### Option 2: Python HTTP Server (Port 8080)

From the project root:

```bash
python -m http.server 8080
```

```powershell
python -m http.server 8080
```

Then open:

```text
http://localhost:8080/index.html
```

## Notes

- Tailwind is loaded from CDN in `index.html`.
- Styling is split by section under `src/css/` for easier maintenance.
- `tailwind.config.js` is included for future local Tailwind build workflows.

## Recommended Next Improvements

- Add an npm-based build pipeline (Tailwind CLI + minification).
- Add linting/formatting rules (Prettier + style checks).
- Add deployment instructions (Netlify/Vercel/GitHub Pages).
