import { useState, useEffect } from 'react';
import { supabase } from '../../config/supabaseConfig';
import { motion, AnimatePresence } from 'framer-motion';

const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const dayNames = {
  Monday: 'Lunes',
  Tuesday: 'Martes',
  Wednesday: 'Miércoles',
  Thursday: 'Jueves',
  Friday: 'Viernes',
  Saturday: 'Sábado',
  Sunday: 'Domingo',
};

const BusinessHours = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hours, setHours] = useState([]);

  useEffect(() => {
    const fetchHours = async () => {
      const { data, error } = await supabase
        .from('business_hours_wapppedidos')
        .select('*')
        .eq('user_id', userId);

      if (!error) {
        const ordered = dayOrder.map(day =>
          data.find(h => h.day === day)
        ).filter(Boolean);
        setHours(ordered);
      } else {
        console.error('❌ Error al obtener horarios:', error);
      }
    };

    if (isOpen) fetchHours();
  }, [isOpen, userId]);

  return (
    <>
      <button
        className="text-blue-600 underline"
        onClick={() => setIsOpen(true)}
      >
        Horarios de atención
      </button>

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
              className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6"
            >
              <h2 className="text-lg font-bold mb-4 text-center text-blue-700">🕒 Horarios de atención</h2>

              <ul className="space-y-2 text-sm text-gray-800">
                {hours.map(({ day, from_1, to_1, from_2, to_2 }) => (
                  <li key={day} className="flex justify-between border-b pb-1">
                    <span>{dayNames[day]}:</span>
                    <span>
                      {from_1} - {to_1}
                      {from_2 && to_2 && ` / ${from_2} - ${to_2}`}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                onClick={() => setIsOpen(false)}
              >
                Cerrar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BusinessHours;
