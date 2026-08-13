import MediaCard from "../../components/media/MediaCard";

function TrendingSection({
  title,
  movies = [],
}) {
  return (
    <section className="mx-auto w-full max-w-7xl px-3 py-8 sm:px-5 sm:py-10 md:px-6 md:py-12 lg:px-8 lg:py-16">
      
      <div className="mb-4 flex items-center justify-between sm:mb-6 lg:mb-8">
        <h2 className="text-xl font-bold text-white sm:text-2xl lg:text-3xl">
          {title}
        </h2>
      </div>

      {movies.length === 0 ? (
        <p className="text-sm text-gray-400">
          No media available.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-6">
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

