import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import Image from "next/image";
import NewTraject from "../assets/icons/new-traject.svg";
import SearchTraject from "../assets/icons/search.svg";
import Logo from "../assets/images/Logo.svg";

export default function CustomNavbar() {

  return (
    <div className="flex justify-center">
      <Navbar
        isBordered
        position="sticky"
        className="w-9/12 mt-8 shadow-lg rounded-full"
      >
        <NavbarBrand className="flex items-center justify-end lg:justify-start">
          <Image src={Logo} alt="logo" height={35} />
          <p className="pl-2 text-2xl font-bold hidden lg:flex">Atypi'Car</p>
        </NavbarBrand>
        <NavbarContent className="flex navbar-content">
          <a href="#" className="flex mr-4 p-0 hidden lg:flex">
            <Image src={SearchTraject} />
            Rechercher
          </a >
          <a href="#" className="flex gap-2 mr-8 hidden lg:flex">
            <Image src={NewTraject} />
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
              <DropdownItem key="profile" css={{ height: "$18" }}>
                {/* <Text b color="inherit" css={{ d: "flex" }}>
                  Connecter en temps que
                </Text>
                <Text b color="inherit" css={{ d: "flex" }}>
                  John D.
                </Text> */}
              </DropdownItem>
              <DropdownItem key="profile">Profil</DropdownItem>
              <DropdownItem key="search" withDivider>
                Rechercher
              </DropdownItem>
              <DropdownItem key="new-traject">Publier un trajet</DropdownItem>
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