import { Pencil, Trash2, Lock, Globe } from "lucide-react";
import ListStats from "./ListStats";

function ListHeader({
  list,
  items,
  onEdit,
  onDelete,
}) {
  return (
    <section className="rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-5 sm:p-6 lg:p-8">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

        <div className="min-w-0">

          <div className="flex items-center gap-2">

            {list.visibility === "public" ? (
              <>
                <Globe
                  size={14}
                  className="text-green-400"
                />

                <span className="text-xs text-green-400">
                  Public
                </span>
              </>
            ) : (
              <>
                <Lock
                  size={14}
                  className="text-zinc-500"
                />

                <span className="text-xs text-zinc-500">
                  Private
                </span>
              </>
            )}

          </div>

          <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            {list.name}
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
            {list.description || "No description provided."}
          </p>

          <ListStats items={items} />

        </div>

        <div className="flex gap-2 sm:gap-3">

          <button
            onClick={onEdit}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 sm:flex-none sm:px-4"
          >
            <Pencil size={15} />
            Edit
          </button>

          <button
            onClick={onDelete}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-500/60 px-3 py-2.5 text-sm text-red-400 transition hover:bg-red-500 hover:text-white sm:flex-none sm:px-4"
          >
            <Trash2 size={15} />
            Delete
          </button>

        </div>

      </div>
    </section>
  );
}

export default ListHeader;