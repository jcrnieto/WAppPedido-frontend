import { useState, useEffect } from 'react';
import axios from 'axios';
import { supabase } from '../../../config/supabaseConfig';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const AdditionalInformation = ({ storeId }) => {
  // console.log('storeId:', storeId);
  const [logoFile, setLogoFile] = useState(null);
  const [logoUrl, setLogoUrl] = useState('');
  const [additionalDescription, setAdditionalDescription] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [socialLinks, setSocialLinks] = useState(['', '', '']);
  const [brandInformation, setBrandInformation] = useState('');

  const [logoPreview, setLogoPreview] = useState('');
  const [brandPreview, setBrandPreview] = useState('');

  const [loading, setLoading] = useState(false);
  const [infoExists, setInfoExists] = useState(false);

  // 🔄 Traer datos actuales si existen
  useEffect(() => {
  const fetchData = async () => {
    if (!storeId) return;

    try {
      const { data } = await axios.get(
        `${baseUrl}/additionalInformation/getAdditionalInformationByUser/${storeId}`
      );

      if (data) {
        const rawWhatsapp = data.whatsapp?.match(/549(\d{10,11})$/)?.[1] || '';
        setWhatsapp(rawWhatsapp);
        setLogoUrl(data.logo_url || '');
        setAdditionalDescription(data.additional_description || '');
        // setSocialLinks(data.social_links || ['', '', '']);
        setSocialLinks(data.social_links && data.social_links.length > 0 
        ? data.social_links 
        : ['', '', '']);
        setBrandInformation(data.brand_information || '');
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
    // setLogoFile(e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleBrandInformationChange = (e) => {
    // setBrandInformation(e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      setBrandInformation(file);
      setBrandPreview(URL.createObjectURL(file));
    }
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
      
      let brandInformationUrl = brandInformation;

      if (brandInformation) {
        const brandFileName = `${Date.now()}-${brandInformation.name}`;
        const brandFilePath = `users/brandInfo/${brandFileName}`;

        const { error: brandUploadError } = await supabase.storage
          .from("wapedidos")
          .upload(brandFilePath, brandInformation);

        if (brandUploadError) {
          console.error("❌ Error al subir imagen de marca:", brandUploadError.message);
          return;
        }

        const { data: brandUrlData } = supabase.storage
          .from("wapedidos")
          .getPublicUrl(brandFilePath);

        brandInformationUrl = brandUrlData?.publicUrl;
        if (!brandInformationUrl) {
          console.error("No se pudo obtener la URL pública.");
          return;
        }
        setBrandInformation(brandInformationUrl);
      }

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

        setLogoUrl(imageUrl); 
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
        additional_description: additionalDescription,
        brand_information_url: brandInformationUrl || '',
      };
      
      if (infoExists) {      
        await axios.patch(`${baseUrl}/additionalInformation/updateAdditionalInformation/${storeId}`, payload);
      } else {      
        await axios.post(`${baseUrl}/additionalInformation/createAdditionalInformation`, payload);
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

      {/* Logo actual o preview */}
      {logoPreview ? (
        <div className="mb-2">
          <img src={logoPreview} alt="Preview logo" className="w-24 h-24 object-contain" />
        </div>
      ) : (
        logoUrl && (
          <div className="mb-2">
            <img src={logoUrl} alt="Logo actual" className="w-24 h-24 object-contain" />
          </div>
        )
      )}

      {/* Cargar nuevo logo */}
      <div>
          <label className="block font-semibold mb-1">Logo del negocio</label>
          {/* Ocultamos el input real */}
          <input 
            type="file" 
            accept="image/*" 
            id="logoInput"
            onChange={handleLogoChange} 
            className="hidden"
          />

          {/* Creamos un botón personalizado */}
          <label 
            htmlFor="logoInput" 
            className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block"
          >
            Seleccionar logo
          </label>
          {/* Mostrar nombre del archivo si se cargó */}
          {logoFile && <p className="mt-2 text-sm text-gray-500">{logoFile.name}</p>}
      </div>
     
      <div>
        <label className="block font-semibold mb-1">Información adicional (opcional)</label>
        <textarea
          value={additionalDescription}
          onChange={(e) => setAdditionalDescription(e.target.value)}
          placeholder="Ej: Envíos todos los días de 10 a 18hs"
          rows={4}
          className="border p-2 w-full rounded resize-none"
        />
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

      {/* Imagen adicional */}
      {brandPreview ? (
        <div className="mb-2">
          <img src={brandPreview} alt="Preview info marca" className="w-24 h-24 object-contain" />
        </div>
      ) : (
        brandInformation && typeof brandInformation === 'string' && (
          <div className="mb-2">
            <img src={brandInformation} alt="Info marca actual" className="w-24 h-24 object-contain" />
          </div>
        )
      )}

      <div>
        <label className="block font-semibold mb-1">Foto Adicional con informacion de la marca</label>
        <input 
            type="file" 
            accept="image/*" 
            id="brandInput"
            onChange={handleBrandInformationChange} 
            className="hidden"
          />

          {/* Creamos un botón personalizado */}
          <label 
            htmlFor="brandInput" 
            className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block"
          >
            Seleccionar imagen
          </label>

          {brandInformation && brandInformation.name && (
            <p className="mt-2 text-sm text-gray-500">{brandInformation.name}</p>
          )}
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

