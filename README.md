Built with pure HTML/CSS/JS, a lightweight canvas starfield, and glassmorphism styling. No build step or runtime dependencies required.

---

## Architecture & Notes

- **Static**: Runs instantly on GitHub Pages or Cloudflare Pages with zero build step.
- **Space theme**: Pitch black (`#000000`) background with subtle twinkling stars and ambient nebula glows.
- **Responsive**: Clean CSS custom properties, system font fallbacks, and mobile navigation.

---

## Project Structure

```text
m1ten.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions deployment to Pages
├── CNAME                   # Custom domain
├── index.html              # Markup, meta tags, and project showcases
├── styles.css              # Theme tokens, glassmorphism, and responsive layout
├── main.js                 # Canvas starfield engine, filtering, and copy helper
└── README.md               # Setup and notes
```

---

## Local Development

Spin up any local static server:

```bash
# Python
python3 -m http.server 8000

# Node / npx
npx serve .

# Bun
bun x serve .
```

Visit `http://localhost:8000` to preview.

---

## Deployment

### GitHub Pages (Current)
Pushes to `main` trigger the GitHub Actions workflow in `.github/workflows/deploy.yml` automatically.