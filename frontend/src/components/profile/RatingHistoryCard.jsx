import { Link } from "react-router-dom";
import { Star, Trash2 } from "lucide-react";

function RatingHistoryCard({
  rating,
  onDelete,
}) {
  const media = rating.media;

  return (
    <div className="flex items-center gap-5 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-red-500">

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

      <div className="flex flex-1 items-center justify-between">

        <div>

          <Link
            to={`/${media.mediaType}/${media.tmdbId}`}
          >
            <h2 className="text-xl font-bold text-white hover:text-red-500">
              {media.title}
            </h2>
          </Link>

          <p className="mt-2 text-sm uppercase tracking-wide text-zinc-500">
            {media.mediaType}
          </p>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-white">
            <Star
              size={16}
              fill="white"
            />
            {rating.rating}/10
          </div>

        </div>

        <button
          onClick={() => onDelete(rating.media._id)}
          className="rounded-lg bg-zinc-800 p-3 text-white transition hover:bg-red-600"
        >
          <Trash2 size={20} />
        </button>

      </div>

    </div>
  );
}

export default RatingHistoryCard;