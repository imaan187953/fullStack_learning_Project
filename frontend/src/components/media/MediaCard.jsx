import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MediaCard({ media }) {
  if (!media) return null;

  const mediaId = media.id || media.tmdbId;

  const isTV =
    media.media_type === "tv" ||
    media.mediaType === "tv";

  return (
    <Link
      to={isTV ? `/tv/${mediaId}` : `/movie/${mediaId}`}
      className="group"
    >
      <div className="overflow-hidden rounded-xl bg-zinc-900 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-red-500/20">

        {/* Poster */}
        <div className="overflow-hidden">
          <img
            src={`${IMAGE_BASE_URL}${media.poster_path || media.posterPath}`}
            alt={media.title || media.name}
            className="h-80 w-full object-cover transition duration-500 group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="p-4">

          <h3 className="truncate text-lg font-semibold text-white">
            {media.title || media.name}
          </h3>

          <div className="mt-3 flex items-center justify-between">

            <div className="flex items-center gap-1 text-yellow-400">
              <Star size={16} fill="currentColor" />

              <span>
                {(
                  media.vote_average ??
                  media.voteAverage ??
                  0
                ).toFixed(1)}
              </span>
            </div>

            <span className="text-sm text-gray-400">
              {(
                media.release_date ||
                media.first_air_date ||
                media.releaseDate ||
                ""
              ).slice(0, 4)}
            </span>

          </div>

        </div>

      </div>
    </Link>
  );
}

export default MediaCard;