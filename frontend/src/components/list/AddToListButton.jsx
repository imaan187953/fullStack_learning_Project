import { useState } from "react";
import { Plus } from "lucide-react";
import AddToListModal from "./AddToListModal";

function AddToListButton({ media }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="
          inline-flex
          items-center
          gap-2
          rounded-xl
          bg-red-600
          px-6
          py-3
          font-semibold
          text-white
          transition-all
          hover:bg-red-700
          hover:shadow-lg
          hover:shadow-red-500/30
          active:scale-95
        "
      >
        <Plus size={20} />
        Add to List
      </button>

      <AddToListModal
        open={open}
        onClose={() => setOpen(false)}
        media={media}
      />
    </>
  );
}

export default AddToListButton;