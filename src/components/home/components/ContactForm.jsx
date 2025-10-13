import { useState } from "react"
import { useNavigate } from "react-router-dom"

const ContactForm = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Form submission logic would go here
    alert("Gracias por tu consulta. Te responderemos pronto!")
    setFormData({ name: "", email: "", message: "" })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contacto" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">¿Tenés dudas?</h2>
          <p className="text-lg text-muted-foreground text-pretty">Escribinos y te respondemos a la brevedad</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Contanos tu consulta..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-secondary transition-colors shadow-lg hover:shadow-xl"
              >
                Enviar consulta
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-foreground mb-4">Información de contacto</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-primary flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <p className="text-muted-foreground">soporte@wa-pedidos.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-primary flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold text-foreground">Teléfono</p>
                    <p className="text-muted-foreground">+54 9 351 123-4567</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary rounded-2xl p-8 text-primary-foreground shadow-lg">
              <h3 className="text-xl font-semibold mb-2">¿Listo para empezar?</h3>
              <p className="mb-6 text-primary-foreground/90">
                Creá tu catálogo hoy y empezá a recibir pedidos por WhatsApp
              </p>
              <a
                onClick={() => navigate('/register')}
                className="inline-block px-6 py-3 bg-white text-primary rounded-xl font-semibold hover:bg-slate-100 transition-colors"
              >
                Probar ahora
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactForm;
//   return (
//     <div className="max-w-5xl mx-auto px-4 py-8">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Formulario */}
//         <form className="space-y-4 bg-white p-6 rounded-2xl shadow">
//           <h2 className="text-2xl font-semibold">Contacto</h2>
          
//           <div>
//             <label className="block text-sm font-medium">Nombre</label>
//             <input
//               type="text"
//               className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-200"
//               placeholder="Tu nombre"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium">Teléfono</label>
//             <input
//               type="tel"
//               className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-200"
//               placeholder="Tu teléfono"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium">Consulta</label>
//             <textarea
//               className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-200"
//               placeholder="Escribe tu consulta..."
//               rows="4"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
//           >
//             Enviar
//           </button>
//         </form>

//         {/* Info de contacto */}
//         <div className="flex flex-col justify-center space-y-4 bg-gray-50 p-6 rounded-2xl shadow">
//           <h2 className="text-2xl font-semibold">Información de Contacto</h2>
//           <p className="flex items-center gap-2">
//             <FaPhone className="text-blue-600" /> +54 11 1234 5678
//           </p>
//           <p className="flex items-center gap-2">
//             <FaFacebook className="text-blue-600" /> facebook.com/miempresa
//           </p>
//           <p className="flex items-center gap-2">
//             <FaInstagram className="text-pink-500" /> instagram.com/miempresa
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactForm;
