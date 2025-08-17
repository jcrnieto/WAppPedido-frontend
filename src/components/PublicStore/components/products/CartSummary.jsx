import { X } from "lucide-react";
import { useCart } from "../../../../context/CartContext"; 
import CheckoutButton from "./CheckoutButton";

export default function CartSummary({ open, onClose, whatsappNumber }) {
  // console.log("numero de whatsapp", whatsappNumber);
  const { cart, removeFromCart, clearCart } = useCart();

  if (!open) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-end z-50">
      <div className="bg-white w-80 h-full shadow-lg p-4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Tu Carrito</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Lista de productos */}
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-gray-500">No hay productos en el carrito</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="border-b py-2">
                <p>{item.name}</p>
                <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                <p className="font-bold">${item.price * item.quantity}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-sm mt-1"
                >
                  Eliminar
                </button>
              </div>
            ))
          )}
        </div>

        {/* Total y botón comprar */}
        {cart.length > 0 && (
          <div className="mt-4">
            <p className="text-right font-semibold">Total: ${total}</p>
            {/* <button
              onClick={clearCart}
              className="w-full bg-green-600 text-white py-2 rounded-lg mt-2"
            >
              Comprar
            </button> */}
            <CheckoutButton cart={cart} total={total} whatsappNumber={whatsappNumber} />
          </div>
        )}
      </div>
    </div>
  );
}

