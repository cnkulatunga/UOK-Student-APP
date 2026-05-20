/**
 * @file App.jsx
 * @description Root component of the Example UNI Student Dashboard.
 *              Owns the shared students state and passes add / edit / delete
 *              handlers down to child components so every section stays in sync.
 *
 *              Persistence: the students array is saved to localStorage on every
 *              change and reloaded on mount, so data survives page refreshes.
 *
 *              localStorage key: "uniDashboardStudents"
 */

import { useState, useEffect } from "react";
import Home           from "./components/Home";
import Student        from "./components/Student";
import Button         from "./components/Button";
import Counter        from "./components/Counter";
import StudentList    from "./components/StudentList";
import LoginLogout    from "./components/LoginLogout";
import AddStudentForm from "./components/AddStudentForm";
import Footer         from "./components/Footer";

/** Key used to read and write student data in localStorage. */
const STORAGE_KEY = "uniDashboardStudents";

/**
 * Reads the students array from localStorage.
 * Returns an empty array if no data has been saved yet or if parsing fails.
 *
 * @returns {{ name: string, course: string, age: number }[]}
 */
function loadStudents() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    // Corrupted data — start fresh rather than crashing
    return [];
  }
}

/**
 * App – top-level component that owns the students state.
 * Adding, editing, or deleting a student automatically updates the counter,
 * student profile cards, enrolled names list, and localStorage.
 *
 * @returns {JSX.Element}
 */
function App() {
  /**
   * Initialise state from localStorage so previously entered students are
   * restored on page refresh. Falls back to an empty array on first load.
   */
  const [students, setStudents] = useState(loadStudents);

  /**
   * Persist the students array to localStorage whenever it changes.
   * useEffect runs after every render where `students` has changed.
   */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }, [students]);

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

  /**
   * Removes the student at the given index after the user confirms the action.
   * window.confirm() is used as a lightweight guard against accidental deletion.
   * Triggered by the Delete button on each Student card.
   *
   * @param {number} index - Array position of the student to remove.
   * @param {string} name  - Student name shown in the confirmation prompt.
   */
  const handleDeleteStudent = (index, name) => {
    const confirmed = window.confirm(`Remove ${name} from the dashboard?`);
    if (!confirmed) return;
    setStudents((prev) => prev.filter((_, i) => i !== index));
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

      {/* Part 3 – Reusable Student component: one card per entry, with edit and delete */}
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
                onDelete={handleDeleteStudent}
              />
            ))}
          </div>
        )}
      </div>

      {/* Part 4 – Reusable Button: each instance carries its own alert message */}
      <div className="section">
        <h3>Contact Info</h3>
        <Button label="Get Info"      message="Welcome to the Student Dashboard!" />
        <Button label="Contact Admin" message="Please email charithk@exampleuni.com" />
      </div>

      {/* Part 6 – Enrolled student names rendered with .map() and keyed list items */}
      <StudentList students={students} />

      {/* Footer: branding, module info, dynamic copyright year */}
      <Footer />

    </div>
  );
}

export default App;
