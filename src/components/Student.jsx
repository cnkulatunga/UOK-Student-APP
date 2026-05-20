/**
 * @file Student.jsx
 * @description Part 3 – Reusable Student Component.
 *              Renders a student card in view mode by default.
 *              Edit  – toggles an inline edit form pre-filled with current values.
 *              Save  – validates and lifts changes to App state via onEdit.
 *              Cancel – discards local edits and returns to view mode.
 *              Delete – prompts for confirmation then calls onDelete.
 *
 *              Assumption: all three data props (name, course, age) are required.
 *              Age must be an integer between 16 and 99.
 */

import { useState } from "react";

/**
 * Student – displays and optionally edits or deletes a single student's details.
 *
 * @param {object}   props
 * @param {string}   props.name     - Full name of the student.
 * @param {string}   props.course   - Enrolled course / degree programme.
 * @param {number}   props.age      - Age of the student.
 * @param {number}   props.index    - Position in the parent students array;
 *                                    passed back through onEdit / onDelete so
 *                                    App can target the correct record.
 * @param {Function} props.onEdit   - Callback: onEdit(index, { name, course, age }).
 * @param {Function} props.onDelete - Callback: onDelete(index, name).
 * @returns {JSX.Element}
 */
function Student({ name, course, age, index, onEdit, onDelete }) {

  /** Controls whether the card renders in view mode or inline edit mode. */
  const [isEditing, setIsEditing] = useState(false);

  /**
   * Local copies of the prop values used as controlled inputs while editing.
   * Kept separate from props so Cancel can revert without touching shared state.
   */
  const [editName,   setEditName]   = useState(name);
  const [editCourse, setEditCourse] = useState(course);
  const [editAge,    setEditAge]    = useState(age);

  /** Validation error shown inside the card when Save is attempted with bad data. */
  const [error, setError] = useState("");

  /**
   * Validates the edited values and, if valid, calls onEdit to update
   * the shared state in App, then returns the card to view mode.
   */
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

    // Lift the validated update to App state
    onEdit(index, { name: editName.trim(), course: editCourse.trim(), age: parsedAge });
    setError("");
    setIsEditing(false);
  };

  /**
   * Discards any edits by resetting local state back to the current prop values,
   * then returns the card to view mode without touching shared state.
   */
  const handleCancel = () => {
    setEditName(name);
    setEditCourse(course);
    setEditAge(age);
    setError("");
    setIsEditing(false);
  };

  /**
   * Delegates to the onDelete callback in App.
   * The confirmation prompt lives in App so the delete logic stays centralised.
   */
  const handleDelete = () => {
    onDelete(index, name);
  };

  /* ── Edit mode ─────────────────────────────────────────────────────── */
  if (isEditing) {
    return (
      <div className="student-card student-card--editing">

        {/* Inline validation error — only shown when Save fails */}
        {error && <p className="card-error">{error}</p>}

        <div className="card-field">
          <label>Name</label>
          <input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
        </div>

        <div className="card-field">
          <label>Course</label>
          <input
            value={editCourse}
            onChange={(e) => setEditCourse(e.target.value)}
          />
        </div>

        <div className="card-field">
          <label>Age</label>
          <input
            type="number"
            value={editAge}
            onChange={(e) => setEditAge(e.target.value)}
          />
        </div>

        <div className="card-actions">
          <button className="btn btn-save"   onClick={handleSave}>Save</button>
          <button className="btn btn-cancel" onClick={handleCancel}>Cancel</button>
        </div>

      </div>
    );
  }

  /* ── View mode ─────────────────────────────────────────────────────── */
  return (
    <div className="student-card">
      {/* Avatar initial — first letter of the student's name */}
      <div className="card-avatar">{name.charAt(0)}</div>

      <p><span className="label">Name:</span>   {name}</p>
      <p><span className="label">Course:</span> {course}</p>
      <p><span className="label">Age:</span>    {age}</p>

      <div className="card-actions">
        <button className="btn btn-edit"   onClick={() => setIsEditing(true)}>Edit</button>
        <button className="btn btn-delete" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default Student;
