'use client';

import toast from "react-hot-toast";
import React, { createContext, useState, useEffect, useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (err) {
      toast.error("Failed to load cart from storage.");
      setCart([]);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (err) {
      toast.error("Failed to save cart.");
    }
  }, [cart]);

  // Add product to cart with validation
  const addToCart = (product) => {
    if (!product || !product._id || !product.name || !product.price) {
      toast.error("Invalid product details.");
      return;
    }
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        // Update quantity
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, qty: (item.qty || 1) + 1 }
            : item
        );
      }
      // Add new product
      return [...prev, { ...product, qty: 1 }];
    });
    toast.success("Item added to cart.");
  };

  // Remove product from cart
  const removeFromCart = (id) => {
    if (!id) {
      toast.error("Invalid product ID.");
      return;
    }
    setCart((prev) => prev.filter((item) => item._id !== id));
    toast.success("Item removed from cart.");
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
    toast.success("Cart cleared.");
  };

  // Update quantity with validation
  const updateQuantity = (id, qty) => {
    if (!id || typeof qty !== "number" || qty < 1) {
      toast.error("Invalid quantity.");
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, qty } : item
      )
    );
    toast.success("Quantity updated.");
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
