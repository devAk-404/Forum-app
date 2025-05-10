import { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister } from '../services/authService';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      // optionally fetch user profile
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, [token]);

  const login = async (creds) => {
    try {
      const { token, user } = await apiLogin(creds);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setToken(token);
      setUser(user);
      toast.success('Logged in!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  const register = async (creds) => {
    try {
      const { token, user } = await apiRegister(creds);
  
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setToken(token);
      setUser(user);
      toast.success('Registered!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };
  

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setToken(null);
    toast('Logged out');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
