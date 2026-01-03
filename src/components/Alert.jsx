import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  FiAlertCircle,
  FiAlertTriangle,
  FiCheckCircle,
  FiX,
} from "react-icons/fi";

function Alert({ type = "success", message, onClose, duration = 3000 }) {
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entry animation
    requestAnimationFrame(() => {
      setIsVisible(true);
    });

    if (onClose) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [onClose, duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const variants = {
    success: {
      container:
        "bg-white dark:bg-neutral-800 border-l-4 border-l-emerald-500 text-neutral-800 dark:text-neutral-100 shadow-xl shadow-black/5",
      icon: <FiCheckCircle className="w-5 h-5 text-emerald-500" />,
      title: "Success",
    },
    error: {
      container:
        "bg-white dark:bg-neutral-800 border-l-4 border-l-red-500 text-neutral-800 dark:text-neutral-100 shadow-xl shadow-black/5",
      icon: <FiAlertCircle className="w-5 h-5 text-red-500" />,
      title: "Error",
    },
    warn: {
      container:
        "bg-white dark:bg-neutral-800 border-l-4 border-l-amber-500 text-neutral-800 dark:text-neutral-100 shadow-xl shadow-black/5",
      icon: <FiAlertTriangle className="w-5 h-5 text-amber-500" />,
      title: "Warning",
    },
  };

  const current = variants[type] || variants.success;

  return (
    <div
      className={`relative flex items-center gap-3 p-3 rounded-r-xl border border-neutral-200 dark:border-neutral-700/50 ${
        current.container
      } transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        isVisible && !isExiting
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0"
      }`}
      role="alert"
    >
      <div className="shrink-0">{current.icon}</div>
      <div className="flex-1">
        <p className="text-sm font-semibold">{current.title}</p>
        <p className="text-xs opacity-90">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={handleClose}
          className="shrink-0 p-1 rounded-lg hover:bg-black/10 transition-colors"
          aria-label="Close alert"
        >
          <FiX className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

Alert.propTypes = {
  type: PropTypes.oneOf(["success", "error", "warn"]),
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  duration: PropTypes.number,
};

export default Alert;
