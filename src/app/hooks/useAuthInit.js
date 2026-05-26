import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAccessToken } from '../lib/authToken';
import { refreshAccessToken } from '../lib/fetchApi';

const PUBLIC_PATHS = ['/login', '/'];

export const useAuthInitialization = () => {
  const [isReady, setIsReady] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      if (getAccessToken()) {
        setIsReady(true);
        return;
      }

      if (PUBLIC_PATHS.includes(location.pathname)) {
        setIsReady(true);
        return;
      }

      try {
        const refreshed = await refreshAccessToken();
        if (!refreshed) {
          navigate('/login', { replace: true });
        }
      } catch (error) {
        console.warn('Auth initialization failed:', error);
        navigate('/login', { replace: true });
      } finally {
        setIsReady(true);
      }
    };

    initializeAuth();
  }, [location.pathname, navigate]);

  return isReady;
};
