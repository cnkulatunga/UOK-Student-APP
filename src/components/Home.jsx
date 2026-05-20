/**
 * @file Home.jsx
 * @description Part 1 – Home Page Component.
 *              Displays the portal title, dashboard heading, and welcome message.
 *              Also renders the dark mode toggle and print button in the header.
 *
 *              Note: unicode symbols (☀, ☾, ⎙) were removed as they do not
 *              render reliably on all Windows fonts — plain text is used instead.
 */

/**
 * Home – header section of the Student Dashboard.
 *
 * @param {object}   props
 * @param {boolean}  props.isDark       - Whether dark mode is currently active.
 * @param {Function} props.onToggleDark - Callback to toggle dark mode on/off.
 * @param {Function} props.onPrint      - Callback that triggers window.print().
 * @returns {JSX.Element}
 */
function Home({ isDark, onToggleDark, onPrint }) {
  return (
    <div className="home-section">

      {/* Utility buttons: dark mode toggle and print/export */}
      <div className="home-actions">
        <button className="home-btn" onClick={onToggleDark}>
          {isDark ? "Light Mode" : "Dark Mode"}
        </button>
        <button className="home-btn" onClick={onPrint}>
          Print
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
