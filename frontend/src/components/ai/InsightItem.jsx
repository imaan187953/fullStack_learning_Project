import { ChevronRight } from "lucide-react";

function InsightItem({
  icon: Icon,
  title,
  value,
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4">

      <div className="flex items-center gap-4">

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800">

          <Icon
            size={18}
            className="text-red-500"
          />

        </div>

        <div>

          <p className="text-sm text-zinc-500">
            {title}
          </p>

          <p className="font-semibold text-white">
            {value}
          </p>

        </div>

      </div>

      <ChevronRight
        size={18}
        className="text-zinc-700"
      />

    </div>
  );
}

export default InsightItem;