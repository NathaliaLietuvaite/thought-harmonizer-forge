
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Edit3 } from "lucide-react";

interface ThoughtInputProps {
  thought: string;
  setThought: (thought: string) => void;
}

const ThoughtInput: React.FC<ThoughtInputProps> = ({ thought, setThought }) => {
  return (
    <Card className="thought-card mb-6">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Edit3 className="w-5 h-5 text-harmony-purple" />
          <span>Your Raw Thought</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Enter your thought here... (e.g., 'Nachtarbeit als Reinigungskraft, um morgens für meine Tochter da zu sein – Systemversagen.')"
          className="min-h-[120px] resize-y text-base"
          value={thought}
          onChange={(e) => setThought(e.target.value)}
        />
        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <Brain className="w-4 h-4" />
          <span>Your raw thoughts will be transformed according to audience needs</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThoughtInput;
