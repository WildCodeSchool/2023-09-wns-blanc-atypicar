import { Navbar as NextUiNav, Link, Text, Avatar, Dropdown } from "@nextui-org/react";
import Image from "../../node_modules/next/image";
import NewTraject from "../assets/icons/new-traject.svg";
import SearchTraject from "../assets/icons/search.svg";
import Logo from "../assets/images/Logo.svg";

export default function Navbar() {

  return (
      <div style={{ display: "flex", justifyContent: "center" }}>
    <NextUiNav
      isBordered
      variant="sticky"
    >
        <NextUiNav.Brand
          css={{
            "@xs": {
              w: "12%",
            },
          }}
        >
        <Image src={Logo} alt="logo" height={35} />
          <Text b color="inherit" hideIn="xs">
            Atypi'Car
          </Text>
        </NextUiNav.Brand>
        <NextUiNav.Content
          css={{
            "@xs": {
              w: "auto", // Pour que les éléments s'alignent à gauche sur mobile
              jc: "flex-end",
              flexGrow: 1, // Pour que les éléments s'alignent à droite sur desktop
            },
          }}
        >
          <NextUiNav.Link href="#" css={{ display: "flex", gap: "10px", mr:"1em" }}>
        <Image src={SearchTraject} />
            Rechercher</NextUiNav.Link >
          {/* Ajout de la marge entre la photo de profil et le lien "Publier un trajet" */}
          <NextUiNav.Link href="#" css={{ display: "flex", gap: "10px", mr: "2em" }}>
          <Image src={NewTraject} />
            Publier un trajet</NextUiNav.Link>
        </NextUiNav.Content>
        <NextUiNav.Content>
          <Dropdown placement="bottom-right">
            <NextUiNav.Item>
              <Dropdown.Trigger>
                <Avatar
                  bordered
                  as="button"
                  color="secondary"
                  size="md"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </Dropdown.Trigger>
            </NextUiNav.Item>
            <Dropdown.Menu
              aria-label="User menu actions"
              color="secondary"
              onAction={(actionKey) => console.log({ actionKey })}
            >
              <Dropdown.Item key="profile" css={{ height: "$18" }}>
                <Text b color="inherit" css={{ d: "flex" }}>
                  Connecter en temps que 
                </Text>
                <Text b color="inherit" css={{ d: "flex" }}>
                  John D.
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="profile">Profil</Dropdown.Item>
              <Dropdown.Item key="search" withDivider>
                Rechercher
              </Dropdown.Item>
              <Dropdown.Item key="new-traject">Publier un trajet</Dropdown.Item>
              <Dropdown.Item key="logout" withDivider color="error">
                Se déconnecter
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </NextUiNav.Content>
      </NextUiNav>
    </div>
  );
}
