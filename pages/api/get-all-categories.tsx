import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../lib/apollo";
import { gql } from "@apollo/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const getAllCategories = gql`
    query MyQuery {
      allCategories(first: "50") {
        series
        name
        id
      }
    }
  `;

  try {
    const { data } = await client.query({ query: getAllCategories });

    const convertInputData = (inputData) => {
      const results = Array.from(new Set(inputData.map((obj) => obj.series)))
        .map((series) => {
          return {
            series: series,
            models: inputData
              .filter((s) => s.series == series)
              .map((model) => {
                return {
                  id: model.id,
                  name: model.name,
                };
              }),
          };
        })
        .sort((a, b) => {
          if (a.series === "All") return -1;
          if (b.series === "All") return 1;
          return a.series > b.series ? 1 : -1;
        });
      return results;
    };

    res.status(200).json(convertInputData(data.allCategories));
  } catch (error) {
    if (error.response) {
      console.log(error.response.body);
    }
    res.status(400).json({ status: "ERROR", message: error.message });
  }
}
