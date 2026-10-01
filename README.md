# PeoplePilot — Public Website

This is a Vite + React TypeScript project for the PeoplePilot public website.

Local development

```powershell
cd PeoplePilot-Website
npm install
npm run dev
```

Production preview

```powershell
npm run build
npm run preview -- --port 5174
```

Deploy

The repository includes a GitHub Actions workflow (on `main`) that builds and deploys the `dist` folder to the `gh-pages` branch. Enable GitHub Pages in repository settings (serve from `gh-pages` branch) to publish to https://<your-username>.github.io/peoplepilot-website or configure a custom domain.

Netlify (recommended for contact form)

If you want serverless contact handling and automatic favicon generation, deploy to Netlify:

- Connect this GitHub repository in Netlify and set the build command to `npm run build` and publish directory to `dist`.
- The included `netlify.toml` will build the site and generate favicons during deploy and exposes a serverless function at `/.netlify/functions/contact`.
- In Netlify site settings, add an environment variable `FORM_ENDPOINT` with your Formspree endpoint (e.g. `https://formspree.io/f/your-id`) so the contact function can forward submissions.

Local development with Netlify CLI

To run the site and functions locally with Netlify's emulation, install the Netlify CLI and run `netlify dev`:

```bash
# install CLI (one-time)
npm install -g netlify-cli

# run local dev server (functions emulated at /.netlify/functions/)
netlify dev
```

The contact form posts to `/.netlify/functions/contact` during local dev as well, and the function will forward submissions to the `FORM_ENDPOINT` you set in your Netlify site's environment variables. If you don't set `FORM_ENDPOINT`, the client-side form falls back to `mailto:`.

