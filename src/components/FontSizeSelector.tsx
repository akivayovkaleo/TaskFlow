"use client";
import { useState, useEffect } from "react";
import { Type, Plus, Minus } from "lucide-react";

export function FontSizeSelector() {
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    const savedSize = localStorage.getItem("fontSize");
    if (savedSize) {
      const size = parseInt(savedSize);
      setFontSize(size);
      document.documentElement.style.fontSize = `${size}px`;
    }
  }, []);

  const increaseFontSize = () => {
    if (fontSize < 24) {
      const newSize = fontSize + 2;
      setFontSize(newSize);
      document.documentElement.style.fontSize = `${newSize}px`;
      localStorage.setItem("fontSize", newSize.toString());
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > 14) {
      const newSize = fontSize - 2;
      setFontSize(newSize);
      document.documentElement.style.fontSize = `${newSize}px`;
      localStorage.setItem("fontSize", newSize.toString());
    }
  };

  const resetFontSize = () => {
    const defaultSize = 16;
    setFontSize(defaultSize);
    document.documentElement.style.fontSize = `${defaultSize}px`;
    localStorage.setItem("fontSize", defaultSize.toString());
  };

  return (
    <div
      className="flex items-center gap-1 p-2 bg-navy-light rounded-lg"
      role="group"
      aria-label="Controles de tamanho de fonte"
    >
      <button
        onClick={decreaseFontSize}
        disabled={fontSize <= 14}
        className="p-1 hover:bg-navy rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Diminuir tamanho da fonte"
        title="Diminuir fonte"
      >
        <Minus size={16} className="text-baby-blue" />
      </button>

      <button
        onClick={resetFontSize}
        className="p-1 hover:bg-navy rounded transition-colors flex items-center gap-1"
        aria-label="Resetar tamanho da fonte"
        title="Resetar para padrão"
      >
        <Type size={16} className="text-baby-blue" />
        <span className="text-xs text-baby-blue">{fontSize}px</span>
      </button>

      <button
        onClick={increaseFontSize}
        disabled={fontSize >= 24}
        className="p-1 hover:bg-navy rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Aumentar tamanho da fonte"
        title="Aumentar fonte"
      >
        <Plus size={16} className="text-baby-blue" />
      </button>
    </div>
  );
}

