/**
 * @file Footer.jsx
 * @description Application footer displaying institution name, module info,
 *              and copyright year. Year is derived dynamically so it never
 *              needs a manual update.
 */

/**
 * Footer – renders the bottom bar of the Student Dashboard.
 *
 * @returns {JSX.Element}
 */
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="footer-logo">Example UNI</span>
          <p className="footer-tagline">Student Dashboard Portal V1.0</p>
        </div>

        <div className="footer-links">
          <span>IMIT 52443 – Web Technologies</span>
          <span className="footer-dot">·</span>
          <a href="mailto:charithk@exampleuni.com">charithk@exampleuni.com</a>
        </div>

        <p className="footer-copy">
          &copy; {currentYear} Example UNI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
