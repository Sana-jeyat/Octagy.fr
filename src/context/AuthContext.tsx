'use client';

import React, { createContext, useState, useEffect, useRef, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  logoutMessage: string;
  isAuthInitialized: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => {},
  logout: async () => {},
  logoutMessage: '',
  isAuthInitialized: false,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState('');
  const router = useRouter();

  const warningTimeout = useRef<NodeJS.Timeout | null>(null);
  const autoRefreshTimeout = useRef<NodeJS.Timeout | null>(null);
  const lastActivityTime = useRef(Date.now());

 
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/me`, {
          credentials: 'include', 
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          setIsAuthenticated(true);
          localStorage.setItem('isLoggedIn', 'true');
        } else {
          setIsAuthenticated(false);
          setUser(null);
            localStorage.removeItem('isLoggedIn');
        }
      } catch {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsAuthInitialized(true);
      }
    };

    checkAuth();
  }, []);

 
const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok && data.user) {
      // ✅ mettre à jour tout de suite le contexte
      setUser(data.user);
      setIsAuthenticated(true);
      localStorage.setItem('isLoggedIn', 'true');

      toast.success('Connexion réussie !');
      router.push('/dashboard');
    } else {
      toast.error(data.message || 'Identifiants invalides');
    }
  } catch (error) {
    toast.error('Erreur de connexion au serveur');
  }
};



  // 🚪 Déconnexion
  const logout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/logout`, {
        method: 'POST',
        credentials: 'include', // ✅ pour supprimer le cookie côté serveur
      });
    } catch (e) {
      console.warn('Erreur lors de la déconnexion', e);
    }

    setIsAuthenticated(false);
    setUser(null);
    toast.success('Déconnexion réussie.');
    router.push('/');
  };

  // 🔄 Rafraîchissement de session
  const refreshTokens = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}/refresh`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        toast.warning('Session expirée, veuillez vous reconnecter.');
        logout();
      }
    } catch (error) {
      console.error('Erreur lors du refresh token', error);
      toast.warning('Session expirée, veuillez vous reconnecter.');
      logout();
    }
  };

  // 👀 Suivi d’activité
  const handleUserActivity = () => {
    lastActivityTime.current = Date.now();
  };

  useEffect(() => {
    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart'];
    events.forEach((event) => window.addEventListener(event, handleUserActivity));
    return () => events.forEach((event) => window.removeEventListener(event, handleUserActivity));
  }, []);

  // ⚠️ Avertissement avant expiration
  const showExpirationWarning = () => {
    toast.info(
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
        <span style={{ flexGrow: 1 }}>
          Vous êtes encore là ? Votre session va bientôt expirer.
        </span>
        <button
          onClick={refreshTokens}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            minWidth: '180px',
            textAlign: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          Rester connecté
        </button>
      </div>,
      {
        autoClose: 60000,
        pauseOnHover: true,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  // ⏱️ Timers d’expiration
  const startExpirationTimers = () => {
    if (warningTimeout.current) clearTimeout(warningTimeout.current);
    if (autoRefreshTimeout.current) clearTimeout(autoRefreshTimeout.current);

    warningTimeout.current = setTimeout(() => {
      const now = Date.now();
      const inactiveFor = now - lastActivityTime.current;

      if (inactiveFor > 25 * 60 * 1000) {
        showExpirationWarning();
        autoRefreshTimeout.current = setTimeout(() => {
          toast.warning('Votre session a expiré. Veuillez vous reconnecter.');
          logout();
        }, 60 * 1000);
      } else {
        refreshTokens();
      }
    }, 20 * 60 * 1000);
  };

  useEffect(() => {
    if (isAuthenticated) startExpirationTimers();
    return () => {
      if (warningTimeout.current) clearTimeout(warningTimeout.current);
      if (autoRefreshTimeout.current) clearTimeout(autoRefreshTimeout.current);
    };
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        logoutMessage,
        isAuthInitialized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
