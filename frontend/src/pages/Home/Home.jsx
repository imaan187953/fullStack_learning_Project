import { useState, useEffect } from "react";
import HeroSection from "../../components/home/HeroSection";
import MyListsSection from "../../components/home/MyListsSection";
import AIRecommendationSection from "../../components/home/AIRecommendationSection";
import Footer from "../../components/layout/Footer";
import TrendingSection from "../Landing/TrendingSection";

import {
    getTrendingMovies,
    getTrendingTV,
} from "../../services/media.service";

function Home() {
  const [movies, setMovies] = useState([]);
      const [tvShows, setTvShows] = useState([]);
  
      const [loading, setLoading] = useState(true);
  
      useEffect(() => {
          const fetchLandingData = async () => {
              try {
                  const [movieResponse, tvResponse] = await Promise.all([
                      getTrendingMovies(),
                      getTrendingTV(),
                  ]);
  
                  setMovies(movieResponse.results);
                  setTvShows(tvResponse.results);
              } catch (error) {
                  console.error("Failed to load landing page:", error);
              } finally {
                  setLoading(false);
              }
          };
  
          fetchLandingData();
      }, []);

      if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black text-white">
                Loading...
            </div>
        );
    }



  return (
    <main className="min-h-screen bg-black">

      <div className="mx-auto max-w-7xl px-6 py-10 space-y-14">

        {/* Hero */}

        <HeroSection />

        {/* My Lists */}

        <MyListsSection />

        {/* AI Recommendations */}

        <AIRecommendationSection />

        <TrendingSection
          title="🔥 Trending Movies"
          movies={movies}
        />

        <TrendingSection
          title="📺 Trending TV Shows"
          movies={tvShows}
        />

        {/*  Footer */}
        <Footer />


      </div>

    </main>
  );
}

export default Home;