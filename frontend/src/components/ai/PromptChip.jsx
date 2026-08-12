function PromptChip({
  text,
  onClick,
}) {
  return (
    <button
      onClick={() => onClick(text)}
      className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-300 transition hover:border-red-500 hover:text-white"
    >
      {text}
    </button>
  );
}

export default PromptChip;