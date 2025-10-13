import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const NavbarHome = () => {
  const navigate = useNavigate();
  
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: "#inicio", label: "Inicio" },
    { href: "#caracteristicas", label: "Características" },
    { href: "#planes", label: "Precios" },
    { href: "#contacto", label: "Contacto" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-border z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-foreground">WA Pedidos</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a 
             onClick={() => navigate('/login')} 
             className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Iniciar Sesión
            </a>
            <a
              onClick={() => navigate('/register')}
              className="px-5 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-secondary transition-colors"
            >
              Registrarse
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                // href="/admin"
                // onClick={() => setIsOpen(false)}
                onClick={() => navigate('/login')}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Iniciar Sesión
              </a>
              <a
                href="#contacto"
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-secondary transition-colors text-center"
              >
                Registrarse
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default NavbarHome;

//   return (
//     <nav className="bg-green-600 text-white px-6 py-4 shadow-md">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         <h1 className="text-xl font-bold">WA PEDIDOS</h1>

//         {/* Desktop nav */}
//         <ul className="hidden md:flex gap-6">
//           {navItems.map((item) => (
//             <li key={item.href}>
//               {item.isLogin ? (
//                 <button
//                   onClick={() => navigate("/login")}
//                   className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
//                 >
//                   {item.label}
//                 </button>
//               ) : (
//                 <a href={item.href} className="hover:underline">
//                   {item.label}
//                 </a>
//               )}
//             </li>
//           ))}
//         </ul>

//         {/* Mobile menu button */}
//         <button
//           onClick={toggleMenu}
//           className="md:hidden focus:outline-none"
//           aria-label="Abrir menú"
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M4 6h16M4 12h16M4 18h16"
//             />
//           </svg>
//         </button>
//       </div>

//       {/* Mobile nav dropdown */}
//       {open && (
//         <ul className="md:hidden mt-4 space-y-2">
//           {navItems.map((item) => (
//             <li key={item.href}>
//               {item.isLogin ? (
//                 <button
//                   onClick={() => {
//                     setOpen(false);
//                     navigate("/login");
//                   }}
//                   className="w-full text-left block px-4 py-2 bg-white text-green-600 font-semibold rounded hover:bg-gray-100"
//                 >
//                   {item.label}
//                 </button>
//               ) : (
//                 <a
//                   href={item.href}
//                   className="block px-4 py-2 hover:bg-gray-700 rounded"
//                   onClick={() => setOpen(false)}
//                 >
//                   {item.label}
//                 </a>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </nav>
//   );
// };

// export default NavbarHome;

