# sectorflow-site

Static GitHub Pages website for SectorFlow.

## Deployment

- Hosted from this repository via GitHub Pages.
- Custom domain is configured in `CNAME`.
- Site remains compatible with Cloudflare DNS and static hosting.

## Support Form

The support form validates company, name, email, topic, and message fields in the browser. It also includes a hidden honeypot field and the Cloudflare Turnstile client widget.

Live delivery is intentionally not handled in public client-side code. Configure the support destination privately in a Cloudflare Worker, Cloudflare Pages Function, or trusted form provider. Do not place the destination address, Turnstile secret key, mail API keys, or provider secrets in public HTML, JavaScript, comments, logs, or repository files.

## Cloudflare Turnstile

The public Turnstile site key is included on the support page. Server-side verification is still required before trusting submissions:

- Verify `cf-turnstile-response` with Cloudflare Siteverify from a private backend or trusted form provider.
- Store the Turnstile secret key only in private environment variables or provider-managed secrets.
- Forward verified support requests from the private endpoint to the configured support destination.
