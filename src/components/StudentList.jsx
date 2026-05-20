/**
 * @file StudentList.jsx
 * @description Part 6 – Lists & map().
 *              Renders a static array of student names as an unordered list.
 *              Assumption: data is hardcoded for this phase. The array index is
 *              used as the key because the list is static and never reordered;
 *              a unique ID should be used if the list becomes dynamic.
 */

/**
 * Static list of enrolled student names.
 * Defined outside the component to avoid re-creation on every render.
 * @type {string[]}
 */
const studentNames = [
  "Alice Fernando",
  "Brian Perera",
  "Chamari Silva",
  "Dinesh Rajapaksa",
  "Eshan Wickrama",
];

/**
 * StudentList – renders the studentNames array using .map() with keyed list items.
 *
 * @returns {JSX.Element}
 */
function StudentList() {
  return (
    <div className="section">
      <h3>Enrolled Students</h3>
      <ul className="student-list">
        {studentNames.map((name, index) => (
          // key is required by React to efficiently reconcile list updates
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;
