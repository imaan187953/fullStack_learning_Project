import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import ListPreviewCard from "./ListPreviewCard";

import { getMyLists } from "../../services/list.service";

function MyListsSection() {
  const navigate = useNavigate();

  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLists = async () => {
      try {
        const response = await getMyLists();

        setLists(response.lists || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadLists();
  }, []);

  if (loading) {
    return (
      <section>
        <h2 className="text-3xl font-bold text-white">
          My Lists
        </h2>

        <p className="mt-5 text-zinc-400">
          Loading your lists...
        </p>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-bold text-white">
            My Lists
          </h2>

          <p className="mt-2 text-zinc-400">
            Organize your movies and TV shows into custom collections.
          </p>

        </div>

        <button
          onClick={() => navigate("/lists")}
          className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-medium text-white transition hover:bg-red-700"
        >
          <Plus size={18} />

          New List
        </button>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {lists.map((list) => (
          <ListPreviewCard
            key={list._id}
            list={list}
          />
        ))}

        <button
          onClick={() => navigate("/lists")}
          className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-700 bg-zinc-900 transition hover:border-red-500 hover:bg-zinc-800"
        >
          <Plus
            size={42}
            className="text-red-500"
          />

          <p className="mt-4 font-semibold text-white">
            Create New List
          </p>

          <span className="mt-2 text-sm text-zinc-400">
            Build your next collection
          </span>

        </button>

      </div>

      {lists.length === 0 && (
        <div className="mt-8 rounded-xl border border-dashed border-zinc-700 p-10 text-center">

          <p className="text-lg text-zinc-300">
            You haven't created any lists yet.
          </p>

          <p className="mt-2 text-zinc-500">
            Create your first movie or TV collection.
          </p>

        </div>
      )}

    </section>
  );
}

export default MyListsSection;