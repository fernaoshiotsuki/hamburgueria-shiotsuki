import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import { theme } from "../../chakraStyles";

interface childrenProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: childrenProps) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};
