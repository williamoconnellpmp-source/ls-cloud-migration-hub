# Copilot Instructions for ls-cloud-migration-hub

## Project Overview
A Next.js 16 portfolio/demo application showcasing AWS cloud architecture and validated document control (VDC) workflows. Static export (no server runtime). Portfolio content + interactive AWS/Life Sciences examples.

## Architecture & Core Concepts

### Frontend Stack
- **Next.js 16**: Static export via `output: 'export'` in [next.config.js](next.config.js). No API routes.
- **React 18**: Functional components, hooks (`useState` for local state). CSS-in-JS for component styles.
- **Pages Structure**: Each `.js` file in [pages/](pages/) is a route (`/`, `/life-sciences`, `/resume`, `/resources`, `/contact`, `/vdc`).

### AWS Integration Pattern (VDC Demo)
The [life-sciences](pages/life-sciences/) section demonstrates enterprise app architecture:
- **Auth**: Cognito OAuth 2 via hosted UI (username/password login)
- **Frontend Auth State**: [lib/life_sciences_app_lib/auth.js](lib/life_sciences_app_lib/auth.js) manages JWT tokens in localStorage with expiry checks
- **API Communication**: [lib/life_sciences_app_lib/api.js](lib/life_sciences_app_lib/api.js) wraps fetch with:
  - Bearer token injection (ID token for user claims + Cognito groups for RBAC)
  - 401 auto-redirect to login on expired/missing tokens
  - Standardized error handling via `ApiError` class
- **Configuration**: [lib/life_sciences_app_lib/config.js](lib/life_sciences_app_lib/config.js) uses `NEXT_PUBLIC_*` env vars (exposed to browser). Local dev: `localhost:3000`, deployed: `williamoconnellpmp.com`

### Deployment & Build
- **Build**: `npm run build` → static export to `./out/`
- **Deploy**: AWS CodeBuild (see [buildspec.yml](buildspec.yml))
  - Syncs `./out/` to S3 bucket (`ls-cloud-migration-hub-williamoconnellpmp`)
  - Invalidates CloudFront distribution (`E3GKP8EZSZFBWI`) for cache refresh
- **Environment**: Node 20 (CodeBuild), React 18, Next.js 16 SSG

## Project Patterns & Conventions

### Styling
- Global CSS in [styles/globals.css](styles/globals.css)
- Inline `<style jsx>` for component-scoped styles (see copy button in [pages/vdc.js](pages/vdc.js#L26-L37))
- No tailwind or styled-components

### Layout & Navigation
- Common header/nav in [components/Layout.js](components/Layout.js)
- Markdown-like sections within pages using semantic HTML (`<section>`, `<h1>`, etc.)
- Links use Next.js `<Link>` component for navigation, external URLs use `<a>` with `target="_blank" rel="noopener noreferrer"`

### Sensitive Data Management
- Cognito/API endpoints stored in [lib/life_sciences_app_lib/config.js](lib/life_sciences_app_lib/config.js)
- Use `requireEnv()` pattern: fallback to secure defaults, allow override via `NEXT_PUBLIC_*` vars
- Demo credentials (email/password) hardcoded in [pages/vdc.js](pages/vdc.js#L53-L55) for test accounts (not production)

### State & Data
- No global state manager (Redux, Context). Each page manages its own state with `useState`.
- Static data in [data/resources.js](data/resources.js) imported where needed
- No database queries at build time (static export compatible)

## Critical Files & Their Roles
| File | Purpose |
|------|---------|
| [package.json](package.json) | Dependencies & build scripts |
| [next.config.js](next.config.js) | Output mode, image config |
| [pages/_app.js](pages/_app.js) | Global layout wrapper |
| [lib/life_sciences_app_lib/](lib/life_sciences_app_lib/) | Reusable auth + API utilities for VDC demo |
| [buildspec.yml](buildspec.yml) | CodeBuild deploy pipeline |
| [styles/globals.css](styles/globals.css) | Global CSS |
| [components/Layout.js](components/Layout.js) | Header/navigation template |

## Common Workflows

### Local Development
```bash
npm install
npm run dev
# Opens http://localhost:3000
```

### Build for Deployment
```bash
npm run build          # Generates ./out/
# Test locally: cd out && npx http-server
```

### Testing Auth Flow Locally
1. Set `NEXT_PUBLIC_VDC_REDIRECT_URI` and `NEXT_PUBLIC_VDC_LOGOUT_URI` to `http://localhost:3000/life-sciences/app/login` (default)
2. Use test accounts from [pages/vdc.js](pages/vdc.js) (hardcoded demo credentials)
3. Check [lib/life_sciences_app_lib/auth.js](lib/life_sciences_app_lib/auth.js) for token storage/expiry logic

### Adding a New Page
1. Create `.js` file in [pages/](pages/) (e.g., `pages/new-section.js`)
2. Export default React component
3. Use [components/Layout.js](components/Layout.js) for consistent header/nav
4. Link from other pages using Next.js `<Link>`

## Common Pitfalls & Notes
- **Port 3000 vs 3001**: Auth redirects hardcoded to `localhost:3000`. If running on different port, update env vars.
- **Static Export Constraint**: No API routes, no server-side rendering—all auth/API calls happen client-side.
- **Token Expiry**: API wrapper auto-redirects to login on 401 (see [api.js](lib/life_sciences_app_lib/api.js#L26-L29)).
- **CORS**: Frontend and backend may be different origins; ensure Cognito + API Gateway handle CORS.
