import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useCart } from "../../../context/CartContext";
import Breadcrumbs from "../../../utils/Breadcrumbs";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const DetailProduct = () => {
  const { cart, setItemQuantity } = useCart(); // <-- usamos setItemQuantity
  const { slug, productId, userId } = useParams();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);                // cantidad visible/edición
  const [selectedIdx, setSelectedIdx] = useState(0);

  // para breadcrumbs
  const location = useLocation();
  const { categoryId: stateCatId, categoryName: stateCatName } = location.state || {};
  const catId = stateCatId || product?.category_id || product?.category?.id;
  const catName = stateCatName || product?.category_name || product?.category?.name;

  // cargar producto
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `${baseUrl}/products/getProductById/${userId}/${productId}`
        );
        setProduct(data);
        setSelectedIdx(0);
      } catch (error) {
        console.error("Error al cargar producto:", error);
      }
    };
    fetchProduct();
  }, [productId, userId]);

  // cantidad que YA hay en carrito para este producto
  const inCartQty = product
    ? (cart.find(i => i.id === product.id)?.quantity ?? 0)
    : 0;

  // si cambia carrito o producto, sincronizá el stepper
  useEffect(() => {
    if (!product) return;
    setQty(inCartQty || 1);
  }, [inCartQty, product]);

  const images = (product?.images_url ?? []).slice(0, 5);
  const mainImage = images[selectedIdx] ?? images[0] ?? "";

  const subtotal = useMemo(() => {
    if (!product) return 0;
    return (product.price || 0) * qty;
  }, [product, qty]);

  const formatMoney = n =>
    new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(n);

  // confirmar cantidad = fijar cantidad en carrito (no sumar)
  const handleConfirmQty = () => {
    if (!product) return;
    setItemQuantity(product.id, qty, {
      name: product.name,
      price: product.price,
    });
  };

  if (!product) return <p className="p-4">Cargando producto...</p>;

  return (
    <div className="p-4">
      <Breadcrumbs
        items={[
          { label: "Inicio", to: `/${slug}` },
          catName
            ? { label: catName, to: `/${slug}/${userId}/category/${catId}` }
            : { label: "Producto" },
          { label: product.name },
        ]}
      />

      {/* Imagen principal */}
      <div className="w-full">
        {mainImage ? (
          <img src={mainImage} alt={`${product.name} principal`} className="w-full rounded-lg object-cover" />
        ) : (
          <div className="w-full h-64 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
            Sin imagen
          </div>
        )}
      </div>

      {/* Miniaturas */}
      {images.length > 1 && (
        <div className="mt-3 flex items-center gap-2 overflow-x-auto">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIdx(idx)}
              className={`rounded-lg p-1 border transition ${
                selectedIdx === idx ? "border-green-600" : "border-transparent hover:border-gray-300"
              }`}
              aria-label={`Miniatura ${idx + 1}`}
            >
              <img src={img} alt={`${product.name} miniatura ${idx + 1}`} className="h-16 w-16 object-cover rounded-md" />
            </button>
          ))}
        </div>
      )}

      {/* Info */}
      <h1 className="text-2xl font-bold mt-4 mb-2">{product.name}</h1>
      <p className="text-lg text-gray-700 mb-4">{formatMoney(product.price)}</p>
      <p className="text-gray-600">{product.description}</p>

      {/* Cantidad */}
      <div className="flex items-center gap-4 my-6">
        <button
          onClick={() => setQty(q => Math.max(1, q - 1))}
          className="px-3 py-1 border rounded-md text-lg"
        >
          -
        </button>
        <span className="text-xl">{qty}</span>
        <button
          onClick={() => setQty(q => q + 1)}
          className="px-3 py-1 border rounded-md text-lg"
        >
          +
        </button>
      </div>

      {/* Pista visual de lo que hay en carrito */}
      {inCartQty > 0 && (
        <p className="text-sm text-gray-600 -mt-3 mb-4">
          En el carrito: <span className="font-semibold">{inCartQty}</span>
        </p>
      )}

      {/* Subtotal del producto con qty elegida */}
      <p className="text-xl font-semibold mb-4">
        Subtotal: {formatMoney(subtotal)}
      </p>

      {/* Botón confirma cantidad (actualiza carrito) */}
      <button
        onClick={handleConfirmQty}
        className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
      >
        {inCartQty > 0 ? `Actualizar a ${qty}` : `Agregar ${qty} al carrito`}
      </button>
    </div>
  );
};

export default DetailProduct;



