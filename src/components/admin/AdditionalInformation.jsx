import { useState, useEffect } from 'react';
import axios from 'axios';
import { supabase } from '../../config/supabaseConfig';

const AdditionalInformation = ({ storeId }) => {
  console.log('storeId:', storeId);
  const [logoFile, setLogoFile] = useState(null);
  const [logoUrl, setLogoUrl] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [socialLinks, setSocialLinks] = useState(['', '', '']);
  const [loading, setLoading] = useState(false);
  const [infoExists, setInfoExists] = useState(false);


  // 🔄 Traer datos actuales si existen
  useEffect(() => {
  const fetchData = async () => {
    if (!storeId) return;

    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/additionalInformation/getAdditionalInformationByUser/${storeId}`
      );

      if (data) {
        const rawWhatsapp = data.whatsapp?.match(/549(\d{10,11})$/)?.[1] || '';
        setWhatsapp(rawWhatsapp);
        setLogoUrl(data.logo_url || '');
        setSocialLinks(data.social_links || ['', '', '']);
        setInfoExists(true);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setInfoExists(false);
        console.log('ℹ️ No hay información adicional aún para este usuario');
      } else {
        console.error('❌ Error al cargar info adicional:', error.response?.data || error.message);
      }
    }
  };

  fetchData();
}, [storeId]);


  const handleLogoChange = (e) => {
    setLogoFile(e.target.files[0]);
  };

  const handleSocialLinkChange = (index, value) => {
    const updated = [...socialLinks];
    updated[index] = value;
    setSocialLinks(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = logoUrl;

      if (logoFile) {
        const fileName = `${Date.now()}-${logoFile.name}`;
        const filePath = `users/logo/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("wapedidos")
          .upload(filePath, logoFile);

        if (uploadError) {
          console.error("❌ Error al subir imagen:", uploadError.message);
          return;
        }

        const { data: publicUrlData } = supabase.storage
          .from("wapedidos")
          .getPublicUrl(filePath);

        imageUrl = publicUrlData?.publicUrl;
        if (!imageUrl) {
          console.error("No se pudo obtener la URL pública.");
          return;
        }

        setLogoUrl(imageUrl); // Para mostrarla en pantalla si querés
      }

      if (!/^\d{10,11}$/.test(whatsapp)) {
        alert('El número de WhatsApp debe tener entre 10 y 11 dígitos y no debe incluir el 0 ni el 15.');
        setLoading(false);
        return;
      }

      const payload = {
        user_id: storeId,
        whatsapp: `https://wa.me/549${whatsapp}`,
        logo_url: imageUrl,
        social_links: socialLinks.filter(link => link !== ''),
      };

      if (infoExists) {      
        await axios.patch(`http://localhost:3000/api/additionalInformation/updateAdditionalInformation/${storeId}`, payload);
      } else {      
        await axios.post('http://localhost:3000/api/additionalInformation/createAdditionalInformation', payload);
        setInfoExists(true); 
      }

      alert('✅ Información guardada correctamente');
    } catch (err) {
      console.error('❌ Error al guardar:', err.response?.data || err.message);
      alert('Error al guardar la información');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
      <h2 className="text-xl font-semibold text-blue-600">📄 Información Adicional</h2>

      {/* Logo actual */}
      {logoUrl && (
        <div className="mb-2">
          <img src={logoUrl} alt="Logo actual" className="w-24 h-24 object-contain" />
        </div>
      )}

      {/* Cargar nuevo logo */}
      <div>
        <label className="block font-semibold mb-1">Logo del negocio</label>
        <input type="file" accept="image/*" onChange={handleLogoChange} />
      </div>

      {/* WhatsApp */}
      <div>
        <label className="block font-semibold mb-1">WhatsApp</label>
        <input
          type="text"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          placeholder="Ej: 1122334455"
          className="border p-2 w-full rounded"
        />
      </div>

      {/* Redes sociales */}
      <div>
        <label className="block font-semibold mb-1">Redes sociales (opcional)</label>
        {socialLinks.map((link, i) => (
          <input
            key={i}
            type="url"
            placeholder={`https://...`}
            value={link}
            onChange={(e) => handleSocialLinkChange(i, e.target.value)}
            className="border p-2 w-full rounded mb-2"
          />
        ))}
      </div>

      <div className="text-right">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Guardando...' : 'Guardar información'}
        </button>
      </div>
    </form>
  );
};

export default AdditionalInformation;

