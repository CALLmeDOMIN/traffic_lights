import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4">
      <h1 className="text-5xl">Hello World!</h1>
      <h1 className="text-4xl">Vite + React</h1>
      <button
        className="rounded-md border bg-gray-800 p-2"
        onClick={() => setCount((count) => count + 1)}
      >
        count is {count}
      </button>
    </div>
  );
}

export default App;
