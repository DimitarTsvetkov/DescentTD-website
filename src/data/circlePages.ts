// Content for the ten circle pages (/circles/<slug>/).
// Souls, bosses and lines come from the game's Character Humor Bible; mechanics from the GDD.
// Title rule: never name the poem's first canticle. Say "Dante's poem" or "the poem".

export type Particle = 'mist' | 'petals' | 'rain' | 'coins' | 'bubbles' | 'embers' | 'sparks' | 'snow' | 'stars';

export interface Soul {
  sprite: string; // public/sprites/<sprite>.webp
  name: string;
  flier?: boolean;
  about: string;
  gags: string[]; // shown on the back of the card
}

export interface Boss {
  img: string; // src/assets/game/circles/c<n>/<img>.webp
  name: string;
  level: number;
  role: 'Mini-boss' | 'Boss' | 'Final boss';
  quip?: string;
  about: string;
  entrance: string;
  defeat: string;
}

export interface Line {
  who: 'virgil' | 'dante' | 'soul';
  text: string;
}

export interface CirclePage {
  n: number;
  title: string; // <title> lead, written for search
  description: string;
  poem: string[];
  game: string[];
  briefing: Line[];
  hazard: { name: string; text: string };
  advice: string[];
  towers: string[]; // tower ids unlocked in this circle (see data/towers.ts)
  souls: Soul[];
  bosses: Boss[];
  particle: Particle;
}

