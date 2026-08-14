import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getMyLists,
  getListItems,
} from "../../services/list.service";

function ProfileListsSection() {
  const navigate = useNavigate();

  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLists = async () => {
      try {
        const response = await getMyLists();

        const recentLists = (response.lists || []).slice(0, 2);

        const data = await Promise.all(
          recentLists.map(async (list) => {
            try {
              const items = await getListItems(list._id);

              return {
                ...list,
                itemCount: items.items.length,
              };
            } catch {
              return {
                ...list,
                itemCount: 0,
              };
            }
          })
        );

        setLists(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadLists();
  }, []);

  return (
    <section className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-5 flex min-w-0 items-center justify-between gap-4 sm:mb-6">

        <div className="min-w-0">
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Your Library
          </h2>

          <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
            Your recently updated lists
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/lists")}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-red-500 transition hover:text-red-400"
        >
          <span>View All</span>
          <ChevronRight size={17} />
        </button>

      </div>

      {/* Content */}
      {loading ? (
        <div className="rounded-xl bg-zinc-950/50 p-5">
          <p className="text-sm text-zinc-500">
            Loading...
          </p>
        </div>
      ) : lists.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-700 p-6 text-center">
          <p className="text-sm text-zinc-500">
            No lists created yet.
          </p>
        </div>
      ) : (
        <div className="space-y-3">

          {lists.map((list) => (
            <button
              key={list._id}
              type="button"
              onClick={() => navigate(`/lists/${list._id}`)}
              className="flex w-full min-w-0 items-center justify-between gap-4 rounded-xl bg-zinc-800/80 p-4 text-left transition hover:bg-zinc-800"
            >

              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold text-white sm:text-base">
                  {list.name}
                </h3>

                <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
                  {list.itemCount}{" "}
                  {list.itemCount === 1 ? "item" : "items"}
                </p>
              </div>

              <ChevronRight
                size={18}
                className="shrink-0 text-zinc-500"
              />

            </button>
          ))}

        </div>
      )}

    </section>
  );
}

export default ProfileListsSection;