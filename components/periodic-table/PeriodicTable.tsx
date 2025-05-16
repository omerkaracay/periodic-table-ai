"use client";

import { useState } from "react";
import { Element } from "@/lib/types/periodic-table";
import periodicTableData from "@/lib/data/periodic-table.json";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PeriodicTableProps {
  selectedCategory: string | null;
  selectedState: string | null;
}

interface ElementTileProps {
  element: Element;
  onClick: () => void;
}

function ElementTile({ element, onClick }: ElementTileProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Card
          className={`
            w-[70px] h-[70px] p-2 cursor-pointer transition-all
            hover:scale-105 hover:shadow-lg
            flex flex-col items-center justify-center
            ${getCategoryColor(element.category)}
          `}
          onClick={onClick}
        >
          <div className="text-xs opacity-50">{element.atomicNumber}</div>
          <div className="text-xl font-bold">{element.symbol}</div>
          <div className="text-[10px] truncate w-full text-center">
            {element.name}
          </div>
        </Card>
      </TooltipTrigger>
      <TooltipContent>
        <p>{element.name}</p>
        <p className="text-xs opacity-75">{element.category}</p>
      </TooltipContent>
    </Tooltip>
  );
}

function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    "alkali metal": "bg-red-100 dark:bg-red-950",
    "alkaline earth metal": "bg-orange-100 dark:bg-orange-950",
    lanthanide: "bg-yellow-100 dark:bg-yellow-950",
    actinide: "bg-green-100 dark:bg-green-950",
    "transition metal": "bg-teal-100 dark:bg-teal-950",
    "post-transition metal": "bg-blue-100 dark:bg-blue-950",
    metalloid: "bg-indigo-100 dark:bg-indigo-950",
    nonmetal: "bg-purple-100 dark:bg-purple-950",
    "noble gas": "bg-pink-100 dark:bg-pink-950",
    unknown: "bg-gray-100 dark:bg-gray-950",
  };
  return colors[category] || "bg-gray-100 dark:bg-gray-950";
}

export function PeriodicTable({
  selectedCategory,
  selectedState,
}: PeriodicTableProps) {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);

  const filteredElements = (periodicTableData.elements as Element[]).filter(
    (element) => {
      if (selectedCategory && element.category !== selectedCategory)
        return false;
      if (selectedState && element.stateAtRoomTemp !== selectedState)
        return false;
      return true;
    }
  );

  // Separate main table elements from lanthanides and actinides
  const mainElements = filteredElements.filter(
    (element) =>
      element.category !== "lanthanide" && element.category !== "actinide"
  );
  const lanthanides = filteredElements.filter(
    (element) => element.category === "lanthanide"
  );
  const actinides = filteredElements.filter(
    (element) => element.category === "actinide"
  );

  // Create main grid
  const maxPeriod = 7; // Standard periodic table has 7 main periods
  const maxGroup = 18; // Standard periodic table has 18 groups

  const grid: (Element | null)[][] = Array.from({ length: maxPeriod }, () =>
    Array.from({ length: maxGroup }, () => null)
  );

  mainElements.forEach((element) => {
    if (element.period <= 7) {
      // Only place elements that belong in main grid
      grid[element.period - 1][element.group - 1] = element;
    }
  });

  return (
    <div className="space-y-4">
      {/* Main periodic table grid */}
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${maxGroup}, minmax(70px, 1fr))`,
        }}
      >
        {grid.flat().map((element, index) => (
          <div key={index} className="min-w-[70px] min-h-[70px]">
            {element && (
              <ElementTile
                element={element}
                onClick={() => setSelectedElement(element)}
              />
            )}
          </div>
        ))}
      </div>

      {/* Lanthanide series */}
      {lanthanides.length > 0 && (
        <div className="mt-4">
          <div className="text-sm font-medium mb-2">Lanthanides (57-71)</div>
          <div className="grid grid-flow-col gap-1 auto-cols-[70px]">
            {lanthanides.map((element) => (
              <ElementTile
                key={element.atomicNumber}
                element={element}
                onClick={() => setSelectedElement(element)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Actinide series */}
      {actinides.length > 0 && (
        <div className="mt-4">
          <div className="text-sm font-medium mb-2">Actinides (89-103)</div>
          <div className="grid grid-flow-col gap-1 auto-cols-[70px]">
            {actinides.map((element) => (
              <ElementTile
                key={element.atomicNumber}
                element={element}
                onClick={() => setSelectedElement(element)}
              />
            ))}
          </div>
        </div>
      )}

      <Dialog
        open={!!selectedElement}
        onOpenChange={() => setSelectedElement(null)}
      >
        {selectedElement && (
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {selectedElement.name} ({selectedElement.symbol})
              </DialogTitle>
              <DialogDescription>
                Atomic Number: {selectedElement.atomicNumber}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div>
                <h3 className="font-semibold mb-2">Physical Properties</h3>
                <dl className="space-y-1">
                  <dt className="text-sm opacity-70">Atomic Weight</dt>
                  <dd>{selectedElement.atomicWeight} u</dd>
                  <dt className="text-sm opacity-70">
                    State at Room Temperature
                  </dt>
                  <dd>{selectedElement.stateAtRoomTemp}</dd>
                  <dt className="text-sm opacity-70">Density</dt>
                  <dd>{selectedElement.density} g/cm³</dd>
                  <dt className="text-sm opacity-70">Melting Point</dt>
                  <dd>{selectedElement.meltingPoint}°C</dd>
                  <dt className="text-sm opacity-70">Boiling Point</dt>
                  <dd>{selectedElement.boilingPoint}°C</dd>
                </dl>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Electronic Properties</h3>
                <dl className="space-y-1">
                  <dt className="text-sm opacity-70">Electron Configuration</dt>
                  <dd>{selectedElement.electronConfiguration}</dd>
                  <dt className="text-sm opacity-70">Electronegativity</dt>
                  <dd>
                    {selectedElement.electronegativity !== null
                      ? selectedElement.electronegativity
                      : "N/A"}
                  </dd>
                </dl>
                <h3 className="font-semibold mt-4 mb-2">Discovery</h3>
                <p className="text-sm">
                  Discovered in {selectedElement.discovery.year} by{" "}
                  {selectedElement.discovery.discoverer}
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Common Uses</h3>
              <ul className="list-disc list-inside text-sm space-y-1">
                {selectedElement.commonUses.map((use, index) => (
                  <li key={index}>{use}</li>
                ))}
              </ul>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
