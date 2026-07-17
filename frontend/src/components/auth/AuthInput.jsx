function AuthInput({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  autoComplete,
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-zinc-300"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`w-full rounded-xl border bg-zinc-900 px-4 py-3 text-white transition-all outline-none placeholder:text-zinc-500 ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-zinc-700 focus:border-red-500"
        }`}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default AuthInput;