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
    <article className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition duration-300 hover:-translate-y-1 hover:border-red-500/40">

      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden bg-zinc-950">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            onLoad={() => {
              console.log("POSTER LOADED:", posterUrl);
            }}
            onError={(error) => {
              console.error("POSTER FAILED:", posterUrl);
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            {mediaType === "movie" ? (
              <Film
                size={48}
                className="text-zinc-700"
              />
            ) : (
              <Tv
                size={48}
                className="text-zinc-700"
              />
            )}
          </div>
        )}

        {/* Match badge */}
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full border border-red-500/30 bg-black/80 px-3 py-1.5 text-sm font-semibold text-red-400 backdrop-blur">
          <Sparkles size={14} />

          {confidencePercent}% Match
        </div>
      </div>

      {/* Content */}
      <div className="p-5">

        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-white">
              {title}
            </h3>

            <p className="mt-1 text-sm capitalize text-zinc-500">
              {mediaType === "tv"
                ? "TV Series"
                : "Movie"}
            </p>
          </div>
        </div>

        {/* Genres */}
        {genres.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {genres.map((item) => (
              <span
                key={item}
                className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1 text-xs text-zinc-400"
              >
                {item}
              </span>
            ))}
          </div>
        )}

        {/* Reason */}
        {reason && (
          <div className="mt-5">
            <p className="text-xs font-medium uppercase tracking-wide text-red-500">
              Why you'll like it
            </p>

            <p className="mt-2 line-clamp-3 text-sm leading-6 text-zinc-400">
              {reason}
            </p>
          </div>
        )}

        {/* Details */}
        <Link
          to={detailRoute}
          className="mt-6 inline-flex items-center gap-2 font-medium text-red-500 transition group-hover:gap-3"
        >
          View Details

          <ArrowRight size={18} />
        </Link>
      </div>
    </article>
  );
}

export default RecommendationCard;