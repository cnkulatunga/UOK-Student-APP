/**
 * @file App.jsx
 * @description Root component of the Example UNI Student Dashboard.
 *              Owns all shared state and passes handlers to child components.
 *
 *              Features managed here:
 *                - Student CRUD  (add, edit, delete) with localStorage persistence
 *                - Auto-generated student IDs  (STU-001, STU-002 …)
 *                - Toast notification queue
 *                - Search / sort / course-filter for the profiles section
 *                - Dark mode  (applied via a CSS class on <body>)
 *                - Print / export  (window.print())
 *
 *              localStorage keys:
 *                "uniDashboardStudents"  – student array
 *                "uniDashboardNextId"    – next ID counter (persists across deletes)
 */

import { useState, useEffect, useCallback } from "react";
import Home           from "./components/Home";
import Student        from "./components/Student";
import Button         from "./components/Button";
import Counter        from "./components/Counter";
import StudentList    from "./components/StudentList";
import LoginLogout    from "./components/LoginLogout";
import AddStudentForm from "./components/AddStudentForm";
import Footer         from "./components/Footer";
import Toast          from "./components/Toast";
import Stats          from "./components/Stats";
import SearchSort     from "./components/SearchSort";

/** localStorage key for the students array. */
const STORAGE_KEY    = "uniDashboardStudents";

/** localStorage key for the auto-increment ID counter. */
const STORAGE_ID_KEY = "uniDashboardNextId";

/**
 * Reads and parses the students array from localStorage.
 * Returns an empty array on first load or if parsing fails.
 *
 * @returns {{ id: string, name: string, course: string, age: number }[]}
 */
function loadStudents() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return []; // Corrupted data — start fresh
  }
}

/**
 * Reads the next available ID counter from localStorage.
 * Returns 1 on first use.
 *
 * @returns {number}
 */
function loadNextId() {
  return parseInt(localStorage.getItem(STORAGE_ID_KEY) || "1", 10);
}

/**
 * Formats an integer as a padded student ID string.
 * e.g. formatId(3) → "STU-003"
 *
 * @param {number} n
 * @returns {string}
 */
function formatId(n) {
  return `STU-${String(n).padStart(3, "0")}`;
}

/**
 * App – top-level component.
 *
 * @returns {JSX.Element}
 */
