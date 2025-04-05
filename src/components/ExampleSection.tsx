
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LightbulbIcon, RefreshCw } from "lucide-react";

interface ExampleSectionProps {
  examples: { thought: string; audience: string }[];
  onUseExample: (thought: string, audience: string) => void;
}

const ExampleSection: React.FC<ExampleSectionProps> = ({ examples, onUseExample }) => {
  return (
    <div className="mt-10">
      <div className="flex items-center gap-2 mb-4">
        <LightbulbIcon className="w-5 h-5 text-harmony-teal" />
        <h2 className="text-xl font-medium">Example Transformations</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {examples.map((example, index) => (
          <Card key={index} className="thought-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Raw Thought</CardTitle>
              <CardDescription className="line-clamp-2">{example.thought}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1 text-sm mb-3">
                <span className="font-medium">For:</span>
                <span className="bg-secondary/20 text-secondary-foreground px-2 py-0.5 rounded-full text-xs">
                  {example.audience}
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full flex items-center gap-1"
                onClick={() => onUseExample(example.thought, example.audience)}
              >
                <RefreshCw className="w-3 h-3" />
                <span>Use Example</span>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExampleSection;
