export type ElementCategory =
  | "alkali metal"
  | "alkaline earth metal"
  | "lanthanide"
  | "actinide"
  | "transition metal"
  | "post-transition metal"
  | "metalloid"
  | "nonmetal"
  | "noble gas"
  | "unknown";

export type StateAtRoomTemp = "solid" | "liquid" | "gas" | "unknown";

export interface Discovery {
  year: number;
  discoverer: string;
}

export interface Element {
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicWeight: number;
  category: ElementCategory;
  stateAtRoomTemp: StateAtRoomTemp;
  electronConfiguration: string;
  electronegativity: number | null;
  density: number;
  meltingPoint: number;
  boilingPoint: number;
  discovery: Discovery;
  commonUses: string[];
  group: number;
  period: number;
}

export interface PeriodicTableData {
  elements: Element[];
  categories: ElementCategory[];
}
