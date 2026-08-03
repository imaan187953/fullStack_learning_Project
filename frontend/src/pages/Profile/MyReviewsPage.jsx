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

      const response =
        await getMyReviews();

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

    if (
      !window.confirm(
        "Delete this review?"
      )
    )
      return;

    try {

      await deleteReview(id);

      loadReviews();

    } catch (error) {

      alert(
        error.response?.data?.message
      );

    }

  };

  const handleEdit = (review) => {

    setSelectedReview(review);

    setShowEditModal(true);

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
          My Reviews
        </h1>

        {loading ? (

          <p className="text-zinc-400">
            Loading...
          </p>

        ) : reviews.length === 0 ? (

          <div className="rounded-xl border border-dashed border-zinc-700 py-14 text-center">

            <p className="text-lg text-zinc-400">
              You haven't written any reviews yet.
            </p>

          </div>

        ) : (

          <div className="space-y-6">

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
          loadReviews();
        }}
        reviewData={selectedReview}
        onSuccess={loadReviews}
      />

      <Footer />

    </main>
  );
}

export default MyReviewsPage;