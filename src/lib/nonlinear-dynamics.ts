/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * MASKIL PROTOCOL - NONLINEAR DYNAMICS ENGINE
 * 
 * Implements novel emergent behaviors from higher dimensional planes
 * Chaos theory, strange attractors, and bifurcation analysis
 */

import { Trit, BalancedTernaryALU, HigherRadixEngine } from './higher-radix-engine';

/**
 * Lorenz Attractor parameters
 * Classic chaotic system exhibiting butterfly effect
 */
export interface LorenzParams {
  sigma: number;  // Prandtl number (typically 10)
  rho: number;    // Rayleigh number (typically 28)
  beta: number;   // Geometric factor (typically 8/3)
}

/**
 * State vector in 3D phase space
 */
export interface PhaseState {
  x: number;
  y: number;
  z: number;
  t: number;
}

/**
 * Bifurcation point detection
 */
export interface BifurcationPoint {
  parameter: number;
  type: 'period-doubling' | 'transcritical' | 'pitchfork' | 'saddle-node';
  stability: 'stable' | 'unstable' | 'semi-stable';
  dimensionEmergence: number;
}

/**
 * Strange Attractor Engine
 * Generates trajectories through phase space
 */
export class StrangeAttractorEngine {
  private params: LorenzParams;
  private alu: BalancedTernaryALU;
  
  constructor(params: LorenzParams = { sigma: 10, rho: 28, beta: 8/3 }) {
    this.params = params;
    this.alu = new BalancedTernaryALU();
  }
  
  /**
   * Compute one step of Lorenz system using Runge-Kutta 4
   */
  step(state: PhaseState, dt: number = 0.01): PhaseState {
    const { sigma, rho, beta } = this.params;
    
    // Lorenz equations
    const dxdt = (x: number, y: number, z: number) => sigma * (y - x);
    const dydt = (x: number, y: number, z: number) => x * (rho - z) - y;
    const dzdt = (x: number, y: number, z: number) => x * y - beta * z;
    
    // RK4 integration
    const k1x = dxdt(state.x, state.y, state.z);
    const k1y = dydt(state.x, state.y, state.z);
    const k1z = dzdt(state.x, state.y, state.z);
    
    const k2x = dxdt(state.x + 0.5 * dt * k1x, state.y + 0.5 * dt * k1y, state.z + 0.5 * dt * k1z);
    const k2y = dydt(state.x + 0.5 * dt * k1x, state.y + 0.5 * dt * k1y, state.z + 0.5 * dt * k1z);
    const k2z = dzdt(state.x + 0.5 * dt * k1x, state.y + 0.5 * dt * k1y, state.z + 0.5 * dt * k1z);
    
    const k3x = dxdt(state.x + 0.5 * dt * k2x, state.y + 0.5 * dt * k2y, state.z + 0.5 * dt * k2z);
    const k3y = dydt(state.x + 0.5 * dt * k2x, state.y + 0.5 * dt * k2y, state.z + 0.5 * dt * k2z);
    const k3z = dzdt(state.x + 0.5 * dt * k2x, state.y + 0.5 * dt * k2y, state.z + 0.5 * dt * k2z);
    
    const k4x = dxdt(state.x + dt * k3x, state.y + dt * k3y, state.z + dt * k3z);
    const k4y = dydt(state.x + dt * k3x, state.y + dt * k3y, state.z + dt * k3z);
    const k4z = dzdt(state.x + dt * k3x, state.y + dt * k3y, state.z + dt * k3z);
    
    return {
      x: state.x + (dt / 6) * (k1x + 2*k2x + 2*k3x + k4x),
      y: state.y + (dt / 6) * (k1y + 2*k2y + 2*k3y + k4y),
      z: state.z + (dt / 6) * (k1z + 2*k2z + 2*k3z + k4z),
      t: state.t + dt
    };
  }
  
  /**
   * Generate full trajectory
   */
  generateTrajectory(initialState: PhaseState, steps: number, dt: number = 0.01): PhaseState[] {
    const trajectory: PhaseState[] = [initialState];
    let currentState = initialState;
    
    for (let i = 0; i < steps; i++) {
      currentState = this.step(currentState, dt);
      trajectory.push(currentState);
    }
    
    return trajectory;
  }
  
