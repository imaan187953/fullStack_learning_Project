import { Sparkles } from "lucide-react";

function RecommendationHero({ onGenerate, loading }) {
  return (
    <section className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 p-10">

      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        <div className="max-w-2xl">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2">

            <Sparkles
              size={18}
              className="text-red-500"
            />

            <span className="text-sm font-medium text-red-400">
              CineTrack AI
            </span>

          </div>

          <h1 className="text-5xl font-bold leading-tight text-white">
            Personalized
            <span className="block text-red-500">
              AI Recommendations
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-400">
            Our local AI analyzes your ratings,
            reviews and lists to discover movies
            and TV shows you'll genuinely enjoy.
          </p>

        </div>

        <div className="flex flex-col items-start gap-4">

          <button
            onClick={onGenerate}
            disabled={loading}
            className="rounded-xl bg-red-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Generating..."
              : "Generate New Recommendations"}
          </button>

          <p className="text-sm text-zinc-500">
            Powered by Ollama • Qdrant • RAG
          </p>

        </div>

      </div>

    </section>
  );
}

export default RecommendationHero;