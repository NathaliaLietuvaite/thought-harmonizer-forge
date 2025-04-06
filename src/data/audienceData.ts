
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
    thought: "Climate protection and economic growth as an apparent contradiction.",
    audience: "Ethicists"
  },
  {
    thought: "Digital surveillance in the name of security - a dangerous development.",
    audience: "Pragmatists"
  },
  {
    thought: "Educational opportunities still depend too much on social background.",
    audience: "Academics"
  },
  {
    thought: "Artificial intelligence is changing our understanding of creativity and work.",
    audience: "Activists"
  },
  {
    thought: "Public transportation must be understood as a basic right.",
    audience: "Technologists"
  },
  {
    thought: "The gap between rich and poor continues to widen in modern societies.",
    audience: "Ethicists"
  }
];
