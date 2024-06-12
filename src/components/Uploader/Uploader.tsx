import { useState } from "react";
import { useRef } from "react";
import {
  Text,
  Group,
  Button,
  rem,
  useMantineTheme,
  Flex,
  Alert,
} from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { IconCloudUpload, IconX, IconDownload } from "@tabler/icons-react";
import classes from "./Uploader.module.css";
import UploadAPI from "../../api/UploadAPI";
import Error from "../Error";
import startConfetti from "../../util/confettis";
import {
  MAX_UPLOAD_FILE_SIZE,
  UPLOAD_SIZE_MULTIPLIER,
} from "../../util/consts";

export function Uploader() {
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleDrop(files: File[]) {
    setError("");
    setLoading(true);
    try {
      await UploadAPI.uploadFile(files[0]);
      await UploadAPI.uploadFile(files[1]);
      await UploadAPI.buildNetwork(files[0].name);
      setSuccess(true);
      startConfetti();
    } catch (error) {
      console.error(error);
      setError("Erreur lors de l'upload du fichier");
    }
    setLoading(false);
  }

  return (
    <Flex direction="column" align="center">
      {success && (
        <Alert title="Fichier uploadé avec succès" color="teal" mb="md" />
      )}
      <div className={classes.wrapper}>
        {error !== "" && <Error message={error} />}
        <Dropzone
          openRef={openRef}
          onDrop={(files) => {
            handleDrop(files);
          }}
          className={classes.uploader}
          radius="md"
          accept={[MIME_TYPES.csv]}
          maxSize={MAX_UPLOAD_FILE_SIZE}
          loading={loading}
        >
          <div style={{ pointerEvents: "none" }}>
            <Group justify="center">
              <Dropzone.Accept>
                <IconDownload
                  style={{ width: rem(50), height: rem(50) }}
                  color={theme.colors.blue[6]}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  style={{ width: rem(50), height: rem(50) }}
                  color={theme.colors.red[6]}
                  stroke={1.5}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconCloudUpload
                  style={{ width: rem(50), height: rem(50) }}
                  stroke={1.5}
                />
              </Dropzone.Idle>
            </Group>

            <Text ta="center" fw={700} fz="lg" mt="xl">
              <Dropzone.Accept>Déposez votre fichier ici</Dropzone.Accept>
              <Dropzone.Reject>
                CSV inférieur a {UPLOAD_SIZE_MULTIPLIER}MB seulement
              </Dropzone.Reject>
              <Dropzone.Idle>Uploader</Dropzone.Idle>
            </Text>
            <Text ta="center" fz="sm" mt="xs" c="dimmed">
              Glissez et déposez vos fichiers ici. Seulement <i>.csv</i>{" "}
              inférieurs a {UPLOAD_SIZE_MULTIPLIER} MB.
            </Text>
          </div>
        </Dropzone>

        <Button
          className={classes.control}
          size="md"
          radius="xl"
          onClick={() => openRef.current?.()}
        >
          Séléctionner un fichier
        </Button>
      </div>
    </Flex>
  );
}
