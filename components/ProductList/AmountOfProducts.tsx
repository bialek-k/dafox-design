interface AmountOfProductsProps {
  amountOfProducts: number;
  totalProducts: number;
  pageSize: number;
}

export const AmountOfProducts = ({
  amountOfProducts,
  totalProducts,
  pageSize,
}: AmountOfProductsProps) => {
  const pages = totalProducts / pageSize;

  return (
    <p className="text-primary-dark font-light dark:text-primary-darkMode w-full text-sm">
      There are{" "}
      <span className="font-bold text-secondary">{totalProducts}</span>
      {amountOfProducts > 1 ? " products" : " product"} availble
    </p>
  );
};
