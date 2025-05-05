import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  loading: false,
  signIn: async () => {},
  signOut: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = () => {
      const sessionData = localStorage.getItem('adminSession');
      if (sessionData) {
        try {
          const { expiresAt } = JSON.parse(sessionData);
          if (new Date().getTime() < expiresAt) {
            setIsAuthenticated(true);
          } else {
            // Session expired
            localStorage.removeItem('adminSession');
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error('Error parsing session data:', error);
          localStorage.removeItem('adminSession');
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
      const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

      if (!adminEmail || !adminPassword) {
        throw new Error('Admin credentials not configured');
      }

      if (email === adminEmail && password === adminPassword) {
        // Set session with 5-minute expiration
        const expiresAt = new Date().getTime() + (5 * 60 * 1000); // 5 minutes
        localStorage.setItem('adminSession', JSON.stringify({ expiresAt }));
        setIsAuthenticated(true);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem('adminSession');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};