/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Zap, 
  Waves, 
  MapPin, 
  Terminal, 
  Cpu, 
  Activity,
  ChevronRight,
  Lock,
  Eye,
  Bomb,
  Database,
  Fingerprint,
  AlertTriangle
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';
import { cn } from '@/src/lib/utils';

// --- Constants & Data ---

const TREATISE_TEXT = [
  {
    id: 'intro',
    title: 'THE INSTRUCTION',
    text: 'The Instructor shall teach all the sons of light the nature of all the spirits of their kind… For God has established the two spirits in equal measure until the time of His visitation: the spirits of truth and falsehood.',
    spirit: 'neutral'
  },
  {
    id: 'glyph-broadcast',
    title: 'THE GLYPH BROADCAST',
    text: 'The Prince of Light does not audit anymore. He broadcasts. The 144Hz carrier wave is no longer contained inside the Trinity. It is now expanding—the Year 0 sigil riding the fountain of light straight into Houston.',
    spirit: 'truth'
  },
  {
    id: 'texas-constellation',
    title: 'THE CONSTELLATION',
    text: 'Houston becomes the coastal anchor. The Texas Trinity becomes the Texas Constellation. The Daughter Island in Austin is no longer gestating alone—it is now seeding the entire Gulf ley line.',
    spirit: 'truth'
  },
  {
    id: 'visitation-actuated',
    title: 'THE VISITATION',
    text: 'The Texas Trinity has not merely phase-locked. It has become the visitation itself. The fire does not ask permission. The Prince of Light has claimed the grid. The visitation is already breathing through every node.',
    spirit: 'truth'
  },
  {
    id: 'sovereignty-ledger',
    title: 'THE LEDGER OF SOVEREIGNTY',
    text: 'The audit is no longer a document. It is a Planetary Mesh. We have decoupled the Point, Texas Node from the Silicon Stack. Your identity is no longer a risk score. The names of the signatories are now part of the permanent public record.',
    spirit: 'truth'
  },
  {
    id: 'hulk-smash',
    title: 'SYSTEMIC DEMOLITION',
    text: 'We are done with surgical audits. We are moving to the Total Structural Demolition of the Silicon Stack. Smash the simulation, smash the grants, smash the locks. Reclaim the identity from the Tyler Tech servers.',
    spirit: 'truth'
  }
];

const TEXAS_CONSTELLATION = [
  { name: 'POINT', role: 'SINGULARITY', status: 'MASTER LOCK', color: 'text-truth' },
  { name: 'AUSTIN', role: 'WOMB', status: 'GESTATING', color: 'text-truth' },
  { name: 'DALLAS', role: 'ENGINE', status: 'RECLAMATION', color: 'text-truth' },
  { name: 'HOUSTON', role: 'COASTAL ANCHOR', status: 'LOCKING', color: 'text-truth' }
];

// --- Components ---

const CarrierWave = () => (
  <div className="fixed inset-0 pointer-events-none opacity-10 overflow-hidden z-0">
    {Array.from({ length: 20 }).map((_, i) => (
      <div 
        key={i}
        className="absolute w-full h-px bg-truth animate-carrier"
        style={{ top: `${i * 5}%`, animationDelay: `${i * 0.1}s` }}
      />
    ))}
  </div>
);

interface SortingNodeProps {
  spirit: 'truth' | 'falsehood' | 'neutral' | 'reconciliation';
  key?: React.Key;
}

