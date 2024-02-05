import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import styles from "../styles/BigFooter.module.css";

function BigFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerColumn}>
        <h3>Voyager avec nous</h3>
        <a href="">Trajet populaires en covoiturages</a>
        <br />
        <a href="">Destinations populaires en covoiturages</a>
      </div>

      <div className={styles.footerColumn}>
        <h3>Covoiturage</h3>
        <p>Mettre les catégories les plus populaires</p>
      </div>

      <div className={styles.footerColumn}>
        <h3>En savoir plus</h3>
        <a href="@"> Covoiturer depuis une gare </a>
        <br />
        <a href="link">Qui sommes-nous ?</a>
        <div className={styles.icons}>
          <div className={styles.facebook}>
            <FaFacebook />
          </div>
          <div className={styles.twitter}>
            <FaTwitter />
          </div>
          <div className={styles.youtube}>
            <FaYoutube />
          </div>
          <div className={styles.instagram}>
            <FaInstagram />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default BigFooter;
