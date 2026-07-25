import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getTVDetails } from "../../services/media.service";

import TVHero from "../../components/tv/TVHero";
import AddToListModal from "../../components/list/AddToListModal";

import MediaTabs from "../../components/media/MediaTabs";
import InteractionSection from "../../components/interaction/InteractionSection";
import RatingSummary from "../../components/ratings/RatingSummary";
import ReviewsSection from "../../components/reviews/ReviewsSection";

function TVPage() {

  const { id } = useParams();

  const [tv, setTV] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [showReviewModal, setShowReviewModal] = useState(false);


  const [activeTab, setActiveTab] =
    useState("overview");

  useEffect(() => {

    const fetchTV = async () => {

      try {

        setLoading(true);

        const response = await getTVDetails(id);

        setTV(response.tv);

      } catch (error) {

        setError("Unable to load TV show.");

      } finally {

        setLoading(false);

      }

    };

    fetchTV();

  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        Loading TV Show...
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

      <TVHero
        tv={tv}
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
            mediaId={tv._id}
            showModal={showReviewModal}
            onCloseModal={() => setShowReviewModal(false)}
          />
        }

        ratings={
          <RatingSummary
            mediaId={tv._id}
          />
        }
      />

    </main>
  );
}

export default TVPage;