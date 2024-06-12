import Station from "./Station";

export default interface NodeStep {
  lineId: string;
  station: Station;
  uniqueIdentifier: string;
}

export interface WalkingStep {
  duration: number;
  distance: number;
  destination: string;
}

// Either a NodeStep or a WalkingStep
export type PathStep = {
  node?: NodeStep;
  walking?: WalkingStep;
};

export function isNodeStep(step: PathStep): step is { node: NodeStep } {
  return (step as { node: NodeStep }).node !== undefined;
}

export function isWalkingStep(
  step: PathStep,
): step is { walking: WalkingStep } {
  return (step as { walking: WalkingStep }).walking !== undefined;
}
