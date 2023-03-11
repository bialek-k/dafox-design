import React from "react";
import { StructuredText } from "react-datocms";
import { getPrivacyPolicy } from "../lib/DatocmsApiCall";

const PrivacyPolicy = ({ data }) => {
  const policy = data.privacyPolicy;

  return (
    <div className="prose dark:prose-invert mx-auto prose-indigo px-6 py-24 max-w-4xl">
      <div
        className="title text-center prose mx-auto prose-h1:m-0  prose-h1:text-yellow-500 prose-h2:m-0
      prose-h2:tracking-widest mb-12 dark:prose-h2:text-white dark:prose-a:text-white"
      >
        <StructuredText data={policy.title} />
      </div>
      <div className="content prose-p:my-2">
        <StructuredText data={policy.content} />
      </div>
    </div>
  );
};

export default PrivacyPolicy;

export async function getStaticProps() {
  const privacyPolicyData = await getPrivacyPolicy();

  return {
    props: { data: privacyPolicyData.data },
  };
}
