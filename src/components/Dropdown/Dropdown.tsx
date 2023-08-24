import styles from './Dropdown.module.scss';
import cx from 'classnames';

interface IDropdown {
  name?: string;
  id: string;
  optionArr: { value: string; text: string }[];
  defaultValue?: string;
  skin?: 'standard';
}

const Dropdown = ({ name, id, optionArr, defaultValue, skin }: IDropdown) => {
  return (
    <select
      className={cx(styles.dropdown, {
        [styles.standard]: skin === 'standard',
      })}
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
