import { useState } from "react";
import { Link } from "react-router-dom";
import { Film, Menu, X } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

function Navbar() {
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2 text-xl font-bold text-white sm:text-2xl"
        >
          <Film className="h-6 w-6 text-red-500 sm:h-7 sm:w-7" />
          <span>CineTrack</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          {isAuthenticated ? (
            <>
              <Link
                to="/home"
                className="text-sm text-gray-300 transition hover:text-white lg:text-base"
              >
                Home
              </Link>

              <Link
                to="/lists"
                className="text-sm text-gray-300 transition hover:text-white lg:text-base"
              >
                Lists
              </Link>

              <Link
                to="/ai"
                className="text-sm text-gray-300 transition hover:text-white lg:text-base"
              >
                AI
              </Link>

              <Link
                to="/profile"
                className="rounded-full bg-red-500 px-4 py-2 text-sm text-white transition hover:bg-red-600 lg:text-base"
              >
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-gray-300 transition hover:text-white lg:text-base"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600 lg:text-base"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-lg p-2 text-gray-300 transition hover:bg-gray-800 hover:text-white md:hidden"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-gray-800 bg-black/95 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/home"
                  onClick={closeMenu}
                  className="rounded-lg px-4 py-3 text-gray-300 transition hover:bg-gray-800 hover:text-white"
                >
                  Home
                </Link>

                <Link
                  to="/lists"
                  onClick={closeMenu}
                  className="rounded-lg px-4 py-3 text-gray-300 transition hover:bg-gray-800 hover:text-white"
                >
                  Lists
                </Link>

                <Link
                  to="/ai"
                  onClick={closeMenu}
                  className="rounded-lg px-4 py-3 text-gray-300 transition hover:bg-gray-800 hover:text-white"
                >
                  AI Recommendations
                </Link>

                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="mt-2 rounded-lg bg-red-500 px-4 py-3 text-center font-medium text-white transition hover:bg-red-600"
                >
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="rounded-lg px-4 py-3 text-gray-300 transition hover:bg-gray-800 hover:text-white"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="rounded-lg bg-red-500 px-4 py-3 text-center font-semibold text-white transition hover:bg-red-600"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;