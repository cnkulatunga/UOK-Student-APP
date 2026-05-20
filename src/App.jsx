/**
 * @file App.jsx
 * @description Root component that composes all dashboard sections.
 *              Assumption: student data is static for this phase; in a real
 *              system it would be fetched from an API.
 */

import Home from "./components/Home";
import Student from "./components/Student";
import Button from "./components/Button";
import Counter from "./components/Counter";
import StudentList from "./components/StudentList";
import LoginLogout from "./components/LoginLogout";

/**
 * Static student records used to demonstrate the Student component with props.
 * @type {{ name: string, course: string, age: number }[]}
 */
const students = [
  { name: "Alice Fernando", course: "BSc Computer Science", age: 21 },
  { name: "Brian Perera", course: "BSc Information Technology", age: 22 },
  { name: "Chamari Silva", course: "BSc Software Engineering", age: 20 },
];

/**
 * App – top-level component that renders the full Student Dashboard.
 * Each section maps to a specific assignment part.
 *
 * @returns {JSX.Element}
 */
function App() {
  return (
    <div className="app-container">
      {/* Part 1 – Home: title, heading, and welcome message */}
      <Home />

      {/* Part 7 – Conditional rendering: login / logout toggle */}
      <LoginLogout />

      {/* Part 3 – Reusable Student component rendered via props */}
      <div className="section">
        <h3>Student Profiles</h3>
        <div className="student-cards-grid">
          {students.map((s, i) => (
            <Student key={i} name={s.name} course={s.course} age={s.age} />
          ))}
        </div>
      </div>

      {/* Part 4 – Reusable Button component; each instance carries its own alert message */}
      <div className="section">
        <h3>Actions</h3>
        <Button label="Get Info" message="Welcome to the Student Dashboard!" />
        <Button label="Contact Admin" message="Please email admin@university.edu" />
      </div>

      {/* Part 5 – useState hook: interactive counter */}
      <Counter />

      {/* Part 6 – Lists rendered with .map() and unique keys */}
      <StudentList />
    </div>
  );
}

export default App;
