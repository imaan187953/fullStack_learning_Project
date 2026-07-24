import {
  Calendar,
  Clock3,
  Film,
  Star,
} from "lucide-react";

const IMAGE = "https://image.tmdb.org/t/p/original";
const POSTER = "https://image.tmdb.org/t/p/w500";

function MovieHero({ movie }) {
  if (!movie) return null;

  return (
    <section className="relative">
      {/* Backdrop */}
      <div className="relative h-[70vh] w-full">
        <img
          src={`${IMAGE}${movie.backdropPath}`}
          alt={movie.title}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto -mt-56 flex max-w-7xl flex-col gap-10 px-6 pb-16 lg:flex-row">
        {/* Poster */}
        <img
          src={`${POSTER}${movie.posterPath}`}
          alt={movie.title}
          className="w-72 rounded-2xl shadow-2xl"
        />

        {/* Info */}
        <div className="flex-1 text-white">
          <h1 className="mb-4 text-5xl font-bold">
            {movie.title}
          </h1>

          <div className="mb-6 flex flex-wrap gap-3">
            {movie.genres?.map((genre) => (
              <span
                key={genre.id}
                className="rounded-full bg-red-600 px-4 py-2 text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <div className="mb-8 flex flex-wrap gap-8 text-gray-300">
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              {movie.releaseDate?.slice(0, 10)}
            </div>

            <div className="flex items-center gap-2">
              <Clock3 size={18} />
              {movie.runtime} min
            </div>

            <div className="flex items-center gap-2">
              <Film size={18} />
              {movie.status}
            </div>

            <div className="flex items-center gap-2 text-yellow-400">
              <Star fill="currentColor" size={18} />
              {movie.voteAverage.toFixed(1)}
            </div>
          </div>

          <h2 className="mb-3 text-2xl font-semibold">
            Overview
          </h2>

          <p className="max-w-4xl text-lg leading-8 text-gray-300">
            {movie.overview}
          </p>
        </div>
      </div>
    </section>
  );
}

export default MovieHero;