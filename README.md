# SectorFlow — Website

Landing page, support form, privacy policy, and terms page for [SectorFlow](https://sectorflowapp.com), an offline-first iPhone app for airline pilots.

## Structure

```
sectorflow-website/
├── index.html                        # Main landing page
├── privacy.html                      # Privacy policy (linked from App Store)
├── terms.html                        # Terms of Use
├── CNAME                             # GitHub Pages custom domain
├── robots.txt                        # Search engine crawl rules
├── sitemap.xml                       # Public page sitemap
├── README.md
└── assets/
    └── screenshots/
        ├── Logo.png                  # Official SectorFlow website logo
        ├── crew_config.png           # Crew Rest — configuration screen
        ├── crew_list.png             # Crew Rest — schedule list
        ├── prayer.png                # In-Flight Prayer Times
        ├── time_calc.png             # Time Calculator — duration mode
        ├── timezone.png              # Time Calculator — time zone mode
        └── splash.png               # App splash / launch screen
```

## Pages

| Page | Description |
|---|---|
| `index.html` | Full landing page — Hero, Features, Coming Soon, Security, Contact |
| `privacy.html` | Privacy policy page — suitable for linking from the App Store listing |
| `terms.html` | Terms of Use page |
| `robots.txt` | Crawl permissions and sitemap location |
| `sitemap.xml` | Canonical sitemap for existing static pages |

## Hosting

This site is static HTML — no build step required. To go live:

The root `CNAME` file must contain only `sectorflowapp.com`.

The support form is wired to a Cloudflare Worker endpoint placeholder. Before publishing, replace `CONTACT_WORKER_ENDPOINT` in `index.html` with the deployed Worker URL and configure the Worker to verify Cloudflare Turnstile server-side.

The website may use Cloudflare Web Analytics, Turnstile, security, and performance services. The iPhone app is described separately from the website in the privacy policy.

## To update

- **App Store link**: Replace the temporary `#contact` CTA links in `index.html` with the real App Store URL when available
- **Support endpoint**: Replace `REPLACE_WITH_CLOUDFLARE_WORKER_URL` in `index.html` with the Cloudflare Worker URL
- **Logo**: Replace `assets/screenshots/Logo.png` only if the official logo asset changes
- **Screenshots**: Replace files in `assets/screenshots/` — filenames must match exactly
- **Privacy policy date**: Update the Last updated date in `privacy.html` when making material changes

## Design

- Typography: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) + [Space Mono](https://fonts.google.com/specimen/Space+Mono)
- Colour palette: Deep navy `#0A1628` · Gold `#C9A84C` · Blue `#3B82F6`
- No JavaScript frameworks — vanilla JS only (scroll reveal observer)
- No external dependencies beyond Google Fonts
