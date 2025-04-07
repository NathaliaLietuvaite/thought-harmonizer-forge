
import { applyDNA, enhanceTransformation } from './dnaService';
import { transformThoughtWithLLM } from './webLLMService';

export interface TransformationRequest {
  thought: string;
  audience: string;
}

// Transformation service that uses a simplified approach without external models
export async function transformThought(request: TransformationRequest): Promise<string> {
  const { thought, audience } = request;
  
  try {
    // Use our pattern-based transformation
    const baseTransformation = await transformThoughtWithLLM(thought, audience as any);
    
    // Enhance the transformation with DNA concepts
    return enhanceTransformation(baseTransformation, thought, audience);
  } catch (error) {
    console.error("Transformation failed:", error);
    
    // Fallback to very simple transformations if all else fails
    let baseTransformation = `Your thought "${thought}" is interesting and can be viewed from multiple perspectives.`;
    
    // Enhance the transformation with DNA concepts
    return enhanceTransformation(baseTransformation, thought, audience);
  }
}
