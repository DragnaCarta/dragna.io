import Link from 'next/link';
import styles from './styles.module.css';
import clsx from 'clsx';

function Header() {
  return (
    <nav className={clsx(styles.topbar, 'px-4')}>
      <Link href="/" className="text-2xl">
        Dragna.io
      </Link>
    </nav>
  );
}

export default Header;
