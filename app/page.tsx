"use client";

import { useState } from "react";
import { PeriodicTable } from "@/components/periodic-table/PeriodicTable";
import { ElementFilters } from "@/components/periodic-table/ElementFilters";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Card } from "@/components/ui/card";
import { Dashboard } from "@/components/periodic-table/Dashboard";
import { QuizSelectorDialog } from "@/components/quiz/QuizSelectorDialog";
import { SpaceRain } from "@/components/background/SpaceRain";
import Image from "next/image";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <main className="relative min-h-screen p-6 md:p-10 bg-background overflow-hidden">
      <SpaceRain count={30} minDuration={4} maxDuration={8} />

      <div
        className={`relative z-10 max-w-[1800px] mx-auto space-y-8 transition-all duration-200 ${
          isQuizOpen ? "blur-sm" : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-20 h-20 items-center justify-center flex">
              <Image
                src="/tube.svg"
                alt="Logo"
                width={60}
                height={60}
                className="object-contain"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">
              Periodic Table
            </h1>
          </div>
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ElementFilters
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
          />
          <Dashboard onQuizOpen={() => setIsQuizOpen(true)} />
        </div>

        <Card className="p-6 overflow-x-auto backdrop-blur-sm bg-background/80">
          <PeriodicTable
            selectedCategory={selectedCategory}
            selectedState={selectedState}
          />
        </Card>
      </div>

      <QuizSelectorDialog
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
      />
    </main>
  );
}
