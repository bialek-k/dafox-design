import React, { useState, useContext } from "react";
import { Store } from "../store/Store";
import ReactDOM from "react-dom";
import { Image as DatoImage } from "react-datocms";
import { motion } from "framer-motion";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

const FullSizeImage = ({
  selectedImg,
  setShowFullImg,
  setActive,
  setSelectedImg,
  active,
  handleClose,
  open,
  setOpen,
  handleToggle,
}) => {
  const { state } = useContext(Store);
  const { ctxProductData } = state;

  const thumbClickHandler = (singleThumb) => {
    setActive(singleThumb.id);
    setSelectedImg(singleThumb);
  };
  const handleClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setShowFullImg(false);
    }
  };

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={handleClose}
    >
      <div className="flex flex-col  items-center justify-center  ">
        <div className=" w-110 pb-10">
          <DatoImage
            data={selectedImg.responsiveImage}
            className="border-8  shadow-lg"
            objectFit="contain"
            layout="responsive"
          />
        </div>
        <div className="thumbs flex justify-center gap-4">
          {ctxProductData.gallery.map((singleThumb) => {
            return (
              <a
                key={singleThumb.id}
                onClick={() => thumbClickHandler(singleThumb)}
              >
                <DatoImage
                  data={singleThumb.responsiveImage}
                  layout="responsive"
                  objectFit="contain"
                  className={` h-36 aspect-square rounded-md hover:ring-4 hover:ring-yellow-400 cursor-pointer ${
                    active == singleThumb.id
                      ? "opacity-100 ring-4 ring-yellow-400 "
                      : ""
                  }`}
                />
              </a>
            );
          })}
        </div>
      </div>
    </Backdrop>
  );
};

export default FullSizeImage;
