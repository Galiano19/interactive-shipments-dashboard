import React, { useEffect, useState } from "react";
import "./Dialog.css";

type DialogProps = {
  title: string;
  defaultOpen?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
};

function Dialog({
  defaultOpen = false,
  onClose,
  title,
  children,
}: DialogProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="dialog-backdrop" onClick={handleClose}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <div>{title}</div>

          <button className="dialog-close-button" onClick={handleClose}>
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return <div className="dialog-body">{children}</div>;
}

function Footer({ children }: { children: React.ReactNode }) {
  return <div className="dialog-footer">{children}</div>;
}

Dialog.Body = Body;
Dialog.Footer = Footer;

export default Dialog;
