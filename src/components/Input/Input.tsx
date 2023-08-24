import styles from './Input.module.scss';
import cx from 'classnames';

interface IInput {
  id: string;
  type?: string;
  name?: string;
  placeholder?: string;
  defaultValue?: string;
  size?: 'large';
  skin?: 'noDefault';
  fill?: 'fill';
}

const Input = ({
  name,
  type = 'text',
  placeholder,
  id,
  size,
  skin,
  fill,
  defaultValue,
}: IInput) => {
  return (
    <input
      defaultValue={defaultValue}
      type={type}
      name={name || id}
      id={id}
      className={cx(styles.input, {
        [styles.large]: size === 'large',
        [styles.noDefault]: skin === 'noDefault',
        [styles.fill]: fill === 'fill',
      })}
      placeholder={placeholder}
    />
  );
};

export default Input;
