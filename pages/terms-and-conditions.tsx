import React from "react";
import { StructuredText } from "react-datocms";
import { getTermsAndConditins } from "../lib/DatocmsApiCall";

const Terms = ({ termsData }) => {
  return (
    <div className="prose dark:prose-invert mx-auto prose-indigo px-6 py-24 max-w-4xl">
      <StructuredText data={termsData.data.term.termsAndConditions} />
    </div>
  );
};

export default Terms;

export async function getStaticProps() {
  const termsData = await getTermsAndConditins();

  return {
    props: {
      termsData,
    },
  };
}
