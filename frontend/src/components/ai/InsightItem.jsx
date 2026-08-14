import { ChevronRight } from "lucide-react";

function InsightItem({
  icon: Icon,
  title,
  value,
}) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-4 sm:gap-4 sm:px-5 sm:py-4">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-800 sm:h-10 sm:w-10">
        <Icon
          size={17}
          className="text-red-500"
        />
      </div>

      <div className="min-w-0 flex-1">

        <p className="text-xs text-zinc-500">
          {title}
        </p>

        <p className="mt-1 break-words text-sm font-semibold leading-5 text-white sm:text-base">
          {value}
        </p>

      </div>

      <ChevronRight
        size={16}
        className="shrink-0 text-zinc-700"
      />

    </div>
  );
}

export default InsightItem;