import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export const AuthModal = () => {
  const { isAuthModalOpen, authMode, closeAuthModal, login, register } = useAuth();
  
  const [mode, setMode] = useState(authMode); // 'login' | 'register'
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Синхронизация при открытии
  useEffect(() => {
    if (isAuthModalOpen) {
        setMode(authMode);
        setFormData({ name: '', email: '', password: '' });
        setError('');
    }
  }, [isAuthModalOpen, authMode]);

  if (!isAuthModalOpen) return null;

  const isLogin = mode === 'login';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    let result;
    // Определяем, какую функцию вызывать в зависимости от активной формы
    // Важно: так как формы теперь существуют одновременно, смотрим на state 'mode'
    if (isLogin) {
        result = await login(formData.email, formData.password);
    } else {
        result = await register(formData.name, formData.email, formData.password);
    }

    setIsLoading(false);
    if (!result.success) {
        setError(result.error);
    }
  };

  // Очистка полей при смене режима для чистоты UX
  const switchMode = () => {
    setError('');
    setMode(isLogin ? 'register' : 'login');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
      
      {/* Container Карточки */}
      <div className="relative w-full max-w-[900px] h-[550px] bg-[#121214] rounded-3xl shadow-2xl overflow-hidden">
        
        {/* === КНОПКА ЗАКРЫТИЯ === */}
        {/* Цвет меняется в зависимости от фона под ней */}
        <button 
            onClick={closeAuthModal} 
            className={`
                absolute top-5 right-5 z-50 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500
                ${isLogin 
                    ? 'bg-black/10 text-gray-600 hover:bg-black/20' // На светлом градиенте (Login)
                    : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white' // На темном фоне (Register)
                }
            `}
        >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>

        {/* === ФОРМА 1: ЛОГИН (ЛЕВАЯ СТОРОНА) === */}
        <div className={`absolute top-0 left-0 w-1/2 h-full flex flex-col justify-center p-12 transition-opacity duration-700 ${isLogin ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Войти в аккаунт</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="bg-[#1A1A1D] border border-white/10 rounded-xl px-4 py-3 focus-within:border-[#9BA1EF] transition-colors">
                    <input 
                        type="email" placeholder="Email" required
                        className="w-full bg-transparent outline-none text-white placeholder-gray-500"
                        value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                </div>
                <div className="bg-[#1A1A1D] border border-white/10 rounded-xl px-4 py-3 focus-within:border-[#9BA1EF] transition-colors">
                    <input 
                        type="password" placeholder="Пароль" required
                        className="w-full bg-transparent outline-none text-white placeholder-gray-500"
                        value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
                    />
                </div>
                {error && isLogin && <p className="text-red-400 text-sm text-center animate-fadeIn">{error}</p>}
                <button type="submit" disabled={isLoading} className="mt-4 w-full py-4 rounded-full bg-[#9BA1EF] hover:bg-[#858bd6] text-[#121214] font-semibold text-lg transition-all active:scale-95 disabled:opacity-50">
                    {isLoading ? 'Загрузка...' : 'Войти'}
                </button>
            </form>
        </div>

        {/* === ФОРМА 2: РЕГИСТРАЦИЯ (ПРАВАЯ СТОРОНА) === */}
        <div className={`absolute top-0 right-0 w-1/2 h-full flex flex-col justify-center p-12 transition-opacity duration-700 ${!isLogin ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Создать аккаунт</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="bg-[#1A1A1D] border border-white/10 rounded-xl px-4 py-3 focus-within:border-[#9BA1EF] transition-colors">
                    <input 
                        type="text" placeholder="Имя" required
                        className="w-full bg-transparent outline-none text-white placeholder-gray-500"
                        value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                </div>
                <div className="bg-[#1A1A1D] border border-white/10 rounded-xl px-4 py-3 focus-within:border-[#9BA1EF] transition-colors">
                    <input 
                        type="email" placeholder="Email" required
                        className="w-full bg-transparent outline-none text-white placeholder-gray-500"
                        value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                </div>
                <div className="bg-[#1A1A1D] border border-white/10 rounded-xl px-4 py-3 focus-within:border-[#9BA1EF] transition-colors">
                    <input 
                        type="password" placeholder="Пароль" required
                        className="w-full bg-transparent outline-none text-white placeholder-gray-500"
                        value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})}
                    />
                </div>
                {error && !isLogin && <p className="text-red-400 text-sm text-center animate-fadeIn">{error}</p>}
                <button type="submit" disabled={isLoading} className="mt-4 w-full py-4 rounded-full bg-[#9BA1EF] hover:bg-[#858bd6] text-[#121214] font-semibold text-lg transition-all active:scale-95 disabled:opacity-50">
                    {isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
                </button>
            </form>
        </div>

        {/* === СКОЛЬЗЯЩАЯ ПАНЕЛЬ (OVERLAY) === */}
        <div 
            className={`
                absolute top-0 w-1/2 h-full z-40 transition-transform duration-700 ease-in-out
                ${isLogin ? 'translate-x-full' : 'translate-x-0'}
            `}
        >
            {/* Фон градиента */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#9BA1EF] via-[#C4B5FD] to-[#E0E7FF]" />

            {/* Контент внутри панели */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center p-12">
                
                {/* Текст для режима Входа (показывается, когда панель справа) */}
                <div className={`absolute transition-all duration-700 transform px-8 ${isLogin ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                    <h2 className="text-3xl font-bold text-[#121214] mb-4">
                        Получите больше возможностей с подпиской
                    </h2>
                    <p className="text-[#2e2e30] font-medium mb-8 leading-relaxed">
                        Чтобы не вводить API-ключ каждый раз и постить контент автоматически, создайте личный профиль.
                    </p>
                    <button 
                        onClick={switchMode}
                        className="px-10 py-3 rounded-full bg-[#121214] hover:bg-[#2C2C30] text-white font-medium transition-all shadow-xl hover:scale-105"
                    >
                        Создать аккаунт
                    </button>
                </div>

                {/* Текст для режима Регистрации (показывается, когда панель слева) */}
                <div className={`absolute transition-all duration-700 transform px-8 ${!isLogin ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                    <h2 className="text-3xl font-bold text-[#121214] mb-4">
                        Давайте запомним вас
                    </h2>
                    <p className="text-[#2e2e30] font-medium mb-8 leading-relaxed">
                        Создайте профиль, чтобы хранить ключи безопасно и использовать автопубликацию.
                    </p>
                    <button 
                        onClick={switchMode}
                        className="px-10 py-3 rounded-full bg-[#121214] hover:bg-[#2C2C30] text-white font-medium transition-all shadow-xl hover:scale-105"
                    >
                        Войти
                    </button>
                </div>

            </div>
        </div>

      </div>
    </div>
  );
};
