// import { useState } from 'react';
// import { useNavigate, useParams } from "react-router-dom";

// import { Menu, X, MapPin, Search, ShoppingBag, Clock, Phone } from 'lucide-react';
// import { FaInstagram, FaFacebookF, FaTiktok, FaWhatsapp } from 'react-icons/fa';

// import RightSheet from "../../../../utils/RightSheet";
// import BusinessHours from '../BusinessHours';
// import MapModal from '../MapModal';
// import CartDropDawn from '../products/CartSummary';

// import { useCart } from "../../../../context/CartContext";
// import { useSearch } from "../../../../context/SearchContext";

// const NavbarUser = ({ store, additionalData }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isMapOpen, setIsMapOpen] = useState(false);
//   const [openCart, setOpenCart] = useState(false);
//   const [showSearch, setShowSearch] = useState(false);

//   const navigate = useNavigate();
//   const { slug } = useParams();

//   const { cart } = useCart();
//   const { searchQuery, setSearchQuery } = useSearch();

//   const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <>
//       <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
//         <div className="flex items-center justify-between px-4 py-2 md:px-8 md:py-4">
//           <div className="flex items-center gap-2">
//             {additionalData?.logo_url ? (
//               <img
//                 src={additionalData.logo_url}
//                 alt="Logo"
//                 className="w-16 h-16 md:w-28 md:h-28 object-contain"
//               />
//             ) : (
//               <h1 className="text-lg font-bold text-gray-800">
//                 {store?.brand_name || 'Cargando...'}
//               </h1>
//             )}
//           </div>

//           {/* Íconos de búsqueda y carrito - SOLO desktop */}
//           <div className="hidden md:flex items-center gap-4">
//             {showSearch ? (
//               <input
//                 type="text"
//                 placeholder="Buscar producto..."
//                 value={searchQuery}
//                 onChange={(e) => {
//                   const q = e.target.value;
//                   setSearchQuery(q);
//                   if (q.trim()) {
//                     navigate(`/${slug}/${store?.user_id}/search?query=${encodeURIComponent(q)}`);
//                   }
//                 }}
//                 className="w-full border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             ) : (
//               <button onClick={() => setShowSearch(true)}>
//                 <Search className="w-6 h-6 text-gray-700" />
//               </button>
//             )}

//             <button onClick={() => setOpenCart(true)} className="relative">
//               <ShoppingBag size={24} />
//               {/* Badge con cantidad */}
//               {totalItems > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
//                   {totalItems}
//                 </span>
//               )}
//             </button>
//           </div>

//           {/* Íconos móviles + menú hamburguesa */}
//           <div className="flex items-center gap-3 md:hidden">
//             {showSearch ? (
//               <input
//                 type="text"
//                 placeholder="Buscar..."
//                 value={searchQuery}
//                 onChange={(e) => {
//                   const q = e.target.value;
//                   setSearchQuery(q);
//                   if (q.trim()) {
//                     navigate(`/${slug}/${store?.user_id}/search?query=${encodeURIComponent(q)}`);
//                   }
//                 }}
//                 className="w-32 border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//             ) : (
//               <button onClick={() => setShowSearch(true)}>
//                 <Search className="w-5 h-5 text-gray-700" />
//               </button>
//             )}

//             <button onClick={() => setOpenCart(true)} className="relative">
//               <ShoppingBag size={20} />
//               {/* Badge con cantidad */}
//               {totalItems > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full px-1">
//                   {totalItems}
//                 </span>
//               )}
//             </button>

//             {/* Botón hamburguesa */}
//             <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
//               {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//             </button>
//           </div>

//           <CartDropDawn open={openCart} onClose={() => setOpenCart(false)} whatsappNumber={additionalData?.whatsapp}/>

//           {/* Menú horizontal SOLO en desktop */}
//           <div className="hidden md:flex items-center gap-8 text-sm">
//             <BusinessHours userId={store?.user_id} />

//             <button
//               onClick={() => setIsMapOpen(true)}
//               className="flex items-center gap-1 text-gray-800 font-semibold"
//             >
//               <MapPin className="w-5 h-5" />
//               <span>Ubicación</span>
//             </button>

//             {additionalData?.whatsapp && (
//               <a
//                 href={additionalData.whatsapp}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-green-600 hover:text-green-700"
//               >
//                 <FaWhatsapp className="w-5 h-5" />
//               </a>
//             )}

//             <ul className="flex gap-3">
//               {additionalData?.social_links?.map((link, i) => {
//                 const getIcon = () => {
//                   if (link.includes('instagram')) return <FaInstagram className="w-5 h-5" style={{ color: '#E1306C' }} />;
//                   if (link.includes('facebook')) return <FaFacebookF className="w-5 h-5" style={{ color: '#1877F2' }} />;
//                   if (link.includes('tiktok')) return <FaTiktok className="w-5 h-5" style={{ color: '#69C9D0' }} />;
//                   return <span className="text-xs">🔗</span>;
//                 };
//                 return (
//                   <a key={i} href={link} target="_blank" rel="noopener noreferrer">
//                     {getIcon()}
//                   </a>
//                 );
//               })}
//             </ul>
//           </div>
//         </div>

