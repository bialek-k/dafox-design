interface AmountOfProductsProps {
  amountOfProducts: number;
  totalProducts: number;
  currentPage: number;
  pageSize: number;
}

export const AmountOfProducts = ({
  amountOfProducts,
  totalProducts,
  currentPage,
  pageSize,
}: AmountOfProductsProps) => {
  const pages = totalProducts / pageSize;

  return (
    <p className="text-neutral-500 w-full">
      There are{" "}
      <span className="font-bold text-yellow-500">{totalProducts}</span>
      {amountOfProducts > 1 ? " products" : " product"} availble
    </p>
  );
};
