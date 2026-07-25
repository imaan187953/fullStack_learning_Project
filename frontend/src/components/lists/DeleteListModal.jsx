import { Trash2, X } from "lucide-react";

function DeleteListModal({
  isOpen,
  onClose,
  onConfirm,
  loading,
  listName,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-2xl bg-zinc-900 p-6">

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold text-white">
            Delete List
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X />
          </button>

        </div>

        <div className="mt-6 flex justify-center">
          <div className="rounded-full bg-red-600/20 p-5">
            <Trash2
              size={42}
              className="text-red-500"
            />
          </div>
        </div>

        <p className="mt-6 text-center text-gray-300">
          Are you sure you want to delete
        </p>

        <p className="mt-2 text-center text-xl font-semibold text-white">
          {listName}
        </p>

        <p className="mt-4 text-center text-sm text-gray-500">
          This action cannot be undone.
        </p>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border border-zinc-700 px-5 py-2 text-white"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700"
          >
            {loading ? "Deleting..." : "Delete List"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteListModal;