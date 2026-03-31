import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('echomind-user');
    return stored ? JSON.parse(stored) : null;
  });

  const signup = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('echomind-users') || '[]');
    if (users.find(u => u.email === email)) {
      throw new Error('An account with this email already exists');
    }
    const newUser = { name, email, password, id: Date.now().toString() };
    users.push(newUser);
    localStorage.setItem('echomind-users', JSON.stringify(users));
    const session = { name, email, id: newUser.id };
    setUser(session);
    localStorage.setItem('echomind-user', JSON.stringify(session));
    return session;
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('echomind-users') || '[]');
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) throw new Error('Invalid email or password');
    const session = { name: found.name, email: found.email, id: found.id };
    setUser(session);
    localStorage.setItem('echomind-user', JSON.stringify(session));
    return session;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('echomind-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
