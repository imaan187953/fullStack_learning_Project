import { useEffect, useState } from "react";

import ReviewCard from "./ReviewCard";
import WriteReviewModal from "./WriteReviewModal";
import EditReviewModal from "./EditReviewModal";

import {
    getReviews,
    deleteReview,
} from "../../services/review.service";


function ReviewsSection({
    mediaId,
    showModal,
    onCloseModal
}) {

    const [reviews, setReviews] = useState([]);

    const [loading, setLoading] = useState(true);


    const [editModal, setEditModal] =
        useState(false);


    const [selectedReview, setSelectedReview] =
        useState(null);



    const loadReviews = async () => {

        try {

            const response =
                await getReviews(mediaId);


            setReviews(response.reviews);


        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };



    useEffect(() => {

        if (mediaId) {

            loadReviews();

        }

    }, [mediaId]);




    const handleDelete = async (reviewId) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this review?"
            );


        if (!confirmDelete) return;



        try {

            await deleteReview(reviewId);


            alert(
                "Review deleted successfully"
            );


            loadReviews();


        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to delete review."
            );

        }

    };




    const handleEdit = (review) => {

        setSelectedReview(review);

        setEditModal(true);

    };




    if (loading) {

        return (

            <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

                <h2 className="text-3xl font-bold text-white">
                    Community Reviews
                </h2>


                <p className="mt-4 text-gray-400">
                    Loading...
                </p>


            </section>

        );

    }



    return (

        <>


            <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">


                <h2 className="mb-8 text-3xl font-bold text-white">
                    Community Reviews
                </h2>



                {
                    reviews.length === 0 ? (

                        <div className="rounded-xl border border-dashed border-zinc-700 py-10 text-center">


                            <p className="text-lg text-gray-400">
                                No reviews yet.
                            </p>


                            <p className="mt-2 text-gray-500">
                                Be the first person to review this title.
                            </p>


                        </div>


                    ) : (


                        <div className="space-y-5">


                            {
                                reviews.map((review) => (

                                    <ReviewCard

                                        key={review._id}

                                        review={review}

                                        onEdit={handleEdit}

                                        onDelete={handleDelete}

                                    />

                                ))
                            }


                        </div>


                    )
                }



            </section>




            {/* Create Review */}

            <WriteReviewModal

                isOpen={showModal}

                onClose={onCloseModal}

                mediaId={mediaId}

                onSuccess={loadReviews}

            />





            {/* Edit Review */}

            <EditReviewModal

                isOpen={editModal}

                onClose={() => {

                    setEditModal(false);

                    setSelectedReview(null);

                }}

                reviewData={selectedReview}

                onSuccess={loadReviews}

            />



        </>

    );

}


export default ReviewsSection;