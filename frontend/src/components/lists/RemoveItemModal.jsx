import { X, Trash2 } from "lucide-react";

function RemoveItemModal({
  isOpen,
  onClose,
  onConfirm,
  loading,
  title,
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
            Remove From List
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-full
              p-1.5
              text-zinc-400
              transition
              hover:bg-zinc-800
              hover:text-white
            "
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Message */}

        <p className="text-sm text-zinc-300">
          Are you sure you want to remove
        </p>

        <p className="mt-2 truncate text-base font-semibold text-white sm:text-lg">
          {title}
        </p>

        <p className="mt-4 text-xs leading-5 text-zinc-500 sm:text-sm">
          This only removes the item from this list.
          The movie or TV show will not be deleted.
        </p>

        {/* Actions */}

        <div className="mt-7 flex gap-2 sm:justify-end sm:gap-3">
          <button
            type="button"
            onClick={onClose}
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

            {loading ? "Removing..." : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RemoveItemModal;