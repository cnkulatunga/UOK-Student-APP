/**
 * @file App.jsx
 * @description Root component — owns the students state and passes handlers
 *              down to child components for adding and editing students.
 *              Assumption: data is held in memory only; a refresh resets to
 *              the initial seed data.
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
 * Seed data pre-loaded so the dashboard is not empty on first load.
 * @type {{ name: string, course: string, age: number }[]}
 */
const initialStudents = [
  { name: "Alice Fernando", course: "BSc Computer Science", age: 21 },
  { name: "Brian Perera", course: "BSc Information Technology", age: 22 },
  { name: "Chamari Silva", course: "BSc Software Engineering", age: 20 },
];

/**
 * App – top-level component that owns the students state.
 * Adding or editing a student automatically updates the counter, cards, and list.
 *
 * @returns {JSX.Element}
 */
function App() {
  // Single source of truth for all student data across the dashboard
  const [students, setStudents] = useState(initialStudents);

  /**
   * Appends a new student to the list.
   * @param {{ name: string, course: string, age: number }} newStudent
   */
  const handleAddStudent = (newStudent) => {
    setStudents((prev) => [...prev, newStudent]);
  };

  /**
   * Replaces the student at the given index with updated data.
   * @param {number} index
   * @param {{ name: string, course: string, age: number }} updated
   */
  const handleEditStudent = (index, updated) => {
    setStudents((prev) =>
      prev.map((s, i) => (i === index ? updated : s))
    );
  };

  return (
    <div className="app-container">
      {/* Part 1 – Home: title, heading, and welcome message */}
      <Home />

      <div className="dashboard-grid">
        {/* Part 7 – Conditional rendering: login / logout toggle */}
        <LoginLogout />

        {/* Part 5 – Counter: auto-updates as students.length changes */}
        <Counter count={students.length} />
      </div>

      {/* Student entry form — new submissions flow into shared state */}
      <AddStudentForm onAdd={handleAddStudent} />

      {/* Part 3 – Student cards with inline edit support */}
      <div className="section">
        <h3>Student Profiles</h3>
        {students.length === 0 ? (
          <p className="empty-state">No students yet. Add one using the form above.</p>
        ) : (
          <div className="student-cards-grid">
            {students.map((s, i) => (
              <Student
                key={i}
                index={i}
                name={s.name}
                course={s.course}
                age={s.age}
                onEdit={handleEditStudent}
              />
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
