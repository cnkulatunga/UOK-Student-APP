/**
 * @file Counter.jsx
 * @description Part 5 – useState Hook.
 *              Demonstrates React state management with a simple numeric counter.
 *              Assumption: counter starts at 0 and only increments (no reset or
 *              decrement required by the assignment spec).
 */

import { useState } from "react";

/**
 * Counter – displays a count value and an Increase button.
 * Uses the useState hook to manage and update the count.
 *
 * @returns {JSX.Element}
 */
function Counter() {
  // Initialise count at 0; setCount triggers a re-render on each update
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
