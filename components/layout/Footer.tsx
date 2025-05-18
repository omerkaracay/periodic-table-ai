import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full py-4 text-center text-sm text-muted-foreground">
      <div className="flex items-center justify-center gap-1">
        Developed by{" "}
        <a
          href="https://karacay.fi"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground hover:underline"
        >
          Ömer Karaçay
        </a>{" "}
        with <Heart className="h-4 w-4 text-red-500" />
      </div>
    </footer>
  );
}
