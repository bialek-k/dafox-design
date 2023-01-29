import Link from "next/link";

const Pagination = ({ currentPage }) => {
  const prevPageUrl =
    currentPage === "2" ? "/shop" : `shop/page${parseInt(currentPage, 10) - 1}`;
  const nextPageUrl = `/shop/page/${parseInt(currentPage, 10) + 1}`;

  return (
    <div className="flex gap-5 w-full items-center justify-center mt-20">
      <Link href={`${router.asPath}/${"2"}`}>Previous Page</Link>
      <Link href={`${router.asPath}/${"2"}`}>Next Page</Link>
    </div>
  );
};

export default Pagination;
