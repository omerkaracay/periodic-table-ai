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
  name: string;
  appearance: string | null;
  atomic_mass: number;
  boil: number | null;
  category: string;
  density: number;
  discovered_by: string;
  melt: number | null;
  molar_heat: number | null;
  named_by: string | null;
  number: number;
  period: number;
  group: number;
  phase: string;
  source: string;
  symbol: string;
  xpos: number;
  ypos: number;
  shells: number[];
  electron_configuration: string;
  electron_configuration_semantic: string;
  electron_affinity: number | null;
  electronegativity_pauling: number | null;
  image?: {
    title: string;
    url: string;
    attribution: string;
  };
  bohr_model_3d?: string;
  summary?: string;
}

export interface PeriodicTableData {
  elements: Element[];
}
