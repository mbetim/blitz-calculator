import { Box, Button, Divider, HStack, Input, Text, useToast } from "@chakra-ui/react";
import { type NextPage } from "next";
import { useRouter } from "next/router";
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
  const game = useQuery(["game", id], () => getGameById(id as string), { enabled: !!id });
  const toast = useToast();

  const onNewRound = async () => {
    if (!game.data) return;

    game.data.players.forEach((player) => {
      player.pointsHistory.push(0);
    });

    updateGameById(game.data.id, game.data);
    await game.refetch();
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
    <div>
      <HStack>
        {game.data?.players.map((player, playerIndex) => (
          <Box key={player.name} flex={1}>
            <Text align="center" fontSize="xl">
              {player.name}
            </Text>

            {player.pointsHistory.map((point, pointIndex) => (
              <Input
                key={pointIndex}
                type="number"
                textAlign="center"
                defaultValue={point.toString()}
                onChange={(event) => onPointChange(event.target.value, playerIndex, pointIndex)}
                tabIndex={
                  pointIndex < player.pointsHistory.length - 1 ? undefined : playerIndex + 1
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

      <Button onClick={onNewRound}>New Round</Button>
    </div>
  );
};

export default GamePage;
