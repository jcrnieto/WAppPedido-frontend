const CardsPlans = () => {
  const plans = [
    {
      name: "Plan Argentina",
      price: "ARS $20.000",
      period: "/mes",
      currency: "ARS",
      features: [
        "Catálogo ilimitado",
        "Link público personalizado",
        "Pedidos por WhatsApp",
        "Soporte por email",
        "Actualizaciones incluidas",
      ],
      cta: "Empezar en ARS",
      highlighted: true,
    },
    {
      name: "Plan Exterior",
      price: "USD $20",
      period: "/mes",
      currency: "USD",
      features: [
        "Catálogo ilimitado",
        "Link público personalizado",
        "Pedidos por WhatsApp",
        "Soporte por email",
        "Actualizaciones incluidas",
      ],
      cta: "Empezar en USD",
      highlighted: false,
    },
  ]

  return (
    <section id="planes" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">Elegí tu plan</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Precios simples y transparentes. Sin costos ocultos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl p-6 sm:p-8 ${
                plan.highlighted
                  ? "bg-primary text-primary-foreground shadow-2xl md:scale-105"
                  : "bg-white border-2 border-border shadow-lg"
              }`}
            >
              {plan.highlighted && (
                <div className="text-sm font-semibold mb-4 text-primary-foreground/90">⭐ Recomendado</div>
              )}
              <h3
                className={`text-xl sm:text-2xl font-bold mb-2 ${plan.highlighted ? "text-primary-foreground" : "text-foreground"}`}
              >
                {plan.name}
              </h3>
              <div className="mb-6">
                <span
                  className={`text-3xl sm:text-4xl font-bold ${plan.highlighted ? "text-primary-foreground" : "text-foreground"}`}
                >
                  {plan.price}
                </span>
                <span
                  className={`text-base sm:text-lg ${plan.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                >
                  {plan.period}
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        plan.highlighted ? "text-primary-foreground" : "text-primary"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span
                      className={`text-sm sm:text-base ${plan.highlighted ? "text-primary-foreground" : "text-foreground"}`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="#contacto"
                className={`block w-full py-3 px-6 rounded-xl font-semibold text-center transition-colors text-sm sm:text-base ${
                  plan.highlighted
                    ? "bg-white text-primary hover:bg-slate-100"
                    : "bg-primary text-primary-foreground hover:bg-secondary"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Precios de referencia. Podés cancelar cuando quieras.
        </p>
      </div>
    </section>
  )
};

export default CardsPlans;
//   return (
//     <section className="py-16 bg-white dark:bg-neutral-900">
//       <div className="max-w-5xl mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
//           Elige el plan adecuado para tu negocio
//         </h2>
//         <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
//           Suscríbete y empieza a recibir pedidos por WhatsApp en minutos.
//         </p>

//         <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Plan Argentina */}
//           <div className="border border-gray-200 dark:border-neutral-700 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
//             <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Plan Argentina</h3>
//             <p className="mt-4 text-4xl font-bold text-gray-900 dark:text-white">
//               $20.000 <span className="text-lg font-normal text-gray-500">/mes</span>
//             </p>
//             <ul className="mt-6 space-y-3 text-gray-600 dark:text-gray-300">
//               <li>✅ Acceso ilimitado a la app</li>
//               <li>✅ Envío automático del pedido a WhatsApp</li>
//               <li>✅ Soporte prioritario por WhatsApp</li>
//               <li>✅ Estadísticas básicas de pedidos</li>
//             </ul>
//             <button className="mt-6 w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
//               Elegir Plan
//             </button>
//           </div>

//           {/* Plan Internacional */}
//           <div className="border border-gray-200 dark:border-neutral-700 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
//             <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Plan Internacional</h3>
//             <p className="mt-4 text-4xl font-bold text-gray-900 dark:text-white">
//               USD 15 <span className="text-lg font-normal text-gray-500">/mes</span>
//             </p>
//             <ul className="mt-6 space-y-3 text-gray-600 dark:text-gray-300">
//               <li>✅ Acceso ilimitado a la app</li>
//               <li>✅ Envío automático del pedido a WhatsApp</li>
//               <li>✅ Multi-idioma (Español / Inglés)</li>
//               <li>✅ Estadísticas básicas de pedidos</li>
//             </ul>
//             <button className="mt-6 w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
//               Elegir Plan
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CardsPlans;
