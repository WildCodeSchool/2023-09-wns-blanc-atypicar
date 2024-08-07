import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Image from "next/image";
import Logo from "../assets/images/Logo.svg";
import { CiSearch, CiCirclePlus } from "react-icons/ci";
import { IoIosSettings } from "react-icons/io";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { successToast } from "./Toast";

export default function CustomNavbar({ currentUser }: any) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>();

  const storedToken = localStorage.getItem("token");

  useEffect(() => {
    if (storedToken) {
      setToken(localStorage.getItem("token"));

    }
  }, [storedToken]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    successToast("Vous êtes déconnecté");
    router.push("/");
  };

  return (
    <div className="flex justify-center w-full	fixed z-50">
      <Navbar
        isBordered
        position="sticky"
        className="md:w-4/6 w-11/12 mt-8 shadow-lg rounded-full p-0"
      >
        <Link href="/">
          <NavbarBrand className="flex items-center justify-end xl:justify-start">
            <Image src={Logo} alt="logo" height={35} />
            <p className="pl-2 text-3xl  hidden xl:flex font-bold text-default font-montserrat ">
              Atypi'Car
            </p>
          </NavbarBrand>
        </Link>
        <NavbarContent className="flex navbar-content">
          {token && currentUser?.role === "ADMIN" && (
            <Dropdown>
              <DropdownTrigger>
                <button>
                  <IoIosSettings className="text-4xl" />
                </button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Administrator menu ">
                <DropdownItem key="categories" href="/categories">
                  Modifier les catégories
                </DropdownItem>

              </DropdownMenu>
            </Dropdown>
          )}
          <a href="/search" className=" gap-2 mr-4 hidden xl:flex">
            <CiSearch className="h-auto text-2xl" />
            Rechercher
          </a>
          {token && (
            <a
              href="/journeys/new"
              className=" gap-2 mr-0 2xl:mr-8 hidden xl:flex"
            >
              <CiCirclePlus className="h-auto text-2xl" />
              Publier un trajet
            </a>
          )}
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  color="secondary"
                  size="md"
                  src={currentUser?.picture}
                />
              </DropdownTrigger>
            </NavbarItem>
            {token ? (
              <DropdownMenu
                aria-label="User menu actions"
                color="secondary"
              >
                <DropdownItem className="mx-auto" showDivider>
                  Bonjour {currentUser?.firstName}
                </DropdownItem>

                <DropdownItem key="profile" href="/profil/infos">
                  Profil
                </DropdownItem>
                <DropdownItem key="myjourneys" href="/journeys">
                  Mes trajets
                </DropdownItem>
                <DropdownItem key="myreservations" href="/reservations">
                  Mes réservations
                </DropdownItem>
                <DropdownItem
                  key="search"
                  href="/search"
                  className="block xl:hidden"
                >
                  Rechercher
                </DropdownItem>
                <DropdownItem
                  key="journeys/new"
                  href="/journeys/new"
                  className="block xl:hidden"
                >
                  Publier un trajet
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="secondary"
                  onClick={handleLogout}
                >
                  Se déconnecter
                </DropdownItem>
              </DropdownMenu>
            ) : (
              <DropdownMenu
                aria-label="User menu actions"
                color="secondary"
              >
                <DropdownItem key="signup" href="/signup">
                  S'inscrire
                </DropdownItem>
                <DropdownItem key="signin" href="/signin">
                  Se connecter
                </DropdownItem>
              </DropdownMenu>
            )}
          </Dropdown>
        </NavbarContent>
      </Navbar>
    </div>
  );
}
