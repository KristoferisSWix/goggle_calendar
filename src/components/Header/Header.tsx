import HeaderControls from "../HeaderControls/HeaderControls";
import HeaderTimeframe from "../HeaderTimeframe/HeaderTimeframe";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.Header}>
      <HeaderControls />
      <HeaderTimeframe />
    </header>
  );
};

export default Header;
