
import React, { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import ThoughtInput from '@/components/ThoughtInput';
import AudienceSelector from '@/components/AudienceSelector';
import TransformationProcess from '@/components/TransformationProcess';
import TransformedOutput from '@/components/TransformedOutput';
import ExampleSection from '@/components/ExampleSection';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { audiences, exampleTransformations } from '@/data/audienceData';
import { transformThought } from '@/lib/transformationService';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [rawThought, setRawThought] = useState('');
  const [selectedAudience, setSelectedAudience] = useState('');
  const [transformedOutput, setTransformedOutput] = useState('');
  const [isTransforming, setIsTransforming] = useState(false);
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
    
    try {
      const result = await transformThought({
        thought: rawThought,
        audience: selectedAudience
      });
      
      setTransformedOutput(result);
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
        
        <ExampleSection examples={exampleTransformations} onUseExample={handleUseExample} />
      </div>
    </div>
  );
};

export default Index;
