import React, { useContext } from "react";
import { Store } from "../store/Store";

export const NoProductsFound = () => {
  const {
    state: { filterQuery },
  } = useContext(Store);

  return (
    <div className="w-full justify-center mb-12">
      <div className="content container mx-auto my-20">
        <div className="description text-center mb-16">
          <h1 className=" text-3xl font-bold">
            We can&apos;t find any{" "}
            <strong className="text-secondary"> {filterQuery} </strong> :(
          </h1>
          <p className="text-neutral-600 dark:text-primary-light">
            use search again or change categories
          </p>
        </div>
      </div>
    </div>
  );
};
