import { useState } from "react";
import { X } from "lucide-react";

import { createList } from "../../services/list.service";

function CreateListModal({
  isOpen,
  onClose,
  onCreated,
}) {
  const [name, setName] = useState("");

  const [description, setDescription] =
    useState("");

  const [visibility, setVisibility] =
    useState("private");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("List name is required.");
      return;
    }

    try {
      setLoading(true);

      const response =
        await createList({
          name,
          description,
          visibility,
        });

      onCreated(response.list);

      setName("");
      setDescription("");
      setVisibility("private");
      setError("");

      onClose();

    } catch (err) {

      setError(
        err.response?.data?.message ||
          "Unable to create list."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="w-full max-w-lg rounded-2xl bg-zinc-900 p-6">

        {/* Header */}

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold text-white">
            Create New List
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block text-gray-300">
              List Name
            </label>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-gray-300">
              Description
            </label>

            <textarea
              rows="4"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 text-white outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="mb-3 block text-gray-300">
              Visibility
            </label>

            <div className="flex gap-6">

              <label className="flex items-center gap-2 text-white">
                <input
                  type="radio"
                  value="private"
                  checked={
                    visibility === "private"
                  }
                  onChange={(e) =>
                    setVisibility(
                      e.target.value
                    )
                  }
                />

                Private
              </label>

              <label className="flex items-center gap-2 text-white">
                <input
                  type="radio"
                  value="public"
                  checked={
                    visibility === "public"
                  }
                  onChange={(e) =>
                    setVisibility(
                      e.target.value
                    )
                  }
                />

                Public
              </label>

            </div>
          </div>

          {error && (
            <p className="text-red-500">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-4">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-zinc-700 px-5 py-2 text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700"
            >
              {loading
                ? "Creating..."
                : "Create List"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CreateListModal;