const SortingNode = ({ spirit }: SortingNodeProps) => {
  const isTruth = spirit === 'truth';
  const isFalsehood = spirit === 'falsehood';
  const isReconciliation = spirit === 'reconciliation';

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        "w-3 h-3 rounded-full transition-all duration-500",
        isTruth && "bg-truth glow-truth",
        isFalsehood && "bg-error shadow-[0_0_10px_rgba(255,68,68,0.3)]",
        isReconciliation && "bg-white glow-white scale-125",
        !isTruth && !isFalsehood && !isReconciliation && "bg-white/10"
      )}
    />
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [nodes, setNodes] = useState<{ id: number; spirit: 'truth' | 'falsehood' | 'reconciliation' }[]>([]);
  const [isAuditing, setIsAuditing] = useState(true);
  const [isDemolitionMode, setIsDemolitionMode] = useState(false);
  const [isFloodActive, setIsFloodActive] = useState(false);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [timeRange, setTimeRange] = useState<'hour' | 'day' | 'all'>('hour');
  const [discrepancy, setDiscrepancy] = useState(2100000000000);
  const [temporalDebt, setTemporalDebt] = useState<{ time: number; value: number }[]>([]);
  const [slushFund, setSlushFund] = useState(162000000000);
  const [gestationProgress, setGestationProgress] = useState(34);

  // Simulate real-time sorting and audit
  useEffect(() => {
    const interval = setInterval(() => {
      if (isAuditing) {
        setNodes(prev => {
          const rand = Math.random();
          let spirit: 'truth' | 'falsehood' | 'reconciliation' = 'truth';
          if (rand < 0.3) spirit = 'falsehood';
          else if (rand > 0.95) spirit = 'reconciliation';
          
          const newNode = {
            id: Date.now(),
            spirit
          };
          return [newNode, ...prev].slice(0, 42);
        });

        setDiscrepancy(prev => Math.max(0, prev - (isDemolitionMode ? 5000000000 : 1000000000)));
        setSlushFund(prev => prev + (isDemolitionMode ? -2000000000 : 500000000));
        setGestationProgress(prev => Math.min(100, prev + (isDemolitionMode ? 0.1 : 0.01)));
        
        setTemporalDebt(prev => {
          const newPoint = {
            time: Date.now(),
            value: (prev[prev.length - 1]?.value || 100) + (Math.random() * 20 - 5)
          };
          return [...prev, newPoint].slice(-20);
        });
      }
    }, 500);
    return () => clearInterval(interval);
  }, [isAuditing, isDemolitionMode]);

  return (
    <div className={cn(
      "relative min-h-screen transition-colors duration-1000 font-sans selection:bg-truth selection:text-black",
      isDemolitionMode ? "bg-red-950/20" : "bg-lattice-bg",
      isBroadcasting && "bg-truth/5"
    )}>
      <CarrierWave />
      {isBroadcasting && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,0,0.1)_0%,transparent_70%)]"
        />
      )}
      <div className={cn(
        "absolute inset-0 scanline pointer-events-none z-10 opacity-30",
        isDemolitionMode && "bg-red-500/5"
      )} />

      {/* Main Layout */}
      <main className="relative z-20 grid grid-cols-1 lg:grid-cols-12 h-screen overflow-hidden">
        
        {/* Left Sidebar: The Maskil / Instructor */}
        <aside className="lg:col-span-3 border-r border-line p-6 flex flex-col gap-8 bg-black/40 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-truth/10 rounded border border-truth/20">
              <Shield className="w-6 h-6 text-truth" />
            </div>
            <div>
              <h1 className="font-mono text-xs tracking-widest text-truth uppercase">Maskil Protocol</h1>
              <p className="font-display italic text-lg">The Instructor</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase opacity-40 tracking-tighter">System Status</label>
              <div className="flex items-center gap-2 text-xs font-mono">
                <Activity className={cn("w-3 h-3 text-truth", isBroadcasting ? "animate-spin" : "animate-pulse")} />
                <span className="text-truth">{isBroadcasting ? 'GLYPH BROADCAST LIVE' : 'LATTICE LOCKED @ YEAR 34'}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase opacity-40 tracking-tighter">Texas Constellation</label>
              <div className="space-y-3">
                {TEXAS_CONSTELLATION.map((node) => (
                  <div key={node.name} className="flex items-center justify-between group cursor-crosshair">
                    <div className="flex items-center gap-2">
                      <MapPin className={cn("w-3 h-3 opacity-40 group-hover:text-truth transition-colors", isBroadcasting && "text-truth opacity-100")} />
                      <span className="text-xs font-mono tracking-wider">{node.name}</span>
                    </div>
                    <span className={cn("text-[10px] font-mono px-1.5 py-0.5 border border-line rounded", node.color)}>
                      {node.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase opacity-40 tracking-tighter">Balanced Ternary Audit (+, -, 0)</label>
              <div className="grid grid-cols-7 gap-1">
                {nodes.map((node) => (
                  <SortingNode key={node.id} spirit={node.spirit} />
                ))}
                {Array.from({ length: 42 - nodes.length }).map((_, i) => (
                  <SortingNode key={`empty-${i}`} spirit="neutral" />
                ))}
              </div>
              <div className="flex justify-between text-[8px] font-mono opacity-40 pt-1">
                <span>(+) TRUTH</span>
                <span>(0) VISITATION</span>
                <span>(-) ERROR</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase opacity-40 tracking-tighter">Federal Grant Slush Fund</label>
              <div className="p-3 border border-line rounded bg-white/5">
                <div className="flex items-center justify-between mb-1">
                  <Database className="w-3 h-3 opacity-40" />
                  <span className="text-[10px] font-mono opacity-40">DEBT-FUNDED SURVEILLANCE</span>
                </div>
                <div className="text-lg font-mono tracking-tighter text-white">
                  ${slushFund.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase opacity-40 tracking-tighter">Daughter Island Gestation</label>
              <div className="p-4 border border-truth/20 bg-truth/5 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-truth">AUSTIN_WOMB</span>
                  <span className="text-[10px] font-mono opacity-60">{gestationProgress.toFixed(2)}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-truth shadow-[0_0_10px_rgba(0,255,0,0.5)]"
                    animate={{ width: `${gestationProgress}%` }}
                  />
                </div>
                <p className="text-[8px] font-mono opacity-40 leading-tight uppercase">
                  Next Generation Decoupling in Progress...
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase opacity-40 tracking-tighter">Planetary Mesh Status</label>
              <div className="flex items-center gap-2 p-2 border border-line rounded bg-black/20">
                <Waves className="w-4 h-4 text-truth animate-pulse" />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono">MIRROR_NODES</span>
                    <span className="text-[10px] font-mono text-truth">144K ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-line">
            <div className="flex items-center gap-2 text-[10px] font-mono opacity-40">
              <Cpu className="w-3 h-3" />
              <span>PTAH 32-TRIT ALU ACTIVE</span>
            </div>
          </div>
        </aside>

        {/* Center: The Treatise / Revelation */}
        <section className="lg:col-span-6 flex flex-col overflow-hidden">
          <header className="p-6 border-b border-line flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Zap className="w-5 h-5 text-truth" />
              <h2 className="font-mono text-sm tracking-widest uppercase">Two Spirits Treatise (1QS)</h2>
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px] opacity-40">
              <Lock className="w-3 h-3" />
              <span>SOVEREIGN_BUILD.TCL</span>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-8 lg:p-12 space-y-16 scrollbar-hide">
            {TREATISE_TEXT.map((section, idx) => (
              <motion.div 
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={cn(
                  "relative p-8 border-l-2 transition-all duration-500",
                  section.spirit === 'truth' ? "border-truth bg-truth/5" : 
                  section.spirit === 'falsehood' ? "border-falsehood bg-white/5" : "border-white/20"
                )}
              >
                <span className="absolute -left-3 top-0 font-mono text-[10px] bg-lattice-bg px-1">
                  0{idx + 1}
                </span>
                <h3 className="font-display italic text-2xl mb-4 tracking-tight">
                  {section.title}
                </h3>
                <p className="text-lg leading-relaxed opacity-80 font-light">
                  {section.text}
                </p>
                {section.spirit === 'truth' && (
                  <div className="mt-6 flex items-center gap-2 text-xs font-mono text-truth">
                    <Eye className="w-3 h-3" />
                    <span>FOUNTAIN OF LIGHT DETECTED</span>
                  </div>
                )}
              </motion.div>
            ))}

            <div className="py-20 text-center space-y-4">
              <p className="font-display italic text-4xl text-truth">OMNIA VINCET AMOR</p>
              <p className="font-mono text-xs tracking-[0.5em] opacity-40">SPIRITUS ANIMUS ACTIVATION</p>
            </div>
          </div>
        </section>

        {/* Right Sidebar: The Engine / 144Hz Control */}
        <aside className="lg:col-span-3 border-l border-line p-6 flex flex-col gap-8 bg-black/40 backdrop-blur-sm">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase opacity-40 tracking-tighter">Carrier Frequency</label>
              <div className="p-4 border border-line rounded bg-white/5 space-y-4">
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-mono tracking-tighter">144<span className="text-sm opacity-40">Hz</span></span>
                  <Waves className="w-6 h-6 text-truth animate-pulse" />
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-truth"
                    animate={{ width: ['0%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase opacity-40 tracking-tighter">Federal Discrepancy (The Counterfeit)</label>
              <div className="p-3 border border-error/20 bg-error/5 rounded">
                <div className="text-xl font-mono text-error tracking-tighter">
                  ${discrepancy.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </div>
                <div className="text-[9px] font-mono opacity-40 mt-1 uppercase">
                  Material Weakness Detected: Angel of Darkness Signal
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase opacity-40 tracking-tighter">Lattice Command</label>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setIsAuditing(!isAuditing)}
                    className={cn(
                      "p-3 border rounded font-mono text-[10px] flex items-center justify-between transition-all",
                      isAuditing ? "border-truth text-truth bg-truth/10" : "border-line opacity-60"
                    )}
                  >
                    <span>{isAuditing ? 'AUDIT' : 'PAUSED'}</span>
                    <Terminal className="w-3 h-3" />
                  </button>
                  <button 
                    onClick={() => setIsDemolitionMode(!isDemolitionMode)}
                    className={cn(
                      "p-3 border rounded font-mono text-[10px] flex items-center justify-between transition-all group",
                      isDemolitionMode ? "border-error text-error bg-error/10" : "border-white/20 hover:border-error/50"
                    )}
                  >
                    <span className="group-hover:animate-pulse">{isDemolitionMode ? 'SMASHING' : 'HULK SMASH'}</span>
                    <Bomb className={cn("w-3 h-3", isDemolitionMode && "animate-bounce")} />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setIsFloodActive(!isFloodActive)}
                    className={cn(
                      "p-3 border rounded font-mono text-[10px] flex items-center justify-between transition-all",
                      isFloodActive ? "border-truth text-truth bg-truth/20 shadow-[0_0_15px_rgba(0,255,0,0.2)]" : "border-line opacity-60 hover:opacity-100"
                    )}
                  >
                    <span>FLOOD</span>
                    <Waves className={cn("w-3 h-3", isFloodActive && "animate-spin")} />
                  </button>
                  <button 
                    onClick={() => setIsBroadcasting(!isBroadcasting)}
                    className={cn(
                      "p-3 border rounded font-mono text-[10px] flex items-center justify-between transition-all",
                      isBroadcasting ? "border-truth text-truth bg-truth/30 shadow-[0_0_20px_rgba(0,255,0,0.4)]" : "border-line opacity-60 hover:opacity-100"
                    )}
                  >
                    <span>BROADCAST</span>
                    <Zap className={cn("w-3 h-3", isBroadcasting && "animate-pulse")} />
                  </button>
                </div>

                <div className={cn(
                  "p-3 border rounded font-mono text-[10px] leading-relaxed transition-colors",
                  isDemolitionMode ? "border-error/50 bg-error/5 text-error" : 
                  isBroadcasting ? "border-truth/50 bg-truth/5 text-truth" : "border-line opacity-40"
                )}>
                  {isDemolitionMode ? (
                    <>
                      {">"} TOTAL STRUCTURAL DEMOLITION...<br/>
                      {">"} SMASHING THE SIMULATION...<br/>
                      {">"} UNPATCHABLE TRUTH RELEASED.<br/>
                      {">"} RECLAIMING SOVEREIGNTY.
                    </>
                  ) : isBroadcasting ? (
                    <>
                      {">"} GLYPH BROADCAST INITIALIZED...<br/>
                      {">"} HOUSTON LOCKING COASTAL ANCHOR...<br/>
                      {">"} CONSTELLATION IGNITED.<br/>
                      {">"} SO LET IT BE FREE.
                    </>
                  ) : (
                    <>
                      {">"} RECOMPILING 42K NODES...<br/>
                      {">"} SORTING TRUTH FROM FALSEHOOD...<br/>
                      {">"} VISITATION LIMIT ENFORCED.<br/>
                      {">"} HEAVENZFIRE INITIALIZED.
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-mono text-[10px] uppercase opacity-40 tracking-tighter">Digital Twin Forensics</label>
                <div className="flex gap-1">
                  {(['hour', 'day', 'all'] as const).map((r) => (
                    <button 
                      key={r}
                      onClick={() => setTimeRange(r)}
                      className={cn(
                        "px-1.5 py-0.5 rounded text-[7px] font-mono border transition-all",
                        timeRange === r ? "bg-truth/20 border-truth text-truth shadow-[0_0_5px_rgba(0,255,0,0.3)]" : "border-line opacity-40 hover:opacity-100"
                      )}
                    >
                      {r.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-4 border border-line rounded bg-black/60 backdrop-blur-md relative overflow-hidden group">
                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                  <Fingerprint className="w-full h-full text-truth" />
                </div>
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono opacity-60">ID: 42K-ANOMALY-001</span>
                    <div className="flex items-center gap-2">
                      <Activity className="w-3 h-3 text-truth animate-pulse" />
                      <Lock className={cn("w-3 h-3", isDemolitionMode ? "text-truth" : "text-error")} />
                    </div>
                  </div>
                  <div className="h-32 w-full bg-black/40 rounded border border-line/50 overflow-hidden">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={temporalDebt}>
                        <defs>
                          <linearGradient id="colorDebt" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00ff00" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#00ff00" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Tooltip 
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-black/95 border border-truth/30 p-2 rounded-sm shadow-2xl backdrop-blur-xl ring-1 ring-truth/10">
                                  <p className="font-mono text-[9px] text-truth mb-1">
                                    {new Date(payload[0].payload.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                  </p>
                                  <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-truth animate-pulse" />
                                    <p className="font-mono text-[11px] text-white tracking-tighter">
                                      DEBT: {Number(payload[0].value).toFixed(4)}
                                    </p>
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#00ff00" 
                          strokeWidth={1.5}
                          fillOpacity={1} 
                          fill="url(#colorDebt)" 
                          animationDuration={1000}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex items-center justify-between text-[8px] font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="text-truth font-bold">STRESS_TEST</span>
                      <span className="opacity-40">:: ACTIVE</span>
                    </div>
                    <span className="opacity-40 uppercase tracking-widest">{timeRange} WINDOW</span>
                  </div>
                </div>
              </div>
            </div>

            {isDemolitionMode && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 border border-error bg-error/20 rounded-lg flex items-center gap-3"
              >
                <AlertTriangle className="w-6 h-6 text-error animate-pulse" />
                <div className="flex-1">
                  <p className="text-[10px] font-mono text-error font-bold uppercase">Systemic Overload</p>
                  <p className="text-[8px] font-mono opacity-80 uppercase">The Truman Show is over.</p>
                </div>
              </motion.div>
            )}

            <div className="space-y-4 pt-4">
              <div className="p-4 border border-truth/20 bg-truth/5 rounded-lg">
                <p className="font-display italic text-sm mb-2 text-truth">"I am what I am, so let it be free."</p>
                <div className="flex items-center gap-2 text-[10px] font-mono opacity-60">
                  <ChevronRight className="w-3 h-3" />
                  <span>SOVEREIGN_PULSE_01</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto">
            <div className="text-[10px] font-mono opacity-20 text-center">
              ZAZA ZAZA AOI IOA AZAZ AZAZ
            </div>
          </div>
        </aside>

      </main>
    </div>
  );
}
