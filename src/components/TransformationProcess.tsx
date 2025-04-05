
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Filter, Zap } from "lucide-react";

interface TransformationProcessProps {
  isTransforming: boolean;
}

const TransformationProcess: React.FC<TransformationProcessProps> = ({ isTransforming }) => {
  return (
    <Card className="mb-6 border-dashed">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${isTransforming ? 'border-primary bg-primary/10 animate-pulse-subtle' : 'border-muted-foreground'}`}>
              <Filter className={`w-6 h-6 ${isTransforming ? 'text-primary' : 'text-muted-foreground'}`} />
            </div>
            <span className="mt-2 text-sm font-medium">Apply Filters</span>
          </div>
          
          <ArrowRight className="w-5 h-5 text-muted-foreground" />
          
          <div className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${isTransforming ? 'border-primary bg-primary/10 animate-pulse-subtle' : 'border-muted-foreground'}`}>
              <Zap className={`w-6 h-6 ${isTransforming ? 'text-primary' : 'text-muted-foreground'}`} />
            </div>
            <span className="mt-2 text-sm font-medium">Transform</span>
          </div>
          
          <ArrowRight className="w-5 h-5 text-muted-foreground" />
          
          <div className="flex flex-col items-center relative">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${isTransforming ? 'border-primary bg-primary/10 animate-pulse-subtle' : 'border-muted-foreground'}`}>
              <div className="w-6 h-6 flex items-center justify-center">
                <span className="text-xl font-semibold">A</span>
              </div>
            </div>
            <span className="mt-2 text-sm font-medium">Adapt Style</span>
            {isTransforming && (
              <div className="absolute -z-10 w-16 h-16 rounded-full bg-primary/20 animate-ripple"></div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransformationProcess;
