import { Quantization, HardwareProfile, CalculationResults } from '../types';
import { QUANTIZATION_LEVELS } from '../constants';

export function calculateInference(
  paramsInBillions: number,
  quantizationLabel: string,
  contextTokens: number,
  targetHardwareName?: string
): CalculationResults {
  const quantization = QUANTIZATION_LEVELS.find(q => q.label === quantizationLabel);
  const bytesPerParam = quantization ? quantization.bytesPerParam : 2;

  // Model weights in GB
  const modelWeightsGb = paramsInBillions * bytesPerParam;

  // KV Cache approximation (simplified)
  // Formula: 2 * layers * num_heads * head_dim * context_tokens * bytes_per_element
  // For a generic estimate, we'll use a simplified factor for context
  // 1 billion tokens context at FP16 is roughly 2GB per billion tokens for a 7B model
  // Let's use a more robust but simple approximation:
  // cache_gb = (2 * context_tokens * hidden_dim_factor * bytes_per_param) / 1e9
  // As a rule of thumb for V1: 
  const kvCacheGb = (contextTokens / 1000) * 0.01; // Very rough approximation for V1

  const totalRequiredGb = modelWeightsGb + kvCacheGb;

  let status: CalculationResults['status'] = 'success';
  
  // If we have a hardware profile, check against it
  // In a real app, we'd look up the profile by name
  // For now, let's assume the user passed the hardware name and we'll find it
  // This is a bit hacky for V1 but works for the logic
  
  return {
    modelWeightsGb,
    kvCacheGb,
    totalRequiredGb,
    status: 'success' // We'll determine status in the component based on comparison
  };
}

export function getStatus(requiredGb: number, hardwareGb?: number): 'success' | 'warning' | 'error' {
  if (!hardwareGb) return 'success';
  
  const margin = 0.9; // 10% safety margin
  if (requiredGb > hardwareGb) {
    return 'error';
  } else if (requiredGb > hardwareGb * margin) {
    return 'warning';
  }
  return 'success';
}
