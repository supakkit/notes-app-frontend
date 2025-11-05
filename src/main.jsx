import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { NoteProvider } from "./context/NoteProvider.jsx";
import { UserProvider } from "./context/UserProvider.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <UserProvider>
        <NoteProvider>
          <App />
        </NoteProvider>
      </UserProvider>
    </AuthProvider>
  </StrictMode>
);
