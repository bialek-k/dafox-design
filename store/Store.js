import { createContext, useReducer, useEffect } from "react";

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: [],
    totalPrice: 0,
  },
  ctxProductData: {},
  ctxAllProducts: [],
  faqContent: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FAQ_CONTENT": {
      const storedFaqContent = action.payload;
      return { ...state, faqContent: storedFaqContent };
    }

    case "SET_PRODUCT_DATA": {
      const storeProductData = action.payload;
      return { ...state, ctxProductData: { ...storeProductData } };
    }

    case "SET_ALL_PRODUCTS": {
      const storedAllProducts = action.payload;
      return { ...state, ctxAllProducts: [...storedAllProducts] };
    }

    case "CART_ADD_ITEM": {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.slug === newItem.slug
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      const totalPrice = cartItems.reduce(
        (total, item) => item.price + total,
        0
      );

      localStorage.setItem("shoppingCart", JSON.stringify(action.payload));

      return { ...state, cart: { ...state.cart, cartItems, totalPrice } };
    }

    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.slug !== action.payload
      );
      localStorage.removeItem("shoppingCart");

      return { ...state, cart: { ...state.cart, cartItems } };
    }
    default:
      return state;
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  useEffect(() => {
    if (localStorage.getItem("shoppingCart")) {
      dispatch({
        type: "CART_ADD_ITEM",
        payload: JSON.parse(localStorage.getItem("shoppingCart")),
      });
    }
  }, []);

  return <Store.Provider value={value}>{children}</Store.Provider>;
};
