// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { supabase } from '../../../../config/supabaseConfig';

// const baseUrl = import.meta.env.VITE_API_BASE_URL;

// const AddCategories = ({ storeId }) => {
//   const [name, setName] = useState('');
//   const [imageFile, setImageFile] = useState(null);
//   const [imageUrl, setImageUrl] = useState('');
//   const [categoryId, setCategoryId] = useState(null); // para editar si existe

//   const [loading, setLoading] = useState(false);

//   // 🔄 Traer categoría existente si ya hay
//   useEffect(() => {
//     const fetchCategory = async () => {
//       try {
//         const { data } = await axios.get(`${baseUrl}/categories/getCategoryByUser/${storeId}`);
//         if (data) {
//           setName(data.name || '');
//           setImageUrl(data.image_url || '');
//           setCategoryId(data.id); // guardamos ID si existe para editar
//         }
//       } catch (error) {
//         if (error.response?.status === 404) {
//           console.log('No hay categoría creada aún');
//         } else {
//           console.error('Error al cargar categoría:', error.message);
//         }
//       }
//     };

//     if (storeId) fetchCategory();
//   }, [storeId]);

//   const handleFileChange = (e) => {
//     setImageFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       let finalImageUrl = imageUrl;

//       if (imageFile) {
//         const fileName = `${Date.now()}-${imageFile.name}`;
//         const filePath = `wapedidos/categories/${fileName}`;

//         const { error: uploadError } = await supabase.storage
//           .from('wapedidos') 
//           .upload(filePath, imageFile);

//         if (uploadError) throw uploadError;

//         const { data: publicUrlData } = supabase.storage
//           .from('wapedidos')
//           .getPublicUrl(filePath);

//         finalImageUrl = publicUrlData?.publicUrl;
//         setImageUrl(finalImageUrl);
//       }

//       const payload = {
//         name,
//         image_url: finalImageUrl,
//         user_id: storeId,
//       };

//       if (categoryId) {
//         // editar
//         await axios.patch(`${baseUrl}/categories/updateCategory/${categoryId}`, payload);
//       } else {
//         // crear
//         const res = await axios.post(`${baseUrl}/categories/createCategory`, payload);
//         setCategoryId(res.data.id);
//       }

//       alert('✅ Categoría guardada con éxito!');
//     } catch (error) {
//       console.error('❌ Error al guardar categoría:', error.message);
//       alert('Hubo un error al guardar.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
//       <h2 className="text-xl font-semibold text-blue-600">📁 Categoría</h2>

//       {imageUrl && (
//         <div className="mb-2">
//           <img src={imageUrl} alt="Imagen actual" className="w-24 h-24 object-contain" />
//         </div>
//       )}

//       <div>
//         <label className="block font-semibold mb-1">Nombre de la Categoría</label>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Ej: Ropa de verano"
//           className="border p-2 w-full rounded"
//         />
//       </div>

//       <div>
//         <label className="block font-semibold mb-1">Imagen de la Categoría</label>
//         <input type="file" accept="image/*" onChange={handleFileChange} />
//       </div>

//       <div className="text-right">
//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
//         >
//           {loading ? 'Guardando...' : categoryId ? 'Editar Categoría' : 'Agregar Categoría'}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default AddCategories;

// AddCategoryForm.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import { supabase } from '../../../../config/supabaseConfig';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const AddCategoryForm = ({ storeId, category, onSuccess, onCancelEdit }) => {
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category) {
      setName(category.name || '');
      setImageUrl(category.image_url || '');
    } else {
      setName('');
      setImageUrl('');
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
        setName("");
        setImageFile(null);
        setImageUrl("");
        // setCategoryId(null)
      } else {
        await axios.post(`${baseUrl}/categories/createCategory`, payload);
        setName("");
        setImageFile(null);
        setImageUrl("");
      }

      alert('✅ Categoría guardada');
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

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded shadow space-y-4">
      <h3 className="text-lg font-bold text-blue-600">
        {category ? '✏️ Editar Categoría' : '➕ Nueva Categoría'}
      </h3>  

      {imageUrl && (
        <img src={imageUrl} alt="Preview" className="w-24 h-24 object-cover rounded" />
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
        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
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
