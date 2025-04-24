import React, { createContext, useContext, useReducer } from "react";

// Actions
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const INCREMENT_QUANTITY = "INCREMENT_QUANTITY";
const DECREMENT_QUANTITY = "DECREMENT_QUANTITY";
const CLEAR_CART = "CLEAR_CART";

// Initial cart state
const initialCartState = {
  items: {},
};

export function cleanPrice(price) {
  if (typeof price !== "string") {
    price = price.toString();
  }
  return parseFloat(price.replace(/[^0-9.-]+/g, ""));
}

// Cart reducer to handle actions
const cartReducer = (state, action) => {
  console.log("Dispatching action:", action);
  switch (action.type) {
    case ADD_TO_CART: {
      const { id, product, quantity } = action.payload;
      const cleanedPrice = cleanPrice(product.price);
      return {
        ...state,
        items: {
          ...state.items,
          [id]: {
            product: { ...product, price: cleanedPrice },
            quantity:
              (state.items[id] ? state.items[id].quantity : 0) + quantity,
          },
        },
      };
    }

    case CLEAR_CART:
      return { ...state, items: {} };

    case INCREMENT_QUANTITY: {
      const { id } = action.payload;
      if (!state.items[id]) return state;
      return {
        ...state,
        items: {
          ...state.items,
          [id]: { ...state.items[id], quantity: state.items[id].quantity + 1 },
        },
      };
    }

    case DECREMENT_QUANTITY: {
      const { id } = action.payload;
      if (!state.items[id] || state.items[id].quantity === 1) return state;
      return {
        ...state,
        items: {
          ...state.items,
          [id]: { ...state.items[id], quantity: state.items[id].quantity - 1 },
        },
      };
    }

    case REMOVE_FROM_CART: {
      const { id } = action.payload;
      const newItems = { ...state.items };
      delete newItems[id];
      return {
        ...state,
        items: newItems,
      };
    }

    default:
      return state;
  }
};

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState, () => {
    try {
      const localData = localStorage.getItem("cart");
      return localData ? { items: JSON.parse(localData) } : initialCartState;
    } catch (error) {
      console.log(error);
      return initialCartState;
    }
  });
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart phải được sử dụng trong CartProvider");
  }
  return context;
};
