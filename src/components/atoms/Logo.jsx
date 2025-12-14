import React from "react";
import LogoSvg from "../../assets/logo.svg";

export const Logo = () => {
  return (
    <a href="/" className="group">
      <div className="flex items-center gap-3 select-none cursor-pointer">
        {/* Иконка полумесяца (Echoptima) */}
        <div className="relative w-10 h-10 flex items-center justify-center">
          <img src={LogoSvg} alt="Logo" />
        </div>

        {/* Текст Echoptima */}
        <span className="text-white text-xl md:text-2xl font-normal tracking-wide group-hover:text-[#B8BFF5] transition-colors">
          Echoptima
        </span>
      </div>
    </a>
  );
};