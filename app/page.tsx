import styles from './page.module.css';

export default function App() {
  return (
    <div>
      <header className={styles.hero}>
        <div className={styles.particles}>
          <div className={styles.stars}></div>
          <div className={styles.stars2}></div>
          <div className={styles.stars3}></div>
        </div>
        <div className={styles.container}>
          <div className={styles.content}>
            <h1 className="title">Dragna.io</h1>
          </div>
        </div>
        <div className={styles.castle}></div>
      </header>
      <main>
        <section className={styles.home}></section>
      </main>
    </div>
  );
}
