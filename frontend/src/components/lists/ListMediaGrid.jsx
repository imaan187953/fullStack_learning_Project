import ListMediaCard from "./ListMediaCard";

function ListMediaGrid({ items, onRemove }) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-800 bg-zinc-900/60 px-5 py-14 text-center text-sm text-zinc-400 sm:py-20">
        This list is empty.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5 xl:grid-cols-5">
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