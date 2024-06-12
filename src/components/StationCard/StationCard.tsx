import Station from "../../interfaces/Station";

import { Badge, Card, Group, Text, ThemeIcon, Title } from "@mantine/core";
import { IconMapPin, IconTrack } from "@tabler/icons-react";
import classes from "./StationCard.module.css";

type Props = { station: Station; lineId?: string };

export default function StationCard({ station, lineId }: Props) {
  return (
    <Card
      className={classes.card}
      shadow="sm"
      padding="md"
      radius="md"
      withBorder
    >
      <Card.Section p="xs">
        <Group>
          <Title order={3}>{station.name}</Title>
          <Badge color="blue">ID: {station.id}</Badge>
        </Group>
      </Card.Section>
      <Group>
        <ThemeIcon color="blue" variant="light" radius="xl">
          <IconMapPin />
        </ThemeIcon>
        <Text>
          {station.location.latitude.toFixed(3)}...°,{" "}
          {station.location.longitude.toFixed(3)}...°
        </Text>
      </Group>
      {lineId && (
        <Group mt="xs">
          <ThemeIcon color="blue" variant="light" radius="xl">
            <IconTrack />
          </ThemeIcon>
          <Text>Ligne: {lineId}</Text>
        </Group>
      )}
    </Card>
  );
}
