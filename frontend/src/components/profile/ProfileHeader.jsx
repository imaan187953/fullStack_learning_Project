import { Mail, User, Pencil } from "lucide-react";

function ProfileHeader({ user, onEdit }) {
  return (
    <section className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 sm:p-6 lg:p-8">

      <div className="flex flex-col gap-6 sm:gap-7 lg:flex-row lg:items-center">

        {/* Profile Image */}
        <div className="flex shrink-0 justify-center lg:justify-start">
          <img
            src={
              user.profilePicture ||
              "https://ui-avatars.com/api/?background=dc2626&color=fff&name=" +
                encodeURIComponent(user.username)
            }
            alt={user.username}
            className="h-24 w-24 rounded-full border-2 border-red-600 object-cover sm:h-28 sm:w-28 lg:h-32 lg:w-32"
          />
        </div>

        {/* Profile Information */}
        <div className="min-w-0 flex-1 text-center lg:text-left">

          <h1 className="break-words text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            {user.displayName || user.username}
          </h1>

          <p className="mt-1 break-all text-sm text-zinc-500 sm:text-base">
            @{user.username}
          </p>

          {/* Email */}
          <div className="mt-4 flex min-w-0 items-center justify-center gap-2 text-sm text-zinc-400 lg:justify-start">
            <Mail
              size={16}
              className="shrink-0"
            />

            <span className="min-w-0 break-all">
              {user.email}
            </span>
          </div>

          {/* Member */}
          <div className="mt-2 flex items-center justify-center gap-2 text-sm text-zinc-400 lg:justify-start">
            <User
              size={16}
              className="shrink-0"
            />

            <span>CineTrack Member</span>
          </div>

          {/* Bio */}
          <p className="mx-auto mt-5 max-w-3xl break-words text-sm leading-6 text-zinc-300 lg:mx-0 sm:text-base">
            {user.bio || "No bio added yet."}
          </p>

        </div>

        {/* Edit Button */}
        <div className="flex shrink-0 justify-center lg:self-start">

          <button
            type="button"
            onClick={onEdit}
            className="
              inline-flex
              w-full
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
            "
          >
            <Pencil size={16} />

            Edit Profile
          </button>

        </div>

      </div>

    </section>
  );
}

export default ProfileHeader;