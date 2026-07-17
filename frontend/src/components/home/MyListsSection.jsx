import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import ListPreviewCard from "./ListPreviewCard";

function MyListsSection() {
  const navigate = useNavigate();

  const demoLists = [
    {
      _id: "1",
      name: "Watchlist",
      description: "Movies and TV shows I plan to watch soon.",
      visibility: "private",
      itemCount: 18,
    },
    {
      _id: "2",
      name: "Favorites",
      description: "My all-time favorite movies.",
      visibility: "public",
      itemCount: 42,
    },
    {
      _id: "3",
      name: "Sci-Fi Collection",
      description: "Best science fiction adventures.",
      visibility: "private",
      itemCount: 11,
    },
  ];

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
        {demoLists.map((list) => (
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
    </section>
  );
}

export default MyListsSection;