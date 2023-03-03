import React from "react";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const sortingMethodArray = [
  "Sort by latest",
  "Price: low to high",
  "Price: high to low",
];

const SortingProducts = ({ sortingMethod, setSortingMethod }) => {
  const handleChange = (event: SelectChangeEvent) => {
    setSortingMethod(event.target.value as string);
  };

  return (
    <div className="lg:w-48 w-full shadow-md ">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" className="dark:invert">
          Sorting
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          className="dark:bg-neutral-100 lg:w-48 dark:mt-2"
          id="demo-simple-select"
          label="Sorting"
          value={sortingMethod}
          onChange={handleChange}
        >
          {sortingMethodArray.map((method) => (
            <MenuItem value={method} key={method} className="bg-white ">
              <span className="truncate">{method}</span>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SortingProducts;
