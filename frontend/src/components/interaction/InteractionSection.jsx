import {
  ListPlus,
  Star,
  MessageSquareText,
} from "lucide-react";

import ActionCard from "./ActionCard";

function InteractionSection({
  onAddToList,
  onRate,
  onReview,
}) {
  return (
    <section className="space-y-6">

      {/* Heading */}
      <div>

        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          🎬 Interact with this title
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base sm:leading-7">
          Save this title to your lists, rate it, or share
          your thoughts with the CineTrack community.
        </p>

      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-3">

        <ActionCard
          icon={<ListPlus size={24} />}
          title="Add to List"
          description="Save this title to one of your custom movie or TV lists."
          onClick={onAddToList}
        />

        <ActionCard
          icon={<Star size={24} />}
          title="Rate this Title"
          description="Tell others how much you enjoyed this title."
          onClick={onRate}
        />

        <ActionCard
          icon={<MessageSquareText size={24} />}
          title="Write a Review"
          description="Share your thoughts and help others discover great content."
          onClick={onReview}
        />

      </div>

    </section>
  );
}

export default InteractionSection;