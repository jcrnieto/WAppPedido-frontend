import { Store, ShoppingBag, Car, Utensils } from "lucide-react";

const FeatureCards = () => {
  const items = [
    { icon: <ShoppingBag className="w-8 h-8 text-blue-600" />, title: "Emprendedores", desc: "Personas que venden por WhatsApp" },
    { icon: <Store className="w-8 h-8 text-green-600" />, title: "Negocios locales", desc: "Tiendas de ropa, bazares, electrónica y más" },
    { icon: <Car className="w-8 h-8 text-red-600" />, title: "Concesionarias", desc: "Autos, motos y repuestos" },
    { icon: <Utensils className="w-8 h-8 text-yellow-600" />, title: "Gastronomía", desc: "Restaurantes y servicios de comida" },
  ];

  return (
    <section className="bg-white py-10 px-4 md:px-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
        ¿Para quién está pensado?
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Ideal para quienes venden por WhatsApp y quieren mostrar sus productos al instante.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center p-4 border rounded-xl shadow-sm hover:shadow-md transition">
            {item.icon}
            <h3 className="mt-3 font-semibold text-gray-800">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;
