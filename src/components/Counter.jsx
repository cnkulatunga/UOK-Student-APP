/**
 * @file Counter.jsx
 * @description Part 5 – useState Hook.
 *              Displays the total number of registered students.
 *              The count is driven by the students array in App.jsx (useState)
 *              and passed in as a prop so the counter stays in sync with the
 *              rest of the dashboard automatically.
 */

/**
 * Counter – shows the current student count.
 *
 * @param {object} props
 * @param {number} props.count - Total number of students; controlled by parent state.
 * @returns {JSX.Element}
 */
function Counter({ count }) {
  return (
    <div className="section counter-section">
      <h3>Total Students</h3>
      <p className="count-display">{count}</p>
      <p className="count-label">students registered</p>
    </div>
  );
}

export default Counter;
