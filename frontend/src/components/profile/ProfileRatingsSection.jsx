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
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Recent Ratings
          </h2>

          <p className="mt-1 text-zinc-400">
            Your latest ratings.
          </p>
        </div>

        <Link
          to="/profile/ratings"
          className="rounded-full bg-zinc-800 p-2 transition hover:bg-red-600"
        >
          <ChevronRight className="text-white" size={22} />
        </Link>
      </div>

      {loading ? (
        <p className="text-zinc-400">
          Loading...
        </p>
      ) : ratings.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-700 py-8 text-center">
          <p className="text-zinc-400">
            No ratings yet.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {ratings.slice(0, 2).map((rating) => (
            <div
              key={rating._id}
              className="flex items-center justify-between rounded-xl bg-zinc-800 p-4 transition hover:bg-zinc-700"
            >
              <div>
                <h3 className="font-semibold text-white">
                  {rating.media?.title}
                </h3>

                <p className="mt-1 text-sm text-zinc-400">
                  {rating.media?.mediaType?.toUpperCase()}
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-white">
                <Star size={16} fill="white" />
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