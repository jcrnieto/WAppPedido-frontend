import { useEffect, useState } from 'react';
import axios from 'axios';
import { supabase } from '../../../../config/supabaseConfig';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const AddCategoryForm = ({ storeId, category, onSuccess, onCancelEdit }) => {
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category) {
      setName(category.name || '');
      setImageUrl(category.image_url || '');
      setImagePreview('');
    } else {
      setName('');
      setImageUrl('');
      setImagePreview('');
    }
    setImageFile(null); // siempre resetea file
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = imageUrl;

      if (imageFile) {
        const fileName = `${Date.now()}-${imageFile.name}`;
        const filePath = `wapedidos/categories/${fileName}`;
        const { error: uploadError } = await supabase.storage.from('wapedidos').upload(filePath, imageFile);
        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage.from('wapedidos').getPublicUrl(filePath);
        finalImageUrl = publicUrlData?.publicUrl;
        setImageUrl(finalImageUrl);
      }

      const payload = {
        name,
        image_url: finalImageUrl,
        user_id: storeId,
      };

      if (category?.id) {
        await axios.patch(`${baseUrl}/categories/updateCategory/${category.id}`, payload);
      } else {
        await axios.post(`${baseUrl}/categories/createCategory`, payload);
      }

      alert('✅ Categoría guardada');
      setName('');
      setImageFile(null);
      setImageUrl('');
      setImagePreview('')
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('❌ Error:', err.message);
      alert('Ocurrió un error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setName("");
    setImageFile(null);
    setImageUrl("");
    if (onCancelEdit) onCancelEdit();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded shadow space-y-4">
      <h3 className="text-lg font-bold text-blue-600">
        {category ? '✏️ Editar Categoría' : '➕ Nueva Categoría'}
      </h3>  
      {/* Vista previa de imagen */}
      {imagePreview ? (
        <div className="mb-2">
          <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover rounded" />
        </div>
      ) : (
        imageUrl && (
          <div className="mb-2">
            <img src={imageUrl} alt="Imagen actual" className="w-24 h-24 object-cover rounded" />
          </div>
        )
      )}


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
        <label className="block font-semibold mb-1">Imagen</label>
        <input 
          type="file" 
          accept="image/*" 
          id="imageInput"
          onChange={handleImageChange} 
          className="hidden"
        />

        <label 
          htmlFor="imageInput" 
          className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block"
        >
          Seleccionar imagen
        </label>
        {imageFile && <p className="mt-2 text-sm text-gray-500">{imageFile.name}</p>}

      </div>

      <div className="text-right">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Guardando...' : category ? 'Actualizar' : 'Crear'}
        </button>

        {category && (
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

export default AddCategoryForm;
