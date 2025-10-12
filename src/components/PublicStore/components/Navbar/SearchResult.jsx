import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import Breadcrumbs from "../../../../utils/Breadcrumbs";
import { useSearch } from "../../../../context/SearchContext";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const { setSearchQuery } = useSearch();

  const navigate = useNavigate();
  const { slug, userId } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!query) { setResults([]); return; }
      try {
        const { data } = await axios.get(
          `${baseUrl}/products/getProductByName/${userId}/${encodeURIComponent(query)}`
        );
        setResults(data);
      } catch (err) {
        console.error("Error buscando productos:", err);
        setResults([]);
      }
    };
    fetchProducts();
  }, [query, userId]);

  if (!query) return null;

  const homePath = `/${slug}`;

  const handleOpenProduct = async (prod) => {
    try {
      // console.log("Producto seleccionado:", prod);
      setSearchQuery("");

      const { data } = await axios.get(
          `${baseUrl}/categories/getCategoryById/${prod.user_id}/${prod.category_id}`
      );
      
      const categoryId = data.category.id || null;
      const categoryName = data?.category.name || null;
      
      navigate(`/${slug}/${userId}/product/${prod.id}`, {
        state: { categoryId, categoryName },
      });
    } catch (err) {
        console.error("No se pudo obtener la categoría, navegando igual:", err);
        navigate(`/${slug}/${userId}/product/${prod.id}`);
    }
  };

  return (
    <div className="p-4 bg-[#F4F9F4] min-h-screen">
      <Breadcrumbs
        items={[
          { label: "Inicio", to: homePath, onClick: () => setSearchQuery("") },
          { label: `Búsqueda: "${query}"` },
        ]}
      />

      <h2 className="text-xl font-bold mt-3 mb-4">Resultados de búsqueda</h2>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {results.map((prod) => (
            <div
              key={prod.id}
              className="rounded-lg overflow-hidden shadow cursor-pointer bg-white"
              onClick={() => handleOpenProduct(prod)} // pasamos el objeto prod
            >
              <img
                src={prod.images_url?.[0]}
                alt={prod.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-2">
                <h3 className="font-semibold">{prod.name}</h3>
                <p className="text-gray-600">${prod.price}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 mt-4">No hay resultados para “{query}”.</p>
      )}
    </div>
  );
};

export default SearchResults;
