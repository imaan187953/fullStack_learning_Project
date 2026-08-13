function ListStats({ items }) {
  const movieCount = items.filter(
    (item) => item.media.mediaType === "movie"
  ).length;

  const tvCount = items.filter(
    (item) => item.media.mediaType === "tv"
  ).length;

  const stats = [
    {
      value: movieCount,
      label: "Movies",
    },
    {
      value: tvCount,
      label: "TV Shows",
    },
    {
      value: items.length,
      label: "Total",
    },
  ];

  return (
    <div className="mt-5 flex flex-wrap gap-2 sm:gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-lg border border-zinc-800 bg-zinc-900/70 px-3 py-2 sm:px-4"
        >
          <p className="text-base font-bold text-white sm:text-lg">
            {stat.value}
          </p>

          <p className="text-[10px] text-zinc-500 sm:text-xs">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ListStats;