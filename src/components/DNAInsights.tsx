
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { loadDNAData } from '@/lib/dnaService';

interface DNAInsightsProps {
  audience: string;
  visible: boolean;
}

const DNAInsights: React.FC<DNAInsightsProps> = ({ audience, visible }) => {
  const dnaData = loadDNAData();
  
  if (!visible || !audience) return null;
  
  const audienceData = dnaData.zielgruppenMatrix[audience];
  const resonanceTerms = dnaData.resonanzFilter[audience];
  
  if (!audienceData) return null;
  
  return (
    <Card className="thought-card mt-6 border-dashed bg-muted/30">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <BookOpen className="w-5 h-5 text-harmony-purple" />
          <span>DNA Insights</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Audience Characteristics:</h3>
            <div className="flex flex-wrap gap-2">
              {audienceData.characteristics.map((trait, index) => (
                <span key={index} className="px-3 py-1 bg-primary/10 rounded-full text-sm">
                  {trait}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Resonance Filter:</h3>
            <div className="flex flex-wrap gap-2">
              {resonanceTerms.map((term, index) => (
                <span key={index} className="px-3 py-1 bg-secondary/10 rounded-full text-sm">
                  {term}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Core Lexikon Sample:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {Object.entries(dnaData.coreLexikon).slice(0, 4).map(([term, definition], index) => (
                <div key={index} className="p-2 bg-background rounded border">
                  <span className="font-medium">{term}:</span> {definition}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DNAInsights;
