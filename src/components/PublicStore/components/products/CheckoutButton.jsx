
const CheckoutButton = ({ cart, total, whatsappNumber }) => {
  console.log("CheckoutButton whatsapp", whatsappNumber);
  if (!cart || cart.length === 0) return null;

  const handleCheckout = () => {
    // Construimos el mensaje de WhatsApp
    let message = "🛒 *Nuevo pedido:*\n\n";
    cart.forEach(item => {
      message += `- ${item.quantity} x ${item.name} $${item.price * item.quantity}\n`;
    });
    message += `\n💵 *Total:* $${total}`;

    // Codificamos el mensaje para URL
    const encodedMessage = encodeURIComponent(message);

    // Armamos la URL de WhatsApp
    const whatsappUrl = `${whatsappNumber}?text=${encodedMessage}`;

    // Redirigimos a WhatsApp
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full mt-4"
    >
      Comprar por WhatsApp
    </button>
  );
};

export default CheckoutButton;
