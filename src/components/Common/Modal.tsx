import React from "react";
import ReactDOM from "react-dom";
import { ModalProps } from "../../configs/types/Types";

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  const modalRoot: HTMLElement | null = document.getElementById("modal-root");

  return modalRoot
    ? ReactDOM.createPortal(
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>,
        modalRoot
      )
    : null;
};

export default Modal;
