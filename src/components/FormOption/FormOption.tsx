import { ReactNode } from 'react';
import styles from './FormOption.module.scss';

interface IFormOption {
  children: ReactNode;
  labelChildren: ReactNode;
  containerClassName?: string;
  labelClassName?: string;
  id: string;
}

const FormOption = ({
  children,
  containerClassName = styles.formOption,
  labelChildren,
  id,
}: IFormOption) => {
  return (
    <div className={containerClassName}>
      {labelChildren && <label htmlFor={id}>{labelChildren}</label>}
      {children}
    </div>
  );
};

export default FormOption;
