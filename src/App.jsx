/**
 * @file App.jsx
 * @description Root component that composes all dashboard sections.
 *              Holds the shared students state so the form, counter, student
 *              cards, and student list all stay in sync automatically.
 *              Assumption: data is held in memory (no persistence); refreshing
 *              the page resets the list to the initial seed data.
 */

import { useState } from "react";
import Home from "./components/Home";
import Student from "./components/Student";
import Button from "./components/Button";
import Counter from "./components/Counter";
import StudentList from "./components/StudentList";
import LoginLogout from "./components/LoginLogout";
import AddStudentForm from "./components/AddStudentForm";

/**
 * Seed data — pre-loaded so the dashboard is not empty on first load.
 * @type {{ name: string, course: string, age: number }[]}
 */
const initialStudents = [
  { name: "Alice Fernando", course: "BSc Computer Science", age: 21 },
  { name: "Brian Perera", course: "BSc Information Technology", age: 22 },
  { name: "Chamari Silva", course: "BSc Software Engineering", age: 20 },
];

/**
 * App – top-level component that owns the students state and passes it down
 * to child components. Adding a student via the form automatically updates
 * the counter, student cards, and enrolled list.
 *
 * @returns {JSX.Element}
 */
function App() {
  // Single source of truth for all student data across the dashboard
  const [students, setStudents] = useState(initialStudents);

  /**
   * Appends a new student to the list.
   * Called by AddStudentForm on valid submission.
   *
   * @param {{ name: string, course: string, age: number }} newStudent
   */
  const handleAddStudent = (newStudent) => {
    setStudents((prev) => [...prev, newStudent]);
  };

  return (
    <div className="app-container">
      {/* Part 1 – Home: title, heading, and welcome message */}
      <Home />

      {/* Part 7 – Conditional rendering: login / logout toggle */}
      <LoginLogout />

      {/* Part 5 – Counter: auto-updates as students.length changes */}
      <Counter count={students.length} />

      {/* Student entry form — new submissions flow into shared state */}
      <AddStudentForm onAdd={handleAddStudent} />

      {/* Part 3 – Reusable Student component rendered via props */}
      <div className="section">
        <h3>Student Profiles</h3>
        {students.length === 0 ? (
          <p className="empty-state">No students yet. Add one using the form above.</p>
        ) : (
          <div className="student-cards-grid">
            {students.map((s, i) => (
              <Student key={i} name={s.name} course={s.course} age={s.age} />
            ))}
          </div>
        )}
      </div>

      {/* Part 4 – Reusable Button; each instance carries its own alert message */}
      <div className="section">
        <h3>Actions</h3>
        <Button label="Get Info" message="Welcome to the Student Dashboard!" />
        <Button label="Contact Admin" message="Please email charithk@exampleuni.com" />
      </div>

      {/* Part 6 – Lists rendered with .map() — driven by shared students state */}
      <StudentList students={students} />
    </div>
  );
}

export default App;
