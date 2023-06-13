import { useState } from "react";


export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴Far Away💼</h1>;
}

function Form({onAddItems}) {
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

function PackingList({ items }) {
  return (
    <div className="list">
      <ul>
        {/* for each item  render an Item compopent*/}
        {items.map((item) => (
          <Item itemObj={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em>👜 You have X items on your list, and you already packed X (%)</em>
    </footer>
  );
}

function Item({ itemObj }) {
  return (
    <li>
      {/* if packed add stikethrough */}
      <span style={itemObj.packed ? { textDecoration: "line-through" } : {}}>
        {itemObj.quantity} {itemObj.description}
      </span>
      <button>❌</button>
    </li>
  );
}
