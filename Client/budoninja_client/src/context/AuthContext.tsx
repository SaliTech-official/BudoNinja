// src/context/AuthContext.tsx
import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
    useCallback,
  } from "react";
  import { useNavigate } from "react-router-dom";
  import api from "../api/axios";
  import ENDPOINTS from "../api/endpoints";
  import { authStorage } from "../store/authStore";
  
  interface User {
    id: number;
    phone_number?: string;
    email?: string;
    full_name?: string;
    first_name?: string;
    last_name?: string;
    is_verified?: boolean;
    [key: string]: unknown;
  }
  
  interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (access: string, refresh: string) => void;
    logout: () => void;
    fetchUser: () => Promise<void>;
  }
  
  const AuthContext = createContext<AuthContextType | null>(null);
  
  export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
  
    const fetchUser = useCallback(async () => {
      if (!authStorage.isAuthenticated()) {
        setUser(null);
        setIsLoading(false);
        return;
      }
  
      try {
        const { data } = await api.get(ENDPOINTS.profile.me);
        setUser(data);
      } catch {
        setUser(null);
        authStorage.clearTokens();
      } finally {
        setIsLoading(false);
      }
    }, []);
  
    useEffect(() => {
      fetchUser();
    }, [fetchUser]);
  
    const login = (access: string, refresh: string) => {
      authStorage.setTokens(access, refresh);
      fetchUser();
    };
  
    const logout = () => {
      authStorage.clearTokens();
      setUser(null);
      navigate("/login");
    };
  
    return (
      <AuthContext.Provider
        value={{
          user,
          isAuthenticated: !!user,
          isLoading,
          login,
          logout,
          fetchUser,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
  
  export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
  }