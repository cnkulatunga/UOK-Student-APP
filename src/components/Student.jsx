/**
 * @file Student.jsx
 * @description Part 3 – Reusable Student Component.
 *              Accepts student details as props and renders them as a card.
 *              Assumption: all three props are required; no default values are
 *              set because missing data should be caught at the call site.
 */

/**
 * Student – displays a single student's name, course, and age.
 *
 * @param {object}  props
 * @param {string}  props.name   - Full name of the student.
 * @param {string}  props.course - Enrolled course / degree programme.
 * @param {number}  props.age    - Age of the student.
 * @returns {JSX.Element}
 */
function Student({ name, course, age }) {
  return (
    <div className="student-card">
      <p><span className="label">Name:</span> {name}</p>
      <p><span className="label">Course:</span> {course}</p>
      <p><span className="label">Age:</span> {age}</p>
    </div>
  );
}

export default Student;
