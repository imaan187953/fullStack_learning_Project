import { useEffect, useState } from "react";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import RecommendationHero from "../../components/ai/RecommendationHero";
import LoadingAnalysis from "../../components/ai/LoadingAnalysis";
import RecommendationGrid from "../../components/ai/RecommendationGrid";
import AIInsights from "../../components/ai/AIInsights";
import AIChatBox from "../../components/ai/AIChatBox";

import {
  generateRecommendations,
} from "../../services/recommendation.service";

import {
  saveRecommendations,
  loadRecommendations,
} from "../../utils/aiStorage";

function AIRecommendationPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const saved = loadRecommendations();

    if (saved) {
      setResult(saved);
    }
  }, []);

  const handleGenerate = async () => {
    try {
      setLoading(true);

      const response = await generateRecommendations();

      setResult(response.data);

      saveRecommendations(response.data);
    } catch (error) {
      console.error(
        "Recommendation generation failed:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <Navbar />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-10 pt-24 sm:gap-8 sm:px-6 sm:pt-28 lg:gap-10 lg:px-8">
        <RecommendationHero
          onGenerate={handleGenerate}
          loading={loading}
        />

        {loading && <LoadingAnalysis />}

        {!loading && result && (
          <>
            <AIInsights
              statistics={result.statistics}
              favoriteGenres={result.favoriteGenres}
              retrievedCount={result.retrievedCount}
              generatedAt={result.generatedAt}
            />

            <AIChatBox />

            <RecommendationGrid
              recommendations={
                Array.isArray(result.recommendations)
                  ? result.recommendations
                  : []
              }
            />
          </>
        )}
      </div>

      <Footer />
    </main>
  );
}

export default AIRecommendationPage;