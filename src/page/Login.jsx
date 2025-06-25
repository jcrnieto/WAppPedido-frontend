import { SignIn, useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate('/admin');
    }
  }, [isSignedIn, navigate]);

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

