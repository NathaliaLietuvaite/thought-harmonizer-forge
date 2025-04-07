
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, Bot, User, Info } from "lucide-react";
import { transformThought } from '@/lib/transformationService';
import { useToast } from "@/components/ui/use-toast";
import { generateResponse } from '@/lib/webLLMService';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const NathaliaChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I am Nathalia, your thought harmonization assistant. How can I help you today?'
    },
    {
      id: '2',
      role: 'system',
      content: 'Using enhanced pattern-based responses for natural conversation.'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentAudience, setCurrentAudience] = useState<'ethiker' | 'pragmatiker' | 'akademiker' | 'aktivisten' | 'technologen'>('ethiker');
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
      // Generate response using our enhanced pattern-based approach
      const response = await generateResponse(inputValue, currentAudience);
      
      // Add assistant response
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response
        };
        
        setMessages(prev => [...prev, botResponse]);
        setIsProcessing(false);
      }, 300); // Reduced delay for better UX
      
    } catch (error) {
      console.error('Error processing message:', error);
      toast({
        title: 'Error processing message',
        description: 'Sorry, I could not process your message.',
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

  // Function to handle audience change
  const handleAudienceChange = (audience: 'ethiker' | 'pragmatiker' | 'akademiker' | 'aktivisten' | 'technologen') => {
    setCurrentAudience(audience);
    setMessages(prev => [
      ...prev, 
      {
        id: Date.now().toString(),
        role: 'system',
        content: `Switched to ${getAudienceName(audience)} perspective.`
      }
    ]);
  };

  // Helper function to get audience display name
  const getAudienceName = (audienceId: string): string => {
    switch(audienceId) {
      case 'ethiker': return 'Ethicist';
      case 'pragmatiker': return 'Pragmatist';
      case 'akademiker': return 'Academic';
      case 'aktivisten': return 'Activist';
      case 'technologen': return 'Technologist';
      default: return audienceId;
    }
  };

  return (
    <Card className="w-full h-[500px] flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Bot className="w-5 h-5 text-harmony-purple" />
          <span>Nathalia Chatbot</span>
          <div className="ml-auto text-xs flex items-center gap-1 text-blue-500">
            <Info className="w-3 h-3" />
            <span>Enhanced Pattern Responses</span>
          </div>
        </CardTitle>
        
        {/* Audience selector pills */}
        <div className="flex flex-wrap gap-2 mt-2">
          {['ethiker', 'pragmatiker', 'akademiker', 'aktivisten', 'technologen'].map((audience) => (
            <Button 
              key={audience}
              variant={currentAudience === audience ? "default" : "outline"}
              size="sm"
              onClick={() => handleAudienceChange(audience as any)}
              className={currentAudience === audience ? "bg-harmony-purple hover:bg-harmony-purple/90" : ""}
            >
              {getAudienceName(audience)}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col h-full p-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${
                message.role === 'user' 
                  ? 'justify-end' 
                  : message.role === 'system' 
                    ? 'justify-center' 
                    : 'justify-start'
              }`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground ml-auto'
                    : message.role === 'system'
                    ? 'bg-blue-100 text-blue-800 text-xs px-2 py-1'
                    : 'bg-muted'
                }`}
              >
                {message.role !== 'system' && (
                  <div className="flex items-center gap-2 mb-1">
                    {message.role === 'user' ? (
                      <>
                        <span className="font-medium">You</span>
                        <User className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        <span className="font-medium">Nathalia</span>
                        <Bot className="w-4 h-4" />
                      </>
                    )}
                  </div>
                )}
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
              placeholder="Share your thoughts with Nathalia..."
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
