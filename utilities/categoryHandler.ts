export const convertCategories = (products) => {
  const categories = products
    .map((prod) => prod.category)
    .flat()
    .sort()
    .reduce((finalArray, current) => {
      let obj = finalArray.find((item) => item.name === current.name);
      return obj ? finalArray : finalArray.concat([current]);
    }, []);

  const convertData = Array.from(
    new Set(categories.map((obj) => obj.series))
  ).map((series) => {
    return {
      series: series,
      models: categories
        .filter((s) => s.series === series)
        .map((model) => {
          return {
            id: model.id,
            name: model.name,
          };
        }),
    };
  });
  return convertData;
};

export const getCategoryId = (categories, targetName) => {
  const catArr = categories.filter((cat) =>
    cat.models.find((model) => model.name === targetName)
  );

  if (!catArr[0]) {
    return {
      id: 0,
      name: "All Products",
    };
  }
  return catArr[0].models.filter((model) => model.name === targetName)[0];
};

export const getFilterArr = (filters) => {
  const categories = filters
    .map((prod) => prod.category)
    .flat()
    .sort()
    .reduce((finalArray, current) => {
      let obj = finalArray.find((item) => item.name === current.name);
      return obj ? finalArray : finalArray.concat([current]);
    }, []);

  console.log(categories);
};
