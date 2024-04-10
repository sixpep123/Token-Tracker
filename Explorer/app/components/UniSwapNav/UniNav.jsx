import React from "react";
import styles from "./UniNav.module.css";
import Link from "next/link";
import Image from "next/image";

const UniNavbar = () => {
  return (
    <main className={styles.nav}>
      <div className={styles.title}>
        <img src={"/logo.png"} alt="" className={styles.logo} />
      </div>
      <button className={styles.waxBtn}>
        <Link href="/" className={styles.wx}>
          <Image
            src={"/Designer.png"}
            alt="Icon"
            className={styles.logo}
            width={30}
            height={40}
          />
          <h2>TokenTrackr</h2>
        </Link>
      </button>
    </main>
  );
};

export default UniNavbar;
