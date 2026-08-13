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
        py-6
        backdrop-blur-sm
      "
    >
      <div
        className="
          max-h-[90vh]
          w-full
          max-w-lg
          overflow-y-auto
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

        <div className="mb-5 flex items-center justify-between sm:mb-6">
          <h2 className="text-lg font-bold text-white sm:text-xl">
            Edit List
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
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 sm:space-y-5"
        >
          {/* Name */}

          <div>
            <label className="mb-2 block text-xs text-zinc-300 sm:text-sm">
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
              className="
                w-full
                rounded-lg
                border
                border-zinc-700
                bg-zinc-800
                px-3
                py-2.5
                text-sm
                text-white
                outline-none
                transition
                focus:border-red-500
              "
            />
          </div>

          {/* Description */}

          <div>
            <label className="mb-2 block text-xs text-zinc-300 sm:text-sm">
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
              className="
                w-full
                resize-none
                rounded-lg
                border
                border-zinc-700
                bg-zinc-800
                px-3
                py-2.5
                text-sm
                text-white
                outline-none
                transition
                focus:border-red-500
              "
            />
          </div>

          {/* Visibility */}

          <div>
            <label className="mb-3 block text-xs text-zinc-300 sm:text-sm">
              Visibility
            </label>

            <div className="flex gap-5">
              <label className="flex items-center gap-2 text-sm text-white">
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

              <label className="flex items-center gap-2 text-sm text-white">
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

          <div className="flex gap-2 pt-2 sm:justify-end sm:gap-3">
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
              type="submit"
              disabled={loading}
              className="
                flex-1
                rounded-lg
                bg-red-600
                px-4
                py-2.5
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-red-700
                disabled:opacity-60
                sm:flex-none
              "
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