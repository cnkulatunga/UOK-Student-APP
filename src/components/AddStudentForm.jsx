/**
 * @file AddStudentForm.jsx
 * @description Form component for entering new student information.
 *              Validates inputs before calling the onAdd callback.
 *              Fires a success toast on submission and an error toast on
 *              validation failure.
 *
 *              Assumption: age must be a positive integer between 16 and 99.
 */

import { useState } from "react";

/**
 * AddStudentForm – controlled form that collects student name, course, and age.
 *
 * @param {object}   props
 * @param {Function} props.onAdd      - Callback invoked with { name, course, age }
 *                                      on successful submission.
 * @param {Function} props.showToast  - Callback to fire a toast notification:
 *                                      showToast(message, type).
 * @returns {JSX.Element}
 */
function AddStudentForm({ onAdd, showToast }) {
  // Controlled input state for each field
  const [name,   setName]   = useState("");
  const [course, setCourse] = useState("");
  const [age,    setAge]    = useState("");
  const [error,  setError]  = useState("");

  /**
   * Validates fields and delegates to the parent via onAdd.
   * Shows a success toast on valid submission or an error toast on failure.
   *
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Presence check — all fields are required
    if (!name.trim() || !course.trim() || !age) {
      const msg = "All fields are required.";
      setError(msg);
      showToast(msg, "error");
      return;
    }

    const parsedAge = parseInt(age, 10);
    if (isNaN(parsedAge) || parsedAge < 16 || parsedAge > 99) {
      const msg = "Age must be a number between 16 and 99.";
      setError(msg);
      showToast(msg, "error");
      return;
    }

    // Lift valid student data to App state
    onAdd({ name: name.trim(), course: course.trim(), age: parsedAge });
    showToast(`${name.trim()} added successfully!`, "success");

    // Reset form after successful submission
    setName("");
    setCourse("");
    setAge("");
    setError("");
  };

  return (
    <div className="section">
      <h3>Add New Student</h3>

      {/* Inline error banner — only rendered when validation fails */}
      {error && <p className="form-error">{error}</p>}

      <form className="student-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Student Name</label>
          <input
            id="name"
            type="text"
            placeholder="e.g. Alice Fernando"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="course">Course</label>
          <input
            id="course"
            type="text"
            placeholder="e.g. BSc Computer Science"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="number"
            placeholder="e.g. 21"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Student
        </button>
      </form>
    </div>
  );
}

export default AddStudentForm;
