import { useState } from "react";

import {
  Sparkles,
  Send,
  User,
  Bot,
  Trash2,
  LoaderCircle,
} from "lucide-react";

import PromptChip from "./PromptChip";
import { askCineTrackAI } from "../../services/aiChat.service";

function AIChatBox() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const suggestions = [
    "Movies like Interstellar",
    "Dark psychological thrillers",
    "Best TV shows under 3 seasons",
    "Hidden sci-fi gems",
    "Feel-good comedies",
  ];

  const handleSubmit = async () => {
    const message = prompt.trim();

    if (!message || loading) return;

    setError("");

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: message,
    };

    setMessages((previous) => [
      ...previous,
      userMessage,
    ]);

    setPrompt("");
    setLoading(true);

    try {
      const response = await askCineTrackAI(message);

      const aiMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content:
          response?.reply ||
          "I couldn't generate a response.",
      };

      setMessages((previous) => [
        ...previous,
        aiMessage,
      ]);
    } catch (error) {
      console.error("AI Chat Error:", error);

      setError(
        error?.response?.data?.message ||
          "CineTrack AI is currently unavailable. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleClear = () => {
    setMessages([]);
    setError("");
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">

      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-zinc-800 p-4 sm:p-6">

        <div className="flex min-w-0 items-center gap-3">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10 sm:h-11 sm:w-11">
            <Sparkles
              size={19}
              className="text-red-500"
            />
          </div>

          <div className="min-w-0">

            <h2 className="truncate text-lg font-bold text-white sm:text-2xl">
              Ask CineTrack AI
            </h2>

            <p className="mt-0.5 hidden text-xs text-zinc-500 sm:block sm:text-sm">
              Ask for recommendations based on your taste.
            </p>

          </div>

        </div>

        {messages.length > 0 && (
          <button
            onClick={handleClear}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-700 text-zinc-400 transition hover:border-red-500/50 hover:text-white sm:h-auto sm:w-auto sm:gap-2 sm:px-3 sm:py-2"
            aria-label="Clear conversation"
          >
            <Trash2 size={16} />

            <span className="hidden sm:inline">
              Clear
            </span>
          </button>
        )}

      </div>

      {/* Conversation */}
      {messages.length > 0 && (
        <div className="max-h-[420px] space-y-4 overflow-y-auto p-4 sm:max-h-[500px] sm:p-6">

          {messages.map((message) => {
            const isUser =
              message.role === "user";

            return (
              <div
                key={message.id}
                className={`flex min-w-0 gap-2 sm:gap-3 ${
                  isUser
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                {!isUser && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500/10 sm:h-9 sm:w-9">
                    <Bot
                      size={16}
                      className="text-red-500"
                    />
                  </div>
                )}

                <div
                  className={`min-w-0 max-w-[82%] rounded-2xl px-3.5 py-2.5 sm:max-w-[75%] sm:px-4 sm:py-3 ${
                    isUser
                      ? "rounded-br-md bg-red-600 text-white"
                      : "rounded-bl-md bg-black text-zinc-300"
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words text-sm leading-6">
                    {message.content}
                  </p>
                </div>

                {isUser && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-800 sm:h-9 sm:w-9">
                    <User
                      size={16}
                      className="text-zinc-400"
                    />
                  </div>
                )}

              </div>
            );
          })}

          {loading && (
            <div className="flex gap-2 sm:gap-3">

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500/10 sm:h-9 sm:w-9">
                <Bot
                  size={16}
                  className="text-red-500"
                />
              </div>

              <div className="flex items-center gap-2 rounded-2xl rounded-bl-md bg-black px-4 py-3">
                <LoaderCircle
                  size={16}
                  className="animate-spin text-red-500"
                />

                <span className="text-xs text-zinc-500 sm:text-sm">
                  Thinking...
                </span>
              </div>

            </div>
          )}

        </div>
      )}

      {/* Empty State */}
      {messages.length === 0 && (
        <div className="p-4 sm:p-6">

          <div className="rounded-xl border border-dashed border-zinc-800 bg-black/50 p-6 text-center sm:p-8">

            <Sparkles
              size={26}
              className="mx-auto text-red-500"
            />

            <h3 className="mt-3 font-semibold text-white">
              What are you in the mood for?
            </h3>

            <p className="mx-auto mt-2 max-w-lg text-xs leading-5 text-zinc-500 sm:text-sm sm:leading-6">
              Ask CineTrack AI about movies,
              TV shows, genres, themes, or
              specific titles.
            </p>

          </div>

        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mx-4 mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs leading-5 text-red-400 sm:mx-6 sm:text-sm">
          {error}
        </div>
      )}

      {/* Suggestions */}
      <div className="px-4 pb-4 sm:px-6">

        <p className="mb-3 text-[10px] font-medium uppercase tracking-wider text-zinc-600 sm:text-xs">
          Try asking
        </p>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {suggestions.map((item) => (
            <PromptChip
              key={item}
              text={item}
              onClick={setPrompt}
            />
          ))}
        </div>

      </div>

      {/* Input */}
      <div className="border-t border-zinc-800 p-4 sm:p-6">

        <div className="flex flex-col gap-3">

          <textarea
            rows={3}
            value={prompt}
            onChange={(event) =>
              setPrompt(event.target.value)
            }
            onKeyDown={handleKeyDown}
            disabled={loading}
            placeholder="Ask CineTrack AI..."
            className="min-h-[82px] w-full resize-none rounded-xl border border-zinc-700 bg-black p-3.5 text-sm leading-6 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500 disabled:cursor-not-allowed disabled:opacity-60 sm:min-h-[90px] sm:p-4"
          />

          <button
            onClick={handleSubmit}
            disabled={!prompt.trim() || loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:self-end"
          >
            {loading ? (
              <LoaderCircle
                size={17}
                className="animate-spin"
              />
            ) : (
              <Send size={17} />
            )}

            <span>
              {loading
                ? "Thinking..."
                : "Ask AI"}
            </span>
          </button>

        </div>

        <p className="mt-3 hidden text-xs text-zinc-600 sm:block">
          Press Enter to send • Shift + Enter for a new line
        </p>

      </div>

    </section>
  );
}

export default AIChatBox;