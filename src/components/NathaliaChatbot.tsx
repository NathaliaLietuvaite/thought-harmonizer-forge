
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send, Bot, User } from "lucide-react";
import { transformThought } from '@/lib/transformationService';
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const NathaliaChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hallo! Ich bin Nathalia, dein Gedanken-Harmonisierungs-Assistent. Wie kann ich dir heute helfen?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsProcessing(true);
    
    try {
      // Generate response using the transformation service (simulating chatbot)
      const response = await transformThought({
        thought: inputValue,
        audience: 'ethiker' // Default audience for chatbot
      });
      
      // Add assistant response
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `${response}\n\nDieser Gedanke berührt Aspekte der Würde im Systemwandel.`
        };
        
        setMessages(prev => [...prev, botResponse]);
        setIsProcessing(false);
      }, 1000); // Simulate processing time
      
    } catch (error) {
      console.error('Error processing message:', error);
      toast({
        title: 'Fehler bei der Verarbeitung',
        description: 'Entschuldigung, ich konnte deine Nachricht nicht verarbeiten.',
        variant: 'destructive',
      });
      setIsProcessing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="w-full h-[500px] flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Bot className="w-5 h-5 text-harmony-purple" />
          <span>Nathalia Chatbot</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col h-full p-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground ml-auto'
                    : 'bg-muted'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {message.role === 'user' ? (
                    <>
                      <span className="font-medium">Du</span>
                      <User className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <span className="font-medium">Nathalia</span>
                      <Bot className="w-4 h-4" />
                    </>
                  )}
                </div>
                <div className="whitespace-pre-wrap">{message.content}</div>
              </div>
            </div>
          ))}
          {isProcessing && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-3 rounded-lg bg-muted">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">Nathalia</span>
                  <Bot className="w-4 h-4" />
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-3 border-t border-border mt-auto">
          <form 
            className="flex gap-2" 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Teile deine Gedanken mit Nathalia..."
              disabled={isProcessing}
              className="flex-1"
            />
            <Button 
              type="submit" 
              size="icon" 
              disabled={isProcessing}
              className="bg-harmony-purple hover:bg-harmony-purple/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default NathaliaChatbot;
