import { Link } from 'react-router';
import styles from './NavBar.module.css';

const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <Link to="/">Home</Link>
      <Link to="/mailboxes">Mailboxes</Link>
      <Link to="/mailboxes/new">New Mailbox</Link>
      <Link to="/letters/new">New Letter</Link>
    </nav>
  );
};

export default NavBar;