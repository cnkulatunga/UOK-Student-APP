/**
 * @file Footer.jsx
 * @description Application footer displaying institution branding, module
 *              information, admin contact, and a dynamic copyright year.
 *              The year is derived at render time so it never needs a manual update.
 */

/**
 * Footer – renders the bottom bar of the Student Dashboard Portal.
 *
 * @returns {JSX.Element}
 */
function Footer() {
  /**
   * Derive the current year at render time.
   * Using getFullYear() ensures the copyright notice stays accurate
   * without any manual change each year.
   */
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">

        {/* Institution branding and portal version */}
        <div className="footer-brand">
          <span className="footer-logo">Example UNI</span>
          <p className="footer-tagline">Student Dashboard Portal V1.0</p>
        </div>

        {/* Module reference and admin contact link */}
        <div className="footer-links">
          <span>IMIT 52443 – Web Technologies</span>
          <span className="footer-dot">·</span>
          {/* mailto: opens the user's default email client */}
          <a href="mailto:charithk@exampleuni.com">charithk@exampleuni.com</a>
        </div>

        {/* Dynamic copyright year */}
        <p className="footer-copy">
          &copy; {currentYear} Example UNI. All rights reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;
