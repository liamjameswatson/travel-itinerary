import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  onDeteleItem,
  onToggleItem,
  onReset,
}) {
  // functionality for sort dropdown options
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  // sorts by input order
  if (sortBy === "input") sortedItems = items;

  // sorts item alphabetically
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  // sorts by packed status
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {/* for each item  render an Item compopent*/}
        {sortedItems.map((item) => (
          <Item
            itemObj={item}
            key={item.id}
            onDeteleItem={onDeteleItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>

      {/* sort dropdown */}
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>

        {/* reset button */}
        <button onClick={onReset}>Clear List</button>
      </div>
    </div>
  );
}
