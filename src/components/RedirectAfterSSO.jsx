import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectAfterSSO = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Esperamos medio segundo para que Clerk termine su proceso
    const timeout = setTimeout(() => {
      navigate("/formulario-datos-personales");
    }, 500);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return <div>Cargando...</div>;
};

export default RedirectAfterSSO;
