import { useState, useContext, useEffect } from "react";
import { Store } from "../store/Store";
import { useRouter } from "next/router";

import Button from "./UI/Button";

export const SearchProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [queriesList, setQueriesList] = useState([]);
  const [updateQuery, setUpdateQuery] = useState(false);
  const router = useRouter();
  const { dispatch } = useContext(Store);

  const handleInputChange = (e) => {
    if (e.target.value) {
      setSearchQuery(e.target.value);
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

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

    setSearchQuery("");
    setQueriesList([...queriesList, searchQuery]);
  };

  console.log(queriesList.length);

  if (queriesList.length) {
    router.push({
      pathname: "/shop/search",
      query: { query: `${queriesList}` },
    });
  }

  const removeQueryHandler = (index) => {
    const filteredQuery = queriesList.filter((_, i) => i !== index);
    setQueriesList(filteredQuery);
    router.push({
      pathname: `/shop/page/1`,
    });
  };

  return (
    <div className="mb-12">
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          className="border-2 border-neutral-300 rounded-r-none rounded-l-md w-full px-4 py-3"
          onChange={handleInputChange}
          value={searchQuery}
          placeholder="Search product"
        />
        <Button
          type="submit"
          addedClassName="w-1/4 rounded-r-md rounded-l-none"
        >
          Search
        </Button>
      </form>
      <ul className="flex gap-2 my-2">
        {router.query.query && <p>{router.query.query}</p>}
        {/* {queriesList.map((query, index) => (
          <div
            key={query}
            className="cursor-pointer bg-gray-300 px-3 py-2 rounded-md hover:bg-yellow-500"
            onClick={() => removeQueryHandler(index)}
          >
            <p>{query}</p>
          </div>
        ))} */}
      </ul>
    </div>
  );
};
