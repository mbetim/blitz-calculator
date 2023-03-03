import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdAdd, MdRemove } from "react-icons/md";
import { createGame } from "~/services/game.service";

interface GameFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormValues {
  player: string;
}

export const GameFormDialog: React.FC<GameFormDialogProps> = (props) => {
  const { register, reset, handleSubmit } = useForm<FormValues>();
  const toast = useToast();
  const router = useRouter();

  const [players, setPlayers] = useState<string[]>([]);

  const onSubmit = handleSubmit((formValues) => {
    const player = formValues.player.trim();

    if (!player) return toast({ title: "Player name is required", status: "error" });

    if (players.includes(player)) return toast({ title: "Player already exists", status: "error" });

    setPlayers([...players, player]);
    reset();
  });

  const removePlayerByIndex = (index: number) => {
    const newPlayers = [...players];
    newPlayers.splice(index, 1);
    setPlayers(newPlayers);
  };

  const handleCreateGame = () => {
    const game = createGame(players);
    void router.push(`/games/${game.id}`);
  };

  return (
    <Modal {...props}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>New game</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <FormControl>
            <FormLabel>Player name</FormLabel>

            <HStack as="form" onSubmit={onSubmit}>
              <Input {...register("player")} placeholder="Name" />

              <IconButton
                aria-label="Add player"
                type="submit"
                icon={<MdAdd />}
                size="sm"
                colorScheme="blue"
              />
            </HStack>
          </FormControl>

          <Divider my={3} />

          <Stack spacing={2}>
            {players.map((player, index) => (
              <HStack key={player}>
                <Text flex="1">{player}</Text>

                <IconButton
                  aria-label="Remove player"
                  icon={<MdRemove />}
                  size="sm"
                  colorScheme="red"
                  onClick={() => removePlayerByIndex(index)}
                />
              </HStack>
            ))}
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button onClick={props.onClose} mr={3}>
            Close
          </Button>

          <Button
            colorScheme="blue"
            type="submit"
            isDisabled={players.length <= 1}
            onClick={handleCreateGame}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
