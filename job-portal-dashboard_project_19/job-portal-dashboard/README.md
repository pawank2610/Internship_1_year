# Dispatch — Job Portal Dashboard

A React job portal dashboard with live API integration, search, filters, saved jobs, routing, and Context+useReducer state management.

## Features

- **Search jobs** — debounced free-text search (title, company, keyword) hitting a live API.
- **Filter jobs** — by category (server-side) and job type (client-side), plus sorting.
- **Save jobs** — bookmark jobs to a "Saved" page, persisted in `localStorage`.
- **Routing** — `react-router-dom` with 3 routes: board (`/`), job details (`/job/:id`), saved jobs (`/saved`), plus a 404 catch-all.
- **Advanced state management** — a single `JobsContext` built on `useReducer`, exposing derived/filtered/sorted data via `useMemo` and stable callbacks via `useCallback`.

## Tech stack

- React 18 + Vite
- react-router-dom v6
- Context API + useReducer (no external state library needed)
- [Remotive API](https://remotive.com/api-documentation) — free, public, no API key required — for real remote job listings

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (defaults to http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  api/
    jobsApi.js          # fetch() calls to the Remotive API + data normalization
  context/
    JobsContext.jsx      # useReducer store: jobs, filters, saved jobs, status
  components/
    Navbar.jsx
    SearchBar.jsx
    FilterPanel.jsx
    JobCard.jsx
    JobList.jsx
  pages/
    Dashboard.jsx         # search + filters + job grid ("/")
    JobDetails.jsx         # single job view ("/job/:id")
    SavedJobs.jsx           # bookmarked jobs ("/saved")
    NotFound.jsx             # 404 fallback
  App.jsx                     # route definitions
  main.jsx                     # app bootstrap (Router + Provider)
  index.css                     # design system (CSS variables, layout, components)
```

## Swapping in your own API

`src/api/jobsApi.js` is the only file that talks to the network. Replace `BASE_URL` and
`normalizeJob()` to point at any other job API (e.g. your own backend, Adzuna, Jooble) —
the rest of the app only depends on the normalized shape:

```js
{ id, title, company, logo, category, jobType, location, salary, tags, description, url, publicationDate }
```

## Notes

- Saved jobs are stored in the browser's `localStorage` under the key `job-portal:saved-jobs`,
  so they persist across refreshes but are local to the device/browser.
- The job details page falls back to fetching the full job list and matching by `id` if the
  job isn't already in memory (e.g. after a hard refresh on a `/job/:id` URL).
