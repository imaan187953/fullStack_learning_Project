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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            Remove From List
          </h2>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white"
          >
            <X />
          </button>
        </div>

        <p className="text-zinc-300">
          Are you sure you want to remove
        </p>

        <p className="mt-2 text-lg font-semibold text-white">
          {title}
        </p>

        <p className="mt-4 text-sm text-zinc-500">
          This only removes the item from this list.
          The movie or TV show will not be deleted.
        </p>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-lg border border-zinc-700 px-5 py-2 text-white hover:bg-zinc-800"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2 font-medium text-white hover:bg-red-700"
          >
            <Trash2 size={18} />

            {loading ? "Removing..." : "Remove"}
          </button>

        </div>
      </div>
    </div>
  );
}

export default RemoveItemModal;