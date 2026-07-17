import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

function HeroSection({ movie }) {
  if (!movie) return null;

  return (
    <section
      className="relative flex min-h-screen items-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${IMAGE_BASE_URL}${movie.backdrop_path})`,
      }}
    >
      <div className="absolute inset-0 bg-black/70" />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl px-8 lg:px-20"
      >
        <p className="mb-3 text-red-500 uppercase tracking-[6px]">
          Trending Today
        </p>

        <h1 className="mb-6 text-5xl font-extrabold text-white md:text-7xl">
          {movie.title}
        </h1>

        <p className="mb-8 max-w-2xl text-lg leading-8 text-gray-300">
          {movie.overview}
        </p>

        <div className="flex gap-4">
          <Link
            to="/register"
            className="rounded-xl bg-red-600 px-8 py-4 font-semibold text-white hover:bg-red-700"
          >
            Get Started
          </Link>

          <Link
            to={`/movie/${movie.id}`}
            className="rounded-xl border border-white px-8 py-4 font-semibold text-white hover:bg-white hover:text-black"
          >
            View Details
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default HeroSection;