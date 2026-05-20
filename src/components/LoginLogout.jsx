/**
 * @file LoginLogout.jsx
 * @description Part 7 – Conditional Rendering.
 *              Renders a login form when logged out and a welcome message when
 *              logged in. Credentials are hardcoded for demonstration purposes
 *              only — in a real system these would be verified against a backend.
 *
 *              Assumption:
 *              Admin username: admin
 *              Admin password: admin123
 */

import { useState } from "react";

/** Hardcoded admin credentials (demo only — not for production use). */
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

/**
 * LoginLogout – conditionally renders a credential form or a logged-in banner
 * depending on session state.
 *
 * @returns {JSX.Element}
 */
function LoginLogout() {
  const [isLoggedIn, setIsLoggedIn]   = useState(false);
  const [username, setUsername]       = useState("");
  const [password, setPassword]       = useState("");
  const [error, setError]             = useState("");
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Validates credentials against the hardcoded admin values.
   * Sets an error message on failure; updates session state on success.
   *
   * @param {React.FormEvent} e
   */
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Invalid username or password.");
    }
  };

  /** Clears session and resets the form fields. */
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

      {/* Conditionally render login form or logged-in state */}
      {isLoggedIn ? (
        <div className="logged-in-view">
          <p className="status logged-in">Logged in as <strong>{ADMIN_USERNAME}</strong></p>
          <button className="btn btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <form className="login-form" onSubmit={handleLogin}>
          {error && <p className="form-error">{error}</p>}

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

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              {/* Toggle password visibility */}
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
        </form>
      )}
    </div>
  );
}

export default LoginLogout;
