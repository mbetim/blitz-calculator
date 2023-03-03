import { Box, Button, Heading, Stack, useDisclosure } from "@chakra-ui/react";
import { type NextPage } from "next";
import Head from "next/head";
import { GameFormDialog } from "~/components/dialogs/GameFormDialog";

const Home: NextPage = () => {
  const gameFormDialog = useDisclosure();

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
      </Stack>

      <GameFormDialog {...gameFormDialog} />
    </Box>
  );
};

export default Home;
