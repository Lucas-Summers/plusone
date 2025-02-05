"use client"
import React, { useContext, useState, useEffect } from 'react';

interface AuthContextType {
  user: string | null;
  loading: boolean;
  login: (phone: string, password: string) => Promise<boolean>;
  signup: (phone: string, password: string) => Promise<boolean>;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;  // Add this line
}
const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  useEffect(() => {
    // Only access localStorage on the client side
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error("Invalid JSON in localStorage:", error);
          // Optionally, clear the invalid entry:
          localStorage.removeItem('user');
        }
      }
    }
    setLoading(false)
  }, []);
  const [loading, setLoading] = useState(true)

  const login = async (phone: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        return true;
      } else {
        console.error('Login failed');
        return false;
      }
    } catch (error) {
      console.error('Error logging in:', error);
      return false;
    }
  }

  const signup = async (phone: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        return true;
      } else {
        console.error('Signup failed');
        return false;
      }
    } catch (error) {
      console.error('Error signing up:', error);
      return false;
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
