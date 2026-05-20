/**
 * @file Stats.jsx
 * @description Statistics panel derived from the live students array.
 *              Displays total students, average age, and the most popular course.
 *              All values are computed at render time — no separate state needed.
 *
 *              Assumption: average age is rounded to the nearest integer.
 *              Ages are coerced to Number() before summing to guard against
 *              string values that may survive a localStorage round-trip.
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

  /**
   * Sum ages with explicit Number() coercion so string ages ("21") from
   * localStorage do not produce string concatenation instead of addition.
   * Returns null when there are no students so the display shows "—".
   */
  const avgAge = total
    ? Math.round(students.reduce((sum, s) => sum + Number(s.age), 0) / total)
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

  /**
   * Safe display helper — returns "—" for null or NaN, otherwise the value.
   * Using || instead of ?? so NaN (not caught by ??) also falls back to "—".
   *
   * @param {number|null} val
   * @returns {string|number}
   */
  const display = (val) => (val === null || isNaN(val) ? "—" : val);

  return (
    <div className="section stats-section">
      <h3>Statistics</h3>
      <div className="stats-grid">

        {/* Total enrolled students */}
        <div className="stat-card">
          <span className="stat-value">{total}</span>
          <p className="stat-label">Total Students</p>
        </div>

        {/* Average age — coerced to Number to avoid NaN from string ages */}
        <div className="stat-card">
          <span className="stat-value">{display(avgAge)}</span>
          <p className="stat-label">Average Age</p>
        </div>

        {/* Most popular course by enrolment count */}
        <div className="stat-card stat-card--wide">
          <span className="stat-value stat-value--sm">{topCourse}</span>
          <p className="stat-label">Most Popular Course</p>
        </div>

      </div>
    </div>
  );
}

export default Stats;
