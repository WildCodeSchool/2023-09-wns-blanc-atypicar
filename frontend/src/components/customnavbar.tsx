import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import Image from "next/image";
import NewTraject from "../assets/icons/new-traject.svg";
import SearchTraject from "../assets/icons/search.svg";
import Logo from "../assets/images/Logo.svg";
import { CiSearch, CiCirclePlus } from "react-icons/ci";

export default function CustomNavbar() {

  return (
    <div className="flex justify-center w-full	fixed z-50">
      <Navbar
        isBordered
        position="sticky"
        className="md:w-4/6 w-11/12 mt-8 shadow-lg rounded-full p-0"
      >
        <Link href="/">
          <NavbarBrand className="flex items-center justify-end xl:justify-start" >
            <Image src={Logo} alt="logo" height={35} />
            <p className="pl-2 text-3xl  hidden xl:flex font-bold text-default font-montserrat ">Atypi'Car</p>
          </NavbarBrand>
        </Link>
        <NavbarContent className="flex navbar-content">
          <a href="#" className=" gap-2 mr-4 hidden xl:flex">
            <CiSearch className="h-auto text-2xl" />
            Rechercher
          </a >
          <a href="#" className=" gap-2 mr-0 2xl:mr-8 hidden xl:flex">
            <CiCirclePlus className="h-auto text-2xl" />
            Publier un trajet
          </a>
          <Dropdown placement="bottom-right">
            <NavbarItem>
              <DropdownTrigger>
                <Avatar
                  bordered
                  as="button"
                  color="secondary"
                  size="md"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="User menu actions"
              color="secondary"
              onAction={(actionKey) => console.log({ actionKey })}
            >
              <DropdownItem key="profile">Profil</DropdownItem>
              <DropdownItem key="myjourneys" href="/journeys">Mes trajets</DropdownItem>
              <DropdownItem key="search" withDivider className="block xl:hidden">
                Rechercher
              </DropdownItem>
              <DropdownItem key="new-traject" className="block xl:hidden">Publier un trajet</DropdownItem>
              <DropdownItem key="logout" withDivider color="error">
                Se déconnecter
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
    </div>
  );
}