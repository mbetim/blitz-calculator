import { Box, Button, Divider, Heading, Link, Stack, useDisclosure } from "@chakra-ui/react";
import { type NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { useQuery } from "react-query";
import { GameFormDialog } from "~/components/dialogs/GameFormDialog";
import { listAllGames } from "~/services/game.service";

const Home: NextPage = () => {
  const gameFormDialog = useDisclosure();
  const { data } = useQuery("games", listAllGames);

  return (
    <Box as="main">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Stack w="full" h="100vh" spacing={3} justify="center" alignItems="center">
        <Heading as="h1" size="2xl">
          Welcome to <strong>Dutch Blitz Calculator!</strong>
        </Heading>

        <Button onClick={gameFormDialog.onOpen}>Create a new game</Button>

        <Divider my={2} w="80%" />

        {data?.map((game, index) => (
          <Link key={game.id} as={NextLink} href={`/games/${game.id}`}>
            Game #{index + 1} | {game.players.map((player) => player.name).join(", ")}
          </Link>
        ))}
      </Stack>

      <GameFormDialog {...gameFormDialog} />
    </Box>
  );
};

export default Home;
