import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const NoneAuthRoute = ({ children }) => {
  const { user } = useAuth();

  return !user ? children : <Navigate to="/dashboard" />;
};

export default NoneAuthRoute;
