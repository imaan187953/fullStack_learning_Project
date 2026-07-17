import { Link } from "react-router-dom";
import { Film } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Logo */}

          <div>
            <Link
              to="/"
              className="mb-5 flex items-center gap-3"
            >
              <Film
                className="text-red-500"
                size={32}
              />

              <span className="text-2xl font-bold text-white">
                CineTrack
              </span>
            </Link>

            <p className="leading-7 text-gray-400">
              Track your favorite movies and TV shows,
              build custom lists, write reviews,
              rate everything you watch,
              and receive AI-powered recommendations.
            </p>
          </div>

          {/* Explore */}

          <div>

            <h3 className="mb-5 text-lg font-semibold text-white">
              Explore
            </h3>

            <div className="space-y-3">

              <Link
                to="/"
                className="block text-gray-400 hover:text-red-500"
              >
                Home
              </Link>

              <Link
                to="/search"
                className="block text-gray-400 hover:text-red-500"
              >
                Search
              </Link>

              <Link
                to="/movie"
                className="block text-gray-400 hover:text-red-500"
              >
                Movies
              </Link>

              <Link
                to="/tv"
                className="block text-gray-400 hover:text-red-500"
              >
                TV Shows
              </Link>

            </div>

          </div>

          {/* Account */}

          <div>

            <h3 className="mb-5 text-lg font-semibold text-white">
              Account
            </h3>

            <div className="space-y-3">

              <Link
                to="/login"
                className="block text-gray-400 hover:text-red-500"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="block text-gray-400 hover:text-red-500"
              >
                Register
              </Link>

              <Link
                to="/profile"
                className="block text-gray-400 hover:text-red-500"
              >
                Profile
              </Link>

            </div>

          </div>

          {/* Support */}

          <div>

            <h3 className="mb-5 text-lg font-semibold text-white">
              Support
            </h3>

            <div className="space-y-3">

              <a
                href="#"
                className="block text-gray-400 hover:text-red-500"
              >
                GitHub
              </a>

              <a
                href="#"
                className="block text-gray-400 hover:text-red-500"
              >
                Contact
              </a>

              <a
                href="#"
                className="block text-gray-400 hover:text-red-500"
              >
                Privacy Policy
              </a>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-14 border-t border-zinc-800 pt-8">

          <p className="text-center text-gray-500">
            © 2026 CineTrack.
            Built with React, Node.js,
            TMDB and AI Recommendations.
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;