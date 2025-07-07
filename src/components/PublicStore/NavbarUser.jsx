import { useState, useEffect } from 'react';
import { Menu, X, MapPin } from 'lucide-react';
import { FaInstagram, FaFacebookF, FaTiktok, FaWhatsapp } from 'react-icons/fa'; 

import BusinessHours from './BusinessHours';
import MapModal from './MapModal';

const NavbarUser = ({store, additionalData}) => {
  // console.log('additionadata', additionalData);
  const [isOpen, setIsOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
      const fetchData = async () => {
      try {
         if (!store || !store.id) return;
        
         if (!additionalData || !additionalData.user_id) return;

      } catch (error) {
        console.error('Error al cargar datos:', error);
      } finally {
        setLoading(false);
      }
    };

  
    fetchData();
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="flex items-center justify-between px-4 py-3 md:px-8 md:py-4">
          <h1 className="text-lg font-bold text-blue-600">
            {store ? store.brand_name : 'Cargando...'}
          </h1>

          {/* Botón hamburguesa SOLO en mobile */}
          <button onClick={toggleMenu} className="md:hidden text-gray-700 focus:outline-none">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Menú horizontal SOLO en desktop */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            <BusinessHours userId={store?.id} />
            
            {/* Ubicación con modal */}
            <button
              onClick={() => setIsMapOpen(true)}
              className="flex items-center gap-1 text-blue-600 font-semibold"
            >
              <MapPin className="w-5 h-5" />
              <span>Ubicación</span>
            </button>

            <div className="hidden md:flex items-center">
              {additionalData?.whatsapp && (
                <a
                  href={additionalData.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700"
                >
                  <FaWhatsapp className="w-5 h-5" />
                </a>
              )}
            </div>

            {/* Redes sociales */}
            <ul className="flex gap-3">
              {/* {console.log('informacion adicional',additionalInfo?.social_links)} */}
              {additionalData?.social_links?.map((link, i) => {
                const getIcon = () => {
                  if (link.includes('instagram')) return <FaInstagram className="w-5 h-5" />;
                  if (link.includes('facebook')) return <FaFacebookF className="w-5 h-5" />;
                  if (link.includes('tiktok')) return <FaTiktok className="w-5 h-5" />;
                  return <span className="text-xs">🔗</span>; // ícono genérico si no se reconoce
                };

                return (
                  <a
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {getIcon()}
                  </a>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Menú desplegable SOLO en mobile */}
        {isOpen && (
          <div className="bg-gray-100 p-4 border-t text-sm space-y-4 md:hidden">
            <BusinessHours userId={store?.id} />

            {/* Botón Ubicación */}
            <button
              className="flex items-center gap-1 text-blue-600 font-semibold"
              onClick={() => setIsMapOpen(true)}
            >
              <MapPin className="w-5 h-5" />
              <span>Ubicación</span>
            </button>

            {/* 📱 Mobile - texto “Contacto”, logo y número */}
            <div className="md:hidden">
              {additionalData?.whatsapp && (
                <div className="flex flex-col gap-1 text-blue-600">
                  <span className="font-semibold text-gray-800">Contacto</span>
                  <a
                    href={additionalData.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-green-600"
                  >
                    <FaWhatsapp className="w-5 h-5" />
                    <span>
                      {additionalData.whatsapp.replace('https://wa.me/549', '') || 'WhatsApp'}
                    </span>
                  </a>
                </div>
              )}
            </div>

            {/* Redes sociales en mobile */}
<div className="md:hidden flex flex-col gap-1 text-blue-600">
  <span className="font-semibold text-gray-800">Redes sociales</span>
  <div className="flex gap-3 mt-1">
    {additionalData?.social_links?.map((link, i) => {
      const getIcon = () => {
        if (link.includes('instagram')) return <FaInstagram className="w-5 h-5" />;
        if (link.includes('facebook')) return <FaFacebookF className="w-5 h-5" />;
        if (link.includes('tiktok')) return <FaTiktok className="w-5 h-5" />;
        return <span className="text-xs">🔗</span>;
      };

      return (
        <a
          key={i}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
        >
          {getIcon()}
        </a>
      );
    })}
  </div>
</div>

          </div>
        )}
      </nav>

      {/* Este modal está fuera del nav y funciona SIEMPRE */}
      <MapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        latitude={store?.latitude}
        longitude={store?.longitude}
        address={store?.address}
      />
    </>

    
  );
};

export default NavbarUser;
