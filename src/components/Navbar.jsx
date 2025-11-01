import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";


export function Navbar() {
    const { handleLogout } = useContext(UserContext);

    return (
        <div className="flex justify-between items-center px-4 h-14 bg-white w-full">
            <Link to="/dashboard">📚 RAG Notes</Link>
            <div className="flex gap-4">
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
                <Link onClick={handleLogout} >Logout</Link>
            </div>
        </div>
    );
}

