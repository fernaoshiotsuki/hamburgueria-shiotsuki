import { ReactNode } from "react";
import { ApiProvider } from "./ApiProvider/indes";
import { AppProvider } from "./ChakraProvider";

interface childrenProps {
  children: ReactNode;
}

export const Providers = ({ children }: childrenProps) => {
  return (
    <AppProvider>
      <ApiProvider>{children}</ApiProvider>
    </AppProvider>
  );
};
