import RecommendationCard from "./RecommendationCard";

function RecommendationGrid({
  recommendations = [],
}) {
  if (!recommendations.length) {
    return (
      <section>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white">
            Recommended For You
          </h2>

          <p className="mt-2 text-zinc-500">
            CineTrack couldn't find recommendations yet.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white">
          Recommended For You
        </h2>

        <p className="mt-2 text-zinc-500">
          Generated from your ratings, reviews and lists.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((movie, index) => (
          <RecommendationCard
            key={`${movie.tmdbId}-${index}`}
            recommendation={movie}
          />
        ))}
      </div>
    </section>
  );
}

export default RecommendationGrid;