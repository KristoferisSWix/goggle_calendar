import { ReactNode } from "react";
import styles from "./FormOption.module.css";

interface IFormOption {
  children: ReactNode;
  labelChildren: ReactNode;
  containerClassName?: string;
  labelClassName?: string;
  id: string;
}

const FormOption = ({
  children,
  containerClassName = styles.FormOption,
  labelClassName = styles["FormOption--icon"],
  labelChildren,
  id,
}: IFormOption) => {
  return (
    <div className={containerClassName}>
      {labelChildren && (
        <label htmlFor={id} className={labelClassName}>
          {labelChildren}
        </label>
      )}
      {children}
    </div>
  );
};

export default FormOption;
