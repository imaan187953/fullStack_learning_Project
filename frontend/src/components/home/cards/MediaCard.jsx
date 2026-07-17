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
      className="group"
    >
      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-2 hover:border-red-500">
        <div className="overflow-hidden">
          <img
            src={`${IMAGE_BASE_URL}${media.poster_path || media.posterPath}`}
            alt={title}
            className="h-80 w-full object-cover transition duration-500 group-hover:scale-110"
          />
        </div>

        <div className="space-y-4 p-4">
          <h3 className="truncate text-lg font-semibold text-white">
            {title}
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-yellow-400">
              <Star
                size={16}
                fill="currentColor"
              />

              <span className="text-sm">
                {vote?.toFixed(1)}
              </span>
            </div>

            <div className="flex items-center gap-1 text-sm text-zinc-400">
              <Calendar size={15} />

              <span>
                {releaseDate?.slice(0, 4)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MediaCard;