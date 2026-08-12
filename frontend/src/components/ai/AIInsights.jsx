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
  return (
    <section className="rounded-2xl border border-zinc-800 bg-black">

      <div className="border-b border-zinc-800 p-6">

        <div className="flex items-center gap-3">

          <Brain
            size={22}
            className="text-red-500"
          />

          <div>

            <h2 className="text-2xl font-bold text-white">
              AI Insights
            </h2>

            <p className="mt-1 text-zinc-500">
              Here's what CineTrack analyzed before generating your recommendations.
            </p>

          </div>

        </div>

      </div>

      <div className="grid gap-4 p-6 md:grid-cols-2">

        <InsightItem
          icon={Database}
          title="Library Analysis"
          value={`${statistics.ratings} Ratings • ${statistics.reviews} Reviews • ${statistics.lists} Lists`}
        />

        <InsightItem
          icon={Brain}
          title="Semantic Matches"
          value={`${retrievedCount} similar titles found`}
        />

        <InsightItem
          icon={Tags}
          title="Favorite Genres"
          value={
            favoriteGenres.length
              ? favoriteGenres.join(", ")
              : "No preferences yet"
          }
        />

        <InsightItem
          icon={Clock3}
          title="Generated"
          value={new Date(
            generatedAt
          ).toLocaleString()}
        />

      </div>

    </section>
  );
}

export default AIInsights;