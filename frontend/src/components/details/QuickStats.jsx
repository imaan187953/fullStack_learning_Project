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
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Quick Statistics
      </h2>

      <div className="space-y-5">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3 text-gray-400">
            <Star
              size={18}
              className="text-yellow-400"
              fill="currentColor"
            />
            TMDB Rating
          </div>

          <span className="font-semibold text-white">
            {media.voteAverage?.toFixed(1)}/10
          </span>

        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3 text-gray-400">
            <Calendar size={18} />
            Release Date
          </div>

          <span className="font-semibold text-white">
            {media.releaseDate?.slice(0, 10)}
          </span>

        </div>

        {mediaType === "movie" ? (
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3 text-gray-400">
              <Clock3 size={18} />
              Runtime
            </div>

            <span className="font-semibold text-white">
              {media.runtime} min
            </span>

          </div>
        ) : (
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3 text-gray-400">
              <Layers size={18} />
              Seasons
            </div>

            <span className="font-semibold text-white">
              {media.numberOfSeasons}
            </span>

          </div>
        )}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3 text-gray-400">
            <Film size={18} />
            Status
          </div>

          <span className="font-semibold text-white">
            {media.status}
          </span>

        </div>

        <div>

          <p className="mb-3 text-gray-400">
            Genres
          </p>

          <div className="flex flex-wrap gap-2">

            {media.genres?.map((genre) => (
              <span
                key={genre.id}
                className="rounded-full bg-red-600 px-3 py-1 text-sm text-white"
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