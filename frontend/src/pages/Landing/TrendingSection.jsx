import MediaCard from "../../components/media/MediaCard";

function TrendingSection({
  title,
  movies = [],
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">
          {title}
        </h2>
      </div>

      {movies.length === 0 ? (
        <p className="text-gray-400">
          No media available.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {movies.slice(0, 10).map((movie) => (
            <MediaCard
              key={movie.id}
              media={movie}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default TrendingSection;