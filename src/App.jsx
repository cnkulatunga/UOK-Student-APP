import Home from "./components/Home";
import Student from "./components/Student";
import Button from "./components/Button";
import Counter from "./components/Counter";
import StudentList from "./components/StudentList";
import LoginLogout from "./components/LoginLogout";

// Sample student data passed as props (Part 3)
const students = [
  { name: "Alice Fernando", course: "BSc Computer Science", age: 21 },
  { name: "Brian Perera", course: "BSc Information Technology", age: 22 },
  { name: "Chamari Silva", course: "BSc Software Engineering", age: 20 },
];

function App() {
  return (
    <div className="app-container">
      {/* Part 1 – Home Page */}
      <Home />

      {/* Part 7 – Login / Logout */}
      <LoginLogout />

      {/* Part 3 – Student Cards */}
      <div className="section">
        <h3>Student Profiles</h3>
        <div className="student-cards-grid">
          {students.map((s, i) => (
            <Student key={i} name={s.name} course={s.course} age={s.age} />
          ))}
        </div>
      </div>

      {/* Part 4 – Reusable Button */}
      <div className="section">
        <h3>Actions</h3>
        <Button label="Get Info" message="Welcome to the Student Dashboard!" />
        <Button label="Contact Admin" message="Please email admin@university.edu" />
      </div>

      {/* Part 5 – Counter */}
      <Counter />

      {/* Part 6 – Student List */}
      <StudentList />
    </div>
  );
}

export default App;
