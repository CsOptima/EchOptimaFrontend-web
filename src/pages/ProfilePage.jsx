import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Данные для модальных окон инструкций
const INSTRUCTIONS_DATA = {
  api: {
    title: 'Где найти API-ключ?',
    steps: [
      'Перейдите в настройки сообщества... (инструкция)',
      'Второй пункт',
      'Третий пункт'
    ]
  },
  id: {
    title: 'Где найти ID-канала?',
    steps: [
      'Перейдите в настройки канала/сообщества... (инструкция)',
      'Найдите секцию ID',
      'Скопируйте значение'
    ]
  }
};

export const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Навигация: 'overview' | 'integrations' | 'vk' | 'telegram' | 'settings'
  const [activeSection, setActiveSection] = useState('overview'); 
  
  // Модальное окно инструкций: null | 'api' | 'id'
  const [instructionModal, setInstructionModal] = useState(null);

  const closeInstruction = () => setInstructionModal(null);

  // Обработчик выхода
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Вспомогательная функция для рендера модалки
  const renderInstructionModal = () => {
    const activeInstructionData = instructionModal ? INSTRUCTIONS_DATA[instructionModal] : null;
    if (!activeInstructionData) return null;

    return (
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]"
        onClick={closeInstruction}
      >
        <div 
          className="relative w-full max-w-xl bg-[#18181B] rounded-2xl p-8 shadow-2xl border border-white/5"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={closeInstruction}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          <h3 className="text-2xl font-bold text-white mb-6 pr-8">
            {activeInstructionData.title}
          </h3>

          <ol className="list-decimal list-outside ml-5 space-y-3 text-gray-300 text-lg">
            {activeInstructionData.steps.map((step, idx) => (
              <li key={idx} className="pl-2">{step}</li>
            ))}
          </ol>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      // === ЭКРАН: VK ===
      case 'vk':
        return (
          <div className="animate-[fadeIn_0.3s_ease-out] relative">
            {/* Хлебные крошки */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-light">
              <Link to="/" className="hover:text-gray-300 transition-colors">Главная</Link>
              <span>·</span>
              <button onClick={() => setActiveSection('overview')} className="hover:text-gray-300 transition-colors">Личный кабинет</button>
              <span>·</span>
              <button onClick={() => setActiveSection('integrations')} className="hover:text-gray-300 transition-colors">Мои интеграции</button>
              <span>·</span>
              <span className="text-gray-200">VK</span>
            </div>

            <h1 className="text-4xl font-bold text-white mb-10">Подключить VK</h1>

            <div className="w-full max-w-3xl bg-transparent border border-white/10 rounded-2xl p-8 mb-12">
              <h2 className="text-xl font-bold text-white mb-6">Добавить сообщество</h2>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-400 ml-1">API-ключ</label>
                  <div className="relative group">
                    <input 
                      type="text" 
                      placeholder="Введите ключ"
                      defaultValue="MY-KEY_3g74******************************************"
                      className="w-full bg-[#131315] border border-white/10 rounded-xl px-4 py-3 text-gray-300 outline-none focus:border-[#9BA1EF] transition-colors pr-10"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-gray-400 ml-1">ID-канала</label>
                  <input 
                    type="text" 
                    placeholder="Добавить ID-канала"
                    className="w-full bg-[#131315] border border-white/10 rounded-xl px-4 py-3 text-gray-300 placeholder-gray-500 outline-none focus:border-[#9BA1EF] transition-colors"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-6">Инструкции</h3>
              <div className="flex gap-6 overflow-x-auto pb-4">
                <div onClick={() => setInstructionModal('api')} className="w-64 h-40 rounded-xl bg-gradient-to-br from-[#9BA1EF] to-[#C4B5FD] p-5 flex items-end cursor-pointer hover:scale-[1.02] transition-transform shadow-lg shrink-0">
                  <span className="text-[#101012] font-semibold text-sm leading-tight">Где найти API-ключ?</span>
                </div>
                <div onClick={() => setInstructionModal('id')} className="w-64 h-40 rounded-xl bg-gradient-to-br from-[#D4B499] to-[#E0D4C5] p-5 flex items-end cursor-pointer hover:scale-[1.02] transition-transform shadow-lg shrink-0">
                  <span className="text-[#101012] font-semibold text-sm leading-tight">Где найти ID-канала?</span>
                </div>
              </div>
            </div>

            {renderInstructionModal()}
          </div>
        );

      // === ЭКРАН: TELEGRAM ===
      case 'telegram':
        return (
          <div className="animate-[fadeIn_0.3s_ease-out] relative">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-light">
              <Link to="/" className="hover:text-gray-300 transition-colors">Главная</Link>
              <span>·</span>
              <button onClick={() => setActiveSection('overview')} className="hover:text-gray-300 transition-colors">Личный кабинет</button>
              <span>·</span>
              <button onClick={() => setActiveSection('integrations')} className="hover:text-gray-300 transition-colors">Мои интеграции</button>
              <span>·</span>
              <span className="text-gray-200">Телеграм</span>
            </div>

            <h1 className="text-4xl font-bold text-white mb-10">Подключить Телеграм</h1>

            <div className="w-full max-w-3xl bg-transparent border border-white/10 rounded-2xl p-8 mb-12">
              <h2 className="text-xl font-bold text-white mb-6">Добавить канал</h2>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-sm text-gray-400">ID-канала</label>
                    <button className="text-gray-500 hover:text-white transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                    </button>
                  </div>
                  
                  <div className="relative group">
                    <input 
                      type="text" 
                      placeholder="MY-ID_34342**********************"
                      className="w-full bg-[#131315] border border-white/10 rounded-xl px-4 py-3 text-gray-300 outline-none focus:border-[#9BA1EF] transition-colors pr-10"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-6">Инструкции</h3>
              <div className="flex gap-6 overflow-x-auto pb-4">
                <div 
                    onClick={() => setInstructionModal('id')} 
                    className="w-64 h-40 rounded-xl bg-gradient-to-br from-[#C4B5FD] to-[#E0E7FF] p-5 flex items-end cursor-pointer hover:scale-[1.02] transition-transform shadow-lg shrink-0"
                >
                  <span className="text-[#101012] font-semibold text-sm leading-tight">Где найти ID-канала?</span>
                </div>
              </div>
            </div>

            {renderInstructionModal()}
          </div>
        );

      // === ЭКРАН: СПИСОК ИНТЕГРАЦИЙ ===
      case 'integrations':
        return (
          <div className="animate-[fadeIn_0.3s_ease-out]">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-light">
              <Link to="/" className="hover:text-gray-300 transition-colors">Главная</Link>
              <span>·</span>
              <button onClick={() => setActiveSection('overview')} className="hover:text-gray-300 transition-colors">Личный кабинет</button>
              <span>·</span>
              <span className="text-gray-200">Мои интеграции</span>
            </div>

            <h1 className="text-4xl font-bold text-white mb-10">Мои интеграции</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
              <div onClick={() => setActiveSection('vk')} className="group relative h-48 rounded-xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#6b7cff] to-[#99a5ff]" />
                <div className="relative h-full flex items-end p-6"><span className="text-white text-2xl font-bold">VK</span></div>
              </div>

              <div onClick={() => setActiveSection('telegram')} className="group relative h-48 rounded-xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#7fbbf5] to-[#a6d1f8]" />
                <div className="relative h-full flex items-end p-6"><span className="text-white text-2xl font-bold">Телеграм</span></div>
              </div>
            </div>
          </div>
        );

      // === ЭКРАН: НАСТРОЙКИ (НОВЫЙ) ===
      case 'settings':
        return (
            <div className="animate-[fadeIn_0.3s_ease-out]">
                {/* Хлебные крошки */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-light">
                    <Link to="/" className="hover:text-gray-300 transition-colors">Главная</Link>
                    <span>·</span>
                    <button onClick={() => setActiveSection('overview')} className="hover:text-gray-300 transition-colors">Личный кабинет</button>
                    <span>·</span>
                    <span className="text-gray-200">Настройки</span>
                </div>

                <h1 className="text-4xl font-bold text-white mb-10">Настройки</h1>

                <div className="w-full max-w-4xl">
                    <h2 className="text-xl font-bold text-white mb-8">Мой аккаунт</h2>

                    {/* Блок информации */}
                    <div className="flex items-center gap-8 mb-12">
                        {/* Аватар */}
                        <div className="w-24 h-24 rounded-full bg-gradient-to-b from-[#C4B5FD] to-[#E0E7FF] shrink-0" />
                        
                        {/* Текст */}
                        <div className="flex flex-col gap-2">
                             <div className="text-gray-400 font-light flex gap-2">
                                Имя: <span className="text-white font-medium">{user?.name || 'Philipp'}</span>
                             </div>
                             <div className="text-gray-400 font-light flex gap-2">
                                Почта: <span className="text-white font-medium">{user?.email || 'shtokolov28@gmail.com'}</span>
                             </div>
                        </div>
                    </div>

                    {/* Кнопки действий */}
                    <div className="flex flex-wrap gap-4">
                        <button 
                            onClick={handleLogout}
                            className="px-8 py-3 rounded-full bg-[#27272A] hover:bg-[#3F3F46] text-white text-sm font-medium transition-colors"
                        >
                            Выйти из аккаунта
                        </button>

                        <button 
                            className="px-8 py-3 rounded-full bg-[#381E25] hover:bg-[#4A2630] text-[#F31260] text-sm font-medium transition-colors"
                        >
                            Удалить профиль
                        </button>
                    </div>
                </div>
            </div>
        );

      // === ЭКРАН: ЛИЧНЫЙ КАБИНЕТ (DEFAULT) ===
      default:
        return (
          <div className="animate-[fadeIn_0.3s_ease-out]">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 font-light">
              <Link to="/" className="hover:text-gray-300">Главная</Link>
              <span>·</span>
              <span className="text-gray-300">Личный кабинет</span>
            </div>

            <h1 className="text-3xl font-bold text-white mb-8">Личный кабинет</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div onClick={() => setActiveSection('integrations')} className="h-48 rounded-xl p-6 flex items-end shadow-lg transition-transform hover:scale-[1.02] cursor-pointer bg-gradient-to-br from-[#DCE4FF] to-[#E5D4FF]">
                 <span className="text-[#101012] font-semibold text-lg">Мои интеграции</span>
              </div>
              <div className="h-48 rounded-xl p-6 flex items-end shadow-lg transition-transform hover:scale-[1.02] cursor-pointer bg-gradient-to-br from-[#A58D76] via-[#7B7095] to-[#5C5C8A]">
                 <span className="text-[#101012] font-semibold text-lg">Тарифы и оплата</span>
              </div>
              <div onClick={() => setActiveSection('settings')} className="h-48 rounded-xl p-6 flex items-end shadow-lg transition-transform hover:scale-[1.02] cursor-pointer bg-gradient-to-br from-[#7E84CA] to-[#545885]">
                 <span className="text-[#101012] font-semibold text-lg">Настройки</span>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#101012] pt-28 pb-10 px-6">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-[260px_1fr] gap-12">
        
        {/* === ЛЕВОЕ МЕНЮ === */}
        <aside className="hidden md:flex flex-col text-sm">
          <button 
            onClick={() => setActiveSection('overview')}
            className={`text-left font-medium text-base mb-6 px-4 transition-colors ${activeSection === 'overview' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Личный кабинет
          </button>

          <nav className="flex flex-col gap-1">
            <div className="flex flex-col">
              <button 
                onClick={() => setActiveSection('integrations')}
                className={`text-left px-4 py-2 transition-colors ${['integrations', 'vk', 'telegram'].includes(activeSection) ? 'text-[#9BA1EF]' : 'text-gray-400 hover:text-white'}`}
              >
                Мои интеграции
              </button>
              
              {['integrations', 'vk', 'telegram'].includes(activeSection) && (
                <div className="flex flex-col pl-8 gap-2 mt-1 mb-2 animate-[fadeIn_0.2s_ease-out]">
                  <button 
                    onClick={() => setActiveSection('vk')}
                    className={`text-left transition-colors py-1 ${activeSection === 'vk' ? 'text-white font-medium' : 'text-gray-500 hover:text-white'}`}
                  >
                    VK
                  </button>
                  <button 
                    onClick={() => setActiveSection('telegram')}
                    className={`text-left transition-colors py-1 ${activeSection === 'telegram' ? 'text-white font-medium' : 'text-gray-500 hover:text-white'}`}
                  >
                    Телеграм
                  </button>
                </div>
              )}
            </div>

            <button onClick={() => setActiveSection('overview')} className="text-left px-4 py-2 text-gray-400 hover:text-white transition-colors">
              Тарифы и оплата
            </button>
            <button 
                onClick={() => setActiveSection('settings')}
                className={`text-left px-4 py-2 transition-colors ${activeSection === 'settings' ? 'text-[#9BA1EF]' : 'text-gray-400 hover:text-white'}`}
            >
              Настройки
            </button>
          </nav>
        </aside>

        {/* === ОСНОВНОЙ КОНТЕНТ === */}
        <main>
          {renderContent()}
        </main>

      </div>
    </div>
  );
};