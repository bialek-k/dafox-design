import React from "react";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import Series from "./Category/Series";

import Select, { SelectChangeEvent } from "@mui/material/Select";

const FilterProducts = ({ finalCategories }) => {
  console.log(finalCategories);
  return (
    <div className="lg:w-48 w-full">
      <Box sx={{ maxWidth: "80vw" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" className="dark:invert">
            Filter Categories
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            className=" h-12 dark:invert lg:w-48  dark:border-2 dark:border-white/10 dark:mt-2   "
            id="demo-simple-select"
            label="Sorting"
            value={"siema"}
            // onChange={handleChange}
          >
            {finalCategories.map((series) => {
              return (
                <div className="px-2" key={series.name}>
                  <span className="font-bold">{series.name}</span>
                  {series.series.map((name) => {
                    return (
                      <MenuItem value={name.name} key={name}>
                        {name}
                      </MenuItem>
                    );
                  })}
                </div>
              );
            })}
            {/* {finalCategories.map((series) => (
              <Series series={series} key={series.name} />
              // <MenuItem
              //   value={method.series}
              //   key={method}
              //   className="bg-white "
              // >
              //   <span className="truncate">{method}</span>
              // </MenuItem>
            ))} */}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default FilterProducts;
