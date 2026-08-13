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
        <h2 className="text-xl font-bold text-white sm:text-2xl lg:text-3xl">
          My Lists
        </h2>

        <p className="mt-2 text-sm text-zinc-400 sm:mt-3">
          Loading your lists...
        </p>
      </section>
    );
  }

  return (
    <section>
      {/* Section Header */}
      <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between lg:mb-8">

        <div>
          <h2 className="text-xl font-bold text-white sm:text-2xl lg:text-3xl">
            My Lists
          </h2>

          <p className="mt-1 text-sm text-zinc-400 sm:mt-2 sm:text-base">
            Organize your movies and TV shows into custom collections.
          </p>
        </div>

        <button
          onClick={() => navigate("/lists")}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 sm:w-auto"
        >
          <Plus size={17} />
          New List
        </button>

      </div>

      {/* Lists */}
      <div className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-4 lg:gap-5">

        {lists.map((list) => (
          <ListPreviewCard
            key={list._id}
            list={list}
          />
        ))}

        {/* Create List Card */}
        <button
          onClick={() => navigate("/lists")}
          className="flex min-h-[170px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-700 bg-zinc-900 p-4 transition hover:border-red-500 hover:bg-zinc-800 sm:min-h-[200px] sm:rounded-2xl lg:min-h-[220px]"
        >
          <Plus
            size={32}
            className="text-red-500 sm:h-9 sm:w-9"
          />

          <p className="mt-3 text-sm font-semibold text-white sm:mt-4 sm:text-base">
            Create New List
          </p>

          <span className="mt-1 text-xs text-zinc-400 sm:mt-2 sm:text-sm">
            Build your next collection
          </span>
        </button>

      </div>

      {/* Empty State */}
      {lists.length === 0 && (
        <div className="mt-5 rounded-lg border border-dashed border-zinc-700 p-6 text-center sm:mt-6 sm:rounded-xl sm:p-8 lg:p-10">
          <p className="text-sm text-zinc-300 sm:text-base lg:text-lg">
            You haven't created any lists yet.
          </p>

          <p className="mt-1 text-xs text-zinc-500 sm:mt-2 sm:text-sm">
            Create your first movie or TV collection.
          </p>
        </div>
      )}

    </section>
  );
}

export default MyListsSection;
