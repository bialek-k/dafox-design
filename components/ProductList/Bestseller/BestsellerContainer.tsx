import Link from "next/link";
import { ProductList } from "../ProductList";
import { motion } from "framer-motion";
import Product from "../../Product";

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
  bestseller: boolean;
  bestsellerProducts: any;
}

export const BestsellerContainer = ({ bestsellerProducts }) => {
  return (
    <div className="container mx-auto px-6">
      <div className="description flex flex-col gap-2 mb-12">
        <h2 className="text-3xl text-center ">
          Our <strong className="text-secondary">Bestseller</strong>
        </h2>
        <p className="text-center text-primary-dark dark:text-primary-light">
          Steering wheels from this collection are the most purchased items by
          customers{" "}
        </p>
      </div>
      <div className="grid gap-5 gap-y-8 grid-cols-2 my-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {bestsellerProducts.map((product: ProductProps) => (
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
                  bestseller={product.bestseller}
                />
              </motion.div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};
