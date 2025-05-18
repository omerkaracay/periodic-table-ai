import { Atom, Hash, ImageIcon, TestTubeDiagonal } from "lucide-react";
import { QuizButton } from "./QuizButton";

export function QuizSection() {
  const quizTypes = [
    {
      type: "atomic-number" as const,
      label: "Atomic Number",
      icon: <Hash className="w-4 h-4" />,
    },
    {
      type: "visual" as const,
      label: "Visual",
      icon: <ImageIcon className="w-4 h-4" />,
    },
    {
      type: "electron-configuration" as const,
      label: "Electron Configuration",
      icon: <Atom className="w-4 h-4 opacity-70" />,
    },
    {
      type: "physical-properties" as const,
      label: "Physical Properties",
      icon: <TestTubeDiagonal className="w-10 h-10" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-16">
      {quizTypes.map((quiz) => (
        <QuizButton
          key={quiz.type}
          type={quiz.type}
          label={quiz.label}
          icon={quiz.icon}
        />
      ))}
    </div>
  );
}
