"use client";

import { useState } from "react";
import { PeriodicTable } from "@/components/periodic-table/PeriodicTable";
import { ElementFilters } from "@/components/periodic-table/ElementFilters";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Card } from "@/components/ui/card";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  return (
    <main className="min-h-screen p-4 md:p-8 bg-background">
      <div className="max-w-[1400px] mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold tracking-tight">Periodic Table</h1>
          <ThemeToggle />
        </div>

        <Card className="p-4">
          <ElementFilters
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
          />
        </Card>

        <Card className="p-4 overflow-x-auto">
          <PeriodicTable
            selectedCategory={selectedCategory}
            selectedState={selectedState}
          />
        </Card>
      </div>
    </main>
  );
}
