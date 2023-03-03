import { ChakraProvider, extendTheme, type Theme } from "@chakra-ui/react";
import { type AppType } from "next/dist/shared/lib/utils";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={extendTheme({ config: { initialColorMode: "dark" } } as Theme)}>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
