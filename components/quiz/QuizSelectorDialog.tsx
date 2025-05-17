import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { QuizSection } from "./QuizSection";

interface QuizSelectorDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuizSelectorDialog({
  isOpen,
  onClose,
}: QuizSelectorDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] backdrop-blur-md bg-background/95 border-none">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Please select a quiz type
          </DialogTitle>
        </DialogHeader>
        <QuizSection />
      </DialogContent>
    </Dialog>
  );
}
