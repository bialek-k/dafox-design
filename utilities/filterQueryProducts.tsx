interface QueryProducts {
  products: any;
  queryArray: string[];
  length: number;
}

export const filterQuerProducts = (products, queryArray): QueryProducts => {
  return products.filter((product) => {
    return queryArray.every((query) => {
      return product.name.toLowerCase().includes(query.toLowerCase());
    });
  });
};
