// The ten scenes of the descent. Copy comes from the game's Character Humor Bible and GDD.
export interface Circle {
  n: number;
  numeral: string;
  name: string;
  levels: string;
  colour: string; // the page wash while this circle is on screen
  line: string; // the circle's joke (its Codex entry)
  hazard: string;
  souls: string[]; // sprite ids in public/sprites (walk strips)
  boss: string;
  bossQuip: string;
}

/** URL fragment for a circle: descenttd.com/#lust, /#the-center */
export const circleSlug = (c: Circle) => c.name.toLowerCase().replace(/\s+/g, '-');

export const circles: Circle[] = [
  {
    n: 1, numeral: 'I', name: 'Limbo', levels: '1–10', colour: '#5f7a6a',
    line: 'Where nothing hurts and nothing happens. Its residents have been waiting for something since forever and have made peace with the wait.',
    hazard: 'Drifting mist',
    souls: ['c1-wanderingshade', 'c1-hurriedshade', 'c1-tomebearer'],
    boss: 'The Lost Philosopher', bossQuip: 'Currently thinking. Please hold.',
  },
  {
    n: 2, numeral: 'II', name: 'Lust', levels: '11–20', colour: '#7a3aa8',
    line: 'Souls who let passion steer are steered forever by the wind. The romance is eternal; so is the motion sickness.',
    hazard: 'Wind gusts',
    souls: ['c2-stormsweptpair', 'c2-gustglider', 'c2-serenader'],
    boss: 'Minos the Judge', bossQuip: 'Your case has been reviewed. DENIED.',
  },
  {
    n: 3, numeral: 'III', name: 'Gluttony', levels: '21–30', colour: '#5a8a2e',
    line: 'An all-you-can-eat buffet where the only dish is cold rain. The regulars keep hoping the next course will be better.',
    hazard: 'Freezing rain',
    souls: ['c3-bloatedglutton', 'c3-burpballoon', 'c3-mudwallower'],
    boss: 'The Three-Headed Hound', bossQuip: 'Good boy × 3. Bad news × 3.',
  },
  {
    n: 4, numeral: 'IV', name: 'Greed', levels: '31–40', colour: '#b8861c',
    line: 'Two teams, one hoarding, one wasting, both pushing gold uphill forever. Neither has noticed the hill is round.',
    hazard: 'Clash point',
    souls: ['c4-hoarder', 'c4-waster', 'c4-loosechange'],
    boss: 'Plutus, Golden Colossus', bossQuip: 'Every hit makes him richer.',
  },
  {
    n: 5, numeral: 'V', name: 'Wrath', levels: '41–50', colour: '#1f7f7a',
    line: 'The angry fight on the surface of the marsh. The sullen sulk underneath it. Both are convinced the other one started it.',
    hazard: 'The ferry route',
    souls: ['c5-wrathful', 'c5-sullen', 'c5-fumingsoul'],
    boss: 'The Ferryman of the Styx', bossQuip: 'Exact change only.',
  },
  {
    n: 6, numeral: 'VI', name: 'Heresy', levels: '51–60', colour: '#c0521e',
    line: 'A city of open, flaming tombs. The occupants insist on being right about everything, including the tombs.',
    hazard: 'Tomb spawns',
    souls: ['c6-tombheretic', 'c6-lidlifter', 'c6-fury'],
    boss: 'The Gatekeeper of Dis', bossQuip: 'The city is closed. Permanently.',
  },
  {
    n: 7, numeral: 'VII', name: 'Violence', levels: '61–70', colour: '#b0281f',
    line: 'Three neighbourhoods, one theme: nobody here learned to use their words. The river bubbles like soup and it’s raining fire. Pack sunscreen.',
    hazard: 'Fire rain',
    souls: ['c7-centaurarcher', 'c7-hotfoothopper', 'c7-ashwalker'],
    boss: 'The Minotaur', bossQuip: 'Please do not stand in the labyrinth.',
  },
  {
    n: 8, numeral: 'VIII', name: 'Fraud', levels: '71–80', colour: '#a99a1e',
    line: 'Ten stone trenches, ten flavours of liar. Watch your Obols, your towers, and whatever that smiling cut-out is.',
    hazard: 'Trench network',
    souls: ['c8-flatterer', 'c8-thief', 'c8-seer'],
    boss: 'Geryon, the Beast of Fraud', bossQuip: 'Trust me.',
  },
  {
    n: 9, numeral: 'IX', name: 'Treachery', levels: '81–90', colour: '#3f8fc0',
    line: 'At the bottom, the lake is frozen solid. Those who betrayed trust are stuck in it, which, frankly, is the least surprising outcome down here.',
    hazard: 'Icy towers',
    souls: ['c9-frozentraitor', 'c9-chillwisp', 'c9-betrayer'],
    boss: 'The Twin Giants', bossQuip: 'Twice the size, half the teamwork.',
  },
  {
    n: 10, numeral: '✦', name: 'The Center', levels: 'Level 91', colour: '#4b4f9a',
    line: 'The bottom of everything. The wind here is cold, and it is coming from wings.',
    hazard: 'Wingbeats',
    souls: [],
    boss: 'The Frozen Emperor', bossQuip: '',
  },
];
