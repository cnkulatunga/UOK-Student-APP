// Part 6 – Lists & map(): Display student names from an array
const studentNames = [
  "Alice Fernando",
  "Brian Perera",
  "Chamari Silva",
  "Dinesh Rajapaksa",
  "Eshan Wickrama",
];

function StudentList() {
  return (
    <div className="section">
      <h3>Enrolled Students</h3>
      <ul className="student-list">
        {studentNames.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;
