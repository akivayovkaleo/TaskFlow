// src/components/Logo.tsx
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="text-2xl font-bold text-indigo-600">
      TaskFlow
    </Link>
  );
}
