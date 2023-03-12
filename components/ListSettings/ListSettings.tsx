import { useState, useEffect, useContext } from "react";
import { Store } from "../../store/Store";

import { FilterProducts } from "./FilterProducts";
import { SearchProducts } from "./SearchProducts";
import { SortingProducts } from "./SortingProducts";

export const ListSettings = () => {
  const [sortingMethod, setSortingMethod] = useState("Price: low to high");
  const { dispatch } = useContext(Store);

  useEffect(() => {
    dispatch({
      type: "SET_SORTING_METHOD",
      payload: sortingMethod,
    });
  }, [sortingMethod]);

  return (
    <section className="container mx-auto px-6 flex flex-col gap-5 py-12">
      <SearchProducts showFilter />
      <div className="flex flex-col gap-4 md:gap-2 md:justify-end lg:flex-row ">
        <FilterProducts />
        <SortingProducts
          sortingMethod={sortingMethod}
          setSortingMethod={setSortingMethod}
        />
      </div>
    </section>
  );
};
