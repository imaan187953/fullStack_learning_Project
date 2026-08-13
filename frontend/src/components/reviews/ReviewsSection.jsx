import { useCallback, useEffect, useState } from "react";

import ReviewCard from "./ReviewCard";
import WriteReviewModal from "./WriteReviewModal";
import EditReviewModal from "./EditReviewModal";

import {
  getReviews,
  deleteReview,
} from "../../services/review.service";

function ReviewsSection({
  mediaId,
  showModal,
  onCloseModal,
}) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editModal, setEditModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const loadReviews = useCallback(async () => {
    if (!mediaId) return;

    try {
      setLoading(true);
      setError("");

      const response = await getReviews(mediaId);

      setReviews(response?.reviews || []);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to load reviews."
      );
    } finally {
      setLoading(false);
    }
  }, [mediaId]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const handleDelete = async (reviewId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmed) return;

    try {
      await deleteReview(reviewId);

      setReviews((currentReviews) =>
        currentReviews.filter(
          (review) => review._id !== reviewId
        )
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to delete review."
      );
    }
  };

  const handleEdit = (review) => {
    setSelectedReview(review);
    setEditModal(true);
  };

  const closeEditModal = () => {
    setEditModal(false);
    setSelectedReview(null);
  };

  return (
    <>
      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Community Reviews
            </h2>

            <p className="mt-1 text-sm text-zinc-500 sm:text-base">
              See what the CineTrack community thinks.
            </p>
          </div>

          {reviews.length > 0 && (
            <span className="w-fit rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1 text-xs font-medium text-zinc-400">
              {reviews.length}{" "}
              {reviews.length === 1 ? "review" : "reviews"}
            </span>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-40 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950/50">
            <div className="flex items-center gap-3 text-sm text-zinc-400">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-700 border-t-red-500" />
              Loading reviews...
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-xl border border-red-900/50 bg-red-950/20 p-6 text-center">
            <p className="text-sm text-red-400">
              {error}
            </p>

            <button
              type="button"
              onClick={loadReviews}
              className="mt-4 rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-white transition hover:border-zinc-500 hover:bg-zinc-800"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading &&
          !error &&
          reviews.length === 0 && (
            <div className="rounded-xl border border-dashed border-zinc-700 bg-zinc-950/40 px-5 py-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800 text-xl">
                💬
              </div>

              <h3 className="mt-4 text-lg font-semibold text-white">
                No reviews yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
                Be the first to share your thoughts about
                this title with the CineTrack community.
              </p>
            </div>
          )}

        {/* Reviews */}
        {!loading &&
          !error &&
          reviews.length > 0 && (
            <div className="space-y-4">
              {reviews.map((review) => (
                <ReviewCard
                  key={review._id}
                  review={review}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
      </section>

      {/* Create Review */}
      <WriteReviewModal
        isOpen={showModal}
        onClose={onCloseModal}
        mediaId={mediaId}
        onSuccess={loadReviews}
      />

      {/* Edit Review */}
      <EditReviewModal
        isOpen={editModal}
        onClose={closeEditModal}
        reviewData={selectedReview}
        onSuccess={loadReviews}
      />
    </>
  );
}

export default ReviewsSection;