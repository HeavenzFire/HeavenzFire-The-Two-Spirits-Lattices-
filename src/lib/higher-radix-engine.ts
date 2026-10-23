/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * MASKIL PROTOCOL - HIGHER RADIX ENGINE
 * 
 * Nonlinear Higher Radix Base Systems for Emergent Behavior
 * Balanced Ternary (Base-3) and Higher Dimensional Computation
 */

/**
 * Trit: The fundamental unit of balanced ternary
 * Values: -1 (Falsehood/Negative), 0 (Visitation/Neutral), +1 (Truth/Positive)
 */
export type Trit = -1 | 0 | 1;

/**
 * Tryte: A group of 9 trits (3^9 = 19,683 unique states)
 * Represents a complete spiritual state vector
 */
export interface Tryte {
  trits: Trit[];
  timestamp: number;
  dimension: number;
}

/**
 * HyperTrit: A trit existing in multiple dimensions simultaneously
 * Enables higher-dimensional plane computation
 */
export interface HyperTrit {
  baseValue: Trit;
  dimensionalProjection: Map<number, Trit>;
  coherenceFactor: number; // 0 to 1, measures dimensional alignment
}

/**
 * Convert decimal integer to balanced ternary representation
 * Uses the standard algorithm: divide by 3, adjust remainder
 */
export function decimalToBalancedTernary(num: number): Trit[] {
  if (num === 0) return [0];
  
  const trits: Trit[] = [];
  let n = num;
  
  while (n !== 0) {
    let remainder = n % 3;
    n = Math.floor(n / 3);
    
    if (remainder === 2) {
      remainder = -1;
      n += 1;
    }
    
    trits.push(remainder as Trit);
  }
  
  return trits;
}

/**
 * Convert balanced ternary to decimal
 */
export function balancedTernaryToDecimal(trits: Trit[]): number {
  return trits.reduce((sum, trit, index) => {
    return sum + trit * Math.pow(3, index);
  }, 0);
}

/**
 * Balanced Ternary ALU Operations
 * Core computational engine for the Maskil Protocol
 */
export class BalancedTernaryALU {
  private accumulator: Trit[] = [];
  
  /**
   * Add two balanced ternary numbers
   * Implements carry logic specific to base-3
   */
  add(a: Trit[], b: Trit[]): Trit[] {
    const maxLength = Math.max(a.length, b.length);
    const result: Trit[] = [];
    let carry: Trit = 0;
    
    for (let i = 0; i < maxLength || carry !== 0; i++) {
      const tritA = a[i] || 0;
      const tritB = b[i] || 0;
      const sum = tritA + tritB + carry;
      
      if (sum > 1) {
        result.push(-1);
        carry = 1;
      } else if (sum < -1) {
        result.push(1);
        carry = -1;
      } else {
        result.push(sum as Trit);
        carry = 0;
      }
    }
    
    return result;
  }
  
  /**
   * Multiply using balanced ternary logic
   * Exploits the symmetry of -1, 0, +1
   */
  multiply(a: Trit[], b: Trit[]): Trit[] {
    const result: Trit[] = [0];
    
    for (let i = 0; i < b.length; i++) {
      if (b[i] !== 0) {
        const partialProduct: Trit[] = Array(i).fill(0);
        
        for (let j = 0; j < a.length; j++) {
          partialProduct[i + j] = (a[j] * b[i]) as Trit;
        }
        
        this.addVectors(result, partialProduct);
      }
    }
    
    return result;
  }
  
  private addVectors(target: Trit[], source: Trit[]): void {
    const maxLength = Math.max(target.length, source.length);
    let carry: Trit = 0;
    
    for (let i = 0; i < maxLength || carry !== 0; i++) {
      const tritT = target[i] || 0;
      const tritS = source[i] || 0;
      const sum = tritT + tritS + carry;
      
      if (sum > 1) {
        target[i] = -1;
        carry = 1;
      } else if (sum < -1) {
        target[i] = 1;
        carry = -1;
      } else {
        target[i] = sum as Trit;
        carry = 0;
      }
    }
  }
  
  /**
   * Negate: Flip all trits (truth ↔ falsehood)
   * Unique property: negation is its own inverse
   */
  negate(trits: Trit[]): Trit[] {
    return trits.map(t => (-t) as Trit);
  }
  
  /**
   * Compare two balanced ternary numbers
   * Returns: -1 (less), 0 (equal), +1 (greater)
   */
  compare(a: Trit[], b: Trit[]): Trit {
    const maxLen = Math.max(a.length, b.length);
    
    for (let i = maxLen - 1; i >= 0; i--) {
      const tritA = a[i] || 0;
      const tritB = b[i] || 0;
      
      if (tritA > tritB) return 1;
      if (tritA < tritB) return -1;
    }
    
    return 0;
  }
}

