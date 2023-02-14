interface AmountOfProductsProps {
  products: any;
  totalProducts: number;
  currentPage: number;
  pageSize: number;
  searchPage: boolean;
}

export const AmountOfProducts = ({
  products,
  totalProducts,
  currentPage,
  pageSize,
}: AmountOfProductsProps) => {
  const pages = totalProducts / pageSize;

  return (
    <p className="text-neutral-600 font-normal w-full">
      There are{" "}
      <span className="font-bold">
        {(totalProducts / pages) * currentPage} / {totalProducts}
      </span>
      {products.length > 1 ? " products" : " product"} availble
    </p>
  );
};
