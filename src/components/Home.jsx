/**
 * @file Home.jsx
 * @description Part 1 – Home Page Component.
 *              Displays the system title, dashboard heading, and welcome message.
 *              Also renders the dark mode toggle and print/export button in the
 *              top-right corner of the header banner.
 */

/**
 * Home – header section of the Student Dashboard.
 *
 * @param {object}   props
 * @param {boolean}  props.isDark        - Whether dark mode is currently active.
 * @param {Function} props.onToggleDark  - Callback to toggle dark mode on/off.
 * @param {Function} props.onPrint       - Callback that triggers window.print().
 * @returns {JSX.Element}
 */
function Home({ isDark, onToggleDark, onPrint }) {
  return (
    <div className="home-section">

      {/* Top-right utility buttons: dark mode toggle and print */}
      <div className="home-actions">
        <button className="home-btn" onClick={onToggleDark} title="Toggle dark mode">
          {isDark ? "☀ Light" : "☾ Dark"}
        </button>
        <button className="home-btn" onClick={onPrint} title="Print dashboard">
          ⎙ Print
        </button>
      </div>

      <h1 className="system-title">Example UNI - Student Dashboard Portal V1.0</h1>
      <h2 className="dashboard-heading">Student Dashboard Portal</h2>
      <p className="welcome-message">
        Welcome! Manage and view student information below.
      </p>

    </div>
  );
}

export default Home;
