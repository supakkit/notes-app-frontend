import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export function Layout() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center gap-4 relative">
      <Navbar />
      <div className="w-full md:w-3xl lg:w-5xl px-8">
        <Outlet />
      </div>
    </div>
  );
}
