import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js to use WebGPU if available
env.useBrowserCache = true;
env.allowLocalModels = false;

// Model configurations
const TEXT_GENERATION_MODEL = "TinyLlama/TinyLlama-1.1B-Chat-v1.0";
const FALLBACK_MODEL = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"; // Same model as primary for now

// Types
type AudienceType = 'ethiker' | 'pragmatiker' | 'akademiker' | 'aktivisten' | 'technologen';

// Audience-specific prompts
const audiencePrompts: Record<string, string> = {
  ethiker: "You are a philosophical ethicist. Respond to this thought with ethical considerations, moral principles, and references to philosophical frameworks. Focus on values, dignity, and ethical implications: ",
  pragmatiker: "You are a practical problem-solver. Respond to this thought with concrete solutions, actionable steps, and realistic considerations. Focus on efficiency, utility, and tangible outcomes: ",
  akademiker: "You are an academic researcher. Respond to this thought with theoretical analysis, references to research, and methodological considerations. Use academic language and cite fictional studies: ",
  aktivisten: "You are a passionate activist. Respond to this thought with calls to action, community-focused perspectives, and social justice frameworks. Be inspiring and engaging: ",
  technologen: "You are a technology specialist. Respond to this thought with systems thinking, technical solutions, and innovation frameworks. Use precise technical language and focus on optimization: "
};

// Loading state
let isModelLoading = false;
let generationPipeline: any = null;

/**
 * Initializes the WebLLM model for text generation
 */
export async function initializeWebLLM() {
  if (generationPipeline !== null) return generationPipeline;
  if (isModelLoading) return null;
  
  isModelLoading = true;
  
  try {
    console.log("Initializing WebLLM with model:", TEXT_GENERATION_MODEL);
    
    // Try to use WebGPU if available, fall back to WASM
    try {
      generationPipeline = await pipeline(
        'text-generation',
        TEXT_GENERATION_MODEL,
        { device: 'webgpu' }
      );
      console.log("WebLLM initialized with WebGPU");
    } catch (error) {
      console.warn("WebGPU not available, falling back to WASM", error);
      generationPipeline = await pipeline(
        'text-generation',
        FALLBACK_MODEL,
        { device: 'wasm' }
      );
      console.log("WebLLM initialized with WASM");
    }
    
    isModelLoading = false;
    return generationPipeline;
  } catch (error) {
    console.error("Failed to initialize WebLLM:", error);
    isModelLoading = false;
    throw error;
  }
}

/**
 * Generates a response based on the input text and audience type
 */
export async function generateResponse(input: string, audience: AudienceType): Promise<string> {
  try {
    const generator = await initializeWebLLM();
    if (!generator) {
      return "Model is still loading. Please try again in a moment.";
    }
    
    const prompt = audiencePrompts[audience] || "Respond to this thought: ";
    const fullPrompt = `<s>[INST] ${prompt}${input} [/INST]`;

    console.log("Generating response for prompt:", fullPrompt);
    
    const result = await generator(fullPrompt, {
      max_new_tokens: 256,
      temperature: 0.7,
      repetition_penalty: 1.2,
      top_p: 0.95,
    });
    
    let response = result[0].generated_text;
    
    // Clean up the response to extract just the generated part
    response = response.replace(fullPrompt, '').trim();
    
    console.log("Generated response:", response);
    return response;
  } catch (error) {
    console.error("Error generating response:", error);
    return "I encountered an error while processing your request. Please try again later.";
  }
}

/**
 * Transforms a thought according to the specified audience perspective using the WebLLM
 */
export async function transformThoughtWithLLM(thought: string, audience: AudienceType): Promise<string> {
  // For transformation, we use a more specific prompt
  const audienceSpecificPrompts: Record<string, string> = {
    ethiker: `Transform the following thought from an ethical perspective. Focus on moral implications, philosophical frameworks, and values-based reasoning: "${thought}"`,
    pragmatiker: `Transform the following thought from a pragmatic perspective. Focus on practical applications, solutions, and tangible outcomes: "${thought}"`,
    akademiker: `Transform the following thought from an academic perspective. Use scholarly language, cite fictional research, and maintain methodological rigor: "${thought}"`,
    aktivisten: `Transform the following thought from an activist perspective. Include calls to action, community empowerment, and social justice frameworks: "${thought}"`,
    technologen: `Transform the following thought from a technological perspective. Focus on systems thinking, innovation frameworks, and technical solutions: "${thought}"`
  };
  
  try {
    const generator = await initializeWebLLM();
    if (!generator) {
      return "Model is still loading. Please try again in a moment.";
    }
    
    const prompt = audienceSpecificPrompts[audience] || `Transform this thought for a general audience: "${thought}"`;
    const fullPrompt = `<s>[INST] ${prompt} [/INST]`;
    
    const result = await generator(fullPrompt, {
      max_new_tokens: 400,
      temperature: 0.8,
      repetition_penalty: 1.1,
      top_p: 0.92,
    });
    
    let response = result[0].generated_text;
    response = response.replace(fullPrompt, '').trim();
    
    return response;
  } catch (error) {
    console.error("Error transforming thought:", error);
    return `Failed to transform thought. Using fallback transformation for "${thought}" with audience ${audience}.`;
  }
}

// Check if WebGPU is available
export async function checkWebGPUSupport(): Promise<{supported: boolean, message: string}> {
  // Fix the navigator.gpu TypeScript error by using the 'any' type
  const nav = navigator as any;
  
  if (!nav.gpu) {
    return {
      supported: false,
      message: "WebGPU is not supported in your browser. Using WASM fallback (slower)."
    };
  }
  
  try {
    const adapter = await nav.gpu.requestAdapter();
    if (!adapter) {
      return {
        supported: false,
        message: "WebGPU adapter not available. Using WASM fallback (slower)."
      };
    }
    return {
      supported: true,
      message: "WebGPU is supported in your browser. Optimal performance enabled."
    };
  } catch (error) {
    return {
      supported: false,
      message: "Error checking WebGPU support. Using WASM fallback (slower)."
    };
  }
}
