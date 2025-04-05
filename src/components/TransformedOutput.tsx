
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, MessageSquare } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface TransformedOutputProps {
  output: string;
  isLoading: boolean;
}

const TransformedOutput: React.FC<TransformedOutputProps> = ({ output, isLoading }) => {
  const { toast } = useToast();
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied to clipboard",
      description: "The transformed thought has been copied to your clipboard.",
    });
  };
  
  return (
    <Card className="thought-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <MessageSquare className="w-5 h-5 text-harmony-blue" />
          <span>Transformed Thought</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="min-h-[150px] flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-muted-foreground">Transforming your thought...</p>
          </div>
        ) : output ? (
          <>
            <div className="min-h-[150px] p-4 bg-muted/50 rounded-md whitespace-pre-wrap">
              {output}
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="outline" size="sm" onClick={copyToClipboard} className="flex items-center gap-2">
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </Button>
            </div>
          </>
        ) : (
          <div className="min-h-[150px] flex flex-col items-center justify-center text-muted-foreground">
            <p>Enter a thought and select an audience to see the transformation</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransformedOutput;
