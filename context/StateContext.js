import product from "@/sanity/schemas/product";
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [totalQuantity, setTotalQuantity] = useState(0);

  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    if (qty > 1) {
      setQty((prevQty) => prevQty - 1);
    }
    return 1;
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantity(
      (prevTotalQuantity) => prevTotalQuantity - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((item) => item._id === id);

    if (value == "inc") {
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item._id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + 1);
    } else if (value == "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems((prevCartItems) =>
          prevCartItems.map((item) =>
            item._id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
        );
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantity((prevTotalQuantity) => prevTotalQuantity - 1);
      }
    }
  };

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + quantity);
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return { ...cartProduct, quantity: cartProduct.quantity + quantity };
        }
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`Product ${qty} added to cart`);
  };

  return (
    <context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantity,
        qty,
        incQty,
        decQty,
        onAdd,
        setShowCart,
        onRemove,
        toggleCartItemQuantity,
      }}
    >
      {children}
    </context.Provider>
  );
};

export const useStateContext = () => useContext(context);
