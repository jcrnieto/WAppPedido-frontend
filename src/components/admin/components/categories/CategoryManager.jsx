import { useEffect, useState } from 'react';
import axios from 'axios';
import AddCategoryForm from './AddCategoriesForm';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const CategoryManager = ({ storeId }) => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null); 

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/categories/getAllCategoriesByUser/${storeId}`);
      setCategories(data.categories);
      //console.log('📦 Categorías obtenidas:', data);
    } catch (error) {
      console.error('❌ Error al traer categorías:', error.message);
    }
  };

  useEffect(() => {
    if (storeId) fetchCategories();  
  }, [storeId]);

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de eliminar esta categoría?")) return;
    try {
      await axios.delete(`${baseUrl}/categories/deleteCategory/${id}`);
      fetchCategories();
    } catch (err) {
      console.error("Error al eliminar categoría:", err.message);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleFormSuccess = () => {
    fetchCategories();
    setEditingCategory(null); // resetea edición luego de guardar
  };


  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-blue-600">📋 Categorías</h2>
        {categories.length === 0 ? (
          <p className="text-gray-500">No hay categorías aún.</p>
        ) : (
          <ul className="space-y-4">
            {categories.map((cat) => (
              <li key={cat.id} className="flex items-center justify-between border p-2 rounded">
                <div className="flex items-center gap-4">
                  <img src={cat.image_url} alt={cat.name} className="w-16 h-16 object-cover rounded" />
                  <span className="font-medium">{cat.name}</span>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
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
        <AddCategoryForm
          storeId={storeId}
          category={editingCategory}
          onSuccess={handleFormSuccess}
          onCancelEdit={() => setEditingCategory(null)}
        />
      </div>
    </div>
  );
};

export default CategoryManager;
