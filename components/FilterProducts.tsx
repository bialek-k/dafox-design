import { useState } from "react";

const FilterProducts = ({
  finalCategories,
  setSelectedCategories,
  selectedCategories,
}) => {
  const handleChange = (e) => {
    console.log(e.target.value);
    // setSelectedCategories((event.target as HTMLInputElement).value);
  };

  return (
    <div className=" w-64">
      <form>
        <select>
          {finalCategories.map((series) => {
            <p>{series.name}</p>;
            {
              series.series.map((option) => {
                return <option>{option.name}</option>;
              });
            }
          })}
        </select>
      </form>
    </div>
  );
};

export default FilterProducts;
// import { useState } from "react";

// import Box from "@mui/material/Box";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";

// const FilterProducts = ({
//   finalCategories,
//   setSelectedCategories,
//   selectedCategories,
// }) => {
//   const handleChange = (event) => {
//     console.log(event.target.value);
//     // setSelectedCategories((event.target as HTMLInputElement).value);
//   };

//   return (
//     <div className=" w-64">
//       <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label" className="dark:invert">
//           Filter Categories
//         </InputLabel>
//         <Select
//           labelId="demo-simple-select-label"
//           className=" h-12 dark:invert dark:border-2 dark:border-white/10 dark:mt-2   "
//           id="demo-simple-select"
//           label="Filter Categories"
//           value={selectedCategories}
//           onChange={handleChange}
//         >
//           {finalCategories.map((series) => {
//             // console.log(series);
//             return (
//               <div className=" mt-2 px-3" key={series.name}>
//                 <span className="font-bold text-md tracking-wide">
//                   {series.name}
//                 </span>
//                 {series.series.map((name) => {
//                   return (
//                     <MenuItem value={name} key={name}>
//                       <span className="text-md ">{name}</span>
//                     </MenuItem>
//                   );
//                 })}
//               </div>
//             );
//           })}
//         </Select>
//       </FormControl>
//     </div>
//   );
// };

// export default FilterProducts;
