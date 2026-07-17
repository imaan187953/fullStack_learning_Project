import { Sparkles, Star, ArrowRight } from "lucide-react";

function RecommendationCard({ recommendation }) {
  const {
    title,
    mediaType,
    genre,
    confidence,
    reason,
  } = recommendation;

  return (
    <div className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-500">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles
            size={18}
            className="text-red-500"
          />

          <span className="text-sm uppercase tracking-wide text-red-400">
            AI Pick
          </span>
        </div>

        <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs capitalize text-zinc-300">
          {mediaType}
        </span>
      </div>

      <h3 className="text-xl font-bold text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm text-zinc-400">
        {genre}
      </p>

      <div className="mt-6 flex items-center gap-2">
        <Star
          size={16}
          className="fill-yellow-400 text-yellow-400"
        />

        <span className="font-semibold text-white">
          {Math.round(confidence * 100)}%
        </span>

        <span className="text-zinc-500">
          Confidence
        </span>
      </div>

      <p className="mt-5 line-clamp-4 text-sm leading-6 text-zinc-400">
        {reason}
      </p>

      <button className="mt-6 flex items-center gap-2 font-medium text-red-500 transition group-hover:translate-x-1">
        View Details

        <ArrowRight size={18} />
      </button>
    </div>
  );
}

export default RecommendationCard;