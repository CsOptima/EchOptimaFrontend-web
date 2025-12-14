import React from "react";

export const AdvancedFeaturesSection = () => {
  const pricingData = [
    { count: 10, price: "500 ₽" },
    { count: 25, price: "1300 ₽" },
    { count: 50, price: "2200 ₽" },
  ];

  return (
    <div id="features" className="w-full max-w-5xl mx-auto mt-32 mb-32 animate-[fadeIn_1s_ease-out]">
      {/* ШАПКА СЕКЦИИ */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
        <h2 className="text-4xl md:text-5xl font-medium text-[#B8BFF5] leading-tight max-w-md">
          Расширенные <br /> возможности
        </h2>
        <p className="text-gray-300 text-lg md:text-xl max-w-lg leading-relaxed">
          Перейдите на профессиональный уровень: тестируйте, оптимизируйте и
          внедряйте код без ограничений по количеству запросов.
        </p>
      </div>

      {/* БОЛЬШАЯ КАРТОЧКА */}
      <div className="w-full bg-[#1A1A1D] border border-white/10 rounded-[32px] p-4 md:p-6 flex flex-col md:flex-row gap-6 md:gap-12 shadow-2xl">
        {/* ЛЕВАЯ ЧАСТЬ: ТАБЛИЦА ЦЕН */}
        <div className="w-full md:w-[400px] bg-[#131315] rounded-2xl p-6 flex flex-col flex-shrink-0">
          {/* Заголовки таблицы */}
          <div className="flex justify-between items-center bg-[#222225] rounded-lg px-4 py-3 mb-6">
            <span className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">
              Кол-во запросов
            </span>
            <span className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">
              Стоимость
            </span>
          </div>

          {/* Строки таблицы */}
          <div className="flex flex-col gap-6 px-2 mb-2">
            {pricingData.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0 last:pb-0"
              >
                <span className="text-white text-lg font-light">
                  {item.count}
                </span>
                <span className="text-white text-lg font-light">
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ПРАВАЯ ЧАСТЬ: CTA (Call to Action) */}
        <div className="flex-1 flex flex-col items-center justify-center text-center py-8 md:py-0">
          <h3 className="text-xl md:text-2xl text-white font-light mb-8 max-w-md leading-snug">
            Покупайте запросы или закажите кастомизированное решение для вашего
            бизнеса
          </h3>

          <a href="tel:+79036557443">
            <button
              className="
            px-8 py-3 rounded-full 
            bg-[#3E3323] hover:bg-[#4b3e2b] 
            text-[#DCA54A] font-medium text-sm tracking-wide
            transition-all active:scale-95
          "
            >
              Связаться
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};
