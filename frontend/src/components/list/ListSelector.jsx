function ListSelector({
  lists,
  selectedList,
  onSelect,
}) {
  if (!lists.length) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-700 p-8 text-center">
        <p className="text-zinc-400">
          You haven't created any lists yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {lists.map((list) => (
        <label
          key={list._id}
          className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition ${
            selectedList === list._id
              ? "border-red-500 bg-red-500/10"
              : "border-zinc-700 hover:border-zinc-500"
          }`}
        >
          <div>
            <h3 className="font-medium text-white">
              {list.name}
            </h3>

            <p className="text-sm text-zinc-400">
              {list.description ||
                "No description"}
            </p>
          </div>

          <input
            type="radio"
            checked={selectedList === list._id}
            onChange={() =>
              onSelect(list._id)
            }
          />
        </label>
      ))}
    </div>
  );
}

export default ListSelector;