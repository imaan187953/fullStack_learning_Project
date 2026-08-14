import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import RatingHistoryCard from "../../components/profile/RatingHistoryCard";

import {
  getMyRatings,
  deleteRating,
} from "../../services/rating.service";

function MyRatingsPage() {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRatings = async () => {
    try {
      setLoading(true);

      const response = await getMyRatings();

      setRatings(response.ratings || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRatings();
  }, []);

  const handleDelete = async (mediaId) => {
    if (!window.confirm("Delete this rating?")) {
      return;
    }

    try {
      await deleteRating(mediaId);

      await loadRatings();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to delete rating."
      );
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-black">

      <Navbar />

      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">

        <Link
          to="/profile"
          className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white sm:mb-8"
        >
          <ArrowLeft size={17} />
          Back to Profile
        </Link>

        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            My Ratings
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            Movies and shows you've rated on CineTrack.
          </p>
        </div>

        {loading ? (
          <div className="h-32 animate-pulse rounded-2xl bg-zinc-900" />
        ) : ratings.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-700 px-4 py-12 text-center sm:py-14">
            <p className="text-sm text-zinc-500 sm:text-base">
              You haven't rated anything yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-5">
            {ratings.map((rating) => (
              <RatingHistoryCard
                key={rating._id}
                rating={rating}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

      </div>

      <Footer />

    </main>
  );
}

export default MyRatingsPage;