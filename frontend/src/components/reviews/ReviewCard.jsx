import { Pencil, Trash2 } from "lucide-react";

import { useAuth } from "../../contexts/AuthContext";

function ReviewCard({
  review,
  onEdit,
  onDelete,
}) {
  const { user } = useAuth();

  const isOwner =
    user?._id === review?.user?._id;

  const username =
    review?.user?.username || "CineTrack User";

  const formattedDate = review?.createdAt
    ? new Date(
        review.createdAt
      ).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <article className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-5 transition-colors duration-200 hover:border-zinc-700 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        {/* User */}
        <div className="flex min-w-0 items-center gap-3">
          {/* Avatar */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600/15 text-sm font-bold uppercase text-red-500">
            {username.charAt(0)}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-white sm:text-base">
              {username}
            </h3>

            {formattedDate && (
              <p className="mt-0.5 text-xs text-zinc-500">
                {formattedDate}
              </p>
            )}
          </div>
        </div>

        {/* Owner Actions */}
        {isOwner && (
          <div className="flex flex-wrap gap-2 sm:shrink-0">
            <button
              type="button"
              onClick={() => onEdit(review)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-2 text-xs font-medium text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-800 hover:text-white sm:text-sm"
            >
              <Pencil size={15} />
              Edit
            </button>

            <button
              type="button"
              onClick={() =>
                onDelete(review._id)
              }
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-900/50 bg-red-600/10 px-3 py-2 text-xs font-medium text-red-400 transition hover:bg-red-600 hover:text-white sm:text-sm"
            >
              <Trash2 size={15} />
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Review */}
      <div className="mt-5 border-t border-zinc-800 pt-5">
        <p className="whitespace-pre-wrap break-words text-sm leading-7 text-zinc-300 sm:text-base">
          {review?.review}
        </p>
      </div>
    </article>
  );
}

export default ReviewCard;