function App() {

  /* ── Core data ─────────────────────────────────────────────────────── */

  /** Students array — single source of truth for all dashboard sections. */
  const [students, setStudents] = useState(loadStudents);

  /** Auto-increment counter used to assign unique IDs to new students. */
  const [nextId, setNextId] = useState(loadNextId);

  /* ── Persist to localStorage on every change ───────────────────────── */

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem(STORAGE_ID_KEY, String(nextId));
  }, [nextId]);

  /* ── Toast notification queue ──────────────────────────────────────── */

  /** Active toast objects: { id: number, message: string, type: string }[] */
  const [toasts, setToasts] = useState([]);

  /**
   * Adds a new toast to the queue.
   * Wrapped in useCallback so child components can safely list it as a
   * dependency in their own useEffect hooks without causing re-render loops.
   *
   * @param {string} message
   * @param {"success"|"error"|"info"} type
   */
  const showToast = useCallback((message, type = "info") => {
    const id = Date.now(); // Millisecond timestamp — unique enough for a toast queue
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  /**
   * Removes a toast by its id.
   * Called either by the auto-dismiss timer or the manual × button.
   *
   * @param {number} id
   */
  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  /* ── Dark mode ─────────────────────────────────────────────────────── */

  /** Whether dark mode is active; toggled by the button in Home. */
  const [isDark, setIsDark] = useState(false);

  /**
   * Apply or remove the "dark-mode" class on <body> whenever isDark changes.
   * Using <body> means all fixed-position elements (e.g. toast container)
   * also receive the dark theme without needing to pass props to every component.
   */
  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDark);
  }, [isDark]);

  /* ── Search / sort / course filter ─────────────────────────────────── */

  const [searchQuery,  setSearchQuery]  = useState("");
  const [sortBy,       setSortBy]       = useState("default");
  const [courseFilter, setCourseFilter] = useState("all");

  /**
   * Derives the list of unique course names from the students array.
   * Used to render the course filter tabs in SearchSort.
   */
  const uniqueCourses = [...new Set(students.map((s) => s.course))];

  /**
   * Derived view of students after applying search, course filter, and sort.
   * Computed inline — no extra state needed.
   */
  const displayedStudents = students
    .filter((s) => {
      // Search: match either name or course (case-insensitive)
      const q = searchQuery.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.course.toLowerCase().includes(q);
    })
    .filter((s) => courseFilter === "all" || s.course === courseFilter)
    .sort((a, b) => {
      switch (sortBy) {
        case "name-asc":  return a.name.localeCompare(b.name);
        case "name-desc": return b.name.localeCompare(a.name);
        case "age-asc":   return a.age - b.age;
        case "age-desc":  return b.age - a.age;
        default:          return 0; // "default" preserves insertion order
      }
    });

  /* ── CRUD handlers ─────────────────────────────────────────────────── */

  /**
   * Assigns a unique ID to the new student, appends it to the array,
   * and increments the ID counter.
   *
   * @param {{ name: string, course: string, age: number }} newStudent
   */
  const handleAddStudent = (newStudent) => {
    const id = formatId(nextId);
    setStudents((prev) => [...prev, { ...newStudent, id }]);
    setNextId((prev) => prev + 1);
  };

  /**
   * Replaces the student at the given index with updated values.
   * The student ID is preserved — only name, course, and age can change.
   *
   * @param {number}                                        index
   * @param {{ name: string, course: string, age: number }} updated
   */
  const handleEditStudent = (index, updated) => {
    setStudents((prev) =>
      prev.map((s, i) => (i === index ? { ...s, ...updated } : s))
    );
  };

  /**
   * Shows a confirmation prompt then removes the student if confirmed.
   * Also fires a toast so the user gets feedback after dismissing the prompt.
   *
   * @param {number} index
   * @param {string} name
   */
  const handleDeleteStudent = (index, name) => {
    const confirmed = window.confirm(`Remove ${name} from the dashboard?`);
    if (!confirmed) return;
    setStudents((prev) => prev.filter((_, i) => i !== index));
    showToast(`${name} removed.`, "info");
  };

  /* ── Print ─────────────────────────────────────────────────────────── */

  /** Triggers the browser's native print dialog. */
  const handlePrint = () => window.print();

  /* ── Render ─────────────────────────────────────────────────────────── */

  return (
    <div className="app-container">

      {/* Toast overlay — positioned fixed, rendered outside the normal flow */}
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* Part 1 – Home: title, heading, welcome + dark mode / print controls */}
      <Home isDark={isDark} onToggleDark={() => setIsDark(!isDark)} onPrint={handlePrint} />

      <div className="dashboard-grid">
        {/* Part 7 – Conditional rendering: admin login / logout */}
        <LoginLogout />

        {/* Part 5 – useState counter: reflects students.length automatically */}
        <Counter count={students.length} />
      </div>

      {/* Statistics panel: total, average age, most popular course */}
      <Stats students={students} />

      {/* Add New Student form */}
      <AddStudentForm onAdd={handleAddStudent} showToast={showToast} />

      {/* Part 3 – Student profiles with search, sort, course filter, edit, delete */}
      <div className="section">
        <h3>Student Profiles</h3>

        {/* Search / sort / course filter controls */}
        <SearchSort
          searchQuery={searchQuery}
          sortBy={sortBy}
          courseFilter={courseFilter}
          courses={uniqueCourses}
          onSearch={setSearchQuery}
          onSort={setSortBy}
          onCourseFilter={setCourseFilter}
        />

        {students.length === 0 ? (
          <p className="empty-state">No students yet. Add one using the form above.</p>
        ) : displayedStudents.length === 0 ? (
          /* No results after filtering — different message from truly empty list */
          <p className="empty-state">No students match your search or filter.</p>
        ) : (
          <div className="student-cards-grid">
            {displayedStudents.map((s, i) => (
              <Student
                key={s.id}
                index={students.indexOf(s)} // Use original array index for edit/delete
                id={s.id}
                name={s.name}
                course={s.course}
                age={s.age}
                onEdit={handleEditStudent}
                onDelete={handleDeleteStudent}
                showToast={showToast}
              />
            ))}
          </div>
        )}
      </div>

      {/* Part 4 – Reusable Button: contact info with alert messages */}
      <div className="section">
        <h3>Contact Info</h3>
        <Button label="Get Info"      message="Welcome to the Student Dashboard!" />
        <Button label="Contact Admin" message="Please email charithk@exampleuni.com" />
      </div>

      {/* Part 6 – Enrolled student names with .map() and keys */}
      <StudentList students={students} />

      {/* Footer: branding, module info, dynamic copyright year */}
      <Footer />

    </div>
  );
}

export default App;
