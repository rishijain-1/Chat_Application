import Login from '@/components/Login';
import LogoHeader from '@/components/LogoHeader';
import React from 'react';

// Ensure the component is capitalized to follow React naming conventions
const LoginPage = () => {
  return (
    <div>
      <LogoHeader/>
      <Login />
    </div>
  );
};

export default LoginPage;
