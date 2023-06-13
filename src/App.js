import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  //add new item to the array
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  // detele an item from the array
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  //updates the packed status (true/false)
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  // reset button
  function handleReset() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (!confirmed) return;
    setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeteleItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onReset={handleReset}
      />
      <Stats itemsArray={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴Far Away💼</h1>;
}

function Form({ onAddItems }) {
  const [description, setDesription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    //if user submits and empty description, return immediately
    if (!description) return;

    //create new Item, when form is submitted, packed is false by default
    const newItem = { id: Date.now(), description, quantity, packed: false };
    console.log(newItem);

    onAddItems(newItem);

    // when submitted, set select and input back to one and empty string
    setDesription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {/* make a list 1 to 20, using Array method and map over these, for each one create an option */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDesription(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeteleItem, onToggleItem, onReset }) {
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
function Stats({ itemsArray }) {
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

function Item({ itemObj, onDeteleItem, onToggleItem }) {
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
