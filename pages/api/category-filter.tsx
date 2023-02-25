import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../lib/apollo";
import { gql } from "@apollo/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = gql`
    query MyQuery($allIn: [ItemId]) {
      allProducts(filter: { category: { allIn: $allIn } }) {
        name
      }
    }
  `;

  const body = JSON.parse(req.body);
  console.log(body.id);

  const categoryID = body.id;

  try {
    const { data } = await client.query({
      query,
      variables: { allIn: categoryID },
    });
    res.status(200).json(data.allProducts);
  } catch (error) {
    if (error.response) {
      console.log(error.response.body);
    }
    res.status(400).json({ status: "ERROR", message: error.message });
  }
}
