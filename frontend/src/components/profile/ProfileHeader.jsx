import {
    User,
    Mail,
    Pencil,
} from "lucide-react";

function ProfileHeader({ user, onEdit }) {

    const avatar =
        user.profilePicture ||
        "https://ui-avatars.com/api/?background=dc2626&color=fff&name=" +
            encodeURIComponent(user.username);

    return (
        <section
            className="
                w-full
                overflow-hidden
                rounded-2xl
                border
                border-zinc-800
                bg-zinc-900
                p-5
                sm:p-7
                lg:p-8
            "
        >

            <div
                className="
                    flex
                    flex-col
                    items-center
                    gap-5
                    sm:gap-6
                    lg:flex-row
                    lg:items-start
                "
            >

                {/* Avatar */}

                <img
                    src={avatar}
                    alt={user.username}
                    className="
                        h-24
                        w-24
                        shrink-0
                        rounded-full
                        border-2
                        border-red-600
                        object-cover
                        sm:h-28
                        sm:w-28
                        lg:h-32
                        lg:w-32
                    "
                />

                {/* Information */}

                <div className="min-w-0 flex-1 text-center lg:text-left">

                    <h1
                        className="
                            break-words
                            text-3xl
                            font-bold
                            tracking-tight
                            text-white
                            sm:text-4xl
                        "
                    >
                        {user.displayName ||
                            user.username}
                    </h1>

                    <p className="mt-1 text-sm text-zinc-500 sm:text-base">
                        @{user.username}
                    </p>

                    <div
                        className="
                            mt-4
                            flex
                            flex-col
                            items-center
                            gap-2
                            text-sm
                            text-zinc-400
                            sm:flex-row
                            sm:justify-center
                            lg:justify-start
                        "
                    >

                        <span className="flex items-center gap-2">
                            <Mail size={16} />
                            <span className="break-all">
                                {user.email}
                            </span>
                        </span>

                        <span className="hidden sm:block text-zinc-700">
                            •
                        </span>

                        <span className="flex items-center gap-2">
                            <User size={16} />
                            CineTrack Member
                        </span>

                    </div>

                    <p
                        className="
                            mx-auto
                            mt-5
                            max-w-3xl
                            break-words
                            text-sm
                            leading-6
                            text-zinc-300
                            sm:text-base
                            lg:mx-0
                        "
                    >
                        {user.bio ||
                            "No bio added yet."}
                    </p>

                </div>

                {/* Edit Button */}

                <button
                    type="button"
                    onClick={onEdit}
                    className="
                        inline-flex
                        w-full
                        shrink-0
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-red-600
                        px-5
                        py-3
                        text-sm
                        font-semibold
                        text-white
                        transition
                        hover:bg-red-700
                        sm:w-auto
                        lg:px-6
                    "
                >
                    <Pencil size={16} />
                    Edit Profile
                </button>

            </div>

        </section>
    );
}

export default ProfileHeader;