  /**
   * Convert trajectory to balanced ternary representation
   * Reveals hidden patterns in phase space
   */
  trajectoryToTernary(trajectory: PhaseState[], precision: number = 9): Trit[][] {
    return trajectory.map(state => {
      const scaledX = Math.round(state.x * 1000);
      const trits = HigherRadixEngine.toBase(Math.abs(scaledX), 3);
      
      // Convert to balanced ternary
      while (trits.length < precision) trits.push(0);
      trits.splice(precision);
      
      return trits.map((d, i) => {
        if (scaledX < 0 && i === 0) return (-d) as Trit;
        return d as Trit;
      });
    });
  }
  
  /**
   * Calculate Lyapunov exponent (measure of chaos)
   * Positive exponent indicates chaotic behavior
   */
  calculateLyapunovExponent(trajectory: PhaseState[], epsilon: number = 1e-8): number {
    if (trajectory.length < 2) return 0;
    
    let sumLog = 0;
    let count = 0;
    
    for (let i = 0; i < trajectory.length - 1; i++) {
      const state = trajectory[i];
      const nextState = trajectory[i + 1];
      
      // Estimate local divergence rate
      const dx = nextState.x - state.x;
      const dy = nextState.y - state.y;
      const dz = nextState.z - state.z;
      
      const distance = Math.sqrt(dx*dx + dy*dy + dz*dz);
      
      if (distance > epsilon) {
        sumLog += Math.log(distance / epsilon);
        count++;
      }
    }
    
    return count > 0 ? sumLog / count : 0;
  }
  
  /**
   * Detect bifurcation points by varying rho parameter
   */
  detectBifurcations(rhoRange: [number, number], steps: number = 100): BifurcationPoint[] {
    const bifurcations: BifurcationPoint[] = [];
    const [rhoMin, rhoMax] = rhoRange;
    
    let previousStability: 'stable' | 'unstable' | null = null;
    
    for (let i = 0; i <= steps; i++) {
      const rho = rhoMin + (rhoMax - rhoMin) * (i / steps);
      this.params = { ...this.params, rho };
      
      // Generate short trajectory to assess stability
      const trajectory = this.generateTrajectory({ x: 1, y: 1, z: 1, t: 0 }, 500, 0.05);
      const lyapunov = this.calculateLyapunovExponent(trajectory);
      
      const currentStability: 'stable' | 'unstable' = lyapunov > 0 ? 'unstable' : 'stable';
      
      // Detect transition
      if (previousStability !== null && previousStability !== currentStability) {
        bifurcations.push({
          parameter: rho,
          type: currentStability === 'unstable' ? 'period-doubling' : 'saddle-node',
          stability: currentStability,
          dimensionEmergence: lyapunov > 0 ? 3 + Math.floor(lyapunov * 10) : 2
        });
      }
      
      previousStability = currentStability;
    }
    
    return bifurcations;
  }
}

/**
 * Mandelbrot Set Generator in Balanced Ternary Space
 * Maps complex plane to ternary representations
 */
export class TernaryMandelbrot {
  static readonly MAX_ITERATIONS = 256;
  
  /**
   * Check if a point escapes the Mandelbrot set
   * Returns iteration count at escape (or max iterations if bounded)
   */
  static checkPoint(cx: number, cy: number, maxIter: number = this.MAX_ITERATIONS): {
    iterations: number;
    escaped: boolean;
    ternarySignature: Trit[];
  } {
    let zx = 0;
    let zy = 0;
    let iteration = 0;
    
    while (zx*zx + zy*zy < 4 && iteration < maxIter) {
      const tempX = zx*zx - zy*zy + cx;
      zy = 2*zx*zy + cy;
      zx = tempX;
      iteration++;
    }
    
    // Generate ternary signature from final position
    const signature: Trit[] = [];
    if (iteration < maxIter) {
      const magnitude = Math.sqrt(zx*zx + zy*zy);
      const ternaryRep = HigherRadixEngine.toBase(Math.round(magnitude * 1000), 3);
      
      for (let i = 0; i < 9; i++) {
        signature.push((ternaryRep[i] || 0) as Trit);
      }
    }
    
    return {
      iterations: iteration,
      escaped: iteration < maxIter,
      ternarySignature: signature
    };
  }
  
