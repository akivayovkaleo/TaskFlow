// src/components/Logo.tsx
import { CheckSquare2 } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="bg-baby-blue rounded-lg p-2">
        <CheckSquare2 size={24} className="text-navy" />
      </div>
    </div>
  );
}

