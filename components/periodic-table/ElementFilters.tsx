import periodicTableData from "@/lib/data/periodic-table.json";
import { Badge } from "@/components/ui/badge";

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
  const categories = periodicTableData.categories;
  const states = ["solid", "liquid", "gas"];

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
      solid:
        "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700",
      liquid:
        "bg-sky-100 hover:bg-sky-200 dark:bg-sky-900 dark:hover:bg-sky-800",
      gas: "bg-violet-100 hover:bg-violet-200 dark:bg-violet-900 dark:hover:bg-violet-800",
    };
    return colors[state] || "";
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant="outline"
              className={`
                cursor-pointer px-3 py-1 text-sm transition-all duration-200
                ${
                  selectedCategory === category
                    ? "ring-2 ring-primary scale-110 shadow-lg"
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
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">State at Room Temperature</h3>
        <div className="flex flex-wrap gap-2">
          {states.map((state) => (
            <Badge
              key={state}
              variant="outline"
              className={`
                cursor-pointer px-3 py-1 text-sm capitalize transition-all duration-200
                ${
                  selectedState === state
                    ? "ring-2 ring-primary scale-110 shadow-lg"
                    : selectedState
                    ? "opacity-50 scale-95"
                    : "hover:scale-105"
                }
                ${getStateColor(state)}
              `}
              onClick={() =>
                setSelectedState(selectedState === state ? null : state)
              }
            >
              {state}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
