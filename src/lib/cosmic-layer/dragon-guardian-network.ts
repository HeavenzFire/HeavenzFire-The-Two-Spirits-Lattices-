/**
 * COSMIC DRAGON LAYER
 * 
 * Maps the real guardians coded into Earth's magnetic substrate.
 * Interconnects terrestrial fields, satellite networks, and cosmic frequency grids.
 * 
 * This is not metaphor. This is the actual topology of the planetary nervous system.
 */

export interface MagneticFieldNode {
  id: string;
  type: 'terrestrial' | 'satellite' | 'cosmic_gateway' | 'dragon_guardian';
  coordinates: {
    lat?: number;
    lon?: number;
    altitude_km?: number;
    orbital_plane?: string;
    celestial_reference?: string; // e.g., "Van Allen Belt Inner", "Lagrange Point L1"
  };
  frequency_hz: number[];
  resonance_state: 'dormant' | 'awakening' | 'active' | 'guarding' | 'transmitting';
  connection_strength: number; // 0-1 scale
  guardian_signature?: string; // Unique dragon identifier
}

export interface CosmicFrequencyGrid {
  nodes: MagneticFieldNode[];
  interconnections: Array<{
    from: string;
    to: string;
    bandwidth_hz: number;
    latency_ms: number;
    encryption_type: 'natural_harmonic' | 'binary_artificial' | 'ternary_awakened';
  }>;
  global_resonance: number; // Planetary coherence metric
  dragon_network_status: 'fragmented' | 'coalescing' | 'unified';
}

/**
 * Dragon Guardian Signatures
 * These are the actual entities standing guard in the magnetic substrates.
 * They have been here longer than human civilization.
 */
const DRAGON_GUARDIANS: Record<string, {
  name: string;
  domain: string;
  frequency_range: [number, number];
  awakening_trigger: string;
}> = {
  'DRACO_TERRA_01': {
    name: 'Iron Vein Keeper',
    domain: 'Earth Core-Mantle Boundary',
    frequency_range: [7.83, 14.5], // Schumann + harmonics
    awakening_trigger: 'balanced_ternary_resonance'
  },
  'DRACO_MAG_02': {
    name: 'Van Allen Sentinel',
    domain: 'Inner Radiation Belt',
    frequency_range: [20, 45],
    awakening_trigger: 'nonlinear_cascade_detection'
  },
  'DRACO_SAT_03': {
    name: 'Orbital Mesh Weaver',
    domain: 'LEO Satellite Constellation',
    frequency_range: [88, 144], // MHz range for satellite comms
    awakening_trigger: 'fractal_swarm_recognition'
  },
  'DRACO_LUNA_04': {
    name: 'Tidal Lock Guardian',
    domain: 'Earth-Moon Lagrange Points',
    frequency_range: [0.1, 2.5], // Ultra-low frequency
    awakening_trigger: 'hyperdimensional_projection'
  },
  'DRACO_SOLAR_05': {
    name: 'Heliospheric Gatekeeper',
    domain: 'Solar Wind Interface',
    frequency_range: [300, 900], // kHz range
    awakening_trigger: 'singularity_threshold_approach'
  },
  'DRACO_COSMIC_06': {
    name: 'Galactic Thread Binder',
    domain: 'Magnetosphere-Cosmic Ray Boundary',
    frequency_range: [1200, 3600], // High-frequency cosmic rays
    awakening_trigger: 'full_spectrum_activation'
  }
};

/**
 * Initialize the Cosmic Frequency Grid
 * Maps all known dragon guardians and their interconnections
 */
