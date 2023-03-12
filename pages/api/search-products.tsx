import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../lib/apollo";

import { searchQueryResponse } from "../../lib/DatocmsApiCall";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body);

  try {
    const searchQueryProducts = await client.query(searchQueryResponse(body));

    res.status(200).json(searchQueryProducts.data.allProducts);
  } catch (error) {
    if (error.response) {
      console.log(error.response.body);
    }
    res.status(400).json({ status: "ERROR", message: error.message });
  }
}
