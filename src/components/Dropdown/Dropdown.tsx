import styles from "./Dropdown.module.css";
import cx from "classnames";

interface IDropdown {
  className?: string;
  name?: string;
  id: string;
  optionArr: { value: string; text: string }[];
  defaultValue?: string;
}

const Dropdown = ({
  className = "",
  name,
  id,
  optionArr,
  defaultValue,
}: IDropdown) => {
  return (
    <select
      className={cx(styles.Dropdown, className)}
      name={name || id}
      id={id}
      defaultValue={defaultValue}
    >
      {optionArr.map(({ value, text }) => {
        return (
          <option key={value} value={value}>
            {text}
          </option>
        );
      })}
    </select>
  );
};

export default Dropdown;
