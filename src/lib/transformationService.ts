
import { applyDNA, enhanceTransformation } from './dnaService';
import { transformThoughtWithLLM } from './webLLMService';

export interface TransformationRequest {
  thought: string;
  audience: string;
}

// Enhanced transformation service that uses pattern-based responses
export async function transformThought(request: TransformationRequest): Promise<string> {
  const { thought, audience } = request;
  
  try {
    // Use our enhanced pattern-based transformation
    const baseTransformation = await transformThoughtWithLLM(thought, audience as any);
    
    // Enhance the transformation with DNA concepts
    return enhanceTransformation(baseTransformation, thought, audience);
  } catch (error) {
    console.error("Transformation failed:", error);
    
    // More sophisticated fallback responses based on audience
    let baseTransformation = "";
    
    switch(audience) {
      case "ethiker":
        baseTransformation = `From an ethical perspective, your thought "${thought}" invites us to reflect on values of human dignity and moral principles. How might different ethical frameworks help us navigate this complexity?`;
        break;
      case "pragmatiker":
        baseTransformation = `Looking at "${thought}" practically, we should focus on measurable outcomes and efficient implementation. What specific steps would lead to the most effective resolution of this matter?`;
        break;
      case "akademiker":
        baseTransformation = `The concept of "${thought}" can be analyzed through multiple theoretical frameworks, with recent studies suggesting interesting correlations between this phenomenon and broader societal trends.`;
        break;
      case "aktivisten":
        baseTransformation = `Your thought on "${thought}" highlights an issue that demands collective action! We need to mobilize communities and build solidarity networks to address this challenge effectively.`;
        break;
      case "technologen":
        baseTransformation = `Analyzing "${thought}" from a systems perspective reveals opportunities for technological innovation. A well-designed architecture could address these challenges through data-driven approaches.`;
        break;
      default:
        baseTransformation = `Your thought "${thought}" is interesting and can be viewed from multiple perspectives. Consider how different audiences might interpret and engage with these ideas.`;
    }
    
    // Enhance the transformation with DNA concepts
    return enhanceTransformation(baseTransformation, thought, audience);
  }
}
