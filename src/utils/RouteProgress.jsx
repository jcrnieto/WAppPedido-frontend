import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false, trickleSpeed: 120 });

export default function RouteProgress() {
  const location = useLocation();
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Arranca la barra cuando cambia la ruta
    NProgress.start();

    // Si en ~300ms no terminó, mantenemos la barra visible
    timeoutRef.current = window.setTimeout(() => {}, 300);

    const done = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      // Si no hay fetches en curso, cerramos la barra en el próximo frame
      requestAnimationFrame(() => NProgress.done());
    };

    // Cleanup se ejecuta al cambiar nuevamente de ruta
    return done;
  }, [location]);

  return null;
}
