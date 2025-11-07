import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { NoteProvider } from "./context/NoteProvider.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <NoteProvider>
        <App />
      </NoteProvider>
    </AuthProvider>
  </StrictMode>
);
