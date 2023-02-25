import React, { useState, useContext } from "react";
import { Store } from "../store/Store";
import Backdrop from "@mui/material/Backdrop";

import { Image as DatoImage } from "react-datocms";

const Gallery = ({ active, setActive, singleProduct }) => {
  const { state } = useContext(Store);
  const [selectedImg, setSelectedImg] = useState();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const thumbClickHandler = (singleThumb) => {
    setActive(singleThumb.id);
    setSelectedImg(singleThumb);
  };

  return (
    <div>
      <div className="hidden w-full md:flex">
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <div className="w-1/3 border-8 shadow-lg">
            <DatoImage
              data={
                !selectedImg
                  ? singleProduct.gallery[0].responsiveImage
                  : selectedImg["responsiveImage"]
              }
            />
          </div>
        </Backdrop>
      </div>
      <div className="relative" onClick={handleToggle}>
        <DatoImage
          data={
            selectedImg
              ? selectedImg["responsiveImage"]
              : singleProduct.gallery[0].responsiveImage
          }
          className="rounded-md"
          layout="responsive"
        />
      </div>
      <div className="thumbs grid grid-cols-4 gap-3 mt-4">
        {singleProduct.gallery.map((singleThumb) => {
          return (
            <a
              key={singleThumb.id}
              onClick={() => thumbClickHandler(singleThumb)}
            >
              <DatoImage
                data={singleThumb.responsiveImage}
                layout="responsive"
                className={` rounded-md hover:opacity-100 cursor-pointer ${
                  active == singleThumb.id
                    ? "opacity-100 ring-4 ring-yellow-400 "
                    : "opacity-70"
                }`}
              />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
