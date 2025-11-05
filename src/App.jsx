import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./views/Layout";
import { Home } from "./views/Home";
import { Login } from "./views/Login";
import { SignUp } from "./views/SignUp";
import { Dashboard } from "./views/Dashboard";
import { Profile } from "./views/Profile";
import { Notes } from "./views/Notes";


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <SignUp />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'notes/:noteId',
        element: <Notes />
      },
    ]
  }
]);



export default function App() {
  return <RouterProvider router={router} />
}
