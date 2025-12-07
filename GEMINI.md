# GEMINI.md - Project Overview and Guidelines

This document provides a comprehensive overview of the CrossFit WOD Logger project, its structure, and development conventions to be used as a context for future AI-assisted development sessions.

## Project Overview

The CrossFit WOD Logger is a web application designed for logging "Workout of the Day" (WOD) entries for CrossFit. It features a simple, user-friendly interface for creating, viewing, updating, and deleting WODs. A key feature of this application is its Optical Character Recognition (OCR) capability, which allows users to upload an image of a WOD, and the application will automatically extract the text and populate the workout content.

### Core Technologies

-   **Frontend:** The frontend is built using [React](https://reactjs.org/) and [Vite](https://vitejs.dev/), providing a fast and modern development experience. It's a single-page application (SPA) that communicates with the backend via a REST API.
-   **Backend:** The backend is a simple [Node.js](https://nodejs.org/) server using the [Express](https://expressjs.com/) framework. It handles the business logic and provides API endpoints for the frontend.
-   **Database:** The application uses [SQLite](https://www.sqlite.org/index.html) as its database, which is a lightweight, file-based SQL database. The `sqlite` and `sqlite3` npm packages are used for database interaction.
-   **OCR:** [Tesseract.js](https://tesseract.projectnapier.com/) is used on the client-side to perform OCR on uploaded images.
-   **Styling:** The application uses a simple, global stylesheet (`src/styles.css`) for a clean, dark-themed UI.

### Architecture

The application is divided into a `server` directory for the backend and a `src` directory for the frontend.

-   The **backend** is responsible for the API endpoints that perform CRUD (Create, Read, Update, Delete) operations on the WODs stored in the `wods.db` SQLite database.
-   The **frontend** is composed of React components and pages that provide the user interface. It communicates with the backend through the API module in `src/api.js`. The main application component is `src/App.jsx`, which handles routing and state management.

## Building and Running the Project

To run this project, you will need to have [Node.js](https://nodejs.org/en/download/) installed. The project uses `npm` for package management.

### Installation

To install the project dependencies, run the following command in the project's root directory:

```bash
npm install
```

### Running the Application

You will need to run the backend server and the frontend development server in two separate terminals.

**Terminal 1: Start the Backend Server**

```bash
npm run server
```

This will start the backend server on `http://localhost:3001`.

**Terminal 2: Start the Frontend Development Server**

```bash
npm run dev
```

This will start the frontend development server on `http://localhost:5173`. You can then access the application by opening this URL in your web browser.

### Other Scripts

-   `npm run build`: Builds the frontend application for production.
-   `npm run lint`: Lints the frontend code using ESLint.
-   `npm run preview`: Serves the production build of the frontend locally.

## Development Conventions

-   **Code Style:** The project uses the standard JavaScript and React coding styles. The frontend uses ES Modules (`import`/`export`), while the backend uses CommonJS (`require`/`module.exports`).
-   **API Communication:** All API requests from the frontend to the backend are handled in `src/api.js`. The base URL for the API is `http://localhost:3001/api`.
-   **State Management:** The main application state is managed in the `App.jsx` component using React hooks (`useState`, `useEffect`, `useMemo`).
-   **Components and Pages:** The React components are organized into `src/components` and `src/pages`. Pages represent the main views of the application (Home, Browse, Register), while components are reusable UI elements.
-   **Database:** The database schema is defined and initialized in `server/database.cjs`. The database file is `wods.db`.
