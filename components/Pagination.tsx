import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export const Pagination = ({ totalProducts, currentPage, pageSize }) => {
  const router = useRouter();
  const totalProductNumber = totalProducts;

  const getNavigationLinks = () => {
    const totalPages = totalProductNumber / pageSize + 1;
    let arr = [];
    for (let i = 1; i < totalPages; i++) {
      arr.push(i);
    }
    return arr;
  };

  const paginationLinks = getNavigationLinks().map((pageNumber) => {
    return (
      <div key={pageNumber}>
        <Link href={`/shop/page/${pageNumber}`}>
          <div
            className={`${
              router.asPath === `/shop/page/${pageNumber}` &&
              "bg-yellow-500 font-bold "
            } bg-red-400"
          cursor-pointer w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100`}
          >
            <p
              className={`${
                router.asPath != `/shop/page/${pageNumber}` &&
                "text-neutral-400 "
              } text-md`}
            >
              {pageNumber}
            </p>
          </div>
        </Link>
      </div>
    );
  });

  return (
    <div className="flex flex-col gap-5 justify-center items-center w-full my-24">
      <p className="text-neutral-800">Page</p>
      <div className="flex flex-row gap-4">{paginationLinks}</div>
    </div>
  );
};
