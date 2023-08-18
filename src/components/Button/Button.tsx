import { CSSProperties, MouseEventHandler, ReactNode } from "react";
import styles from "./Button.module.css";
import cx from "classnames";

interface IButton {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  id?: string;
  style?: CSSProperties;
  type?: "button" | "reset" | "submit" | undefined;
}

const Button = ({
  children,
  onClick,
  className = "",
  id,
  type,
  style,
}: IButton) => {
  const compiledClassName = cx(styles.Button, className);

  return (
    <button
      style={style}
      type={type}
      onClick={onClick}
      className={compiledClassName}
      id={id}
    >
      {children}
    </button>
  );
};

export default Button;
