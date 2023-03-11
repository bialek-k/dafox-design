import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { getCategoryId } from "../../utilities/categoryHandler";

import { Store } from "../../store/Store";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ListSubheader from "@mui/material/ListSubheader";

export const FilterProducts = () => {
  const [filters, setFilters] = useState([]);
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  useEffect(() => {
    try {
      fetch("/api/get-all-categories", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => setFilters(data));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleChange = (event) => {
    const filter = event.target.value.replaceAll("/", "-");
    const categoryID = getCategoryId(filters, event.target.value);

    dispatch({
      type: "SET_FILTER_CATEGORY",
      payload: categoryID,
    });

    dispatch({
      type: "REMOVE_FILTER_QUERY",
    });

    if (categoryID.name === "All Products") {
      router.push("/shop/page/1");
    }

    router.push({
      pathname: "/shop/category",
      query: { filter, id: categoryID.id, page: 1 },
    });
  };

  const renderSelectGroup = (filters) => {
    const items = filters.models.map((model) => {
      return (
        <MenuItem key={model.id} value={model.name}>
          {model.name}
        </MenuItem>
      );
    });
    return [
      <ListSubheader key={filters.series}>{filters.series}</ListSubheader>,
      items,
    ];
  };

  return (
    <div className="w-full lg:w-64 shadow-md">
      <FormControl fullWidth>
        <InputLabel id="filter-select-label" className="dark:invert">
          Categories
        </InputLabel>
        <Select
          value={state.filterCategory.name}
          labelId="filter-select-label"
          className="dark:bg-neutral-100 dark:mt-2"
          fullWidth
          onChange={handleChange}
          label="Categories"
        >
          {filters?.map((p) => renderSelectGroup(p))}
        </Select>
      </FormControl>
    </div>
  );
};
