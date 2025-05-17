import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QuizDialog } from "./QuizDialog";
import { QuizType } from "@/lib/types/quiz";

interface QuizButtonProps {
  type: QuizType;
  label: string;
}

export function QuizButton({ type, label }: QuizButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const settings = {
    type,
    numberOfQuestions: 10,
    timePerQuestion: 30, // 30 seconds per question
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="w-full"
      >
        {label}
      </Button>

      <QuizDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        settings={settings}
      />
    </>
  );
}