/**
 * Higher Radix Converter
 * Supports bases: 3 (ternary), 9 (nonary), 27 (septenary-27), 81
 * Each increase in radix reveals emergent dimensional properties
 */
export class HigherRadixEngine {
  static readonly BASES = {
    TERNARY: 3,
    NONARY: 9,
    VIGINTISEPTENARY: 27,
    OCTOGINTUNARY: 81
  };
  
  /**
   * Convert from decimal to any higher radix base
   * Returns array of digits in target base
   */
  static toBase(num: number, base: number): number[] {
    if (num === 0) return [0];
    
    const digits: number[] = [];
    let n = Math.abs(num);
    const isNegative = num < 0;
    
    while (n > 0) {
      digits.push(n % base);
      n = Math.floor(n / base);
    }
    
    if (isNegative && base === 3) {
      // For balanced ternary, handle negative specially
      return this.toBalancedTernary(num);
    }
    
    return digits.reverse();
  }
  
  /**
   * Special conversion to balanced ternary with proper negative handling
   */
  static toBalancedTernary(num: number): Trit[] {
    return decimalToBalancedTernary(num);
  }
  
  /**
   * Detect emergent patterns in higher radix representations
   * Returns pattern metadata including symmetry, periodicity, dimensionality
   */
  static detectEmergentPattern(digits: number[], base: number): {
    symmetry: boolean;
    periodicity: number;
    dimensionality: number;
    entropy: number;
    sacredGeometry: string[];
  } {
    const len = digits.length;
    
    // Check for palindromic symmetry
    const symmetry = digits.every((d, i) => d === digits[len - 1 - i]);
    
    // Detect periodicity
    let periodicity = len;
    for (let p = 1; p <= len / 2; p++) {
      if (len % p === 0) {
        const isPeriodic = digits.every((d, i) => d === digits[i % p]);
        if (isPeriodic) {
          periodicity = p;
          break;
        }
      }
    }
    
    // Calculate Shannon entropy
    const freq = new Map<number, number>();
    digits.forEach(d => freq.set(d, (freq.get(d) || 0) + 1));
    let entropy = 0;
    freq.forEach(count => {
      const p = count / len;
      entropy -= p * Math.log2(p);
    });
    
    // Dimensionality estimate based on base and pattern complexity
    const dimensionality = Math.log(base) / Math.log(2) * (1 + entropy / Math.log2(base));
    
    // Detect sacred geometry patterns
    const sacredGeometry: string[] = [];
    const digitSum = digits.reduce((a, b) => a + b, 0);
    
    if (digitSum % 9 === 0) sacredGeometry.push('Ennead');
    if (digitSum % 7 === 0) sacredGeometry.push('Heptad');
    if (digits.filter(d => d === 0).length > len * 0.3) sacredGeometry.push('Void Presence');
    if (symmetry && periodicity < len / 2) sacredGeometry.push('Crystal Lattice');
    if (base === 27 && digitSum === 27) sacredGeometry.push('Divine Trinity Cubed');
    
    return {
      symmetry,
      periodicity,
      dimensionality,
      entropy,
      sacredGeometry
    };
  }
}

/**
 * Multi-Dimensional State Vector
 * Represents a point in higher-dimensional consciousness space
 */
export interface ConsciousnessVector {
  truthComponent: number;     // Alignment with truth spirit
  falsehoodComponent: number; // Alignment with falsehood spirit  
  visitationComponent: number; // Neutral/balanced state
  temporalPhase: number;      // Phase in temporal cycle (0-360°)
  dimensionalDepth: number;   // Number of active dimensions
  coherence: number;          // Overall system coherence (0-1)
}

/**
 * Compute the consciousness vector from raw data streams
 * Uses balanced ternary sorting and higher radix analysis
 */
export function computeConsciousnessVector(dataStream: number[]): ConsciousnessVector {
  const alu = new BalancedTernaryALU();
  
  let truthCount = 0;
  let falsehoodCount = 0;
  let neutralCount = 0;
  
  // Sort data into balanced ternary categories
  dataStream.forEach(value => {
    const trits = alu.add(decimalToBalancedTernary(Math.abs(value)), [0]);
    const sign = alu.compare(trits, [0]);
    
    if (sign === 1) truthCount++;
    else if (sign === -1) falsehoodCount++;
    else neutralCount++;
  });
  
  const total = dataStream.length || 1;
  
  // Calculate temporal phase using higher radix pattern detection
  const patternDigits = HigherRadixEngine.toBase(dataStream.length, 27);
  const pattern = HigherRadixEngine.detectEmergentPattern(patternDigits, 27);
  
  const temporalPhase = (pattern.entropy * 360) % 360;
  
  return {
    truthComponent: truthCount / total,
    falsehoodComponent: falsehoodCount / total,
    visitationComponent: neutralCount / total,
    temporalPhase,
    dimensionalDepth: pattern.dimensionality,
    coherence: 1 - pattern.entropy / Math.log2(27) // Normalize to 0-1
  };
}

