import { useEffect, useState } from "react";
import { X, Upload } from "lucide-react";

import { updateProfile } from "../../services/profile.service";
import { useAuth } from "../../contexts/AuthContext";

function EditProfileModal({
  isOpen,
  onClose,
}) {
  const { user, updateUser } = useAuth();

  const [form, setForm] = useState({
    username: "",
    email: "",
    displayName: "",
    bio: "",
    profilePicture: "",
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username || "",
        email: user.email || "",
        displayName: user.displayName || "",
        bio: user.bio || "",
        profilePicture: user.profilePicture || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (!isOpen) {
      setSaving(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be smaller than 2 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        profilePicture: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const response = await updateProfile(form);

      updateUser(response.user);

      alert("Profile updated successfully.");

      onClose();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-3 backdrop-blur-sm sm:p-5"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !saving) {
          onClose();
        }
      }}
    >
      <div className="my-3 max-h-[94vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl sm:my-6 sm:max-h-[90vh]">

        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 py-4 sm:px-6">

          <div className="min-w-0">
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              Edit Profile
            </h2>

            <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
              Update your CineTrack profile.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            aria-label="Close"
            className="shrink-0 rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-800 hover:text-white disabled:opacity-50"
          >
            <X size={20} />
          </button>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-4 sm:p-6"
        >

          {/* Profile Picture */}
          <div className="flex flex-col items-center gap-3">

            <img
              src={
                form.profilePicture ||
                "https://placehold.co/160x160?text=Avatar"
              }
              alt="Profile"
              className="h-24 w-24 rounded-full border-2 border-zinc-700 object-cover sm:h-28 sm:w-28"
            />

            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-zinc-800 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700">
              <Upload size={16} />
              Upload Photo

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>

            <p className="text-center text-xs text-zinc-600">
              PNG, JPG or JPEG • Max 2 MB
            </p>

          </div>

          {/* Display Name */}
          <div>
            <label className="mb-2 block text-xs font-medium text-zinc-400">
              Display Name
            </label>

            <input
              name="displayName"
              value={form.displayName}
              onChange={handleChange}
              placeholder="Display Name"
              className="w-full min-w-0 rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-red-600 focus:ring-1 focus:ring-red-600"
            />
          </div>

          {/* Username */}
          <div>
            <label className="mb-2 block text-xs font-medium text-zinc-400">
              Username
            </label>

            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full min-w-0 rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-red-600 focus:ring-1 focus:ring-red-600"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-xs font-medium text-zinc-400">
              Email
            </label>

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full min-w-0 rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-red-600 focus:ring-1 focus:ring-red-600"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="mb-2 block text-xs font-medium text-zinc-400">
              Bio
            </label>

            <textarea
              rows={4}
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Tell everyone about yourself..."
              className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-600 focus:ring-1 focus:ring-red-600"
            />
          </div>

          {/* Save */}
          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-xl bg-red-600 py-3.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;