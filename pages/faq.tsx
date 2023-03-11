import FaqContent from "../components/FaqContent";
import { getALlFaqs } from "../lib/DatocmsApiCall";

const Faq = ({ faqData }) => {
  return <FaqContent faqData={faqData} />;
};

export async function getStaticProps() {
  const faqData = await getALlFaqs();

  return {
    props: {
      faqData: faqData.data.allFaqs,
    },
  };
}

export default Faq;
