import { useEffect, useState } from "react";

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

  const [averageRating, setAverageRating] =
    useState(0);

  const [totalRatings, setTotalRatings] =
    useState(0);

  const [loading, setLoading] =
    useState(false);

  const loadRatings = async () => {
    try {
      const average =
        await getAverageRating(mediaId);

      setAverageRating(
        average.averageRating
      );

      setTotalRatings(
        average.totalRatings
      );
    } catch (error) {
      console.error(error);
    }

    try {
      const mine =
        await getMyRating(mediaId);

      setMyRating(
        mine.rating.rating
      );
    } catch (error) {
      setMyRating(null);
    }
  };

  useEffect(() => {
    if (mediaId) {
      loadRatings();
    }
  }, [mediaId]);

  const handleRating = async (rating) => {
    setLoading(true);

    try {
      if (myRating === null) {
        await createRating(
          mediaId,
          rating
        );

        alert("Rating added successfully.");
      } else {
        await updateRating(
          mediaId,
          rating
        );

        alert("Rating updated successfully.");
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
    if (myRating === null) return;

    if (
      !window.confirm(
        "Delete your rating?"
      )
    )
      return;

    setLoading(true);

    try {

      await deleteRating(mediaId);

      alert(
        "Rating deleted successfully."
      );

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
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

      <h2 className="mb-8 text-3xl font-bold text-white">
        Community Ratings
      </h2>

      <div className="grid gap-10 lg:grid-cols-2">

        {/* Community */}

        <div className="rounded-xl bg-zinc-800 p-6">

          <h3 className="mb-5 text-xl font-semibold text-white">
            Community Score
          </h3>

          <StarRating
            value={Math.round(
              averageRating
            )}
          />

          <div className="mt-6">

            <p className="text-5xl font-bold text-white">
              {averageRating}
              <span className="text-2xl text-gray-400">
                /10
              </span>
            </p>

            <p className="mt-2 text-gray-400">
              {totalRatings} total ratings
            </p>

          </div>

        </div>

        {/* User */}

        <div className="rounded-xl bg-zinc-800 p-6">

          <h3 className="mb-5 text-xl font-semibold text-white">
            Your Rating
          </h3>

          <StarRating
            editable
            loading={loading}
            value={myRating || 0}
            onChange={
              handleRating
            }
          />

          <div className="mt-6 flex flex-wrap gap-4">

            {myRating && (
              <>
                <span className="rounded-lg bg-zinc-700 px-4 py-2 text-white">
                  Rated {myRating}/10
                </span>

                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="rounded-lg bg-red-600 px-5 py-2 text-white transition hover:bg-red-700 disabled:opacity-50"
                >
                  Delete Rating
                </button>
              </>
            )}

            {!myRating && (
              <p className="text-gray-400">
                Click on a star to
                submit your rating.
              </p>
            )}

          </div>

        </div>

      </div>

    </section>
  );
}

export default RatingSummary;