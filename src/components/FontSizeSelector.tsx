"use client";
import { useState, useEffect } from "react";
import { Text } from "lucide-react";

export function FontSizeSelector() {
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    document.body.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  const increaseFontSize = () => {
    setFontSize((prevSize) => prevSize + 2);
  };

  const decreaseFontSize = () => {
    setFontSize((prevSize) => prevSize - 2);
  };

  return (
    <div className="flex items-center">
      <button onClick={decreaseFontSize} className="px-3 py-2">
        <Text size={16} />
      </button>
      <button onClick={increaseFontSize} className="px-3 py-2">
        <Text size={24} />
      </button>
    </div>
  );
}
