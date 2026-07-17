import { Link } from "react-router-dom";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";

function RegisterForm({
  formData,
  errors,
  loading,
  success,
  onChange,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <AuthInput
        label="Username"
        name="username"
        value={formData.username}
        onChange={onChange}
        placeholder="Choose a username"
        error={errors.username}
      />

      <AuthInput
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={onChange}
        placeholder="Enter your email"
        error={errors.email}
      />

      <PasswordInput
        label="Password"
        name="password"
        value={formData.password}
        onChange={onChange}
        placeholder="Create a password"
        error={errors.password}
      />

      <PasswordInput
        label="Confirm Password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={onChange}
        placeholder="Confirm your password"
        error={errors.confirmPassword}
      />

      {errors.general && (
        <div className="rounded-xl border border-red-500 bg-red-500/10 p-3">
          <p className="text-sm text-red-400">
            {errors.general}
          </p>
        </div>
      )}

      {success && (
        <div className="rounded-xl border border-green-500 bg-green-500/10 p-3">
          <p className="text-sm text-green-400">
            {success}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

      <p className="text-center text-sm text-gray-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-red-500 hover:text-red-400"
        >
          Login
        </Link>
      </p>
    </form>
  );
}

export default RegisterForm;