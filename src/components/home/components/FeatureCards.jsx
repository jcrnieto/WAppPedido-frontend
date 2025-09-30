// import { Store, ShoppingBag, Car, Utensils } from "lucide-react";

const FeatureCards = () => {
  // const items = [
  //   { icon: <ShoppingBag className="w-8 h-8 text-blue-600" />, title: "Emprendedores", desc: "Personas que venden por WhatsApp" },
  //   { icon: <Store className="w-8 h-8 text-green-600" />, title: "Negocios locales", desc: "Tiendas de ropa, bazares, electrónica y más" },
  //   { icon: <Car className="w-8 h-8 text-red-600" />, title: "Concesionarias", desc: "Autos, motos y repuestos" },
  //   { icon: <Utensils className="w-8 h-8 text-yellow-600" />, title: "Gastronomía", desc: "Restaurantes y servicios de comida" },
  // ];
  const profiles = [
    {
      title: "Kioscos",
      description: "Catálogo simple para compras rápidas.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      title: "Restaurantes",
      description: "Menú online con horarios y ubicación.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          <circle cx="12" cy="12" r="10" strokeWidth={2} />
        </svg>
      ),
    },
    {
      title: "Emprendedores",
      description: "Mostrá tus productos y recibí pedidos.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "Tiendas de barrio",
      description: "Tu link para tus clientes de siempre.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
  ]

  return (
    <section id="para-quien" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            ¿Para quién está pensada?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            WA Pedidos es ideal para cualquier negocio que quiera vender por WhatsApp de forma profesional
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {profiles.map((profile, index) => (
            <div
              key={index}
              className="bg-white border-2 border-border rounded-2xl p-6 hover:border-primary hover:shadow-lg transition-all"
            >
              <div className="text-primary mb-4">{profile.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">{profile.title}</h3>
              <p className="text-sm sm:text-base text-muted-foreground">{profile.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

//   return (
//     <section className="bg-white py-10 px-4 md:px-8">
//       <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
//         ¿Para quién está pensado?
//       </h2>
//       <p className="text-center text-gray-600 mb-8">
//         Ideal para quienes venden por WhatsApp y quieren mostrar sus productos al instante.
//       </p>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
//         {items.map((item, i) => (
//           <div key={i} className="flex flex-col items-center text-center p-4 border rounded-xl shadow-sm hover:shadow-md transition">
//             {item.icon}
//             <h3 className="mt-3 font-semibold text-gray-800">{item.title}</h3>
//             <p className="text-sm text-gray-600">{item.desc}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

export default FeatureCards;
