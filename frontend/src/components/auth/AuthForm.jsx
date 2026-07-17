import { Link } from "react-router-dom";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";

function AuthForm({
  formData,
  errors,
  loading,
  onChange,
  onSubmit,
  isLogin = true,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <AuthInput
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={onChange}
        placeholder="Enter your email"
        error={errors.email}
        autoComplete="email"
      />

      <PasswordInput
        label="Password"
        name="password"
        value={formData.password}
        onChange={onChange}
        placeholder="Enter your password"
        error={errors.password}
        autoComplete={isLogin ? "current-password" : "new-password"}
      />

      {errors.general && (
        <div className="rounded-lg bg-red-500/10 border border-red-500 p-3">
          <p className="text-sm text-red-400">
            {errors.general}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
      </button>

      <p className="text-center text-gray-400">
        {isLogin ? (
          <>
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-red-500 hover:text-red-400"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-red-500 hover:text-red-400"
            >
              Login
            </Link>
          </>
        )}
      </p>
    </form>
  );
}

export default AuthForm;