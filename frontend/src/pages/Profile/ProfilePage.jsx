import { useState } from "react";

import { useAuth } from "../../contexts/AuthContext";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import ProfileHeader from "../../components/profile/ProfileHeader";
import EditProfileModal from "../../components/profile/EditProfileModal";
import ProfileListsSection from "../../components/profile/ProfileListsSection";
import ProfileReviewsSection from "../../components/profile/ProfileReviewsSection";
import ProfileRatingsSection from "../../components/profile/ProfileRatingsSection";

function ProfilePage() {
    const { user } = useAuth();

    const [showEditModal, setShowEditModal] =
        useState(false);

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black px-4 text-sm text-white">
                Loading...
            </div>
        );
    }

    return (
        <main className="min-h-screen overflow-x-hidden bg-black">

            <Navbar />

            {/* Main Content */}
            <div className="mx-auto w-full max-w-7xl space-y-8 px-3 pb-8 pt-18 sm:space-y-10 sm:px-5 sm:pb-10 sm:pt-20 md:px-6 lg:space-y-14 lg:px-8 lg:pb-14">

                {/* Profile Header */}
                <ProfileHeader
                    user={user}
                    onEdit={() =>
                        setShowEditModal(true)
                    }
                />

                {/* My Lists */}
                <ProfileListsSection />

                {/* My Reviews */}
                <ProfileReviewsSection />

                {/* My Ratings */}
                <ProfileRatingsSection />

            </div>

            <EditProfileModal
                isOpen={showEditModal}
                onClose={() =>
                    setShowEditModal(false)
                }
            />

            <Footer />

        </main>
    );
}

export default ProfilePage;