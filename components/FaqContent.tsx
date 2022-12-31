import React from "react";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const FaqContent = ({ data }) => {
  return (
    <section className="container mx-auto py-24 px-6 mb-24">
      <div className="title flex flex-col pb-8">
        <h1 className="font-bold text-2xl lg:text-3xl text-center">
          Frequently asked questions
        </h1>
      </div>
      <div className="content lg:w-3/4 lg:mx-auto">
        {data.allFaqs.map((faq) => {
          return (
            <Accordion key={faq.id} className="my-4 shadow-lg dark:invert  ">
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className=" font-bold hover:text-yellow-500 ">
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="text-black/80 ">{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
      <div className="info lg:w-3/4 lg:mx-auto text-center mt-12">
        <h2 className="text-xl mb-2">Remember!</h2>
        <span>
          if you need more information, you can alwasy{" "}
          <Link href="/contact">
            <a className="font-bold text-yellow-500 cursor-help">contact</a>
          </Link>{" "}
          with us!
        </span>
      </div>
    </section>
  );
};

export default FaqContent;
