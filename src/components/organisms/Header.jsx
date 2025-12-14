import React from 'react';
import { useNavigate } from 'react-router-dom'; // <--- Добавили хук навигации
import { Logo } from '../atoms/Logo';
import { useAuth } from '../../context/AuthContext';

export const Header = () => {
  const { user, openAuthModal } = useAuth();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (user) {
      // Если залогинен — идем в профиль
      navigate('/profile');
    } else {
      // Если нет — открываем окно входа
      openAuthModal('login');
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent py-4 pointer-events-none">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between pointer-events-auto">
        
        <div className="flex-shrink-0">
          <Logo />
        </div>
        
        {/* Правая часть: Всегда одна и та же иконка */}
        <button 
            onClick={handleProfileClick}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-all active:scale-95"
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        </button>

      </div>
    </header>
  );
};