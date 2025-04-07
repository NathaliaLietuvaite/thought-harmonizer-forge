import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, Bot, User, AlertTriangle } from "lucide-react";
import { transformThought } from '@/lib/transformationService';
import { useToast } from "@/components/ui/use-toast";
import { generateResponse, initializeWebLLM, checkWebGPUSupport } from '@/lib/webLLMService';

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
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [modelStatus, setModelStatus] = useState<{loading: boolean, error: string | null}>({
    loading: true,
    error: null
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Initialize WebLLM when component mounts
  useEffect(() => {
    async function loadModel() {
      setModelStatus({loading: true, error: null});
      
      try {
        // Check WebGPU support
        const gpuSupport = await checkWebGPUSupport();
        if (!gpuSupport.supported) {
          // Add a system message about WebGPU support
          setMessages(prev => [...prev, {
            id: Date.now().toString(),
            role: 'system',
            content: gpuSupport.message
          }]);
        }
        
        // Initialize the model
        await initializeWebLLM();
        setModelStatus({loading: false, error: null});
        
        // Add a system message that the model is ready
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: 'system',
          content: 'The AI model is loaded and ready. This is a lightweight model running in your browser.'
        }]);
      } catch (error) {
        console.error('Error loading WebLLM model:', error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        
        setModelStatus({
          loading: false, 
          error: 'Failed to load the AI model. Falling back to simulated responses.'
        });
        
        // Add error message
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: 'system',
          content: `Error: Failed to load the AI model. Falling back to simulated responses. ${errorMessage}`
        }]);
      }
    }
    
    loadModel();
  }, []);

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
      let response;
      
      // Check if model is available, otherwise use a fallback
      if (modelStatus.error) {
        // Use fallback responses if model failed to load
        response = `I'm currently running in fallback mode due to model loading issues. In response to "${inputValue}", I would typically provide a thoughtful reply about ${getRandomTopic()}.`;
      } else {
        // Generate response using WebLLM
        response = await generateResponse(inputValue, 'ethiker');
      }
      
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

  const getRandomTopic = () => {
    const topics = [
      'ethics and philosophical considerations',
      'practical solutions to everyday problems',
      'academic research and analysis',
      'social activism and community engagement',
      'technology and systems optimization'
    ];
    return topics[Math.floor(Math.random() * topics.length)];
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
          {modelStatus.loading && (
            <div className="ml-auto text-xs flex items-center gap-1 text-amber-500">
              <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse"></div>
              <span>Loading Model...</span>
            </div>
          )}
          {modelStatus.error && (
            <div className="ml-auto text-xs flex items-center gap-1 text-red-500">
              <AlertTriangle className="w-3 h-3" />
              <span>Model Error - Using Fallback</span>
            </div>
          )}
        </CardTitle>
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
                    ? 'bg-amber-100 text-amber-800 text-xs px-2 py-1'
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
              disabled={isProcessing || modelStatus.loading}
              className="flex-1"
            />
            <Button 
              type="submit" 
              size="icon" 
              disabled={isProcessing || modelStatus.loading}
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
