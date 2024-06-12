import { Title, Text, Button, Container, Group } from "@mantine/core";
import classes from "./NotFound.module.css";

export function NotFound() {
  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>
        Vous avez trouvé un endroit secret.
      </Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        Malheureusement, il s'agit seulement d'une page 404. Vous avez peut-être
        mal tapé l'adresse, ou la page a été déplacée vers une autre URL.
      </Text>
      <Group justify="center">
        <Button variant="subtle" size="md">
          Ramenez-moi à la page d'accueil
        </Button>
      </Group>
    </Container>
  );
}
