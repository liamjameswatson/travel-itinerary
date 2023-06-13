import { useState } from "react";

export default function Form({ onAddItems }) {
  const [description, setDesription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    //if user submits and empty description, return immediately
    if (!description) return;

    //create new Item, when form is submitted, packed is false by default
    const newItem = { id: Date.now(), description, quantity, packed: false };

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
