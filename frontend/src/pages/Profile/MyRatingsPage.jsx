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

      const response =
        await getMyRatings();

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

    if (!window.confirm("Delete this rating?"))
      return;

    try {

      await deleteRating(mediaId);

      loadRatings();

    } catch (error) {

      alert(
        error.response?.data?.message ||
          "Unable to delete rating."
      );

    }

  };

  return (
    <main className="min-h-screen bg-black">

      <Navbar />

      <div className="mx-auto max-w-6xl px-6 py-10">

        <Link
          to="/profile"
          className="mb-10 inline-flex items-center gap-2 text-zinc-400 hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to Profile
        </Link>

        <h1 className="mb-10 text-4xl font-bold text-white">
          My Ratings
        </h1>

        {loading ? (

          <p className="text-zinc-400">
            Loading...
          </p>

        ) : ratings.length === 0 ? (

          <div className="rounded-xl border border-dashed border-zinc-700 py-14 text-center">

            <p className="text-lg text-zinc-400">
              You haven't rated anything yet.
            </p>

          </div>

        ) : (

          <div className="space-y-6">

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