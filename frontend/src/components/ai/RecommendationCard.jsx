import {
  ArrowRight,
  Film,
  Tv,
  Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";

function RecommendationCard({
  recommendation,
}) {
  const {
    title,
    mediaType,
    confidence,
    reason,
    genre,
    tmdbId,
    posterPath,
  } = recommendation;

  const posterUrl = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : null;

  const genres = genre
    ? genre
        .split(",")
        .slice(0, 3)
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  const detailRoute =
    mediaType === "movie"
      ? `/movie/${tmdbId}`
      : `/tv/${tmdbId}`;

  const confidencePercent = Math.round(
    (confidence || 0) * 100
  );

  return (
    <article className="group min-w-0 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition duration-300 hover:border-red-500/40 sm:hover:-translate-y-1">

      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden bg-zinc-950">

        {posterUrl ? (
          <img
            src={posterUrl}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            {mediaType === "movie" ? (
              <Film
                size={42}
                className="text-zinc-700"
              />
            ) : (
              <Tv
                size={42}
                className="text-zinc-700"
              />
            )}
          </div>
        )}

        {/* Match */}
        <div className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-full border border-red-500/20 bg-black/80 px-2.5 py-1 text-[11px] font-semibold text-red-400 backdrop-blur sm:right-3 sm:top-3 sm:px-3 sm:py-1.5 sm:text-xs">
          <Sparkles size={12} />
          {confidencePercent}%
        </div>

      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">

        <h3 className="truncate text-lg font-semibold text-white sm:text-xl">
          {title}
        </h3>

        <p className="mt-1 text-xs capitalize text-zinc-500 sm:text-sm">
          {mediaType === "tv"
            ? "TV Series"
            : "Movie"}
        </p>

        {/* Genres */}
        {genres.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">

            {genres.map((item) => (
              <span
                key={item}
                className="max-w-full truncate rounded-full border border-zinc-700 bg-zinc-950 px-2.5 py-1 text-[10px] text-zinc-400 sm:text-xs"
              >
                {item}
              </span>
            ))}

          </div>
        )}

        {/* Reason */}
        {reason && (
          <div className="mt-4">

            <p className="text-[10px] font-medium uppercase tracking-wider text-red-500 sm:text-xs">
              Why you'll like it
            </p>

            <p className="mt-1.5 line-clamp-3 text-xs leading-5 text-zinc-400 sm:text-sm sm:leading-6">
              {reason}
            </p>

          </div>
        )}

        <Link
          to={detailRoute}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-red-500 transition group-hover:gap-2.5"
        >
          View Details
          <ArrowRight size={16} />
        </Link>

      </div>

    </article>
  );
}

export default RecommendationCard;