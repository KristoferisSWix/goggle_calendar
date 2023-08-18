import { MutableRefObject, ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import Button from "../Button/Button";
import Image from "../Image/Image";
interface IModal {
  children: ReactNode;
  closeModal: () => void;
}
const Modal = ({ children, closeModal }: IModal) => {
  const elRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    if (!modalRoot || !elRef.current) {
      return;
    }
    modalRoot.appendChild(elRef.current);
    return () => {
      if (elRef.current) {
        modalRoot.removeChild(elRef.current);
      }
    };
  }, []);

  return createPortal(
    <div className={styles["Modal--overlay"]}>
      <div className={styles.Modal}>
        <div className={styles["Modal--header"]}>
          <Button
            onClick={closeModal}
            className={styles["Modal--close-btn"]}
            id="close-modal-btn"
          >
            <Image src="./images/xmark-icon.svg" alt="close modal" />
          </Button>
        </div>
        {children}
      </div>
    </div>,
    elRef.current
  );
};

export default Modal;
