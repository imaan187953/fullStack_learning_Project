import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

function ReviewHistoryCard({
  review,
  onEdit,
  onDelete,
}) {
  const media = review.media;

  return (
    <div className="flex gap-5 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-red-500">

      <Link
        to={`/${media.mediaType}/${media.tmdbId}`}
        className="shrink-0"
      >
        <img
          src={
            media.posterPath
              ? `https://image.tmdb.org/t/p/w300${media.posterPath}`
              : "https://placehold.co/200x300?text=No+Poster"
          }
          alt={media.title}
          className="h-40 w-28 rounded-xl object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col">

        <div className="flex items-start justify-between">

          <div>

            <Link
              to={`/${media.mediaType}/${media.tmdbId}`}
            >
              <h2 className="text-xl font-bold text-white hover:text-red-500">
                {media.title}
              </h2>
            </Link>

            <p className="mt-1 text-sm uppercase tracking-wide text-zinc-500">
              {media.mediaType}
            </p>

          </div>

          <div className="flex gap-2">

            <button
              onClick={() => onEdit(review)}
              className="rounded-lg bg-zinc-800 p-2 text-white transition hover:bg-red-600"
            >
              <Pencil size={18} />
            </button>

            <button
              onClick={() => onDelete(review._id)}
              className="rounded-lg bg-zinc-800 p-2 text-white transition hover:bg-red-600"
            >
              <Trash2 size={18} />
            </button>

          </div>

        </div>

        <p className="mt-5 leading-7 text-zinc-300">
          {review.review}
        </p>

        <span className="mt-auto pt-5 text-sm text-zinc-500">
          {new Date(review.createdAt).toLocaleDateString()}
        </span>

      </div>

    </div>
  );
}

export default ReviewHistoryCard;