//         {/* Menú desplegable SOLO en mobile */}
//         {isOpen && (
//           <div className="bg-gray-100 p-4 border-t text-sm space-y-4 md:hidden">
//             <BusinessHours userId={store?.user_id} />

//             <button
//               className="flex items-center gap-1 text-blue-600 font-semibold"
//               onClick={() => setIsMapOpen(true)}
//             >
//               <MapPin className="w-5 h-5" />
//               <span>Ubicación</span>
//             </button>

//             {additionalData?.whatsapp && (
//               <div className="flex flex-col gap-1 text-blue-600">
//                 <span className="font-semibold text-gray-800">Contacto</span>
//                 <a
//                   href={additionalData.whatsapp}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-2 text-green-600"
//                 >
//                   <FaWhatsapp className="w-5 h-5" />
//                   <span>{additionalData.whatsapp.replace('https://wa.me/549', '') || 'WhatsApp'}</span>
//                 </a>
//               </div>
//             )}

//             {additionalData?.social_links?.length > 0 &&
//               additionalData.social_links.some(link => link.trim() !== '') && (
//                 <div className="flex flex-col gap-1">
//                   <span className="font-semibold text-gray-800">Redes sociales</span>
//                   <div className="flex gap-3 mt-1">
//                     {additionalData.social_links.map((link, i) => {
//                       const getIcon = () => {
//                         if (link.includes('instagram')) return <FaInstagram className="w-5 h-5" style={{ color: '#E1306C' }} />;
//                         if (link.includes('facebook')) return <FaFacebookF className="w-5 h-5" style={{ color: '#1877F2' }} />;
//                         if (link.includes('tiktok')) return <FaTiktok className="w-5 h-5" style={{ color: '#69C9D0' }} />;
//                         return <span className="text-xs">🔗</span>;
//                       };
//                       return (
//                         <a key={i} href={link} target="_blank" rel="noopener noreferrer">
//                           {getIcon()}
//                         </a>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}
//           </div>
//         )}
//       </nav>

//       <MapModal
//         isOpen={isMapOpen}
//         onClose={() => setIsMapOpen(false)}
//         latitude={store?.latitude}
//         longitude={store?.longitude}
//         address={store?.address}
//       />
//     </>
//   );
// };

// export default NavbarUser;

import { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import { Menu, X, MapPin, Search, ShoppingBag, Clock, Phone, Share2 } from 'lucide-react';
import { FaInstagram, FaFacebookF, FaTiktok, FaWhatsapp } from 'react-icons/fa';

import RightSheet from "../../../../utils/RightSheet";
import BusinessHours from '../BusinessHours';
import MapModal from '../MapModal';
import CartDropDawn from '../products/CartSummary';

import { useCart } from "../../../../context/CartContext";
import { useSearch } from "../../../../context/SearchContext";

const NavbarUser = ({ store, additionalData }) => {
  const [isOpen, setIsOpen] = useState(false);        // ahora controla el RightSheet
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const navigate = useNavigate();
  const { slug } = useParams();

  const { cart } = useCart();
  const { searchQuery, setSearchQuery } = useSearch();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-[#F4F9F4] shadow-md z-50">
        <div className="flex items-center justify-between px-4 py-2 md:px-8 md:py-4">
          <div className="flex items-center gap-2">
            {additionalData?.logo_url ? (
              <img
                src={additionalData.logo_url}
                alt="Logo"
                className="w-16 h-16 md:w-28 md:h-28 object-contain"
              />
            ) : (
              <h1 className="text-lg font-bold text-gray-800">
                {store?.brand_name || 'Cargando...'}
              </h1>
            )}
          </div>

          {/* Íconos de búsqueda y carrito - SOLO desktop */}
          <div className="hidden md:flex items-center gap-4">
            {showSearch ? (
              <input
                type="text"
                placeholder="Buscar producto..."
                value={searchQuery}
                onChange={(e) => {
                  const q = e.target.value;
                  setSearchQuery(q);
                  if (q.trim()) {
                    navigate(`/${slug}/${store?.user_id}/search?query=${encodeURIComponent(q)}`);
                  }
                }}
                className="w-full border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <button onClick={() => setShowSearch(true)}>
                <Search className="w-6 h-6 text-gray-700" />
              </button>
            )}

            <button onClick={() => setOpenCart(true)} className="relative">
              <ShoppingBag size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Íconos móviles + menú hamburguesa */}
          <div className="flex items-center gap-3 md:hidden">
            {showSearch ? (
              <input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => {
                  const q = e.target.value;
                  setSearchQuery(q);
                  if (q.trim()) {
                    navigate(`/${slug}/${store?.user_id}/search?query=${encodeURIComponent(q)}`);
                  }
                }}
                className="w-32 border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            ) : (
              <button onClick={() => setShowSearch(true)}>
                <Search className="w-5 h-5 text-gray-700" />
              </button>
            )}

            <button onClick={() => setOpenCart(true)} className="relative">
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full px-1">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Menú hamburguesa -> RightSheet */}
            <RightSheet
              title="Información"
              open={isOpen}
              onOpenChange={setIsOpen}
              trigger={
                <button
                  className="text-gray-700 focus:outline-none"
                  aria-label="Abrir menú"
                >
                  {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              }
            >
              <div className="text-sm mt-8">
                <div className="grid gap-6"> 
                  {/* Horarios de atención */}
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-green-600 mt-1" />
                    <div className="text-gray-900">
                      <BusinessHours userId={store?.user_id} />
                    </div>
                  </div>
                  

                  {/* Ubicación */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 font-semibold text-gray-900">
                      <MapPin className="h-4 w-4 text-green-600" />
                      <span>Ubicación</span>
                    </div>
                    <button
                      onClick={() => {
                        setIsMapOpen(true);
                        setIsOpen(false); // opcional: cerrar el sheet al abrir el mapa
                      }}
                      className="ml-6 text-green-700 hover:underline inline-flex items-center gap-2"
                    >
                      Ver en mapa
                    </button>
                  </div>

                  {/* Contacto (WhatsApp) */}
                  {additionalData?.whatsapp && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 font-semibold text-gray-900">
                        <Phone className="h-4 w-4 text-green-600" />
                        <span>Contacto</span>
                      </div>
                      <a
                        href={additionalData.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-6 inline-flex items-center gap-2 text-green-700 hover:underline"
                        onClick={() => setIsOpen(false)} // opcional
                      >
                        <FaWhatsapp className="w-5 h-5" />
                        <span>{additionalData.whatsapp.replace('https://wa.me/549', '') || 'WhatsApp'}</span>
                      </a>
                    </div>
                  )}

                  {/* Redes sociales */}
                  {(additionalData?.social_links?.length ?? 0) > 0 &&
                    additionalData.social_links.some(link => (link ?? '').trim() !== '') && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 font-semibold text-gray-900">
                          <Share2 className="h-4 w-4 text-green-600" />
                          <span>Redes sociales</span>
                        </div>

                        <div className="ml-6 flex items-center gap-3">
                          {additionalData.social_links
                            .filter(link => (link ?? '').trim() !== '')
                            .map((link, i) => {
                              const l = link.toLowerCase();
                              const icon =
                                l.includes('instagram')
                                  ? <FaInstagram className="w-5 h-5" style={{ color: '#E1306C' }} />
                                  : l.includes('facebook')
                                  ? <FaFacebookF className="w-5 h-5" style={{ color: '#1877F2' }} />
                                  : l.includes('tiktok')
                                  ? <FaTiktok className="w-5 h-5" style={{ color: '#69C9D0' }} />
                                  : null;

                              if (!icon) return null; // si no reconocemos la red, no mostramos nada

                              return (
                                <a
                                  key={i}
                                  href={link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={l.includes('instagram') ? 'Instagram' : l.includes('facebook') ? 'Facebook' : 'TikTok'}
                                  onClick={() => setIsOpen(false)} // opcional: cerrar al click
                                  className="hover:opacity-80 transition"
                                >
                                  {icon}
                                </a>
                              );
                            })}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </RightSheet>
          </div>

          <CartDropDawn
            open={openCart}
            onClose={() => setOpenCart(false)}
            whatsappNumber={additionalData?.whatsapp}
          />

          {/* Menú horizontal SOLO en desktop (sin cambios) */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            <BusinessHours userId={store?.user_id} />

            <button
              onClick={() => setIsMapOpen(true)}
              className="flex items-center gap-1 text-green-600 font-semibold"
            >
              <MapPin className="w-5 h-5 text-green-600" />
              <span>Ubicación</span>
            </button>

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

            <ul className="flex gap-3">
              {additionalData?.social_links?.map((link, i) => {
                const getIcon = () => {
                  if (link.includes('instagram')) return <FaInstagram className="w-5 h-5" style={{ color: '#E1306C' }} />;
                  if (link.includes('facebook')) return <FaFacebookF className="w-5 h-5" style={{ color: '#1877F2' }} />;
                  if (link.includes('tiktok')) return <FaTiktok className="w-5 h-5" style={{ color: '#69C9D0' }} />;
                  return <span className="text-xs">🔗</span>;
                };
                return (
                  <a key={i} href={link} target="_blank" rel="noopener noreferrer">
                    {getIcon()}
                  </a>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>

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
