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
      <div className="relative h-[42vh] min-h-[280px] max-h-[520px] w-full sm:h-[50vh] lg:h-[65vh]">

        <img
          src={`${IMAGE}${movie.backdropPath}`}
          alt={movie.title}
          className="h-full w-full object-cover"
        />

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-black/20" />

        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/50 to-transparent" />

      </div>

      {/* Content */}
      <div
        className="
          relative
          z-10
          mx-auto
          flex
          max-w-7xl
          flex-col
          gap-7
          px-4
          pb-10
          sm:gap-8
          sm:px-6
          sm:pb-14
          lg:-mt-48
          lg:flex-row
          lg:gap-10
          lg:px-8
          lg:pb-16
        "
      >

        {/* Poster */}
        <div className="flex shrink-0 justify-center lg:block">

          <img
            src={`${POSTER}${movie.posterPath}`}
            alt={movie.title}
            className="
              w-40
              rounded-xl
              shadow-2xl
              sm:w-48
              md:w-56
              lg:w-64
              xl:w-72
            "
          />

        </div>

        {/* Information */}
        <div className="min-w-0 flex-1 text-white">

          {/* Title */}
          <h1
            className="
              break-words
              text-3xl
              font-bold
              leading-tight
              sm:text-4xl
              lg:text-5xl
              xl:text-6xl
            "
          >
            {movie.title}
          </h1>

          {/* Genres */}
          {movie.genres?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2 sm:mt-5 sm:gap-3">

              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="
                    rounded-full
                    bg-red-600/90
                    px-3
                    py-1.5
                    text-xs
                    font-medium
                    text-white
                    sm:px-4
                    sm:py-2
                    sm:text-sm
                  "
                >
                  {genre.name}
                </span>
              ))}

            </div>
          )}

          {/* Metadata */}
          <div
            className="
              mt-5
              flex
              flex-wrap
              gap-x-5
              gap-y-3
              text-sm
              text-gray-300
              sm:mt-6
              sm:gap-x-7
              sm:text-base
            "
          >

            <div className="flex items-center gap-2">
              <Calendar size={17} className="shrink-0" />

              <span>
                {movie.releaseDate?.slice(0, 10) || "N/A"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock3 size={17} className="shrink-0" />

              <span>
                {movie.runtime ? `${movie.runtime} min` : "N/A"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Film size={17} className="shrink-0" />

              <span>
                {movie.status || "N/A"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-yellow-400">
              <Star
                size={17}
                fill="currentColor"
                className="shrink-0"
              />

              <span>
                {movie.voteAverage?.toFixed(1) || "0.0"}
              </span>
            </div>

          </div>

          {/* Overview */}
          <div className="mt-7 sm:mt-8">

            <h2 className="text-xl font-semibold sm:text-2xl">
              Overview
            </h2>

            <p
              className="
                mt-3
                max-w-4xl
                text-sm
                leading-6
                text-gray-300
                sm:text-base
                sm:leading-7
                lg:text-lg
                lg:leading-8
              "
            >
              {movie.overview || "No overview available."}
            </p>

          </div>

          {/* Add to List */}
          <div className="mt-7 sm:mt-9">

            <button
              onClick={onAddToList}
              className="
                inline-flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-red-600
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-red-700
                active:scale-[0.98]
                sm:w-auto
                sm:px-6
                sm:text-base
              "
            >
              <Plus size={18} />
              Add To List
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default MovieHero;