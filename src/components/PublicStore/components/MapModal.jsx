// import { motion, AnimatePresence } from 'framer-motion';

// const MapModal = ({ isOpen, onClose, latitude, longitude, address }) => {
//   //console.log('MapModal props:', { isOpen, latitude, longitude, address });
//   console.log('LAT:', latitude, typeof latitude);
//   console.log('LON:', longitude, typeof longitude);


//   const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=17`;

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30"
//         >
//           <motion.div
//             initial={{ scale: 0.9, y: 50 }}
//             animate={{ scale: 1, y: 0 }}
//             exit={{ scale: 0.9, y: 50 }}
//             transition={{ duration: 0.2 }}
//             className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 relative"
//           >
//             {/* Cerrar (X) */}
//             <button
//               onClick={onClose}
//               className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
//             >
//               ✖
//             </button>

//             <h2 className="text-lg font-bold mb-4 text-center text-blue-700">📍 Ubicación del comercio</h2>
//             <p className="text-sm text-gray-700 mb-4 text-center">{address}</p>

//             {/* <iframe
//               src={mapsUrl}
//               width="100%"
//               height="250"
//               style={{ border: 0 }}
//               allowFullScreen=""
//               loading="lazy"
//               className="rounded-md"
//             ></iframe> */}
//             {mapsUrl ? (
//               <iframe
//                 src={mapsUrl}
//                 width="100%"
//                 height="250"
//                 style={{ border: 0 }}
//                 allowFullScreen=""
//                 loading="lazy"
//                 className="rounded-md"
//               ></iframe>
//             ) : (
//               <p className="text-center text-red-500">Ubicación no válida.</p>
//             )}

//             <button
//               className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//               onClick={onClose}
//             >
//               Cerrar
//             </button>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default MapModal;

// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

// const MapModal = ({ isOpen, onClose, latitude, longitude, address }) => {
//   const lat = parseFloat(latitude);
//   const lon = parseFloat(longitude);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md relative">
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
//         >
//           ✖
//         </button>

//         <h2 className="text-lg font-bold mb-2 text-center text-blue-700">📍 Ubicación del comercio</h2>
//         <p className="mb-4 text-center text-sm text-gray-600">{address}</p>

//         <MapContainer
//           center={[lat, lon]}
//           zoom={16}
//           scrollWheelZoom={false}
//           style={{ height: '250px', width: '100%' }}
//           className="rounded-md"
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//           />
//           <Marker position={[lat, lon]}>
//             <Popup>{address}</Popup>
//           </Marker>
//         </MapContainer>

//         <button
//           className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//           onClick={onClose}
//         >
//           Cerrar
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MapModal;

import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapModal = ({ isOpen, onClose, latitude, longitude, address }) => {
  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30"
        >
          <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 relative"
          >
            {/* Botón cerrar */}
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>

            <h2 className="text-lg font-bold mb-4 text-center text-blue-700">
              📍 Ubicación del comercio
            </h2>

            <p className="text-sm text-center text-gray-600 mb-4">{address}</p>

            <MapContainer
              center={[lat, lon]}
              zoom={16}
              scrollWheelZoom={false}
              style={{ height: '250px', width: '100%' }}
              className="rounded-md z-10"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <Marker position={[lat, lon]}>
                <Popup>{address}</Popup>
              </Marker>
            </MapContainer>

            <button
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              onClick={onClose}
            >
              Cerrar
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MapModal;

