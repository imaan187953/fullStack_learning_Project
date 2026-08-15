import { useState, useEffect } from "react";

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

    const [loading, setLoading] =
        useState(false);

    const [result, setResult] =
        useState(null);


    /*
    ==========================================
    Load Previously Generated Recommendations
    ==========================================
    */

    useEffect(() => {

        const saved =
            loadRecommendations();

        if (saved) {
            setResult(saved);
        }

    }, []);


    /*
    ==========================================
    Generate Recommendations
    ==========================================
    */

    const handleGenerate = async () => {

        try {

            setLoading(true);

            const response =
                await generateRecommendations();

            console.log(
                "FIRST RECOMMENDATION:",
                response.data.recommendations?.[0]
            );

            setResult(response.data);

            saveRecommendations(
                response.data
            );

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
        <main className="min-h-screen overflow-x-hidden bg-black">

            <Navbar />

            {/* Main Content */}
            <div className="mx-auto w-full max-w-7xl space-y-8 px-3 pb-8 pt-18 sm:space-y-10 sm:px-5 sm:pb-10 sm:pt-20 md:px-6 lg:space-y-14 lg:px-8 lg:pb-14">

                {/* AI Hero */}
                <RecommendationHero
                    onGenerate={handleGenerate}
                    loading={loading}
                />

                {/* AI Chat - Always Visible */}
                <AIChatBox />

                {/* Loading Analysis */}
                {loading && (
                    <LoadingAnalysis />
                )}

                {/* Generated Results */}
                {!loading && result && (
                    <>
                        <AIInsights
                            statistics={
                                result.statistics
                            }
                            favoriteGenres={
                                result.favoriteGenres || []
                            }
                            retrievedCount={
                                result.retrievedCount || 0
                            }
                            generatedAt={
                                result.generatedAt
                            }
                        />

                        <RecommendationGrid
                            recommendations={
                                Array.isArray(
                                    result.recommendations
                                )
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