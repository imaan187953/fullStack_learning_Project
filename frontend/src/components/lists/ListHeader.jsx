import { Pencil, Trash2, Lock, Globe } from "lucide-react";
import ListStats from "./ListStats";

function ListHeader({
  list,
  items,
  onEdit,
  onDelete,
}) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
      <div className="flex flex-col justify-between gap-6 lg:flex-row">
        <div>
          <h1 className="text-4xl font-bold text-white">
            {list.name}
          </h1>

          <p className="mt-3 max-w-3xl text-zinc-400">
            {list.description ||
              "No description provided."}
          </p>

          <div className="mt-4 flex items-center gap-2 text-sm text-zinc-500">
            {list.visibility === "public" ? (
              <>
                <Globe size={16} />
                Public List
              </>
            ) : (
              <>
                <Lock size={16} />
                Private List
              </>
            )}
          </div>

          <ListStats items={items} />
        </div>

        <div className="flex gap-4">
          <button
            onClick={onEdit}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-white transition hover:bg-red-700"
          >
            <Pencil size={18} />
            Edit
          </button>

          <button
            onClick={onDelete}
            className="flex items-center gap-2 rounded-lg border border-red-500 px-5 py-3 text-red-400 transition hover:bg-red-500 hover:text-white"
          >
            <Trash2 size={18} />
            Delete
          </button>
        </div>
      </div>
    </section>
  );
}

export default ListHeader;