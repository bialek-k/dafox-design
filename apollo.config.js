module.exports = {
  client: {
    service: {
      name: "datocms",
      url: "https://graphql.datocms.com/",
      // optional headers
      headers: {
        authorization: "Bearer " + process.env.DATOCMS_API_TOKEN,
      },
    },
  },
};
