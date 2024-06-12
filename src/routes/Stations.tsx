import { useEffect, useState } from "react";
import StationCard from "../components/StationCard/StationCard";
import Station from "../interfaces/Station";
import { Button, Flex, LoadingOverlay, SimpleGrid, Title } from "@mantine/core";
import StationAPI from "../api/StationAPI";

const stationsDummy: Station[] = [
  {
    id: 1,
    name: "Châtelet",
    location: { latitude: 48.857, longitude: 2.347 },
  },
  {
    id: 2,
    name: "Gare de Lyon",
    location: { latitude: 48.844, longitude: 2.374 },
  },
  {
    id: 3,
    name: "République",
    location: { latitude: 48.867, longitude: 2.363 },
  },
  {
    id: 4,
    name: "Bastille",
    location: { latitude: 48.853, longitude: 2.369 },
  },
  { id: 5, name: "Opéra", location: { latitude: 48.87, longitude: 2.332 } },
  { id: 6, name: "Nation", location: { latitude: 48.848, longitude: 2.398 } },
  {
    id: 7,
    name: "Place d'Italie",
    location: { latitude: 48.831, longitude: 2.356 },
  },
  {
    id: 8,
    name: "Porte de Versailles",
    location: { latitude: 48.832, longitude: 2.287 },
  },
  {
    id: 9,
    name: "Belleville",
    location: { latitude: 48.872, longitude: 2.376 },
  },
  {
    id: 10,
    name: "Montparnasse",
    location: { latitude: 48.843, longitude: 2.323 },
  },
  {
    id: 11,
    name: "Concorde",
    location: { latitude: 48.865, longitude: 2.321 },
  },
  {
    id: 12,
    name: "Saint-Michel",
    location: { latitude: 48.853, longitude: 2.347 },
  },
  { id: 13, name: "Odéon", location: { latitude: 48.852, longitude: 2.339 } },
  {
    id: 14,
    name: "Saint-Paul",
    location: { latitude: 48.855, longitude: 2.36 },
  },
  {
    id: 15,
    name: "Rambuteau",
    location: { latitude: 48.861, longitude: 2.353 },
  },
  {
    id: 16,
    name: "Champs-Élysées – Clemenceau",
    location: { latitude: 48.867, longitude: 2.311 },
  },
  {
    id: 17,
    name: "Franklin D. Roosevelt",
    location: { latitude: 48.869, longitude: 2.307 },
  },
  {
    id: 18,
    name: "George V",
    location: { latitude: 48.872, longitude: 2.3 },
  },
  {
    id: 19,
    name: "Charles de Gaulle – Étoile",
    location: { latitude: 48.875, longitude: 2.295 },
  },
  {
    id: 20,
    name: "Trocadéro",
    location: { latitude: 48.862, longitude: 2.287 },
  },
];

export default function Stations() {
  const [loading, setLoading] = useState(false);
  const [stations, setStations] = useState<Station[]>(stationsDummy);

  async function onFetchStations() {
    setLoading(true);
    try {
      const stationsRes = await StationAPI.getStations();
      setStations(stationsRes);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    onFetchStations();
  }, []);

  return (
    <Flex direction="column" align="center" gap={20}>
      <LoadingOverlay visible={loading} />
      <Title order={1}>Stations</Title>
      <Button color="blue" variant="light" onClick={onFetchStations}>
        Fetch stations
      </Button>
      <SimpleGrid cols={3} spacing="lg">
        {stations.map((station) => (
          <StationCard key={station.id} station={station} />
        ))}
      </SimpleGrid>
    </Flex>
  );
}
