import { useEffect, useState } from "react";
import { Star, Trash2, Users } from "lucide-react";

import StarRating from "./StarRating";

import {
  createRating,
  deleteRating,
  getAverageRating,
  getMyRating,
  updateRating,
} from "../../services/rating.service";

function RatingSummary({ mediaId }) {
  const [myRating, setMyRating] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);

  const [loading, setLoading] = useState(false);
  const [loadingRatings, setLoadingRatings] = useState(true);

  const loadRatings = async () => {
    if (!mediaId) return;

    setLoadingRatings(true);

    try {
      const average = await getAverageRating(mediaId);

      setAverageRating(
        Number(average.averageRating || 0)
      );

      setTotalRatings(
        Number(average.totalRatings || 0)
      );
    } catch (error) {
      console.error("Unable to load average rating:", error);
    }

    try {
      const mine = await getMyRating(mediaId);

      setMyRating(
        mine?.rating?.rating ?? null
      );
    } catch (error) {
      setMyRating(null);
    } finally {
      setLoadingRatings(false);
    }
  };

  useEffect(() => {
    loadRatings();
  }, [mediaId]);

  const handleRating = async (rating) => {
    if (loading) return;

    setLoading(true);

    try {
      if (myRating === null) {
        await createRating(mediaId, rating);
      } else {
        await updateRating(mediaId, rating);
      }

      await loadRatings();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to save rating."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (myRating === null || loading) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete your rating?"
    );

    if (!confirmed) return;

    setLoading(true);

    try {
      await deleteRating(mediaId);

      setMyRating(null);

      await loadRatings();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to delete rating."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 sm:p-7 lg:p-8">

      {/* Header */}

      <div className="mb-7 sm:mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">
            <Star
              size={20}
              fill="currentColor"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Community Ratings
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              See how the CineTrack community rated this title.
            </p>
          </div>
        </div>
      </div>

      {/* Rating Cards */}

      <div className="grid gap-5 lg:grid-cols-2">

        {/* Community Rating */}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 sm:p-6">

          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Community Score
              </h3>

              <p className="mt-1 text-sm text-zinc-500">
                Average rating
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-zinc-400">
              <Users size={18} />
            </div>
          </div>

          {loadingRatings ? (
            <div className="h-28 animate-pulse rounded-xl bg-zinc-900" />
          ) : (
            <>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold tracking-tight text-white">
                      {averageRating.toFixed(1)}
                    </span>

                    <span className="text-lg text-zinc-500">
                      /10
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-zinc-500">
                    {totalRatings}{" "}
                    {totalRatings === 1
                      ? "rating"
                      : "ratings"}
                  </p>
                </div>

                <div className="rounded-xl bg-zinc-900 px-4 py-3">
                  <StarRating
                    value={Math.round(averageRating)}
                  />
                </div>

              </div>
            </>
          )}
        </div>

        {/* User Rating */}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5 sm:p-6">

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white">
              Your Rating
            </h3>

            <p className="mt-1 text-sm text-zinc-500">
              Rate this title out of 10.
            </p>
          </div>

          <div className="rounded-xl bg-zinc-900/80 p-4 sm:p-5">

            <StarRating
              editable
              loading={loading}
              value={myRating || 0}
              onChange={handleRating}
            />

          </div>

          <div className="mt-5 flex min-h-10 flex-wrap items-center gap-3">

            {myRating ? (
              <>
                <span className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm font-medium text-white">
                  Your rating:{" "}
                  <span className="text-yellow-400">
                    {myRating}/10
                  </span>
                </span>

                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-lg
                    border
                    border-red-500/30
                    px-3
                    py-2
                    text-sm
                    font-medium
                    text-red-400
                    transition
                    hover:border-red-500
                    hover:bg-red-500/10
                    hover:text-red-300
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  <Trash2 size={15} />
                  Remove
                </button>
              </>
            ) : (
              <p className="text-sm text-zinc-500">
                Select a star to submit your rating.
              </p>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}

export default RatingSummary;