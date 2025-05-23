import { categories, phases } from "@/lib/data/PeriodicTable/categories";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface ElementFiltersProps {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedState: string | null;
  setSelectedState: (state: string | null) => void;
}

export function ElementFilters({
  selectedCategory,
  setSelectedCategory,
  selectedState,
  setSelectedState,
}: ElementFiltersProps) {
  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      "alkali metal":
        "bg-red-100 hover:bg-red-200 dark:bg-red-950 dark:hover:bg-red-900",
      "alkaline earth metal":
        "bg-orange-100 hover:bg-orange-200 dark:bg-orange-950 dark:hover:bg-orange-900",
      lanthanide:
        "bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-950 dark:hover:bg-yellow-900",
      actinide:
        "bg-green-100 hover:bg-green-200 dark:bg-green-950 dark:hover:bg-green-900",
      "transition metal":
        "bg-teal-100 hover:bg-teal-200 dark:bg-teal-950 dark:hover:bg-teal-900",
      "post-transition metal":
        "bg-blue-100 hover:bg-blue-200 dark:bg-blue-950 dark:hover:bg-blue-900",
      metalloid:
        "bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-950 dark:hover:bg-indigo-900",
      nonmetal:
        "bg-purple-100 hover:bg-purple-200 dark:bg-purple-950 dark:hover:bg-purple-900",
      "noble gas":
        "bg-pink-100 hover:bg-pink-200 dark:bg-pink-950 dark:hover:bg-pink-900",
      unknown:
        "bg-gray-100 hover:bg-gray-200 dark:bg-gray-950 dark:hover:bg-gray-900",
    };
    return colors[category] || "";
  };

  const getStateColor = (state: string): string => {
    const colors: Record<string, string> = {
      Solid:
        "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700",
      Liquid:
        "bg-sky-100 hover:bg-sky-200 dark:bg-sky-900 dark:hover:bg-sky-800",
      Gas: "bg-violet-100 hover:bg-violet-200 dark:bg-violet-900 dark:hover:bg-violet-800",
    };
    return colors[state] || "";
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
      <Card className="p-4">
        <h3 className="text-sm font-medium mb-3">Categories</h3>
        <div className="flex flex-wrap gap-1.5 min-h-[120px]">
          {categories.map((category) => (
            <Badge
              key={category}
              variant="outline"
              className={`
                cursor-pointer px-2 py-0.5 text-xs transition-all duration-200
                ${
                  selectedCategory === category
                    ? "ring-2 ring-primary scale-105 shadow-lg"
                    : selectedCategory
                    ? "opacity-50 scale-95"
                    : "hover:scale-105"
                }
                ${getCategoryColor(category)}
              `}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category ? null : category
                )
              }
            >
              {category}
            </Badge>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-sm font-medium mb-3">State at Room Temperature</h3>
        <div className="flex flex-wrap gap-1.5 ">
          {phases.map((phase) => (
            <Badge
              key={phase}
              variant="outline"
              className={`
                cursor-pointer px-2 py-0.5 text-xs transition-all duration-200
                ${
                  selectedState === phase
                    ? "ring-2 ring-primary scale-105 shadow-lg"
                    : selectedState
                    ? "opacity-50 scale-95"
                    : "hover:scale-105"
                }
                ${getStateColor(phase)}
              `}
              onClick={() =>
                setSelectedState(selectedState === phase ? null : phase)
              }
            >
              {phase}
            </Badge>
          ))}
        </div>
      </Card>
    </div>
  );
}
