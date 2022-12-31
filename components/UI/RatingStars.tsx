import React, { useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

const RatingStars = () => {
  const [value, setValue] = React.useState<number | null>(4);

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}>
      <Typography component="legend">Rating</Typography>
      <Rating name="read-only" value={value} readOnly />
    </Box>
  );
};

export default RatingStars;
