import {
  Calendar,
  Tv,
  Star,
  Layers,
} from "lucide-react";

const BACKDROP = "https://image.tmdb.org/t/p/original";
const POSTER = "https://image.tmdb.org/t/p/w500";

function TVHero({
  tv,
  onAddToList,
}) {
  if (!tv) return null;

  return (
    <section className="relative">
      {/* Backdrop */}
      <div className="relative h-[70vh] w-full">
        <img
          src={`${BACKDROP}${tv.backdropPath}`}
          alt={tv.title}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto -mt-56 flex max-w-7xl flex-col gap-10 px-6 pb-16 lg:flex-row">

        {/* Poster */}
        <img
          src={`${POSTER}${tv.posterPath}`}
          alt={tv.title}
          className="w-72 rounded-2xl shadow-2xl"
        />

        {/* Details */}
        <div className="flex-1 text-white">

          <h1 className="mb-4 text-5xl font-bold">
            {tv.title}
          </h1>

          {/* Genres */}
          <div className="mb-6 flex flex-wrap gap-3">
            {tv.genres?.map((genre) => (
              <span
                key={genre.id}
                className="rounded-full bg-red-600 px-4 py-2 text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="mb-8 flex flex-wrap gap-8 text-gray-300">

            <div className="flex items-center gap-2">
              <Calendar size={18} />
              {tv.releaseDate?.slice(0, 10)}
            </div>

            <div className="flex items-center gap-2">
              <Layers size={18} />
              {tv.numberOfSeasons} Seasons
            </div>

            <div className="flex items-center gap-2">
              <Tv size={18} />
              {tv.status}
            </div>

            <div className="flex items-center gap-2 text-yellow-400">
              <Star
                size={18}
                fill="currentColor"
              />
              {tv.voteAverage.toFixed(1)}
            </div>

          </div>

          {/* Overview */}
          <h2 className="mb-3 text-2xl font-semibold">
            Overview
          </h2>

          <p className="max-w-4xl text-lg leading-8 text-gray-300">
            {tv.overview}
          </p>

          {/* Add To List */}
          <div className="mt-10">
            <button
              onClick={onAddToList}
              className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              + Add To List
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

export default TVHero;