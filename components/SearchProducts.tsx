import { useState, useContext } from "react";
import { Store } from "../store/Store";

import { getSearchQuery } from "../utilities/getSearchQuery";

import { useRouter } from "next/router";

import Button from "./UI/Button";
import Link from "next/link";

export const SearchProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  console.log(state.filterQueries);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (searchQuery === "") return;

    dispatch({
      type: "ADD_FILTER_QUERY",
      payload: searchQuery,
    });

    router.push({
      pathname: "/shop/search",
      query: { query: getSearchQuery(searchQuery) },
    });
  };

  const removeFilterHandler = () => {
    router.push("/shop/page/1");
    dispatch({
      type: "REMOVE_FILTER_QUERY",
    });
  };

  return (
    <div className="mb-12">
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          className="border-2 border-neutral-300 rounded-r-none rounded-l-md w-full px-4 py-3"
          placeholder="Find something for You"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        <Button
          type="submit"
          addedClassName="w-1/4 rounded-r-md rounded-l-none"
        >
          Search
        </Button>
      </form>
      {state.filterQueries !== "" && (
        <div className=" flex gap-2 items my-4">
          <p className="font-bold text-xl">Search: </p>
          <button onClick={removeFilterHandler}>
            <p className="bg-gray-200 px-3 py-1 rounded-md hover:bg-yellow-500 text-sm cursor-pointer">
              {state.filterQueries}
            </p>
          </button>
        </div>
      )}
    </div>
  );
};
