import React, { useState } from "react";
import { SearchInput } from "../molecules/SearchInput";
import { rewriteText } from "../../api/apiService"; // Импорт функции

export const HeroSection = ({ onDataReceived }) => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  const handleSubmit = async () => {
    if (!url.trim()) return;

    setIsLoading(true);
    try {
      // 1. Отправляем запрос на localhost:80/api/rewrite
      const data = await rewriteText(url, "VK");
      
      // 2. Получили данные -> Переключаем экран
      onDataReceived(data);
    } catch (error) {
      console.error("Ошибка при переписывании:", error);
      alert("Не удалось обработать запрос. Проверьте консоль.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden">
      {/* (Header теперь в HomePage) */}
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 w-full relative z-10 -mt-20">
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-center mb-10 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A5B4FC] via-[#E0E7FF] to-[#A5B4FC] animate-gradient-x">
            Продлите жизнь вашей новости
          </span>
        </h1>

        <div className="w-full flex flex-col items-center">
          <SearchInput
            value={url}
            onChange={setUrl}
            onSubmit={handleSubmit}
            placeholder="Введите URL на пост или новость"
          />
          
          {/* Индикатор загрузки (простой текст) */}
          {isLoading && (
             <p className="mt-4 text-[#9BA1EF] animate-pulse">Генерируем магию...</p>
          )}

          {/* ... Тут код с выпадающей подсказкой из предыдущего ответа ... */}
          <div className="mt-8 flex flex-col items-center w-full max-w-lg">
             <button 
              onClick={() => setIsDetailsVisible(!isDetailsVisible)}
              className="text-gray-400 text-base font-light hover:text-white transition-colors border-b border-transparent hover:border-gray-600 pb-0.5 outline-none"
            >
              Настройте автопубликацию в Телеграм и ВК
            </button>

            <div 
              className={`transition-all duration-700 ease-in-out overflow-hidden w-full ${isDetailsVisible ? 'max-h-[500px] opacity-100 mt-8' : 'max-h-0 opacity-0 mt-0'}`}
            >
              <div className="text-left text-gray-400 text-sm md:text-[15px] leading-relaxed pl-4 md:pl-0">
                <p className="font-medium text-gray-200 mb-3">Как это работает?</p>
                <ol className="list-decimal list-outside ml-5 space-y-2">
                  <li>Вставьте ссылку на публикацию или новость.</li>
                  <li>Выберите подходящий текст, который написал умный помощник.</li>
                  <li>Добавьте API-ключ на ваш сервис и опубликуйте новость за пару кликов.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-900/10 blur-[120px] rounded-full pointer-events-none -z-0" />
    </div>
  );
};