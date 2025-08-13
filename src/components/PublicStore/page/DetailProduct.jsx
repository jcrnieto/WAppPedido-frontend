import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const DetailProduct = () => {
  const { productId, userId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/products/getProductById/${userId}/${productId}`);
        setProduct(data);
      } catch (error) {
        console.error("Error al cargar producto:", error);
      }
    };
    fetchProduct();
  }, [productId, userId]);

  if (!product) {
    return <p className="p-4">Cargando producto...</p>;
  }

  return (
    <div className="p-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-black-600 mb-4"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> Volver
      </button>

      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        className="rounded-lg"
        >
        {product.images_url?.map((img, idx) => (
            <SwiperSlide key={idx}>
            <img src={img} alt={`${product.name} ${idx}`} className="w-full rounded-lg" />
            </SwiperSlide>
        ))}
      </Swiper>

      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-lg text-gray-700 mb-4">${product.price}</p>
      <p className="text-gray-600">{product.description}</p>
    </div>
  );
};

export default DetailProduct;
