function MatchProgress({ confidence }) {
  const percent = Math.round(
    (confidence || 0) * 100
  );

  return (
    <div className="mt-4 min-w-0">

      <div className="mb-2 flex items-center justify-between gap-3">

        <span className="text-[10px] uppercase tracking-wide text-zinc-500 sm:text-xs">
          AI Match
        </span>

        <span className="shrink-0 text-xs font-semibold text-white sm:text-sm">
          {percent}%
        </span>

      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-red-500 transition-all duration-700"
          style={{
            width: `${percent}%`,
          }}
        />
      </div>

    </div>
  );
}

export default MatchProgress;