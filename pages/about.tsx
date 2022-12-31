import React from "react";

import { client } from "../lib/apollo";
import { aboutQuery } from "../lib/queries";

import { Image as DatoImage } from "react-datocms";
import { StructuredText } from "react-datocms";

const About = ({ data }): React.ReactElement => {
  return (
    <div className=" container mx-auto flex flex-col items-center px-6 my-24 ">
      <div className="prose prose-h1:text-6xl  prose-h1:text-yellow-500 dark:prose-invert prose-h6:text-center prose-h6:my-24 prose-h6:tracking-widest prose-h6:text-3xl prose-h6:font-light prose-h6:text-yellow-500 prose-h6:italic">
        <StructuredText
          data={data.allAbouts[0].content}
          renderBlock={({ record }: any) => {
            switch (record.__typename) {
              case "ImageRecord":
                return (
                  <div className="my-5">
                    <DatoImage
                      className="my-5"
                      objectFit="cover"
                      data={record.image.responsiveImage}
                    />
                  </div>
                );
              case "PostgalleryRecord":
                return (
                  <div className=" flex gap-4  flex-col">
                    {record.postimagesgallery.map((item) => (
                      <div className="flex" key={item.id}>
                        <DatoImage
                          data={item.responsiveImage}
                          objectFit="cover"
                          layout="responsive"
                        />
                      </div>
                    ))}
                  </div>
                );
              default:
                return null;
            }
          }}
        />
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const { data } = await client.query(aboutQuery);

  return {
    props: { data },
  };
}

export default About;
