import styles from "./Input.module.css";
import cx from "classnames";

interface IInput {
  className?: string;
  id: string;
  type?: string;
  name?: string;
  placeholder?: string;
  defaultValue?: string;
}

const Input = ({
  className = "",
  name,
  type = "text",
  placeholder,
  id,
  defaultValue,
}: IInput) => {
  return (
    <input
      defaultValue={defaultValue}
      type={type}
      name={name || id}
      id={id}
      className={cx(styles.Input, className)}
      placeholder={placeholder}
    />
  );
};

export default Input;
