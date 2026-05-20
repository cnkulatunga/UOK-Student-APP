/**
 * @file Stats.jsx
 * @description Statistics panel derived from the live students array.
 *              Displays total students, average age, and the most popular course.
 *              All values are computed at render time — no separate state needed.
 *
 *              Assumption: average age is rounded to the nearest integer.
 *              "Most popular course" is the course with the highest enrolment count;
 *              ties are broken by whichever course appears first in the array.
 */

/**
 * Stats – renders a three-card summary panel above the student profiles.
 *
 * @param {object} props
 * @param {{ name: string, course: string, age: number, id: string }[]} props.students
 * @returns {JSX.Element}
 */
function Stats({ students }) {
  const total = students.length;

  /** Compute average age; show "—" when there are no students. */
  const avgAge = total
    ? Math.round(students.reduce((sum, s) => sum + s.age, 0) / total)
    : null;

  /**
   * Tally enrolments per course then pick the course with the highest count.
   * Returns "N/A" when the student list is empty.
   */
  const topCourse = (() => {
    if (!total) return "N/A";
    const counts = {};
    students.forEach((s) => {
      counts[s.course] = (counts[s.course] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  })();

  return (
    <div className="section stats-section">
      <h3>Statistics</h3>
      <div className="stats-grid">

        {/* Total enrolled students */}
        <div className="stat-card">
          <p className="stat-value">{total}</p>
          <p className="stat-label">Total Students</p>
        </div>

        {/* Average age across all students */}
        <div className="stat-card">
          <p className="stat-value">{avgAge ?? "—"}</p>
          <p className="stat-label">Average Age</p>
        </div>

        {/* Course with the highest number of enrolled students */}
        <div className="stat-card stat-card--wide">
          <p className="stat-value stat-value--sm">{topCourse}</p>
          <p className="stat-label">Most Popular Course</p>
        </div>

      </div>
    </div>
  );
}

export default Stats;
