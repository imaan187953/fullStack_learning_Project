import { useEffect, useState } from "react";

import {
  getMyLists,
} from "../../services/list.service";

import ListCard from "../../components/list/ListCard";

function ListsPage() {
  const [lists, setLists] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchLists = async () => {
      try {
        setLoading(true);

        const response =
          await getMyLists();

        setLists(response.lists);

      } catch (error) {

        setError(
          "Unable to load your lists."
        );

      } finally {

        setLoading(false);

      }
    };

    fetchLists();
  }, []);

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        Loading lists...
      </div>
    );

  if (error)
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-red-500">
        {error}
      </div>
    );

  return (
    <main className="min-h-screen bg-zinc-950">

      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="mb-10 flex items-center justify-between">

          <h1 className="text-5xl font-bold text-white">
            My Lists
          </h1>

          <button className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700">
            + Create List
          </button>

        </div>

        {lists.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-700 py-20 text-center">

            <h2 className="text-2xl font-semibold text-white">
              No Lists Yet
            </h2>

            <p className="mt-3 text-gray-400">
              Create your first list to start organizing your movies and TV shows.
            </p>

          </div>
        ) : (
          <div className="space-y-6">
            {lists.map((list) => (
              <ListCard
                key={list._id}
                list={list}
              />
            ))}
          </div>
        )}

      </div>

    </main>
  );
}

export default ListsPage;