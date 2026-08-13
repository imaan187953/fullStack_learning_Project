import {
  Calendar,
  Clock3,
  Film,
  Star,
  Plus,
} from "lucide-react";

const IMAGE = "https://image.tmdb.org/t/p/original";
const POSTER = "https://image.tmdb.org/t/p/w500";

function MovieHero({ movie, onAddToList }) {
  if (!movie) return null;

  return (
    <section className="relative overflow-hidden">
      {/* Backdrop */}
      <div className="relative h-[55vh] min-h-[420px] w-full sm:h-[60vh] lg:h-[68vh]">
        {movie.backdropPath ? (
          <img
            src={`${IMAGE}${movie.backdropPath}`}
            alt={movie.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-zinc-900" />
        )}

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-black/25" />

        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto -mt-32 max-w-7xl px-4 pb-12 sm:-mt-40 sm:px-6 lg:-mt-52 lg:pb-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:gap-10">
          {/* Poster */}
          <div className="mx-auto shrink-0 sm:mx-0">
            {movie.posterPath ? (
              <img
                src={`${POSTER}${movie.posterPath}`}
                alt={movie.title}
                className="
                  w-40
                  rounded-xl
                  shadow-2xl
                  shadow-black/60
                  sm:w-52
                  lg:w-64
                  xl:w-72
                "
              />
            ) : (
              <div className="flex aspect-[2/3] w-40 items-center justify-center rounded-xl bg-zinc-800 text-sm text-zinc-500 sm:w-52 lg:w-64">
                No Poster
              </div>
            )}
          </div>

          {/* Information */}
          <div className="min-w-0 flex-1 text-center lg:text-left">
            {/* Title */}
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-6xl">
              {movie.title}
            </h1>

            {/* Genres */}
            {movie.genres?.length > 0 && (
              <div className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="
                      rounded-full
                      border
                      border-white/10
                      bg-white/10
                      px-3
                      py-1
                      text-xs
                      font-medium
                      text-zinc-200
                      backdrop-blur-sm
                      sm:text-sm
                    "
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {/* Metadata */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm text-zinc-300 lg:justify-start">
              {movie.releaseDate && (
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-zinc-500" />

                  <span>
                    {movie.releaseDate.slice(0, 10)}
                  </span>
                </div>
              )}

              {movie.runtime && (
                <div className="flex items-center gap-2">
                  <Clock3 size={16} className="text-zinc-500" />

                  <span>{movie.runtime} min</span>
                </div>
              )}

              {movie.status && (
                <div className="flex items-center gap-2">
                  <Film size={16} className="text-zinc-500" />

                  <span>{movie.status}</span>
                </div>
              )}

              {movie.voteAverage !== undefined && (
                <div className="flex items-center gap-1.5 text-yellow-400">
                  <Star
                    size={16}
                    fill="currentColor"
                  />

                  <span className="font-semibold">
                    {movie.voteAverage.toFixed(1)}
                  </span>

                  <span className="text-zinc-500">
                    / 10
                  </span>
                </div>
              )}
            </div>

            {/* Overview */}
            <div className="mt-7 max-w-3xl lg:mt-8">
              <h2 className="mb-2 text-lg font-semibold text-white">
                Overview
              </h2>

              <p className="text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
                {movie.overview ||
                  "No overview available for this title."}
              </p>
            </div>

            {/* CTA */}
            <div className="mt-8 flex justify-center lg:justify-start">
              <button
                onClick={onAddToList}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-red-600
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-red-600/20
                  transition
                  hover:bg-red-500
                  hover:shadow-red-600/30
                  active:scale-[0.98]
                  sm:px-6
                  sm:py-3.5
                "
              >
                <Plus size={18} />
                Add to List
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MovieHero;