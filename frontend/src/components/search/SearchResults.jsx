import MediaCard from "../media/MediaCard";

function SearchResults({
  results,
  loading,
  error,
}) {
  if (loading) {
    return (
      <div className="mt-10 text-center text-zinc-400">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-10 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="mt-10 rounded-xl border border-dashed border-zinc-700 p-10 text-center">
        <h3 className="text-xl font-semibold text-white">
          No Results
        </h3>

        <p className="mt-2 text-zinc-400">
          Try searching for another movie or TV show.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
      {results.map((media) => (
        <MediaCard
          key={media.id}
          media={media}
        />
      ))}
    </div>
  );
}

export default SearchResults;