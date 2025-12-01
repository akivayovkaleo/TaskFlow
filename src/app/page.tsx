// src/app/page.tsx
"use client";
import { Hero } from "@/components/Hero";
import { CallToAction } from "@/components/CallToAction";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <CallToAction />
    </div>
  );
}

