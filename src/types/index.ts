export type Quantization = '4-bit' | '8-bit' | '16-bit' | '32-bit';

export interface HardwareProfile {
  name: string;
  vramGb: number;
}

export interface CalculationResults {
  modelWeightsGb: number;
  kvCacheGb: number;
  totalRequiredGb: number;
  status: 'success' | 'warning' | 'error';
}
