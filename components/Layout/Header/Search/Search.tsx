import React, { useEffect, useContext, useState, useRef } from "react";
import { Store } from "../../../../store/Store";
import { Image as DatoImage } from "react-datocms";

import { BiSearchAlt } from "react-icons/bi";
import Link from "next/link";

const Search = () => {
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const ref = useRef<HTMLInputElement>();

  const ctx = useContext(Store);
  const allProducts = ctx.state.ctxAllProducts;

  useEffect(() => {
    const handler = (event) => {
      if (!ref.current.contains(event.target)) {
        setTimeout(() => {
          setShowResults(false);
          setQuery("");
        }, 100);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  useEffect(() => {
    const filter = allProducts.filter((prod) => {
      if (query.trim() === "") {
        return;
      } else if (prod.name.toLowerCase().trim().includes(query.toLowerCase())) {
        return prod;
      }
    });
    setShowResults(true);
    setFilteredItems(filter);
  }, [query, allProducts]);

  const hideHandler = () => {
    setShowResults(false);
    setQuery("");
  };

  return (
    <div className="hidden sm:flex relative ">
      <div
        className="searchBar px-2 bg-white flex gap-3 justify-center items-center rounded-md"
        ref={ref}
      >
        <BiSearchAlt color="grey" />
        <input
          type="text"
          placeholder="Search..."
          className="font-bold py-6 outline-none bg-white/50 dark:text-black w-72"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {showResults ? (
        <div className=" bg-white absolute top-12 left-0 px-2 rounded-md shadow-lg max-h-96 overflow-y-scroll z-50">
          {filteredItems.map((product) => (
            <Link
              href={`/shop/steeringwheels/${product.slug}`}
              key={product.name}
            >
              <a>
                <div
                  className="flex rounded-md p-1 my-2 items-center w-72 gap-2 hover:bg-yellow-400 hover:font-bold "
                  onClick={hideHandler}
                >
                  <div className="img w-1/6">
                    {product?.image && (
                      <DatoImage
                        className="rounded-md"
                        data={product.image.responsiveImage}
                      />
                    )}
                  </div>
                  <div className="content w-3/4 truncate ... ">
                    <p className="text-sm truncate ... dark:text-black ">
                      {product.name}
                    </p>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Search;
