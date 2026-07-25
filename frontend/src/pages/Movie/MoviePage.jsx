import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getMovieDetails } from "../../services/media.service";

import MovieHero from "../../components/movie/MovieHero";
import AddToListModal from "../../components/list/AddToListModal";

import MediaTabs from "../../components/media/MediaTabs";
import InteractionSection from "../../components/interaction/InteractionSection";
import RatingSummary from "../../components/ratings/RatingSummary";
import ReviewsSection from "../../components/reviews/ReviewsSection";

function MoviePage() {

  const { id } = useParams();

  const [movie, setMovie] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [showReviewModal, setShowReviewModal] = useState(false);

  const [activeTab, setActiveTab] =
    useState("overview");

  useEffect(() => {

    const fetchMovie = async () => {

      try {

        setLoading(true);

        const response = await getMovieDetails(id);

        setMovie(response.movie);

      } catch (err) {

        setError("Unable to load movie.");

      } finally {

        setLoading(false);

      }

    };

    fetchMovie();

  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        Loading movie...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950">

      <MovieHero
        movie={movie}
        onAddToList={() =>
          setShowAddModal(true)
        }
      />

      <MediaTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}

        overview={
          <InteractionSection
            onAddToList={() => setShowAddModal(true)}

            onRate={() => {
              setActiveTab("ratings");
            }}

            onReview={() => {
              setActiveTab("reviews");
              setShowReviewModal(true);
            }}
          />
        }

        reviews={
          <ReviewsSection
            mediaId={movie._id}
            showModal={showReviewModal}
            onCloseModal={() => setShowReviewModal(false)}
          />
        }

        ratings={
          <RatingSummary
            mediaId={movie._id}
          />
        }
      />

    </main>
  );
}

export default MoviePage;