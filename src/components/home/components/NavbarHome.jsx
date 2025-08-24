import { useState } from 'react';

const NavbarHome = () => {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => setOpen(!open);

  const navItems = [
    { href: '#home', label: 'Inicio' },
    { href: '#about', label: 'Sobre Nosotros' },
    { href: '#projects', label: 'Contratar Servicio' },
    { href: '#contact', label: 'Contacto' },
  ];

  return (
    <nav className="bg-green-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">WA PEDIDOS</h1>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-6">
          {navItems.map(item => (
            <li key={item.href}>
              <a href={item.href} className="hover:underline">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none"
          aria-label="Abrir menú"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile nav dropdown */}
      {open && (
        <ul className="md:hidden mt-4 space-y-2">
          {navItems.map(item => (
            <li key={item.href}>
              <a
                href={item.href}
                className="block px-4 py-2 hover:bg-gray-700 rounded"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default NavbarHome;