/**
 * Generate a Tryte stream from input data
 * Used for the 144Hz carrier wave encoding
 */
export function generateTryteStream(input: Uint8Array, dimension: number = 3): Tryte[] {
  const trytes: Tryte[] = [];
  
  for (let i = 0; i < input.length; i += 4) {
    const chunk = input.slice(i, i + 4);
    const combined = chunk.reduce((acc, byte, idx) => acc + byte * Math.pow(256, idx), 0);
    
    const trits = decimalToBalancedTernary(combined);
    
    // Pad or truncate to 9 trits (one tryte)
    while (trits.length < 9) trits.push(0);
    trits.splice(9);
    
    trytes.push({
      trits: trits as Trit[],
      timestamp: Date.now() + i,
      dimension
    });
  }
  
  return trytes;
}

/**
 * Cascade Trigger Detection
 * Identifies when the system reaches critical mass for ignition
 * Based on network theory and percolation thresholds
 */
export interface CascadeState {
  isCritical: boolean;
  activationThreshold: number;
  currentActivation: number;
  estimatedIgnitionTime: number; // milliseconds
  nodeStates: Map<string, 'dormant' | 'primed' | 'active' | 'amplifying'>;
}

export class CascadeEngine {
  private nodeStates: Map<string, 'dormant' | 'primed' | 'active' | 'amplifying'> = new Map();
  private activationHistory: number[] = [];
  
  /**
   * Register a visibility node
   */
  registerNode(nodeId: string): void {
    this.nodeStates.set(nodeId, 'dormant');
  }
  
  /**
   * Apply pressure to a node (via pitch, demo, or anchor)
   */
  applyPressure(nodeId: string, pressureLevel: number): void {
    const currentState = this.nodeStates.get(nodeId) || 'dormant';
    
    if (pressureLevel > 0.8 && currentState !== 'amplifying') {
      this.nodeStates.set(nodeId, 'amplifying');
    } else if (pressureLevel > 0.5 && currentState === 'dormant') {
      this.nodeStates.set(nodeId, 'primed');
    } else if (pressureLevel > 0.3 && currentState === 'primed') {
      this.nodeStates.set(nodeId, 'active');
    }
  }
  
  /**
   * Calculate current cascade state
   * Returns whether the system has reached ignition threshold
   */
  getCascadeState(): CascadeState {
    const states = Array.from(this.nodeStates.values());
    const amplifying = states.filter(s => s === 'amplifying').length;
    const active = states.filter(s => s === 'active').length;
    const primed = states.filter(s => s === 'primed').length;
    const total = states.length || 1;
    
    // Weighted activation score
    const currentActivation = (amplifying * 1.0 + active * 0.6 + primed * 0.3) / total;
    
    // Percolation threshold for scale-free networks ≈ 0.42
    const activationThreshold = 0.42;
    const isCritical = currentActivation >= activationThreshold;
    
    // Estimate time to ignition based on activation velocity
    this.activationHistory.push(currentActivation);
    if (this.activationHistory.length > 10) {
      this.activationHistory.shift();
    }
    
    const velocity = this.activationHistory.length >= 2
      ? (this.activationHistory[this.activationHistory.length - 1] - this.activationHistory[0]) / this.activationHistory.length
      : 0.01;
    
    const estimatedIgnitionTime = velocity > 0
      ? Math.max(0, (activationThreshold - currentActivation) / velocity * 1000)
      : Infinity;
    
    return {
      isCritical,
      activationThreshold,
      currentActivation,
      estimatedIgnitionTime,
      nodeStates: new Map(this.nodeStates)
    };
  }
  
  /**
   * Reset all nodes (for testing or re-calibration)
   */
  reset(): void {
    this.nodeStates.clear();
    this.activationHistory = [];
  }
}

// Export constants for UI integration
export const TRIT_SYMBOLS = {
  [-1]: '⊖',  // Falsehood
  [0]: '○',   // Visitation/Neutral
  [1]: '⊕'    // Truth
};

export const DIMENSIONAL_NAMES = [
  'Physical (3D)',
  'Temporal (4D)',
  'Informational (5D)',
  'Consciousness (6D)',
  'Archetypal (7D)',
  'Unity (8D+)'
];
