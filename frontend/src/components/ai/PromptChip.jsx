function PromptChip({
  text,
  onClick,
}) {
  return (
    <button
      onClick={() => onClick(text)}
      className="shrink-0 whitespace-nowrap rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-400 transition hover:border-red-500 hover:text-white sm:px-4 sm:py-2 sm:text-sm"
    >
      {text}
    </button>
  );
}

export default PromptChip;