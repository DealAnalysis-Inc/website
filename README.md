# DealAnalysis — Website

Public marketing site for **DealAnalysis, Inc.** — `www.dealanalysis.com`.
A single-page static site (HTML / CSS / JS) with self-contained, base64-inlined
fonts and assets, plus two legal pages.

## Structure

```
.
├── index.html                 # The site (one self-contained file; fonts inlined)
├── 404.html                   # Branded not-found page
├── robots.txt
├── sitemap.xml
├── CNAME                       # GitHub Pages custom domain (see notes)
├── Legals/
│   ├── Privacy-Policy.html
│   ├── Terms-of-Service.html
│   └── legal.css               # Shared styles for the legal pages
├── images/                     # Favicons, social card, logo
│   ├── favicon.svg
│   ├── favicon-32x32.png
│   ├── icon-192.png
│   ├── apple-touch-icon.png
│   ├── og-dealanalysis.png     # Open Graph / social share card (1200×630)
│   └── lockup_navy.png         # Logo (used by legal pages, 404, JSON-LD)
└── apps-script/
    ├── Code.gs                 # Contact-form backend — deployed separately
    └── README.md
```

The website fonts are **inlined into `index.html`**, so there are no external
font requests and no separate font files are needed to serve the site.

## Deploying

The site uses **root-absolute paths** (`/images/…`, `/Legals/…`). These resolve
correctly when the site is served from a **domain root**, i.e.:

- a custom domain (`www.dealanalysis.com`), or
- a user/organization GitHub Pages site (`dealanalysis.github.io`).

They will **not** resolve from a project subpath
(`username.github.io/repo-name/`). If you deploy to a project page, either use a
custom domain or convert the paths to relative.

### GitHub Pages
1. Create the repository and upload the **contents** of this folder to the repo
   **root** (so `index.html` sits at the top level).
2. Settings → Pages → deploy from the default branch.
3. Add the custom domain `www.dealanalysis.com` (the `CNAME` file is already
   included) and point your DNS at GitHub Pages. **If you are not using a custom
   domain, delete `CNAME`.**

## Configuration to complete

1. **Contact form** — deploy `apps-script/Code.gs` to Google Apps Script and set
   `CONFIG.FORM_ENDPOINT` in `index.html` to the resulting `/exec` URL. Until
   then, the form falls back to `mailto:info@dealanalysis.com`. See
   `apps-script/README.md`.
2. **Analytics** — confirm the Google Analytics measurement ID in `index.html`
   (`G-2G35R6S7SZ`) is the correct property for this site.

## Legal pages

`Privacy-Policy.html` and `Terms-of-Service.html` are conventional drafts tuned
toward Texas/US norms (Texas governing law; Dallas County venue; Texas TDPSA and
UK/EU GDPR rights). **They are not legal advice** — have a Texas-licensed
attorney review them before relying on them.

---
© 2021–2026 DealAnalysis, Inc. All rights reserved.
