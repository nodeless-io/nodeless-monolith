import React, { useMemo } from "react";
import { CssBaseline, createTheme } from "@mui/material";
import {
  ThemeProvider as MUIThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import palette from "./palette";

export default function ThemeProvider({ children }: any) {
  const themeOptions: any = useMemo(
    () => ({
      palette,
      typography: {
        fontFamily: ['"Open Sans"'].join(","),
      },
    }),
    []
  );

  const theme = createTheme(themeOptions);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
