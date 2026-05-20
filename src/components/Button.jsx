/**
 * @file Button.jsx
 * @description Part 4 – Reusable Button Component.
 *              Renders a styled button that fires a browser alert on click.
 *              Assumption: alert() is used here as a simple feedback mechanism
 *              as required by the assignment; a real app would use a modal or toast.
 */

/**
 * Button – generic clickable button that shows an alert message.
 *
 * @param {object} props
 * @param {string} props.label   - Text displayed on the button.
 * @param {string} [props.message] - Alert text shown when clicked. Falls back
 *                                   to a default string if omitted.
 * @returns {JSX.Element}
 */
function Button({ label, message }) {
  /**
   * Fires a browser alert with the provided message.
   * Falls back to a generic string when no message prop is supplied.
   */
  const handleClick = () => {
    alert(message || "Button clicked!");
  };

  return (
    <button className="btn" onClick={handleClick}>
      {label}
    </button>
  );
}

export default Button;
