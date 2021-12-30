import {useState} from 'react';


interface CounterProps {
  count: number;
}

export default function Counter ({count: initialCount}: CounterProps) {
  const [count, setCount] = useState(initialCount);

  async function updateCountBackend (newCount: number): Promise<number> {
    const response = await fetch('/api/update-server-counter', {
      method: 'POST',
      body: JSON.stringify({counter: newCount}),
      headers: {'Content-Type': 'application/json'},
    });

    const {counter} = await response.json();

    return counter;
  }

  async function incrementCount () {
    const newCount = await updateCountBackend(count + 1);
    setCount(newCount);
  }

  async function resetCount () {
    const newCount = await updateCountBackend(0);
    setCount(newCount);
  }

  return (
    <div>
      {count}
      <br />
      <button type="button" onClick={incrementCount}>Increment</button>
      <button type="button" onClick={resetCount}>Reset</button>
    </div>
  );
}
