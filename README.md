# sectorflow-site

Static GitHub Pages website for SectorFlow.

## Deployment

- Hosted from this repository via GitHub Pages.
- Custom domain is configured in `CNAME`.
- Site remains compatible with Cloudflare DNS and static hosting.

## Support Form

The support form validates name, email, and message fields in the browser and includes a hidden honeypot field. It currently prepares a support request through the user's email app because no server-side form endpoint is configured yet.

## Cloudflare Turnstile

`index.html` includes a Turnstile implementation placeholder near the support form. To complete setup:

- Add the Cloudflare Turnstile script after keys are issued.
- Replace the placeholder with the real Turnstile site key.
- If a server endpoint is added later, validate Turnstile response tokens server-side before forwarding support requests.
