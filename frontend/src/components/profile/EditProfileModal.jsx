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

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-zinc-900 p-8">

        <div className="mb-8 flex items-center justify-between">

          <h2 className="text-3xl font-bold text-white">
            Edit Profile
          </h2>

          <button onClick={onClose}>
            <X className="text-white" />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Profile Picture */}

          <div className="flex flex-col items-center gap-4">

            <img
              src={
                form.profilePicture ||
                "https://placehold.co/160x160?text=Avatar"
              }
              alt="Profile"
              className="h-32 w-32 rounded-full border-4 border-zinc-700 object-cover"
            />

            <label className="flex cursor-pointer items-center gap-2 rounded-xl bg-zinc-800 px-5 py-3 text-white transition hover:bg-zinc-700">

              <Upload size={18} />

              Upload Photo

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />

            </label>

            <p className="text-xs text-gray-500">
              PNG, JPG or JPEG • Max 2 MB
            </p>

          </div>

          <input
            name="displayName"
            value={form.displayName}
            onChange={handleChange}
            placeholder="Display Name"
            className="w-full rounded-xl bg-zinc-800 p-4 text-white outline-none focus:ring-2 focus:ring-red-600"
          />

          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full rounded-xl bg-zinc-800 p-4 text-white outline-none focus:ring-2 focus:ring-red-600"
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full rounded-xl bg-zinc-800 p-4 text-white outline-none focus:ring-2 focus:ring-red-600"
          />

          <textarea
            rows={5}
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="Tell everyone about yourself..."
            className="w-full rounded-xl bg-zinc-800 p-4 text-white outline-none focus:ring-2 focus:ring-red-600"
          />

          <button
            disabled={saving}
            className="w-full rounded-xl bg-red-600 py-4 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditProfileModal;