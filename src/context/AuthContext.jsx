import React, { createContext, useState, useContext, useEffect } from "react";
import { loginUser, registerUser } from "../api/apiService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Объект пользователя
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // 'login' | 'register'

  // Проверка токена при загрузке (упрощенно)
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const name = localStorage.getItem("user_name");
    if (token) {
      setUser({ name: name || "User" });
    }
  }, []);

  const openAuthModal = (mode = "login") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = async (email, password) => {
    try {
      const data = await loginUser(email, password);

      // СОХРАНЯЕМ ОБА ТОКЕНА
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token); // <--- Добавили
      localStorage.setItem("user_name", data.name);

      setUser({ name: data.name, email: data.login });
      closeAuthModal();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || "Ошибка входа" };
    }
  };

  const register = async (name, email, password) => {
    try {
      const data = await registerUser(name, email, password);

      // СОХРАНЯЕМ ОБА ТОКЕНА
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token); // <--- Добавили
      localStorage.setItem("user_name", data.name);

      setUser({ name: data.name, email: data.login });
      closeAuthModal();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message || "Ошибка регистрации" };
    }
  };

  const logout = () => {
    // ЧИСТИМ ВСЁ
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token"); // <--- Добавили
    localStorage.removeItem("user_name");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthModalOpen,
        authMode,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
