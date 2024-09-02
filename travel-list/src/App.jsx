import { useState } from "react";
import Logo from "./Logo.jsx";
import Form from "./Form.jsx";
import List from "./List.jsx";
import Stats from "./Stats.jsx";

export default function App() {
  const [items, setItems] = useState([]);
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }
  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleToggleItems(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function handleSortItems(value) {
    let k;
    value === 2
      ? (k = items.toSorted((a, b) =>
          a.description > b.description
            ? 1
            : a.description < b.description
            ? -1
            : 0
        ))
      : value === 3
      ? (k = items.toSorted((a, b) => a.packed - b.packed))
      : (k = items);

    return k;
  }
  function handleClearListItem() {
    const confirmed = window.confirm("Are you sure want to delete all items!");
    confirmed && setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <List
        items={items}
        onDeleteItems={handleDeleteItems}
        onToggleItems={handleToggleItems}
        onSortItems={handleSortItems}
        onClearListItem={handleClearListItem}
      />
      <Stats items={items} />
    </div>
  );
}
