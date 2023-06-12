export default function App() {
  <div>
    <Logo />
    <Form />
    <PackingList />
    <Stats />
  </div>;
}

function Logo() {
  return <h1>🌴Far Away💼</h1>;
}

function Form() {
  return (
    <div>
      <h3>What do you need for your 😍 trip?</h3>
    </div>
  );
}

function PackingList() {
  return (
    <div>List</div>
  )
}

function Stats() {}
