"use client";

import { useState } from "react";
import { Element } from "@/lib/types/periodic-table";
import periodicTableData from "@/lib/data/periodic-table-list.json";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Dashboard } from "./Dashboard";
import { Separator } from "@/components/ui/separator";
import {
  Atom,
  Beaker,
  Calendar,
  CircuitBoard,
  TestTube,
  Gauge,
  History,
  Info,
  Microscope,
  Thermometer,
  Sun,
  User,
  Scale,
  Link as LinkIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ElementTile } from "./ElementTile";

interface PeriodicTableProps {
  selectedCategory: string | null;
  selectedState: string | null;
}

export function PeriodicTable({
  selectedCategory,
  selectedState,
}: PeriodicTableProps) {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);

  // Cast the data to unknown first, then to Element[] to avoid type mismatch
  const elements = periodicTableData.elements as unknown as Element[];

  const filteredElements = elements.filter((element) => {
    if (selectedCategory && element.category !== selectedCategory) return false;
    if (selectedState && element.phase !== selectedState) return false;
    return true;
  });

  // Separate main table elements from lanthanides and actinides
  const mainElements = filteredElements.filter(
    (element) =>
      !element.category?.toLowerCase().includes("lanthanide") &&
      !element.category?.toLowerCase().includes("actinide")
  );
  const lanthanides = filteredElements.filter((element) =>
    element.category?.toLowerCase().includes("lanthanide")
  );
  const actinides = filteredElements.filter((element) =>
    element.category?.toLowerCase().includes("actinide")
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
    <div className="w-full overflow-auto bg-background">
      <div className="min-w-[1020px] max-w-[1530px] mx-auto p-4">
        {/* Dashboard */}
        <Dashboard />

        {/* Main periodic table grid */}
        <div
          className="grid gap-1.5"
          style={{
            gridTemplateColumns: `repeat(${maxGroup}, minmax(85px, 1fr))`,
          }}
        >
          {grid.flat().map((element, index) => {
            const period = Math.floor(index / maxGroup) + 1;
            const group = (index % maxGroup) + 1;
            return (
              <div
                key={`grid-${period}-${group}`}
                className="min-w-[85px] min-h-[85px]"
              >
                {element && (
                  <ElementTile
                    element={element}
                    onClick={() => setSelectedElement(element)}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Lanthanide series */}
        {lanthanides.length > 0 && (
          <div className="mt-6">
            <div className="text-sm font-medium mb-2 pl-1">
              Lanthanides (57-71)
            </div>
            <div className="grid grid-flow-col gap-1.5 auto-cols-[85px]">
              {lanthanides.map((element, index) => (
                <div key={`lanthanide-${element.number || `pos-${index}`}`}>
                  <ElementTile
                    element={element}
                    onClick={() => setSelectedElement(element)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actinide series */}
        {actinides.length > 0 && (
          <div className="mt-4">
            <div className="text-sm font-medium mb-2 pl-1">
              Actinides (89-103)
            </div>
            <div className="grid grid-flow-col gap-1.5 auto-cols-[85px]">
              {actinides.map((element, index) => (
                <div key={`actinide-${element.number || `pos-${index}`}`}>
                  <ElementTile
                    element={element}
                    onClick={() => setSelectedElement(element)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <Dialog
          open={!!selectedElement}
          onOpenChange={() => setSelectedElement(null)}
        >
          {selectedElement && (
            <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto w-full">
              <DialogHeader>
                <div className="flex items-start gap-4">
                  {selectedElement.image && (
                    <div className="relative w-32 h-32 rounded-lg overflow-hidden border">
                      <Image
                        src={selectedElement.image.url}
                        alt={selectedElement.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <DialogTitle className="text-4xl flex items-center gap-2">
                      {selectedElement.name}
                      <span className="text-2xl opacity-70">
                        ({selectedElement.symbol})
                      </span>
                    </DialogTitle>
                    <div className="space-y-1">
                      <DialogDescription className="flex items-center gap-2">
                        <Atom className="w-4 h-4" />
                        Atomic Number: {selectedElement.number}
                      </DialogDescription>
                      {selectedElement.source && (
                        <DialogDescription>
                          <Link
                            href={selectedElement.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors"
                          >
                            <LinkIcon className="w-4 h-4" />
                            View on Wikipedia
                          </Link>
                        </DialogDescription>
                      )}
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <Separator className="my-4" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Physical Properties */}
                <Card className="p-4 space-y-4">
                  <div className="flex items-center gap-2 font-semibold">
                    <TestTube className="w-5 h-5" />
                    Physical Properties
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Scale className="w-4 h-4 opacity-70" />
                      <div>
                        <div className="text-sm opacity-70">Atomic Mass</div>
                        <div className="font-medium">
                          {selectedElement.atomic_mass
                            ? selectedElement.atomic_mass.toFixed(4) + " u"
                            : "N/A"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Beaker className="w-4 h-4 opacity-70" />
                      <div>
                        <div className="text-sm opacity-70">
                          Phase at Room Temperature
                        </div>
                        <div className="font-medium capitalize">
                          {selectedElement.phase || "N/A"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Gauge className="w-4 h-4 opacity-70" />
                      <div>
                        <div className="text-sm opacity-70">Density</div>
                        <div className="font-medium">
                          {selectedElement.density
                            ? `${selectedElement.density} g/cm³`
                            : "N/A"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Thermometer className="w-4 h-4 opacity-70" />
                      <div>
                        <div className="text-sm opacity-70">Melting Point</div>
                        <div className="font-medium">
                          {selectedElement.melt
                            ? `${selectedElement.melt}°C`
                            : "N/A"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Sun className="w-4 h-4 opacity-70" />
                      <div>
                        <div className="text-sm opacity-70">Boiling Point</div>
                        <div className="font-medium">
                          {selectedElement.boil
                            ? `${selectedElement.boil}°C`
                            : "N/A"}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Electronic Properties & Discovery */}
                <div className="space-y-6">
                  <Card className="p-4 space-y-4">
                    <div className="flex items-center gap-2 font-semibold">
                      <CircuitBoard className="w-5 h-5" />
                      Electronic Properties
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Atom className="w-4 h-4 opacity-70" />
                        <div>
                          <div className="text-sm opacity-70">
                            Electron Configuration
                          </div>
                          <div className="font-medium">
                            {selectedElement.electron_configuration || "N/A"}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Microscope className="w-4 h-4 opacity-70" />
                        <div>
                          <div className="text-sm opacity-70">
                            Electronegativity
                          </div>
                          <div className="font-medium">
                            {selectedElement.electronegativity_pauling || "N/A"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 space-y-4">
                    <div className="flex items-center gap-2 font-semibold">
                      <History className="w-5 h-5" />
                      Discovery
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <User className="w-4 h-4 opacity-70" />
                        <div>
                          <div className="text-sm opacity-70">
                            Discovered by
                          </div>
                          <div className="font-medium">
                            {selectedElement.discovered_by || "N/A"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Info className="w-4 h-4 opacity-70" />
                        <div>
                          <div className="text-sm opacity-70">Named by</div>
                          <div className="font-medium">
                            {selectedElement.named_by || "N/A"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 opacity-70" />
                        <div>
                          <div className="text-sm opacity-70">Discovery</div>
                          <div className="font-medium">
                            {selectedElement.discovered_by || "N/A"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {selectedElement.summary && (
                <Card className="p-4 mt-6">
                  <div className="flex items-center gap-2 font-semibold mb-3">
                    <Info className="w-5 h-5" />
                    Summary
                  </div>
                  <p className="text-sm leading-relaxed">
                    {selectedElement.summary || "No summary available."}
                  </p>
                </Card>
              )}
            </DialogContent>
          )}
        </Dialog>
      </div>
    </div>
  );
}
