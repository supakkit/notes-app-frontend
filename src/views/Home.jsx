import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function Home() {
  const { user } = useAuth();
  return (
    <div className="grid justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center gap-2 max-w-xl">
        <h2 className="font-bold text-3xl text-center">
          Hassle-free note taking, publish and share your notes with AI
          summarizer.
        </h2>
        {user ? (
          <p>Go to{" "}<Link to="/dashboard" className="text-blue-500">Dashboard</Link>{" "}to continue.</p>
        ) : (
          <p>Please{" "}<Link to="/login" className="text-blue-500">Login</Link>{" "}to continue.</p>
        )}
      </div>
    </div>
  );
}
