import React from "react";

const Pagination = ({
  items,
  pageSize,
  onPageChange,
  currentPage,
  availbleProducts,
}) => {
  const pagesCount = Math.ceil(items / pageSize);
  if (pagesCount === 1) return null;

  const pages = Array.from(
    { length: availbleProducts >= pageSize ? pagesCount : 1 },
    (_, i) => i + 1
  );

  return (
    <div className=" my-24 flex flex-col items-center justify-center">
      <p className="text-neutral-500 mb-4">Page:</p>
      <ul className="flex gap-5">
        {pages.map((page) => (
          <li
            key={page}
            className={`${
              currentPage === page ? "bg-yellow-500 " : "bg-neutral-200"
            }  hover:bg-yellow-500 cursor-pointer w-6 h-6 rounded-full p-4 flex items-center justify-center
             
            `}
            onClick={() => onPageChange(page)}
          >
            <p>{page}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
