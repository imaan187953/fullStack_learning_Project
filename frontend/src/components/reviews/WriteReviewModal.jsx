import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { createReview } from "../../services/review.service";

function WriteReviewModal({
  isOpen,
  onClose,
  mediaId,
  onSuccess,
}) {
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setReview("");
      setLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const trimmedReview = review.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (trimmedReview.length < 10) {
      alert(
        "Review must be at least 10 characters."
      );
      return;
    }

    try {
      setLoading(true);

      await createReview(
        mediaId,
        trimmedReview
      );

      setReview("");

      await onSuccess();

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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="my-8 w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              Write a Review
            </h2>

            <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
              Share your thoughts with the community.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Close review modal"
            className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-5 sm:p-6"
        >
          <label
            htmlFor="review"
            className="mb-2 block text-sm font-medium text-zinc-300"
          >
            Your review
          </label>

          <textarea
            id="review"
            value={review}
            onChange={(e) =>
              setReview(e.target.value)
            }
            rows={7}
            maxLength={1000}
            autoFocus
            disabled={loading}
            placeholder="What did you think about this movie?"
            className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-950 p-4 text-sm leading-7 text-white placeholder:text-zinc-600 outline-none transition focus:border-red-500 focus:ring-1 focus:ring-red-500 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
          />

          <div className="mt-2 flex items-center justify-between">
            <p className="text-xs text-zinc-600">
              Minimum 10 characters
            </p>

            <span
              className={`text-xs ${
                review.length >= 900
                  ? "text-red-400"
                  : "text-zinc-500"
              }`}
            >
              {review.length}/1000
            </span>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border border-zinc-700 px-5 py-3 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                loading ||
                trimmedReview.length < 10
              }
              className="rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Posting..."
                : "Publish Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WriteReviewModal;