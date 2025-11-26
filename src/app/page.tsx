// src/app/page.tsx
"use client";
import { Hero } from "@/components/Hero";
import { CallToAction } from "@/components/CallToAction";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <BackgroundBeams className="z-0" />
      <div className="relative z-10">
        <Hero />
        <CallToAction />
      </div>
    </div>
  );
}
