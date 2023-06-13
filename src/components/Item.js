export default function Item({ itemObj, onDeteleItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={itemObj.packed}
        onChange={() => {
          onToggleItem(itemObj.id);
        }}
      />
      {/* if packed add stikethrough */}
      <span style={itemObj.packed ? { textDecoration: "line-through" } : {}}>
        {itemObj.quantity} {itemObj.description}
      </span>
      <button onClick={() => onDeteleItem(itemObj.id)}>❌</button>
    </li>
  );
}
