import { useState, useEffect } from "react";
import Image from "next/image";
import { Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { QuizSettings, QuizState } from "@/lib/types/quiz";
import { generateQuestions } from "@/lib/utils/quiz";

interface QuizDialogProps {
  isOpen: boolean;
  onClose: () => void;
  settings: QuizSettings;
}

interface AnswerHistory {
  question: string;
  correctAnswer: string;
  userAnswer: string;
  isCorrect: boolean;
  imageUrl?: string;
  properties?: Array<{
    name: string;
    value: string | number | null;
    unit: string;
  }>;
}

export function QuizDialog({ isOpen, onClose, settings }: QuizDialogProps) {
  const [state, setState] = useState<QuizState>({
    currentQuestion: 0,
    score: 0,
    timeRemaining: settings.timePerQuestion,
    questions: [],
    isComplete: false,
  });
  const [answerHistory, setAnswerHistory] = useState<AnswerHistory[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const questions = generateQuestions(
        settings.type,
        settings.numberOfQuestions
      );
      setState({
        currentQuestion: 0,
        score: 0,
        timeRemaining: settings.timePerQuestion,
        questions,
        isComplete: false,
      });
      setAnswerHistory([]);
      setSelectedAnswer(null);
      setShowAnswer(false);
    }
  }, [isOpen, settings]);

  useEffect(() => {
    if (!isOpen || state.isComplete) return;

    const timer = setInterval(() => {
      setState((prev) => {
        if (prev.timeRemaining <= 0) {
          if (prev.currentQuestion >= prev.questions.length - 1) {
            return { ...prev, isComplete: true };
          }
          // Time's up, record as wrong answer
          const currentQ = prev.questions[prev.currentQuestion];
          setAnswerHistory((h) => [
            ...h,
            {
              question: currentQ.question,
              correctAnswer: currentQ.correctAnswer,
              userAnswer: "Time's up",
              isCorrect: false,
              imageUrl: currentQ.imageUrl,
              properties: currentQ.properties,
            },
          ]);
          return {
            ...prev,
            currentQuestion: prev.currentQuestion + 1,
            timeRemaining: settings.timePerQuestion,
          };
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, settings.timePerQuestion, state.isComplete]);

  const currentQuestion = state.questions[state.currentQuestion];

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowAnswer(true);

    // Wait 1 second to show the correct/incorrect status
    setTimeout(() => {
      const isCorrect = answer === currentQuestion.correctAnswer;

      setAnswerHistory((prev) => [
        ...prev,
        {
          question: currentQuestion.question,
          correctAnswer: currentQuestion.correctAnswer,
          userAnswer: answer,
          isCorrect,
          imageUrl: currentQuestion.imageUrl,
          properties: currentQuestion.properties,
        },
      ]);

      setState((prev) => {
        const newScore = isCorrect ? prev.score + 1 : prev.score;

        if (prev.currentQuestion >= prev.questions.length - 1) {
          return { ...prev, score: newScore, isComplete: true };
        }

        return {
          ...prev,
          currentQuestion: prev.currentQuestion + 1,
          score: newScore,
          timeRemaining: settings.timePerQuestion,
        };
      });

      setSelectedAnswer(null);
      setShowAnswer(false);
    }, 1000);
  };

  const handleClose = () => {
    setState((prev) => ({ ...prev, isComplete: true }));
    onClose();
  };

  if (!currentQuestion) return null;

  const getButtonStyle = (option: string) => {
    if (!showAnswer || selectedAnswer !== option) {
      return "w-full text-left justify-start";
    }
    if (option === currentQuestion.correctAnswer) {
      return "w-full text-left justify-start bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white";
    }
    if (selectedAnswer === option) {
      return "w-full text-left justify-start bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white";
    }
    return "w-full text-left justify-start";
  };

  const renderQuestion = () => {
    if (currentQuestion.type === "electron-configuration") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">
                {currentQuestion.question}
              </h3>
              <div
                className="prose dark:prose-invert"
                dangerouslySetInnerHTML={{
                  __html: currentQuestion.electronConfig || "",
                }}
              />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentQuestion.properties?.map((prop, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{prop.name}</TableCell>
                    <TableCell>{prop.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <Button
                key={option}
                onClick={() => !showAnswer && handleAnswer(option)}
                variant="outline"
                disabled={showAnswer}
                className={getButtonStyle(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      );
    }

    if (
      currentQuestion.type === "physical-properties" &&
      currentQuestion.properties
    ) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentQuestion.properties.map((prop, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{prop.name}</TableCell>
                    <TableCell>
                      {prop.value} {prop.unit}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <Button
                key={option}
                onClick={() => !showAnswer && handleAnswer(option)}
                variant="outline"
                disabled={showAnswer}
                className={getButtonStyle(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      );
    }

    return (
      <>
        <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>

        {currentQuestion.imageUrl && (
          <div className="mt-4 mb-6 flex justify-center">
            <Image
              src={currentQuestion.imageUrl}
              alt="Quiz question image"
              width={300}
              height={300}
              className="rounded-lg"
            />
          </div>
        )}

        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <Button
              key={option}
              onClick={() => !showAnswer && handleAnswer(option)}
              variant="outline"
              disabled={showAnswer}
              className={getButtonStyle(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      </>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {state.isComplete
              ? "Quiz Results"
              : `Question ${state.currentQuestion + 1} / ${
                  state.questions.length
                }`}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {!state.isComplete && (
            <>
              <Progress
                value={(state.timeRemaining / settings.timePerQuestion) * 100}
                className="h-2"
              />

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  Time Remaining: {state.timeRemaining}s
                </p>
              </div>
            </>
          )}

          {state.isComplete ? (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold">
                  {state.score} / {state.questions.length}
                </h3>
                <p className="mt-2 text-gray-600">
                  {((state.score / state.questions.length) * 100).toFixed(0)}%
                  Correct
                </p>
              </div>

              <ScrollArea className="h-[400px] rounded-md border p-4">
                <div className="space-y-4">
                  {answerHistory.map((answer, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-start gap-2">
                        {answer.isCorrect ? (
                          <Check className="text-green-500 mt-1" />
                        ) : (
                          <X className="text-red-500 mt-1" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium mb-2">
                            Question {index + 1}:
                          </p>
                          <p className="text-sm mb-2">{answer.question}</p>

                          {answer.properties ? (
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Property</TableHead>
                                  <TableHead>Value</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {answer.properties.map((prop, propIndex) => (
                                  <TableRow key={propIndex}>
                                    <TableCell className="font-medium">
                                      {prop.name}
                                    </TableCell>
                                    <TableCell>
                                      {prop.value} {prop.unit}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          ) : answer.imageUrl ? (
                            <div className="mb-2">
                              <Image
                                src={answer.imageUrl}
                                alt="Question image"
                                width={200}
                                height={200}
                                className="rounded-md"
                              />
                            </div>
                          ) : null}

                          <p className="text-sm text-green-600 mt-2">
                            Correct: {answer.correctAnswer}
                          </p>
                          {answer.userAnswer !== answer.correctAnswer && (
                            <p className="text-sm text-red-600">
                              Your Answer: {answer.userAnswer}
                            </p>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>

              <Button onClick={handleClose} className="w-full">
                Close
              </Button>
            </div>
          ) : (
            <div className="mt-6">{renderQuestion()}</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
