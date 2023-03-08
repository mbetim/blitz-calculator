import { Box, Button, Divider, Heading, HStack, Input, Text, useToast } from "@chakra-ui/react";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useQuery } from "react-query";
import { z } from "zod";
import { getGameById, updateGameById } from "~/services/game.service";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const debounce = <F extends (...args: any[]) => any>(func: F, wait = 300) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<F>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => void func(...args), wait);
  };
};

const GamePage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const game = useQuery(["game", id], () => getGameById(id as string), {
    enabled: !!id,
    onSuccess(data) {
      if (!data) return router.replace("/");
    },
  });
  const toast = useToast();
  const firstPlayerLastRoundInputRef = useRef<HTMLInputElement>(null);

  const onNewRound = async () => {
    if (!game.data) return;

    game.data.players.forEach((player) => {
      player.pointsHistory.push(0);
    });

    updateGameById(game.data.id, game.data);
    await game.refetch();

    firstPlayerLastRoundInputRef.current?.focus();
  };

  const onPointChange = debounce(async (value: string, playerIndex: number, pointIndex: number) => {
    if (!game.data) return;

    const player = game.data.players[playerIndex];

    if (!player) return;

    const roundPoints = z.coerce.number().int().safeParse(value);

    if (!roundPoints.success) return toast({ title: "Invalid point", status: "error" });

    player.pointsHistory[pointIndex] = roundPoints.data;

    updateGameById(game.data.id, game.data);
    await game.refetch();
  });

  return (
    <Box p={[1, 2]} overflowX="scroll" height="100vh">
      <HStack>
        {game.data?.players.map((player, playerIndex) => (
          <Box key={player.name} flex={1} minW="100px">
            <Heading
              textAlign="center"
              fontSize="xl"
              position="sticky"
              top={0}
              bgColor="chakra-body-bg"
              color="gray.400"
              zIndex={1}
            >
              {player.name}
            </Heading>

            {player.pointsHistory.map((point, roundIndex) => (
              <Input
                key={roundIndex}
                ref={
                  playerIndex === 0 && roundIndex === player.pointsHistory.length - 1
                    ? firstPlayerLastRoundInputRef
                    : undefined
                }
                type="number"
                textAlign="center"
                defaultValue={point.toString()}
                onChange={(event) => onPointChange(event.target.value, playerIndex, roundIndex)}
                tabIndex={
                  roundIndex < player.pointsHistory.length - 1 ? undefined : playerIndex + 1
                }
                border="none"
              />
            ))}

            <Divider />

            <Text align="center" fontSize="xl">
              {player.pointsHistory.reduce((a, b) => a + b, 0)}
            </Text>
          </Box>
        ))}
      </HStack>

      <Button onClick={onNewRound} mt={3}>
        New Round
      </Button>
    </Box>
  );
};

export default GamePage;
