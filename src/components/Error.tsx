import { Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

type Props = {
  message: string;
};

export default function Error({ message }: Props) {
  const icon = <IconAlertCircle color="red" />;

  return (
    <Alert
      variant="light"
      color="red"
      title="Aie... Petite erreur!"
      icon={icon}
      mb="sm"
    >
      {message}
    </Alert>
  );
}
