import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Trash2 } from "lucide-react";

import RemoveItemModal from "./RemoveItemModal";

const IMAGE = "https://image.tmdb.org/t/p/w500";

function ListMediaCard({
  item,
  onRemove,
}) {
  const media = item.media;

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="group relative">

        {/* Remove Button */}

        <button
          onClick={() => setOpen(true)}
          className="
            absolute
            right-3
            top-3
            z-20
            rounded-full
            bg-red-600
            p-2
            text-white
            opacity-0
            transition
            duration-200
            hover:bg-red-700
            group-hover:opacity-100
          "
        >
          <Trash2 size={16} />
        </button>

        <Link
          to={
            media.mediaType === "tv"
              ? `/tv/${media.tmdbId}`
              : `/movie/${media.tmdbId}`
          }
        >
          <div className="overflow-hidden rounded-xl bg-zinc-900 transition hover:-translate-y-2 hover:shadow-xl hover:shadow-red-600/20">

            <img
              src={`${IMAGE}${media.posterPath}`}
              alt={media.title}
              className="h-80 w-full object-cover transition duration-500 group-hover:scale-110"
            />

            <div className="p-4">

              <h3 className="truncate text-lg font-semibold text-white">
                {media.title}
              </h3>

              <div className="mt-3 flex items-center justify-between">

                <span className="rounded-full bg-red-600/20 px-3 py-1 text-xs text-red-400">
                  {media.mediaType.toUpperCase()}
                </span>

                <div className="flex items-center gap-1 text-yellow-400">
                  <Star
                    size={15}
                    fill="currentColor"
                  />

                  {media.voteAverage.toFixed(1)}
                </div>

              </div>

              {item.notes && (
                <p className="mt-4 line-clamp-2 text-sm text-gray-400">
                  {item.notes}
                </p>
              )}

            </div>
          </div>
        </Link>

      </div>

      <RemoveItemModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={media.title}
        loading={false}
        onConfirm={() => {
          setOpen(false);
          onRemove(item);
        }}
      />
    </>
  );
}

export default ListMediaCard;