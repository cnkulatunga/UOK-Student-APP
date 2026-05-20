/**
 * @file Student.jsx
 * @description Part 3 – Reusable Student Component.
 *              Renders a student card in view mode by default.
 *              Edit   – toggles an inline edit form pre-filled with current values.
 *              Save   – validates and lifts changes to App state via onEdit.
 *              Cancel – discards local edits and returns to view mode.
 *              Delete – prompts for confirmation via onDelete.
 *              Each card displays the auto-generated student ID.
 *
 *              Assumption: all three data props (name, course, age) are required.
 *              Age must be an integer between 16 and 99.
 */

import { useState } from "react";

/**
 * Student – displays and optionally edits or deletes a single student's details.
 *
 * @param {object}   props
 * @param {string}   props.id        - Auto-generated student ID (e.g. "STU-001").
 * @param {string}   props.name      - Full name of the student.
 * @param {string}   props.course    - Enrolled course / degree programme.
 * @param {number}   props.age       - Age of the student.
 * @param {number}   props.index     - Position in the parent students array.
 * @param {Function} props.onEdit    - Callback: onEdit(index, { name, course, age }).
 * @param {Function} props.onDelete  - Callback: onDelete(index, name).
 * @param {Function} props.showToast - Callback: showToast(message, type).
 * @returns {JSX.Element}
 */
function Student({ id, name, course, age, index, onEdit, onDelete, showToast }) {

  /** Controls whether the card renders in view mode or inline edit mode. */
  const [isEditing, setIsEditing] = useState(false);

  /**
   * Local copies of prop values used as controlled inputs while editing.
   * Kept separate so Cancel can revert without touching shared App state.
   */
  const [editName,   setEditName]   = useState(name);
  const [editCourse, setEditCourse] = useState(course);
  const [editAge,    setEditAge]    = useState(age);

  /** Inline validation error shown when Save is attempted with invalid data. */
  const [error, setError] = useState("");

  /**
   * Validates edited values; on success calls onEdit and returns to view mode.
   * Fires a success or error toast to give the user immediate feedback.
   */
  const handleSave = () => {
    if (!editName.trim() || !editCourse.trim() || !editAge) {
      const msg = "All fields are required.";
      setError(msg);
      showToast(msg, "error");
      return;
    }

    const parsedAge = parseInt(editAge, 10);
    if (isNaN(parsedAge) || parsedAge < 16 || parsedAge > 99) {
      const msg = "Age must be between 16 and 99.";
      setError(msg);
      showToast(msg, "error");
      return;
    }

    onEdit(index, { name: editName.trim(), course: editCourse.trim(), age: parsedAge });
    showToast(`${editName.trim()} updated successfully!`, "success");
    setError("");
    setIsEditing(false);
  };

  /**
   * Resets local edit state to current prop values and returns to view mode.
   * Does not affect shared App state.
   */
  const handleCancel = () => {
    setEditName(name);
    setEditCourse(course);
    setEditAge(age);
    setError("");
    setIsEditing(false);
  };

  /**
   * Delegates deletion to App which handles the confirmation prompt
   * and state update.
   */
  const handleDelete = () => {
    onDelete(index, name);
  };

  /* ── Edit mode ─────────────────────────────────────────────────────── */
  if (isEditing) {
    return (
      <div className="student-card student-card--editing">
        <p className="student-id">{id}</p>

        {/* Inline validation error — only rendered when Save fails */}
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

      {/* Auto-generated student ID badge */}
      <p className="student-id">{id}</p>

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
