import React from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "./ErrorMessage.module.css";

type ErrorMessageProps = {
    code: number;
}

export default function ErrorMessage({ code }: ErrorMessageProps) {
  let title = "Error 404";
  let description = "Page Not Found";

  if (code === 500) {
    title = "Error 500";
    description = "Something isn't right.";
  }

  return (
    <div className={styles.body}>
      <Head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={description} name="description" />
        <meta content={description} property="og:description" />
        <meta content="@dannyrb" name="author" />
        <meta
          content="https://dragna.io/static/img/facebook.png"
          property="og:image"
        />
      </Head>

      <div>
        <h1 className={styles.title}>{code}</h1>
        <Link className={styles.link} href="/">Back to Home</Link>
      </div>
    </div>
  );
}