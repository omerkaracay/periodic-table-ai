import { Element } from "@/lib/types/periodic-table";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ElementTileProps {
  element: Element;
  onClick: () => void;
}

export function ElementTile({ element, onClick }: ElementTileProps) {
  // Format atomic mass with proper handling of null/undefined values
  const formattedAtomicMass =
    element.atomic_mass != null ? element.atomic_mass.toFixed(2) : "N/A";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Card
          className={`
            relative w-[75px] h-[75px] p-2 cursor-pointer
            hover:scale-105 hover:z-10 hover:shadow-xl
            transition-all duration-200 ease-in-out
            grid grid-rows-[auto,1fr,auto] gap-0.5
            ${getCategoryColor(element.category)}
          `}
          onClick={onClick}
        >
          {/* Atomic Number */}
          <div className="text-[11px] font-medium">{element.number}</div>

          {/* Symbol and Mass */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-xl font-bold leading-none mb-1">
              {element.symbol}
            </div>
            <div className="text-[9px] font-medium opacity-80 leading-none">
              {formattedAtomicMass}
            </div>
          </div>
        </Card>
      </TooltipTrigger>
      <TooltipContent className="p-3">
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold">{element.name}</span>
            <span className="text-sm opacity-70">({element.symbol})</span>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            <div className="opacity-70">Atomic Number:</div>
            <div>{element.number}</div>
            <div className="opacity-70">Atomic Mass:</div>
            <div>{formattedAtomicMass}</div>
            <div className="opacity-70">State:</div>
            <div className="capitalize">{element.phase}</div>
            <div className="opacity-70">Category:</div>
            <div>{element.category}</div>
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    "diatomic nonmetal":
      "bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-950 dark:to-purple-900",
    "noble gas":
      "bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-950 dark:to-pink-900",
    "alkali metal":
      "bg-gradient-to-br from-red-100 to-red-200 dark:from-red-950 dark:to-red-900",
    "alkaline earth metal":
      "bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-950 dark:to-orange-900",
    metalloid:
      "bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-950 dark:to-indigo-900",
    "polyatomic nonmetal":
      "bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-950 dark:to-purple-900",
    "post-transition metal":
      "bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-950 dark:to-blue-900",
    "transition metal":
      "bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-950 dark:to-teal-900",
    lanthanoid:
      "bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-950 dark:to-yellow-900",
    actinoid:
      "bg-gradient-to-br from-green-100 to-green-200 dark:from-green-950 dark:to-green-900",
    unknown:
      "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-950 dark:to-gray-900",
  };
  return colors[category.toLowerCase()] || colors["unknown"];
}