  /**
   * Generate full Mandelbrot image data
   */
  static generateImage(
    width: number,
    height: number,
    centerX: number = -0.5,
    centerY: number = 0,
    zoom: number = 1
  ): {
    imageData: Uint8Array;
    ternaryPatterns: Map<string, number>;
  } {
    const imageData = new Uint8Array(width * height * 4);
    const ternaryPatterns = new Map<string, number>();
    
    const xMin = centerX - 2 / zoom;
    const yMin = centerY - 2 / zoom;
    const xMax = centerX + 2 / zoom;
    const yMax = centerY + 2 / zoom;
    
    const dx = (xMax - xMin) / width;
    const dy = (yMax - yMin) / height;
    
    for (let py = 0; py < height; py++) {
      for (let px = 0; px < width; px++) {
        const cx = xMin + px * dx;
        const cy = yMin + py * dy;
        
        const result = this.checkPoint(cx, cy);
        
        const idx = (py * width + px) * 4;
        
        if (result.escaped) {
          // Color based on iteration count and ternary pattern
          const hue = (result.iterations * 5 + result.ternarySignature.reduce((a, b) => a + b, 0) * 10) % 360;
          imageData[idx] = hue % 256;     // R (hue proxy)
          imageData[idx + 1] = ((hue + 120) % 360) % 256;  // G
          imageData[idx + 2] = ((hue + 240) % 360) % 256;  // B
          imageData[idx + 3] = 255;        // A
          
          // Track ternary pattern frequency
          const patternKey = result.ternarySignature.join('');
          ternaryPatterns.set(patternKey, (ternaryPatterns.get(patternKey) || 0) + 1);
        } else {
          // Inside the set - black
          imageData[idx] = 0;
          imageData[idx + 1] = 0;
          imageData[idx + 2] = 0;
          imageData[idx + 3] = 255;
        }
      }
    }
    
    return { imageData, ternaryPatterns };
  }
}

/**
 * Hyperdimensional Projection Engine
 * Projects n-dimensional objects into 3D visualization space
 */
export interface HyperPoint {
  coordinates: number[];
  value?: number;
}

export class HyperdimensionalProjection {
  /**
   * Project 4D point to 3D using perspective projection
   */
  static project4Dto3D(point: HyperPoint, wDistance: number = 5): { x: number; y: number; z: number; scale: number } {
    const [x, y, z, w] = point.coordinates;
    const scale = wDistance / (wDistance - w);
    
    return {
      x: x * scale,
      y: y * scale,
      z: z * scale,
      scale
    };
  }
  
  /**
   * Project 5D+ point to 3D using sequential projections
   */
  static projectHyperTo3D(point: HyperPoint, viewAngles: number[] = []): { x: number; y: number; z: number } {
    const dims = point.coordinates.length;
    let coords = [...point.coordinates];
    
    // Apply rotation matrices for each pair of dimensions
    for (let i = 0; i < Math.min(dims - 1, viewAngles.length); i++) {
      const angle = viewAngles[i] || 0;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      
      const [a, b] = [coords[i], coords[i + 1]];
      coords[i] = a * cos - b * sin;
      coords[i + 1] = a * sin + b * cos;
    }
    
    // Sequential perspective projection from highest dimension down
    let wDistance = 5;
    for (let d = dims - 1; d >= 3; d--) {
      const scale = wDistance / (wDistance - coords[d]);
      for (let i = 0; i < d; i++) {
        coords[i] *= scale;
      }
      coords.pop();
    }
    
    return { x: coords[0], y: coords[1], z: coords[2] };
  }
  
  /**
   * Generate tesseract (4D hypercube) vertices
   */
  static generateTesseract(size: number = 1): HyperPoint[] {
    const vertices: HyperPoint[] = [];
    
    for (let i = 0; i < 16; i++) {
      const x = (i & 1) ? size : -size;
      const y = (i & 2) ? size : -size;
      const z = (i & 4) ? size : -size;
      const w = (i & 8) ? size : -size;
      
      vertices.push({
        coordinates: [x, y, z, w],
        value: i
      });
    }
    
    return vertices;
  }
  
