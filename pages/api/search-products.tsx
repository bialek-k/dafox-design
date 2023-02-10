import { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../lib/apollo";
import { gql } from "@apollo/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = gql`
    query MyQuery($pattern: String!) {
      allProducts(filter: { name: { matches: { pattern: $pattern } } }) {
        name
        id
        slug
        price
        freeShipping
        promotion
        inStock
        category {
          id
          series
          name
        }
        image {
          responsiveImage {
            alt
            base64
            bgColor
            title
            aspectRatio
            height
            sizes
            src
            srcSet
            webpSrcSet
            width
          }
        }
      }
    }
  `;

  const body = JSON.parse(req.body);

  try {
    const { data } = await client.query({
      query,
      variables: { pattern: body },
    });
    res.status(200).json(data.allProducts);
  } catch (error) {
    if (error.response) {
      console.log(error.response.body);
    }
    res.status(400).json({ status: "ERROR", message: error.message });
  }
}
