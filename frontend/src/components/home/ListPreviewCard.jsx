import { Lock, Globe, ChevronRight } from "lucide-react";

function ListPreviewCard({ list }) {
  const {
    name,
    description,
    visibility,
    itemCount,
  } = list;

  return (
    <div
      className="group cursor-pointer rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-500 hover:bg-zinc-800"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          {name}
        </h3>

        {visibility === "public" ? (
          <Globe
            size={18}
            className="text-green-500"
          />
        ) : (
          <Lock
            size={18}
            className="text-zinc-500"
          />
        )}
      </div>

      <p className="mt-3 line-clamp-2 text-sm leading-6 text-zinc-400">
        {description || "No description provided."}
      </p>

      <div className="mt-6 flex items-center justify-between">
        <span className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300">
          {itemCount} Items
        </span>

        <ChevronRight
          className="text-zinc-500 transition group-hover:translate-x-1 group-hover:text-red-500"
          size={20}
        />
      </div>
    </div>
  );
}

export default ListPreviewCard;