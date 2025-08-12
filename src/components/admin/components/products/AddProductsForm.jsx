import { useEffect, useState } from 'react';
import axios from 'axios';
import { supabase } from '../../../../config/supabaseConfig';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const AddProductForm = ({ storeId, product, onSuccess, onCancelEdit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [images, setImages] = useState([]); // archivos nuevos
  const [imagesPreview, setImagesPreview] = useState([]);
  const [savedImages, setSavedImages] = useState([]); // urls guardadas
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Traer productos al iniciar
  useEffect(() => {
    axios.get(`${baseUrl}/categories/getAllCategoriesByUser/${storeId}`)
      .then(({ data }) => setCategories(data.categories))
      .catch(err => console.error('❌ Error al traer categorías:', err.message));
  }, [storeId]);

  // Cargar datos cuando se edita
  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setDescription(product.description || '');
      setPrice(product.price || '');
      setCategoryId(product.category_id || '');
      setSavedImages(product.images_url || []);
      setImages([]);
      setImagesPreview([]);
    } else {
      setName('');
      setDescription('');
      setPrice('');
      setCategoryId('');
      setSavedImages([]);
      setImages([]);
      setImagesPreview([]);
    }
  }, [product]);

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setImagesPreview(files.map(f => URL.createObjectURL(f)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImages = [...savedImages];

      // Subir imágenes nuevas
      for (let file of images) {
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = `wapedidos/products/${fileName}`;
        const { error: uploadError } = await supabase.storage.from('wapedidos').upload(filePath, file);
        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage.from('wapedidos').getPublicUrl(filePath);
        finalImages.push(publicUrlData?.publicUrl);
      }

      const payload = {
        name,
        description,
        price: parseFloat(price),
        images_url: finalImages,
        category_id: categoryId,
        user_id: storeId,
      };

      if (product?.id) {
        await axios.patch(`${baseUrl}/products/updateProduct/${product.id}`, payload);
      } else {
        await axios.post(`${baseUrl}/products/createProduct`, payload);
      }

      alert('✅ Producto guardado');
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('❌ Error:', err.message);
      alert('Ocurrió un error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    if (onCancelEdit) onCancelEdit();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded shadow space-y-4">
      <h3 className="text-lg font-bold text-blue-600">
        {product ? '✏️ Editar Producto' : '➕ Nuevo Producto'}
      </h3>

      <div>
        <label className="block font-semibold mb-1">Nombre</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Descripción</label>
        <textarea
          className="w-full p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Precio</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Categoría</label>
        <select
          className="w-full p-2 border rounded"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value === "null" ? null : e.target.value)}
        >
          <option value="">Seleccione una categoría</option>
          <option value="null">Sin categoría</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Vista previa de imágenes nuevas */}
      {imagesPreview.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {imagesPreview.map((img, idx) => (
            <img key={idx} src={img} alt="preview" className="w-24 h-24 object-cover rounded" />
          ))}
        </div>
      )}

      {/* Imágenes ya guardadas */}
      {savedImages.length > 0 && imagesPreview.length === 0 && (
        <div className="flex gap-2 flex-wrap">
          {savedImages.map((url, idx) => (
            <img key={idx} src={url} alt="saved" className="w-24 h-24 object-cover rounded" />
          ))}
        </div>
      )}

      <div>
        <label className="block font-semibold mb-1">Imágenes</label>
        <input
          type="file"
          accept="image/*"
          multiple
          id="imagesInput"
          onChange={handleImagesChange}
          className="hidden"
        />
        <label
          htmlFor="imagesInput"
          className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block"
        >
          Seleccionar imágenes
        </label>
      </div>

      <div className="text-right">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Guardando...' : product ? 'Actualizar' : 'Crear'}
        </button>
        {product && (
          <button
            type="button"
            onClick={handleCancelEdit}
            className="mt-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            ❌ Cancelar edición
          </button>
        )}
      </div>
    </form>
  );
};

export default AddProductForm;
