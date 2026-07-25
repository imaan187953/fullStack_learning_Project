import { Pencil, Trash2 } from "lucide-react";

import { useAuth } from "../../contexts/AuthContext";


function ReviewCard({
  review,
  onEdit,
  onDelete,
}) {

  const { user } = useAuth();

  const isOwner =
    user?._id === review.user._id;


  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">

      <div className="mb-4 flex items-start justify-between">

        <div>

          <h3 className="text-lg font-semibold text-white">
            {review.user.username}
          </h3>

          <p className="text-sm text-gray-500">
            {new Date(
              review.createdAt
            ).toLocaleDateString()}
          </p>

        </div>


        {isOwner && (

          <div className="flex gap-3">

            <button
              onClick={() => onEdit(review)}
              className="flex items-center gap-2 rounded-lg border border-zinc-700 px-3 py-2 text-sm text-white hover:bg-zinc-800"
            >
              <Pencil size={16}/>
              Edit
            </button>


            <button
              onClick={() =>
                onDelete(review._id)
              }
              className="flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
            >
              <Trash2 size={16}/>
              Delete
            </button>

          </div>

        )}

      </div>


      <p className="whitespace-pre-wrap leading-7 text-gray-300">
        {review.review}
      </p>


    </div>
  );
}

export default ReviewCard;