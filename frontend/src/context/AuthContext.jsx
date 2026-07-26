import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user profile if token exists in localStorage
  const loadProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setCurrentUser(null);
      setLoading(false);
      return;
    }

    try {
      const response = await api.get('/api/auth/profile');
      if (response.data?.status === 'success' && response.data?.data?.user) {
        setCurrentUser(response.data.data.user);
      } else {
        // Fallback if structure is slightly different
        setCurrentUser(response.data?.data?.user || null);
      }
    } catch (error) {
      console.error('Failed to load user profile:', error);
      localStorage.removeItem('token');
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  // Login handler
  const login = async (email, password) => {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      const { token, data } = response.data;
      
      localStorage.setItem('token', token);
      setCurrentUser(data.user);
      return { success: true, user: data.user };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
      return { success: false, error: message };
    }
  };

  // Signup handler
  const signup = async (name, email, password) => {
    try {
      const response = await api.post('/api/auth/signup', { name, email, password });
      const { token, data } = response.data;

      localStorage.setItem('token', token);
      setCurrentUser(data.user);
      return { success: true, user: data.user };
    } catch (error) {
      const message = error.response?.data?.message || 'Signup failed. Please try again.';
      return { success: false, error: message };
    }
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    window.location.href = '/login';
  };

  const value = {
    currentUser,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!currentUser,
    refreshUser: loadProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
