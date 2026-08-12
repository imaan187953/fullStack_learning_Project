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

    if (!message || loading) {
      return;
    }

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
      const response =
        await askCineTrackAI(message);

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
      console.error(
        "AI Chat Error:",
        error
      );

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
      <div className="flex items-center justify-between border-b border-zinc-800 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10">
            <Sparkles
              size={22}
              className="text-red-500"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              Ask CineTrack AI
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Ask for movie and TV recommendations
              based on your taste.
            </p>
          </div>
        </div>

        {messages.length > 0 && (
          <button
            onClick={handleClear}
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-400 transition hover:border-red-500/50 hover:text-white"
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
        <div className="max-h-[500px] space-y-5 overflow-y-auto p-6">
          {messages.map((message) => {
            const isUser =
              message.role === "user";

            return (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  isUser
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                {!isUser && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-500/10">
                    <Bot
                      size={18}
                      className="text-red-500"
                    />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 sm:max-w-[75%] ${
                    isUser
                      ? "rounded-br-md bg-red-600 text-white"
                      : "rounded-bl-md bg-zinc-950 text-zinc-300"
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm leading-7">
                    {message.content}
                  </p>
                </div>

                {isUser && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-800">
                    <User
                      size={18}
                      className="text-zinc-400"
                    />
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-500/10">
                <Bot
                  size={18}
                  className="text-red-500"
                />
              </div>

              <div className="flex items-center gap-2 rounded-2xl rounded-bl-md bg-zinc-950 px-5 py-4">
                <LoaderCircle
                  size={17}
                  className="animate-spin text-red-500"
                />

                <span className="text-sm text-zinc-500">
                  CineTrack AI is thinking...
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Empty state */}
      {messages.length === 0 && (
        <div className="p-6">
          <div className="rounded-xl border border-dashed border-zinc-800 bg-black/50 p-8 text-center">
            <Sparkles
              size={30}
              className="mx-auto text-red-500"
            />

            <h3 className="mt-4 font-semibold text-white">
              What are you in the mood for?
            </h3>

            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-zinc-500">
              Ask CineTrack AI about movies,
              TV shows, genres, themes, or
              specific titles.
            </p>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mx-6 mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Suggestions */}
      <div className="px-6 pb-4">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-zinc-600">
          Try asking
        </p>

        <div className="flex flex-wrap gap-2">
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
      <div className="border-t border-zinc-800 p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <textarea
            rows={3}
            value={prompt}
            onChange={(event) =>
              setPrompt(event.target.value)
            }
            onKeyDown={handleKeyDown}
            disabled={loading}
            placeholder="Example: Recommend emotional science-fiction movies with strong storytelling..."
            className="min-h-[90px] flex-1 resize-none rounded-xl border border-zinc-700 bg-black p-4 text-sm leading-6 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <button
            onClick={handleSubmit}
            disabled={
              !prompt.trim() || loading
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50 sm:h-[50px]"
          >
            {loading ? (
              <LoaderCircle
                size={18}
                className="animate-spin"
              />
            ) : (
              <Send size={18} />
            )}

            <span>
              {loading
                ? "Thinking..."
                : "Ask AI"}
            </span>
          </button>
        </div>

        <p className="mt-3 text-xs text-zinc-600">
          Press Enter to send • Shift + Enter
          for a new line
        </p>
      </div>
    </section>
  );
}

export default AIChatBox;