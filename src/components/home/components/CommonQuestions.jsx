import { useEffect, useState } from "react";

const CommonQuestions = () => {
    const [openIndex, setOpenIndex] = useState(null)
    // useEffect(() => {
    //     if (window.HSAccordion) {
    //         window.HSAccordion.autoInit();
    //     }
    // }, []);

    const faqs = [
    {
      question: "¿Necesito un sitio web?",
      answer: "No, solo necesitás tu link público de WA Pedidos. Es mucho más simple que tener un sitio web completo.",
    },
    {
      question: "¿Tiene costo por pedido?",
      answer: "No, la suscripción mensual cubre todo. No hay costos adicionales por cantidad de pedidos.",
    },
    {
      question: "¿Cómo comparto mi catálogo?",
      answer:
        "Simplemente enviá tu link público por WhatsApp, redes sociales o donde quieras. Tus clientes lo abren y pueden hacer pedidos al instante.",
    },
    {
      question: "¿Puedo cambiar precios e imágenes?",
      answer:
        "Sí, desde tu panel de administración podés actualizar productos, precios, fotos y descripciones cuando quieras.",
    },
    {
      question: "¿Funciona en celulares?",
      answer: "Sí, es 100% responsive. Tus clientes pueden ver tu catálogo desde cualquier dispositivo.",
    },
    {
      question: "¿Puedo cobrar online?",
      answer:
        "Próximamente estaremos integrando métodos de pago online. Por ahora, coordinás el pago con tu cliente por WhatsApp.",
    },
    {
      question: "¿Hay prueba gratis?",
      answer: "Consultanos por promociones vigentes. Escribinos a través del formulario de contacto.",
    },
  ]

   return (
    <section id="preguntas" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">Preguntas frecuentes</h2>
          <p className="text-lg text-muted-foreground text-pretty">Resolvemos las dudas más comunes sobre WA Pedidos</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-slate-50 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CommonQuestions;
  
//     return (
//         <section className="bg-white py-16 px-6 md:px-12 lg:px-24">
//             <div className="max-w-2xl mx-auto px-4 py-8">
//                 <h2 className="text-2xl font-bold mb-6 text-center">Preguntas frecuentes</h2>

//                 <div className="w-full bg-white rounded-lg shadow-md dark:bg-neutral-800">
//                     <div className="hs-accordion-group">
//                         <div className="hs-accordion active" id="hs-basic-heading-one">
//                             <button className="hs-accordion-toggle hs-accordion-active:text-blue-600 px-6 py-3 inline-flex items-center gap-x-3 text-sm w-full font-semibold text-start text-gray-800 hover:text-gray-500 focus:outline-hidden focus:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400" aria-expanded="true" aria-controls="hs-basic-collapse-one">
//                                 <svg className="hs-accordion-active:hidden hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 block size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                     <path d="M5 12h14"></path>
//                                 </svg>
//                                 <svg className="hs-accordion-active:block hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 hidden size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                     <path d="M5 12h14"></path>
//                                 </svg>
//                                 ¿Necesito tener una página web para usar la aplicación?
//                             </button>
//                             <div id="hs-basic-collapse-one" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-heading-one">
//                                 <div className="pb-4 px-6">
//                                     <p className="text-sm text-gray-600 dark:text-neutral-200">
//                                         No, no es necesario. Solo con tu WhatsApp podés empezar a recibir pedidos.
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="hs-accordion" id="hs-basic-heading-two">
//                             <button className="hs-accordion-toggle hs-accordion-active:text-blue-600 px-6 py-3 inline-flex items-center gap-x-3 text-sm w-full font-semibold text-start text-gray-800 hover:text-gray-500 focus:outline-hidden focus:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400" aria-expanded="false" aria-controls="hs-basic-collapse-two">
//                                 <svg className="hs-accordion-active:hidden hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 block size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                     <path d="M5 12h14"></path>
//                                     <path d="M12 5v14"></path>
//                                 </svg>
//                                 <svg className="hs-accordion-active:block hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 hidden size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                     <path d="M5 12h14"></path>
//                                 </svg>
//                                 ¿Mis clientes deben descargar algo para hacer pedidos?
//                             </button>
//                             <div id="hs-basic-collapse-two" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-heading-two">
//                                 <div className="pb-4 px-6">
//                                     <p className="text-sm text-gray-600 dark:text-neutral-200">
//                                         No, tus clientes simplemente entran a tu menú digital y envían el pedido por WhatsApp.
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="hs-accordion" id="hs-basic-heading-three">
//                             <button className="hs-accordion-toggle hs-accordion-active:text-blue-600 px-6 py-3 inline-flex items-center gap-x-3 text-sm w-full font-semibold text-start text-gray-800 hover:text-gray-500 focus:outline-hidden focus:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400" aria-expanded="false" aria-controls="hs-basic-collapse-three">
//                                 <svg className="hs-accordion-active:hidden hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 block size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                     <path d="M5 12h14"></path>
//                                     <path d="M12 5v14"></path>
//                                 </svg>
//                                 <svg className="hs-accordion-active:block hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 hidden size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                     <path d="M5 12h14"></path>
//                                 </svg>
//                                 ¿La app funciona en cualquier tipo de negocio?
//                             </button>
//                             <div id="hs-basic-collapse-three" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-heading-three">
//                                 <div className="pb-4 px-6">
//                                     <p className="text-sm text-gray-600 dark:text-neutral-200">
//                                         Sí, está pensada para emprendedores, restaurantes, tiendas, concesionarias y más.
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="hs-accordion" id="hs-basic-heading-four">
//                             <button className="hs-accordion-toggle hs-accordion-active:text-blue-600 px-6 py-3 inline-flex items-center gap-x-3 text-sm w-full font-semibold text-start text-gray-800 hover:text-gray-500 focus:outline-hidden focus:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400" aria-expanded="false" aria-controls="hs-basic-collapse-four">
//                                 <svg className="hs-accordion-active:hidden hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 block size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                     <path d="M5 12h14"></path>
//                                     <path d="M12 5v14"></path>
//                                 </svg>
//                                 <svg className="hs-accordion-active:block hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 hidden size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                     <path d="M5 12h14"></path>
//                                 </svg>
//                                 ¿Necesito pagar para empezar a usar la aplicación?
//                             </button>
//                             <div id="hs-basic-collapse-four" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-heading-four">
//                                 <div className="pb-4 px-6">
//                                     <p className="text-sm text-gray-600 dark:text-neutral-200">
//                                         Podés empezar gratis y luego elegir un plan según tus necesidades.
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="hs-accordion" id="hs-basic-heading-five">
//                             <button className="hs-accordion-toggle hs-accordion-active:text-blue-600 px-6 py-3 inline-flex items-center gap-x-3 text-sm w-full font-semibold text-start text-gray-800 hover:text-gray-500 focus:outline-hidden focus:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400" aria-expanded="false" aria-controls="hs-basic-collapse-five">
//                                 <svg className="hs-accordion-active:hidden hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 block size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                     <path d="M5 12h14"></path>
//                                     <path d="M12 5v14"></path>
//                                 </svg>
//                                 <svg className="hs-accordion-active:block hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 hidden size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                     <path d="M5 12h14"></path>
//                                 </svg>
//                                 ¿Qué pasa si recibo muchos pedidos al mismo tiempo?
//                             </button>
//                             <div id="hs-basic-collapse-five" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-heading-five">
//                                 <div className="pb-4 px-6">
//                                     <p className="text-sm text-gray-600 dark:text-neutral-200">
//                                         Todos los pedidos llegan organizados en tu WhatsApp, con el detalle del carrito de compra.
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>      

//                         <div className="hs-accordion" id="hs-basic-heading-six">
//                             <button className="hs-accordion-toggle hs-accordion-active:text-blue-600 px-6 py-3 inline-flex items-center gap-x-3 text-sm w-full font-semibold text-start text-gray-800 hover:text-gray-500 focus:outline-hidden focus:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400" aria-expanded="false" aria-controls="hs-basic-collapse-six">
//                                 <svg className="hs-accordion-active:hidden hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 block size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                     <path d="M5 12h14"></path>
//                                     <path d="M12 5v14"></path>
//                                 </svg>
//                                 <svg className="hs-accordion-active:block hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 hidden size-4 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                                     <path d="M5 12h14"></path>
//                                 </svg>
//                                 ¿Puedo modificar mis productos y precios fácilmente?
//                             </button>
//                             <div id="hs-basic-collapse-six" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-heading-six">
//                                 <div className="pb-4 px-6">
//                                     <p className="text-sm text-gray-600 dark:text-neutral-200">
//                                         Sí, podés actualizar tu catálogo en cualquier momento desde tu panel de administración.
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>                    
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default CommonQuestions;
