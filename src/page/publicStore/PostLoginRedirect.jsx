import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostLoginRedirect = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
  const syncUser = async () => {
    if (!user || checked) return;

    const email = user?.emailAddresses?.[0]?.emailAddress;
    if (!email) return;

    try {
      // 1. Verificar si ya existe en tu tabla personalizada
      let userData;
      try {
        const response = await axios.get(`http://localhost:3000/api/users/by-email/${email}`);
        userData = response.data;
        console.log('🟢 Usuario ya existe en Supabase');
      } catch (getError) {
        console.warn('⚠️ Usuario no encontrado. Registrando nuevo usuario...');
        
        // 2. Si no existe, lo registramos
        const registerResponse = await axios.post('http://localhost:3000/api/users/register', { email });
        userData = registerResponse.data;
      }

      if (!userData || !userData.id) {
        console.error('❌ No se pudo obtener el usuario');
        return;
      }
      console.log('🟢 Usuario verificado/registrado:', userData);
      console.log('userId:', userData.id);
      console.log('profileCompleted:', userData.profile_completed);
      console.log('personalData:', userData.personalData?.[0]);

      const personalDataEntry = userData.personalData?.[0];
      
      // 3. Redireccionar según estado del perfil
      if (userData.profile_completed && personalDataEntry?.admin_url) {
        navigate(personalDataEntry?.admin_url);
      } else {
        navigate('/completar-perfil');
      }

      setChecked(true);
    } catch (error) {
      console.error('❌ Error registrando/verificando usuario:', error);
    }
  };

  syncUser();
}, [user, navigate, checked]);

  return <div>Cargando...</div>;
};

export default PostLoginRedirect;
