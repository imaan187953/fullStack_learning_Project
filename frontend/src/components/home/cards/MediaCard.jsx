import { Link } from "react-router-dom";
import { Calendar, Star } from "lucide-react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MediaCard({ media }) {
  if (!media) return null;

  const id = media.id || media.tmdbId;

  const type =
    media.media_type ||
    media.mediaType ||
    "movie";

  const title =
    media.title ||
    media.name;

  const releaseDate =
    media.release_date ||
    media.first_air_date ||
    media.releaseDate;

  const vote =
    media.vote_average ??
    media.voteAverage;

  return (
    <Link
      to={
        type === "tv"
          ? `/tv/${id}`
          : `/movie/${id}`
      }
      className="group block min-w-0"
    >
      <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-1 hover:border-red-500 sm:rounded-xl lg:rounded-2xl lg:hover:-translate-y-2">

        {/* Poster */}
        <div className="aspect-2/3 overflow-hidden bg-zinc-800">
          <img
            src={`${IMAGE_BASE_URL}${media.poster_path || media.posterPath}`}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105 lg:group-hover:scale-110"
          />
        </div>

        {/* Information */}
        <div className="space-y-2 p-2.5 sm:space-y-3 sm:p-3 lg:space-y-4 lg:p-4">

          <h3 className="truncate text-sm font-semibold text-white sm:text-base lg:text-lg">
            {title}
          </h3>

          <div className="flex items-center justify-between gap-2">

            {/* Rating */}
            <div className="flex min-w-0 items-center gap-1 text-yellow-400">
              <Star
                size={14}
                fill="currentColor"
                className="shrink-0 sm:h-4 sm:w-4"
              />

              <span className="text-xs sm:text-sm">
                {vote != null ? vote.toFixed(1) : "N/A"}
              </span>
            </div>

            {/* Release Year */}
            <div className="flex min-w-0 items-center gap-1 text-zinc-400">
              <Calendar
                size={13}
                className="shrink-0 sm:h-[15px] sm:w-[15px]"
              />

              <span className="text-xs sm:text-sm">
                {releaseDate?.slice(0, 4) || "N/A"}
              </span>
            </div>

          </div>

        </div>
      </div>
    </Link>
  );
}

export default MediaCard;
