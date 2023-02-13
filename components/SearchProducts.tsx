import { useState, useContext } from "react";
import { Store } from "../store/Store";

import Button from "./UI/Button";

export const SearchProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [queryArray, setQueryArray] = useState([]);
  const { dispatch } = useContext(Store);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (searchQuery === "") return;

    fetch("/api/search-products", {
      method: "POST",
      body: JSON.stringify(searchQuery),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "SET_SEARCH_PRODUCTS",
          payload: data,
        });
      });

    setQueryArray([...queryArray, searchQuery]);
    setSearchQuery("");
  };

  const removeQueryHandler = (index) => {
    const filteredQuery = queryArray.filter((_, i) => i !== index);
    setQueryArray(filteredQuery);
  };

  return (
    <div className="mb-12">
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          className="border-2 border-neutral-300 rounded-r-none rounded-l-md w-full px-4 py-3"
          placeholder="Search product"
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
      <ul className="flex gap-2 my-2">
        {queryArray.map((query, index) => (
          <div
            key={query}
            className="cursor-pointer bg-gray-300 px-3 py-2 rounded-md hover:bg-yellow-500"
            onClick={() => removeQueryHandler(index)}
          >
            <p>{query}</p>
          </div>
        ))}
      </ul>
    </div>
  );
};
