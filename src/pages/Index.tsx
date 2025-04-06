
import React, { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import ThoughtInput from '@/components/ThoughtInput';
import AudienceSelector from '@/components/AudienceSelector';
import TransformationProcess from '@/components/TransformationProcess';
import TransformedOutput from '@/components/TransformedOutput';
import DNAInsights from '@/components/DNAInsights';
import ExampleSection from '@/components/ExampleSection';
import NathaliaChatbot from '@/components/NathaliaChatbot';
import CollaboratorList from '@/components/CollaboratorList';
import { Button } from '@/components/ui/button';
import { RefreshCw, MessageSquare, X, Users } from 'lucide-react';
import { audiences, exampleTransformations } from '@/data/audienceData';
import { transformThought } from '@/lib/transformationService';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [rawThought, setRawThought] = useState('');
  const [selectedAudience, setSelectedAudience] = useState('');
  const [transformedOutput, setTransformedOutput] = useState('');
  const [isTransforming, setIsTransforming] = useState(false);
  const [showDNAInsights, setShowDNAInsights] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showCollaborators, setShowCollaborators] = useState(false);
  const { toast } = useToast();

  const handleTransform = async () => {
    if (!rawThought.trim()) {
      toast({
        title: 'Empty thought',
        description: 'Please enter a thought to transform.',
        variant: 'destructive',
      });
      return;
    }
    
    if (!selectedAudience) {
      toast({
        title: 'No audience selected',
        description: 'Please select a target audience for your thought.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsTransforming(true);
    setTransformedOutput('');
    setShowDNAInsights(false);
    
    try {
      const result = await transformThought({
        thought: rawThought,
        audience: selectedAudience
      });
      
      setTransformedOutput(result);
      setShowDNAInsights(true);
    } catch (error) {
      console.error('Transformation error:', error);
      toast({
        title: 'Transformation failed',
        description: 'Something went wrong during the transformation process.',
        variant: 'destructive',
      });
    } finally {
      setIsTransforming(false);
    }
  };
  
  const handleUseExample = (thought: string, audienceLabel: string) => {
    setRawThought(thought);
    
    // Find the audience ID that matches the label
    const audience = audiences.find(a => a.name === audienceLabel);
    if (audience) {
      setSelectedAudience(audience.id);
    }
    
    // Scroll back to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pb-12 bg-background bg-gradient-dots bg-[length:20px_20px]">
      <div className="container max-w-4xl pt-12">
        <HeroSection />
        
        {/* Centered chatbot button with image */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4">
            <img 
              src="/lovable-uploads/91f3022e-b9e1-4779-921a-4767df6485e2.png" 
              alt="Nathalia" 
              className="w-[150px] h-[150px] rounded-full cursor-pointer object-cover border-2 border-harmony-purple shadow-md hover:border-harmony-teal transition-colors duration-300"
              onClick={() => setShowChatbot(true)}
            />
            <Button
              variant="outline"
              size="lg"
              className="flex items-center gap-2 px-6 py-6 border-2 border-harmony-purple hover:border-harmony-teal hover:bg-accent/50 transition-all"
              onClick={() => setShowChatbot(!showChatbot)}
            >
              {showChatbot ? (
                <>
                  <X className="w-5 h-5" />
                  <span className="text-lg">Nathalia schließen</span>
                </>
              ) : (
                <>
                  <MessageSquare className="w-5 h-5" />
                  <span className="text-lg">Mit Nathalia chatten</span>
                </>
              )}
            </Button>
          </div>
        </div>
        
        {/* Collaboration toggle button */}
        <div className="flex justify-end mb-4">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setShowCollaborators(!showCollaborators)}
          >
            <Users className="w-4 h-4" />
            <span>{showCollaborators ? 'Kollaboration ausblenden' : 'Kollaboration anzeigen'}</span>
          </Button>
        </div>
        
        {/* Show collaborator list if enabled */}
        {showCollaborators && (
          <div className="mb-6">
            <CollaboratorList />
          </div>
        )}
        
        {showChatbot ? (
          <NathaliaChatbot />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ThoughtInput thought={rawThought} setThought={setRawThought} />
              <AudienceSelector 
                selectedAudience={selectedAudience} 
                setSelectedAudience={setSelectedAudience}
                audiences={audiences}
              />
            </div>
            
            <div className="mt-2 flex justify-center">
              <Button 
                size="lg" 
                className="relative overflow-hidden group" 
                onClick={handleTransform}
                disabled={isTransforming}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isTransforming ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Transforming...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4" />
                      <span>Transform Thought</span>
                    </>
                  )}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-harmony-blue via-harmony-purple to-harmony-teal opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </div>
            
            <TransformationProcess isTransforming={isTransforming} />
            <TransformedOutput output={transformedOutput} isLoading={isTransforming} />
            <DNAInsights audience={selectedAudience} visible={showDNAInsights} />
            
            <ExampleSection examples={exampleTransformations} onUseExample={handleUseExample} />
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
