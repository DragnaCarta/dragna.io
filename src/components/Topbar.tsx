import { Component } from "react";
import Link from "next/link";
import styles from "./Topbar.module.css";

class Topbar extends Component {
  render() {
    return (
      <div className={styles.fixed}>
        <nav className={styles.topbar}>
          <Link className="topbar-title" href="/">Dragna.io</Link>
          <ul>
            <li className={styles.items}>
              <Link href="/about">About</Link>
            </li>
            <li className={styles.items}>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link className={styles.cta} href="https://www.patreon.com/DragnaCarta">Support the Creator</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Topbar;