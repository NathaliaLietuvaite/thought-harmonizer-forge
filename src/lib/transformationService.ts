
import { applyDNA, enhanceTransformation } from './dnaService';
import { transformThoughtWithLLM } from './webLLMService';

export interface TransformationRequest {
  thought: string;
  audience: string;
}

// Transformation service that now uses WebLLM when available
export async function transformThought(request: TransformationRequest): Promise<string> {
  const { thought, audience } = request;
  
  try {
    // First try to use the WebLLM for transformation
    const llmTransformation = await transformThoughtWithLLM(thought, audience as any);
    
    // Enhance the transformation with DNA concepts
    return enhanceTransformation(llmTransformation, thought, audience);
  } catch (error) {
    console.error("WebLLM transformation failed, falling back to mock data:", error);
    
    // Fallback to mock transformations if WebLLM fails
    let baseTransformation = "";
    
    switch(audience) {
      case "ethiker":
        baseTransformation = `From an ethical perspective, your thought "${thought}" raises important questions about values and principles. Consider how this impacts human dignity and what philosophical frameworks might help us understand the ethical implications.`;
        break;
        
      case "pragmatiker":
        baseTransformation = `Looking at "${thought}" practically, we should focus on actionable solutions. Here are some tangible steps to address this situation, focusing on efficiency and real-world outcomes.`;
        break;
        
      case "akademiker": 
        baseTransformation = `The statement "${thought}" can be analyzed through multiple theoretical frameworks. Recent studies by fictional researchers Smith et al. (2024) suggest that this phenomenon correlates with societal trends in ways that merit further investigation.`;
        break;
        
      case "aktivisten":
        baseTransformation = `"${thought}" highlights a critical issue requiring community action! This isn't just an individual concern but a collective challenge that demands our voices be heard. Join the movement to address this important matter!`;
        break;
        
      case "technologen":
        baseTransformation = `Analyzing "${thought}" from a technical perspective reveals opportunities for system optimization. By implementing smart algorithms and leveraging digital infrastructure, we can develop an efficient solution architecture.`;
        break;
        
      default:
        baseTransformation = `Your thought "${thought}" offers interesting perspectives that can be viewed from multiple angles depending on your audience and goals.`;
    }
    
    // Enhance the transformation with DNA concepts
    return enhanceTransformation(baseTransformation, thought, audience);
  }
}
