import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { logoutService } from "../services/auth.service";

export function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const isAuth = !!user;

  const handleLogout = async () => {
    try {
      await logoutService();
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Failed to logout", err);
    }
  };

  return (
    <div className="flex justify-between items-center px-4 h-14 bg-white w-full">
      <Link to="/dashboard">📚 Notes App</Link>
      <div className="flex gap-4">
        {isAuth ? (
          <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to={user && user._id ? `/profile/${user._id}` : "#"}>Profile</Link>
          <Link onClick={handleLogout}>Logout</Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </div>
  );
}
