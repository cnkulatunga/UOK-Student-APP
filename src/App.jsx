/**
 * @file App.jsx
 * @description Root component of the Example UNI Student Dashboard.
 *              Owns the shared students state and passes add/edit handlers
 *              down to child components so every section stays in sync.
 *
 *              Assumption: data is held in React state (in-memory only).
 *              Refreshing the page resets the list to empty because no
 *              persistence layer (localStorage, API) is implemented in this phase.
 */

import { useState } from "react";
import Home          from "./components/Home";
import Student       from "./components/Student";
import Button        from "./components/Button";
import Counter       from "./components/Counter";
import StudentList   from "./components/StudentList";
import LoginLogout   from "./components/LoginLogout";
import AddStudentForm from "./components/AddStudentForm";
import Footer        from "./components/Footer";

/**
 * Dashboard starts with an empty list.
 * All student records must be entered through the Add New Student form.
 * @type {{ name: string, course: string, age: number }[]}
 */
const initialStudents = [];

/**
 * App – top-level component that owns the students state.
 * Adding or editing a student automatically updates the counter,
 * student profile cards, and the enrolled names list.
 *
 * @returns {JSX.Element}
 */
function App() {
  /**
   * Single source of truth for all student data across the dashboard.
   * Child components receive slices of this state as props — they never
   * mutate it directly; changes flow back up via handler callbacks.
   */
  const [students, setStudents] = useState(initialStudents);

  /**
   * Appends a validated new student to the students array.
   * Triggered by AddStudentForm on successful form submission.
   *
   * @param {{ name: string, course: string, age: number }} newStudent
   */
  const handleAddStudent = (newStudent) => {
    setStudents((prev) => [...prev, newStudent]);
  };

  /**
   * Replaces the student at the given index with updated field values.
   * Triggered by the Student card's inline edit Save action.
   *
   * @param {number}                                        index   - Array position to update.
   * @param {{ name: string, course: string, age: number }} updated - New values for that student.
   */
  const handleEditStudent = (index, updated) => {
    setStudents((prev) =>
      prev.map((s, i) => (i === index ? updated : s))
    );
  };

  return (
    <div className="app-container">

      {/* Part 1 – Home: portal title, dashboard heading, welcome message */}
      <Home />

      <div className="dashboard-grid">
        {/* Part 7 – Conditional rendering: admin login / logout form */}
        <LoginLogout />

        {/* Part 5 – useState-driven counter: reflects students.length automatically */}
        <Counter count={students.length} />
      </div>

      {/* Add New Student form — valid submissions are lifted into students state */}
      <AddStudentForm onAdd={handleAddStudent} />

      {/* Part 3 – Reusable Student component: one card per entry, with inline edit */}
      <div className="section">
        <h3>Student Profiles</h3>
        {students.length === 0 ? (
          /* Empty-state message shown until the first student is added */
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

      {/* Part 4 – Reusable Button: each instance carries its own alert message */}
      <div className="section">
        <h3>Contact Info</h3>
        <Button label="Get Info"       message="Welcome to the Student Dashboard!" />
        <Button label="Contact Admin"  message="Please email charithk@exampleuni.com" />
      </div>

      {/* Part 6 – Enrolled student names rendered with .map() and keyed list items */}
      <StudentList students={students} />

      {/* Footer: branding, module info, dynamic copyright year */}
      <Footer />

    </div>
  );
}

export default App;
