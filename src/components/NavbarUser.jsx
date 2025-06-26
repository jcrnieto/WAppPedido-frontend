import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const NavbarUser = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-lg font-bold text-blue-600">La Casa</h1>
        <button onClick={toggleMenu} className="focus:outline-none">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="bg-gray-50 p-4 border-t border-gray-200 text-sm space-y-4">
          <div>
            <h2 className="font-semibold text-gray-800">Horarios de atención</h2>
            <p>Lunes a Viernes: 9:00 - 18:00</p>
            <p>Sábados: 10:00 - 14:00</p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-800">Ubicación</h2>
            <p>Av. Siempre Viva 1234, Buenos Aires</p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-800">Redes Sociales</h2>
            <ul className="space-y-1">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarUser;
