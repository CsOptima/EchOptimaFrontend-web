import React, { useState, useEffect } from 'react';
import { SearchInput } from '../molecules/SearchInput';
import { rewriteText } from '../../api/apiService';
import { useAuth } from '../../context/AuthContext';
import { BACKEND_IP } from '../../constants';

// --- КОМПОНЕНТ: КАЛЕНДАРЬ ---
const CalendarWidget = () => {
  const { user, openAuthModal } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [time, setTime] = useState({ hours: '14', minutes: '25' });

  const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  
  const getDaysArray = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    let firstDayOfWeek = new Date(year, month, 1).getDay();
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDayOfWeek; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
    return days;
  };

  const handlePublish = () => {
    if (!user) {
        openAuthModal('register');
        return;
    }
    alert("Пост опубликован! (Мок)");
  };

  return (
    <div className="w-full h-full flex flex-col animate-[fadeIn_0.3s_ease-out]">
      <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-white">Автопубликация</h3>
      </div>
      
      {/* Календарь */}
      <div className="bg-[#131315] border border-white/5 rounded-2xl p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-4 text-sm text-gray-300">
          <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))} className="hover:text-white px-2">&lt;</button>
          <span className="font-medium">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
          <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))} className="hover:text-white px-2">&gt;</button>
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-2 text-center text-[10px] text-gray-500 font-medium">
          {['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].map(d => <div key={d}>{d}</div>)}
        </div>
        
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-light text-gray-400 mb-4">
          {getDaysArray().map((date, idx) => {
            if (!date) return <span key={`e-${idx}`} />;
            const isSel = date.getDate() === selectedDate.getDate() && date.getMonth() === selectedDate.getMonth();
            return (
              <button 
                key={idx} 
                onClick={() => setSelectedDate(date)}
                className={`w-7 h-7 flex items-center justify-center rounded-full mx-auto transition-all ${isSel ? 'bg-[#6366F1] text-white font-medium' : 'hover:bg-white/10'}`}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>

        {/* Время */}
        <div className="mt-auto">
            <div className="w-full bg-[#000000]/30 rounded-full p-2 flex justify-center gap-1 border border-white/5 font-mono text-white text-sm mb-4">
                <span>{time.hours}</span><span>:</span><span>{time.minutes}</span>
            </div>
            
            <div className="text-center mb-4">
                <p className="text-[10px] text-gray-500">Время публикации</p>
                <p className="text-xs text-gray-300">{selectedDate.getDate()} {months[selectedDate.getMonth()].toLowerCase()} в {time.hours}:{time.minutes}</p>
            </div>
        </div>
      </div>

      <button onClick={handlePublish} className="w-full mt-4 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-medium py-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-900/20">
             Опубликовать
      </button>
    </div>
  );
};

// --- КОМПОНЕНТ: САЙДБАР ---
const Sidebar = ({ variants, selectedIndex, onSelectVariant }) => (
    <div className="hidden lg:flex flex-col w-[260px] shrink-0 pt-10">
        <div className="mb-8 pr-4">
            <button className="w-full flex items-center gap-3 bg-[#2C2C30] hover:bg-[#3E3E42] text-white p-3 rounded-xl transition-colors text-sm font-medium border border-white/5 shadow-lg">
                <div className="w-5 h-5 rounded-full bg-[#9BA1EF] text-black flex items-center justify-center font-bold pb-0.5 leading-none">+</div>
                Новая публикация
            </button>
        </div>
        
        <div className="mb-8 pr-4">
            <h4 className="text-[#9BA1EF] font-medium mb-4 pl-1 text-sm">Запланированные</h4>
            <div className="flex flex-col gap-6 border-l-2 border-white/10 ml-2 pl-6 relative min-h-[100px]">
                
                {/* Рендерим варианты из ответа API */}
                {variants && variants.length > 0 ? (
                    variants.map((variant, idx) => {
                        const isSelected = selectedIndex === idx;
                        return (
                            <div 
                                key={idx} 
                                onClick={() => onSelectVariant(idx)}
                                className={`relative group cursor-pointer transition-opacity ${isSelected ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                            >
                                {/* Индикатор (Точка) */}
                                <div 
                                    className={`
                                        absolute -left-[31px] top-1 w-2 h-2 rounded-full transition-colors 
                                        ${isSelected 
                                            ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]' 
                                            : 'bg-gray-600 group-hover:bg-white'
                                        }
                                    `} 
                                />
                                <p className="text-[10px] text-gray-500 mb-1">
                                    Вариант {idx + 1}
                                </p>
                                <p className={`text-xs line-clamp-2 transition-colors ${isSelected ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                                    {variant.title || "Без заголовка"}
                                </p>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-xs text-gray-600 italic pl-1">Нет записей</div>
                )}
            </div>
        </div>
        
        <div className="pr-4">
            <h4 className="text-gray-500 font-medium mb-4 pl-1 text-sm">Архив</h4>
            <div className="flex flex-col gap-6 border-l-2 border-white/5 ml-2 pl-6">
                 <div className="relative group cursor-pointer opacity-50 hover:opacity-100">
                     <div className="absolute -left-[31px] top-1 w-2 h-2 rounded-full bg-gray-700"></div>
                    <p className="text-[10px] text-gray-500 mb-1">Вчера</p>
                    <p className="text-xs text-gray-300 line-clamp-1">Архивная запись...</p>
                </div>
            </div>
        </div>
    </div>
);

// --- КОМПОНЕНТ: ПУСТОЕ СОСТОЯНИЕ (ДЛЯ ГЕНЕРАЦИИ) ---
const EmptyState = ({ onGenerate, isLoading, social }) => (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-12 h-full min-h-[400px]">
        <div className="w-20 h-20 bg-[#2C2C30] rounded-full flex items-center justify-center mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9BA1EF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">
            Нет постов для {social === 'VK' ? 'ВКонтакте' : 'Telegram'}
        </h3>
        <p className="text-gray-400 mb-8 max-w-sm">
            Сгенерируйте новые варианты текста и изображений специально для этой платформы.
        </p>
        <button 
            onClick={onGenerate}
            disabled={isLoading}
            className="px-8 py-4 rounded-full bg-[#9BA1EF] hover:bg-[#858bd6] text-[#121214] font-semibold text-lg transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
        >
            {isLoading ? (
                <>
                    <span className="animate-spin w-5 h-5 border-2 border-[#121214] border-t-transparent rounded-full"/>
                    Генерируем...
                </>
            ) : (
                'Сгенерировать'
            )}
        </button>
    </div>
);

// --- ОСНОВНОЙ КОНТЕНТ ---
export const EditorSection = ({ data }) => {
  const { user } = useAuth();
  
  // URL источника (общий для всех вкладок)
  const [sourceUrl, setSourceUrl] = useState(data.source || '');
  
  // Активный таб
  const [activeTab, setActiveTab] = useState(data.social || 'VK');

  // Структура данных для каждого таба
  const initialSocialState = {
      isGenerated: false,
      variants: [],
      selectedVariantIndex: 0,
      text: "",
      images: [],
      photoUuid: null
  };

  // Хранилище состояния для VK и Telegram
  const [socialState, setSocialState] = useState({
      VK: { ...initialSocialState },
      Telegram: { ...initialSocialState }
  });

  // Вспомогательная функция для форматирования текста
  const formatText = (variant) => {
      if (!variant) return "";
      const tags = variant.hashtags ? variant.hashtags.join(' ') : "";
      return `${variant.title}\n\n${variant.body}\n\n${tags}`;
  };

  // --- ИНИЦИАЛИЗАЦИЯ ДАННЫХ ПРИ ПЕРВОМ ВХОДЕ (из props.data) ---
  useEffect(() => {
      if (data && data.social) {
          setSocialState(prev => ({
              ...prev,
              [data.social]: {
                  isGenerated: true,
                  variants: data.about || [],
                  selectedVariantIndex: 0,
                  text: data.about && data.about.length > 0 ? formatText(data.about[0]) : "",
                  images: data.source_images || [],
                  photoUuid: data.photo_uuid
              }
          }));
      }
  }, [data]); // Зависимость только от data, чтобы сбросилось при новом поиске

  // --- ЗАГРУЗКА БЕЗОПАСНЫХ КАРТИНОК ---
  // Срабатывает, когда меняется activeTab или обновляется photoUuid в стейте
  useEffect(() => {
      const currentData = socialState[activeTab];

      // Если нет данных или уже загрузили фото (проверка по длине, упрощенно)
      // Или если нет photoUuid, ничего не делаем
      if (!currentData.isGenerated || !currentData.photoUuid || !user) return;

      const loadSecureImage = async () => {
          // Проверяем, не загружена ли уже картинка (чтобы не дублировать запросы)
          // В реальном кейсе можно хранить флаг isImageLoaded
          if (currentData.images.length > (data.source_images?.length || 0)) return;

          try {
              const token = localStorage.getItem('access_token');
              const response = await fetch(`${BACKEND_IP}/api/news/photo/${currentData.photoUuid}`, {
                  method: 'GET',
                  headers: { 'token': token }
              });

              if (response.ok) {
                  const blob = await response.blob();
                  const objectUrl = URL.createObjectURL(blob);
                  
                  setSocialState(prev => ({
                      ...prev,
                      [activeTab]: {
                          ...prev[activeTab],
                          images: [...prev[activeTab].images, objectUrl]
                      }
                  }));
              }
          } catch (err) {
              console.error("Error loading secure photo:", err);
          }
      };

      loadSecureImage();
  }, [activeTab, socialState, user]); // Следим за socialState, но внутри есть проверки, чтобы не зациклить

  // --- HANDLERS ---

  const [isRewriting, setIsRewriting] = useState(false);
  const [fixRequest, setFixRequest] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); 

  // Вызывается при нажатии "Сгенерировать" (для пустой вкладки) или при обновлении
  const handleRewrite = async (targetSocial = activeTab) => {
    setIsRewriting(true);
    try {
      const newData = await rewriteText(sourceUrl, targetSocial);
      
      // Обновляем стейт нужной соцсети
      setSocialState(prev => ({
          ...prev,
          [targetSocial]: {
              isGenerated: true,
              variants: newData.about || [],
              selectedVariantIndex: 0,
              text: newData.about && newData.about.length > 0 ? formatText(newData.about[0]) : "",
              images: newData.source_images || [],
              photoUuid: newData.photo_uuid
          }
      }));

    } catch (e) {
      alert('Ошибка при генерации');
    } finally {
      setIsRewriting(false);
    }
  };

  // Выбор варианта в сайдбаре
  const handleVariantSelect = (index) => {
      const variants = socialState[activeTab].variants;
      setSocialState(prev => ({
          ...prev,
          [activeTab]: {
              ...prev[activeTab],
              selectedVariantIndex: index,
              text: formatText(variants[index])
          }
      }));
  };

  // Редактирование текста руками
  const handleTextChange = (newText) => {
      setSocialState(prev => ({
          ...prev,
          [activeTab]: {
              ...prev[activeTab],
              text: newText
          }
      }));
  };

  // Свап картинок
  const handleImageSelect = (index) => {
    if (index === 0) return;
    const currentImages = [...socialState[activeTab].images];
    [currentImages[0], currentImages[index]] = [currentImages[index], currentImages[0]];
    
    setSocialState(prev => ({
        ...prev,
        [activeTab]: {
            ...prev[activeTab],
            images: currentImages
        }
    }));
  };

  // Текущие данные для рендера
  const currentSocialData = socialState[activeTab];

  return (
    <div className="w-full min-h-screen bg-[#101012] pt-24 pb-10 px-6 flex flex-col items-center animate-[fadeIn_0.5s_ease-out]">
      
      {/* 1. Верхний поиск */}
      <div className="w-full max-w-4xl mb-8">
        <SearchInput 
           value={sourceUrl}
           onChange={setSourceUrl}
           onSubmit={() => handleRewrite(activeTab)}
           placeholder="https://vk.com/wall-..."
        />
      </div>

      {/* 2. ЛЕЙАУТ: Сайдбар + Мейн */}
      <div className="w-full max-w-[1500px] flex gap-8 items-start justify-center">
        
        {/* САЙДБАР: Показываем варианты только если данные сгенерированы */}
        <Sidebar 
            variants={currentSocialData.isGenerated ? currentSocialData.variants : []} 
            selectedIndex={currentSocialData.selectedVariantIndex} 
            onSelectVariant={handleVariantSelect}
        />

        {/* ЦЕНТР: Редактор + Табы */}
        <div className="flex-1 min-w-0 flex flex-col">
            
            {/* --- ТАБЫ --- */}
            <div className="flex items-end pl-4 relative z-10 translate-y-[2px]">
                <button 
                    onClick={() => setActiveTab('VK')}
                    className={`
                        group flex items-center gap-2 px-8 py-4 rounded-t-2xl transition-all duration-200
                        ${activeTab === 'VK' 
                            ? 'bg-[#1A1A1D] text-white shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.5)] z-20' 
                            : 'bg-transparent text-gray-500 hover:text-gray-300 hover:bg-[#1A1A1D]/30 z-10'
                        }
                    `}
                >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${activeTab === 'VK' ? 'bg-[#0077FF]' : 'bg-gray-600 group-hover:bg-gray-500'}`}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M13.66 17.65c.67.65 1.54 1.35 2.5 1.35h2.5c1.45 0 2.22-.72 1.87-2.38-.4-1.92-2.73-3.66-2.78-4.1-.17-1.4 1.33-2.33 2.1-3.66.57-.96.53-1.63 0-1.63h-2.5c-1.35 0-2 .68-2.6 1.48-.56.88-1.5 2.1-2.07 2.1-.2 0-.46-.66-.46-2.08V8.12c0-1.78-.32-2.45-1.9-2.55C9.4 5.5 8.9 5.5 8.35 5.5c-2.32.12-3.23 1.1-2.8 3.5 1.56 6.8 6.07 10 9.8 10h.6v-2.15c0-.66.57-.75.68-.75" /></svg>
                    </div>
                    <span className="font-bold text-lg">VK</span>
                </button>

                <button 
                    onClick={() => setActiveTab('Telegram')}
                    className={`
                         flex items-center gap-2 px-8 py-4 rounded-t-2xl transition-all duration-200 ml-[-12px]
                        ${activeTab === 'Telegram' 
                            ? 'bg-[#1A1A1D] text-white shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.5)] z-20' 
                            : 'bg-transparent text-gray-500 hover:text-gray-300 hover:bg-[#1A1A1D]/30 z-0'
                        }
                    `}
                >
                    <span className="font-bold text-lg">Телеграм</span>
                </button>
            </div>

            {/* --- ГЛАВНАЯ КАРТОЧКА --- */}
            <div className="bg-[#1A1A1D] rounded-3xl p-8 min-h-[640px] flex flex-col relative shadow-2xl z-0 transition-all duration-500">
                
                {/* 
                    УСЛОВНЫЙ РЕНДЕР: 
                    Если данные сгенерированы -> Показываем редактор.
                    Если нет -> Показываем кнопку "Сгенерировать".
                */}
                
                {!currentSocialData.isGenerated ? (
                    <EmptyState 
                        social={activeTab} 
                        onGenerate={() => handleRewrite(activeTab)} 
                        isLoading={isRewriting}
                    />
                ) : (
                    <>
                        {/* Хедер карточки */}
                        <div className="mb-6 flex justify-between items-start">
                            <span className="bg-[#2e2e34] text-[#9BA1EF] text-xs px-3 py-1.5 rounded-lg font-medium">
                                {new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                            </span>
                            
                            {/* КНОПКА ОТКРЫТИЯ КАЛЕНДАРЯ */}
                            {!isCalendarOpen && (
                                <button 
                                    onClick={() => setIsCalendarOpen(true)}
                                    className="text-gray-500 hover:text-white transition-colors cursor-pointer"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
                                </button>
                            )}
                        </div>

                        {/* ОСНОВНОЙ КОНТЕНТ (FLEX) */}
                        <div className="flex-1 flex gap-8">
                            
                            {/* 1. ТЕКСТ (Слева) */}
                            <div className="flex-1 min-w-0 flex flex-col">
                                <textarea 
                                    className="w-full h-full bg-transparent border-none outline-none resize-none text-gray-300 text-[15px] leading-relaxed font-light custom-scrollbar placeholder-gray-600 border-r border-white/5 pr-4"
                                    value={currentSocialData.text}
                                    onChange={(e) => handleTextChange(e.target.value)}
                                    placeholder="Генерация текста..."
                                />
                            </div>

                            {/* 2. МЕДИА (Справа) */}
                            {currentSocialData.images.length > 0 && (
                                <div 
                                    className={`
                                        transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col shrink-0 relative
                                        ${isCalendarOpen ? 'w-[120px]' : 'w-[500px]'}
                                    `}
                                >
                                    {/* КНОПКА ЗАКРЫТИЯ КАЛЕНДАРЯ */}
                                    {isCalendarOpen && (
                                        <div className="w-full flex justify-end mb-2 animate-[fadeIn_0.3s_ease-out]">
                                            <button 
                                                onClick={() => setIsCalendarOpen(false)}
                                                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-colors"
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
                                            </button>
                                        </div>
                                    )}

                                    {/* БОЛЬШОЕ ИЗОБРАЖЕНИЕ */}
                                    <div 
                                        className={`
                                            relative w-full rounded-2xl overflow-hidden bg-black/20 shrink-0 group
                                            transition-all duration-500 ease-in-out
                                            ${isCalendarOpen ? 'h-0 opacity-0 mb-0' : 'aspect-video opacity-100 mb-4'}
                                        `}
                                    >
                                        <img src={currentSocialData.images[0]} alt="Main" className="absolute inset-0 w-full h-full object-cover"/>
                                        
                                        {/* Кнопка ОТКРЫТИЯ календаря */}
                                        <button 
                                            onClick={() => setIsCalendarOpen(true)}
                                            className="absolute top-3 right-3 w-8 h-8 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 z-10 cursor-pointer"
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                        </button>
                                    </div>

                                    {/* СПИСОК МИНИАТЮР */}
                                    <div className={`flex gap-3 transition-all duration-500 ${isCalendarOpen ? 'flex-col items-center' : 'flex-row'}`}>
                                        {currentSocialData.images.map((img, idx) => (
                                            <div 
                                                key={idx} 
                                                onClick={() => handleImageSelect(idx)}
                                                className={`
                                                    relative rounded-xl overflow-hidden shrink-0 cursor-pointer group w-24 h-16
                                                    ${idx === 0 ? 'border-2 border-[#bef264]' : 'border border-white/10 hover:border-white/30'}
                                                `}
                                            >
                                                <img src={img} alt="thumb" className="absolute inset-0 w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* 3. КАЛЕНДАРЬ */}
                            <div 
                                className={`
                                    transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden bg-transparent
                                    ${isCalendarOpen ? 'w-[320px] opacity-100 translate-x-0 ml-2' : 'w-0 opacity-0 translate-x-10 ml-0'}
                                `}
                            >
                                <div className="w-[320px] h-full">
                                    <CalendarWidget />
                                </div>
                            </div>

                        </div>

                        {/* НИЖНЯЯ ПАНЕЛЬ */}
                        <div className="mt-8 flex gap-3 items-center relative z-20">
                            <div className="flex-1 bg-[#222225] rounded-2xl px-5 py-4 border border-white/5 focus-within:border-white/20 transition-colors shadow-inner">
                                <input 
                                    type="text" 
                                    value={fixRequest}
                                    onChange={(e) => setFixRequest(e.target.value)}
                                    placeholder="Хотите что-то поправить?"
                                    className="w-full bg-transparent outline-none text-gray-300 placeholder-gray-500 text-sm"
                                />
                            </div>
                            <button className="w-14 h-14 rounded-full bg-[#9BA1EF] hover:bg-[#858bd6] flex items-center justify-center text-[#1A1A1D] transition-all active:scale-95 shadow-[0_0_15px_rgba(155,161,239,0.3)]">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                            </button>
                            <button 
                                className="w-14 h-14 rounded-full bg-[#2C2C30] hover:bg-[#3E3E42] flex items-center justify-center text-gray-400 hover:text-white transition-all active:scale-95 border border-white/10"
                                onClick={() => handleRewrite(activeTab)}
                                disabled={isRewriting}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isRewriting ? "animate-spin" : ""}><path d="M23 4v6h-6"></path><path d="M1 20v-6h6"></path><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                            </button>
                        </div>
                    </>
                )}

            </div>
        </div>

      </div>
    </div>
  );
};