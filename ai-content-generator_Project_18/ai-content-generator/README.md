# Manuscript — AI Content Generator

A React content generator with live AI API integration, multiple prompt templates, side-by-side variants, copy-to-clipboard, and local history.

## Features

- **Generate text** — calls the Anthropic Messages API directly from the browser.
- **Multiple prompts** — 6 built-in templates (Blog intro, Social post, Product description, Email, Summarize, Custom), each with a tuned system instruction, plus a variant stepper to generate 1–4 versions of the same prompt in parallel.
- **Copy results** — one-click copy on every generated card and every history entry, with success feedback.
- **History** — every generation is saved locally (`localStorage`) with the prompt, template, model, and timestamp; delete individual entries or clear all.
- **Routing** — `react-router-dom` with `/` (generator) and `/history`, plus a 404 catch-all.
- **Advanced state management** — a single `GeneratorContext` built on `useReducer`, coordinating parallel async generations, template/model selection, and persisted history/settings.

## Tech stack

- React 18 + Vite
- react-router-dom v6
- Context API + useReducer
- [Anthropic Messages API](https://docs.claude.com/en/api/messages) called directly from the client

## Getting started

```bash
npm install
npm run dev
```

Open the app, click **Add API key** in the top bar, and paste an Anthropic API key
(create one at [console.anthropic.com](https://console.anthropic.com/settings/keys)).
The key is stored only in your browser's `localStorage` and sent straight to
Anthropic's API — it never passes through any other server.

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  api/
    aiApi.js              # fetch() calls to the Anthropic API, model list, prompt templates
  context/
    GeneratorContext.jsx   # useReducer store: prompt, template, variants, results, history, settings
  components/
    Navbar.jsx
    PromptForm.jsx          # template tabs, prompt textarea, model + variant controls
    ResultsGrid.jsx           # manuscript-style result cards (loading/success/error states)
    CopyButton.jsx
    SettingsModal.jsx
  pages/
    Generator.jsx              # main generate view ("/")
    History.jsx                  # saved generations ("/history")
    NotFound.jsx
  App.jsx                          # route definitions
  main.jsx                          # app bootstrap (Router + Provider)
  index.css                          # design system (CSS variables, layout, components)
```

## Swapping in a different AI provider

`src/api/aiApi.js` is the only file that talks to the network. Replace `generateText()`
to call any other text-generation API (OpenAI, a self-hosted model, your own backend) —
the rest of the app only depends on the return shape `{ text, model }`.

## Notes

- Because this calls the Anthropic API directly from the browser, the API key is visible
  to anyone using that browser session — fine for local/personal use, but for a public
  deployment you'd want a small backend proxy that holds the key server-side instead.
- History and the API key are both stored in `localStorage` and never leave the device
  except in the direct request to Anthropic when generating.
