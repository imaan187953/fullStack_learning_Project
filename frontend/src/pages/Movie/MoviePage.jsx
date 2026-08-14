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

  const [showAddModal, setShowAddModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError("");

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
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-center text-white">
        <p className="text-sm sm:text-base">
          Loading movie...
        </p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-center">
        <p className="text-sm text-red-500 sm:text-base">
          {error || "Movie not found."}
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-zinc-950">

      <MovieHero
        movie={movie}
        onAddToList={() => setShowAddModal(true)}
      />

      <MediaTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}

        overview={
          <InteractionSection
            movie={movie}
            onAddToList={() => setShowAddModal(true)}
            onRate={() => setActiveTab("ratings")}
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

      <AddToListModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        tmdbId={movie.tmdbId}
        mediaType="movie"
      />

    </main>
  );
}

export default MoviePage;