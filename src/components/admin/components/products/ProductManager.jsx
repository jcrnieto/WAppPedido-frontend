import { useEffect, useState } from 'react';
import axios from 'axios';
import AddProductForm from './AddProductsForm';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const ProductManager = ({ storeId, storeBrandName }) => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const getProductsWithoutCategory = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/products/no-category/${storeId}`);
      // return data;
      setProducts(data);
    } catch (error) {
      console.error('Error obteniendo productos sin categoría:', error);
      return [];
    }
  };

  useEffect(() => {
    if (storeId) getProductsWithoutCategory();
  }, [storeId]);

  const handleDelete = async (id) => {
    //console.log('handleDelete called with id:', id);
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;
    try {
      await axios.delete(`${baseUrl}/products/deleteProduct/${id}`);
      getProductsWithoutCategory();
    } catch (err) {
      console.error("Error al eliminar producto:", err.message);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleFormSuccess = () => {
    getProductsWithoutCategory();
    setEditingProduct(null);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-blue-600">📦 Productos</h2>
        { products.length > 0 && (
          <ul className="space-y-4">
            {products.map((prod) => (
              <li key={prod.id} className="flex items-center justify-between border p-2 rounded">
                <div className="flex items-center gap-4">
                  {prod.images_url?.[0] && (
                    <img src={prod.images_url[0]} alt={prod.name} className="w-16 h-16 object-cover rounded" />
                  )}
                  <div>
                    <span className="font-medium">{prod.name}</span>
                    <p className="text-sm text-gray-600">${prod.price}</p>
                  </div>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(prod)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Editar
                  </button> 
                  <button
                    onClick={() => handleDelete(prod.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <AddProductForm
          storeId={storeId}
          storeBrandName={storeBrandName}
          product={editingProduct}
          onSuccess={handleFormSuccess}
          onCancelEdit={() => setEditingProduct(null)}
        />
      </div>
    </div>
  );
};

export default ProductManager;
