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

        const recentLists = response.lists.slice(0, 2);

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
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">
            Your Library
          </h2>

          <p className="mt-1 text-sm text-zinc-400">
            Your recently updated lists
          </p>

        </div>

        <button
          onClick={() => navigate("/lists")}
          className="flex items-center gap-1 text-red-500 transition hover:text-red-400"
        >
          View All

          <ChevronRight size={18} />
        </button>

      </div>

      {loading ? (
        <p className="text-zinc-500">
          Loading...
        </p>
      ) : lists.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-700 p-6 text-center text-zinc-500">
          No lists created yet.
        </div>
      ) : (
        <div className="space-y-3">

          {lists.map((list) => (

            <button
              key={list._id}
              onClick={() => navigate(`/lists/${list._id}`)}
              className="flex w-full items-center justify-between rounded-xl bg-zinc-800 p-4 transition hover:bg-zinc-700"
            >

              <div className="text-left">

                <h3 className="font-semibold text-white">
                  {list.name}
                </h3>

                <p className="text-sm text-zinc-400">
                  {list.itemCount} items
                </p>

              </div>

              <ChevronRight
                size={18}
                className="text-zinc-500"
              />

            </button>

          ))}

        </div>
      )}

    </section>
  );
}

export default ProfileListsSection;