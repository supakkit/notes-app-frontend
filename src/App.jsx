import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./views/Layout";
import { Home } from "./views/Home";
import { Login } from "./views/Login";
import { SignUp } from "./views/SignUp";
import { Dashboard } from "./views/Dashboard";
import { Profile } from "./views/Profile";
import { Notes } from "./views/Notes";
import ProtectedRoute from "./components/ProtectedRoute";
import NoneAuthRoute from "./components/NoneAuthRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: (
          <NoneAuthRoute>
            <Login />
          </NoneAuthRoute>
        ),
      },
      {
        path: "signup",
        element: (
          <NoneAuthRoute>
            <SignUp />
          </NoneAuthRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile/:userId",
        element: <Profile />,
      },
      {
        path: "notes/:noteId",
        element: <Notes />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
