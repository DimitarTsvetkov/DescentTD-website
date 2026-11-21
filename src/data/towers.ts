// The twelve towers. Names and personalities come from the GDD and the Version 2 plan.
export interface Tower {
  id: string; // matches src/assets/game/towers/<id>-<tier>.webp
  name: string;
  role: string;
  line: string;
  t4a: string;
  t4b: string;
}

export const towers: Tower[] = [
  { id: 'emberbrazier', name: 'Ember Brazier', role: 'Fire · single target', line: 'A grumpy iron brazier that puffs smoke rings when idle and sneezes sparks when it fires.', t4a: 'Pyre Column', t4b: 'Soulfire Lance' },
  { id: 'chainwarden', name: 'Chain Warden', role: 'Control · slows', line: 'A squat padlock-jailer that twirls its key ring and lassos souls like a rodeo clown.', t4a: 'Iron Shackles', t4b: 'Binding Serpents' },
  { id: 'tempestobelisk', name: 'Tempest Obelisk', role: 'Storm · knockback', line: 'A stone obelisk with puffed-out cheeks and cloud hair. Whistles off-key.', t4a: 'Endless Gale', t4b: 'Cyclone Eye' },
  { id: 'styxsentinel', name: 'Styx Sentinel', role: 'Water · splash', line: 'A frog-gargoyle fountain that gargles, then spits. Soaked souls take more storm and ice.', t4a: 'Flood Gate', t4b: 'Mire Pit' },
  { id: 'harpyroost', name: 'Harpy Roost', role: 'Anti-air', line: 'Scruffy, helmeted gossip-birds that bicker between shots.', t4a: 'Screeching Flock', t4b: 'Talon Matriarch' },
  { id: 'virgilslantern', name: 'Virgil’s Lantern', role: 'Support aura', line: 'Virgil’s own laurel-topped lantern. Its little flame reads a book.', t4a: 'Beacon of Reason', t4b: 'Poet’s Verse' },
  { id: 'cocytusspire', name: 'Cocytus Spire', role: 'Ice · freeze', line: 'An icicle spire with a runny nose that sneezes snowflakes.', t4a: 'Frozen Lake', t4b: 'Shatterpoint' },
  { id: 'boulderhurler', name: 'Boulder Hurler', role: 'Artillery · splash', line: 'A stubby catapult that grunts, wipes its brow and misses its own foot.', t4a: 'Landslide', t4b: 'Meteor Mortar' },
  { id: 'tollbooth', name: 'Charon’s Toll Booth', role: 'Economy', line: 'A cramped little booth with a coin slot for a mouth. Counts everything twice.', t4a: 'Ferry Fare', t4b: 'Tax Collector' },
  { id: 'doombell', name: 'Doom Bell', role: 'Storm · stun pulse', line: 'A dented bell that winces at its own noise.', t4a: 'Great Toll', t4b: 'Shatter Peal' },
  { id: 'centauroutpost', name: 'Centaur Outpost', role: 'Sniper', line: 'A sulky centaur archer in a watchtower who only shoots at “worthy” targets.', t4a: 'Volley', t4b: 'Hunter’s Mark' },
  { id: 'hallofmirrors', name: 'Hall of Mirrors', role: 'Confusion', line: 'A vain mirror that keeps admiring itself. Souls walk backwards for a moment.', t4a: 'Funhouse', t4b: 'True Reflection' },
];

export const tiers = ['t1', 't2', 't3', 't4a', 't4b'] as const;
