import { SignIn, useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../config/supabaseConfig';

const Login = () => {
  
  const { user, isSignedIn } = useUser();
  console.log('esto es usee de clerk',user)
  const navigate = useNavigate();

  useEffect(() => {
    const redirectToAdmin = async () => {
      if (isSignedIn && user) {
        try {
          // 1. Buscar el slug (admin_url) desde Supabase
          const { data, error } = await supabase
            .from('personal_data')
            .select('admin_url')
            .eq('auth_user_id', user.id)
            .maybeSingle();

          if (error) throw error;

          if (data?.admin_url) {
            navigate(`/${data.admin_url.replace(/^\/+/, '')}`, { replace: true });
          } else {
            console.warn('No se encontró el admin_url');
            navigate('/admin'); // fallback
          }
        } catch (err) {
          console.error('Error redirigiendo:', err);
          navigate('/admin'); // fallback
        }
      }
    };

    redirectToAdmin();
  }, [isSignedIn, user, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      {!isSignedIn && (
        <SignIn
          path="/login"
          routing="path"
          redirectUrl="/post-login"
          signUpUrl="/register"
        />
      )}
    </div>
  );
};

export default Login;
