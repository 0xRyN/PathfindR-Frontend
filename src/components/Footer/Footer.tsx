import { Text, Container, ActionIcon, Group, rem, Image } from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons-react";
import classes from "./Footer.module.css";
import { useNavigate } from "react-router-dom";

const data = [
  {
    title: "Découvrir",
    links: [
      { link: "/", label: "Accueil" },
      { link: "/upload", label: "Upload" },
      { link: "/stations", label: "Stations" },
      { link: "/about", label: "À Propos" },
    ],
  },
  {
    title: "Documentation",
    links: [
      { label: "Contribuer", link: "#" },
      { label: "Charte", link: "#" },
      { label: "API", link: "#" },
      { label: "FAQ", link: "#" },
    ],
  },
  {
    title: "Pages légales",
    links: [
      { label: "Mentions légales", link: "#" },
      { label: "Politique de confidentialité", link: "#" },
      { label: "Conditions d'utilisation", link: "#" },
      { label: "Cookies", link: "#" },
    ],
  },
];

export default function Footer() {
  const navigate = useNavigate();
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<"a">
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        onClick={(_event) => navigate(link.link)}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Image
            src="/logo.png"
            alt="Logo"
            onClick={() =>
              window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
            }
          />
          <Text size="xs" c="dimmed" className={classes.description}>
            Pathfindr - Votre allié #1 <b>contre</b> la SNCF
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="dimmed" size="sm">
          © 2024 Pathfindr. Tous droits réservés.
        </Text>

        <Group
          gap={0}
          className={classes.social}
          justify="flex-end"
          wrap="nowrap"
        >
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandTwitter
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandYoutube
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
