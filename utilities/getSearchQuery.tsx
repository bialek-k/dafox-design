export const getSearchQuery = (string) => {
  let query = string.trim().replace(/\s+/g, " ").split(" ");

  if (query.length > 1) {
    query = query.join("|");
  }

  console.log(query);

  return query;
};
