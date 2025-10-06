import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchResults from "../Navbar/SearchResult";
import { useSearch } from '../../../../context/SearchContext';
import {useParams, useNavigate } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const AllProductByIdCategoryIsNull = ({userId}) => {
    //console.log("userId en allProduct:", userId);
    const [products, setProducts] = useState([]);
    const { searchQuery } = useSearch();
    const navigate = useNavigate();
    const { slug } = useParams();

    useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/products/getAllProductsByIdCategoryIsNull/${userId}`);
        
          setProducts( data || []);
      } catch (err) {
        console.error("Error obteniendo categoría y productos:", err);
      }
    };

    fetchAllProducts();
  }, [userId]);

   return (
      <div className="p-2">

      {/* Si hay búsqueda, mostrar SearchResults */}
      {searchQuery ? (
        <SearchResults userId={userId} />
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-6">Productos</h2>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="rounded-xl overflow-hidden mt-7 shadow"
                  onClick={() =>
                    navigate(`/${slug}/${userId}/product/${prod.id}`)
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
            <p className="text-gray-500">No hay productos.</p>
          )}
        </>
      )}
    </div>
   )
}

export default AllProductByIdCategoryIsNull;