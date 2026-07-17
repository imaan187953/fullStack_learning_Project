import AuthSidePanel from "../../components/auth/AuthSidePanel";

function AuthLayout({
  title,
  subtitle,
  children,
}) {
  return (
    <div className="min-h-screen bg-black">

      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-10">

        <div className="grid w-full overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl lg:grid-cols-2">

          {/* Left Side */}

          <AuthSidePanel />

          {/* Right Side */}

          <div className="flex items-center justify-center p-8 sm:p-12">

            <div className="w-full max-w-md">

              <h1 className="text-4xl font-bold text-white">
                {title}
              </h1>

              <p className="mt-3 mb-10 text-gray-400">
                {subtitle}
              </p>

              {children}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AuthLayout;