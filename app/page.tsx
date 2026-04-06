'use client';

import React, { useState, useMemo } from 'react';
import { 
  QUANTIZATION_LEVELS, 
  HARDWARE_PROFILES 
} from '@/src/constants';
import { 
  calculateInference, 
  getStatus 
} from '@/src/lib/calculator';
import { 
  Quantization 
} from '@/src/types';

export default function CalculatorPage() {
  const [params, setParams] = useState<number>(7);
  const [quantization, setQuantization] = useState<Quantization>('4-bit');
  const [context, setContext] = useState<number>(8192);
  const [selectedHardware, setSelectedHardware] = useState<string>('');

  const results = useMemo(() => {
    const calc = calculateInference(params, quantization, context);
    const hardware = HARDWARE_PROFILES.find(h => h.name === selectedHardware);
    const status = getStatus(calc.totalRequiredGb, hardware?.vramGb);
    
    return { ...calc, status, hardwareVram: hardware?.vramGb };
  }, [params, quantization, context, selectedHardware]);

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 text-slate-900">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            LLM Inference Calculator
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Estimate VRAM requirements and hardware compatibility instantly.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inputs Section */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-semibold mb-6">Configuration</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Model Parameters (Billions)
                </label>
                <input
                  type="number"
                  value={params}
                  onChange={(e) => setParams(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Quantization
                </label>
                <select
                  value={quantization}
                  onChange={(e) => setQuantization(e.target.value as Quantization)}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                >
                  {QUANTIZATION_LEVELS.map((q) => (
                    <option key={q.label} value={q.label}>
                      {q.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Context Window (Tokens)
                </label>
                <input
                  type="number"
                  value={context}
                  onChange={(e) => setContext(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Target Hardware (Optional)
                </label>
                <select
                  value={selectedHardware}
                  onChange={(e) => setSelectedHardware(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select Hardware...</option>
                  {HARDWARE_PROFILES.map((h) => (
                    <option key={h.name} value={h.name}>
                      {h.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Results Section */}
          <section className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-xl font-semibold mb-6 text-slate-400">Live Results</h2>
            
            <div className="space-y-8">
              <div className="flex justify-between items-end border-b border-slate-800 pb-4">
                <span className="text-slate-400">Model Weights</span>
                <span className="text-2xl font-mono">{results.modelWeightsGb.toFixed(2)} GB</span>
              </div>

              <div className="flex justify-between items-end border-b border-slate-800 pb-4">
                <span className="text-slate-400">KV Cache (Est.)</span>
                <span className="text-2xl font-mono">{results.kvCacheGb.toFixed(2)} GB</span>
              </div>

              <div className="pt-4">
                <div className="text-4xl font-extrabold text-white">
                  {results.totalRequiredGb.toFixed(2)} GB
                </div>
                <span className="text-sm text-slate-500 uppercase tracking-wider">Total VRAM Required</span>
              </div>

              {selectedHardware && (
                <div className={`mt-8 p-4 rounded-xl border ${
                  results.status === 'error' ? 'bg-red-500/10 border-red-500 text-red-500' :
                  results.status === 'warning' ? 'bg-amber-500/10 border-amber-500 text-amber-500' :
                  'bg-emerald-500/10 border-emerald-500 text-emerald-500'
                }`}>
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-bold">
                      {results.status === 'error' ? '❌ Incompatible' : 
                       results.status === 'warning' ? '⚠️ Tight Fit' : '✅ Compatible'}
                    </span>
                  </div>
                  <p className="mt-1 text-sm opacity-80">
                    {results.hardwareVram 
                      ? `Targeting ${selectedHardware} (${results.hardwareVram}GB)` 
                      : 'Select hardware to check compatibility'}
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
