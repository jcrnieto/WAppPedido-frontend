const FooterHome = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm">
        <p>© {new Date().getFullYear()} Juan Cruz - Todos los derechos reservados.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#privacy" className="hover:underline">Política de Privacidad</a>
          <a href="#terms" className="hover:underline">Términos y Condiciones</a>
        </div>
      </div>
    </footer>
  );
};

export default FooterHome;

