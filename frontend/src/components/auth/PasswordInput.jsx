import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function PasswordInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  autoComplete,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-zinc-300"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`w-full rounded-xl border bg-zinc-900 px-4 py-3 pr-12 text-white transition-all outline-none placeholder:text-zinc-500 ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-zinc-700 focus:border-red-500"
          }`}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 transition hover:text-white"
        >
          {showPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default PasswordInput;