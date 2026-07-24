import { Lock, Globe, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

function ListCard({ list }) {
  return (
    <Link
      to={`/lists/${list._id}`}
      className="block rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-red-500 hover:bg-zinc-800"
    >
      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-semibold text-white">
            {list.name}
          </h2>

          <p className="mt-2 text-gray-400">
            {list.description || "No description"}
          </p>

          <div className="mt-4 flex items-center gap-5 text-sm text-gray-400">

            <div className="flex items-center gap-2">
              {list.visibility === "private" ? (
                <Lock size={16} />
              ) : (
                <Globe size={16} />
              )}

              {list.visibility}
            </div>

          </div>

        </div>

        <ChevronRight
          size={28}
          className="text-gray-500"
        />

      </div>
    </Link>
  );
}

export default ListCard;