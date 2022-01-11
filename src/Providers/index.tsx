import { ReactNode } from "react";
import { AppProvider } from "./ChakraProvider";

interface childrenProps {
  children: ReactNode;
}

export const Providers = ({ children }: childrenProps) => {
  return <AppProvider>{children}</AppProvider>;
};
