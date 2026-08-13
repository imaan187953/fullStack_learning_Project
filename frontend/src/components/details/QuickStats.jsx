import {
  Calendar,
  Clock3,
  Film,
  Layers,
  Star,
} from "lucide-react";

function QuickStats({
  media,
  mediaType = "movie",
}) {
  if (!media) return null;

  const stats = [
    {
      label: "TMDB Rating",
      value:
        media.voteAverage !== undefined
          ? `${media.voteAverage.toFixed(1)}/10`
          : "N/A",
      icon: Star,
      iconClass: "text-yellow-400",
    },
    {
      label: "Release Date",
      value: media.releaseDate
        ? media.releaseDate.slice(0, 10)
        : "N/A",
      icon: Calendar,
      iconClass: "text-zinc-400",
    },
    {
      label:
        mediaType === "movie"
          ? "Runtime"
          : "Seasons",
      value:
        mediaType === "movie"
          ? media.runtime
            ? `${media.runtime} min`
            : "N/A"
          : media.numberOfSeasons ?? "N/A",
      icon:
        mediaType === "movie"
          ? Clock3
          : Layers,
      iconClass: "text-zinc-400",
    },
    {
      label: "Status",
      value: media.status || "N/A",
      icon: Film,
      iconClass: "text-zinc-400",
    },
  ];

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
          Details
        </p>

        <h2 className="mt-1 text-xl font-semibold text-white">
          Quick Statistics
        </h2>
      </div>

      {/* Stats */}
      <div className="divide-y divide-zinc-800">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
            >
              <div className="flex min-w-0 items-center gap-3">
                <Icon
                  size={17}
                  className={`shrink-0 ${stat.iconClass}`}
                  fill={
                    stat.label === "TMDB Rating"
                      ? "currentColor"
                      : "none"
                  }
                />

                <span className="truncate text-sm text-zinc-500">
                  {stat.label}
                </span>
              </div>

              <span className="shrink-0 text-right text-sm font-semibold text-white">
                {stat.value}
              </span>
            </div>
          );
        })}
      </div>

      {/* Genres */}
      {media.genres?.length > 0 && (
        <div className="mt-6 border-t border-zinc-800 pt-5">
          <p className="mb-3 text-sm text-zinc-500">
            Genres
          </p>

          <div className="flex flex-wrap gap-2">
            {media.genres.map((genre) => (
              <span
                key={genre.id}
                className="
                  rounded-full
                  border
                  border-zinc-700
                  bg-zinc-800/70
                  px-3
                  py-1.5
                  text-xs
                  text-zinc-300
                "
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default QuickStats;