import { ChakraProvider, extendTheme, type Theme } from "@chakra-ui/react";
import { type AppType } from "next/dist/shared/lib/utils";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={extendTheme({ config: { initialColorMode: "dark" } } as Theme)}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
