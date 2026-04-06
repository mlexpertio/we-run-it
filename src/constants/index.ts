export const CONTEXT_PRESETS = [
  { label: '8k', value: 8192 },
  { label: '16k', value: 16384 },
  { label: '32k', value: 32768 },
  { label: '64k', value: 65536 },
  { label: '128k', value: 131072 },
  { label: '256k', value: 262144 },
  { label: '512k', value: 524288 },
  { label: '1M', value: 1048576 },
];

export const QUANTIZATION_LEVELS: { label: string; bytesPerParam: number }[] = [
  { label: '4-bit', bytesPerParam: 0.5 },
  { label: '8-bit', bytesPerParam: 1 },
  { label: '16-bit (FP16)', bytesPerParam: 2 },
  { label: '32-bit (FP32)', bytesPerParam: 4 },
];

export const HARDWARE_PROFILES: HardwareProfile[] = [
  { name: 'RTX 3060 (12GB)', vramGb: 12 },
  { name: 'RTX 3090 (24GB)', vramGb: 24 },
  { name: 'RTX 4090 (24GB)', vramGb: 24 },
  { name: 'A10 (24GB)', vramGb: 24 },
  { name: 'A100 (40GB)', vramGb: 40 },
  { name: 'A100 (80GB)', vramGb: 80 },
  
  // Mac M-series
  { name: 'Mac M1 (8GB)', vramGb: 8 },
  { name: 'Mac M1 Max (32GB)', vramGb: 32 },
  { name: 'Mac M1 Ultra (64GB)', vramGb: 64 },
  { name: 'Mac M2 (16GB)', vramGb: 16 },
  { name: 'Mac M2 Max (32GB)', vramGb: 32 },
  { name: 'Mac M2 Ultra (76GB)', vramGb: 76 },
  { name: 'Mac M3 (24GB)', vramGb: 24 },
  { name: 'Mac M3 Max (48GB)', vramGb: 48 },
  { name: 'Mac M3 Ultra (128GB)', vramGb: 128 },
  
  // High end
  { name: 'H100 (80GB)', vramGb: 80 },
];
