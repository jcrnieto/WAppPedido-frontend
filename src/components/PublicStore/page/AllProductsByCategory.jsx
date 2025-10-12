import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchResults from "../components/Navbar/SearchResult";
import Breadcrumbs from '../../../utils/Breadcrumbs';
import { useSearch } from '../../../context/SearchContext';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const AllProductsByCategory = () => {
  const { slug, userId, categoryId } = useParams();
  const navigate = useNavigate();
  
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');

  const { searchQuery } = useSearch();

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

  const homePath = `/${slug}`;
  // console.log("homePath:", homePath);
  const categoriasPath = null;
  // console.log("categoriasPath:", categoriasPath);

  return (
    <div className="p-2 bg-[#F4F9F4]">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Inicio", to: homePath },
          // categoriasPath ? { label: "Categorías", to: categoriasPath } : { label: "Categorías" },
          { label: categoryName || "…" },
        ]}
      />

      {/* Si hay búsqueda, mostrar SearchResults */}
      {searchQuery ? (
        <SearchResults userId={userId} />
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-6">{categoryName}</h2>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="rounded-xl overflow-hidden mt-7 shadow"
                  onClick={() =>
                    // navigate(`/${slug}/${userId}/product/${prod.id}`)
                    navigate(`/${slug}/${userId}/product/${prod.id}`, {
                      state: { categoryId, categoryName },  
                    })
                  }
                >
                  <div className="aspect-square">
                    <img
                      src={prod.images_url?.[0]}
                      alt={prod.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
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
        </>
      )}
    </div>
  );
};

export default AllProductsByCategory;
