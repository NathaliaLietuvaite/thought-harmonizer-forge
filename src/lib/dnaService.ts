
// This service implements concepts from the Python InterfaceDNA class
// to enhance thought transformations

interface CoreLexikon {
  [key: string]: string;
}

interface ZielgruppenMatrix {
  [key: string]: {
    template: string;
    characteristics: string[];
  };
}

interface ResonanzFilter {
  [key: string]: string[];
}

export interface DNAData {
  coreLexikon: CoreLexikon;
  zielgruppenMatrix: ZielgruppenMatrix;
  resonanzFilter: ResonanzFilter;
}

// Mock data that would normally come from JSON files
const mockCoreLexikon: CoreLexikon = {
  "Systemversagen": "strukturelle Dysfunktion sozialer Organisationen",
  "Würde": "inhärenter Wert jedes Menschen",
  "Arbeit": "sinnvolle Tätigkeit im gesellschaftlichen Kontext",
  "Bildung": "Prozess der Wissenserweiterung und Persönlichkeitsbildung",
  "Klimaschutz": "Maßnahmen zur Eindämmung globaler Erwärmung"
};

const mockZielgruppenMatrix: ZielgruppenMatrix = {
  "ethiker": {
    template: "Ethische Betrachtung: {text}",
    characteristics: ["Tiefgründigkeit", "Prinzipientreue", "Reflexion"]
  },
  "pragmatiker": {
    template: "Praktische Analyse: {text}",
    characteristics: ["Lösungsorientiert", "Effizient", "Strukturiert"]
  },
  "akademiker": {
    template: "Wissenschaftliche Perspektive: {text}",
    characteristics: ["Präzision", "Quellenbasiert", "Terminologisch korrekt"]
  },
  "aktivisten": {
    template: "Aufruf zum Handeln: {text}",
    characteristics: ["Engagement", "Überzeugungskraft", "Gemeinschaftssinn"]
  },
  "technologen": {
    template: "Technologische Analyse: {text}",
    characteristics: ["Systematisch", "Zukunftsorientiert", "Datengetrieben"]
  }
};

const mockResonanzFilter: ResonanzFilter = {
  "ethiker": ["Werte", "Gerechtigkeit", "Moral", "Prinzipien"],
  "pragmatiker": ["Lösung", "Methode", "Effizienz", "Umsetzung"],
  "akademiker": ["Forschung", "Theorie", "Konzept", "Evidenz"],
  "aktivisten": ["Wandel", "Bewegung", "Rechte", "Gerechtigkeit"],
  "technologen": ["System", "Optimierung", "Innovation", "Daten"]
};

// Simulate loading DNA data
export function loadDNAData(): DNAData {
  return {
    coreLexikon: mockCoreLexikon,
    zielgruppenMatrix: mockZielgruppenMatrix,
    resonanzFilter: mockResonanzFilter
  };
}

// Enhanced transformation function that incorporates DNA concepts
export function applyDNA(text: string, audience: string): string {
  const dnaData = loadDNAData();
  
  // Apply CoreLexikon replacements
  let transformedText = text;
  
  Object.entries(dnaData.coreLexikon).forEach(([term, definition]) => {
    // Only replace if the term is found as a whole word
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    if (regex.test(transformedText)) {
      transformedText = transformedText.replace(regex, `${term} (${definition})`);
    }
  });
  
  // Apply audience-specific template if available
  if (audience in dnaData.zielgruppenMatrix) {
    const template = dnaData.zielgruppenMatrix[audience].template;
    transformedText = template.replace('{text}', transformedText);
  }
  
  return transformedText;
}

// Function to enhance the existing transformation with DNA concepts
export function enhanceTransformation(originalTransformation: string, rawThought: string, audience: string): string {
  // Apply DNA transformations to the raw thought
  const dnaEnhanced = applyDNA(rawThought, audience);
  
  // Add a section that highlights resonant terms based on audience
  const dnaData = loadDNAData();
  let resonantTerms: string[] = [];
  
  if (audience in dnaData.resonanzFilter) {
    resonantTerms = dnaData.resonanzFilter[audience].filter(term => 
      rawThought.toLowerCase().includes(term.toLowerCase())
    );
  }
  
  // Add DNA insights section if we found resonant terms
  if (resonantTerms.length > 0) {
    return `${originalTransformation}\n\n${dnaData.zielgruppenMatrix[audience]?.characteristics.join(' • ')}\n\nResonanzpunkte: ${resonantTerms.join(', ')}`;
  }
  
  return originalTransformation;
}
