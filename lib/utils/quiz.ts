import { elements } from "@/lib/data/PeriodicTable";
import { QuizQuestion, QuizType, QuizProperty } from "@/lib/types/quiz";
import { Element } from "@/lib/types/periodic-table";

interface PhysicalProperty {
  key: keyof Element;
  name: string;
  unit: string;
  formatter?: (value: string | number | null) => string | number | null;
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function generateOptions(correctAnswer: string, count: number = 4): string[] {
  const elementNames = elements
    .map((e) => e.name)
    .filter((name) => name !== correctAnswer);
  const shuffledNames = shuffleArray(elementNames);
  const options = shuffledNames.slice(0, count - 1);
  options.push(correctAnswer);
  return shuffleArray(options);
}

function getPhysicalProperties(element: Element): QuizProperty[] {
  const properties: PhysicalProperty[] = [
    { key: "atomic_mass", name: "Atomic Mass", unit: "u" },
    { key: "boil", name: "Boiling Point", unit: "K" },
    { key: "melt", name: "Melting Point", unit: "K" },
    { key: "density", name: "Density", unit: "g/cm³" },
    { key: "molar_heat", name: "Molar Heat", unit: "J/(mol·K)" },
    { key: "electron_affinity", name: "Electron Affinity", unit: "kJ/mol" },
    {
      key: "electronegativity_pauling",
      name: "Electronegativity",
      unit: "Pauling scale",
    },
    {
      key: "appearance",
      name: "Appearance",
      unit: "",
      formatter: (v) => (typeof v === "string" ? v : "Unknown"),
    },
    {
      key: "category",
      name: "Category",
      unit: "",
    },
    {
      key: "phase",
      name: "Phase",
      unit: "",
    },
  ];

  return properties
    .map((prop) => {
      const value = element[prop.key];
      const formattedValue = prop.formatter
        ? prop.formatter(value as string | number | null)
        : value;
      return {
        name: prop.name,
        value: formattedValue ?? "Unknown",
        unit: prop.unit,
      };
    })
    .filter((prop): prop is QuizProperty => prop.value !== null);
}

function formatElectronConfiguration(element: Element): string {
  let config = "";

  if (element.electron_configuration_semantic) {
    const parts = element.electron_configuration_semantic.split(" ");
    config = parts
      .map((part) => {
        if (part.startsWith("[")) {
          return `<span class="text-blue-500">${part}</span>`;
        }
        return `<span class="font-mono">${part}</span>`;
      })
      .join(" ");
  }

  const shellInfo = element.shells
    ?.map((electrons, index) => `Shell ${index + 1}: ${electrons} electrons`)
    .join(", ");

  return `${config}${
    shellInfo
      ? `<br/><span class="text-sm text-gray-500">${shellInfo}</span>`
      : ""
  }`;
}

export function generateQuestions(
  type: QuizType,
  count: number
): QuizQuestion[] {
  const questions: QuizQuestion[] = [];

  switch (type) {
    case "atomic-number":
      for (let i = 0; i < count; i++) {
        const element = elements[
          Math.floor(Math.random() * elements.length)
        ] as Element;
        questions.push({
          type: "atomic-number",
          question: `Which element has the atomic number ${element.number}?`,
          correctAnswer: element.name,
          options: generateOptions(element.name),
        });
      }
      break;

    case "visual":
      // Filter elements with valid images and exclude placeholder images
      const elementsWithImages = (elements as Element[]).filter(
        (e) => e.image?.url && !e.image.url.includes("/transactinoid.png")
      );

      for (let i = 0; i < count && elementsWithImages.length > 0; i++) {
        const element =
          elementsWithImages[
            Math.floor(Math.random() * elementsWithImages.length)
          ];

        if (!element.image) continue; // TypeScript guard

        questions.push({
          type: "visual",
          question: "Which element is shown in this image?",
          correctAnswer: element.name,
          options: generateOptions(element.name),
          imageUrl: element.image.url,
          hint: element.image.title,
        });
      }
      break;

    case "electron-configuration":
      for (let i = 0; i < count; i++) {
        const element = elements[
          Math.floor(Math.random() * elements.length)
        ] as Element;
        const formattedConfig = formatElectronConfiguration(element);

        questions.push({
          type: "electron-configuration",
          question: "Which element has this electron configuration?",
          correctAnswer: element.name,
          options: generateOptions(element.name),
          electronConfig: formattedConfig,
          properties: [
            {
              name: "Full Configuration",
              value: element.electron_configuration || "Unknown",
              unit: "",
            },
            {
              name: "Semantic Configuration",
              value: element.electron_configuration_semantic || "Unknown",
              unit: "",
            },
          ],
        });
      }
      break;

    case "physical-properties":
      for (let i = 0; i < count; i++) {
        const element = elements[
          Math.floor(Math.random() * elements.length)
        ] as Element;
        const properties = getPhysicalProperties(element);

        if (properties.length < 3) continue; // Ensure we have at least 3 properties to show

        questions.push({
          type: "physical-properties",
          question: "Which element has these properties?",
          correctAnswer: element.name,
          options: generateOptions(element.name),
          properties,
        });
      }
      break;
  }

  // If we couldn't generate enough questions, try again with remaining count
  const remainingCount = count - questions.length;
  if (remainingCount > 0) {
    return [...questions, ...generateQuestions(type, remainingCount)];
  }

  return questions;
}
