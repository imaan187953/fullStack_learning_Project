import { useEffect, useState } from "react";
import { Plus, Lock, Globe, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import {
  getMyLists,
  createList,
} from "../../services/list.service";

function ListsPage() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    visibility: "private",
  });

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    try {
      const response = await getMyLists();
      setLists(response.lists || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await createList(form);

      setForm({
        name: "",
        description: "",
        visibility: "private",
      });

      setShowModal(false);
      fetchLists();
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-sm text-white">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-6 text-white sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between gap-4 sm:mb-10">

          <div>
            <div className="flex items-center gap-2">
              <Sparkles
                size={18}
                className="text-red-500"
              />

              <span className="text-xs font-medium uppercase tracking-wider text-red-500 sm:text-sm">
                Your Collection
              </span>
            </div>

            <h1 className="mt-1.5 text-2xl font-bold sm:text-3xl lg:text-4xl">
              My Lists
            </h1>

            <p className="mt-1.5 max-w-xl text-xs text-zinc-400 sm:text-sm">
              Organize your favorite movies and TV shows.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex shrink-0 items-center gap-1.5 rounded-lg bg-red-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-red-700 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
          >
            <Plus size={16} />
            <span>New List</span>
          </button>
        </div>

        {/* Empty State */}
        {lists.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 px-5 py-14 text-center sm:py-20">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-600/10">
              <Plus
                size={24}
                className="text-red-500"
              />
            </div>

            <h2 className="mt-4 text-xl font-semibold sm:text-2xl">
              No Lists Yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-zinc-400">
              Create your first collection and start organizing
              the movies and shows you love.
            </p>

            <button
              onClick={() => setShowModal(true)}
              className="mt-5 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium transition hover:bg-red-700"
            >
              Create Your First List
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">

            {lists.map((list) => (
              <Link
                key={list._id}
                to={`/lists/${list._id}`}
                className="group rounded-xl border border-zinc-800 bg-zinc-900/80 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/60 hover:bg-zinc-900 hover:shadow-lg hover:shadow-red-900/10 sm:p-5"
              >
                {/* Top */}
                <div className="flex items-start justify-between gap-3">

                  <h2 className="min-w-0 truncate text-base font-semibold text-white sm:text-lg">
                    {list.name}
                  </h2>

                  <div
                    className={`flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[10px] font-medium sm:text-xs ${
                      list.visibility === "private"
                        ? "bg-zinc-800 text-zinc-400"
                        : "bg-green-500/10 text-green-400"
                    }`}
                  >
                    {list.visibility === "private" ? (
                      <Lock size={12} />
                    ) : (
                      <Globe size={12} />
                    )}

                    <span className="hidden sm:inline">
                      {list.visibility === "private"
                        ? "Private"
                        : "Public"}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-3 line-clamp-2 text-xs leading-5 text-zinc-400 sm:text-sm">
                  {list.description || "No description provided."}
                </p>

                {/* Bottom */}
                <div className="mt-5 flex items-center justify-between border-t border-zinc-800 pt-3">

                  <span className="text-[11px] text-zinc-500 sm:text-xs">
                    Created{" "}
                    {new Date(list.createdAt).toLocaleDateString()}
                  </span>

                  <span className="text-xs font-medium text-red-500 opacity-0 transition group-hover:opacity-100">
                    View →
                  </span>

                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Create Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm">

            <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-5 shadow-2xl sm:p-6">

              <div className="mb-5">
                <h2 className="text-xl font-bold sm:text-2xl">
                  Create List
                </h2>

                <p className="mt-1 text-xs text-zinc-400 sm:text-sm">
                  Create a collection for your favorite media.
                </p>
              </div>

              <form
                onSubmit={handleCreate}
                className="space-y-4"
              >

                <input
                  type="text"
                  placeholder="List Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-red-500"
                  required
                />

                <textarea
                  rows="3"
                  placeholder="Description (optional)"
                  value={form.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: e.target.value,
                    })
                  }
                  className="w-full resize-none rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-red-500"
                />

                <select
                  value={form.visibility}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      visibility: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-white outline-none focus:border-red-500"
                >
                  <option value="private">
                    Private
                  </option>

                  <option value="public">
                    Public
                  </option>
                </select>

                <div className="flex justify-end gap-2 pt-2">

                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                  >
                    Create
                  </button>

                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default ListsPage;