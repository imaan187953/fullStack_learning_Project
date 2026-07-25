import { useEffect, useState } from "react";
import { X } from "lucide-react";

function EditListModal({
  isOpen,
  onClose,
  list,
  onSave,
  loading,
}) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    visibility: "private",
  });

  useEffect(() => {
    if (list) {
      setForm({
        name: list.name,
        description: list.description || "",
        visibility: list.visibility,
      });
    }
  }, [list]);

  if (!isOpen || !list) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="w-full max-w-lg rounded-2xl bg-zinc-900 p-6 shadow-2xl">

        {/* Header */}

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold text-white">
            Edit List
          </h2>

          <button
            onClick={onClose}
            className="text-zinc-400 transition hover:text-white"
          >
            <X />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Name */}

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              List Name
            </label>

            <input
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white outline-none focus:border-red-500"
            />
          </div>

          {/* Description */}

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Description
            </label>

            <textarea
              rows={4}
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white outline-none focus:border-red-500"
            />
          </div>

          {/* Visibility */}

          <div>
            <label className="mb-3 block text-sm text-zinc-300">
              Visibility
            </label>

            <div className="flex gap-6">

              <label className="flex items-center gap-2 text-white">
                <input
                  type="radio"
                  value="private"
                  checked={form.visibility === "private"}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      visibility: e.target.value,
                    })
                  }
                />

                Private
              </label>

              <label className="flex items-center gap-2 text-white">
                <input
                  type="radio"
                  value="public"
                  checked={form.visibility === "public"}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      visibility: e.target.value,
                    })
                  }
                />

                Public
              </label>

            </div>
          </div>

          {/* Footer */}

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-zinc-700 px-5 py-2 text-white transition hover:bg-zinc-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-red-600 px-5 py-2 font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditListModal;