const sortAscending = (a, b) => (a.price < b.price ? -1 : 1);
const sortDescending = (a, b) => (a.price < b.price ? 1 : -1);

export const getSortingMethod = (sortingMethod, products) => {
  if (sortingMethod === "Price: low to high") {
    const ascending = [...products];
    ascending.sort(sortAscending);
    return ascending;
  }

  if (sortingMethod === "Price: high to low") {
    const descending = [...products];
    descending.sort(sortDescending);
    return descending;
  }

  if (sortingMethod === "Sort by latest") {
    return products;
  }
};
