import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export const Pagination = ({ totalProducts, pageSize, url }) => {
  const router = useRouter();
  const totalProductNumber = totalProducts;

  const getNavigationLinks = () => {
    const totalPages = totalProductNumber / pageSize + 1;
    let arrOfPages = [];

    for (let i = 1; i < totalPages; i++) {
      arrOfPages.push(i);
    }
    return arrOfPages;
  };

  const paginationLinks = getNavigationLinks().map((pageNumber) => {
    return (
      <div key={pageNumber}>
        <Link href={`${url}${pageNumber}`}>
          <div
            className={`${
              router.asPath === `${url}${pageNumber}`
                ? "bg-yellow-500  "
                : "bg-neutral-100 dark:invert "
            } 
          cursor-pointer w-8 h-8 flex items-center  justify-center rounded-full shadow-md `}
          >
            <p
              className={`${
                router.asPath === `${url}${pageNumber}` && "font-bold"
              } dark:invert`}
            >
              {pageNumber}
            </p>
          </div>
        </Link>
      </div>
    );
  });

  if (totalProducts < 1) {
    return "";
  }

  return (
    <div className="flex flex-col gap-5 justify-center items-center w-full py-12">
      <p className="text-neutral-800 dark:invert drop-shadow-md">Page</p>
      <div className="flex flex-row gap-4">{paginationLinks}</div>
    </div>
  );
};
