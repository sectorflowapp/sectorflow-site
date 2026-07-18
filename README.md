# About Flying — Website

Landing page, support form, privacy policy, and terms page for [About Flying](https://sectorflowapp.com), an offline-first iPhone app for pilots.

## Structure

```
sectorflow-website/
├── index.html                        # Main landing page
├── privacy.html                      # Privacy policy (linked from App Store)
├── support.html                      # Public support information
├── terms.html                        # Terms of Use
├── .well-known/
│   ├── api-catalog                   # Honest RFC 9727-style API catalog
│   └── agent-skills/
│       ├── index.json                # Public agent-readable skills index
│       └── sectorflow-site/SKILL.md  # Public informational site skill
├── CNAME                             # GitHub Pages custom domain
├── robots.txt                        # Search engine crawl rules
├── sitemap.xml                       # Public page sitemap
├── README.md
└── assets/
    └── screenshots/
        ├── Logo.png                  # Official About Flying website logo
        ├── home.png                  # Current Home screen
        ├── crew-rest.png             # Current Crew Rest screen
        ├── sunrise-sunset.png        # Current Sunrise & Sunset screen
        ├── time-tools.png            # Current Time Tools screen
        ├── settings-about.png        # Current Settings / About screen
        └── splash.png                # Current unchanged app launch screen
```

## Pages

| Page | Description |
|---|---|
| `index.html` | Full landing page — Hero, shipping tools, app screens, privacy, and Contact |
| `privacy.html` | Privacy policy page — suitable for linking from the App Store listing |
| `support.html` | Public support information linking to the secure homepage support form |
| `terms.html` | Terms of Use page |
| `.well-known/api-catalog` | Static API catalog pointing only to the deployed contact Worker endpoint and support documentation |
| `.well-known/agent-skills/index.json` | Agent-readable index of public website information skills |
| `robots.txt` | Crawl permissions and sitemap location |
| `sitemap.xml` | Canonical sitemap for existing static pages |

## Hosting

This site is static HTML — no build step required. To go live:

The root `CNAME` file must contain only `sectorflowapp.com`.

`sectorflowapp.com` is the current public domain and remains in CNAME, canonical links, the support endpoint, and agent-readable metadata. `about-flying.com` is only a future migration candidate. A migration requires a separately reviewed DNS, redirect, canonical, endpoint, App Store metadata, and uptime plan before any current URL is changed.

The support form is wired to `https://contact.sectorflowapp.com`. If the deployed Worker URL changes, update `CONTACT_WORKER_ENDPOINT` in `index.html` and the `.well-known/api-catalog` anchor together. The Worker should verify Cloudflare Turnstile server-side.

The website may use Cloudflare Web Analytics, Turnstile, security, and performance services. The iPhone app is described separately from the website in the privacy policy.

## Agent readiness notes

The `.well-known` files intentionally describe only truthful public website capabilities. They do not advertise private app functionality, protected actions, or developer integrations.

The following isitagentready.com items are intentionally not implemented because About Flying does not currently expose those capabilities:

- OAuth/OIDC discovery
- OAuth Protected Resource Metadata
- `auth.md`
- MCP Server Card
- WebMCP
- DNS-AID

Recommended Cloudflare configuration:

- Add a Response Header Transform Rule for HTML pages:
  `Link: </.well-known/api-catalog>; rel="api-catalog", </support.html>; rel="help", </privacy.html>; rel="privacy-policy"`
- Enable Markdown for Agents in Cloudflare if available for the zone.

## To update

- **App Store link**: Replace the temporary `#contact` CTA links in `index.html` with the real App Store URL when available
- **Support endpoint**: Update `CONTACT_WORKER_ENDPOINT` in `index.html` and the `.well-known/api-catalog` anchor if the deployed Cloudflare Worker URL changes
- **Logo**: Replace `assets/screenshots/Logo.png` only if the official logo asset changes
- **Screenshots**: Replace files in `assets/screenshots/` — filenames must match exactly
- **Privacy policy date**: Update the Last updated date in `privacy.html` when making material changes

## Design

- Typography: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) + [Space Mono](https://fonts.google.com/specimen/Space+Mono)
- Colour palette: Deep navy `#0A1628` · Gold `#C9A84C` · Blue `#3B82F6`
- No JavaScript frameworks — vanilla JS only (scroll reveal observer)
- No external dependencies beyond Google Fonts
