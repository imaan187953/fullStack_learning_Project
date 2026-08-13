import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Trash2 } from "lucide-react";

import RemoveItemModal from "./RemoveItemModal";

const IMAGE = "https://image.tmdb.org/t/p/w500";

function ListMediaCard({ item, onRemove }) {
  const media = item.media;

  const [open, setOpen] = useState(false);

  const handleRemove = (e) => {
    // Prevent the poster Link from being triggered
    e.preventDefault();
    e.stopPropagation();

    setOpen(true);
  };

  return (
    <>
      <div className="group relative">

        {/* Remove Button */}
        <button
          type="button"
          onClick={handleRemove}
          aria-label={`Remove ${media.title} from list`}
          className="
            absolute
            right-2
            top-2
            z-20
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            bg-red-600
            text-white
            shadow-lg
            transition
            hover:bg-red-700
            sm:right-3
            sm:top-3
            sm:h-9
            sm:w-9
            lg:opacity-0
            lg:group-hover:opacity-100
          "
        >
          <Trash2
            size={15}
            className="sm:h-4 sm:w-4"
          />
        </button>

        <Link
          to={
            media.mediaType === "tv"
              ? `/tv/${media.tmdbId}`
              : `/movie/${media.tmdbId}`
          }
        >
          <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/60 hover:shadow-lg hover:shadow-red-600/10 sm:rounded-xl lg:hover:-translate-y-2">

            {/* Poster */}
            <div className="aspect-2/3 overflow-hidden bg-zinc-800">
              <img
                src={`${IMAGE}${media.posterPath}`}
                alt={media.title}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 lg:group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="p-2.5 sm:p-3 lg:p-4">

              <h3 className="truncate text-sm font-semibold text-white sm:text-base">
                {media.title}
              </h3>

              <div className="mt-2 flex items-center justify-between gap-2">

                <span className="rounded-full bg-red-600/15 px-2 py-1 text-[9px] font-medium text-red-400 sm:px-2.5 sm:text-[10px]">
                  {media.mediaType.toUpperCase()}
                </span>

                <div className="flex items-center gap-1 text-yellow-400">
                  <Star
                    size={13}
                    fill="currentColor"
                  />

                  <span className="text-xs">
                    {media.voteAverage?.toFixed(1) || "N/A"}
                  </span>
                </div>

              </div>

              {item.notes && (
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-zinc-400">
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