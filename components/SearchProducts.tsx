import { useState, useContext } from "react";
import { Store } from "../store/Store";

export const SearchProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { dispatch } = useContext(Store);

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
  };

  return (
    <div className="my-4">
      <form onSubmit={handleSubmit}>
        <label>Search Product</label>
        <input
          type="text"
          className="border-2 border-neutral-300 rounded-md w-full px-2 py-2"
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search product"
          value={searchQuery}
        />
      </form>
    </div>
  );
};
