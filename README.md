# React Notes App (Frontend)

A modern **React** frontend for the **Notes App**, allowing users to create, view, and manage notes with authentication and **AI-powered summaries**.  
Built with **Vite**, **TailwindCSS**, and **Shadcn UI components**, this frontend seamlessly integrates with the [Notes App Backend](https://github.com/supakkit/notes-app-backend.git).

---

## Features

- **Responsive UI** built with TailwindCSS and Shadcn
- **Authentication** (Login / Signup / Protected Routes)
- **CRUD operations for notes**
- **AI-powered note summaries** (via OpenAI API integration in backend)
- **Protected & public routes** using React Router v7
- **Reusable components** powered by Shadcn
- **REST API integration** with Axios
- **Vite** for blazing-fast builds and hot reload
- **Unit testing** with Vitest + React Testing Library

---

## Tech Stack

- **Framework:** React 19 + Vite
- **Language:** JavaScript
- **UI:** TailwindCSS + Shadcn UI
- **Routing:** React Router v7
- **HTTP Client:** Axios
- **State Management:** React state management
- **Testing:** Vitest + @testing-library/react

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/supakkit/notes-app-frontend.git
cd notes-app-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the project root and then, add this content:

```env
VITE_API_URL=http://localhost:3100/api/v1
```

---

## Scripts

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start development server         |
| `npm run build`   | Build for production             |
| `npm run preview` | Preview production build locally |
| `npm run lint`    | Lint and fix code issues         |

---

## API Integration

This frontend connects to the backend API (`http://localhost:3100/api/v1`) for authentication, notes management, and AI-powered features.

---

## Routing Structure

The app uses **React Router v7** with public, protected, and restricted routes.

| Path               | Component | Access                                    |
| ------------------ | --------- | ----------------------------------------- |
| `/`                | Home      | Public                                    |
| `/login`           | Login     | Restricted (Non-authenticated users only) |
| `/signup`          | SignUp    | Restricted (Non-authenticated users only) |
| `/dashboard`       | Dashboard | Protected (Authenticated users only)      |
| `/profile/:userId` | Profile   | Public/Authenticated                      |
| `/notes/:noteId`   | Notes     | Protected                                 |

---

## Environment Variables

| Variable       | Description                                                         |
| -------------- | ------------------------------------------------------------------- |
| `VITE_API_URL` | Base URL for the backend API (e.g., `http://localhost:3100/api/v1`) |

---

## Future Improvements

- Dark mode and theme customization
- Offline support
- Drag-and-drop note organization
- Real-time updates using WebSockets

---
