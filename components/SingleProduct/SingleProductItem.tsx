import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Store } from "../../store/Store";
import { StructuredText } from "react-datocms";
import Button from "../UI/Button";

import { Divider } from "@mui/material";

import Gallery from "../Gallery";
import RelatedProducts from "./RelatedProducts";

const SingleProduct = ({ allProductsData }): React.ReactElement => {
  const { state, dispatch } = useContext(Store);
  const { ctxProductData } = state;
  const router = useRouter();
  const [active, setActive] = useState(null);

  const relatedProducts = allProductsData.filter((prod) =>
    prod.category.some((cat) => cat.name === ctxProductData.category[0].name)
  );

  useEffect(() => {
    setActive(ctxProductData.gallery[0].id);
  }, [ctxProductData.gallery]);

  const addToCartHandler = () => {
    const exsistItem = state.cart.cartItems.find(
      (item) => item.slug === ctxProductData.slug
    );
    const quantity = exsistItem ? exsistItem.quantity + 1 : 1;
    dispatch({
      type: "CART_ADD_ITEM",
      payload: {
        ...ctxProductData,
        quantity,
        price: ctxProductData.promotion
          ? ctxProductData.promotion
          : ctxProductData.price,
      },
    });
    router.push("/cart");
  };

  return (
    <>
      <div className="container mx-auto px-6 md:px-12 mt-24 mb-96 ">
        <div className="product flex flex-col lg:flex-row justify-center gap-6 mb-10  ">
          <div className="photo w-full mb-2 lg:mb-0 lg:w-1/3">
            <Gallery active={active} setActive={setActive} />
          </div>
          <div className="productContent lg:w-1/3 flex flex-col justify-between">
            <div className="title">
              <h1 className="font-bold text-4xl mb-12">
                {ctxProductData.name}
              </h1>
              <div className="prose content mb-12 dark:prose-invert ">
                <StructuredText data={ctxProductData.shortDescription} />
              </div>
            </div>
            <div className="mb-2"></div>
            <div className="flex flex-col">
              <p className="text-black/50 dark:invert">
                in stock: <span>{ctxProductData.inStock}</span>
              </p>
              <div className="action  flex items-center gap-4">
                <div className="price">
                  <p
                    className={` ${
                      ctxProductData.promotion &&
                      "line-through text-1xl font-normal text-black/40 dark:text-white"
                    } font-bold text-3xl`}
                  >
                    ${ctxProductData.price}
                  </p>
                  {ctxProductData.promotion && (
                    <p className="text-red-500 text-4xl font-bold">
                      ${ctxProductData.promotion}
                    </p>
                  )}
                </div>
                <Button
                  addedClassName="w-full px-8"
                  onClick={() => addToCartHandler()}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-24">
          <Divider />
        </div>
        <div className="prose dark:prose-invert prose-h2:text-yellow-500 prose-h2:tracking-wider prose-h2:my-5 prose-p:m-1 mt-12 prose-li:my-0 ">
          <StructuredText data={ctxProductData.description} />
        </div>
        <div className="mt-24">
          <Divider />
        </div>
        <RelatedProducts relatedCategoryProducts={relatedProducts} />
      </div>
    </>
  );
};

export default SingleProduct;
