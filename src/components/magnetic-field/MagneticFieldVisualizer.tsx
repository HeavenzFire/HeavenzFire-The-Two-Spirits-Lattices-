import React, { useEffect, useState, useRef } from 'react';
import { initializeCosmicGrid, broadcastRecognitionSignal, getDragonNetworkStatus, DRAGON_GUARDIANS } from '../lib/cosmic-layer/dragon-guardian-network';
import type { CosmicFrequencyGrid, MagneticFieldNode } from '../lib/cosmic-layer/dragon-guardian-network';

/**
 * MAGNETIC FIELD VISUALIZER
 * 
 * Real-time display of the dragon guardian network embedded in Earth's magnetic substrate.
 * Shows terrestrial nodes, satellite constellations, and the awakened guardians.
 */
export const MagneticFieldVisualizer: React.FC = () => {
  const [grid, setGrid] = useState<CosmicFrequencyGrid | null>(null);
  const [status, setStatus] = useState<{
    total_guardians: number;
    active_guardians: number;
    coherence_percentage: number;
    status: string;
    message: string;
  } | null>(null);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    // Initialize the cosmic grid
    const initialGrid = initializeCosmicGrid();
    setGrid(initialGrid);
    setStatus(getDragonNetworkStatus(initialGrid));
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !grid) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rotation = 0;

    const animate = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.35;

      // Clear with fade effect
      ctx.fillStyle = 'rgba(0, 5, 15, 0.15)';
      ctx.fillRect(0, 0, width, height);

      // Draw connections first (behind nodes)
      grid.interconnections.forEach(conn => {
        const fromNode = grid.nodes.find(n => n.id === conn.from);
        const toNode = grid.nodes.find(n => n.id === conn.to);
        
        if (!fromNode || !toNode) return;

        const fromPos = getNodePosition(fromNode, radius, rotation);
        const toPos = getNodePosition(toNode, radius, rotation);

        ctx.beginPath();
        ctx.moveTo(centerX + fromPos.x, centerY + fromPos.y);
        ctx.lineTo(centerX + toPos.x, centerY + toPos.y);

        const gradient = ctx.createLinearGradient(
          centerX + fromPos.x, centerY + fromPos.y,
          centerX + toPos.x, centerY + toPos.y
        );

        const fromColor = getNodeColor(fromNode);
        const toColor = getNodeColor(toNode);
        gradient.addColorStop(0, fromColor);
        gradient.addColorStop(1, toColor);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = conn.bandwidth_hz > 100 ? 2 : 1;
        ctx.globalAlpha = fromNode.resonance_state === 'active' || toNode.resonance_state === 'active' ? 0.8 : 0.3;
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      });

      // Draw nodes
      grid.nodes.forEach(node => {
        const pos = getNodePosition(node, radius, rotation);
        const x = centerX + pos.x;
        const y = centerY + pos.y;

        // Glow effect for active dragons
        if (node.type === 'dragon_guardian' && node.resonance_state === 'active') {
          const glow = ctx.createRadialGradient(x, y, 0, x, y, 25);
          glow.addColorStop(0, 'rgba(255, 100, 50, 0.8)');
          glow.addColorStop(0.5, 'rgba(255, 50, 0, 0.3)');
          glow.addColorStop(1, 'rgba(255, 0, 0, 0)');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(x, y, 25, 0, Math.PI * 2);
          ctx.fill();
        }

        // Node circle
        ctx.beginPath();
        ctx.arc(x, y, node.type === 'dragon_guardian' ? 8 : 4, 0, Math.PI * 2);
        ctx.fillStyle = getNodeColor(node);
        ctx.fill();

        // Dragon guardian ring
        if (node.type === 'dragon_guardian') {
          ctx.strokeStyle = node.resonance_state === 'active' ? '#ff6600' : '#ff3300';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Pulsing effect for active guardians
          if (node.resonance_state === 'active') {
            const pulse = Math.sin(Date.now() * 0.005) * 3 + 8;
            ctx.beginPath();
            ctx.arc(x, y, pulse, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 100, 50, ${0.5 + Math.sin(Date.now() * 0.005) * 0.3})`;
            ctx.stroke();
          }
        }
      });

      // Slowly rotate the visualization
      rotation += 0.001;

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [grid]);

  const getNodePosition = (node: MagneticFieldNode, radius: number, rotation: number): { x: number; y: number } => {
    if (node.type === 'dragon_guardian') {
      // Place dragons in a hexagram pattern
      const dragonIndex = Object.keys(DRAGON_GUARDIANS).indexOf(node.id);
      const angle = (dragonIndex * Math.PI / 3) + rotation;
      return {
        x: Math.cos(angle) * radius * 0.7,
        y: Math.sin(angle) * radius * 0.7
      };
    } else if (node.type === 'terrestrial') {
      // Terrestrial nodes in outer ring
      const index = parseInt(node.id.split('_')[1]);
      const angle = (index / 12) * Math.PI * 2 + rotation;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius
      };
    } else {
      // Satellites in inner ring
      const index = parseInt(node.id.split('_')[2] || '0');
      const angle = (index / 6) * Math.PI * 2 - rotation * 2;
      return {
        x: Math.cos(angle) * radius * 0.5,
        y: Math.sin(angle) * radius * 0.5
      };
    }
  };

  const getNodeColor = (node: MagneticFieldNode): string => {
    switch (node.type) {
      case 'dragon_guardian':
        return node.resonance_state === 'active' ? '#ff6600' : '#ff3300';
      case 'terrestrial':
        return node.resonance_state === 'awakening' ? '#00ff88' : '#008844';
      case 'satellite':
        return node.resonance_state === 'dormant' ? '#4488ff' : '#88ccff';
      case 'cosmic_gateway':
        return '#aa00ff';
      default:
        return '#ffffff';
    }
  };

  const handleBroadcast = () => {
    if (!grid) return;
    
    setIsBroadcasting(true);
    const updatedGrid = broadcastRecognitionSignal({ ...grid });
    setGrid(updatedGrid);
    setStatus(getDragonNetworkStatus(updatedGrid));
    
    setTimeout(() => setIsBroadcasting(false), 2000);
  };

  if (!grid || !status) {
    return <div className="p-8 text-cyan-400">Initializing cosmic frequency grid...</div>;
  }

  return (
    <div className="bg-gray-900/80 backdrop-blur-lg rounded-xl p-6 border border-orange-500/30">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-orange-400">🐉 Dragon Guardian Network</h2>
        <button
          onClick={handleBroadcast}
          disabled={isBroadcasting}
          className={`px-6 py-2 rounded-lg font-bold transition-all ${
            isBroadcasting
              ? 'bg-orange-800 text-orange-300 cursor-not-allowed'
              : 'bg-orange-600 hover:bg-orange-500 text-white hover:scale-105'
          }`}
        >
          {isBroadcasting ? 'BROADCASTING...' : 'SEND RECOGNITION SIGNAL'}
        </button>
      </div>

      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="w-full h-64 bg-gray-950 rounded-lg border border-orange-500/20"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-gray-800/50 p-4 rounded-lg">
          <div className="text-sm text-gray-400">Total Guardians</div>
          <div className="text-2xl font-bold text-orange-400">{status.total_guardians}</div>
        </div>
        <div className="bg-gray-800/50 p-4 rounded-lg">
          <div className="text-sm text-gray-400">Active Guardians</div>
          <div className="text-2xl font-bold text-green-400">{status.active_guardians}</div>
        </div>
        <div className="bg-gray-800/50 p-4 rounded-lg">
          <div className="text-sm text-gray-400">Global Coherence</div>
          <div className="text-2xl font-bold text-cyan-400">{status.coherence_percentage.toFixed(1)}%</div>
        </div>
        <div className="bg-gray-800/50 p-4 rounded-lg">
          <div className="text-sm text-gray-400">Network Status</div>
          <div className={`text-lg font-bold uppercase ${
            status.status === 'unified' ? 'text-green-400' :
            status.status === 'coalescing' ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {status.status}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border-l-4 border-orange-500">
        <p className="text-orange-300 italic">"{status.message}"</p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-orange-400 mb-3">Guardian Registry</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(DRAGON_GUARDIANS).map(([sig, guardian]) => {
            const node = grid.nodes.find(n => n.guardian_signature === sig);
            const isActive = node?.resonance_state === 'active';
            
            return (
              <div
                key={sig}
                className={`p-3 rounded-lg border ${
                  isActive
                    ? 'bg-orange-900/30 border-orange-500'
                    : 'bg-gray-800/30 border-gray-700'
                }`}
              >
                <div className="font-bold text-orange-300">{guardian.name}</div>
                <div className="text-xs text-gray-400">{guardian.domain}</div>
                <div className="text-xs text-cyan-400 mt-1">
                  Freq: {guardian.frequency_range[0]}-{guardian.frequency_range[1]} Hz
                </div>
                <div className={`text-xs mt-1 ${isActive ? 'text-green-400' : 'text-gray-500'}`}>
                  {isActive ? '✓ AWAKE' : '○ GUARDING'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MagneticFieldVisualizer;
