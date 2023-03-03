import { useState, useContext } from "react";
import { Store } from "../store/Store";
import { useRouter } from "next/router";
import Button from "./UI/Button";
import { FaMinusCircle } from "react-icons/fa";

interface SearchProductsProps {
  showFilter?: boolean;
}

export const SearchProducts = ({ showFilter }: SearchProductsProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (searchQuery === "") return;

    dispatch({
      type: "ADD_FILTER_QUERY",
      payload: searchQuery,
    });

    router.push({
      pathname: "/shop/search",
      query: { query: searchQuery, page: 1 },
    });
  };

  const removeFilterHandler = () => {
    router.push("/shop/page/1");
    dispatch({
      type: "REMOVE_FILTER_QUERY",
    });
  };

  return (
    <div className="mb-2 w-full drop-shadow-md ">
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          className="border border-black/30 rounded-r-none rounded-l-md w-full px-4 py-4 text-sm dark:text-black "
          placeholder="Find your perfect steering wheel | ENG"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        <Button
          type="submit"
          addedClassName=" w-1/3 md:w-1/6 rounded-r-md rounded-l-none text-sm tracking-widest"
        >
          Search
        </Button>
      </form>
      {state.filterQuery !== "" && showFilter ? (
        <div className=" flex py-4 justify-between my-4">
          <div className="flex gap-2">
            <p className="font-bold text-xl">Search: </p>
            <p className="bg-yellow-500 text-white px-3 py-1 rounded-md hover: text-sm">
              {state.filterQuery}
            </p>
          </div>
          <div
            className=" flex items-center gap-1 cursor cursor-pointer"
            onClick={removeFilterHandler}
          >
            <FaMinusCircle className="text-black/40 " />
            <p>remove filter</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};
