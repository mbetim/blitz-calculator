import { Box, Heading } from "@chakra-ui/react";
import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <Box as="main">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading as="h1">Hello world</Heading>
    </Box>
  );
};

export default Home;
