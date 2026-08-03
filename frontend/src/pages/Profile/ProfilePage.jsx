import { useState } from "react";

import { useAuth } from "../../contexts/AuthContext";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import ProfileHeader from "../../components/profile/ProfileHeader";
import EditProfileModal from "../../components/profile/EditProfileModal";

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
        <main className="min-h-screen bg-black">

            <Navbar />

            <div className="mx-auto max-w-7xl space-y-10 px-6 py-10">

                <ProfileHeader
                    user={user}
                    onEdit={() => setShowEditModal(true)}
                />

                {/* Next Iterations */}

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

                    <h2 className="text-2xl font-bold text-white">
                        My Lists
                    </h2>

                    <p className="mt-3 text-gray-400">
                        Coming in the next iteration...
                    </p>

                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

                    <h2 className="text-2xl font-bold text-white">
                        My Reviews
                    </h2>

                    <p className="mt-3 text-gray-400">
                        Coming in the next iteration...
                    </p>

                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

                    <h2 className="text-2xl font-bold text-white">
                        My Ratings
                    </h2>

                    <p className="mt-3 text-gray-400">
                        Coming in the next iteration...
                    </p>

                </div>

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