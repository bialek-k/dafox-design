import React from "react";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const ProductFilter = ({ selected, setSelected, convertedSeriesData }) => {
  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value as string);
    console.log(event.target.value);
  };

  return (
    <div className="w-full">
      <Box sx={{ maxWidth: "80vw" }} className="w-full ">
        <FormControl fullWidth>
          <InputLabel htmlFor="grouped-native-select" className="dark:invert">
            Filter
          </InputLabel>
          <Select
            native
            labelId="demo-simple-select-label"
            className=" dark:invert h-12 truncate dark:border-2 dark:border-white/10 dark:mt-2   "
            id="demo-simple-select"
            label="Filter"
            defaultValue={selected}
            onChange={handleChange}
          >
            <option className="px-2 w-ful" value={"all"}>
              All
            </option>
            {convertedSeriesData.map((series) => (
              <optgroup label={series.name} key={series.id} className=" px-2">
                {series.series.map((item) => (
                  <option className="ml-2" key={item} value={item}>
                    {item}
                  </option>
                ))}
              </optgroup>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default ProductFilter;
