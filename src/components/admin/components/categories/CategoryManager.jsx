import { useEffect, useState } from "react";
import axios from "axios";
import AddCategoryForm from "./AddCategoriesForm";
import AddProductForm from "../products/AddProductsForm";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const CategoryManager = ({ storeId }) => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [openCategoryId, setOpenCategoryId] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/categories/with-products/${storeId}`
      );
      setCategories(data);
      //console.log("✅ Categorías traídas exitosamente:", data);
    } catch (error) {
      console.error("❌ Error al traer categorías:", error.message);
    }
  };

  useEffect(() => {
    if (storeId) fetchCategories();
  }, [storeId]);

  // Eliminar categoría
  const handleDeleteCategory = async (id) => {
    if (!confirm("¿Estás seguro de eliminar esta categoría?")) return;
    try {
      await axios.delete(`${baseUrl}/categories/deleteCategory/${id}`);
      fetchCategories();
    } catch (err) {
      console.error("Error al eliminar categoría:", err.message);
    }
  };

  // Editar categoría
  const handleEditCategory = (category) => {
    setEditingCategory(category);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  // Guardar categoría
  const handleFormCategorySuccess = () => {
    fetchCategories();
    setEditingCategory(null);
  };

  // Abrir / cerrar categoría
  const toggleCategory = (id) => {
    setOpenCategoryId(openCategoryId === String(id) ? null : String(id));
  };

  // Eliminar producto
  const handleDeleteProduct = async (id) => {
    if (!confirm("¿Seguro de eliminar este producto?")) return;
    try {
      await axios.delete(`${baseUrl}/products/deleteProduct/${id}`);
      fetchCategories();
    } catch (err) {
      console.error("Error al eliminar producto:", err.message);
    }
  };

  // Editar producto
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  // Guardar producto
  const handleFormProductSuccess = () => {
    fetchCategories();
    setEditingProduct(null);
  };

  return (
    <div className="space-y-8">
      {/* LISTA DE CATEGORÍAS */}
      <div>
        <h2 className="text-xl font-semibold text-blue-600">📋 Categorías</h2>
        {!categories || categories.length === 0 ? (
          <p className="text-gray-500">No hay categorías aún.</p>
        ) : (
          <ul className="space-y-4">
            {categories.map((cat) => (
              <li key={cat.id} className="border rounded">
                {/* Encabezado de categoría */}
                <div
                  className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => toggleCategory(cat.id)}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={cat.image_url}
                      alt={cat.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <span className="font-medium">{cat.name}</span>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditCategory(cat);
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCategory(cat.id);
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>

                {/* Productos dentro de la categoría */}
                {openCategoryId === String(cat.id) &&
                  Array.isArray(cat.products_wapppedidos) &&
                  cat.products_wapppedidos.length > 0 && (
                    <ul className="p-4 space-y-2 bg-gray-50">
                      {cat.products_wapppedidos.map((prod) => (
                        <li
                          key={prod.id}
                          className="flex items-center justify-between gap-4 border p-2 rounded bg-white"
                        >
                          <div className="flex items-center gap-4">
                            {prod.images_url?.[0] && (
                              <img
                                src={prod.images_url[0]}
                                alt={prod.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                            )}
                            <div>
                              <span className="font-medium">{prod.name}</span>
                              <p className="text-sm text-gray-600">
                                ${prod.price}
                              </p>
                            </div>
                          </div>
                          <div className="space-x-2">
                            <button
                              onClick={() => handleEditProduct(prod)}
                              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(prod.id)}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                              Eliminar
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* FORMULARIO DE CATEGORÍAS */}
      <div>
        <AddCategoryForm
          storeId={storeId}
          category={editingCategory}
          onSuccess={handleFormCategorySuccess}
          onCancelEdit={() => setEditingCategory(null)}
        />
      </div>

      {/* FORMULARIO DE PRODUCTOS */}
      {editingProduct && (
        <div>
          <AddProductForm
            storeId={storeId}
            product={editingProduct}
            onSuccess={handleFormProductSuccess}
            onCancelEdit={() => setEditingProduct(null)}
          />
        </div>
      )}
    </div>
  );
};

export default CategoryManager;

