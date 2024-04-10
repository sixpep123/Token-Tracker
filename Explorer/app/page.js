import Content from "./components/Content/Content";
import Navbar from "./components/Navbar/Navbar";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />
      <Content />
    </main>
  );
}
