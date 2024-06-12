import { Timeline, ThemeIcon } from "@mantine/core";
import StationCard from "../StationCard/StationCard";
import { IconRoute, IconWalk } from "@tabler/icons-react";
import NodeStep, { PathStep, WalkingStep } from "../../interfaces/PathStep";
import WalkingStepCard from "../WalkingStepCard/WalkingStepCard";

interface Props {
  pathSteps: PathStep[];
}

function NodeStepItem({ index, node }: { index: number; node: NodeStep }) {
  return (
    <Timeline.Item
      key={index}
      title={`Étape ${index + 1}: ${node.station.name}`}
      bullet={
        <ThemeIcon color="blue" variant="light" radius="xl">
          <IconRoute size={12} />
        </ThemeIcon>
      }
    >
      <StationCard station={node.station} lineId={node.lineId} />
    </Timeline.Item>
  );
}

function WalkingStepItem({
  index,
  walking,
}: {
  index: number;
  walking: WalkingStep;
}) {
  return (
    <Timeline.Item
      key={index}
      title={`Un peu de marche`}
      bullet={
        <ThemeIcon color="red" variant="light" radius="xl">
          <IconWalk size={12} />
        </ThemeIcon>
      }
    >
      <WalkingStepCard walkingStep={walking} />
    </Timeline.Item>
  );
}

export default function PathViewer({ pathSteps }: Props) {
  return (
    <Timeline active={0} bulletSize={24} lineWidth={2}>
      {pathSteps.map((step, index) => {
        if (step.node) {
          return <NodeStepItem key={index} index={index} node={step.node} />;
        } else if (step.walking) {
          return (
            <WalkingStepItem key={index} index={index} walking={step.walking} />
          );
        }
      })}
    </Timeline>
  );
}
