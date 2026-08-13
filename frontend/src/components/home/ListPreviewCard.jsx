import { useEffect, useState } from "react";
import {
  Lock,
  Globe,
  ChevronRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { getListItems } from "../../services/list.service";

function ListPreviewCard({ list }) {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const response = await getListItems(list._id);

        setItems(response.items || []);
      } catch (error) {
        console.error(
          `Failed to load items for ${list.name}:`,
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, [list._id, list.name]);

  return (
    <div
      onClick={() => navigate(`/lists/${list._id}`)}
      className="group cursor-pointer rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-red-500 hover:bg-zinc-800 sm:rounded-2xl sm:p-5 lg:p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <h3 className="truncate text-base font-semibold text-white sm:text-lg">
          {list.name}
        </h3>

        {list.visibility === "public" ? (
          <Globe
            size={16}
            className="shrink-0 text-green-500 sm:h-[18px] sm:w-[18px]"
          />
        ) : (
          <Lock
            size={16}
            className="shrink-0 text-zinc-500 sm:h-[18px] sm:w-[18px]"
          />
        )}
      </div>

      {/* Description */}
      <p className="mt-2 line-clamp-2 text-xs leading-5 text-zinc-400 sm:mt-3 sm:text-sm sm:leading-6">
        {list.description || "No description provided."}
      </p>

      {/* Movie Preview */}
      <div className="mt-4 sm:mt-5">
        {loading ? (
          <div className="flex gap-1.5 sm:gap-2">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-20 w-14 animate-pulse rounded-md bg-zinc-800 sm:h-28 sm:w-20 sm:rounded-lg"
              />
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="flex gap-1.5 overflow-hidden sm:gap-2">
            {items.slice(0, 4).map((item) => (
              <img
                key={item._id}
                src={
                  item.media?.posterPath
                    ? `https://image.tmdb.org/t/p/w200${item.media.posterPath}`
                    : "https://placehold.co/100x150?text=No+Poster"
                }
                alt={item.media?.title || "Movie"}
                className="h-20 w-14 rounded-md object-cover transition-transform duration-300 group-hover:scale-105 sm:h-28 sm:w-20 sm:rounded-lg"
              />
            ))}
          </div>
        ) : (
          <div className="flex h-20 items-center justify-center rounded-md bg-zinc-800 sm:h-28 sm:rounded-lg">
            <p className="text-xs text-zinc-500 sm:text-sm">
              No items yet
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between sm:mt-5 lg:mt-6">
        <span className="rounded-full bg-zinc-800 px-2.5 py-1 text-[11px] text-zinc-300 sm:px-3 sm:text-sm">
          {items.length} Items
        </span>

        <ChevronRight
          size={18}
          className="text-zinc-500 transition group-hover:translate-x-1 group-hover:text-red-500 sm:h-5 sm:w-5"
        />
      </div>
    </div>
  );
}

export default ListPreviewCard;
