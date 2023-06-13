export default function Stats({ itemsArray }) {
  //if no items are added, return this <p>
  if (!itemsArray.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );

  const numItems = itemsArray.length;
  const numPacked = itemsArray.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You've got everything! Ready to go ✈️"
          : `👜 You have ${numItems} items on your list, and you already packed ${" "}
        ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
