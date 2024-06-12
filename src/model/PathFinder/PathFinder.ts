import { AVG_WALKING_SPEED } from "../../util/consts";
import GPS from "../GPS/GPSUtils";
import NodeStep, { PathStep } from "../../interfaces/PathStep";

export default class PathFinder {
  static computeFinalPath(
    nodes: NodeStep[],
    walkingSpeed: number = AVG_WALKING_SPEED,
  ): PathStep[] {
    const path: PathStep[] = [];

    for (let i = 0; i < nodes.length - 1; i++) {
      const currentNode = nodes[i];
      const nextNode = nodes[i + 1];

      path.push({ node: currentNode });

      if (
        currentNode.station !== nextNode.station &&
        currentNode.lineId !== nextNode.lineId
      ) {
        const distance = GPS.distance(
          currentNode.station.location,
          nextNode.station.location,
        );

        const durationSeconds = (distance * 1000) / walkingSpeed;
        const durationMinutes = Math.round(durationSeconds / 60);

        path.push({
          walking: {
            duration: durationMinutes,
            distance,
            destination: `${nextNode.station.name} (ligne ${nextNode.lineId})`,
          },
        });
      }
    }

    path.push({ node: nodes[nodes.length - 1] });

    return path;
  }
}
