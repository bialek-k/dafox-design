import React from "react";
import { StructuredText } from "react-datocms";
import { termsQuery } from "../lib/Aqueries";
import { client } from "../lib/apollo";

const Terms = ({ data }) => {
  console.log(data);
  return (
    <div className="prose dark:prose-invert mx-auto prose-indigo px-6 py-24 max-w-4xl">
      <StructuredText data={data.value} />
    </div>
  );
};

export default Terms;

export async function getStaticProps() {
  const data = await client.query(termsQuery);

  return {
    props: {
      data: data.data.term.termsAndConditions,
    },
  };
}
