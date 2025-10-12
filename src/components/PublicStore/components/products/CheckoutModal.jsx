import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { useCart } from "../../../../context/CartContext";

const DEFAULTS = {
  name: "",
  delivery: "sucursal",
  address: "",
  payment: "efectivo",
  notes: "",
};

export default function CheckoutModal({ open, onClose, whatsappNumber, onFormChange,  formData = DEFAULTS, }) {
    
  const { cart } = useCart();
  // ✅ errores locales
  const [errors, setErrors] = useState({});

  const total = useMemo(
    () => cart.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [cart]
  );

  
  if (!open) return null;

  const { name, delivery, address, payment, notes } = formData;

  const setField = (key, value) =>
    onFormChange((prev) => ({ ...prev, [key]: value }));

  const formatMoney = (n) =>
    new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(n);

  const validate = () => {
    const e = {};
    if (!name?.trim()) e.name = "Ingresá tu nombre completo";
    if (delivery === "domicilio" && !address?.trim()) e.address = "Ingresá la dirección";
    return e;
  };

  const handleConfirm = () => {
    const e = validate();
    setErrors(e);                  
    if (Object.keys(e).length) return;

    let msg = "🛒 *Nuevo pedido*\n\n";
    msg += `👤 *Nombre:* ${name}\n`;
    msg += `🚚 *Entrega:* ${delivery === "sucursal" ? "Retiro por sucursal" : "Envío a domicilio"}\n`;
    if (delivery === "domicilio") msg += `📍 *Dirección:* ${address}\n`;
    msg += `💳 *Pago:* ${
      payment === "efectivo" ? "Efectivo" : payment === "transferencia" ? "Transferencia" : "Combinado"
    }\n`;
    if (notes?.trim()) msg += `📝 *Notas:* ${notes}\n`;
    msg += "\n*Detalle:*\n";
    cart.forEach((item) => {
      msg += `• ${item.quantity} x ${item.name} — $${item.price * item.quantity}\n`;
    });
    msg += `\n💵 *Total:* ${formatMoney(total)}`;

    const url = `${whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-start md:items-center justify-center p-2 md:p-6"
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl h-[92vh] md:h-auto overflow-y-auto p-4 md:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Confirmá tu pedido</h2>
          <button
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Resumen */}
        <div className="bg-white border rounded-lg p-4 mb-6">
          <h3 className="text-base font-semibold mb-3">Resumen</h3>
          {cart.length === 0 ? (
            <p className="text-gray-500">Tu carrito está vacío.</p>
          ) : (
            <ul className="divide-y">
              {cart.map((item) => (
                <li key={item.id} className="py-2 flex justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">${item.price * item.quantity}</p>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-3 text-right font-semibold">Total: {formatMoney(total)}</div>
        </div>

        {/* Formulario */}
        <div className="bg-white border rounded-lg p-4">
          <h3 className="text-base font-semibold mb-3">Datos del pedido</h3>

          <label className="block text-sm font-medium">Nombre completo</label>
          <input
            type="text"
            className={`mt-1 w-full border rounded-md px-3 py-2 ${errors.name ? "border-red-500" : ""}`}
            value={name}
            onChange={(e) => setField("name", e.target.value)}
            placeholder="Ej: Juan Pérez"
          />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}

          <div className="mt-4">
            <label className="block text-sm font-medium">Entrega</label>
            <div className="mt-1 flex gap-4">
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="delivery"
                  value="sucursal"
                  checked={delivery === "sucursal"}
                  onChange={() => setField("delivery", "sucursal")}
                  className="accent-green-600"
                />
                Retiro por sucursal
              </label>
              <label className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="delivery"
                  value="domicilio"
                  checked={delivery === "domicilio"}
                  onChange={() => setField("delivery", "domicilio")}
                  className="accent-green-600"
                />
                Envío a domicilio
              </label>
            </div>
          </div>

          {delivery === "domicilio" && (
            <div className="mt-4">
              <label className="block text-sm font-medium">Dirección</label>
              <input
                type="text"
                className={`mt-1 w-full border rounded-md px-3 py-2 ${errors.address ? "border-red-500" : ""}`}
                value={address}
                onChange={(e) => setField("address", e.target.value)}
                placeholder="Calle 123, Piso/Depto, Localidad"
              />
              {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
            </div>
          )}

          <div className="mt-4">
            <label className="block text-sm font-medium">Método de pago</label>
            <div className="mt-2 space-y-2">
                {[
                { val: 'efectivo', label: 'Efectivo' },
                { val: 'transferencia', label: 'Transferencia' },
                ].map(opt => (
                <label key={opt.val} className="flex items-center gap-2">
                    <input
                    type="radio"
                    name="payment"
                    value={opt.val}
                    checked={payment === opt.val}
                    onChange={() => setField('payment', opt.val)}
                    className="accent-green-600"
                    />
                    {opt.label}
                </label>
                ))}
            </div>
            </div>

          {/* <div className="mt-4">
            <label className="block text-sm font-medium">Método de pago</label>
            <select
              className="mt-1 w-full border rounded-md px-3 py-2"
              value={payment}
              onChange={(e) => setField("payment", e.target.value)}
            >
              <option value="efectivo">Efectivo</option>
              <option value="transferencia">Transferencia</option>
              <option value="combinado">Combinado</option>
            </select>
          </div> */}

          <div className="mt-4">
            <label className="block text-sm font-medium">Notas (opcional)</label>
            <textarea
              className="mt-1 w-full border rounded-md px-3 py-2"
              rows={3}
              value={notes}
              onChange={(e) => setField("notes", e.target.value)}
              placeholder="Aclaraciones para el vendedor..."
            />
          </div>

          <button
            onClick={handleConfirm}
            disabled={!cart.length || !whatsappNumber}
            className="mt-6 w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold py-3 rounded-lg"
          >
            Confirmar pedido por WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
