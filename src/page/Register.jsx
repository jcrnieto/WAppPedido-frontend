import { SignUp } from '@clerk/clerk-react';

const Register = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignUp
        path="/register"
        routing="path"
        redirectUrl="/post-login" 
      />
    </div>
  );
};

export default Register;
