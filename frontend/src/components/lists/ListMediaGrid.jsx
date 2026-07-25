import ListMediaCard from "./ListMediaCard";

function ListMediaGrid({
  items,
  onRemove,
}) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 py-20 text-center text-gray-400">
        This list is empty.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
      {items.map((item) => (
        <ListMediaCard
          key={item._id}
          item={item}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

export default ListMediaGrid;