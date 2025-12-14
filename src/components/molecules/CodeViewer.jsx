import React, { useState } from "react";

export const CodeViewer = ({ isLoading, data }) => {
  const [copied, setCopied] = useState(false);

  // Формируем красивую HTML строку из данных ответа
  const codeString = data
    ? `<!DOCTYPE html>
<html lang="en">
<head>
  ${data.head.replace(/\n/g, "\n  ")}
</head>
<body>
  ${data.body.replace(/\n/g, "\n  ")}
</body>
</html>`
    : "";

  const handleCopy = () => {
    if (!codeString) return;
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full mt-4 rounded-xl overflow-hidden border border-white/10 bg-[#1A1A1D] shadow-2xl relative group">
      {/* Шапка окна кода */}
      <div className="h-10 bg-[#2C2C30] flex items-center justify-between px-4 border-b border-white/5">
        <span className="text-xs text-gray-400 font-mono">html</span>

        {/* Кнопка копирования */}
        {data && !isLoading && (
          <button
            onClick={handleCopy}
            className="text-gray-400 hover:text-white transition-colors text-xs flex items-center gap-2"
          >
            {copied ? (
              <span className="text-green-400">Скопировано!</span>
            ) : (
              <>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </>
            )}
          </button>
        )}
      </div>

      {/* Тело окна кода */}
      <div className="p-6 min-h-[300px] font-mono text-sm overflow-x-auto">
        {/* Состояние 1: Загрузка */}
        {isLoading && (
          <div className="h-full flex flex-col items-center justify-center pt-20">
            <div className="text-[#9BA1EF] text-xl animate-pulse font-bold tracking-widest">
              &lt; КОДИМ... /&gt;
            </div>
            <p className="text-gray-500 mt-2 text-xs">
              Нейросеть пишет оптимизированный код
            </p>
          </div>
        )}

        {/* Состояние 2: Результат */}
        {!isLoading && data && (
          <pre className="text-[#F5A524] leading-relaxed">
            <code>{codeString}</code>
          </pre>
        )}

        {/* Состояние 3: Ожидание (Пусто) */}
        {!isLoading && !data && (
          <div className="h-full flex items-center justify-center pt-20 text-gray-600">
            Нажмите кнопку выше, чтобы сгенерировать код
          </div>
        )}
      </div>
    </div>
  );
};
