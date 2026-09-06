import React, { createContext, useContext, useState, useEffect } from 'react';
import { VisitorUser, AdminUser } from '../types';

interface AuthContextType {
  // Visitor State
  visitorUser: VisitorUser | null;
  visitorToken: string | null;
  isVisitorAuthenticated: boolean;
  visitorLogin: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  visitorSignup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  visitorLogout: () => Promise<void>;

  // Admin State
  adminUser: AdminUser | null;
  adminToken: string | null;
  isAdminAuthenticated: boolean;
  adminExists: boolean | null;
  adminLogin: (identifier: string, password: string) => Promise<{ success: boolean; error?: string }>;
  adminSetup: (username: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  adminLogout: () => Promise<void>;
  refreshAdminStatus: () => Promise<void>;

  // General Loading State
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const VISITOR_TOKEN_KEY = 'gordylez_visitor_token';
const ADMIN_TOKEN_KEY = 'gordylez_admin_token';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visitorUser, setVisitorUser] = useState<VisitorUser | null>(null);
  const [visitorToken, setVisitorToken] = useState<string | null>(() => localStorage.getItem(VISITOR_TOKEN_KEY));
  
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [adminToken, setAdminToken] = useState<string | null>(() => localStorage.getItem(ADMIN_TOKEN_KEY));
  const [adminExists, setAdminExists] = useState<boolean | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  // Check admin initialized status from backend
  const refreshAdminStatus = async () => {
    try {
      const res = await fetch('/api/auth/admin/status');
      if (res.ok) {
        const data = await res.json();
        setAdminExists(data.hasAdmin);
      }
    } catch (err) {
      console.error('Failed to check admin status:', err);
    }
  };

  // Initial authentication verification on boot
  useEffect(() => {
    let isMounted = true;

    async function initAuth() {
      setIsLoading(true);
      await refreshAdminStatus();

      // Verify Visitor token
      const storedVisitorToken = localStorage.getItem(VISITOR_TOKEN_KEY);
      if (storedVisitorToken) {
        try {
          const res = await fetch('/api/auth/visitor/me', {
            headers: {
              Authorization: `Bearer ${storedVisitorToken}`
            }
          });
          if (res.ok) {
            const data = await res.json();
            if (isMounted) {
              setVisitorUser(data.user);
              setVisitorToken(storedVisitorToken);
            }
          } else {
            // Token expired or invalid
            localStorage.removeItem(VISITOR_TOKEN_KEY);
            if (isMounted) {
              setVisitorUser(null);
              setVisitorToken(null);
            }
          }
        } catch (err) {
          console.error('Visitor auth check error:', err);
        }
      }

      // Verify Admin token
      const storedAdminToken = localStorage.getItem(ADMIN_TOKEN_KEY);
      if (storedAdminToken) {
        try {
          const res = await fetch('/api/auth/admin/me', {
            headers: {
              Authorization: `Bearer ${storedAdminToken}`
            }
          });
          if (res.ok) {
            const data = await res.json();
            if (isMounted) {
              setAdminUser(data.user);
              setAdminToken(storedAdminToken);
            }
          } else {
            // Admin token expired or invalid
            localStorage.removeItem(ADMIN_TOKEN_KEY);
            if (isMounted) {
              setAdminUser(null);
              setAdminToken(null);
            }
          }
        } catch (err) {
          console.error('Admin auth check error:', err);
        }
      }

      if (isMounted) {
        setIsLoading(false);
      }
    }

    initAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  // ---------------- Visitor Actions ----------------
  const visitorLogin = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/visitor/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Login failed.' };
      }
      localStorage.setItem(VISITOR_TOKEN_KEY, data.token);
      setVisitorToken(data.token);
      setVisitorUser(data.user);
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Network error connecting to authentication server.' };
    }
  };

  const visitorSignup = async (name: string, email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/visitor/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Registration failed.' };
      }
      localStorage.setItem(VISITOR_TOKEN_KEY, data.token);
      setVisitorToken(data.token);
      setVisitorUser(data.user);
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Network error connecting to authentication server.' };
    }
  };

  const visitorLogout = async () => {
    const token = localStorage.getItem(VISITOR_TOKEN_KEY);
    if (token) {
      try {
        await fetch('/api/auth/visitor/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (err) {
        console.error('Visitor logout error:', err);
      }
    }
    localStorage.removeItem(VISITOR_TOKEN_KEY);
    setVisitorToken(null);
    setVisitorUser(null);
  };

  // ---------------- Admin Actions ----------------
  const adminLogin = async (identifier: string, password: string) => {
    try {
      const res = await fetch('/api/auth/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Admin login failed.' };
      }
      localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
      setAdminToken(data.token);
      setAdminUser(data.user);
      await refreshAdminStatus();
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Network error connecting to admin server.' };
    }
  };

  const adminSetup = async (username: string, email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/admin/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Administrator setup failed.' };
      }
      localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
      setAdminToken(data.token);
      setAdminUser(data.user);
      await refreshAdminStatus();
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Network error connecting to admin setup server.' };
    }
  };

  const adminLogout = async () => {
    const token = localStorage.getItem(ADMIN_TOKEN_KEY);
    if (token) {
      try {
        await fetch('/api/auth/admin/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (err) {
        console.error('Admin logout error:', err);
      }
    }
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    setAdminToken(null);
    setAdminUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        visitorUser,
        visitorToken,
        isVisitorAuthenticated: !!visitorUser,
        visitorLogin,
        visitorSignup,
        visitorLogout,

        adminUser,
        adminToken,
        isAdminAuthenticated: !!adminUser,
        adminExists,
        adminLogin,
        adminSetup,
        adminLogout,
        refreshAdminStatus,

        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
