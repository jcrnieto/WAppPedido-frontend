import axios from 'axios';
import { useState } from 'react';

const dayTranslation = {
  'Lunes': 'Monday',
  'Martes': 'Tuesday',
  'Miércoles': 'Wednesday',
  'Jueves': 'Thursday',
  'Viernes': 'Friday',
  'Sábado': 'Saturday',
  'Domingo': 'Sunday',
};

const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];


const initialSchedule = daysOfWeek.reduce((acc, day) => {
  acc[day] = {
    open: false,
    useSplit: false,
    singleStart: '',
    singleEnd: '',
    morningStart: '',
    morningEnd: '',
    afternoonStart: '',
    afternoonEnd: '',
  };
  return acc;
}, {});

const BusinessHours = ({ storeId }) => {
  const [schedule, setSchedule] = useState(initialSchedule);

  const toggleDayOpen = (day) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: { ...prev[day], open: !prev[day].open },
    }));
  };

  const toggleSplit = (day) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: { ...prev[day], useSplit: !prev[day].useSplit },
    }));
  };

  const updateTime = (day, field, value) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  const copyDayToAll = (sourceDay) => {
    const dayData = schedule[sourceDay];
    const newSchedule = { ...schedule };

    daysOfWeek.forEach((day) => {
      if (day !== sourceDay) {
        newSchedule[day] = { ...dayData };
      }
    });

    setSchedule(newSchedule);
  };

  // ✅ Transforma el objeto schedule a lo que espera el backend
  const transformSchedule = () => {
  return Object.entries(schedule).flatMap(([day, config]) => {
    if (!config.open) return [];

    const translatedDay = dayTranslation[day];

    // Horario sin división
    if (!config.useSplit) {
      if (!config.singleStart || !config.singleEnd) return []; // Validación básica

      return [{
        day: translatedDay,
        from_1: config.singleStart,
        to_1: config.singleEnd,
        from_2: null,
        to_2: null,
      }];
    }

    // Horario dividido
    if (!config.morningStart || !config.morningEnd) return []; // Mañana es obligatoria

    return [{
      day: translatedDay,
      from_1: config.morningStart,
      to_1: config.morningEnd,
      from_2: config.afternoonStart || null,
      to_2: config.afternoonEnd || null,
    }];
  });
};


  const handleSave = async () => {
    try {
      const transformed = transformSchedule();

      const response = await axios.post('http://localhost:3000/api/businessHours/createBusinessHours', {
        user_id: storeId,
        hours: transformed,
      });

      console.log('✅ Horarios guardados:', response.data);
    } catch (err) {
      console.error('❌ Error al guardar horarios:', err.response?.data || err.message);
    }
  };

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-xl font-semibold mb-4 text-blue-600">🕒 Horarios de Atención</h2>

      {daysOfWeek.map((day) => (
        <div key={day} className="border-b pb-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="flex items-center gap-2 font-semibold">
              <input
                type="checkbox"
                checked={schedule[day].open}
                onChange={() => toggleDayOpen(day)}
              />
              {day}
            </label>

            {schedule[day].open && (
              <label className="text-sm text-gray-600 flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={schedule[day].useSplit}
                  onChange={() => toggleSplit(day)}
                />
                Horario dividido
              </label>
            )}
          </div>

          {schedule[day].open && !schedule[day].useSplit && (
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm text-gray-600">Inicio</label>
                <input
                  type="time"
                  value={schedule[day].singleStart}
                  onChange={(e) => updateTime(day, 'singleStart', e.target.value)}
                  className="border p-1 w-full rounded"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Fin</label>
                <input
                  type="time"
                  value={schedule[day].singleEnd}
                  onChange={(e) => updateTime(day, 'singleEnd', e.target.value)}
                  className="border p-1 w-full rounded"
                />
              </div>
            </div>
          )}

          {schedule[day].open && schedule[day].useSplit && (
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm text-gray-600">Mañana: Inicio</label>
                <input
                  type="time"
                  value={schedule[day].morningStart}
                  onChange={(e) => updateTime(day, 'morningStart', e.target.value)}
                  className="border p-1 w-full rounded"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Mañana: Fin</label>
                <input
                  type="time"
                  value={schedule[day].morningEnd}
                  onChange={(e) => updateTime(day, 'morningEnd', e.target.value)}
                  className="border p-1 w-full rounded"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Tarde: Inicio</label>
                <input
                  type="time"
                  value={schedule[day].afternoonStart}
                  onChange={(e) => updateTime(day, 'afternoonStart', e.target.value)}
                  className="border p-1 w-full rounded"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Tarde: Fin</label>
                <input
                  type="time"
                  value={schedule[day].afternoonEnd}
                  onChange={(e) => updateTime(day, 'afternoonEnd', e.target.value)}
                  className="border p-1 w-full rounded"
                />
              </div>
            </div>
          )}

          {schedule[day].open && (
            <button
              className="mt-2 text-sm text-blue-600 hover:underline"
              onClick={() => copyDayToAll(day)}
            >
              Copiar este horario a todos los días
            </button>
          )}
        </div>
      ))}

      <div className="text-right">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={handleSave}
        >
          Guardar horarios
        </button>
      </div>
    </div>
  );
};

export default BusinessHours;

