import React from "react";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";

import Series from "./Category/Series";

const ProductFilter = ({ selected, setSelected, convertedSeriesData }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected((event.target as HTMLInputElement).value);
  };

  return (
    <div className="filter mb-6 mx-4 h-min w-64 shadow-lg px-4 pb-4 rounded-md hidden lg:flex lg:flex-col dark:border-2 dark:border-neutral-800">
      <h2 className="text-xl mb-3 font-bold my-6">Product Filter</h2>
      <div className="filterContainer break-all ">
        <select>
          <FormControl className="w-full">
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={selected}
              onChange={handleChange}
            >
              <button
                className="bg-neutral-300 hover:bg-yellow-500 text-white font-bold p-2 rounded-md mb-3 "
                onClick={() => setSelected("all")}
              >
                Show all products
              </button>
              {convertedSeriesData.map((series) => (
                <Series series={series} key={series.name} />
              ))}
            </RadioGroup>
          </FormControl>
        </select>
      </div>
    </div>
  );
};

export default ProductFilter;
