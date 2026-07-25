import { useState } from "react";
import { createReview } from "../../services/review.service";

function WriteReviewModal({
  isOpen,
  onClose,
  mediaId,
  onSuccess,
}) {
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (review.trim().length < 10) {
      alert("Review must be at least 10 characters.");
      return;
    }

    try {
      setLoading(true);

      await createReview(mediaId, review);

      alert("Review added successfully!");

      setReview("");

      onSuccess();

      onClose();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Unable to create review."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

      <div className="w-full max-w-2xl rounded-2xl bg-zinc-900 p-6">

        <h2 className="mb-6 text-3xl font-bold text-white">
          Write Review
        </h2>

        <form onSubmit={handleSubmit}>

          <textarea
            value={review}
            onChange={(e) =>
              setReview(e.target.value)
            }
            rows={8}
            maxLength={1000}
            placeholder="Share your thoughts..."
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 p-4 text-white outline-none focus:border-red-500"
          />

          <div className="mt-2 text-right text-sm text-gray-400">
            {review.length}/1000
          </div>

          <div className="mt-6 flex justify-end gap-4">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-zinc-700 px-5 py-2 text-white"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="rounded-lg bg-red-600 px-6 py-2 text-white hover:bg-red-700"
            >
              {loading ? "Posting..." : "Submit Review"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default WriteReviewModal;