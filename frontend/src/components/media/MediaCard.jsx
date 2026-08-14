import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MediaCard({ media }) {
  if (!media) return null;

  const mediaId = media.id || media.tmdbId;

  const isTV =
    media.media_type === "tv" ||
    media.mediaType === "tv";

  const title = media.title || media.name;

  const posterPath =
    media.poster_path || media.posterPath;

  const rating =
    media.vote_average ??
    media.voteAverage ??
    0;

  const releaseDate =
    media.release_date ||
    media.first_air_date ||
    media.releaseDate ||
    "";

  return (
    <Link
      to={isTV ? `/tv/${mediaId}` : `/movie/${mediaId}`}
      className="group block min-w-0"
    >

      <article
        className="
          min-w-0
          overflow-hidden
          rounded-xl
          border
          border-zinc-800
          bg-zinc-900
          transition
          duration-300
          hover:border-zinc-700
          hover:shadow-lg
          hover:shadow-red-950/20
          sm:rounded-2xl
          sm:hover:-translate-y-1
        "
      >

        {/* Poster */}
        <div className="aspect-[2/3] w-full overflow-hidden bg-zinc-800">

          {posterPath ? (
            <img
              src={`${IMAGE_BASE_URL}${posterPath}`}
              alt={title}
              loading="lazy"
              className="
                h-full
                w-full
                object-cover
                transition
                duration-500
                sm:group-hover:scale-105
              "
            />
          ) : (
            <div className="flex h-full items-center justify-center px-3 text-center text-xs text-zinc-500">
              No Poster
            </div>
          )}

        </div>

        {/* Content */}
        <div className="min-w-0 p-2.5 sm:p-4">

          <h3
            className="
              truncate
              text-sm
              font-semibold
              text-white
              sm:text-base
              lg:text-lg
            "
            title={title}
          >
            {title}
          </h3>

          <div className="mt-2 flex min-w-0 items-center justify-between gap-2 sm:mt-3">

            {/* Rating */}
            <div className="flex min-w-0 items-center gap-1 text-xs text-yellow-400 sm:text-sm">

              <Star
                size={14}
                fill="currentColor"
                className="shrink-0 sm:h-4 sm:w-4"
              />

              <span>
                {Number(rating).toFixed(1)}
              </span>

            </div>

            {/* Year */}
            <span className="shrink-0 text-xs text-zinc-500 sm:text-sm">
              {releaseDate.slice(0, 4)}
            </span>

          </div>

        </div>

      </article>

    </Link>
  );
}

export default MediaCard;