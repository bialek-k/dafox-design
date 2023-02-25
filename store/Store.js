import { createContext, useReducer, useEffect } from "react";

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: [],
    totalPrice: 0,
  },
  ctxAllProducts: [],
  faqContent: [],
  searchProducts: [],
  filterQueries: "",
  filterCategory: { id: 0, name: "All Products" },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SEARCH_PRODUCTS": {
      const searchProducts = action.payload;
      return { ...state, searchProducts };
    }

    case "SET_FILTER_CATEGORY": {
      return { ...state, filterCategory: action.payload };
    }

    case "SET_FAQ_CONTENT": {
      const storedFaqContent = action.payload;
      return { ...state, faqContent: storedFaqContent };
    }

    case "SET_ALL_PRODUCTS": {
      const storedAllProducts = action.payload;
      return { ...state, ctxAllProducts: [...storedAllProducts] };
    }

    case "ADD_FILTER_QUERY": {
      const query = action.payload;
      return { ...state, filterQueries: query };
    }

    case "REMOVE_FILTER_QUERY": {
      return { ...state, filterQueries: "" };
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
