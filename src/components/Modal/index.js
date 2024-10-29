// src/components/Modal.js

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
    // Backdrop
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}></div>

      {/* Modal container */}
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full z-10 transition-transform transform scale-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          &#10005; {/* X close button */}
        </button>

        {/* Modal content */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
