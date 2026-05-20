/**
 * @file Student.jsx
 * @description Part 3 – Reusable Student Component.
 *              Renders a student card in view mode by default.
 *              An Edit button toggles inline editing; Save calls onEdit to
 *              update shared state in App; Cancel discards local changes.
 */

import { useState } from "react";

/**
 * Student – displays and optionally edits a single student's details.
 *
 * @param {object}   props
 * @param {string}   props.name    - Full name of the student.
 * @param {string}   props.course  - Enrolled course / degree programme.
 * @param {number}   props.age     - Age of the student.
 * @param {number}   props.index   - Position in the students array (used by onEdit).
 * @param {Function} props.onEdit  - Callback: onEdit(index, { name, course, age }).
 * @returns {JSX.Element}
 */
function Student({ name, course, age, index, onEdit }) {
  const [isEditing, setIsEditing]   = useState(false);
  const [editName, setEditName]     = useState(name);
  const [editCourse, setEditCourse] = useState(course);
  const [editAge, setEditAge]       = useState(age);
  const [error, setError]           = useState("");

  /** Persist changes and return to view mode. */
  const handleSave = () => {
    if (!editName.trim() || !editCourse.trim() || !editAge) {
      setError("All fields are required.");
      return;
    }
    const parsedAge = parseInt(editAge, 10);
    if (isNaN(parsedAge) || parsedAge < 16 || parsedAge > 99) {
      setError("Age must be between 16 and 99.");
      return;
    }
    onEdit(index, { name: editName.trim(), course: editCourse.trim(), age: parsedAge });
    setError("");
    setIsEditing(false);
  };

  /** Discard changes and return to view mode. */
  const handleCancel = () => {
    setEditName(name);
    setEditCourse(course);
    setEditAge(age);
    setError("");
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="student-card student-card--editing">
        {error && <p className="card-error">{error}</p>}
        <div className="card-field">
          <label>Name</label>
          <input value={editName} onChange={(e) => setEditName(e.target.value)} />
        </div>
        <div className="card-field">
          <label>Course</label>
          <input value={editCourse} onChange={(e) => setEditCourse(e.target.value)} />
        </div>
        <div className="card-field">
          <label>Age</label>
          <input type="number" value={editAge} onChange={(e) => setEditAge(e.target.value)} />
        </div>
        <div className="card-actions">
          <button className="btn btn-save" onClick={handleSave}>Save</button>
          <button className="btn btn-cancel" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="student-card">
      <div className="card-avatar">{name.charAt(0)}</div>
      <p><span className="label">Name:</span> {name}</p>
      <p><span className="label">Course:</span> {course}</p>
      <p><span className="label">Age:</span> {age}</p>
      <button className="btn btn-edit" onClick={() => setIsEditing(true)}>
        Edit
      </button>
    </div>
  );
}

export default Student;
