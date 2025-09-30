const HowItWorks = () =>{
  const steps = [
    {
      number: "1",
      title: "Registrate",
      description: "Creá tu cuenta en minutos, sin complicaciones.",
    },
    {
      number: "2",
      title: "Cargá categorías y productos",
      description: "Subí fotos, precios y descripciones de tus productos.",
    },
    {
      number: "3",
      title: "Compartí tu link",
      description: "Enviá tu link público y recibí pedidos por WhatsApp.",
    },
  ]

  return (
    <section id="como-funciona" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">¿Cómo funciona?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            En 3 simples pasos empezás a recibir pedidos
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
            <div className="pt-4">
              <p className="text-sm text-muted-foreground mb-2">Ejemplo de link público:</p>
              <code className="px-4 py-2 bg-muted rounded-lg text-sm text-primary inline-block">
                wa-pedidos.com/placeres-sin-tacc
              </code>
            </div>
          </div>

          {/* Video Placeholder */}
          <div className="relative">
            <div className="aspect-video bg-slate-200 rounded-2xl shadow-xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                <button className="w-20 h-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-secondary transition-colors shadow-lg">
                  <svg className="w-10 h-10 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">Mirá cómo funciona en menos de 2 minutos</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks;
