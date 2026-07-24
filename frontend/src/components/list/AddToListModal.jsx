import { X } from "lucide-react";

function AddToListModal({
  open,
  onClose,
  media,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="w-full max-w-lg rounded-2xl bg-zinc-900 border border-zinc-800 p-6">

        {/* Header */}

        <div className="mb-6 flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-bold text-white">
              Add to List
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              {media.title || media.name}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white"
          >
            <X size={22} />
          </button>

        </div>

        {/* Placeholder */}

        <div className="rounded-xl border border-dashed border-zinc-700 p-8 text-center">

          <p className="text-zinc-400">
            Your lists will appear here.
          </p>

          <p className="mt-2 text-sm text-zinc-500">
            Backend integration coming next.
          </p>

        </div>

        {/* Footer */}

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-xl border border-zinc-700 px-5 py-2 text-zinc-300 hover:bg-zinc-800"
          >
            Cancel
          </button>

          <button
            disabled
            className="cursor-not-allowed rounded-xl bg-red-600 px-5 py-2 text-white opacity-50"
          >
            Add
          </button>

        </div>

      </div>

    </div>
  );
}

export default AddToListModal;