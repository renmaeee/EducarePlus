// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'expo-router';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Initialize auth state
  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      // In a real app, you'd check for stored tokens/session
      // For now, we'll just simulate checking stored auth
      setLoading(false);
    } catch (error) {
      console.error('Auth check failed:', error);
      setLoading(false);
    }
  };

  const login = async (username, role) => {
    try {
      setLoading(true);
      
      // Create user object
      const userData = {
        username,
        role,
        // Add other user properties as needed
        id: `${role}_${username}`,
        name: username,
      };

      setUser(userData);
      
      console.log('Login successful, user data:', userData);
      
      // Get dashboard path and redirect
      const dashboardPath = getDashboardPath(role);
      console.log('Redirecting to:', dashboardPath);
      
      setLoading(false);
      
      // Use replace to prevent going back to login
      router.replace(dashboardPath);
      
    } catch (error) {
      console.error('Login failed:', error);
      setLoading(false);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    router.replace('/login');
  };

  const getDashboardPath = (role) => {
    switch (role) {
      case 'eccd_office':
        return '/eccd_office';
      case 'seed_teacher':
        return '/seed_teacher';
      case 'educare_teacher':
        return '/educare_teacher';
      case 'parent':
        return '/parent';
      default:
        return '/login';
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    getDashboardPath,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};