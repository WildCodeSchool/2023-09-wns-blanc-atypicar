import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import styles from "../styles/BigFooter.module.css";
import { Accordion, AccordionItem } from "@nextui-org/react";
import SmallFooter from "./SmallFooter";

function BigFooter() {
  const content = (
    <div className={styles.footerColumn}>
      <p className={styles.title}>Voyager avec nous</p>
      <a href="">Trajet populaires en covoiturages</a>
      <br />
      <a href="">Destinations populaires en covoiturages</a>
    </div>
  );

  const content2 = (
    <div className={styles.footerColumn}>
      <p className={styles.title}>Covoiturage</p>
      <p>Mettre les catégories les plus populaires</p>
    </div>
  );

  const content3 = (
    <div className={styles.footerColumn}>
      <p className={styles.title}>En savoir plus</p>
      <a href="@"> Covoiturer depuis une gare </a>
      <br />
      <a href="link">Qui sommes-nous ?</a>
    </div>
  );

  const icons = (
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
  );

  return (
    <footer className={styles.footer}>
        <div className={styles.mobile}>
          <Accordion isCompact>
            <AccordionItem
              key="1"
              aria-label="Accordion 1"
              title="Voyager avec nous"
            >
              {content}
            </AccordionItem>
            <AccordionItem key="2" aria-label="Accordion 2" title="Covoiturage">
              {content2}
            </AccordionItem>
            <AccordionItem
              key="3"
              aria-label="Accordion 3"
              title="En savoir plus"
            >
              {content3}
            </AccordionItem>
          </Accordion>
          {icons}
        </div>

        <div className={styles.desktop}>
          {content}
          {content2}
          <div>
            {content3}
            {icons}
          </div>
        </div>
        <SmallFooter />
    </footer>
  );
}

export default BigFooter;
