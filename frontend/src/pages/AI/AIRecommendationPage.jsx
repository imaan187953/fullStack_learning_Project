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


            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-8 lg:gap-10">


                {/* =========================================
                    HERO
                ========================================= */}

                <RecommendationHero
                    onGenerate={handleGenerate}
                    loading={loading}
                />


                {/* =========================================
                    AI CHAT

                    Always visible.
                    User does NOT need to generate
                    recommendations first.
                ========================================= */}

                <AIChatBox />


                {/* =========================================
                    LOADING ANALYSIS

                    Only visible while recommendations
                    are being generated.
                ========================================= */}

                {loading && (
                    <LoadingAnalysis />
                )}


                {/* =========================================
                    GENERATED RESULTS
                ========================================= */}

                {!loading && result && (
                    <>

                        {/* AI INSIGHTS */}

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


                        {/* RECOMMENDATIONS */}

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