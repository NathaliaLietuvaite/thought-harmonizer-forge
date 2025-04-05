
export interface Audience {
  id: string;
  name: string;
  description: string;
}

export const audiences: Audience[] = [
  {
    id: "ethiker",
    name: "Ethicists",
    description: "Focused on moral implications and ethical frameworks. Values justice, fairness, and philosophical consistency."
  },
  {
    id: "pragmatiker",
    name: "Pragmatists",
    description: "Interested in practical applications and tangible outcomes. Values efficiency, utility, and real-world solutions."
  },
  {
    id: "akademiker",
    name: "Academics",
    description: "Drawn to theoretical depth and intellectual rigor. Values comprehensive analysis, proper citations, and methodological precision."
  },
  {
    id: "aktivisten",
    name: "Activists",
    description: "Motivated by social change and civic engagement. Values passion, calls to action, and narratives of collective empowerment."
  },
  {
    id: "technologen",
    name: "Technologists",
    description: "Centered on innovation and technical solutions. Values data-driven approaches, systems thinking, and scalable frameworks."
  }
];

export const exampleTransformations = [
  {
    thought: "Nachtarbeit als Reinigungskraft, um morgens für meine Tochter da zu sein – Systemversagen.",
    audience: "Ethicists"
  },
  {
    thought: "Klimaschutz und wirtschaftliches Wachstum als scheinbarer Widerspruch.",
    audience: "Pragmatists"
  },
  {
    thought: "Digitale Überwachung im Namen der Sicherheit – eine gefährliche Entwicklung.",
    audience: "Academics"
  },
  {
    thought: "Bildungschancen hängen immer noch zu stark von sozialer Herkunft ab.",
    audience: "Activists"
  },
  {
    thought: "Künstliche Intelligenz verändert unser Verständnis von Kreativität und Arbeit.",
    audience: "Technologists"
  },
  {
    thought: "Der öffentliche Nahverkehr muss als Grundrecht verstanden werden.",
    audience: "Ethicists"
  }
];