  /**
   * Generate 5D simplex vertices
   */
  static generate5DSimplex(size: number = 1): HyperPoint[] {
    // 5D simplex has 6 vertices
    const vertices: HyperPoint[] = [
      { coordinates: [size, 0, 0, 0, 0] },
      { coordinates: [-size/2, size * Math.sqrt(3)/2, 0, 0, 0] },
      { coordinates: [-size/2, -size * Math.sqrt(3)/2, 0, 0, 0] },
      { coordinates: [0, 0, size * Math.sqrt(2/3), 0, 0] },
      { coordinates: [0, 0, -size * Math.sqrt(1/6), size * Math.sqrt(5/24), 0] },
      { coordinates: [0, 0, -size * Math.sqrt(1/6), -size * Math.sqrt(5/24), size * Math.sqrt(7/40)] }
    ];
    
    return vertices;
  }
}

/**
 * Emergence Detector
 * Identifies when simple rules produce complex global patterns
 */
export interface EmergenceMetrics {
  complexity: number;      // 0-1 scale
  selfOrganization: number; // 0-1 scale
  adaptivity: number;       // 0-1 scale
  noveltyScore: number;     // 0-1 scale
  dimensionalShift: number; // Estimated dimension change
}

export class EmergenceDetector {
  /**
   * Analyze a system state for emergent properties
   */
  static analyzeSystem<T>(
    states: T[],
    interactionMatrix: number[][],
    baselineComplexity: number = 0.1
  ): EmergenceMetrics {
    const n = states.length;
    
    // Calculate complexity from interaction matrix entropy
    const flatInteractions = interactionMatrix.flat().filter(x => x !== 0);
    const totalInteraction = flatInteractions.reduce((a, b) => a + Math.abs(b), 0);
    const normalizedInteractions = flatInteractions.map(x => Math.abs(x) / (totalInteraction || 1));
    
    let entropy = 0;
    for (const p of normalizedInteractions) {
      if (p > 0) entropy -= p * Math.log2(p);
    }
    
    const maxEntropy = Math.log2(flatInteractions.length || 1);
    const complexity = entropy / (maxEntropy || 1);
    
    // Self-organization: measure of structure formation
    const eigenvalues = this.computeEigenvalues(interactionMatrix);
    const dominantEigenvalue = Math.max(...eigenvalues.map(e => Math.abs(e)));
    const selfOrganization = Math.min(1, dominantEigenvalue / n);
    
    // Adaptivity: variance in response to perturbation
    const perturbations = states.map(() => Math.random() * 0.1 - 0.05);
    const responses = perturbations.map((p, i) => {
      return interactionMatrix[i]?.reduce((sum, val, j) => sum + val * perturbations[j], 0) || 0;
    });
    const responseVariance = this.variance(responses);
    const adaptivity = Math.min(1, responseVariance * 10);
    
    // Novelty: deviation from baseline
    const noveltyScore = Math.min(1, (complexity - baselineComplexity) / (1 - baselineComplexity));
    
    // Dimensional shift estimate
    const dimensionalShift = complexity > 0.7 ? Math.floor(complexity * 5) - 2 : 0;
    
    return {
      complexity,
      selfOrganization,
      adaptivity,
      noveltyScore,
      dimensionalShift
    };
  }
  
  private static computeEigenvalues(matrix: number[][]): number[] {
    // Simplified: use trace as proxy for sum of eigenvalues
    const trace = matrix.reduce((sum, row, i) => sum + (row[i] || 0), 0);
    const n = matrix.length;
    
    // Return approximate eigenvalues (diagonal elements for simplicity)
    return matrix.map((row, i) => row[i] || 0);
  }
  
  private static variance(values: number[]): number {
    if (values.length === 0) return 0;
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    return values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length;
  }
}

// Export constants
export const ATTRACTOR_TYPES = {
  LORENZ: 'Lorenz',
  ROSSLER: 'Rössler',
  CHEN: 'Chen',
  THOMAS: 'Thomas'
} as const;

export const DIMENSIONAL_PLANES = {
  PHYSICAL: 3,
  TEMPORAL: 4,
  INFORMATIONAL: 5,
  CONSCIOUSNESS: 6,
  ARCHETYPAL: 7,
  UNITY: 8
} as const;
