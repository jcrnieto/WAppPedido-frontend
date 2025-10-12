import { X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../../../../context/CartContext"; 
import CheckoutModal from "./CheckoutModal";
// import CheckoutButton from "./CheckoutButton";

export default function CartSummary({ open, onClose, whatsappNumber }) {
  // console.log("numero de whatsapp", whatsappNumber);
  const { cart, removeFromCart } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // 👉 Estado levantado (persistirá aunque el modal se desmonte)
  const [checkoutData, setCheckoutData] = useState({
    name: "",
    delivery: "sucursal",   // "sucursal" | "domicilio"
    address: "",
    payment: "efectivo",    // "efectivo" | "transferencia" | "combinado"
    notes: "",
  });

  if (!open) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOpenCheckout = () => {
    // si querés cerrar el carrito cuando se abre el modal, descomentá:
    // onClose?.();
    setCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-end z-50">
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
            {/* <CheckoutButton cart={cart} total={total} whatsappNumber={whatsappNumber} /> */}
            <button
                onClick={handleOpenCheckout}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
              >
              Comprar por WhatsApp
            </button>
          </div>
        )}
      </div>

      {/* Modal de confirmación (z-60) */}
      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        whatsappNumber={whatsappNumber}
        formData={checkoutData}
        onFormChange={setCheckoutData}  
      />
    </div>
  );
}

