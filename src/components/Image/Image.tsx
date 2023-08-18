import cx from "classnames";
import styles from "./Image.module.css";

interface IImage {
  src: string;
  alt: string;
  className?: string;
  size?: "icon" | "tiny" | "small" | "medium" | "large" | "auto";
}

const Image = ({ className = "", size = "auto", src, alt }: IImage) => {
  const compiledClassName = cx(styles.Image, styles[size], className);
  return <img className={compiledClassName} src={src} alt={alt} />;
};

export default Image;
