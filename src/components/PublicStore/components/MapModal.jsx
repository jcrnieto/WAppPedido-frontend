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

            <h2 className="text-lg font-bold mb-4 text-center text-green-600">
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
              className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
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

