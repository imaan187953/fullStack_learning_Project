import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

function ReviewHistoryCard({
  review,
  onEdit,
  onDelete,
}) {
  const media = review.media;

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

        {/* Top */}
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

          {/* Actions */}
          <div className="flex shrink-0 gap-2">

            <button
              type="button"
              onClick={() => onEdit(review)}
              className="rounded-lg bg-zinc-800 p-2.5 text-zinc-400 transition hover:bg-red-600 hover:text-white"
              aria-label="Edit review"
            >
              <Pencil size={16} />
            </button>

            <button
              type="button"
              onClick={() => onDelete(review._id)}
              className="rounded-lg bg-zinc-800 p-2.5 text-zinc-400 transition hover:bg-red-600 hover:text-white"
              aria-label="Delete review"
            >
              <Trash2 size={16} />
            </button>

          </div>

        </div>

        {/* Review */}
        <p className="mt-4 break-words text-sm leading-6 text-zinc-300 sm:text-base sm:leading-7">
          {review.review}
        </p>

        {/* Date */}
        <span className="mt-4 text-xs text-zinc-600 sm:mt-auto sm:pt-5">
          {new Date(review.createdAt).toLocaleDateString()}
        </span>

      </div>

    </article>
  );
}

export default ReviewHistoryCard;