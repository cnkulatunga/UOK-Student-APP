/**
 * @file StudentList.jsx
 * @description Part 6 – Lists & map().
 *              Renders the live list of student names using .map() with keys.
 *              Assumption: the list is passed as a prop from App so it stays
 *              in sync with the students added via the form.
 */

/**
 * StudentList – renders a keyed list of student names from the students prop.
 *
 * @param {object}   props
 * @param {Array}    props.students - Array of student objects { name, course, age }.
 * @returns {JSX.Element}
 */
function StudentList({ students }) {
  return (
    <div className="section">
      <h3>Enrolled Students</h3>

      {students.length === 0 ? (
        // Empty state shown before any students are added
        <p className="empty-state">No students enrolled yet. Add one above.</p>
      ) : (
        <ul className="student-list">
          {students.map((student, index) => (
            // Index used as key — acceptable here since list only appends
            <li key={index}>{student.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StudentList;
