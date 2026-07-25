function ListStats({ items }) {
  const movieCount = items.filter(
    (item) => item.media.mediaType === "movie"
  ).length;

  const tvCount = items.filter(
    (item) => item.media.mediaType === "tv"
  ).length;

  return (
    <div className="mt-6 flex flex-wrap gap-6">
      <div>
        <p className="text-2xl font-bold text-white">
          {movieCount}
        </p>

        <p className="text-sm text-zinc-400">
          Movies
        </p>
      </div>

      <div>
        <p className="text-2xl font-bold text-white">
          {tvCount}
        </p>

        <p className="text-sm text-zinc-400">
          TV Shows
        </p>
      </div>

      <div>
        <p className="text-2xl font-bold text-white">
          {items.length}
        </p>

        <p className="text-sm text-zinc-400">
          Total Items
        </p>
      </div>
    </div>
  );
}

export default ListStats;