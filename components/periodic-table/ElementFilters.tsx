import { ElementCategory, StateAtRoomTemp } from "@/lib/types/periodic-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface ElementFiltersProps {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedState: string | null;
  setSelectedState: (state: string | null) => void;
}

const categories: ElementCategory[] = [
  "alkali metal",
  "alkaline earth metal",
  "lanthanide",
  "actinide",
  "transition metal",
  "post-transition metal",
  "metalloid",
  "nonmetal",
  "noble gas",
  "unknown",
];

const states: StateAtRoomTemp[] = ["solid", "liquid", "gas", "unknown"];

export function ElementFilters({
  selectedCategory,
  setSelectedCategory,
  selectedState,
  setSelectedState,
}: ElementFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="space-y-2 flex-1">
        <Label htmlFor="category">Category</Label>
        <Select
          value={selectedCategory || "all"}
          onValueChange={(value: string) =>
            setSelectedCategory(value === "all" ? null : value)
          }
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 flex-1">
        <Label htmlFor="state">State at Room Temperature</Label>
        <Select
          value={selectedState || "all"}
          onValueChange={(value: string) =>
            setSelectedState(value === "all" ? null : value)
          }
        >
          <SelectTrigger id="state">
            <SelectValue placeholder="All states" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All states</SelectItem>
            {states.map((state) => (
              <SelectItem key={state} value={state}>
                {state.charAt(0).toUpperCase() + state.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
