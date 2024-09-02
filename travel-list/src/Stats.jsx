import { useState } from "react";

export default function Stats({ items }) {
  const numPacked = items.filter((item) => item.packed === true).length;
  return (
    <footer className="stats">
      You have {items.length} items on your list, and you already packed{" "}
      {numPacked}({Math.round((numPacked / items.length) * 100)}%)
    </footer>
  );
}
