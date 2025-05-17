import { Element } from "@/lib/types/periodic-table";
import periodicTableData from "@/lib/data/PeriodicTable/data.json";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import { useState } from "react";
import { QuizSelectorDialog } from "../quiz/QuizSelectorDialog";

export function Dashboard() {
  const elements = periodicTableData.elements as Element[];
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  // Calculate phase distribution
  const phaseDistribution = elements.reduce((acc, element) => {
    const phase = element.phase || "Unknown";
    acc[phase] = (acc[phase] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate average atomic mass
  const averageAtomicMass = (
    elements.reduce((sum, element) => sum + (element.atomic_mass || 0), 0) /
    elements.length
  ).toFixed(2);

  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
      <Card className="p-4">
        <h3 className="text-sm font-medium mb-1">Element Statistics</h3>
        <div className="space-y-0">
          <div className="flex justify-between items-center">
            <span className="text-sm">Total Elements</span>
            <span className="text-sm font-medium">{elements.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Average Mass</span>
            <span className="text-sm font-medium">{averageAtomicMass} u</span>
          </div>
        </div>

        <Separator className="my-0" />

        <h4 className="text-sm font-medium">States of Matter</h4>
        <div className="space-y-0">
          {Object.entries(phaseDistribution).map(([phase, count]) => (
            <div key={phase} className="flex justify-between items-center">
              <span className="text-sm capitalize">{phase.toLowerCase()}</span>
              <span className="text-sm font-medium">{count}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4 flex flex-col">
        <h3 className="text-sm font-medium mb-3">Test Your Knowledge</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Challenge yourself with our periodic table quiz and learn about
          chemical elements in a fun way!
        </p>
        <Button
          className="mt-auto"
          size="lg"
          onClick={() => setIsQuizOpen(true)}
        >
          <Brain className="mr-2" />
          Start Quiz
        </Button>
      </Card>

      <QuizSelectorDialog
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
      />
    </div>
  );
}
