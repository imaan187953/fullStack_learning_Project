import {
  ListPlus,
  Star,
  MessageSquareText,
} from "lucide-react";

import ActionCard from "./ActionCard";

import QuickStats from "../details/QuickStats";

function InteractionSection({
  onAddToList,
  onRate,
  onReview,
}) {
  return (
    <section className="space-y-6">

      <div>
        <h2 className="text-3xl font-bold text-white">
          🎬 Interact with this title
        </h2>

        <p className="mt-2 text-gray-400">
          Save this title to your lists, rate it, or share your
          thoughts with the CineTrack community.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">

        <ActionCard
          icon={<ListPlus size={28} />}
          title="Add to List"
          description="Save this title to one of your custom movie or TV lists."
          onClick={onAddToList}
        />

        <ActionCard
          icon={<Star size={28} />}
          title="Rate this Title"
          description="Tell others how much you enjoyed this title."
          onClick={onRate}
        />

        <ActionCard
          icon={<MessageSquareText size={28} />}
          title="Write a Review"
          description="Share your thoughts and help others discover great content."
          onClick={onReview}
        />

      </div>

    </section>
  );
}

export default InteractionSection;