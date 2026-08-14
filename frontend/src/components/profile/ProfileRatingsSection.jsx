import { useEffect, useState } from "react";
import { ChevronRight, Star } from "lucide-react";
import { Link } from "react-router-dom";

import { getMyRatings } from "../../services/rating.service";

function ProfileRatingsSection() {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRatings = async () => {
      try {
        const response = await getMyRatings();

        setRatings(response.ratings || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadRatings();
  }, []);

  return (
    <section className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between gap-4 sm:mb-6">

        <div className="min-w-0">
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Recent Ratings
          </h2>

          <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
            Your latest ratings
          </p>
        </div>

        <Link
          to="/profile/ratings"
          className="shrink-0 rounded-full bg-zinc-800 p-2 transition hover:bg-red-600"
          aria-label="View all ratings"
        >
          <ChevronRight
            className="text-white"
            size={18}
          />
        </Link>

      </div>

      {loading ? (
        <div className="h-20 animate-pulse rounded-xl bg-zinc-950/70" />
      ) : ratings.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-700 px-4 py-8 text-center">
          <p className="text-sm text-zinc-500">
            No ratings yet.
          </p>
        </div>
      ) : (
        <div className="space-y-3">

          {ratings.slice(0, 2).map((rating) => (
            <div
              key={rating._id}
              className="flex min-w-0 items-center justify-between gap-4 rounded-xl bg-zinc-950/70 p-4 transition hover:bg-zinc-800"
            >

              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold text-white sm:text-base">
                  {rating.media?.title || "Untitled"}
                </h3>

                <p className="mt-1 text-xs uppercase tracking-wide text-zinc-600">
                  {rating.media?.mediaType || "media"}
                </p>
              </div>

              <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-red-600 px-3 py-1.5 text-xs font-semibold text-white sm:px-4 sm:py-2 sm:text-sm">
                <Star
                  size={14}
                  fill="white"
                />
                {rating.rating}/10
              </div>

            </div>
          ))}

        </div>
      )}

    </section>
  );
}

export default ProfileRatingsSection;