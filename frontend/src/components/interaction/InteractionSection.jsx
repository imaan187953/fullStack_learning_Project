import {
  ListPlus,
  Star,
  MessageSquareText,
} from "lucide-react";

import ActionCard from "./ActionCard";
import QuickStats from "../details/QuickStats";

function InteractionSection({
  media,
  mediaType = "movie",
  onAddToList,
  onRate,
  onReview,
}) {
  return (
    <section className="space-y-8">
      {/* Section heading */}
      <div>
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-red-500">
          Your experience
        </p>

        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Interact with this title
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
          Save it, rate it, or share your thoughts
          with the CineTrack community.
        </p>
      </div>

      {/* Main content */}
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Actions */}
        <div className="grid gap-4">
          <ActionCard
            icon={<ListPlus size={24} />}
            title="Add to List"
            description="Save this title to one of your custom CineTrack lists."
            onClick={onAddToList}
          />

          <ActionCard
            icon={<Star size={24} />}
            title="Rate this Title"
            description="Give this title your personal rating out of 10."
            onClick={onRate}
          />

          <ActionCard
            icon={<MessageSquareText size={24} />}
            title="Write a Review"
            description="Share your thoughts and help other viewers discover it."
            onClick={onReview}
          />
        </div>

        {/* Quick Stats */}
        <div>
          <QuickStats
            media={media}
            mediaType={mediaType}
          />
        </div>
      </div>
    </section>
  );
}

export default InteractionSection;