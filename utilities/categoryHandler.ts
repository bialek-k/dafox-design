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
