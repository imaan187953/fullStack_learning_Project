import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import ReviewHistoryCard from "../../components/profile/ReviewHistoryCard";
import EditReviewModal from "../../components/reviews/EditReviewModal";

import {
  getMyReviews,
  deleteReview,
} from "../../services/review.service";

function MyReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedReview, setSelectedReview] =
    useState(null);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const loadReviews = async () => {
    try {
      setLoading(true);

      const response = await getMyReviews();

      setReviews(response.reviews || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this review?")) {
      return;
    }

    try {
      await deleteReview(id);

      await loadReviews();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to delete review."
      );
    }
  };

  const handleEdit = (review) => {
    setSelectedReview(review);
    setShowEditModal(true);
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
            My Reviews
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            Reviews you've shared with the CineTrack community.
          </p>
        </div>

        {loading ? (
          <div className="h-32 animate-pulse rounded-2xl bg-zinc-900" />
        ) : reviews.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-700 px-4 py-12 text-center sm:py-14">
            <p className="text-sm text-zinc-500 sm:text-base">
              You haven't written any reviews yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-5">
            {reviews.map((review) => (
              <ReviewHistoryCard
                key={review._id}
                review={review}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}

      </div>

      <EditReviewModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedReview(null);
        }}
        reviewData={selectedReview}
        onSuccess={loadReviews}
      />

      <Footer />

    </main>
  );
}

export default MyReviewsPage;