import { Link } from "react-router-dom";
import { Film } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

function Navbar() {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800 bg-black/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-white"
        >
          <Film className="h-7 w-7 text-red-500" />
          <span>CineTrack</span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/home"
                className="text-gray-300 transition hover:text-white"
              >
                Home
              </Link>

              <Link
                to="/lists"
                className="text-gray-300 transition hover:text-white"
              >
                Lists
              </Link>

              <Link
                to="/recommendations"
                className="text-gray-300 transition hover:text-white"
              >
                AI
              </Link>

              <Link
                to="/profile"
                className="rounded-full bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
              >
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-300 transition hover:text-white"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-red-500 px-4 py-2 font-semibold text-white transition hover:bg-red-600"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;