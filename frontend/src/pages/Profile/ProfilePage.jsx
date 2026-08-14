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
            <div className="flex min-h-screen items-center justify-center bg-black text-white">
                Loading...
            </div>
        );
    }

    return (
        <main className="min-h-screen overflow-x-hidden bg-black">

            <Navbar />

            {/* Profile Content */}
            <div
                className="
                    mx-auto
                    w-full
                    max-w-7xl
                    space-y-8
                    px-4
                    pt-6
                    pb-10
                    sm:space-y-10
                    sm:px-6
                    sm:pt-8
                    sm:pb-12
                    lg:px-8
                    lg:pt-10
                "
            >

                <ProfileHeader
                    user={user}
                    onEdit={() => setShowEditModal(true)}
                />

                <ProfileListsSection />

                <ProfileReviewsSection />

                <ProfileRatingsSection />

            </div>

            <EditProfileModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
            />

            <Footer />

        </main>
    );
}

export default ProfilePage;