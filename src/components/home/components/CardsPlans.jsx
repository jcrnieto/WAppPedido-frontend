const CardsPlans = () => {
  return (
    <section className="py-16 bg-white dark:bg-neutral-900">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Elige el plan adecuado para tu negocio
        </h2>
        <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
          Suscríbete y empieza a recibir pedidos por WhatsApp en minutos.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Plan Argentina */}
          <div className="border border-gray-200 dark:border-neutral-700 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Plan Argentina</h3>
            <p className="mt-4 text-4xl font-bold text-gray-900 dark:text-white">
              $20.000 <span className="text-lg font-normal text-gray-500">/mes</span>
            </p>
            <ul className="mt-6 space-y-3 text-gray-600 dark:text-gray-300">
              <li>✅ Acceso ilimitado a la app</li>
              <li>✅ Envío automático del pedido a WhatsApp</li>
              <li>✅ Soporte prioritario por WhatsApp</li>
              <li>✅ Estadísticas básicas de pedidos</li>
            </ul>
            <button className="mt-6 w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
              Elegir Plan
            </button>
          </div>

          {/* Plan Internacional */}
          <div className="border border-gray-200 dark:border-neutral-700 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Plan Internacional</h3>
            <p className="mt-4 text-4xl font-bold text-gray-900 dark:text-white">
              USD 15 <span className="text-lg font-normal text-gray-500">/mes</span>
            </p>
            <ul className="mt-6 space-y-3 text-gray-600 dark:text-gray-300">
              <li>✅ Acceso ilimitado a la app</li>
              <li>✅ Envío automático del pedido a WhatsApp</li>
              <li>✅ Multi-idioma (Español / Inglés)</li>
              <li>✅ Estadísticas básicas de pedidos</li>
            </ul>
            <button className="mt-6 w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
              Elegir Plan
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardsPlans;