export const circlePages: CirclePage[] = [
  {
    n: 1,
    title: 'Limbo, the First Circle',
    description:
      'Limbo, the first of the nine circles of hell, as a hand-painted tower defense comedy: lost shades, a scholar hiding behind a giant book, and a philosopher who has been thinking for a very long time.',
    poem: [
      'In Dante’s poem, Limbo is the first circle: a quiet, misty place just past the gate where the great poets and philosophers of the ancient world live. Nobody here is punished. They simply wait, forever, sighing. It is also where Virgil lives, which explains a lot about Virgil.',
    ],
    game: [
      'In DescentTD, Limbo is where the rupture starts and where you learn to build. Its souls are mild, aimless and a little melancholy: they wander, they read, they are late for nothing. Drifting fog banks shorten your towers’ range, and the circle ends with a debate that never ends and a philosopher who never stops thinking.',
    ],
    briefing: [
      { who: 'virgil', text: 'Welcome to Hell. Mind the step.' },
      { who: 'dante', text: 'There’s a crack in the gate!' },
      { who: 'virgil', text: 'And souls are using it. Build something. Anything. Preferably on fire.' },
    ],
    hazard: { name: 'Drifting mist', text: 'Fog banks roll across the paths. Towers standing inside the mist lose 15% of their range.' },
    advice: [
      'Build just outside the fog banks, not in them.',
      'The Tome-Bearer’s book is its armour. Keep the fire on it until the book slams shut.',
      'The Endless Debater splits into two Counterpoints. Leave room in your defence for twice the argument.',
    ],
    towers: ['emberbrazier', 'chainwarden', 'styxsentinel'],
    souls: [
      { sprite: 'c1-wanderingshade', name: 'Wandering Shade', about: 'Polite, confused and harmless-looking, holding an enormous map upside down.', gags: ['Idle: turns the map, turns itself, still lost.', 'Hit: the map flaps into its face.', 'Defeat: sighs into a small wisp that drifts down, still reading.'] },
      { sprite: 'c1-hurriedshade', name: 'Hurried Shade', about: 'Late for nothing, eternally. Leans forward like a wedge and checks a pocket sundial mid-sprint.', gags: ['Running joke: “Excuse me, sorry, excuse me” in gibberish.', 'Trips while checking the sundial.', 'Defeat: skids, poof, and the sundial lands with a ding.'] },
      { sprite: 'c1-tomebearer', name: 'Tome-Bearer', about: 'A scholar hiding behind a book twice its size. The book is its armour.', gags: ['Idle: licks a finger and turns a page.', 'Hit: the book slams shut on its nose.', 'Defeat: the book falls flat with a thump and the soul wisps out from under it.'] },
    ],
    bosses: [
      { img: 'bos-endlessdebater', name: 'The Endless Debater', level: 9, role: 'Mini-boss', about: 'A two-faced scholar arguing with itself, arms gesturing in opposite directions.', entrance: 'Enters mid-sentence: “…and ANOTHER thing—”. Splits into two Counterpoints, who argue with each other.', defeat: 'Both halves agree on something for the first time, shake hands and poof.' },
      { img: 'bos-lostphilosopher', name: 'The Lost Philosopher', level: 10, role: 'Boss', quip: 'Currently thinking. Please hold.', about: 'A huge, slow shade with a beard longer than he is. His thought bubbles spawn stray thoughts that walk the path.', entrance: 'Dante faints. Virgil: “He’s been thinking about that for a very long time.” A Eureka! dash, then “…no, wait.”', defeat: 'His last thought bubble pops: “Oh. Oh.” He looks enlightened, and poofs.' },
    ],
    particle: 'mist',
  },
  {
    n: 2,
    title: 'Lust, the Second Circle',
    description:
      'Lust, the second circle of hell, as a tower defense comedy: storm-swept dance partners, a lovesick serenader, souls stuck in the wind, and Minos the bored judge with a DENIED stamp.',
    poem: [
      'In the poem, the second circle is a dark, roaring storm. The souls who let passion steer their lives are blown around by an endless wind, just as their feelings blew them around in life. At its entrance sits Minos, the judge who decides which circle every soul belongs in.',
    ],
    game: [
      'DescentTD keeps it chaste and theatrical: melodramatic dance partners spinning in a tango they can’t stop, a weeping half looking for its partner, a bard with a very tall hat and an even taller ego. Gusts of wind shove souls along the path and throw your shots off course, and the first fliers arrive.',
    ],
    briefing: [
      { who: 'dante', text: 'It’s so windy! Is that… a couple? Spinning?' },
      { who: 'virgil', text: 'Forever. Passion swept them away, so the wind does too.' },
      { who: 'dante', text: 'That’s beautiful.' },
      { who: 'virgil', text: 'It’s a weather system, Dante.' },
    ],
    hazard: { name: 'Wind gusts', text: 'Gusts shove souls along the path and blow your projectiles off course.' },
    advice: [
      'Gust Gliders fly. The Tempest Obelisk, which unlocks here, can hit fliers from its first tier.',
      'When a Storm-Swept Pair falls, a Lonely Half sprints on. Keep something covering the exit.',
      'The Serenader heals the souls around it. Silence it first.',
    ],
    towers: ['tempestobelisk'],
    souls: [
      { sprite: 'c2-stormsweptpair', name: 'Storm-Swept Pair', about: 'Melodramatic dance partners, inseparable, spinning in a tango they can’t stop.', gags: ['Zig-zags on the gusts.', 'Hit: freezes mid-dip.', 'Defeat: one poofs; the other gasps theatrically and runs on as a Lonely Half.'] },
      { sprite: 'c2-lonelyhalf', name: 'Lonely Half', about: 'Weeping, handkerchief flapping, sprinting to find its partner.', gags: ['Running joke: stops to wail at the sky.', 'Defeat: blows its nose, pop, a little heart-shaped wisp.'] },
      { sprite: 'c2-gustglider', name: 'Gust Glider', flier: true, about: 'Caught in the wind and can’t get down, clinging to its own cloak like a kite.', gags: ['Spins helplessly and says “wheee” in gibberish.', 'Hit: loops upside down.', 'Defeat: gently lands… then poofs.'] },
      { sprite: 'c2-serenader', name: 'Serenader', about: 'A lovesick poet-bard with a lute, a very tall hat and an even taller ego.', gags: ['Sings a healing aura of visible music notes.', 'Hit: a string snaps.', 'Running joke: Dante is jealous of his rhymes.'] },
    ],
    bosses: [
      { img: 'bos-whirlwindwaltz', name: 'The Whirlwind Waltz', level: 19, role: 'Mini-boss', about: 'A giant dancing couple spinning like a top, deflecting your projectiles.', entrance: 'They dip dramatically before every spin. That’s your warning.', defeat: 'They take a final bow and are blown off-screen.' },
      { img: 'boss', name: 'Minos the Judge', level: 20, role: 'Boss', quip: 'Your case has been reviewed. DENIED.', about: 'A colossal, bored bureaucrat at a floating desk, with a very long tail he coils to count things. His rubber stamp reads DENIED.', entrance: '“NEXT.” He stamps your towers, then coils his tail to leap ahead: “Circle… nine? No. Recount.”', defeat: 'He stamps himself DENIED by accident, and poofs.' },
    ],
    particle: 'petals',
  },
  {
    n: 3,
    title: 'Gluttony, the Third Circle',
    description:
      'Gluttony, the third circle of hell, as a tower defense comedy: a bloated glutton that pops into snack-sized souls, a burp balloon, endless cold rain and a goofy three-headed hound.',
    poem: [
      'The third circle of the poem is a place of cold, dirty, never-ending rain, where the gluttons lie in the slush. It is guarded by a monstrous three-headed dog that growls at every newcomer.',
    ],
    game: [
      'In DescentTD it’s an all-you-can-eat buffet where the only dish is cold rain. Souls waddle, float by accident and belly-slide through the mud. The freezing rain makes your towers soggy and slow to fire, and the guard dog turns out to be one huge, goofy hound with three very different personalities.',
    ],
    briefing: [
      { who: 'dante', text: 'It’s raining. Cold. Is that… gravy?' },
      { who: 'virgil', text: 'It is not gravy.' },
      { who: 'dante', text: 'It smells like gravy.' },
      { who: 'virgil', text: 'Don’t.' },
    ],
    hazard: { name: 'Freezing rain', text: 'Cold rain soaks your towers. Soggy towers fire more slowly.' },
    advice: [
      'A Bloated Glutton pops into three Snack-Sized Souls. Splash damage, like the Boulder Hurler that unlocks here, cleans up the ducklings.',
      'The Mud Wallower loves water: soaking it does nothing.',
      'Burp Balloons float. The Harpy Roost arrives just in time.',
    ],
    towers: ['harpyroost', 'boulderhurler'],
    souls: [
      { sprite: 'c3-bloatedglutton', name: 'Bloated Glutton', about: 'Jolly and oblivious: a huge round belly, tiny legs, a napkin tucked in and a drumstick-shaped snack.', gags: ['Idle: checks the empty snack, sad.', 'Hit: belly jiggle.', 'Defeat: POP, into three Snack-Sized Souls.'] },
      { sprite: 'c3-snacksizedsoul', name: 'Snack-Sized Soul', about: 'Tiny, peppy and still chewing.', gags: ['Scurries in a line like ducklings.', 'Defeat: a tiny “pip” poof.'] },
      { sprite: 'c3-burpballoon', name: 'Burp Balloon', flier: true, about: 'Inflated with gas, floating by accident, deeply embarrassed.', gags: ['Floats, hiccups.', 'Defeat: an enormous comic burp cloud, lettered BRAAP.'] },
      { sprite: 'c3-mudwallower', name: 'Mud Wallower', about: 'Happy as a pig in mud, literally caked in it.', gags: ['Belly-slides through puddles.', 'Water just makes it happier.', 'Defeat: dries into a mud statue that crumbles into a wisp.'] },
    ],
    bosses: [
      { img: 'bos-endlessappetite', name: 'The Endless Appetite', level: 29, role: 'Mini-boss', about: 'A glutton the size of a house with a napkin bib, swallowing Snack-Sized Souls to heal.', entrance: 'Tucks in the napkin. That means dinner.', defeat: 'Declares “I couldn’t eat another bite” and pops like a balloon.' },
      { img: 'boss', name: 'The Three-Headed Hound', level: 30, role: 'Boss', quip: 'Good boy × 3. Bad news × 3.', about: 'One huge, goofy dog with three personalities: Snarl (grumpy, shrugs off fire), Drool (dopey and soaked) and Nap (asleep, and very hard to hurt).', entrance: 'Nap sleeps through the fight until another head falls, then wakes up furious and fast. Dante tries to pet it.', defeat: 'The heads fall asleep one by one, snoring in harmony, then fade.' },
    ],
    particle: 'rain',
  },
  {
    n: 4,
    title: 'Greed, the Fourth Circle',
    description:
      'Greed, the fourth circle of hell, as a tower defense comedy: hoarders pushing coin-sack boulders, wasters flinging gold, a swarm of loose change and Plutus, a golden colossus who gets richer with every hit.',
    poem: [
      'In the fourth circle of the poem, two crowds, the hoarders and the wasters, push great weights around a ring, crash into each other in the middle, shout at each other, and turn around to do it again. The circle is guarded by Plutus, the old god of wealth.',
    ],
    game: [
      'DescentTD turns it into a race nobody wins: paranoid hoarders behind coin-sack boulders, flashy wasters throwing money over their shoulders, and a jingling swarm of winged coins. Where the two paths meet, the streams stop to argue. Virgil also hands you his lantern here, and asks you not to scratch it.',
    ],
    briefing: [
      { who: 'virgil', text: 'Hoarders on the left, wasters on the right. They meet in the middle to argue.' },
      { who: 'dante', text: 'About what?' },
      { who: 'virgil', text: 'Everything. For eternity.' },
      { who: 'virgil', text: 'Also, here: my lantern. Build it well. Do not scratch it.' },
    ],
    hazard: { name: 'Clash point', text: 'Two paths collide. Hoarders and wasters stop there for two seconds to argue, with angry speech bubbles.' },
    advice: [
      'The clash point is a free kill zone. Put your strongest towers where the two streams stall.',
      'A Hoarder’s boulder is a shield from the front: a hit from that side just goes “tink”.',
      'Charon’s Toll Booth unlocks here. It doesn’t attack, it earns Obols every wave.',
    ],
    towers: ['virgilslantern', 'tollbooth'],
    souls: [
      { sprite: 'c4-hoarder', name: 'Hoarder', about: 'Paranoid, pushing a coin-sack boulder bigger than itself. The boulder is its shield.', gags: ['Hugs the boulder when idle.', 'If it escapes, it steals Obols with a cackle.', 'Defeat: the boulder rolls away without it, and it chases it into a wisp.'] },
      { sprite: 'c4-waster', name: 'Waster', about: 'Flashy, flinging coins over its shoulder “for luck”.', gags: ['Drops coins when hit. Dante: “Free money!” Virgil: “Nothing down here is free.”', 'Defeat: throws its last coin, poof.'] },
      { sprite: 'c4-loosechange', name: 'Loose Change', flier: true, about: 'A swarm of tiny winged coin-souls chattering like a piggy bank.', gags: ['Swarms in a jingling cloud.', 'Defeat: each one goes plink.'] },
    ],
    bosses: [
      { img: 'bos-debtcollector', name: 'The Debt Collector', level: 39, role: 'Mini-boss', about: 'A pinstriped soul with a ledger, slapping IOU notes on your towers.', entrance: 'Licks his thumb and flips the ledger. Something is about to be collected.', defeat: 'Finds an error in his own ledger, faints, and poofs.' },
      { img: 'boss', name: 'Plutus, Golden Colossus', level: 40, role: 'Boss', quip: 'Every hit makes him richer.', about: 'A towering statue of coins that growls in cash-register dings. Damage turns into a gold shield.', entrance: 'Coins rattle loose into a swarm. At low health he panics and runs, clinking.', defeat: 'Crumbles into a coin avalanche that turns out to be chocolate coins.' },
    ],
    particle: 'coins',
  },
  {
    n: 5,
    title: 'Wrath, the Fifth Circle',
    description:
      'Wrath, the fifth circle of hell, as a tower defense comedy: tiny souls with huge tantrums, sulkers hiding under the marsh, a soul riding its own steam cloud and the grumpy Ferryman of the Styx.',
    poem: [
      'The fifth circle of the poem is the muddy marsh of the river Styx. The wrathful fight each other on its surface, while the sullen lie underneath it, gurgling. A boatman ferries travellers across, and he is not pleased to see them.',
    ],
    game: [
      'In DescentTD the angry stomp and steam on top of the marsh, and the sulky submerge until only their eyebrows show. Your path follows the ferry route across the Styx, and the Ferryman himself is a hunched, foghorn-blowing grump who hates tourists.',
    ],
    briefing: [
      { who: 'dante', text: 'Why is the marsh… growling?' },
      { who: 'virgil', text: 'Some of them are angry on top. Some are sulking underneath.' },
      { who: 'dante', text: 'Like my family at dinner.' },
    ],
    hazard: { name: 'The ferry route', text: 'Your path crosses the Styx by ferry, and the boss rams the docks.' },
    advice: [
      'The Wrathful gets faster as it gets hurt. Finish it quickly once you start.',
      'The Fuming Soul flies, and fire does nothing to it: it’s already fuming. Use anti-air that isn’t fire.',
      'The Sullen ducks under the water. Plan for it to surface later than you expect.',
    ],
    towers: [],
    souls: [
      { sprite: 'c5-wrathful', name: 'Wrathful', about: 'A permanent tantrum: a tiny body, huge clenched fists and steam jetting from its ears.', gags: ['The steam grows as its health drops, and so does its speed.', 'Defeat: the kettle whistle peaks, pop, a steam wisp.'] },
      { sprite: 'c5-sullen', name: 'Sullen', about: 'Pouting, arms crossed, “I didn’t want to come anyway”.', gags: ['Submerges until only its sulky eyebrows and bubbles show.', 'Defeat: one last “hmph” bubble.'] },
      { sprite: 'c5-fumingsoul', name: 'Fuming Soul', flier: true, about: 'Rides its own steam cloud, hovering with rage.', gags: ['Fire does nothing: “I’M ALREADY FUMING.”', 'Defeat: the cloud deflates like a whoopee cushion.'] },
    ],
    bosses: [
      { img: 'bos-tantrumtitan', name: 'The Tantrum Titan', level: 49, role: 'Mini-boss', about: 'The biggest Wrathful of them all, stomping so hard the towers bounce.', entrance: 'His ears whistle before each stomp.', defeat: 'Tantrums himself into a nap, and poofs.' },
      { img: 'boss', name: 'The Ferryman of the Styx', level: 50, role: 'Boss', quip: 'Exact change only.', about: 'A grumpy, hunched boatman rowing a battered ferry and blowing a foghorn. Hates tourists.', entrance: '“NO REFUNDS.” He rams the docks, then jumps ashore swinging his oar.', defeat: 'His boat sinks slowly; he salutes and goes down with it, into a bubble wisp.' },
    ],
    particle: 'bubbles',
  },
  {
    n: 6,
    title: 'Heresy, the Sixth Circle',
    description:
      'Heresy, the sixth circle of hell and the burning city of Dis, as a tower defense comedy: souls popping out of flaming tombs, three bickering Furies, a vain Gorgon and a gatekeeper with a portcullis for a face.',
    poem: [
      'The sixth circle lies inside the walls of the burning city of Dis. Its souls lie in open, flaming tombs. At the gates, the travellers are stopped by the Furies, who threaten to call the Gorgon down on them.',
    ],
    game: [
      'In DescentTD the tombs are open and the occupants insist on being right about everything, including the tombs. Souls spring out like jack-in-the-boxes at points along the path, three winged sisters argue about who’s in charge, and the Gorgon checks her hair in a hand-mirror before turning your towers to stone.',
    ],
    briefing: [
      { who: 'virgil', text: 'The city of Dis. The tombs are open.' },
      { who: 'dante', text: 'Why are they open?' },
      { who: 'soul', text: 'TA-DA!' },
      { who: 'dante', text: '(faints)' },
    ],
    hazard: { name: 'Tomb spawns', text: 'Souls burst out of tombs partway along the path, not only at the start.' },
    advice: [
      'Spread your defence out: tombs open behind your front line.',
      'The Furies’ screech jams nearby towers. The Doom Bell, new here, stuns whole groups.',
      'A Lid Lifter drops its tomb lid at half health and runs. Keep firing.',
    ],
    towers: ['doombell'],
    souls: [
      { sprite: 'c6-tombheretic', name: 'Tomb Heretic', about: 'Pops out of an open tomb like a jack-in-the-box, arms up: “TA-DA!”', gags: ['Springs out with a boing and wobbles.', 'Defeat: springs back into a tomb, the lid slams, poof.'] },
      { sprite: 'c6-lidlifter', name: 'Lid Lifter', about: 'Carries its tomb lid like a riot shield, very proud of it.', gags: ['Drops the lid at half health with a clang, looks at you, then runs.', 'Defeat: a wisp shaped like a question mark.'] },
      { sprite: 'c6-fury', name: 'The Furies', flier: true, about: 'Three bickering winged sisters, Grumble, Scowl and Tizzy, with wild hair and dramatic capes.', gags: ['A screech of visible sound rings jams your towers.', 'They argue mid-air about who leads.', 'Running joke: they return to “help” the Gatekeeper and are useless at it.'] },
    ],
    bosses: [
      { img: 'bos-gorgon', name: 'The Gorgon', level: 59, role: 'Mini-boss', about: 'Glamorous and vain, with snake hair that has opinions, checking herself in a hand-mirror.', entrance: 'The mirror glints before her gaze. Towers caught in it go grey and grumpy.', defeat: 'Sees her own reflection mid-gaze, turns to stone, and crumbles.' },
      { img: 'boss', name: 'The Gatekeeper of Dis', level: 60, role: 'Boss', quip: 'The city is closed. Permanently.', about: 'A gate-headed demon whose face is a portcullis. Rattles keys and slams gates to reroute souls.', entrance: 'Chains rattle before every slam. He calls the Furies in, and they argue instead of helping.', defeat: 'His portcullis jaw falls shut, he sulks, and poofs.' },
    ],
    particle: 'embers',
  },
  {
    n: 7,
    title: 'Violence, the Seventh Circle',
    description:
      'Violence, the seventh circle of hell, as a tower defense comedy: a cartoon soup river, grumpy shrubbery, hot sand, a macho centaur archer and the Minotaur.',
    poem: [
      'The seventh circle of the poem has three rings: a river of boiling blood patrolled by centaur archers, a wood of twisted, thorny trees, and a desert of burning sand under a rain of fire. The Minotaur guards the way down.',
    ],
    game: [
      'DescentTD keeps it cartoon: the river is tomato soup, the trees are just very grumpy shrubbery, and the sand is hot enough to make anyone hop. Fire rains on all three neighbourhoods, centaurs shoot arrows at your towers, and the Minotaur’s little brother is desperate to impress.',
    ],
    briefing: [
      { who: 'virgil', text: 'River, forest, desert. Hot, prickly, hotter.' },
      { who: 'dante', text: 'I didn’t pack for this.' },
      { who: 'virgil', text: 'Here, have an icicle tower.' },
      { who: 'dante', text: 'Wait, where did you get an icicle tower?' },
      { who: 'virgil', text: 'Don’t ask.' },
    ],
    hazard: { name: 'Fire rain', text: 'Fire falls across the river, the forest and the desert. Levels 69 and 70 use all three at once.' },
    advice: [
      'The Ash Walker is fireproof and smug about it. Don’t rely on fire alone here.',
      'Thorn Wraiths regrow their leaves when left alone. Fire stops the regrowth.',
      'Centaur Archers shoot at your towers. The Centaur Outpost, new here, shoots back from very far away.',
    ],
    towers: ['cocytusspire', 'centauroutpost'],
    souls: [
      { sprite: 'c7-centaurarcher', name: 'Centaur Archer', about: 'A macho sports-coach type with a bow and a whistle: all horse and no patience.', gags: ['Fires arrows into your towers; the arrow wobbles with a boing and the tower goes cross-eyed.', 'Defeat: gallops off in a dust cloud that is itself the poof.'] },
      { sprite: 'c7-hotfoothopper', name: 'Hot-Foot Hopper', about: 'Running on hot sand and stepping stones: “ow, ow, ow, OW”.', gags: ['Leaps ahead with smoking feet.', 'Defeat: a final hop, poof, a little smoke ring.'] },
      { sprite: 'c7-thornwraith', name: 'Thorn Wraith', about: 'A grumpy, prickly, twiggy shrub-soul whose leaves grow back when it’s left alone.', gags: ['Burn stops the regrowth, and it shrieks like a kettle.', 'Defeat: sheds all its leaves into a leaf-wisp.'] },
      { sprite: 'c7-ashwalker', name: 'Ash Walker', about: 'Fireproof and smug about it, strolling through the fire rain under a tiny parasol it doesn’t need.', gags: ['Fire damage just shows “IMMUNE” in a pinwheel of smoke.', 'Defeat: the parasol closes, poof.'] },
    ],
    bosses: [
      { img: 'bos-littlebrother', name: 'Minotaur’s Little Brother', level: 69, role: 'Mini-boss', about: 'A teenage Minotaur trying to impress. Charges, and trips over his own feet a quarter of the time.', entrance: 'Scrapes his hoof, charges, eats dirt.', defeat: 'Calls for his big brother, and poofs.' },
      { img: 'boss', name: 'The Minotaur', level: 70, role: 'Boss', quip: 'Please do not stand in the labyrinth.', about: 'Massive and snorting, with a nose ring. Charges through anything and ignores slows. Actually very serious.', entrance: 'Dust and a hoof-scrape, then he smashes a wall to take a shortcut.', defeat: 'Charges, skids, spins, gets dizzy and collapses into a dust-cloud wisp.' },
    ],
    particle: 'embers',
  },
  {
    n: 8,
    title: 'Fraud, the Eighth Circle',
    description:
      'Fraud, the eighth circle of hell and its ten trenches of tricksters, as a tower defense comedy: a smiling cardboard cut-out, a seer with its head on backwards, a master of disguise and Geryon, the beast with a salesman’s smile.',
    poem: [
      'The eighth circle of the poem, Malebolge, is ten stone trenches, one for each kind of fraud: flatterers, fortune-tellers walking with their heads twisted backwards, hypocrites in gilded cloaks made of lead, thieves, false counsellors wrapped in flame. The travellers are carried down to it on the back of Geryon, a monster with an honest face.',
    ],
    game: [
      'In DescentTD every trench holds a different kind of liar, and souls switch lanes at the bridges between them. Some can’t be targeted until they are revealed, some make your towers dizzy, and one is a master of disguise who occasionally turns into a potted plant for no reason.',
    ],
    briefing: [
      { who: 'virgil', text: 'Ten trenches of liars. Trust nothing.' },
      { who: 'dante', text: 'Aww, that one looks friendly.' },
      { who: 'virgil', text: 'Especially that one.' },
    ],
    hazard: { name: 'Trench network', text: 'Souls switch lanes at the bridges between the trenches.' },
    advice: [
      'Flatterers and False Counsellors can’t be targeted until they’re revealed. Virgil’s Lantern (Beacon of Reason) and the new Hall of Mirrors (True Reflection) reveal them.',
      'A Seer makes nearby towers dizzy and swaps their targeting. Kill it at range.',
      'Cover the bridges: that’s where the lanes change.',
    ],
    towers: ['hallofmirrors'],
    souls: [
      { sprite: 'c8-flatterer', name: 'Flatterer', about: 'Walks inside a cardboard cut-out of a smiling, friendly helper, waving at your towers.', gags: ['Your towers can’t target it until the cut-out tears away: “ta-da… oh no”.', 'Running joke: its cut-outs look more and more like Dante, who is flattered.'] },
      { sprite: 'c8-seer', name: 'Seer', about: 'Head on backwards, walking in reverse, a crystal ball on a stick.', gags: ['Nearby towers get dizzy and swap their targeting.', 'Defeat: the crystal ball rolls away, poof.'] },
      { sprite: 'c8-hypocrite', name: 'Hypocrite', about: 'Wears a gilded cloak that is secretly lead: very slow, very heavy, very dignified.', gags: ['Every step is a thud.', 'Hit: “tonk”, and the gold flakes off to show grey.', 'Defeat: the cloak stands up empty for a beat, then collapses.'] },
      { sprite: 'c8-thief', name: 'Thief', about: 'A master of disguise with a bag of masks, quick-changing into other souls of the circle.', gags: ['A puff of smoke and a new costume every five seconds.', 'Running joke: sometimes turns into a potted plant for no reason.', 'Defeat: the bag of masks spills.'] },
      { sprite: 'c8-falsecounselor', name: 'False Counsellor', about: 'A flame-wrapped schemer with steepled fingers, invisible unless revealed.', gags: ['When revealed: “Oh! Hello. I was just… advising.”', 'Defeat: the flame snuffs out like a birthday candle.'] },
    ],
    bosses: [
      { img: 'bos-grandgrifter', name: 'The Grand Grifter', level: 79, role: 'Mini-boss', about: 'A sly card-sharp in a top hat who swaps places with souls ahead of him.', entrance: 'Tips his hat and shuffles the cards.', defeat: 'Pulls the wrong card, a joker, which laughs at him.' },
      { img: 'boss', name: 'Geryon, the Beast of Fraud', level: 80, role: 'Boss', quip: 'Trust me.', about: 'A winged serpent with a disarmingly friendly face on top: a used-cart salesman’s smile. Flies.', entrance: 'The face grins wider before a disguise; the tail rises before a sting.', defeat: 'The friendly face slides off like a mask. He shrugs, and poofs.' },
    ],
    particle: 'sparks',
  },
  {
    n: 9,
    title: 'Treachery, the Ninth Circle',
    description:
      'Treachery, the ninth circle of hell and the frozen lake Cocytus, as a tower defense comedy: traitors shuffling in ice blocks, a smiling betrayer, a sniffly chill wisp and two bickering giants.',
    poem: [
      'At the bottom of the pit lies Cocytus, a lake frozen solid. Those who betrayed the people who trusted them are stuck in the ice. Around its rim stand enormous giants, chained in place.',
    ],
    game: [
      'In DescentTD the traitors shuffle along inside ice blocks with only their shifty eyes moving, a smiling soul offers your towers a handshake with its fingers crossed behind its back, and frost creeps over your defences. The circle ends with two giants who can’t agree on anything.',
    ],
    briefing: [
      { who: 'dante', text: 'It’s… quiet.' },
      { who: 'virgil', text: 'It’s frozen. The traitors are in the ice.' },
      { who: 'dante', text: 'Can they hear us?' },
      { who: 'virgil', text: 'Yes. Stop waving.' },
    ],
    hazard: { name: 'Icy towers', text: 'Frost creeps over your towers and slows them. Tap a frosted tower to chip the ice off.' },
    advice: [
      'Keep tapping frosted towers: a frozen defence is a slow defence.',
      'The Betrayer charms a tower so its shots heal souls. Virgil’s Lantern with Poet’s Verse makes towers immune.',
      'The Chill Wisp is already cold: ice towers do nothing to it.',
      'The Twin Giants must fall close together, or one revives the other.',
    ],
    towers: [],
    souls: [
      { sprite: 'c9-frozentraitor', name: 'Frozen Traitor', about: 'Encased in an ice block and shuffling it along. Only its shifty eyes move.', gags: ['The ice cracks in three stages. Once free: “brrr!”', 'Defeat: shatters into snowflakes.'] },
      { sprite: 'c9-betrayer', name: 'Betrayer', about: 'Smiling, hand held out for a shake, fingers crossed behind its back.', gags: ['Charms a tower: it gets heart eyes and its shots heal souls.', 'Defeat: its handshake hand waves goodbye on its own, poof.'] },
      { sprite: 'c9-chillwisp', name: 'Chill Wisp', flier: true, about: 'A tiny cold ghost in a scarf, very sniffly.', gags: ['Immune to ice: “already cold”.', 'Defeat: a sneeze, then poof.'] },
      { sprite: 'c9-turncoat', name: 'Turncoat', about: 'Wears a reversible coat, one side armour-plated and one side mystic, and flips it constantly.', gags: ['The flip is the warning.', 'Defeat: the coat falls, then flips once more on its own.'] },
    ],
    bosses: [
      { img: 'bos-doublecrosser', name: 'The Double-Crosser', level: 89, role: 'Mini-boss', about: 'A soul in a split-colour suit that shakes its own hand before splitting in two.', entrance: 'Splits and sends each half down a different lane.', defeat: 'Both halves blame each other, and poof.' },
      { img: 'boss', name: 'The Twin Giants', level: 90, role: 'Boss', quip: 'Twice the size, half the teamwork.', about: 'Two enormous, bickering giants chained to the rim of the well.', entrance: 'Arguing speech bubbles before every throw: “You go!” “No, YOU go!”', defeat: 'They finally hug, then fade together.' },
    ],
    particle: 'snow',
  },
  {
    n: 10,
    title: 'The Center, the Bottom of Hell',
    description:
      'The Center, the very bottom of hell and the last level of DescentTD: Nine Circles. Echoes of every circle, a freezing wind, and the Frozen Emperor.',
    poem: [
      'At the very centre of the poem’s underworld, at the bottom of everything, a colossal three-faced figure stands frozen to the waist in the ice. The beating of his enormous wings is the wind that keeps the whole lake frozen. From here, the travellers climb out, and see the stars again.',
    ],
    game: [
      'DescentTD plays this one straight. Level 91 is a single, quiet, very hard level: echoes of souls from every circle come at once, the wingbeats speed them up and freeze your towers, and the jokes stop. Dante doesn’t faint here. He just goes quiet. Even Virgil is serious, for once.',
    ],
    briefing: [
      { who: 'virgil', text: 'Stay close. Don’t speak. Don’t write.' },
      { who: 'dante', text: '…' },
      { who: 'virgil', text: 'Dante.' },
      { who: 'dante', text: 'I’m not writing. I’m remembering.' },
    ],
    hazard: { name: 'Wingbeats', text: 'Every wingbeat speeds up the souls and freezes your towers.' },
    advice: [
      'Everything you learned on the way down applies at once: fliers, invisible souls, splitters and shields.',
      'Chip the frost off your towers between wingbeats.',
      'Then climb out, and look up.',
    ],
    towers: [],
    souls: [],
    bosses: [
      { img: 'boss', name: 'The Frozen Emperor', level: 91, role: 'Final boss', about: 'A colossal three-faced figure frozen to the waist, his wings beating a freezing wind. Not played for laughs: he is awe and dread.', entrance: 'The camera pulls back to show his scale. Dante doesn’t faint; he just goes quiet. Virgil, for once, is serious.', defeat: 'The ice cracks into silence. Dante and Virgil climb past him and come out under the stars.' },
    ],
    particle: 'stars',
  },
];
