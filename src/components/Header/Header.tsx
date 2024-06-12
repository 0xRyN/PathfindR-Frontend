import { useState } from "react";
import { Container, Group, Burger, Image } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./Header.module.css";

const links = [
  { link: "/", label: "Accueil" },
  { link: "/upload", label: "Upload" },
  { link: "/stations", label: "Stations" },
  { link: "/about", label: "À Propos" },
];

export default function Header() {
  const currentLink = useLocation().pathname;
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(currentLink);
  const navigate = useNavigate();

  const items = links.map((link) => (
    <button
      key={link.label}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={() => {
        setActive(link.link);
        navigate(link.link);
      }}
    >
      {link.label}
    </button>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Image
          src="/logo.png"
          alt="Logo"
          width={80}
          height={80}
          style={{ cursor: "pointer" }}
          p="md"
          onClick={() => navigate("/")}
        />
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
