import Head from "next/head";
import React from "react";
import Theme from "../layouts/Theme";

import styles from './index.module.scss';

function PageHome() {
    const title = `Dragna.io - DragnaCarta's Workspace`;
    const description = "";

    return (
      <div>
        <Head>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <meta content={title} property="og:title" />
          <meta content={description} name="description" />
          <meta content={description} property="og:description" />
          <meta content="@dannyrb" name="author" />
          <meta content="https://dragna.io" property="og:url" />
          <meta
            content="https://dragna.io/static/img/facebook.png"
            property="og:image"
          />
        </Head>

        <Theme>
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
            <section className={styles.home}>

            </section>

          </main>
        </Theme>
      </div>
    );
  }

              {/* <img
              className="icon"
              src={`/static/icons/${this.props.query.icon}`}
              width={220}
              height={220}
              alt={'title'}
            /> */}

export default PageHome;