import { useState } from "react";

import ListItem from "./ListItem";
export default function List({
  items,
  onDeleteItems,
  onToggleItems,
  onSortItems,
  onClearListItem,
}) {
  const [sortState, setSortState] = useState(1);
  let sortedItems = onSortItems(sortState);

  return (
    <div className="list">
      <ul>
        {sortedItems.map((x) => {
          return (
            <ListItem
              onDeleteItems={onDeleteItems}
              onToggleItems={onToggleItems}
              key={x.id}
              x={x}
            />
          );
        })}
      </ul>
      <div className="actions">
        <select
          name=""
          id=""
          value={sortState}
          onChange={(e) => setSortState(Number(e.target.value))}
        >
          <option value={1}>sort by input order</option>
          <option value={2}>sort by description</option>
          <option value={3}>sort by packed items</option>
        </select>
        <button onClick={() => onClearListItem()}>Clear List</button>
      </div>
    </div>
  );
}
