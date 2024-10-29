import "./styles.css";
import { useEffect } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  // Close the modal when the ESC key is pressed
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    } else {
      document.removeEventListener("keydown", handleEsc);
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-bg-overlay" onClick={onClose}></div>
      <div className="modal-container">
        <button onClick={onClose} className="close-btn">
          &#10005;
        </button>

        {/* Modal content */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
