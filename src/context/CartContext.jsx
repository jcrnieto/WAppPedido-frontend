import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

//   const addToCart = (item) => {
//     setCart((prev) => {
//       const existing = prev.find((i) => i.id === item.id);
//       if (existing) {
//         return prev.map((i) =>
//           i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
//         );
//       }
//       return [...prev, item];
//     });
//   };
    const addToCart = (item) => {
    setCart((prev) => {
        const existing = prev.find((i) => i.id === item.id);
        if (existing) {
        const newQuantity = existing.quantity + item.quantity;
        if (newQuantity <= 0) {
            return prev.filter((i) => i.id !== item.id); // si llega a 0, lo eliminamos
        }
        return prev.map((i) =>
            i.id === item.id ? { ...i, quantity: newQuantity } : i
        );
        }
        return [...prev, item];
    });
    };
  

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de un CartProvider");
  return context;
};