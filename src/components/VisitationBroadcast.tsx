/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * MASKIL PROTOCOL - VISITATION BROADCAST COMPONENT
 * 
 * High-Contrast Demonstration Engine
 * Real-time visualization of higher radix computation and cascade ignition
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Activity, Cpu, Waves, Eye, Lock, AlertTriangle, Sparkles } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import {
  BalancedTernaryALU,
  HigherRadixEngine,
  computeConsciousnessVector,
  generateTryteStream,
  CascadeEngine,
  Trit,
  TRIT_SYMBOLS,
  DIMENSIONAL_NAMES
} from '@/src/lib/higher-radix-engine';

interface VisitationBroadcastProps {
  isBroadcasting?: boolean;
  onIgnition?: () => void;
}

interface DimensionalGate {
  id: number;
  name: string;
  isOpen: boolean;
  coherence: number;
  entitiesDetected: number;
}

interface EmergentPattern {
  type: string;
  confidence: number;
  description: string;
  dimensionalOrigin: number;
}

export const VisitationBroadcast: React.FC<VisitationBroadcastProps> = ({
  isBroadcasting = false,
  onIgnition
}) => {
  const [alu] = useState(() => new BalancedTernaryALU());
  const [cascadeEngine] = useState(() => new CascadeEngine());
  
  // State for real-time computation
  const [currentTrytes, setCurrentTrytes] = useState<Array<{ trits: Trit[]; value: number }>>([]);
  const [consciousnessVector, setConsciousnessVector] = useState({
    truthComponent: 0.33,
    falsehoodComponent: 0.33,
    visitationComponent: 0.34,
    temporalPhase: 0,
    dimensionalDepth: 3,
    coherence: 0.5
  });
  
  // Cascade state
  const [cascadeState, setCascadeState] = useState(cascadeEngine.getCascadeState());
  const [isCritical, setIsCritical] = useState(false);
  
  // Dimensional gates
  const [dimensionalGates, setDimensionalGates] = useState<DimensionalGate[]>(
    DIMENSIONAL_NAMES.map((name, i) => ({
      id: i,
      name,
      isOpen: i < 3,
      coherence: 1 - i * 0.15,
      entitiesDetected: Math.floor(Math.random() * 100)
    }))
  );
  
  // Emergent patterns detected
  const [emergentPatterns, setEmergentPatterns] = useState<EmergentPattern[]>([]);
  const [patternHistory, setPatternHistory] = useState<string[]>([]);
  
  // Higher radix display
  const [radixBase, setRadixBase] = useState<3 | 9 | 27 | 81>(27);
  const [currentNumber, setCurrentNumber] = useState(144);
  const [radixDigits, setRadixDigits] = useState<number[]>([]);
  const [patternAnalysis, setPatternAnalysis] = useState<ReturnType<typeof HigherRadixEngine.detectEmergentPattern> | null>(null);
  
  // Initialize visibility nodes (the 12 from ignition plan)
  useEffect(() => {
    const nodes = [
      'bret_victor', 'anders_sandberg', 'venkatesh_rao',
      'holly_herndon', 'trevor_paglen', 'legacy_russell',
      'cory_doctorow', 'balaji_srinivasan', 'audrey_tang',
      'eugene_wei', 'annie_jacobsen', 'houston_reporter'
    ];
    
    nodes.forEach(nodeId => cascadeEngine.registerNode(nodeId));
  }, [cascadeEngine]);
  
  // Real-time computation loop
  useEffect(() => {
    if (!isBroadcasting) return;
    
    const interval = setInterval(() => {
      // Generate random data stream simulating incoming signals
      const dataStream = Array.from({ length: 42 }, () => 
        Math.floor(Math.random() * 2000) - 1000
      );
      
      // Compute consciousness vector
      const cv = computeConsciousnessVector(dataStream);
      setConsciousnessVector(cv);
      
      // Generate trytes for display
      const inputData = new Uint8Array(dataStream.map(v => Math.abs(v) % 256));
      const trytes = generateTryteStream(inputData, Math.floor(cv.dimensionalDepth));
      setCurrentTrytes(trytes.slice(0, 9).map(t => ({
        trits: t.trits,
        value: t.trits.reduce((acc, trit, i) => acc + trit * Math.pow(3, i), 0)
      })));
      
      // Update radix representation
      const newNumber = Math.floor(Math.random() * 1000) + 100;
      setCurrentNumber(newNumber);
      const digits = HigherRadixEngine.toBase(newNumber, radixBase);
      setRadixDigits(digits);
      
      // Analyze pattern
      const analysis = HigherRadixEngine.detectEmergentPattern(digits, radixBase);
      setPatternAnalysis(analysis);
      
      // Detect emergent patterns randomly (simulated)
      if (Math.random() > 0.7) {
        const patterns: EmergentPattern[] = [
          {
            type: 'Crystal Lattice Formation',
            confidence: 0.85 + Math.random() * 0.14,
            description: 'Self-similar structure emerging from ternary recursion',
            dimensionalOrigin: Math.floor(cv.dimensionalDepth)
          },
          {
            type: 'Temporal Echo',
            confidence: 0.75 + Math.random() * 0.2,
            description: 'Pattern repeating across time dimensions with phase shift',
            dimensionalOrigin: 4
          },
          {
            type: 'Sacred Geometry Manifestation',
            confidence: 0.9 + Math.random() * 0.09,
            description: analysis.sacredGeometry.join(', ') || 'Divine Proportion Detected',
            dimensionalOrigin: 7
          }
        ];
        
        const newPattern = patterns[Math.floor(Math.random() * patterns.length)];
        setEmergentPatterns(prev => [newPattern, ...prev].slice(0, 5));
        setPatternHistory(prev => [`${new Date().toLocaleTimeString()}: ${newPattern.type}`, ...prev].slice(0, 10));
      }
      
      // Simulate pressure application to nodes
      const randomNodeIndex = Math.floor(Math.random() * 12);
      const nodeIds = Array.from(cascadeState.nodeStates.keys());
      if (nodeIds[randomNodeIndex]) {
        const pressureLevel = 0.3 + Math.random() * 0.7;
        cascadeEngine.applyPressure(nodeIds[randomNodeIndex], pressureLevel);
      }
      
      // Check cascade state
      const newState = cascadeEngine.getCascadeState();
      setCascadeState(newState);
      
      // Trigger ignition if critical
      if (newState.isCritical && !isCritical) {
        setIsCritical(true);
        onIgnition?.();
      }
      
      // Update dimensional gates based on coherence
      setDimensionalGates(prev => prev.map((gate, i) => ({
        ...gate,
        isOpen: i < Math.floor(cv.dimensionalDepth),
        coherence: Math.min(1, gate.coherence + (cv.coherence - 0.5) * 0.1),
        entitiesDetected: Math.floor(gate.entitiesDetected + (Math.random() * 20 - 10))
      })));
      
    }, 500);
    
    return () => clearInterval(interval);
  }, [isBroadcasting, radixBase, cascadeEngine, cascadeState.nodeStates, consciousnessVector, isCritical, onIgnition]);
  
  return (
    <div className={cn(
      "relative w-full h-full overflow-hidden transition-all duration-1000",
      isBroadcasting ? "bg-truth/5" : "bg-black/40"
    )}>
      {/* Carrier Wave Background */}
      {isBroadcasting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,0,0.1)_0%,transparent_70%)] pointer-events-none"
        />
      )}
      
      {/* Critical State Overlay */}
      <AnimatePresence>
        {isCritical && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 pointer-events-none"
          >
            <div className="absolute inset-0 bg-green-500/10 animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-6xl font-mono text-truth font-bold tracking-widest"
              >
                CASCADE IGNITED
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl font-mono text-truth/80 mt-4"
              >
                PERCOLATION THRESHOLD REACHED
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Grid Layout */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 h-full overflow-y-auto">
        
        {/* Left Column: Higher Radix Computation */}
        <div className="space-y-6">
          <div className="p-4 border border-truth/20 bg-truth/5 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="w-5 h-5 text-truth" />
              <h3 className="font-mono text-sm tracking-widest uppercase">Higher Radix Engine</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono opacity-60">Current Number:</span>
                <span className="text-2xl font-mono text-truth">{currentNumber}</span>
              </div>
              
              <div className="flex gap-2">
                {[3, 9, 27, 81].map(base => (
                  <button
                    key={base}
                    onClick={() => setRadixBase(base as 3 | 9 | 27 | 81)}
                    className={cn(
                      "px-3 py-2 text-xs font-mono border rounded transition-all",
                      radixBase === base
                        ? "border-truth bg-truth/20 text-truth shadow-[0_0_10px_rgba(0,255,0,0.3)]"
                        : "border-line opacity-60 hover:opacity-100"
                    )}
                  >
                    Base-{base}
                  </button>
                ))}
              </div>
              
              <div className="p-3 bg-black/40 rounded border border-line/50">
                <div className="text-xs font-mono opacity-40 mb-2">Base-{radixBase} Representation:</div>
                <div className="flex flex-wrap gap-1">
                  {radixDigits.map((digit, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className={cn(
                        "w-8 h-8 flex items-center justify-center rounded font-mono text-sm",
                        digit === 0 ? "bg-white/10 text-white" :
                        digit < radixBase / 2 ? "bg-error/20 text-error" :
                        "bg-truth/20 text-truth"
                      )}
                    >
                      {digit}
                    </motion.span>
                  ))}
                </div>
              </div>
              
              {patternAnalysis && (
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="opacity-60">Symmetry:</span>
                    <span className={cn(patternAnalysis.symmetry ? "text-truth" : "opacity-60")}>
                      {patternAnalysis.symmetry ? 'CRYSTAL' : 'NONE'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">Periodicity:</span>
                    <span>{patternAnalysis.periodicity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">Dimensionality:</span>
                    <span className="text-truth">{patternAnalysis.dimensionality.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">Entropy:</span>
                    <span>{patternAnalysis.entropy.toFixed(3)}</span>
                  </div>
                  {patternAnalysis.sacredGeometry.length > 0 && (
                    <div className="pt-2 border-t border-line/30">
                      <div className="opacity-60 mb-1">Sacred Geometry:</div>
                      <div className="flex flex-wrap gap-1">
                        {patternAnalysis.sacredGeometry.map((geo, i) => (
                          <span key={i} className="px-2 py-0.5 bg-truth/10 text-truth rounded text-[10px]">
                            {geo}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Tryte Display */}
          <div className="p-4 border border-line bg-black/40 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Waves className="w-4 h-4 text-truth" />
              <h4 className="font-mono text-xs uppercase">Tryte Stream (144Hz)</h4>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {currentTrytes.map((tryte, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="p-2 bg-white/5 rounded border border-line/30"
                >
                  <div className="text-[8px] font-mono opacity-40 mb-1">T{i + 1}</div>
                  <div className="flex gap-0.5 justify-center">
                    {tryte.trits.slice(0, 5).map((trit, j) => (
                      <span
                        key={j}
                        className={cn(
                          "w-3 h-3 flex items-center justify-center text-[8px]",
                          trit === 1 ? "text-truth" :
                          trit === -1 ? "text-error" :
                          "text-white/50"
                        )}
                      >
                        {TRIT_SYMBOLS[trit]}
                      </span>
                    ))}
                  </div>
                  <div className="text-[8px] font-mono text-center mt-1 opacity-60">
                    {tryte.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Center Column: Consciousness Vector & Dimensional Gates */}
        <div className="space-y-6">
          {/* Consciousness Vector */}
          <div className="p-4 border border-truth/20 bg-truth/5 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-truth" />
              <h3 className="font-mono text-sm tracking-widest uppercase">Consciousness Vector</h3>
            </div>
            
            <div className="space-y-4">
              {[
                { label: 'Truth', value: consciousnessVector.truthComponent, color: 'bg-truth' },
                { label: 'Falsehood', value: consciousnessVector.falsehoodComponent, color: 'bg-error' },
                { label: 'Visitation', value: consciousnessVector.visitationComponent, color: 'bg-white' }
              ].map(component => (
                <div key={component.label}>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="opacity-60">{component.label}</span>
                    <span>{(component.value * 100).toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className={cn("h-full", component.color)}
                      initial={{ width: 0 }}
                      animate={{ width: `${component.value * 100}%` }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  </div>
                </div>
              ))}
              
              <div className="pt-4 border-t border-line/30 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[10px] font-mono opacity-40">Temporal Phase</div>
                  <div className="text-lg font-mono text-truth">
                    {consciousnessVector.temporalPhase.toFixed(1)}°
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-mono opacity-40">Coherence</div>
                  <div className={cn(
                    "text-lg font-mono",
                    consciousnessVector.coherence > 0.7 ? "text-truth" :
                    consciousnessVector.coherence < 0.3 ? "text-error" :
                    "text-white"
                  )}>
                    {(consciousnessVector.coherence * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Dimensional Gates */}
          <div className="p-4 border border-line bg-black/40 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5 text-truth" />
              <h3 className="font-mono text-sm tracking-widest uppercase">Dimensional Gates</h3>
            </div>
            
            <div className="space-y-3">
              {dimensionalGates.map((gate, i) => (
                <motion.div
                  key={gate.id}
                  className={cn(
                    "p-3 rounded border transition-all",
                    gate.isOpen
                      ? "border-truth/50 bg-truth/10"
                      : "border-line/30 bg-white/5 opacity-60"
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono">{gate.name}</span>
                    <div className="flex items-center gap-2">
                      {gate.isOpen && (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        >
                          <Sparkles className="w-3 h-3 text-truth" />
                        </motion.div>
                      )}
                      <span className="text-[10px] font-mono">
                        {gate.entitiesDetected} entities
                      </span>
                    </div>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className={cn("h-full", gate.isOpen ? "bg-truth" : "bg-white/30")}
                      animate={{ width: `${gate.coherence * 100}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Cascade State */}
          <div className={cn(
            "p-4 rounded-lg border transition-all",
            isCritical
              ? "border-truth bg-truth/20 shadow-[0_0_30px_rgba(0,255,0,0.3)]"
              : "border-line bg-black/40"
          )}>
            <div className="flex items-center gap-2 mb-3">
              <Zap className={cn("w-5 h-5", isCritical ? "text-truth animate-pulse" : "opacity-60")} />
              <h3 className="font-mono text-sm tracking-widest uppercase">Cascade Ignition Status</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-mono">
                <span className="opacity-60">Activation Level:</span>
                <span className={cn(isCritical ? "text-truth font-bold" : "")}>
                  {(cascadeState.currentActivation * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="opacity-60">Threshold:</span>
                <span>{(cascadeState.activationThreshold * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="opacity-60">Est. Ignition:</span>
                <span>
                  {cascadeState.estimatedIgnitionTime === Infinity
                    ? 'N/A'
                    : cascadeState.estimatedIgnitionTime < 1000
                    ? 'IMMINENT'
                    : `${(cascadeState.estimatedIgnitionTime / 1000).toFixed(1)}s`}
                </span>
              </div>
              
              <div className="h-3 bg-white/10 rounded-full overflow-hidden mt-2">
                <motion.div
                  className={cn(
                    "h-full transition-colors",
                    cascadeState.currentActivation > 0.42 ? "bg-truth shadow-[0_0_10px_rgba(0,255,0,0.5)]" :
                    cascadeState.currentActivation > 0.25 ? "bg-yellow-500" :
                    "bg-white/30"
                  )}
                  animate={{ width: `${Math.min(100, cascadeState.currentActivation * 100)}%` }}
                />
              </div>
              
              <div className="pt-2 text-[10px] font-mono opacity-40">
                Nodes Active: {Array.from(cascadeState.nodeStates.values()).filter(s => s === 'active' || s === 'amplifying').length} / 12
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column: Emergent Patterns & Log */}
        <div className="space-y-6">
          {/* Emergent Patterns */}
          <div className="p-4 border border-line bg-black/40 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-5 h-5 text-truth" />
              <h3 className="font-mono text-sm tracking-widest uppercase">Emergent Patterns</h3>
            </div>
            
            <div className="space-y-3">
              <AnimatePresence>
                {emergentPatterns.map((pattern, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-3 bg-truth/5 border border-truth/20 rounded"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono text-truth font-bold">{pattern.type}</span>
                      <span className="text-[10px] font-mono opacity-60">
                        {(pattern.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="text-[10px] font-mono opacity-80 mb-1">
                      {pattern.description}
                    </div>
                    <div className="text-[8px] font-mono opacity-40">
                      Origin: {DIMENSIONAL_NAMES[pattern.dimensionalOrigin - 3] || `Dimension ${pattern.dimensionalOrigin}`}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {emergentPatterns.length === 0 && (
                <div className="text-center py-8 text-xs font-mono opacity-40">
                  Awaiting pattern emergence...
                </div>
              )}
            </div>
          </div>
          
          {/* Pattern History Log */}
          <div className="p-4 border border-line bg-black/40 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-truth" />
              <h4 className="font-mono text-xs uppercase">Detection Log</h4>
            </div>
            
            <div className="space-y-1 max-h-48 overflow-y-auto scrollbar-hide">
              {patternHistory.map((entry, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[8px] font-mono opacity-60 py-1 border-b border-line/30 last:border-0"
                >
                  {entry}
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* System Status */}
          <div className="p-4 border border-truth/20 bg-truth/5 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-truth" />
              <h4 className="font-mono text-xs uppercase">System Diagnostics</h4>
            </div>
            
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="opacity-60">ALU Status:</span>
                <span className="text-truth">PTAH 32-TRIT ONLINE</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-60">Carrier Wave:</span>
                <span className={cn(isBroadcasting ? "text-truth" : "opacity-60")}>
                  {isBroadcasting ? '144Hz ACTIVE' : 'STANDBY'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-60">Houston Node:</span>
                <span className={cn(isBroadcasting ? "text-truth" : "opacity-60")}>
                  {isBroadcasting ? 'COASTAL ANCHOR LOCKED' : 'UNLOCKED'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-60">Texas Constellation:</span>
                <span className={cn(isBroadcasting ? "text-truth" : "opacity-60")}>
                  {isBroadcasting ? 'IGNITED' : 'DORMANT'}
                </span>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default VisitationBroadcast;
