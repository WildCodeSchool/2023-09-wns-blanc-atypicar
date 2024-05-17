import { FaYoutube, FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import styles from "../styles/BigFooter.module.css";
import { Accordion, AccordionItem } from "@nextui-org/react";
import SmallFooter from "./SmallFooter";
import { gql, useQuery } from "@apollo/client";
import { SlArrowDown } from "react-icons/sl";
import { useState } from "react";
import { Category } from "@/types/category";

const GET_RANDOM_CATEGORIES = gql`
  query GetTopCategories {
    getRandomCategories {
      wording
    }
  }
`;

function BigFooter() {
  const [categories, setCategories] = useState<Category[]>([]);

  const { loading, error, data } = useQuery(GET_RANDOM_CATEGORIES, {
    onCompleted: (data) => {
      setCategories(data.getRandomCategories);
    },
  });

  const content = (
    <div className="text-start px-4 pl-0 md:pl-8 text-sm md:text-base pt-5 md:pt-0 pb-5 md:pb-0">
      <p className="pt-2 md:pt-10 pb-8 text-2xl hidden md:block">
        Voyager avec nous
      </p>
      <a href="">Trajet populaires en covoiturages</a>
      <br />
      <a href="">Destinations populaires en covoiturages</a>
    </div>
  );

  let content2;
  {
    content2 = (
      <div className="text-start text-sm md:text-base pt-5 md:pt-0 pb-5 md:pb-0">
        <p className="pt-2 md:pt-10  pb-3 text-2xl hidden md:block">
          Covoiturage
        </p>
        <div>
          {categories.length > 0 ? (
            <div>
              {categories.map((category) => (
                <div key={category.id}>{category.wording}</div>
              ))}
            </div>
          ) : (
            <p>Pas de catégories pour l'instant </p>
          )}
        </div>
      </div>
    );
  }

  const content3 = (
    <div className="text-start pr-0 md:pr-8 text-sm md:text-base pt-5 md:pt-0 pb-5 md:pb-5">
      <p className="pt-2 md:pt-10 pb-8 text-2xl hidden md:block">
        En savoir plus
      </p>
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
        <Accordion className="divide-white divide-y-1">
          <AccordionItem
            indicator={<SlArrowDown className="text-white" />}
            key="1"
            aria-label="Accordion 1"
            title={
              <span className="text-white font-bold">Voyager avec nous</span>
            }
            className="px-10"
          >
            {content}
          </AccordionItem>
          <AccordionItem
            indicator={<SlArrowDown className="text-white" />}
            key="2"
            aria-label="Accordion 2"
            title={<span className="text-white font-bold">Covoiturage</span>}
            className="px-10"
          >
            {content2}
          </AccordionItem>
          <AccordionItem
            indicator={<SlArrowDown className="text-white" />}
            key="3"
            aria-label="Accordion 3"
            title={<span className="text-white font-bold">En savoir plus</span>}
            className="px-10"
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
