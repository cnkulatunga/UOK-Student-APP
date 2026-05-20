// Part 4 – Reusable Button Component
function Button({ label, message }) {
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
