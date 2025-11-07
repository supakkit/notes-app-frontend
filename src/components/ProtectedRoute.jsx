import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading)
    return <div className="text-center mt-18 text-xl">Loading...</div>;

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
