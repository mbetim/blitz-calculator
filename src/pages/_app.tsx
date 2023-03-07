import { ChakraProvider, extendTheme, type Theme } from "@chakra-ui/react";
import { type AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Blitz calculator</title>
      </Head>

      <ChakraProvider theme={extendTheme({ config: { initialColorMode: "dark" } } as Theme)}>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
