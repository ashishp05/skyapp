'use client';

import toast from "react-hot-toast";

const { createContext, useState, useEffect, useContext } = require("react");

const cartContext = createContext()

export function CartProvider({children})
{
    const [cart , setCart] = useState([]);

    useEffect(()=>{
  const savedCart = localStorage.getItem("cart");
  console.log(savedCart)
  if(savedCart)
    setCart(JSON.parse(savedCart))
    },[]) 

      // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) =>{
    
    setCart((prev)=> {
        const existing = prev?.find((item) =>item?._id ===product._id)
        if(existing)
        {
            return  prev.map((item) => {
                item._id === product._id ?{ ...item , qty : item.qty + 1 } : item ;
            })
        }
        toast.success("Item AddToCart");
        return [...prev , {...product , qty : 1}]
    })
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  }

  const clearCart = () =>{
    setCart([])
  }
  
  const updateQuantity = (id, qty) => {
  setCart((prev) =>
    prev.map((item) =>
      item._id === id ? { ...item, qty: qty } : item
    )
  );
};
  const cartContextProvider = {
      cart :  cart ,
      addToCart : addToCart ,
      removeFromCart : removeFromCart ,
      clearCart : clearCart ,
      updateQuantity :updateQuantity
    }
    return (
        <cartContext.Provider value={cartContextProvider} >
        {children}
    </cartContext.Provider>
)

}
export function useCart() {
  return useContext(cartContext);
}
