/**
 * @file LoginLogout.jsx
 * @description Part 7 – Conditional Rendering.
 *              Demonstrates conditional rendering by toggling between a
 *              logged-in and logged-out state using the useState hook.
 *              Assumption: authentication is simulated with a boolean flag.
 *              No real auth logic (tokens, sessions) is implemented as this
 *              is a UI demonstration only.
 */

import { useState } from "react";

/**
 * LoginLogout – toggles session state and conditionally renders a status message
 * and button label based on whether the user is logged in.
 *
 * @returns {JSX.Element}
 */
function LoginLogout() {
  // false = logged out by default; toggled on button click
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="section login-section">
      <h3>Session</h3>

      {/* Conditionally render status message based on login state */}
      {isLoggedIn ? (
        <p className="status logged-in">You are logged in.</p>
      ) : (
        <p className="status logged-out">You are logged out.</p>
      )}

      {/* Button label and behaviour toggle with the same state */}
      <button
        className="btn"
        onClick={() => setIsLoggedIn(!isLoggedIn)}
      >
        {isLoggedIn ? "Logout" : "Login"}
      </button>
    </div>
  );
}

export default LoginLogout;
