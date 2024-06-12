import { z } from "zod";
import NodeStep, { PathStep } from "../interfaces/PathStep";
import PathFinder from "../model/PathFinder/PathFinder";

const API_URL = import.meta.env.VITE_API_URL as string;

const NodeSchema = z.object({
  lineId: z.string(),
  station: z.object({
    id: z.number(),
    name: z.string(),
    coordinates: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
  }),
  uniqueIdentifier: z.string(),
});

interface PathFinderResponse {
  steps: PathStep[];
  totalTimeMinutes: number;
}

function validateNodes(json: unknown): NodeStep[] | undefined {
  try {
    const nodes = z.array(NodeSchema).parse(json);
    return nodes.map((node) => ({
      lineId: node.lineId,
      station: {
        id: node.station.id,
        name: node.station.name,
        location: {
          latitude: node.station.coordinates.latitude,
          longitude: node.station.coordinates.longitude,
        },
      },
      uniqueIdentifier: node.uniqueIdentifier,
    }));
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

/*
 * This class provides an interface to the Pathfinder API.
 * Use this class to search for paths between stations.
 */
export default class PathfinderAPI {
  /**
   * Searches for a path between two stations.
   * @param start - The ID of the starting station.
   * @param end - The ID of the ending station.
   * @returns A promise that resolves to an array of station IDs representing the path, or undefined if no path was found.
   * @throws An error if the request fails.
   */
  public static async findPath(
    startId: number,
    endId: number,
  ): Promise<PathFinderResponse | undefined> {
    let response = await fetch(API_URL + "/path-finder", {
      method: "POST",
      body: JSON.stringify({
        graphId: 1,
        stationFromId: startId,
        stationToId: endId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Failed to find path:", response.statusText);
      return undefined;
    }

    const json = await response.json();

    const nodesArray = json.listNodes;

    if (!Array.isArray(nodesArray)) {
      console.error("Invalid node list:", nodesArray);
      return undefined;
    }

    const nodes = validateNodes(nodesArray);

    if (!nodes) {
      console.error("Failed to validate nodes:", nodesArray);
      return undefined;
    }

    const steps = PathFinder.computeFinalPath(nodes);

    if (!Number.isInteger(json.totalTime)) {
      console.error("Invalid total time:", json.totalTime);
      return undefined;
    }

    return {
      steps,
      totalTimeMinutes: Math.round(json.totalTime / 60),
    };
  }
}
