import { Badge, Card, Group, Text, ThemeIcon, Title } from "@mantine/core";
import { IconClockPin, IconShoe } from "@tabler/icons-react";
import classes from "./WalkingStepCard.module.css";
import { WalkingStep } from "../../interfaces/PathStep";

type Props = { walkingStep: WalkingStep };

export default function WalkingStepCard({ walkingStep }: Props) {
  const distanceMeters = Math.round(walkingStep.distance * 1000);
  const caloriesBurned = Math.round(walkingStep.distance * 70);
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
          <Title order={3}>{walkingStep.destination}</Title>
          <Badge color="red">Brûle {caloriesBurned} cal</Badge>
        </Group>
      </Card.Section>
      <Group>
        <ThemeIcon color="blue" variant="light" radius="xl">
          <IconClockPin />
        </ThemeIcon>
        <Text>{walkingStep.duration} minutes</Text>
      </Group>
      <Group mt="xs">
        <ThemeIcon color="blue" variant="light" radius="xl">
          <IconShoe />
        </ThemeIcon>
        <Text>{distanceMeters} mètres</Text>
      </Group>
    </Card>
  );
}
