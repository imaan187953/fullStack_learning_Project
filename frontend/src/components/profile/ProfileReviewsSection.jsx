import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getMyReviews } from "../../services/review.service";

function ProfileReviewsSection() {
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const response = await getMyReviews();

        setReviews((response.reviews || []).slice(0, 2));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold text-white">
            Recent Reviews
          </h2>

          <p className="mt-1 text-sm text-zinc-400">
            Your latest thoughts
          </p>
        </div>

        <button
          onClick={() => navigate("/profile/reviews")}
          className="flex items-center gap-1 text-red-500 hover:text-red-400"
        >
          View All

          <ChevronRight size={18} />
        </button>

      </div>

      {loading ? (
        <p className="text-zinc-500">
          Loading...
        </p>
      ) : reviews.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-700 p-6 text-center text-zinc-500">
          No reviews yet.
        </div>
      ) : (
        <div className="space-y-3">

          {reviews.map((review) => (

            <button
              key={review._id}
              onClick={() =>
                navigate(`/movie/${review.media.tmdbId}`)
              }
              className="w-full rounded-xl bg-zinc-800 p-4 text-left transition hover:bg-zinc-700"
            >

              <h3 className="font-semibold text-white">
                {review.media.title}
              </h3>

              <p className="mt-1 line-clamp-2 text-sm text-zinc-400">
                {review.review}
              </p>

            </button>

          ))}

        </div>
      )}

    </section>
  );
}

export default ProfileReviewsSection;