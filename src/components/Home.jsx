/**
 * @file Home.jsx
 * @description Part 1 – Home Page Component.
 *              Displays the system title, dashboard heading, and a welcome
 *              message at the top of the Student Dashboard.
 */

/**
 * Home – header section of the Student Dashboard.
 *
 * @returns {JSX.Element}
 */
function Home() {
  return (
    <div className="home-section">
      <h1 className="system-title">Example UNI - Student Dashboard Portal V1.0</h1>
      <h2 className="dashboard-heading">Student Dashboard Portal</h2>
      <p className="welcome-message">
        Welcome! Manage and view student information below.
      </p>
    </div>
  );
}

export default Home;
