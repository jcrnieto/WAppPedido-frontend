// import { createContext, useContext, useState } from "react";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//     const addToCart = (item) => {
//     setCart((prev) => {
//         const existing = prev.find((i) => i.id === item.id);
//         if (existing) {
//         const newQuantity = existing.quantity + item.quantity;
//         if (newQuantity <= 0) {
//             return prev.filter((i) => i.id !== item.id); // si llega a 0, lo eliminamos
//         }
//         return prev.map((i) =>
//             i.id === item.id ? { ...i, quantity: newQuantity } : i
//         );
//         }
//         return [...prev, item];
//     });
//     };
  

//   const removeFromCart = (id) => {
//     setCart((prev) => prev.filter((item) => item.id !== id));
//   };

//   const clearCart = () => setCart([]);

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) throw new Error("useCart debe usarse dentro de un CartProvider");
//   return context;
// };

// context/CartContext.jsx
import { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // [{ id, name, price, quantity }]

  /**
   * Suma "item.quantity" a lo que ya hay en el carrito.
   * Útil para listados rápidos (CTA "Agregar").
   */
  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        const newQuantity = existing.quantity + (item.quantity ?? 1);
        if (newQuantity <= 0) {
          return prev.filter((i) => i.id !== item.id);
        }
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: newQuantity } : i
        );
      }
      // si no existe, lo agregamos con los metadatos que lleguen
      const initialQty = item.quantity ?? 1;
      if (initialQty <= 0) return prev; // no agregamos cantidades no válidas
      return [...prev, { ...item, quantity: initialQty }];
    });
  };

  /**
   * Fija la cantidad EXACTA para un producto.
   * Úsalo en el detalle para evitar confusiones (“Actualizar a X”).
   * Si quantity <= 0, elimina el ítem.
   * meta es opcional: { name, price, ... } para crear si no existe.
   */
  const setItemQuantity = (id, quantity, meta = {}) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === id);

      // eliminar si 0 o menor
      if (!quantity || quantity <= 0) {
        return prev.filter((i) => i.id !== id);
      }

      if (existing) {
        return prev.map((i) =>
          i.id === id ? { ...i, quantity } : i
        );
      }
      // si no existe, lo creamos con esa cantidad y los metadatos recibidos
      return [...prev, { id, quantity, ...meta }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  // helpers opcionales
  const getItemQuantity = (id) =>
    cart.find((i) => i.id === id)?.quantity ?? 0;

  const total = useMemo(
    () => cart.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [cart]
  );

  const totalItems = useMemo(
    () => cart.reduce((sum, i) => sum + i.quantity, 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,          // suma
        setItemQuantity,    // fija
        removeFromCart,
        clearCart,
        getItemQuantity,
        total,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return ctx;
};
