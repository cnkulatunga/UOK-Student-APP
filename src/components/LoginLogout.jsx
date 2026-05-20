/**
 * @file LoginLogout.jsx
 * @description Part 7 – Conditional Rendering.
 *              Renders an admin login form when the user is logged out and a
 *              confirmation banner when logged in. Credentials are hardcoded
 *              for demonstration purposes only.
 *
 *              Assumption: authentication is simulated with a boolean flag and
 *              hardcoded credentials. A production system would validate against
 *              a secure backend and use token-based session management.
 *
 *              Admin credentials (demo):
 *                Username: admin
 *                Password: admin
 */

import { useState } from "react";

/**
 * Hardcoded admin credentials.
 * Defined as module-level constants so they are easy to locate and update
 * without searching through component logic.
 *
 * @constant {string} ADMIN_USERNAME
 * @constant {string} ADMIN_PASSWORD
 */
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin";

/**
 * LoginLogout – conditionally renders either a credential entry form
 * (logged-out state) or a session confirmation banner (logged-in state).
 * Demonstrates React conditional rendering using the ternary operator.
 *
 * @returns {JSX.Element}
 */
function LoginLogout() {
  /** Tracks whether the admin is currently authenticated. */
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /** Controlled value for the username input field. */
  const [username, setUsername] = useState("");

  /** Controlled value for the password input field. */
  const [password, setPassword] = useState("");

  /** Validation error message shown when login credentials are incorrect. */
  const [error, setError] = useState("");

  /**
   * Controls whether the password field renders as plain text or masked.
   * Toggled by the Show / Hide button beside the password input.
   */
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Handles login form submission.
   * Compares entered credentials against the hardcoded admin values.
   * Sets an error message on mismatch; advances to logged-in state on success.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - Form submit event.
   */
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default browser form submission / page reload

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setError(""); // Clear any previous error on successful login
    } else {
      setError("Invalid username or password.");
    }
  };

  /**
   * Handles logout action.
   * Resets all local state so the login form renders cleanly on next visit.
   */
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setError("");
    setShowPassword(false);
  };

  return (
    <div className="section login-section">
      <h3>Login Session</h3>

      {/*
       * Conditional render:
       *   isLoggedIn === true  → show the logged-in confirmation banner
       *   isLoggedIn === false → show the credential entry form
       */}
      {isLoggedIn ? (
        <div className="logged-in-view">
          <p className="status logged-in">
            Logged in as <strong>{ADMIN_USERNAME}</strong>
          </p>
          <button className="btn btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <form className="login-form" onSubmit={handleLogin}>

          {/* Error banner — only mounted when the error state is non-empty */}
          {error && <p className="form-error">{error}</p>}

          {/* Username field */}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>

          {/* Password field with show/hide visibility toggle */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"} // Toggle input type to reveal/mask
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Login</button>

          {/* Credential hint for demonstration / assessment purposes */}
          <p className="login-hint">
            Use username: <strong>admin</strong> &amp; password: <strong>admin</strong>
          </p>

        </form>
      )}
    </div>
  );
}

export default LoginLogout;
