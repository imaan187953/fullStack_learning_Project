import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

function HeroSection({ movie }) {
  if (!movie) return null;

  return (
    <section
      className="relative flex min-h-[78vh] items-center bg-cover bg-center pt-14 sm:min-h-[85vh] md:min-h-screen md:pt-16"
      style={{
        backgroundImage: `url(${IMAGE_BASE_URL}${movie.backdrop_path})`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Gradient */}
      <div className="absolute inset-0 bg-linear-to-r from-black via-black/60 to-transparent" />

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-3xl px-4 sm:px-6 md:px-8 lg:px-20"
      >
        <p className="mb-2 text-xs font-medium uppercase tracking-[3px] text-red-500 sm:mb-3 sm:text-sm sm:tracking-[5px]">
          Trending Today
        </p>

        <h1 className="mb-3 max-w-2xl text-3xl font-extrabold leading-tight text-white sm:mb-5 sm:text-5xl md:text-6xl lg:text-7xl">
          {movie.title}
        </h1>

        <p className="mb-5 line-clamp-4 max-w-xl text-sm leading-6 text-gray-300 sm:mb-7 sm:text-base sm:leading-7 md:text-lg md:leading-8">
          {movie.overview}
        </p>

        <div className="flex flex-wrap gap-2.5 sm:gap-4">
          <Link
            to="/register"
            className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 sm:rounded-xl sm:px-6 sm:py-3 md:px-8 md:py-4 md:text-base"
          >
            Get Started
          </Link>

          <Link
            to={`/movie/${movie.id}`}
            className="rounded-lg border border-white px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white hover:text-black sm:rounded-xl sm:px-6 sm:py-3 md:px-8 md:py-4 md:text-base"
          >
            View Details
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
