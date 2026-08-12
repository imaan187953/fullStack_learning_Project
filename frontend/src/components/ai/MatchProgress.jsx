function MatchProgress({ confidence }) {
  const percent = Math.round((confidence || 0) * 100);

  return (
    <div className="mt-4">

      <div className="mb-2 flex items-center justify-between">

        <span className="text-xs uppercase tracking-wide text-zinc-500">
          AI Match
        </span>

        <span className="text-sm font-semibold text-white">
          {percent}%
        </span>

      </div>

      <div className="h-2 overflow-hidden rounded-full bg-zinc-800">

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