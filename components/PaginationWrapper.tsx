import { Pagination } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMemo } from "react";

export const PaginationWrapper = ({ items, pageSize, onPageChange }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          primary: {
            main: "#eab308",
          },
        },
      }),
    [prefersDarkMode]
  );

  const pagesCount = Math.ceil(items / pageSize);
  if (pagesCount === 1) return null;

  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <div className=" my-24 flex flex-col items-center justify-center">
      <ThemeProvider theme={theme}>
        <Pagination
          count={pages.length}
          onChange={onPageChange}
          color="primary"
        />
      </ThemeProvider>
    </div>
  );
};

// const theme = useMemo(
//   () =>
//     createTheme({
//       palette: {
//         primary: {
//           main: "#eab308",
//         },
//       },
//     }),
//   [prefersDarkMode]
// );
