export const getFinalCategory = (products) => {
  const categories = products
    .map((prod) => prod.category)
    .flat()
    .sort()
    .reduce((finalArray, current) => {
      let obj = finalArray.find((item) => item.name === current.name);
      return obj ? finalArray : finalArray.concat([current]);
    }, []);

  const existingCategories = categories
    .map((category) => category.series)
    .filter((item, index, arr) => arr.indexOf(item) === index);

  let id = 1;
  const convertSeriesToDisplay = (categories, seriesName) => {
    let seriesItems = categories
      .filter((cat) => cat.series === seriesName)
      .map((s) => s.name);

    return {
      name: seriesName,
      id: id++,
      series: [...seriesItems],
    };
  };

  const finalCategories = existingCategories
    .map((item) => convertSeriesToDisplay(categories, item))
    .sort((a, b) => (a.name < b.name ? -1 : 1));

  return finalCategories;
};
