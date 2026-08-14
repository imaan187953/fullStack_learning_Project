import {
  Brain,
  Database,
  Tags,
  Clock3,
} from "lucide-react";

import InsightItem from "./InsightItem";

function AIInsights({
  statistics,
  favoriteGenres,
  retrievedCount,
  generatedAt,
}) {
  const safeStatistics = statistics || {};
  const safeGenres = Array.isArray(favoriteGenres)
    ? favoriteGenres
    : [];

  return (
    <section className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">

      <div className="border-b border-zinc-800 p-5 sm:p-6">

        <div className="flex items-start gap-3">

          <div className="mt-0.5 shrink-0">
            <Brain
              size={20}
              className="text-red-500"
            />
          </div>

          <div className="min-w-0">

            <h2 className="text-xl font-bold text-white sm:text-2xl">
              AI Insights
            </h2>

            <p className="mt-1 text-xs leading-5 text-zinc-500 sm:text-sm">
              What CineTrack analyzed before generating your recommendations.
            </p>

          </div>

        </div>

      </div>

      <div className="grid gap-3 p-4 sm:grid-cols-2 sm:gap-4 sm:p-6">

        <InsightItem
          icon={Database}
          title="Library Analysis"
          value={`${safeStatistics.ratings || 0} Ratings • ${safeStatistics.reviews || 0} Reviews • ${safeStatistics.lists || 0} Lists`}
        />

        <InsightItem
          icon={Brain}
          title="Semantic Matches"
          value={`${retrievedCount || 0} similar titles found`}
        />

        <InsightItem
          icon={Tags}
          title="Favorite Genres"
          value={
            safeGenres.length
              ? safeGenres.join(", ")
              : "No preferences yet"
          }
        />

        <InsightItem
          icon={Clock3}
          title="Generated"
          value={
            generatedAt
              ? new Date(generatedAt).toLocaleString()
              : "Just now"
          }
        />

      </div>

    </section>
  );
}

export default AIInsights;