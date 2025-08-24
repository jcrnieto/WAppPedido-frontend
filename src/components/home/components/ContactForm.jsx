import { FaPhone, FaFacebook, FaInstagram } from "react-icons/fa";

const ContactForm = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Formulario */}
        <form className="space-y-4 bg-white p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-semibold">Contacto</h2>
          
          <div>
            <label className="block text-sm font-medium">Nombre</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-200"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Teléfono</label>
            <input
              type="tel"
              className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-200"
              placeholder="Tu teléfono"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Consulta</label>
            <textarea
              className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-200"
              placeholder="Escribe tu consulta..."
              rows="4"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Enviar
          </button>
        </form>

        {/* Info de contacto */}
        <div className="flex flex-col justify-center space-y-4 bg-gray-50 p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-semibold">Información de Contacto</h2>
          <p className="flex items-center gap-2">
            <FaPhone className="text-blue-600" /> +54 11 1234 5678
          </p>
          <p className="flex items-center gap-2">
            <FaFacebook className="text-blue-600" /> facebook.com/miempresa
          </p>
          <p className="flex items-center gap-2">
            <FaInstagram className="text-pink-500" /> instagram.com/miempresa
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
