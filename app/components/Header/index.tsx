import Link from 'next/link';
import styles from './styles.module.css';
import clsx from 'clsx';

function Header() {
  return (
    <nav className={clsx(styles.topbar, 'px-4')}>
      <Link href="/" className="text-2xl">
        Dragna.io
      </Link>
      <ul>
        <li className={styles.items}>
          <Link href="/challenge-rated" className="link">
            Challenge Rated
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
