import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const AllProductsByCategory = () => {
  const { userId, categoryId } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
//   console.log('categoryid:', categoryId);
//   console.log('userid:', userId);

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/categories/with-products/${userId}`);
        
        // Buscar la categoría que coincida
        const category = data.find(cat => cat.id === categoryId);
        if (category) {
          setCategoryName(category.name);
          setProducts(category.products_wapppedidos || []);
        } else {
          setCategoryName("Categoría no encontrada");
          setProducts([]);
        }
      } catch (err) {
        console.error("Error obteniendo categoría y productos:", err);
      }
    };

    fetchCategoryAndProducts();
  }, [categoryId, userId]);

  return (
    <div className="p-4">
      {/* Botón volver */}
      <button
        className="flex items-center text-blue-600 mb-4"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> 
      </button>

      <h2 className="text-2xl font-bold mb-6">{categoryName}</h2>

      {/* Grid de productos */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          { products.map((prod) => (
            <div
              key={prod.id}
              className="bg-white border rounded-xl shadow hover:shadow-lg transition-shadow"
            >
              <img
                src={prod.images_url?.[0]}
                alt={prod.name}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{prod.name}</h3>
                <p className="text-gray-600">${prod.price}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No hay productos en esta categoría.</p>
      )}
    </div>
  );
};

export default AllProductsByCategory;
