// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState, useMemo } from "react";
// import { ArrowLeft } from "lucide-react";
// import { useCart } from "../../../context/CartContext";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// const baseUrl = import.meta.env.VITE_API_BASE_URL;

// const DetailProduct = () => {
//   const { addToCart } = useCart(); // 👈 no usamos cart para la cantidad local
//   const { productId, userId } = useParams();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1); // 👈 manejo local

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const { data } = await axios.get(
//           `${baseUrl}/products/getProductById/${userId}/${productId}`
//         );
//         setProduct(data);
//         setQuantity(1); // 👈 siempre arrancamos en 1 para el detalle
//       } catch (error) {
//         console.error("Error al cargar producto:", error);
//       }
//     };
//     fetchProduct();
//   }, [productId, userId]);

//   const subtotal = useMemo(() => {
//     if (!product) return 0;
//     return (product.price || 0) * quantity;
//   }, [product, quantity]);

//   const handleIncrease = () => setQuantity(q => q + 1);
//   const handleDecrease = () => setQuantity(q => (q > 1 ? q - 1 : 1));

//   const handleAddToCart = () => {
//     if (!product) return;
//     // addToCart en tu app suma por delta, así que mandamos +quantity
//     addToCart({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       quantity, // 👈 suma esta cantidad al store
//     });
//   };

//   if (!product) return <p className="p-4">Cargando producto...</p>;

//   // Opcional: formateo de moneda
//   const formatMoney = (n) =>
//     new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(n);

//   return (
//     <div className="p-4">
//       {/* Volver */}
//       <button
//         onClick={() => navigate(-1)}
//         className="flex items-center text-black-600 mb-4"
//       >
//         <ArrowLeft className="w-5 h-5 mr-2" /> Volver
//       </button>

//       {/* Carrusel */}
//       <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }} className="rounded-lg">
//         {product.images_url?.map((img, idx) => (
//           <SwiperSlide key={idx}>
//             <img src={img} alt={`${product.name} ${idx}`} className="w-full rounded-lg z-0" />
//           </SwiperSlide>
//         ))}
//       </Swiper>

//       {/* Info */}
//       <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
//       <p className="text-lg text-gray-700 mb-4">{formatMoney(product.price)}</p>
//       <p className="text-gray-600">{product.description}</p>

//       {/* Cantidad */}
//       <div className="flex items-center gap-4 my-6">
//         <button onClick={handleDecrease} className="px-3 py-1 border rounded-md text-lg">-</button>
//         <span className="text-xl">{quantity}</span>
//         <button onClick={handleIncrease} className="px-3 py-1 border rounded-md text-lg">+</button>
//       </div>

//       {/* Subtotal solo de ESTE producto */}
//       <p className="text-xl font-semibold mb-4">
//         Subtotal: {formatMoney(subtotal)}
//       </p>

//       {/* Agregar al carrito */}
//       <button
//         onClick={handleAddToCart}
//         className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
//       >
//         Agregar al carrito
//       </button>
//     </div>
//   );
// };

// export default DetailProduct;

import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import { useCart } from "../../../context/CartContext";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const DetailProduct = () => {
  const { addToCart } = useCart();
  const { productId, userId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedIdx, setSelectedIdx] = useState(0); // imagen activa

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `${baseUrl}/products/getProductById/${userId}/${productId}`
        );
        setProduct(data);
        setQuantity(1);
        setSelectedIdx(0);
      } catch (error) {
        console.error("Error al cargar producto:", error);
      }
    };
    fetchProduct();
  }, [productId, userId]);

  const images = (product?.images_url ?? []).slice(0, 5); // máx 5
  const mainImage = images[selectedIdx] ?? images[0] ?? "";

  const subtotal = useMemo(() => {
    if (!product) return 0;
    return (product.price || 0) * quantity;
  }, [product, quantity]);

  const handleIncrease = () => setQuantity((q) => q + 1);
  const handleDecrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
    });
  };

  if (!product) return <p className="p-4">Cargando producto...</p>;

  const formatMoney = (n) =>
    new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(n);

  return (
    <div className="p-4">
      {/* Volver */}
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-800 mb-4">
        <ArrowLeft className="w-5 h-5 mr-2" /> Volver
      </button>

      {/* Imagen principal */}
      <div className="w-full">
        {mainImage ? (
          <img
            src={mainImage}
            alt={`${product.name} principal`}
            className="w-full rounded-lg object-cover"
          />
        ) : (
          <div className="w-full h-64 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
            Sin imagen
          </div>
        )}
      </div>

      {/* Miniaturas (solo si hay más de una) */}
      {images.length > 1 && (
        <div className="mt-3 flex items-center gap-2 overflow-x-auto">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIdx(idx)}
              className={`rounded-lg p-1 border transition
                ${selectedIdx === idx ? "border-green-600" : "border-transparent hover:border-gray-300"}`}
              aria-label={`Miniatura ${idx + 1}`}
            >
              <img
                src={img}
                alt={`${product.name} miniatura ${idx + 1}`}
                className="h-16 w-16 object-cover rounded-md"
              />
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
        <button onClick={handleDecrease} className="px-3 py-1 border rounded-md text-lg">-</button>
        <span className="text-xl">{quantity}</span>
        <button onClick={handleIncrease} className="px-3 py-1 border rounded-md text-lg">+</button>
      </div>

      {/* Subtotal */}
      <p className="text-xl font-semibold mb-4">Subtotal: {formatMoney(subtotal)}</p>

      {/* Agregar al carrito */}
      <button
        onClick={handleAddToCart}
        className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default DetailProduct;


