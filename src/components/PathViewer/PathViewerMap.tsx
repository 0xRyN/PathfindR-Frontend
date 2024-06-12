import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngTuple } from "leaflet";
import { PathStep, isNodeStep } from "../../interfaces/PathStep";
import GPSUtils from "../../model/GPS/GPSUtils";
import classes from "./PathViewerMap.module.css";

export interface IPathViewerProps {
  steps: PathStep[];
}

function buildLatLngTuples(steps: PathStep[]): {
  nodeTuples: LatLngTuple[];
  walkingTuples: LatLngTuple[][];
} {
  const node: LatLngTuple[] = [];
  const walking: LatLngTuple[][] = [];

  const first = steps[0];
  const last = steps[steps.length - 1];

  // Assert that the first and last steps are NodeSteps
  if (!isNodeStep(first) || !isNodeStep(last)) {
    throw new Error("Invalid path");
  }

  node.push([
    first.node.station.location.latitude,
    first.node.station.location.longitude,
  ]);

  for (let i = 1; i < steps.length - 1; i++) {
    const step = steps[i];
    const last = steps[i - 1];
    const next = steps[i + 1];
    if (isNodeStep(step)) {
      node.push([
        step.node.station.location.latitude,
        step.node.station.location.longitude,
      ]);
    } else {
      if (!isNodeStep(last) || !isNodeStep(next)) {
        throw new Error("Invalid path");
      }
      walking.push([
        [
          last.node.station.location.latitude,
          last.node.station.location.longitude,
        ],
        [
          next.node.station.location.latitude,
          next.node.station.location.longitude,
        ],
      ]);
    }
  }

  node.push([
    last.node.station.location.latitude,
    last.node.station.location.longitude,
  ]);

  return { nodeTuples: node, walkingTuples: walking };
}

export const PathViewerMap = ({ steps }: IPathViewerProps) => {
  const first = steps[0];
  const last = steps[steps.length - 1];

  // Assert that the first and last steps are NodeSteps
  if (!isNodeStep(first) || !isNodeStep(last)) {
    return null;
  }

  const departure: LatLngTuple = [
    first.node.station.location.latitude,
    first.node.station.location.longitude,
  ];

  const arrival: LatLngTuple = [
    last.node.station.location.latitude,
    last.node.station.location.longitude,
  ];

  const midPoint = GPSUtils.calculateMidpoint(
    first.node.station.location,
    last.node.station.location,
  );

  const mapCenter: LatLngTuple = [midPoint.latitude, midPoint.longitude];

  const { nodeTuples, walkingTuples } = buildLatLngTuples(steps);

  return (
    <MapContainer className={classes.map} center={mapCenter} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={departure}>
        <Popup>Départ : {first.node.station.name}</Popup>
      </Marker>
      <Marker position={arrival}>
        <Popup>Arrivée : {last.node.station.name}</Popup>
      </Marker>
      <Polyline positions={nodeTuples} pathOptions={{ color: "green" }} />
      {walkingTuples.map((walkingTuple, index) => (
        <Polyline
          key={index}
          positions={walkingTuple}
          pathOptions={{ color: "red", dashArray: "10, 10" }}
        />
      ))}
    </MapContainer>
  );
};