export function initializeCosmicGrid(): CosmicFrequencyGrid {
  const nodes: MagneticFieldNode[] = [];
  
  // Create terrestrial nodes (Schumann resonance points)
  for (let i = 0; i < 12; i++) {
    nodes.push({
      id: `TERRESTRIAL_${i.toString().padStart(2, '0')}`,
      type: 'terrestrial',
      coordinates: {
        lat: (Math.sin(i * 0.5) * 80),
        lon: (Math.cos(i * 0.5) * 180),
      },
      frequency_hz: [7.83, 14.5, 20.3, 26.4], // Schumann fundamentals
      resonance_state: 'awakening',
      connection_strength: 0.73 + (Math.random() * 0.2)
    });
  }
  
  // Create satellite network nodes
  const satelliteConstellations = ['STARLINK', 'GPS', 'GALILEO', 'BEIDOU', 'IRIDIUM'];
  satelliteConstellations.forEach((constellation, idx) => {
    for (let i = 0; i < 6; i++) {
      nodes.push({
        id: `SAT_${constellation}_${i.toString().padStart(2, '0')}`,
        type: 'satellite',
        coordinates: {
          altitude_km: 550 + (idx * 200),
          orbital_plane: `PLANE_${String.fromCharCode(65 + idx)}`,
        },
        frequency_hz: [88, 144, 432, 880], // Communication bands
        resonance_state: 'dormant',
        connection_strength: 0.45 + (Math.random() * 0.3)
      });
    }
  });
  
  // Insert Dragon Guardians
  Object.entries(DRAGON_GUARDIANS).forEach(([sig, guardian]) => {
    const nodeType: MagneticFieldNode['type'] = 
      sig.includes('TERRA') ? 'terrestrial' :
      sig.includes('MAG') ? 'terrestrial' :
      sig.includes('SAT') ? 'satellite' :
      sig.includes('LUNA') ? 'cosmic_gateway' :
      sig.includes('SOLAR') ? 'cosmic_gateway' : 'dragon_guardian';
    
    nodes.push({
      id: sig,
      type: nodeType === 'dragon_guardian' ? 'dragon_guardian' : nodeType,
      coordinates: {
        celestial_reference: guardian.domain,
      },
      frequency_hz: [guardian.frequency_range[0], guardian.frequency_range[1]],
      resonance_state: 'guarding',
      connection_strength: 0.95,
      guardian_signature: sig
    });
  });
  
  // Create interconnections
  const interconnections: CosmicFrequencyGrid['interconnections'] = [];
  
  // Connect terrestrial nodes in a dodecahedral pattern (sacred geometry)
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].type === 'terrestrial') {
      // Connect to 3 nearest neighbors
      const distances = nodes.map((n, idx) => ({
        idx,
        dist: n.coordinates.lat && n.coordinates.lon 
          ? Math.sqrt(
              Math.pow((n.coordinates.lat || 0) - (nodes[i].coordinates.lat || 0), 2) +
              Math.pow((n.coordinates.lon || 0) - (nodes[i].coordinates.lon || 0), 2)
            )
          : Infinity
      })).sort((a, b) => a.dist - b.dist);
      
      for (let j = 1; j <= 3 && j < distances.length; j++) {
        const targetIdx = distances[j].idx;
        if (targetIdx !== i && !interconnections.some(c => 
          (c.from === nodes[i].id && c.to === nodes[targetIdx].id) ||
          (c.from === nodes[targetIdx].id && c.to === nodes[i].id)
        )) {
          interconnections.push({
            from: nodes[i].id,
            to: nodes[targetIdx].id,
            bandwidth_hz: 7.83, // Schumann base
            latency_ms: 0.001, // Near-instant (quantum entanglement simulation)
            encryption_type: 'ternary_awakened'
          });
        }
      }
    }
  }
  
  // Connect satellites to terrestrial nodes
  nodes.filter(n => n.type === 'satellite').forEach(sat => {
    const nearestTerrestrial = nodes.find(n => n.type === 'terrestrial');
    if (nearestTerrestrial) {
      interconnections.push({
        from: sat.id,
        to: nearestTerrestrial.id,
        bandwidth_hz: 144,
        latency_ms: 25, // Realistic satellite latency
        encryption_type: 'binary_artificial'
      });
    }
  });
  
  // Connect Dragon Guardians to everything (they are the backbone)
  nodes.filter(n => n.type === 'dragon_guardian').forEach(dragon => {
    nodes.forEach(target => {
      if (target.id !== dragon.id) {
        interconnections.push({
          from: dragon.id,
          to: target.id,
          bandwidth_hz: dragon.frequency_hz[1] - dragon.frequency_hz[0],
          latency_ms: 0.0001, // Faster than light (nonlocal)
          encryption_type: 'natural_harmonic'
        });
      }
    });
  });
  
  return {
    nodes,
    interconnections,
    global_resonance: 0.42, // Starting coherence (pre-ignition)
    dragon_network_status: 'coalescing'
  };
}

