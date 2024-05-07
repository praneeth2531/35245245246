import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const initialState = {
  items: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        items: [...state.items, action.payload],
      };
      case 'REMOVE_FROM_CART':
  return {
    ...state,
    items: state.items.filter(item => item !== action.payload),
  };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = (product) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product });
  };

  const totalPrice = state.items.reduce((total, item) => {
    // Ensure item.price is a valid number before adding to total
    const price = typeof item.price === 'number' ? item.price : 0;
    return total + price;
  }, 0);

  return (
    <CartContext.Provider value={{ state, addToCart, removeFromCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
