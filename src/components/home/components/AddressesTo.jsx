const AddresedTo = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-12 lg:px-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* Texto */}
        <div>
          <span className="text-sm font-semibold bg-pink-100 text-pink-600 px-3 py-1 rounded-full">
            ¿Para quién es?
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 leading-snug">
            Nuestro producto está pensado para 
            <span className="text-green-600"> emprendedores</span>, 
            <span className="text-blue-600"> negocios</span>, 
            <span className="text-purple-600"> concesionarias</span> y 
            <span className="text-orange-600"> cualquier persona</span> 
            que venda por WhatsApp.
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Ya seas un pequeño comercio, un restaurante, o un vendedor independiente, 
            te ayudamos a digitalizar tus pedidos y llegar a más clientes al instante.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md">
              Empieza Gratis
            </button>
            <button className="border border-gray-300 hover:border-gray-400 px-6 py-3 rounded-lg font-semibold text-gray-700">
              Ver Ejemplos
            </button>
          </div>
        </div>

        {/* Imagen / Ilustración */}
        <div className="flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2950/2950711.png"
            alt="Ilustración público objetivo"
            className="w-72 md:w-96"
          />
        </div>
      </div>
    </section>
  );
};

export default AddresedTo;
