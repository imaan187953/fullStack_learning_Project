import { User, Mail, Pencil } from "lucide-react";

function ProfileHeader({ user, onEdit }) {
  const avatar =
    user.profilePicture ||
    "https://ui-avatars.com/api/?background=dc2626&color=fff&name=" +
      encodeURIComponent(user.username);

  return (
    <section className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 sm:p-7 lg:p-8">
      <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-center">

        {/* Avatar */}
        <div className="flex shrink-0 justify-center lg:justify-start">
          <img
            src={avatar}
            alt={user.username}
            className="h-24 w-24 rounded-full border-2 border-red-600 object-cover sm:h-28 sm:w-28 lg:h-32 lg:w-32"
          />
        </div>

        {/* Information */}
        <div className="min-w-0 flex-1 text-center lg:text-left">

          <h1 className="break-words text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
            {user.displayName || user.username}
          </h1>

          <p className="mt-1 break-all text-sm text-zinc-500 sm:text-base">
            @{user.username}
          </p>

          {/* Meta */}
          <div className="mt-5 flex flex-col items-center gap-3 text-sm text-zinc-400 sm:flex-row sm:flex-wrap lg:items-start">

            <div className="flex min-w-0 max-w-full items-center gap-2">
              <Mail
                size={16}
                className="shrink-0"
              />

              <span className="break-all">
                {user.email}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <User
                size={16}
                className="shrink-0"
              />

              <span>CineTrack Member</span>
            </div>

          </div>

          {/* Bio */}
          <p className="mx-auto mt-5 max-w-2xl break-words text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7 lg:mx-0">
            {user.bio || "No bio added yet."}
          </p>

        </div>

        {/* Edit */}
        <div className="flex w-full shrink-0 justify-center lg:w-auto">
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 sm:w-auto"
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