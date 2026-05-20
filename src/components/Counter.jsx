// Part 5 – useState Hook: Counter
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="section">
      <h3>Counter</h3>
      <p className="count-display">{count}</p>
      <button className="btn" onClick={() => setCount(count + 1)}>
        Increase
      </button>
    </div>
  );
}

export default Counter;
