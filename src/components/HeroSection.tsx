
import React from 'react';
import { Brain, Sparkles, Bot } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <div className="mb-8 text-center">
      <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
        <div className="p-1.5 bg-primary rounded-full">
          <Brain className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="ml-2 mr-1 text-sm font-medium text-primary">Thought Harmonizer Forge mit InterfaceDNA</span>
        <Sparkles className="w-4 h-4 text-primary" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight mb-3 bg-gradient-to-r from-harmony-blue via-harmony-purple to-harmony-teal bg-clip-text text-transparent">
        Transform Your Thoughts
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        Adaptiere deine Ideen für verschiedene Zielgruppen mit InterfaceDNA Technology und chatte mit Nathalia, deinem KI-Assistenten.
      </p>
      <div className="flex items-center justify-center mt-2 text-sm text-muted-foreground">
        <Bot className="w-4 h-4 mr-1 text-harmony-purple" />
        <span>Nathalia ist bereit, deine Gedanken zu harmonisieren</span>
      </div>
    </div>
  );
};

export default HeroSection;
