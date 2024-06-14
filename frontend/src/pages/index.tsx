import HeaderPicture from "../assets/images/Header.png";
import CarPicture from "../assets/images/car-picture.png";
import Image from "next/image";
import { CiRainbow } from "react-icons/ci";
import TopCard from "@/components/TopCard";
import CategoryCard from "@/components/CategoryCard";
import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";

function Home() {
  return (
    <>
      <div className="relative  h-[65vh]">
        <Image
          src={HeaderPicture}
          alt="Header Image"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 w-full h-full -z-50 cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-transparent from-25% to-white to-70% opacity-1">
          <h2 className="font-montserrat font-bold text-center text-default pt-32 text-2xl sm:text-4xl px-2">
            Plus qu'un <span className=" text-primary ">trajet</span>, une{" "}
            <span className="text-primary">expérience</span> !
          </h2>
          <SearchBar />
        </div>
      </div>
      <section id="first-section">
        <div className="flex items-center justify-center flex-col sm:flex-row p-3 gap-11 pt-20">
          <Image
            src={CarPicture}
            className=" w-80 sm:w-[60vh] rounded"
            alt="Deux voitures de collection"
          />
          <p className="w-80 sm:w-[70vh] text-justify sm:text-left leading-8">
            Bienvenue sur Atypicar,{" "}
            <span className="font-montserrat font-bold ">
              la plateforme de covoiturage qui vous fait voyager avec style.
            </span>{" "}
            Que vous rêviez de monter à bord d'une voiture de collection, d'une
            sportive de luxe, ou d'un véhicule vintage, notre site vous met en
            relation avec des conducteurs passionnés prêts à partager un moment
            inoubliable.
          </p>
        </div>
        <div className="flex items-center justify-center flex-col sm:flex-row p-3 gap-11 py-20 ">
          <div className="flex items-center justify-center flex-col p-3 gap-11 pt-2 w-screen sm:w-[35vh]">
            <CiRainbow className="text-4xl text-center" />
            <p className="text-center">
              {" "}
              Où que vous alliez, en bus ou en covoiturage, trouvez le trajet
              idéal parmi notre large choix de destinations à petits prix.
            </p>
          </div>
          <div className="flex items-center justify-center flex-col p-3 gap-11 pt-2 w-screen sm:w-[35vh]">
            <CiRainbow className="text-4xl text-center" />
            <p className="text-center">
              {" "}
              Sélectionnez facilement le type de véhicule qui correspond à vos
              envies et partez à l'aventure.
            </p>
          </div>
          <div className="flex items-center justify-center flex-col p-3 gap-11 pt-2  w-screen sm:w-[35vh]">
            <CiRainbow className="text-4xl text-center" />
            <p className="text-center">
              {" "}
              Atypicar vous permet de vivre une expérience unique en choisissant
              des véhicules d'exception pour vos trajets.
            </p>
          </div>
        </div>
      </section>
      <section
        id="second-section"
        className="bg-default flex items-center justify-center flex-col  gap-11 py-11"
      >
        <h2 className="font-montserrat font-medium text-2xl text-white ">
          {" "}
          Découvrez nos tops trajets
        </h2>
        <div className="flex items-center justify-center flex-col xl:flex-row gap-11">
          <TopCard />
          <TopCard />
          <TopCard />
        </div>
      </section>
      <section
        id="third-section"
        className=" flex items-center justify-center flex-col  gap-11 py-11"
      >
        <h2 className="font-montserrat font-medium text-2xl text-default text-center ">
          {" "}
          Recherchez vos trajets par catégorie
        </h2>
        <div className="flex items-center justify-center flex-col sm:flex-row gap-11">
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
        </div>
      </section>
    </>
  );
}

export default Home;
