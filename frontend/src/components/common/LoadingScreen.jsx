function LoadingScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-zinc-700 border-t-red-600"></div>

      <h2 className="mt-6 text-2xl font-bold text-white">
        CineTrack
      </h2>

      <p className="mt-2 text-zinc-400">
        Loading...
      </p>
    </div>
  );
}

export default LoadingScreen;