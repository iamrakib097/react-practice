export default function ListItem({ x, onDeleteItems, onToggleItems }) {
  return (
    <>
      <li>
        <input
          type="checkbox"
          value={x.packed}
          onChange={() => onToggleItems(x.id)}
        />
        <span style={x.packed ? { textDecoration: "line-through" } : {}}>
          {x.quantity}
          {x.description}
        </span>
        <button onClick={() => onDeleteItems(x.id)}>❌</button>
      </li>
    </>
  );
}
