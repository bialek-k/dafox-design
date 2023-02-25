import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Store } from "../../store/Store";
import { StructuredText } from "react-datocms";
import Button from "../UI/Button";
import { Divider } from "@mui/material";
import Gallery from "../Gallery";
import RelatedProducts from "./RelatedProducts";

export const SingleProductItem = ({
  singleProduct,
  relatedProducts,
}): React.ReactElement => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const [active, setActive] = useState(null);

  const relatedLinkData = singleProduct.category.map((cat) => {
    return {
      id: cat.id,
      name: cat.name,
    };
  });

  useEffect(() => {
    setActive(singleProduct.gallery[0].id);
  }, [singleProduct.gallery]);
  //save
  const addToCartHandler = () => {
    const exsistItem = state.cart.cartItems.find(
      (item) => item.slug === singleProduct.slug
    );
    const quantity = exsistItem ? exsistItem.quantity + 1 : 1;
    dispatch({
      type: "CART_ADD_ITEM",
      payload: {
        ...singleProduct,
        quantity,
        price: singleProduct.promotion
          ? singleProduct.promotion
          : singleProduct.price,
      },
    });
    router.push("/cart");
  };

  return (
    <>
      <div className="container mx-auto px-6 md:px-12 mt-24 mb-48 ">
        <div className="product flex flex-col lg:flex-row justify-center gap-6 mb-10  ">
          <div className="photo w-full mb-2 lg:mb-0 lg:w-1/3 ">
            <Gallery
              active={active}
              setActive={setActive}
              singleProduct={singleProduct}
            />
          </div>
          <div className="productContent lg:w-1/3 flex flex-col justify-between">
            <div className="title">
              <h1 className="font-bold text-2xl md:text-4xl mb-12">
                {singleProduct.name}
              </h1>
              <div className="prose mb-12 text-sm leading-5 md:text-lg dark:prose-invert ">
                <StructuredText data={singleProduct.shortDescription} />
              </div>
            </div>
            <div className="mb-2"></div>
            <div className="flex flex-col">
              <p className="text-black/50 dark:invert">
                {singleProduct.freeShipping && (
                  <p className="font-bold text-2xl text-yellow-400">
                    FREE SHIPPING
                  </p>
                )}
                in stock: <span>{singleProduct.inStock}</span>
              </p>
              <div className="action flex flex-col items-center gap-4">
                <div className="price flex gap-2 items-end md:items-start w-full">
                  <p
                    className={` ${
                      singleProduct.promotion &&
                      "line-through text-1xl font-normal text-black/40 dark:text-white"
                    } font-bold text-3xl`}
                  >
                    ${singleProduct.price}
                  </p>
                  {singleProduct.promotion && (
                    <p className="text-red-500 text-4xl font-bold">
                      ${singleProduct.promotion}
                    </p>
                  )}
                </div>
                <Button
                  addedClassName="w-full px-8 h-12 drop-shadow-md"
                  onClick={() => addToCartHandler()}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-24 dark:invert">
          <Divider />
        </div>
        <div className="prose dark:prose-invert prose-h2:text-yellow-500 prose-h2:tracking-wider prose-h2:my-5 prose-p:m-1 mt-12 prose-li:my-0 text-sm leading-5 ">
          <StructuredText data={singleProduct.description} />
        </div>
        <div className="mt-24 dark:invert">
          <Divider />
        </div>
        <RelatedProducts
          relatedCategoryProducts={relatedProducts}
          relatedLinkData={relatedLinkData}
        />
      </div>
    </>
  );
};
