import { Link } from "react-router-dom";
import { Star, Trash2 } from "lucide-react";

function RatingHistoryCard({
  rating,
  onDelete,
}) {
  const media = rating.media;

  if (!media) return null;

  const mediaType = media.mediaType || "movie";

  return (
    <article className="flex min-w-0 flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-4 transition hover:border-zinc-700 sm:flex-row sm:gap-5 sm:p-5">

      {/* Poster */}
      <Link
        to={`/${mediaType}/${media.tmdbId}`}
        className="mx-auto shrink-0 sm:mx-0"
      >
        <img
          src={
            media.posterPath
              ? `https://image.tmdb.org/t/p/w300${media.posterPath}`
              : "https://placehold.co/200x300?text=No+Poster"
          }
          alt={media.title}
          className="h-44 w-28 rounded-xl object-cover sm:h-40 sm:w-28"
        />
      </Link>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col">

        <div className="flex min-w-0 items-start justify-between gap-3">

          <div className="min-w-0">
            <Link
              to={`/${mediaType}/${media.tmdbId}`}
            >
              <h2 className="break-words text-lg font-bold leading-tight text-white transition hover:text-red-500 sm:text-xl">
                {media.title}
              </h2>
            </Link>

            <p className="mt-1 text-xs uppercase tracking-wide text-zinc-600">
              {mediaType}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onDelete(media._id)}
            className="shrink-0 rounded-lg bg-zinc-800 p-2.5 text-zinc-400 transition hover:bg-red-600 hover:text-white"
            aria-label="Delete rating"
          >
            <Trash2 size={17} />
          </button>

        </div>

        <div className="mt-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-600 px-3 py-1.5 text-sm font-semibold text-white">
            <Star
              size={15}
              fill="white"
            />

            {rating.rating}/10
          </div>
        </div>

      </div>

    </article>
  );
}

export default RatingHistoryCard;