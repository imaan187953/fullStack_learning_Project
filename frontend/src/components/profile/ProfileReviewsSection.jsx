import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
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

        setReviews(
          (response.reviews || []).slice(0, 2)
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  return (
    <section className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-5 flex min-w-0 items-center justify-between gap-4 sm:mb-6">

        <div className="min-w-0">
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Recent Reviews
          </h2>

          <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
            Your latest thoughts
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/profile/reviews")}
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
      ) : reviews.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-700 p-6 text-center">
          <p className="text-sm text-zinc-500">
            No reviews yet.
          </p>
        </div>
      ) : (
        <div className="space-y-3">

          {reviews.map((review) => (
            <button
              key={review._id}
              type="button"
              onClick={() =>
                navigate(
                  `/${review.media.mediaType}/${review.media.tmdbId}`
                )
              }
              className="w-full min-w-0 rounded-xl bg-zinc-800/80 p-4 text-left transition hover:bg-zinc-800"
            >

              <h3 className="truncate text-sm font-semibold text-white sm:text-base">
                {review.media.title}
              </h3>

              <p className="mt-1 line-clamp-2 break-words text-xs leading-5 text-zinc-400 sm:text-sm">
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