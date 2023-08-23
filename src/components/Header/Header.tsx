import HeaderControls from '../HeaderControls/HeaderControls';
import HeaderTimeframe from '../HeaderTimeframe/HeaderTimeframe';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <HeaderControls />
      <HeaderTimeframe />
    </header>
  );
};

export default Header;
