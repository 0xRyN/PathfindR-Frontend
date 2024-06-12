import { Button, Flex, LoadingOverlay, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { AutoInput } from "../components/AutoInput/AutoInput";
import Station from "../interfaces/Station";
import StationAPI from "../api/StationAPI";
import Error from "../components/Error";
import PathfinderAPI from "../api/PathfinderAPI";
import PathViewer from "../components/PathViewer/PathViewer";
import { PathViewerMap } from "../components/PathViewer/PathViewerMap.tsx";
import "./Home.css";
import startConfetti from "../util/confettis.ts";
import { PathStep } from "../interfaces/PathStep.ts";
import { IconArrowRight } from "@tabler/icons-react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [stations, setStations] = useState<Station[]>([]);
  const [startStation, setStartStation] = useState<string>("");
  const [endStation, setEndStation] = useState<string>("");
  const [error, setError] = useState("");
  const [path, setPath] = useState<PathStep[]>([]);
  const [totalTimeMinutes, setTotalTimeMinutes] = useState(0);

  useEffect(() => {
    const fetchStations = async () => {
      setLoading(true);
      const stations = await StationAPI.getStations();
      setStations(stations);
      setLoading(false);
    };
    fetchStations();
  }, []);

  const handleSubmit = async () => {
    setError("");
    const startStationId = parseInt(startStation.split(" ")[0]);
    const endStationId = parseInt(endStation.split(" ")[0]);

    if (startStationId === undefined || endStationId === undefined) {
      setError("Les stations sélectionnées n'existent pas");
      return;
    }

    const res = await PathfinderAPI.findPath(startStationId, endStationId);

    if (!res) {
      setError("Aucun chemin trouvé");
      return;
    }

    const { steps, totalTimeMinutes } = res;

    startConfetti();
    setPath(steps);
    setTotalTimeMinutes(totalTimeMinutes);
  };

  return (
    <Flex
      align="center"
      justify="center"
      direction="column"
      className={"home"}
      gap="lg"
    >
      <LoadingOverlay visible={loading} />
      <Title order={1}>Où allez-vous ?</Title>
      {error !== "" && <Error message={error} />}
      <AutoInput
        label="Départ"
        placeholder="Nom de la station de départ"
        autocompleteData={stations.map(
          (station) => `${station.id} ${station.name}`,
        )}
        setCurrentData={setStartStation}
      />

      <AutoInput
        label="Arrivée"
        placeholder="Nom de la station d'arrivée"
        autocompleteData={stations.map(
          (station) => `${station.id} ${station.name}`,
        )}
        setCurrentData={setEndStation}
      />

      <Button
        onClick={handleSubmit}
        rightSection={<IconArrowRight size={18} />}
        variant="gradient"
        gradient={{ from: "blue", to: "cyan", deg: 90 }}
        disabled={startStation === "" || endStation === ""}
        size="lg"
        loading={loading}
      >
        Trouver mon itinéraire
      </Button>
      {path.length > 0 && (
        <Flex direction="column" gap="lg" justify="center" align="center">
          <Title order={2}>Temps estimé : {totalTimeMinutes} minutes</Title>
          <PathViewerMap steps={path} />
          <PathViewer pathSteps={path} />
        </Flex>
      )}
    </Flex>
  );
}
