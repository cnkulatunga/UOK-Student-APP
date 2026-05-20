// Part 3 – Student Component (reusable, accepts props)
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
