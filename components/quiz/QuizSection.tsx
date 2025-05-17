import { QuizButton } from "./QuizButton";

export function QuizSection() {
  const quizTypes = [
    {
      type: "atomic-number" as const,
      label: "Atomic Number",
    },
    {
      type: "visual" as const,
      label: "Visual",
    },
    {
      type: "electron-configuration" as const,
      label: "Electron Configuration",
    },
    {
      type: "physical-properties" as const,
      label: "Physical Properties",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {quizTypes.map((quiz) => (
        <QuizButton key={quiz.type} type={quiz.type} label={quiz.label} />
      ))}
    </div>
  );
}
