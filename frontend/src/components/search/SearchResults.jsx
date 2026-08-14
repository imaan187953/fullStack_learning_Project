import MediaCard from "../media/MediaCard";

function SearchResults({
  results,
  loading,
  error,
}) {
  if (loading) {
    return (
      <div className="mt-8 flex min-h-32 items-center justify-center text-sm text-zinc-400 sm:mt-10">
        Searching...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 rounded-xl border border-red-900/50 bg-red-950/20 p-6 text-center text-sm text-red-400 sm:mt-10">
        {error}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="mt-8 rounded-xl border border-dashed border-zinc-800 bg-zinc-900/40 px-5 py-10 text-center sm:mt-10 sm:px-8">

        <h3 className="text-lg font-semibold text-white sm:text-xl">
          No Results
        </h3>

        <p className="mt-2 text-sm text-zinc-500 sm:text-base">
          Try searching for another movie or TV show.
        </p>

      </div>
    );
  }

  return (
    <section className="mt-8 sm:mt-10">

      <div className="mb-4 flex items-center justify-between sm:mb-5">
        <h2 className="text-lg font-semibold text-white sm:text-xl">
          Search Results
        </h2>

        <span className="text-xs text-zinc-500 sm:text-sm">
          {results.length} results
        </span>
      </div>

      <div
        className="
          grid
          min-w-0
          grid-cols-2
          gap-3
          sm:grid-cols-3
          sm:gap-5
          lg:grid-cols-4
          xl:grid-cols-5
        "
      >
        {results.map((media) => (
          <MediaCard
            key={`${media.media_type}-${media.id}`}
            media={media}
          />
        ))}
      </div>

    </section>
  );
}

export default SearchResults;