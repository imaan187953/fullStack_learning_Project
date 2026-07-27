import { User, Mail } from "lucide-react";

function ProfileHeader({ user, onEdit }) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">

      <div className="flex flex-col items-center gap-6 md:flex-row">

        <img
          src={
            user.profilePicture ||
            "https://ui-avatars.com/api/?background=dc2626&color=fff&name=" +
              encodeURIComponent(user.username)
          }
          alt={user.username}
          className="h-36 w-36 rounded-full border-4 border-red-600 object-cover"
        />

        <div className="flex-1">

          <h1 className="text-4xl font-bold text-white">
            {user.displayName || user.username}
          </h1>

          <p className="mt-2 text-lg text-gray-400">
            @{user.username}
          </p>

          <div className="mt-5 flex items-center gap-2 text-gray-400">
            <Mail size={18} />
            {user.email}
          </div>

          <div className="mt-3 flex items-center gap-2 text-gray-400">
            <User size={18} />
            CineTrack Member
          </div>

          <p className="mt-6 max-w-3xl text-gray-300">
            {user.bio || "No bio added yet."}
          </p>

        </div>

        <button
          onClick={onEdit}
          className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
        >
          Edit Profile
        </button>

      </div>

    </section>
  );
}

export default ProfileHeader;