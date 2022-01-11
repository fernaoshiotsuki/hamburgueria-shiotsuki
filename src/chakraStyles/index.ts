import { extendTheme, theme as ChakraTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    green: {
      100: "#27AE60",
      200: "#168821",
    },
    gray: {
      10: "#f5f5f5",
      20: "#E0E0E0",
      30: "#828282",
      40: "#333333",
    },

    blue: {
      11: "#155BCB",
    },

    red: {
      22: "#EB5757",
      44: "#E60000",
    },
    yellow: {
      95: "#FFCD07",
    },
  },
});
