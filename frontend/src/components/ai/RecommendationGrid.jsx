import RecommendationCard from "./RecommendationCard";

function RecommendationGrid({
  recommendations = [],
}) {
  return (
    <section className="min-w-0">

      <div className="mb-5 sm:mb-7">

        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Recommended For You
        </h2>

        <p className="mt-1.5 text-sm text-zinc-500">
          Generated from your ratings, reviews and lists.
        </p>

      </div>

      {!recommendations.length ? (
        <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-950 p-8 text-center">
          <p className="text-sm text-zinc-500">
            CineTrack couldn't find recommendations yet.
          </p>
        </div>
      ) : (
        <div className="grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((movie, index) => (
            <RecommendationCard
              key={`${movie.tmdbId}-${index}`}
              recommendation={movie}
            />
          ))}
        </div>
      )}

    </section>
  );
}

export default RecommendationGrid;