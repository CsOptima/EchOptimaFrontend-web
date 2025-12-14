import React from 'react';
import VkSvg from '../../assets/vk.svg';
import TgSvg from '../../assets/tg.svg';

export const Footer = () => {
  return (
    <footer className="w-full max-w-5xl mx-auto mt-40 mb-20 px-4">
      
      {/* ЗАГОЛОВКИ */}
      <div className="flex flex-col leading-none mb-16 select-none">
        {/* "КОНТАКТЫ" - Светло-фиолетовый оттенок */}
        <h2 className="text-5xl md:text-7xl lg:text-[80px] font-light text-[#B8BFF5] tracking-wide uppercase opacity-90">
          Контакты
        </h2>
        
        {/* "СОТРУДНИЧЕСТВО" - Градиентный текст */}
        <h2 className="text-5xl md:text-7xl lg:text-[80px] font-light tracking-wide uppercase relative">
          {/* Градиентный текст */}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9BA1EF] via-[#FADAE0] to-[#B8BFF5] relative z-10">
            Сотрудничество
          </span>
          
          {/* Легкое свечение позади текста */}
          <span className="absolute left-0 top-0 blur-2xl bg-gradient-to-r from-[#9BA1EF] to-[#B8BFF5] opacity-20 bg-clip-text text-transparent -z-10">
             Сотрудничество
          </span>
        </h2>
      </div>

      {/* НИЖНИЙ БЛОК: КОНТАКТЫ И ИКОНКИ */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        
        {/* Почта и Телефон */}
        <div className="flex flex-col gap-3 text-lg md:text-2xl text-gray-300 font-light tracking-wide">
          <a 
            href="mailto:contact@geoptima.com" 
            className="hover:text-white hover:translate-x-1 transition-all duration-300"
          >
            contact@echoptima.ru
          </a>
          <a 
            href="tel:+79092138635" 
            className="hover:text-white hover:translate-x-1 transition-all duration-300"
          >
            +7903 655 74 43
          </a>
        </div>

        {/* Социальные иконки */}
        <div className="flex items-center gap-4">
          
          {/* Telegram (Круглый) */}
          <a 
            href="#" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 rounded-full bg-[#2C2C30] hover:bg-[#3E3E42] hover:scale-110 active:scale-95 flex items-center justify-center transition-all duration-300 group"
          >
            <img src={TgSvg} alt="Tg" />
          </a>

          {/* VK (Квадрат с закруглением - Squircle) */}
          <a 
            href="#" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 rounded-2xl bg-[#2C2C30] hover:bg-[#3E3E42] hover:scale-110 active:scale-95 flex items-center justify-center transition-all duration-300 group"
          >
            <img src={VkSvg} alt="Vk" />
          </a>
        </div>
      </div>

    </footer>
  );
};