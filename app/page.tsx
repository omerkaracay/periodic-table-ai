"use client";

import { useState } from "react";
import { PeriodicTable } from "@/components/periodic-table/PeriodicTable";
import { ElementFilters } from "@/components/periodic-table/ElementFilters";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Card } from "@/components/ui/card";
import { Dashboard } from "@/components/periodic-table/Dashboard";
import { QuizSelectorDialog } from "@/components/quiz/QuizSelectorDialog";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <main className="min-h-screen p-6 md:p-10 bg-background">
      <div
        className={`max-w-[1800px] mx-auto space-y-8 transition-all duration-200 ${
          isQuizOpen ? "blur-sm" : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold tracking-tight">Periodic Table</h1>
          <ThemeToggle />
        </div>

        <div className="flex justify-center gap-4">
          <ElementFilters
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
          />
          <Dashboard onQuizOpen={() => setIsQuizOpen(true)} />
        </div>

        <Card className="p-6 overflow-x-auto">
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
