import { Link } from "react-router-dom";
import { Film } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto w-full max-w-7xl px-3 py-10 sm:px-5 sm:py-12 md:px-6 lg:px-8 lg:py-16">

        <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">

          {/* Logo */}
          <div>
            <Link
              to="/"
              className="mb-3 flex items-center gap-2 sm:mb-4"
            >
              <Film
                className="h-6 w-6 text-red-500 sm:h-7 sm:w-7"
              />

              <span className="text-xl font-bold text-white sm:text-2xl">
                CineTrack
              </span>
            </Link>

            <p className="text-sm leading-6 text-gray-400 sm:text-base sm:leading-7">
              Track your favorite movies and TV shows,
              build custom lists, write reviews,
              rate everything you watch,
              and receive AI-powered recommendations.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-3 text-base font-semibold text-white sm:mb-4 sm:text-lg">
              Explore
            </h3>

            <div className="space-y-2 sm:space-y-3">
              <Link
                to="/"
                className="block text-sm text-gray-400 hover:text-red-500 sm:text-base"
              >
                Home
              </Link>

              <Link
                to="/search"
                className="block text-sm text-gray-400 hover:text-red-500 sm:text-base"
              >
                Search
              </Link>

              <Link
                to="/movie"
                className="block text-sm text-gray-400 hover:text-red-500 sm:text-base"
              >
                Movies
              </Link>

              <Link
                to="/tv"
                className="block text-sm text-gray-400 hover:text-red-500 sm:text-base"
              >
                TV Shows
              </Link>
            </div>
          </div>

          {/* Account */}
          <div>
            <h3 className="mb-3 text-base font-semibold text-white sm:mb-4 sm:text-lg">
              Account
            </h3>

            <div className="space-y-2 sm:space-y-3">
              <Link
                to="/login"
                className="block text-sm text-gray-400 hover:text-red-500 sm:text-base"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="block text-sm text-gray-400 hover:text-red-500 sm:text-base"
              >
                Register
              </Link>

              <Link
                to="/profile"
                className="block text-sm text-gray-400 hover:text-red-500 sm:text-base"
              >
                Profile
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-3 text-base font-semibold text-white sm:mb-4 sm:text-lg">
              Support
            </h3>

            <div className="space-y-2 sm:space-y-3">
              <a
                href="#"
                className="block text-sm text-gray-400 hover:text-red-500 sm:text-base"
              >
                GitHub
              </a>

              <a
                href="#"
                className="block text-sm text-gray-400 hover:text-red-500 sm:text-base"
              >
                Contact
              </a>

              <a
                href="#"
                className="block text-sm text-gray-400 hover:text-red-500 sm:text-base"
              >
                Privacy Policy
              </a>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-zinc-800 pt-5 sm:mt-10 sm:pt-6 lg:mt-14 lg:pt-8">
          <p className="text-center text-xs leading-5 text-gray-500 sm:text-sm">
            © 2026 CineTrack. Built with React, Node.js,
            TMDB and AI Recommendations.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
