import { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import styles from './Button.module.scss';
import cx from 'classnames';

interface IButton {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  id?: string;
  style?: CSSProperties;
  size?: 'small' | 'medium' | 'large';
  skin?: 'standard' | 'simple' | 'destructive' | 'none';
  theme?: 'active' | undefined;
  type?: 'button' | 'reset' | 'submit' | undefined;
  testId?: string;
}

const Button = ({
  children,
  onClick,
  type,
  style,
  size = 'medium',
  theme,
  skin = 'none',
  testId,
}: IButton) => {
  return (
    <button
      style={style}
      type={type}
      onClick={onClick}
      className={cx(styles.button, {
        [styles.active]: theme === 'active',
        [styles.none]: skin === 'none',
        [styles.standard]: skin === 'standard',
        [styles.simple]: skin === 'simple',
        [styles.destructive]: skin === 'destructive',
        [styles.small]: size === 'small',
        [styles.medium]: size === 'medium',
        [styles.large]: size === 'large',
      })}
      data-testid={testId}
      data-size={size}
      data-theme={theme}
      data-skin={skin}
    >
      {children}
    </button>
  );
};

export default Button;
