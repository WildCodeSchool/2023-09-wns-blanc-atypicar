import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import Image from "next/image";
import NewTraject from "../assets/icons/new-traject.svg";
import SearchTraject from "../assets/icons/search.svg";
import Logo from "../assets/images/Logo.svg";

export default function CustomNavbar() {

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Navbar
        isBordered
        position="sticky"
      >
        <NavbarBrand
          css={{
            "@xs": {
              w: "12%",
            },
          }}
        >
          <Image src={Logo} alt="logo" height={35} />
          {/* <Text b color="inherit" hideIn="xs" className="websiteName">
            Atypi'Car
          </Text> */}
        </NavbarBrand>
        <NavbarContent

        >
          <Link href="#" css={{ display: "flex", gap: "10px", mr: "1em" }}>
            <Image src={SearchTraject} />
            Rechercher</Link >
          {/* Ajout de la marge entre la photo de profil et le lien "Publier un trajet" */}
          <Link href="#" css={{ display: "flex", gap: "10px", mr: "2em" }}>
            <Image src={NewTraject} />
            Publier un trajet</Link>
        </NavbarContent>
        <NavbarContent>
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
