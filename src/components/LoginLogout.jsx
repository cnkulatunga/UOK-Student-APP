// Part 7 – Conditional Rendering: Login / Logout
import { useState } from "react";

function LoginLogout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="section login-section">
      <h3>Session</h3>
      {isLoggedIn ? (
        <p className="status logged-in">You are logged in.</p>
      ) : (
        <p className="status logged-out">You are logged out.</p>
      )}
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
