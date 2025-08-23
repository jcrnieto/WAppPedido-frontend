import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query"); 

  const navigate = useNavigate();
  const { slug, userId } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!query) {
        setResults([]);
        return;
      }
      try {
        const { data } = await axios.get(
          `${baseUrl}/products/getProductByName/${userId}/${query}`
        );
        setResults(data);
      } catch (err) {
        console.error("Error buscando productos:", err);
      }
    };
    fetchProducts();
  }, [query, userId]);

  if (!query) return null; 
  return (
    <div className="p-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-black-600 mb-4"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> Volver
      </button>

      <h2 className="text-xl font-bold mb-4">Resultados de búsqueda:</h2>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {results.map((prod) => (
            <div
              key={prod.id}
              className="rounded-lg overflow-hidden shadow cursor-pointer"
              onClick={() =>
                navigate(`/${slug}/${userId}/product/${prod.id}`)
              }
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
        <p className="text-gray-500">No hay resultados para "{query}"</p>
      )}
    </div>
  );
};

export default SearchResults;

