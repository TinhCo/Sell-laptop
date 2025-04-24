import { useState, useEffect } from 'react';

const useAuth = () => {
  const [authData, setAuthData] = useState({
    accessToken: localStorage.getItem('token'),
    email: localStorage.getItem('email'),
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setAuthData({
        accessToken: localStorage.getItem('token'),
        email: localStorage.getItem('email'),
      });
    };

    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return authData;
};

export default useAuth;
