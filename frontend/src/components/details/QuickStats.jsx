import {
  Calendar,
  Clock3,
  Film,
  Layers,
  Star,
} from "lucide-react";

function QuickStats({
  media,
  mediaType,
}) {
  if (!media) return null;

  return (
    <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6">

      <h2 className="mb-5 text-xl font-bold text-white sm:mb-6 sm:text-2xl">
        Quick Statistics
      </h2>

      <div className="space-y-4 sm:space-y-5">

        {/* TMDB Rating */}
        <div className="flex items-center justify-between gap-4">

          <div className="flex min-w-0 items-center gap-3 text-sm text-gray-400 sm:text-base">
            <Star
              size={18}
              className="shrink-0 text-yellow-400"
              fill="currentColor"
            />

            <span>TMDB Rating</span>
          </div>

          <span className="shrink-0 text-sm font-semibold text-white sm:text-base">
            {media.voteAverage?.toFixed(1) || "0.0"}/10
          </span>

        </div>

        {/* Release Date */}
        <div className="flex items-center justify-between gap-4">

          <div className="flex min-w-0 items-center gap-3 text-sm text-gray-400 sm:text-base">
            <Calendar size={18} className="shrink-0" />

            <span>Release Date</span>
          </div>

          <span className="shrink-0 text-right text-sm font-semibold text-white sm:text-base">
            {media.releaseDate?.slice(0, 10) || "N/A"}
          </span>

        </div>

        {/* Runtime / Seasons */}
        {mediaType === "movie" ? (
          <div className="flex items-center justify-between gap-4">

            <div className="flex items-center gap-3 text-sm text-gray-400 sm:text-base">
              <Clock3 size={18} className="shrink-0" />

              <span>Runtime</span>
            </div>

            <span className="shrink-0 text-sm font-semibold text-white sm:text-base">
              {media.runtime ? `${media.runtime} min` : "N/A"}
            </span>

          </div>
        ) : (
          <div className="flex items-center justify-between gap-4">

            <div className="flex items-center gap-3 text-sm text-gray-400 sm:text-base">
              <Layers size={18} className="shrink-0" />

              <span>Seasons</span>
            </div>

            <span className="shrink-0 text-sm font-semibold text-white sm:text-base">
              {media.numberOfSeasons || "N/A"}
            </span>

          </div>
        )}

        {/* Status */}
        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3 text-sm text-gray-400 sm:text-base">
            <Film size={18} className="shrink-0" />

            <span>Status</span>
          </div>

          <span className="max-w-[55%] truncate text-right text-sm font-semibold text-white sm:text-base">
            {media.status || "N/A"}
          </span>

        </div>

        {/* Genres */}
        <div className="pt-1">

          <p className="mb-3 text-sm text-gray-400 sm:text-base">
            Genres
          </p>

          <div className="flex flex-wrap gap-2">

            {media.genres?.map((genre) => (
              <span
                key={genre.id}
                className="
                  rounded-full
                  bg-red-600/90
                  px-3
                  py-1
                  text-xs
                  font-medium
                  text-white
                  sm:text-sm
                "
              >
                {genre.name}
              </span>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default QuickStats;