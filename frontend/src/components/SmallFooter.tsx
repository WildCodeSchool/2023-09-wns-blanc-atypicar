import styles from "../styles/SmallFooter.module.css";

function SmallFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.link}>
        <a href="">Transparence des platformes</a>
        <a href="">Informations légales</a>
        <a href="">Paramètres des cookies</a>
      </div>
      <div className={styles.logo}>
      <p>logo</p>
      </div>
    </footer>
  );
}

export default SmallFooter;
