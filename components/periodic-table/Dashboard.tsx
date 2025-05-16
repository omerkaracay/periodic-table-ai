import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import periodicTableData from "@/lib/data/periodic-table-list.json";
import { Element } from "@/lib/types/periodic-table";
import Image from "next/image";

export function Dashboard() {
  const elements = periodicTableData.elements as Element[];

  // Calculate statistics
  const phaseDistribution = elements.reduce((acc, element) => {
    const phase = element.phase;
    acc[phase] = (acc[phase] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryDistribution = elements.reduce((acc, element) => {
    const category = element.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const averageAtomicMass = (
    elements.reduce((sum, element) => sum + element.atomic_mass, 0) /
    elements.length
  ).toFixed(2);

  const blockDistribution = elements.reduce((acc, element) => {
    const block = element.block;
    acc[block] = (acc[block] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Find elements with images for the gallery
  const elementsWithImages = elements.filter((el) => el.image?.url).slice(0, 4);

  return (
    <div className="space-y-6 mb-8">
      {/* Stats Grid */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Elements */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Elements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{elements.length}</div>
            <p className="text-xs text-muted-foreground">Discovered Elements</p>
          </CardContent>
        </Card>

        {/* Phase Distribution */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              States of Matter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              {Object.entries(phaseDistribution).map(([phase, count]) => (
                <div key={phase} className="flex justify-between items-center">
                  <span className="text-sm capitalize">
                    {phase.toLowerCase()}
                  </span>
                  <span className="text-sm font-medium">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Average Atomic Mass */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Atomic Mass
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageAtomicMass}</div>
            <p className="text-xs text-muted-foreground">
              atomic mass units (u)
            </p>
          </CardContent>
        </Card>

        {/* Block Distribution */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Block Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              {Object.entries(blockDistribution).map(([block, count]) => (
                <div key={block} className="flex justify-between items-center">
                  <span className="text-sm">Block {block}</span>
                  <span className="text-sm font-medium">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Element Gallery */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Featured Elements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {elementsWithImages.map((element) => (
              <div key={element.number} className="space-y-2">
                <div className="relative w-full h-24 rounded-md overflow-hidden">
                  <Image
                    src={element.image!.url}
                    alt={element.image!.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-xs font-medium text-center">
                  {element.name}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
