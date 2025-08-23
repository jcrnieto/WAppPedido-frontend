// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// import { ArrowLeft } from "lucide-react";
// import { useCart } from "../../../context/CartContext";
// import { useSearch } from '../../../context/SearchContext';
// import SearchResults from "../components/Navbar/SearchResult";

// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// const baseUrl = import.meta.env.VITE_API_BASE_URL;

// const DetailProduct = () => {
//   const { cart, addToCart } = useCart();
//   const { searchQuery } = useSearch();
//   const { productId, userId } = useParams();
//   const navigate = useNavigate();
//   console.log("🔍 Buscando producto con ID:", productId, "para el usuario:", userId);
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const { data } = await axios.get(`${baseUrl}/products/getProductById/${userId}/${productId}`);
//         setProduct(data);
        
//         const itemInCart = cart.find((item) => item.id === data.id);
//         if (itemInCart) {
//           setQuantity(itemInCart.quantity);
//         }
//       } catch (error) {
//         console.error("Error al cargar producto:", error);
//       }
//     };
//     fetchProduct();
//   }, [productId, userId]);

//   if (!product) {
//     return <p className="p-4">Cargando producto...</p>;
//   }

//   const handleIncrease = () => {
//     const newQuantity = quantity + 1;
//     setQuantity(newQuantity);

//     addToCart({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       quantity: 1, // cada vez que aprieta +, sumamos 1 al carrito
//     });
//   };

//   const handleDecrease = () => {
//     if (quantity > 1) {
//       const newQuantity = quantity - 1;
//       setQuantity(newQuantity);

//       addToCart({
//         id: product.id,
//         name: product.name,
//         price: product.price,
//         quantity: -1, // reducimos en 1
//       });
//     }
//   };

//   return (
//     <div className="p-4">
//       {/* Si hay búsqueda, mostrar SearchResults */}
//       {searchQuery ? (
//         <SearchResults userId={userId} />
//       ) : (
//         <>
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center text-black-600 mb-4"
//           >
//             <ArrowLeft className="w-5 h-5 mr-2" /> Volver
//           </button>
//           <Swiper
//             modules={[Navigation, Pagination]}
//             navigation
//             pagination={{ clickable: true }}
//             className="rounded-lg"
//             >
//             {product.images_url?.map((img, idx) => (
//                 <SwiperSlide key={idx}>
//                 <img src={img} alt={`${product.name} ${idx}`} className="w-full rounded-lg" />
//                 </SwiperSlide>
//             ))}
//           </Swiper>

//           <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
//           <p className="text-lg text-gray-700 mb-4">${product.price}</p>
//           <p className="text-gray-600">{product.description}</p>

//           {/* Selector de cantidad */}
//           <div className="flex items-center gap-4 mb-6">
//             <button
//               onClick={handleDecrease}
//               className="px-3 py-1 border rounded-md text-lg"
//             >
//               -
//             </button>
//             <span className="text-xl">{quantity}</span>
//             <button
//               onClick={handleIncrease}
//               className="px-3 py-1 border rounded-md text-lg"
//             >
//               +
//             </button>
//           </div>

//           {/* Total */}
//           <p className="text-xl font-semibold mb-6">
//             Total: ${product.price * quantity}
//           </p>
//         </>
//       )}
//     </div>
//   );
// };

// export default DetailProduct;

import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { ArrowLeft } from "lucide-react";
import { useCart } from "../../../context/CartContext";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const DetailProduct = () => {
  const { cart, addToCart } = useCart();
  const { productId, userId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `${baseUrl}/products/getProductById/${userId}/${productId}`
        );
        setProduct(data);

        // Si el producto ya está en el carrito, mantener su cantidad
        const itemInCart = cart.find((item) => item.id === data.id);
        if (itemInCart) {
          setQuantity(itemInCart.quantity);
        }
      } catch (error) {
        console.error("Error al cargar producto:", error);
      }
    };
    fetchProduct();
  }, [productId, userId]);

  if (!product) {
    return <p className="p-4">Cargando producto...</p>;
  }

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1, // cada vez que aprieta +, sumamos 1
    });
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);

      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: -1, // reducimos en 1
      });
    }
  };

  return (
    <div className="p-4">
      {/* Botón volver */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-black-600 mb-4"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> Volver
      </button>

      {/* Carrusel de imágenes */}
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        className="rounded-lg"
      >
        {product.images_url?.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={img}
              alt={`${product.name} ${idx}`}
              className="w-full rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Info */}
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-lg text-gray-700 mb-4">${product.price}</p>
      <p className="text-gray-600">{product.description}</p>

      {/* Selector de cantidad */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={handleDecrease}
          className="px-3 py-1 border rounded-md text-lg"
        >
          -
        </button>
        <span className="text-xl">{quantity}</span>
        <button
          onClick={handleIncrease}
          className="px-3 py-1 border rounded-md text-lg"
        >
          +
        </button>
      </div>

      {/* Total */}
      <p className="text-xl font-semibold mb-6">
        Total: ${product.price * quantity}
      </p>
    </div>
  );
};

export default DetailProduct;
