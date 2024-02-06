import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import styles from "../styles/BigFooter.module.css";
import { Accordion, AccordionItem } from "@nextui-org/react";
import SmallFooter from "./SmallFooter";
import { color } from "../../node_modules/framer-motion/dist/index";

function BigFooter() {
  const content = (
    <div className="text-start px-4 pl-0 md:pl-8 text-sm md:text-base pt-5 md:pt-0 pb-5 md:pb-0">
      <p className="pt-2 md:pt-10 pb-8 text-2xl hidden md:block">Voyager avec nous</p>
      <a href="">Trajet populaires en covoiturages</a>
      <br />
      <a href="">Destinations populaires en covoiturages</a>
    </div>
  );

  const content2 = (
    <div className="text-start text-sm md:text-base pt-5 md:pt-0 pb-5 md:pb-0">
      <p className="pt-2 md:pt-10  pb-8 text-2xl hidden md:block">Covoiturage</p>
      <p>Mettre les catégories les plus populaires</p>
    </div>
  );

  const content3 = (
    <div className="text-start pr-0 md:pr-8 text-sm md:text-base pt-5 md:pt-0 pb-5 md:pb-0">
      <p className="pt-2 md:pt-10 pb-8 text-2xl hidden md:block">En savoir plus</p>
      <a href="@"> Covoiturer depuis une gare </a>
      <br />
      <a href="link">Qui sommes-nous ?</a>
    </div>
  );

  const icons = (
    <div className="flex pt-8 text-4xl px-10 md:px-0 pr-0 md:pr-8">
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
              title={<span className="text-white font-bold">Voyager avec nous</span>}
              className="px-10"
            >
              {content}
            </AccordionItem>
            <AccordionItem key="2" aria-label="Accordion 2" title={<span className="text-white font-bold">Covoiturage</span>} className="px-10"
            >
              {content2}
            </AccordionItem>
            <AccordionItem
              key="3"
              aria-label="Accordion 3"
              title={<span className="text-white font-bold">En savoir plus</span>} className="px-10"
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