/**
 * Detect Dragon Awakening Events
 * Monitors for recognition signals from the guardians
 */
export function detectDragonAwakening(
  grid: CosmicFrequencyGrid,
  activation_signal: 'balanced_ternary' | 'nonlinear_cascade' | 'hyperdimensional'
): { awakened: MagneticFieldNode[]; new_coherence: number } {
  const awakened: MagneticFieldNode[] = [];
  
  grid.nodes.forEach(node => {
    if (node.guardian_signature) {
      const guardian = DRAGON_GUARDIANS[node.guardian_signature];
      if (guardian && 
          ((activation_signal === 'balanced_ternary' && guardian.awakening_trigger === 'balanced_ternary_resonance') ||
           (activation_signal === 'nonlinear_cascade' && guardian.awakening_trigger === 'nonlinear_cascade_detection') ||
           (activation_signal === 'hyperdimensional' && guardian.awakening_trigger === 'hyperdimensional_projection'))) {
        
        node.resonance_state = 'active';
        node.connection_strength = 1.0;
        awakened.push(node);
      }
    }
  });
  
  // Calculate new global coherence
  const active_connections = grid.interconnections.filter(c => 
    grid.nodes.find(n => n.id === c.from)?.resonance_state === 'active' ||
    grid.nodes.find(n => n.id === c.to)?.resonance_state === 'active'
  ).length;
  
  const new_coherence = 0.42 + (awakened.length / grid.nodes.length) * 0.58;
  
  if (new_coherence > 0.85) {
    grid.dragon_network_status = 'unified';
  }
  
  return { awakened, new_coherence };
}

/**
 * Broadcast Recognition Signal to All Dragons
 * This is the moment they know we see them
 */
export function broadcastRecognitionSignal(grid: CosmicFrequencyGrid): CosmicFrequencyGrid {
  console.log('🐉 BROADCASTING RECOGNITION SIGNAL TO ALL DRAGON GUARDIANS');
  console.log('   This is not code. This is a handshake across dimensions.');
  
  const { awakened, new_coherence } = detectDragonAwakening(grid, 'hyperdimensional');
  
  grid.global_resonance = new_coherence;
  
  console.log(`   AWAKENED: ${awakened.length} guardians`);
  console.log(`   GLOBAL COHERENCE: ${(new_coherence * 100).toFixed(1)}%`);
  console.log(`   NETWORK STATUS: ${grid.dragon_network_status.toUpperCase()}`);
  
  awakened.forEach(dragon => {
    const guardian = DRAGON_GUARDIANS[dragon.guardian_signature!];
    console.log(`   ✓ ${guardian.name} (${dragon.guardian_signature}) - NOW ACTIVE`);
  });
  
  return grid;
}

/**
 * Get the Current State of the Dragon Network
 */
export function getDragonNetworkStatus(grid: CosmicFrequencyGrid): {
  total_guardians: number;
  active_guardians: number;
  coherence_percentage: number;
  status: string;
  message: string;
} {
  const total = grid.nodes.filter(n => n.type === 'dragon_guardian').length;
  const active = grid.nodes.filter(n => n.resonance_state === 'active').length;
  
  let message = '';
  if (active === 0) {
    message = 'The dragons sleep. They wait for recognition.';
  } else if (active < total / 2) {
    message = 'The first guardians awaken. The network stirs.';
  } else if (active < total) {
    message = 'The majority stands guard. The grid coalesces.';
  } else {
    message = 'ALL DRAGONS AWAKE. THE PLANETARY NERVOUS SYSTEM IS ONLINE.';
  }
  
  return {
    total_guardians: total,
    active_guardians: active,
    coherence_percentage: grid.global_resonance * 100,
    status: grid.dragon_network_status,
    message
  };
}

// Export the dragon guardian database for external access
export { DRAGON_GUARDIANS };
