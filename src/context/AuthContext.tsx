import React, { createContext, useContext, ReactNode } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { localisable } from "../utils/localisable";

interface AuthContextType {
  loginWithRedirect: () => void;
  logout: () => void;
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(localisable.error.authError);
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0();

  return (
    <AuthContext.Provider
      value={{
        loginWithRedirect,
        logout,
        user,
        isAuthenticated,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
