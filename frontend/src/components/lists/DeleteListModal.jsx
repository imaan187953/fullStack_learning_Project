import { X, Trash2 } from "lucide-react";

function DeleteListModal({
  isOpen,
  onClose,
  onConfirm,
  loading,
  listName,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/70
        px-4
        backdrop-blur-sm
      "
    >
      <div
        className="
          w-full
          max-w-md
          rounded-2xl
          border
          border-zinc-800
          bg-zinc-900
          p-5
          shadow-2xl
          sm:p-6
        "
      >
        {/* Header */}

        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white sm:text-xl">
            Delete List
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              rounded-full
              p-1.5
              text-zinc-400
              transition
              hover:bg-zinc-800
              hover:text-white
              disabled:opacity-50
            "
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Warning */}

        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
          <div className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-500/10">
              <Trash2
                size={18}
                className="text-red-500"
              />
            </div>

            <div>
              <p className="text-sm font-medium text-white">
                Delete "{listName}"?
              </p>

              <p className="mt-1 text-xs leading-5 text-zinc-400 sm:text-sm">
                This action cannot be undone. The list and
                its organization will be permanently removed.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}

        <div className="mt-6 flex gap-2 sm:justify-end sm:gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              flex-1
              rounded-lg
              border
              border-zinc-700
              px-4
              py-2.5
              text-sm
              text-white
              transition
              hover:bg-zinc-800
              disabled:opacity-50
              sm:flex-none
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="
              flex
              flex-1
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-red-600
              px-4
              py-2.5
              text-sm
              font-medium
              text-white
              transition
              hover:bg-red-700
              disabled:cursor-not-allowed
              disabled:opacity-60
              sm:flex-none
            "
          >
            <Trash2 size={16} />

            {loading ? "Deleting..." : "Delete List"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteListModal;