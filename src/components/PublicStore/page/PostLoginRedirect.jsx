import axios from 'axios';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const PostLoginRedirect = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  
  useEffect(() => {
  const syncUser = async () => {
    if (!user || checked) return;
    setChecked(true);

    // const userId = user?.id;
    const email = user?.emailAddresses?.[0]?.emailAddress;
    if (!email) return;

    const token = await getToken();

    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    // Recuperar intención (query o localStorage)
    const urlParams = new URLSearchParams(location.search);
    let planIntent = urlParams.get('plan') || localStorage.getItem('signupIntent') || 'trial';
    if (!['trial', 'pro'].includes(planIntent)) planIntent = 'trial';

    try {
      // 1. Verificar si ya existe en tu tabla personalizada
      let userData;
      try {
        console.log('esto es la baseUrl de render backend', baseUrl);
        await new Promise(res => setTimeout(res, 500));
        const response = await axios.get(`${baseUrl}/users/by-email/${email}`);
        console.log("🟠 Response del backend:", response);
        userData = response.data;
        console.log('🟢 Usuario ya existe en Supabase');
      } catch (getError) {
        console.warn('⚠️ Usuario no encontrado. Registrando nuevo usuario...');
        
        // 2. Si no existe, lo registramos
        const registerResponse = await axios.post(`${baseUrl}/users/register`, { email, planIntent }, { headers });
        userData = registerResponse.data;
      }

      localStorage.removeItem('signupIntent');

      if (!userData || !userData.id) {
        console.error('❌ No se pudo obtener el usuario');
        return;
      }
      console.log('🟢 Usuario verificado/registrado:', userData);
      //console.log('userId:', userData.id);
      //console.log('profileCompleted:', userData.profile_completed);
      //console.log('personalData:', userData.personalData?.[0]);

      const personalDataEntry = userData.personalData;
      
      // 3. Redireccionar según estado del perfil
      if (userData.profile_completed && personalDataEntry?.admin_url) {
        navigate(personalDataEntry?.admin_url);
      } else {
        navigate('/completar-perfil');
      }

      
    } catch (error) {
      console.error('❌ Error registrando/verificando usuario:', error);
    }
  };

  syncUser();
}, [user, navigate, checked]);

 return (
  <div className="p-4 text-center">
    <p className="text-sm">Cargando usuario...</p>
    {/* <p className="text-xs text-gray-500">{email ? `Email: ${email}` : 'Sin email aún'}</p> */}
  </div>
);
};

export default PostLoginRedirect;
