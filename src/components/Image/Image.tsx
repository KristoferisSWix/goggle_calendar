import cx from 'classnames';
import styles from './Image.module.scss';

interface IImage {
  src: string;
  alt: string;
  className?: string;
  size?: 'iconS' | 'iconM' | 'iconL' | 'auto';
}

const Image = ({ className = '', size = 'auto', src, alt }: IImage) => {
  const compiledClassName = cx(styles.image, styles[size], className);
  return <img className={compiledClassName} src={src} alt={alt} />;
};

export default Image;
