# MVP Plan: LLM Inference Resource Calculator

## Core Value Proposition
Provide instant visibility into VRAM requirements and hardware compatibility for LLM deployment.

## Target Audience
AI Engineers, DevOps, and Researchers needing quick hardware feasibility checks.

## Minimum Lovable Product (MLP) Features

### 1. Inputs (The "Configuration" Section)
*   **Model Parameter Count:** Numeric input (e.g., 7, 70, 405).
*   **Quantization Level:** Selection of precision (4-bit, 8-bit, 16-bit/FP16).
*   **Context Window (Tokens):** Input for KV Cache impact (e.g., 8k, 32k, 128k).

### 2. Outputs (The "Results" Section)
*   **Estimated VRAM Breakdown:**
    *   Model Weights (GB)
    *   KV Cache (GB)
    *   **Total Required VRAM (GB)**
*   **Hardware Profile (Optional):** A dropdown to select a target GPU/Hardware (e.g., RTX 4090, A100, Mac M2 Ultra) to perform the compatibility check against.
*   **Reactive Updates:** Results update instantly as inputs change (no "Submit" button).

## Technical Stack
*   **Framework:** Next.js (App Router)
*   **Styling:** Tailwind CSS + Shadcn/UI
*   **State Management:** React `useState`
*   **Logic:** Pure JavaScript/TypeScript utility functions for memory math.

## Design Principles
*   **Minimalist & Clean:** Card-based, single-page interface.
*   **Split View:** Controls on the left, Live Dashboard on the right.
*   **Color Coded:** Semantic use of colors (Green/Amber/Red) for hardware status.

## Out of Scope for V1 (V2 Roadmap)
*   MoE (Mixture of Experts) specific architecture logic.
*   Multi-GPU/Tensor Parallelism calculations.
*   User accounts/saved presets.
*   HuggingFace API integration.
