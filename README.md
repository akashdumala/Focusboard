# FocusBoard

FocusBoard is a responsive, single-user task dashboard built from the supplied FocusBoard Figma assignment. It is a frontend-only React application with browser storage; no account or backend is needed.

## Features

- Seven starter tasks with unique IDs, descriptions, categories, statuses, priorities, and due dates.
- Create, edit, delete (with confirmation), and complete or change the status of tasks.
- Case-insensitive task-title search, status tabs, and a priority filter that work together.
- Dynamic total, in-progress, completed, and completion-percentage cards.
- Three manually navigated Focus Notes slides with previous/next controls and active indicators.
- Persistent task data in `localStorage`; starter data is used only when no saved data exists.
- Responsive sidebar and mobile navigation, labeled form controls, keyboard focus states, and reduced-motion support.

## Technology

- React 18 and React Hooks for UI state and reusable components.
- Vite 6 for local development and production builds.
- CSS for the responsive layout and visual system.
- Lucide React for interface icons.
- `localStorage` for per-browser task persistence.

## Run locally

Requires Node.js 20 or newer.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To create and preview a production build:

```sh
npm run build
npm run preview
```

## Structure

```text
src/
  components/   Sidebar, statistics, Focus Notes, task list/cards, task form
  data/         Initial sample task records
  hooks/        Safe localStorage state hook
  App.jsx       Shared task state, derived values, and dashboard composition
  index.css     Design tokens, component styling, and responsive breakpoints
  main.jsx      React entry point
screenshots/    Desktop and mobile submission screenshots
```

## State and persistence

`App.jsx` keeps the task array as the single source of truth using the `useLocalStorage` hook. The hook reads saved JSON once during initialization and falls back to the sample list if storage is empty or unavailable. It writes state changes back to the `focusboard.tasks.v1` key. Create, edit, status, and delete operations use immutable array updates. Counts and visible results are derived from the task array, search string, status selection, and priority selection, so the dashboard stays in sync without storing duplicate statistics. The carousel keeps its active slide index in React state and wraps at both ends.

## Submission links

- Hosted application: [FocusBoard on Vercel](https://instant-cedar-nucc77g.tmp.now) â€” temporary anonymous deployment. Claim it in Vercel to keep it live; otherwise it expires.
- Public GitHub repository: [akashdumala/Focusboard](https://github.com/akashdumala/Focusboard).

## Limitations

- Tasks are stored per browser and device; this app has no server synchronization or login.
- Calendar, statistics, and settings navigation items are visual navigation affordances; the assignmentâ€™s required dashboard remains the implemented screen.
- The Google Fonts stylesheet uses DM Sans and Manrope when the browser has network access; system sans-serif fallbacks remain available offline.

## Screenshots

Captured from the running app at the assignment reference sizes: desktop 1440 Ã— 1000, tablet 768 Ã— 1024, and mobile 390 Ã— 1128.

- Desktop: `screenshots/desktop.png`
- Tablet: `screenshots/tablet.png`
- Mobile: `screenshots/mobile.png`

