import { useState } from 'react';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const DataPersonal = ({ store }) => {
  const [formData, setFormData] = useState({
    full_name: store.full_name,
    phone: store.phone,
    address: store.address,
    city: store.city,
    brand_name: store.brand_name,
    opening_hours: store.opening_hours,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    setSuccess(false);
    console.log('📝 Actualizando datos:', formData);
    try {
      const response = await axios.patch(
        `${baseUrl}/personalData/updatePersonalData/${store.id}`,
        { ...formData, id: store.id }
      );

      console.log('✅', response.data.message);
      setSuccess(true);
    } catch (error) {
      console.error('❌ Error actualizando datos:', error.response?.data?.message || error.message);
      alert('Error al guardar los datos. Verificá que la dirección y ciudad sean correctas.');
    } finally {
      setLoading(false);
    }
 };

  return (
    <div className="bg-white rounded shadow p-4 mb-6">
      <h2 className="text-xl font-semibold mb-4">Editar Datos del Comercio</h2>

      <div className="grid gap-3">
        <input
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          placeholder="Nombre completo"
          className="border rounded p-2"
        />
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Teléfono"
          className="border rounded p-2"
        />
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Dirección"
          className="border rounded p-2"
        />
        <input
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Ciudad"
          className="border rounded p-2"
        />
        <input
          name="brand_name"
          value={formData.brand_name}
          readOnly
          className="border rounded p-2 bg-gray-100 cursor-not-allowed"
        />
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </button>

        {success && <p className="text-green-600 mt-2">✔ Cambios guardados correctamente</p>}
      </div>
    </div>
  );
};

export default DataPersonal;

