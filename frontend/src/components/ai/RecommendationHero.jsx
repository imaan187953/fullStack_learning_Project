import { Sparkles } from "lucide-react";

function RecommendationHero({ onGenerate, loading }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
      <div className="flex flex-col gap-7 p-5 sm:p-7 lg:flex-row lg:items-center lg:justify-between lg:p-9">

        <div className="min-w-0 max-w-2xl">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5">
            <Sparkles
              size={15}
              className="shrink-0 text-red-500"
            />

            <span className="text-xs font-medium text-red-400 sm:text-sm">
              CineTrack AI
            </span>
          </div>

          <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Personalized
            <span className="block text-red-500">
              AI Recommendations
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">
            Our local AI analyzes your ratings,
            reviews and lists to discover movies
            and TV shows you'll genuinely enjoy.
          </p>
        </div>

        <div className="w-full shrink-0 lg:w-auto">
          <button
            onClick={onGenerate}
            disabled={loading}
            className="w-full rounded-xl bg-red-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50 sm:px-8 sm:py-4 sm:text-base lg:w-auto"
          >
            {loading
              ? "Generating..."
              : "Generate Recommendations"}
          </button>

          <p className="mt-3 text-center text-xs text-zinc-600 lg:text-left">
            Powered by Ollama • Qdrant • RAG
          </p>
        </div>

      </div>
    </section>
  );
}

export default RecommendationHero;