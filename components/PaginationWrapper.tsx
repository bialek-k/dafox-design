import { Pagination } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#eab308",
    },
  },
});

export const PaginationWrapper = ({ items, pageSize, onPageChange }) => {
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
