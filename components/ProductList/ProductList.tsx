import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import Product from "./Product";

interface ProductProps {
  name?: string;
  title?: string;
  price?: number;
  data?: any;
  promotion?: any;
  freeShipping?: any;
  category?: any;
  slug?: string;
  id?: any;
}

export const ProductList = ({ queryProducts }) => {
  return (
    <div className="grid gap-5 gap-y-8 grid-cols-2 my-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {queryProducts.map((product: ProductProps) => (
        <Link href={`/shop/${product.slug}`} key={product.id}>
          <a>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="dark:border dark:rounded-md dark:border-neutral-900 dark:shadow-lg"
            >
              <Product
                data={product}
                title={product.name}
                price={product.price}
                promotion={product.promotion}
                freeShipping={product.freeShipping}
              />
            </motion.div>
          </a>
        </Link>
      ))}
    </div>
  );
};
