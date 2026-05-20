/**
 * @file Toast.jsx
 * @description Non-blocking notification system.
 *              Each toast auto-dismisses after 3 seconds; users can also
 *              close one manually with the × button.
 *              Supports three visual types: "success", "error", "info".
 */

import { useEffect } from "react";

/**
 * ToastItem – renders a single notification and starts its auto-dismiss timer.
 *
 * @param {object}   props
 * @param {{ id: number, message: string, type: string }} props.toast
 * @param {Function} props.onDismiss - Called with toast.id when dismissed.
 */
function ToastItem({ toast, onDismiss }) {
  /**
   * Start a 3-second timer on mount.
   * The cleanup function clears the timer if the toast is dismissed manually
   * before it fires, preventing a state update on an unmounted component.
   */
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 3000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div className={`toast toast--${toast.type}`}>
      <span className="toast-message">{toast.message}</span>
      <button className="toast-close" onClick={() => onDismiss(toast.id)}>×</button>
    </div>
  );
}

/**
 * Toast – container that renders all active toast notifications.
 * Returns null when there are no toasts so no DOM node is mounted.
 *
 * @param {object}   props
 * @param {Array}    props.toasts    - Active toast objects.
 * @param {Function} props.onDismiss - Callback to remove a toast by id.
 * @returns {JSX.Element|null}
 */
function Toast({ toasts, onDismiss }) {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

export default Toast;
