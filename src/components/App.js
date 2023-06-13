import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

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
