import { useEffect, useState } from "react";
import { X, Check } from "lucide-react";

import {
  getMyLists,
  addItemToList,
} from "../../services/list.service";

function AddToListModal({
  isOpen,
  onClose,
  tmdbId,
  mediaType,
}) {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const fetchLists = async () => {
      try {
        setLoading(true);

        const response = await getMyLists();

        setLists(response.lists || []);
      } catch (err) {
        setError("Unable to load your lists.");
      } finally {
        setLoading(false);
      }
    };

    fetchLists();
  }, [isOpen]);

  const handleAdd = async (listId) => {
    try {
      setAdding(listId);

      await addItemToList(listId, {
        tmdbId,
        mediaType,
      });

      alert("Added successfully!");

      onClose();
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to add item."
      );
    } finally {
      setAdding(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-zinc-900 p-6 shadow-2xl">

        {/* Header */}

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            Add To List
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 transition hover:text-white"
          >
            <X />
          </button>
        </div>

        {/* Loading */}

        {loading && (
          <p className="text-gray-400">
            Loading lists...
          </p>
        )}

        {/* Error */}

        {error && (
          <p className="text-red-500">{error}</p>
        )}

        {/* Empty */}

        {!loading &&
          lists.length === 0 && (
            <p className="text-gray-400">
              You don't have any lists yet.
            </p>
          )}

        {/* Lists */}

        <div className="space-y-3">

          {lists.map((list) => (
            <div
              key={list._id}
              className="flex items-center justify-between rounded-xl bg-zinc-800 p-4"
            >
              <div>
                <h3 className="font-semibold text-white">
                  {list.name}
                </h3>

                <p className="text-sm text-gray-400">
                  {list.description ||
                    "No description"}
                </p>
              </div>

              <button
                onClick={() =>
                  handleAdd(list._id)
                }
                disabled={
                  adding === list._id
                }
                className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
              >
                {adding === list._id ? (
                  "Adding..."
                ) : (
                  <Check size={18} />
                )}
              </button>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default AddToListModal;