# Project Guidelines — CrossFit WOD Logger

Last updated: 2025-11-08 21:51 (local)

This document captures the working conventions for this repository so contributors can move fast and keep things consistent.

## 1) Coding Conventions

- Language/Stack
  - Vite + React 18 (SPA). Client-only prototype.
  - Tesseract.js for client-side OCR.
- Component style
  - Prefer functional components with React Hooks (`useState`, `useEffect`, etc.).
  - Keep components small and focused; extract reusable UI/logic into `src/components`.
  - Use controlled inputs for forms.
- Naming
  - Files
    - React components: `PascalCase` file names with `.jsx` (e.g., `ImageUploader.jsx`, `WodForm.jsx`).
    - Pages: `PascalCase` in `src/pages` (e.g., `HomePage.jsx`).
    - Entry/root files: `camelCase` or common names (e.g., `main.jsx`, `App.jsx`).
  - Variables, functions, props: `camelCase`.
  - Constants: `UPPER_SNAKE_CASE` when truly constant.
- Imports/exports
  - Use default exports for single-component files; named exports for multi-exports.
  - Keep relative imports short and organized; avoid deep traversal when possible.
- Formatting
  - Indentation: 2 spaces.
  - Trailing commas: allowed where supported.
  - Semicolons: follow existing file style (currently mixed is acceptable; prefer consistency within a file).
  - Strings: single quotes or double quotes—be consistent within a file.
- State and data flow
  - Current prototype stores all data in component state (in-memory); no persistence.
  - Lift state only as needed; pass props explicitly; avoid implicit globals.
  - Derive transient UI state rather than duplicating data.
- Asynchronous code
  - Use `async/await` for readability.
  - Handle loading and error states explicitly in the UI when calling asynchronous APIs (e.g., Tesseract OCR).
- Accessibility & UX
  - Prefer semantic HTML where possible.
  - Ensure form controls are labeled and keyboard accessible.
- Styling
  - Lightweight inline styles are acceptable for the prototype.
  - If/when adopting a framework (e.g., Tailwind), co-locate utility classes in components.
- Comments & docs
  - Keep comments high-signal. Document non-obvious decisions and tricky logic paths.

## 2) Code Organization & Package Structure

Top-level structure (current):

- `src/`
  - `main.jsx` — App bootstrap.
  - `App.jsx` — root component and basic routing/composition.
  - `components/` — reusable components (e.g., `ImageUploader.jsx`, `WodForm.jsx`).
    - `ImageUploader.jsx` — image selection + Tesseract.js OCR + progress display.
    - `WodForm.jsx` — date + text form, integrates `ImageUploader`.
  - `pages/`
    - `HomePage.jsx` — date-filtered list/detail/edit/delete; in-memory state management.
- `index.html` — Vite app host page.
- `vite.config.js` — Vite configuration.
- `package.json` — project metadata and scripts.
- `README.md` — quickstart, features, and file structure overview.

Guidelines:
- Pages own screen-level state/layout; components are reusable building blocks.
- Keep OCR-specific logic encapsulated in the component(s) that need it; pass plain values/events via props.
- Avoid cross-cutting singletons until real persistence/routing is introduced.

Planned evolutions (non-breaking, incremental):
- Optional persistence (e.g., `localStorage` or simple backend) behind a thin abstraction.
- Styling system adoption (e.g., Tailwind) when UI grows.

## 3) Testing — Unit & Integration

The project currently has no test setup. The following approach is recommended and should be adopted before adding complex logic:

- Test runner and libraries
  - Use Vitest for unit tests (works well with Vite).
  - Use React Testing Library (RTL) for component tests.
  - Use `@testing-library/user-event` for user interaction.
  - Use MSW (Mock Service Worker) if/when network I/O is introduced.

- Directory & naming
  - Co-locate tests next to source files as `*.test.jsx` or `*.spec.jsx`.
    - Example: `src/components/ImageUploader.test.jsx`.
  - For shared utilities, use `*.test.js` accordingly.

- Unit tests (examples)
  - Pure functions and small helpers: input/output assertions.
  - Component units: render with RTL, assert on visible text/aria roles, simulate user events.

- Integration tests (examples)
  - "Happy path" for creating a WOD: user selects date, uploads image (mock OCR), text appears, save, then item visible in the list.
  - Editing/deleting flows from `HomePage`.
  - When OCR is involved, mock Tesseract.js:
    - Create a mock module that resolves with a deterministic `data.text` and progress callbacks.
    - Verify progress UI updates and final text injection.

- Mocking Tesseract.js (sketch)
  - In `vitest.config.ts`, alias `tesseract.js` to a local mock for tests.
  - Example mock behavior:
    - Emit a few progress ticks (e.g., 0.1, 0.5, 1.0).
    - Resolve with `{ data: { text: 'Mock OCR result' } }`.

- Coverage and thresholds
  - Start without hard thresholds; target 70%+ on components with logic.
  - Add thresholds as the app stabilizes.

- Example scripts (to be added to `package.json` when tests are set up)
  - `"test": "vitest"`
  - `"test:ui": "vitest --ui"`
  - `"test:watch": "vitest --watch"`

- CI recommendations
  - Run `npm ci && npm run build && npm test` on PRs.

## 4) Contribution Workflow (lightweight)

- Keep changeset small and focused; prefer incremental PRs.
- Follow the coding conventions and file organization above.
- Update this guideline when introducing new tooling (e.g., Tailwind, persistence layer, routing).

## 5) Appendix — References

- Vite: https://vitejs.dev/guide/
- React: https://react.dev/learn
- Tesseract.js: https://github.com/naptha/tesseract.js
- Vitest: https://vitest.dev
- React Testing Library: https://testing-library.com/docs/react-testing-library/intro