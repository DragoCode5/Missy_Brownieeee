// ---- Data layer: characters, chapters, puzzles, rewards, story ----

// Seven characters (spec §4). Names/draft perks marked as placeholders (§12).
export const CHARS = [
  { id: "missy", name: "Missy", role: "Explorer", age: "late teens/20s", blurb: "The heart of the story. Curious, warm and quick to smile, she follows the clues the mysterious companion leaves behind.", perk: "Sees sparkles near hidden clues", skin: "#8b5a3a", hair: "#2d2b2b", style: "skirt", longHair: true, skirt: "#e8c4b8", top: "#f4a3c4", bottom: "#8e6cc4", shoe: "#3b2457", leg: 8, torso: 7 },
  { id: "gospel", name: "Gospel", role: "Little Adventurer", age: "10", blurb: "Small, fast and endlessly curious. He fits into tight spots and asks the questions nobody else thinks of.", perk: "Can squeeze through small gaps", skin: "#e8b58c", hair: "#1c1224", style: "short", hair: "#1c1224", top: "#f2b632", bottom: "#4c78c4", shoe: "#ffffff", leg: 5, torso: 8 },
  { id: "owusu", name: "Sergeant Owusu-Brown", role: "Soldier", age: "adult", blurb: "Disciplined, steady and secretly soft-hearted. He treats every puzzle like a mission briefing.", perk: "Hints cost nothing extra", skin: "#452d22", hair: "#1c1224", style: "cap", top: "#5f7f4a", bottom: "#4a6338", shoe: "#2b2118", leg: 8, torso: 7, medal: true, cap: "#4a6338" },
  { id: "kobby", name: "Kobby", role: "Young Man", age: "20", blurb: "Easygoing and playful. He moves fast, jokes often and never turns down a challenge.", perk: "Walks faster", skin: "#5c4a3a", hair: "#1c1224", style: "short", top: "#6fb8e6", bottom: "#3b2457", shoe: "#f4f0ff", leg: 7, torso: 6 },
  { id: "kofi", name: "Kofi", role: "Mystery", age: "16", blurb: "Nobody is sure who he is yet. A hooded figure with a secret that the story slowly reveals.", perk: "Finds surprise rewards", skin: "#6b4430", hair: "#2d2b2b", style: "hood", top: "#7a5fb0", bottom: "#2a1d42", shoe: "#cbb5f0", leg: 7, torso: 6, hood: "#7a5fb0", badge: true },
  { id: "prince", name: "Prince", role: "Explorer", age: "16–17", blurb: "Confident and dramatic, but secretly earnest. He wants to be taken seriously and tries a few risky shortcuts.", perk: "Quick to attempt risky shortcuts", skin: "#6b4a38", hair: "#2d2b2b", style: "stud", top: "#5f3d8a", bottom: "#c46a8a", shoe: "#3b2457", leg: 7, torso: 6, grad: true, moto: "#c46a8a" },
  { id: "angel", name: "ANGEL", role: "Explorer", age: "12–13", blurb: "Enthusiastic, imaginative, fearless but sometimes careless. She notices the small things because she is quick and quick to collect.", perk: "Notices things in the background", skin: "#5a3c40", hair: "#2d2b2b", style: "skirt", skirt: "#bfe8d2", top: "#bfe0f0", bottom: "#3b6a7a", shoe: "#f4f0ff", leg: 3, torso: 4, pig: "#3b6a7a" },
  { id: "scolded", name: "The boy who got scolded", role: "Awkward Sibling", age: "15", blurb: "Tries to act tough but is sensitive to being scolded. Dry, awkward maths and quick to deflect with a joke.", perk: "Double-time interaction hints when he is present", skin: "#7a5a3c", hair: "#1c1224", style: "kerchief", top: "#9a7a4a", bottom: "#6a4a3c", shoe: "#cbb5f0", leg: 7, torso: 6, kerc: "#7a4a3c" },
  { id: "mrsbrown", name: "Mrs. Brown", role: "Community elder", age: "adult", blurb: "A gentle presence who listens, advises, and helps the young ones around her. The town's quiet heart.", perk: "Patient and kind — always ready to listen.", skin: "#e8c9a8", hair: "#2d2b2b", style: "skirt", skirt: "#f2d8b0", top: "#f5d1a0", bottom: "#6a4a30", shoe: "#4a3a28", leg: 6, torso: 6 }
];

// Story modes (spec §2.2). Romance/Horror are placeholders until built (§5.1).
export const MODES = [
  { id: "adventure", name: "Adventure", blurb: "Explore the world, solve its puzzles and find the six Memory Stars.", col: "#f2b632", icon: ["....XXX...", "...X...X..", "...X...X..", "....XXX...", "......X...", ".....XXX..", "......X...", "....X....."] },
  { id: "romance", name: "Romance", blurb: "A warm story of letters, photographs and a quiet return of colour.", col: "#e4659a", icon: ["..XX..XX.", "XXXXXXXX", "XXXXXXXX", "XXXXXXXX", ".XXXXXX.", "..XXXX..", "...XX...", "........"] },
  { id: "horror", name: "Horror", blurb: "The same world after dark. Flickering lights, strange noises and things that should not be there.", col: "#d9cdf5", dark: true, icon: ["..XXXX....", ".XXXXXX...", "XXXXXXXX..", "XXEXXEXX", "XXEXXEXX", "XXXXXXXX..", "XXXXXXXXXX", "XX.XX.XX"] }
];

// ---- Maps (20x12; T=tiles, H=house, F=fountain, B=bench, G=grass, T2 hedge) ----
function map20x12(rows) { return rows.map(r => r.padEnd(20, "T").slice(0, 20).split("")); }

export const MAPS = {
  town: map20x12([
    "TTTTTTTTTTTTTTTTTTTT",
    "TTTTTTTTTTTTTTTTTTTT",
    "TTHHHHHTTTHHHHHTTTTT", "TTTTTTTTTTTTTTTTTTTT",
    "TTTTTTHHHHHHHHTTTTTT", "TTTTTTTTTTTTTTTTTTTT",
    "THHTHTTTTTTTTTTHHTHT", "TTTTTTTTTTTTTTTTTTTT",
    "THTTHHHHHHHHHHTTTHTT", "TTTTTTTTTTTTTTTTTTTT",
    "TTTTTTTHHTHHTTTTTTTT", "TTTTTTTTTTTTTTTTTTTT"
  ]),
  garden: map20x12([
    "TTTTTTTTTTTTTTTTTTTT", "TTTTTTTTTTTTTTTTTTTT",
    "TTTTTTHHTHHHTTTTTTTT", "TTTTTTTTTTTTTTTTTTTT",
    "TTHHHHHHHHHHHHTTTTTT", "TTTTTTTTTTTTTTTTTTTT",
    "THHHHHHHHGHHHHHHHHHT", "THHHHHHHHGHHHHHHHHHT",
    "TTTTTTTTTTTTTTTTTTTT", "THHHHHHHHHHHHHHTTTTT",
    "TTHHHHHHHHHHHHTTTTTT", "TTTTTTTTTTTTTTTTTTTT"
  ]),
  cafe: map20x12([
    "TTTTTTTTTTTTTTTTTTTT", "TTTTTTTTTTTTTTTTTTTT",
    "TTHHHHHHHHHHHHTTTTTT", "TTHHHHHHHHHHHHTTTTTT",
    "TTTTTTTTTTTTTTTTTTTT", "TTHHHHHHHHHHHHTTTTTT",
    "TTTTTTHHHHHHTTTTTTTT", "TTTTTTTTTTTTTTTTTTTT",
    "TTTTTHHHHHHHHTTTTTTT", "TTTTTTTTTTTTTTTTTTTT",
    "TTHHHHHHHHHHHHTTTTTT", "TTTTTTTTTTTTTTTTTTTT"
  ]),
  bridge: map20x12([
    "TTTTTTTTTTTTTTTTTTTT", "TTTTTTTTTTTTTTTTTTTT",
    "TTHHHHHHHHHHHHTTTTTT", "TTHHHHHHHHHHHHTTTTTT",
    "TTTTTTTTTTTTTTTTTTTT", "TTHHHHHHHHHHHHTTTTTT",
    "TTTTTTHHHHHHTTTTTTTT", "TTTTTTTTTTTTTTTTTTTT",
    "TTTTTHHHHHHHHTTTTTTT", "TTTTTTTTTTTTTTTTTTTT",
    "TTHHHHHHHHHHHHTTTTTT", "TTTTTTTTTTTTTTTTTTTT"
  ]),
  castle: map20x12([
    "TTTTTTTTTTTTTTTTTTTT", "TTTTTTTTTTTTTTTTTTTT",
    "TTHHHHHHHHHHHHTTTTTT", "TTHHHHHHHHHHHHTTTTTT",
    "TTTTTTTTTTTTTTTTTTTT", "TTHHHHHHHHHHHHTTTTTT",
    "TTTTTTHHHHHHTTTTTTTT", "TTTTTTTTTTTTTTTTTTTT",
    "TTTTTHHHHHHHHTTTTTTT", "TTTTTTTTTTTTTTTTTTTT",
    "TTHHHHHHHHHHHHTTTTTT", "TTTTTTTTTTTTTTTTTTTT"
  ]),
  thousand: map20x12([
    "TTTTTTTTTTTTTTTTTTTT", "TTTTTTTTTTTTTTTTTTTT",
    "TTHHHHHHHHHHHHTTTTTT", "TTHHHHHHHHHHHHTTTTTT",
    "TTTTTTTTTTTTTTTTTTTT", "TTHHHHHHHHHHHHTTTTTT",
    "TTTTTTHHHHHHTTTTTTTT", "TTTTTTTTTTTTTTTTTTTT",
    "TTTTTHHHHHHHHTTTTTTT", "TTTTTTTTTTTTTTTTTTTT",
    "TTHHHHHHHHHHHHTTTTTT", "TTTTTTTTTTTTTTTTTTTT"
  ])
};

// ---- Chapters (spec §8.9; order = completion order) ----
export const CHAPTERS = [
  { id: "chapter1", title: "The Little Town", map: "town", x: 6, y: 7, nodes: ["fountain", "glasses", "chest", "maze"], rewards: ["golden_3", "letter_01", "brass_key", "video_mmmm"], order: 1, note: "The centre of the world. Watch the fountain." },
  { id: "chapter2", title: "Garden of Beginnings", map: "garden", x: 2, y: 6, nodes: ["flower", "butterfly", "hidden_key"], rewards: ["golden_2", "photo_you", "letter_02"], order: 2, note: "First colour returns. Look low near the trees." },
  { id: "chapter3", title: "The Little Café", map: "cafe", x: 7, y: 6, nodes: ["order", "table", "conversation"], rewards: ["golden_2", "music_be_happy"], order: 3, note: "Warm light behind the rain-wet windows." },
  { id: "chapter4", title: "Bridge of Stars", map: "bridge", x: 12, y: 6, nodes: ["constellation", "river", "lights"], rewards: ["golden_2", "photo_graded", "video_companion"], order: 4, note: "A river of lights at night falls quiet." },
  { id: "chapter5", title: "Memory Castle", map: "castle", x: 8, y: 6, nodes: ["archive", "library"], rewards: ["golden_2", "program_missy", "photo_note", "photo_kaka"], order: 5, note: "Dried photographs and locked rooms." },
  { id: "chapter6", title: "Place of a Thousand Stars", map: "thousand", x: 18, y: 6, nodes: ["finale"], rewards: ["golden_3", "mirror"], order: 6, note: "The lantern is lit only once." }
];

// ---- Puzzle definitions (spec §7; data-driven; 8 types) ----
// All puzzles are played on a 320x192 puzzle canvas, spec §2.3/§7.1.
export const PUZZLES = [
  // Chapter 1 — The Little Town
  { id: "fountain", location: "town", chapter: 1, type: "pattern", node: { x: 8, y: 4 }, instructions: "Press the three fountains in the order the water jumps.", steps: [{ id: "p1", type: "pattern", order: ["a", "b", "c", "d"] }], hints: { gentle: "Watch the water.", strong: "Look at the fountain's spouts.", solution: "a, then b, then c, then d." }, difficulty: 1, reward: "golden_heart" },
  { id: "glasses", location: "town", chapter: 1, type: "search", node: { x: 10, y: 8 }, instructions: "Mrs. Adjoa cannot see her glasses. Find them on the flower bed below.", steps: [{ id: "g1", type: "search", target: 1, cells: 6 }], hints: { gentle: "A pair of glasses.", strong: "They are low in the flower bed.", solution: "Tap the second row of the flower bed." }, difficulty: 1, reward: "golden_heart" },
  { id: "chest", location: "town", chapter: 1, type: "combo", node: { x: 14, y: 4 }, instructions: "Open the chest under the bench. Set the three dials to the house-door colours.", steps: [{ id: "c1", type: "combo", code: ["pink", "mint", "blue"] }], hints: { gentle: "Look at the houses to the east.", strong: "Pink, mint, blue.", solution: "Pink, mint, blue." }, difficulty: 1, reward: "golden_heart" },
  { id: "maze", location: "town", chapter: 1, type: "maze", node: { x: 16, y: 8 }, instructions: "Walk to the centre of the hedge maze.", steps: [{ id: "m1", type: "maze", goal: "centre" }], hints: { gentle: "The maze has one long path.", strong: "Walk until you cannot go further.", solution: "Steps: up, right, up, left, up." }, difficulty: 2, reward: "golden_heart" },

  // Chapter 2 — Garden of Beginnings
  { id: "flower", location: "garden", chapter: 2, type: "sequence", node: { x: 6, y: 4 }, instructions: "Plant the four flower pots in the correct colour order.", steps: [{ id: "f1", type: "sequence", order: ["pink", "mint", "blue", "lavender"] }], hints: { gentle: "A garden in spring.", strong: "Pink, then mint, then blue, then lavender.", solution: "Pink > mint > blue > lavender." }, difficulty: 1, reward: "golden_heart" },
  { id: "butterfly", location: "garden", chapter: 2, type: "trace", node: { x: 14, y: 6 }, instructions: "Follow the butterfly trail to the hidden key.", steps: [{ id: "b1", type: "trace", cells: ["p0", "p1", "p2", "p3", "p4"], path: ["p0", "p1", "p2", "p3", "p4"] }], hints: { gentle: "Follow the large flower.", strong: "Blue > mint > pink > mint.", solution: "Blue, mint, pink, mint." }, difficulty: 1, reward: "golden_heart" },
  { id: "hidden_key", location: "garden", chapter: 2, type: "search", node: { x: 12, y: 10 }, instructions: "The key is hidden where the vines hang low. Tap the cells to find it.", steps: [{ id: "h1", type: "search", target: 3, cells: 6 }], hints: { gentle: "Near the climbing roses.", strong: "By the bench, low on the left.", solution: "Tap the bottom-left cell." }, difficulty: 1, reward: "brass_key" },

  // Chapter 3 — The Little Café
  { id: "order", location: "cafe", chapter: 3, type: "combo", node: { x: 7, y: 4 }, instructions: "The orders came in a strange order. Set the display to repeat the last customer's order.", steps: [{ id: "o1", type: "combo", code: ["latte", "espresso", "cappuccino", "flatwhite"] }], hints: { gentle: "People like the classics here.", strong: "Lattes first, then espresso, cappuccino, flat white.", solution: "Latte, espresso, cappuccino, flat white." }, difficulty: 1, reward: "golden_heart" },
  { id: "table", location: "cafe", chapter: 3, type: "search", node: { x: 11, y: 8 }, instructions: "The secret table is tucked behind the window seat. Find its marker.", steps: [{ id: "t1", type: "search", target: 4, cells: 6 }], hints: { gentle: "A corner of the room.", strong: "Behind the blue chairs.", solution: "Tap the second-from-left of the back row." }, difficulty: 1, reward: "golden_heart" },
  { id: "conversation", location: "cafe", chapter: 3, type: "conversation", node: { x: 5, y: 6 }, instructions: "Talk to the barista — answer his questions and earn your coffee.", steps: [{ id: "cv1", type: "conversation", dialogue: [
    { q: "This place looks quiet...", a: ["a", "Looks nice.", "It's good."], next: 0, done: false },
    { q: "Can I get a water?", a: ["b", "Water, please."], next: 1, done: true }
  ]}], hints: { gentle: "Just answer the questions.", strong: "Be polite and curious.", solution: "Answer each question in order." }, difficulty: 1, reward: "golden_heart" },

  // Chapter 4 — Bridge of Stars
  { id: "constellation", location: "bridge", chapter: 4, type: "constellation", node: { x: 8, y: 4 }, instructions: "The stars say which bridge arch to light first. Tap the stars in the order they point to.", steps: [{ id: "st1", type: "constellation", stars: ["s0", "s1", "s2", "s3", "s4", "s5", "s6"], order: ["s3", "s0", "s6", "s1", "s4"] }], hints: { gentle: "Find the brightest star.", strong: "Left arch, then the far left, then the right arch...", solution: "Tap: s3, s0, s6, s1, s4." }, difficulty: 2, reward: "golden_heart" },
  { id: "river", location: "bridge", chapter: 4, type: "conversation", node: { x: 14, y: 6 }, instructions: "Ask the boatman how to cross the river.", steps: [{ id: "rv1", type: "conversation", dialogue: [
    { q: "How do I cross the river?", a: ["a", "Straight to the far bank."], next: 0, done: true }
  ]}], hints: { gentle: "Ask the boatman.", strong: "The boat goes straight to the far bank.", solution: "Take the boat to the far bank." }, difficulty: 1, reward: "golden_heart" },
  { id: "lights", location: "bridge", chapter: 4, type: "light", node: { x: 6, y: 8 }, instructions: "Tap the bridge lights in the sequence the constellation showed you.", steps: [{ id: "li1", type: "light", lights: ["l0", "l1", "l2", "l3", "l4", "l5"], order: ["l4", "l0", "l5", "l2", "l1"] }], hints: { gentle: "Copy the stars above.", strong: "Mirror the constellation order.", solution: "Tap: l4, l0, l5, l2, l1." }, difficulty: 2, reward: "golden_heart" },

  // Chapter 5 — Memory Castle
  { id: "archive", location: "castle", chapter: 5, type: "match", node: { x: 6, y: 4 }, instructions: "Pair the photographs with their captions in the memory archive.", steps: [{ id: "a1", type: "match", pairs: [["c1", "c6"], ["c2", "c5"], ["c3", "c4"]] }], hints: { gentle: "The red frame is paired with the blue book.", strong: "Try the largest photo.", solution: "c1 with c6, c2 with c5, c3 with c4." }, difficulty: 2, reward: "golden_heart" },
  { id: "library", location: "castle", chapter: 5, type: "combo", node: { x: 10, y: 8 }, instructions: "The library is locked. Set the code from the diary entries you found — Kobby wrote it down.", steps: [{ id: "l1", type: "combo", code: ["the", "small", "key", "word"] }], hints: { gentle: "The diary said '4 digits'.", strong: "Kobby's last words were about the door.", solution: "Tap 'the', 'small', 'key', 'word'." }, difficulty: 3, reward: "golden_heart" },

  // Chapter 6 — Place of a Thousand Stars
  { id: "finale", location: "thousand", chapter: 6, type: "finale", node: { x: 8, y: 5 }, instructions: "Relight the Lantern. Place your stars in the order you found them.", steps: [{ id: "z1", type: "finale", sources: ["gold", "key", "prince", "angel", "scolded"] }], hints: { gentle: "The lantern sits in the centre.", strong: "All five stars, in order.", solution: "Tap the stars in the order they were found." }, difficulty: 3, reward: "golden_3" }
];

// ---- Rewards (spec §8.3; data-driven) ----
export const REWARDS = [
  { id: "golden_heart", type: "hearts", title: "A Golden Heart", desc: "A heart of warmth from the little town.", asset: null, unlock: "early" },
  { id: "golden_3", type: "hearts", title: "Golden Hearts", desc: "Three of the town's golden hearts — a gift of warmth.", asset: null, unlock: "chapter_1" },
  { id: "letter_01", type: "letter", title: "A Letter from Kobby", sender: "Kobby", desc: "A warm note written after church, by the café.", asset: "letter", unlock: "chapter_1" },
  { id: "brass_key", type: "key", title: "The Brass Key", desc: "Opens the flower gate that leads to the Garden of Beginnings.", asset: null, unlock: "chapter_1" },
  { id: "video_mmmm", type: "video", title: "mmmm mmmm", desc: "A first musical video from the little town.", asset: "mmmm mmmm.mp4", unlock: "chapter_1" },
  { id: "golden_2", type: "hearts", title: "Golden Hearts", desc: "More warmth from the garden's first Colour." , asset: null, unlock: "chapter_2" },
  { id: "photo_you", type: "photo", title: "You", desc: "The first Colour of the world returns.", sender: "You", asset: "you.jpg", unlock: "chapter_2" },
  { id: "letter_02", type: "letter", title: "A Second Letter", sender: "Kobby", desc: "News from the garden, short and sweet.", asset: "letter_02", unlock: "chapter_2" },
  { id: "music_be_happy", type: "music", title: "Be happy", desc: "A favourite memory song, played at the café." , asset: "Be happy .mp4", unlock: "chapter_3" },
  { id: "golden_v", type: "hearts", title: "Golden Hearts", desc: "Counted by the river under the stars." , asset: null, unlock: "chapter_4" },
  { id: "photo_graded", type: "photo", title: "Graded", desc: "A rare photograph from the bridge — a night becomes hopeful.", sender: "O", asset: "graded.jpg", unlock: "chapter_4" },
  { id: "video_companion", type: "video", title: "Bridge of Stars", desc: "A video message from a companion across the river." , asset: null, unlock: "chapter_4" },
  { id: "golden_c", type: "hearts", title: "Golden Hearts", desc: "Warmth of the castle's memory archive." , asset: null, unlock: "chapter_5" },
  { id: "program_missy", type: "program", title: "Missy.cpp", desc: "A gift program that prints Misswell for you — run it yourself.", asset: "assets/programs/Missy.cpp", unlock: "chapter_5" },
  { id: "photo_note", type: "photo", title: "A Note on the Desk", sender: "K", desc: "The final clue set, kept in the castle.", asset: "note.jpg", unlock: "chapter_5" },
  { id: "photo_kaka", type: "photo", title: "A Rose from Kobby", sender: "K", desc: "A small gift, kept dark in the bookshelf.", asset: "kaka with a rose .jpg", unlock: "chapter_5" },
  { id: "mirror", type: "surprise", title: "The Mirror Gift", desc: "A mirror that shows you the world as you made it.", unlock: "chapter_6" }
];

// ---- Letters / programs / assets (spec §9.1, §8.14) ----
export const LETTER = `Dear you,

I have spent some time getting to know you, and I think I'm starting to understand just how much you mean to me. I like the way you laugh and smile all the time — no, I don't like it, I love it. I made this as a small gift to you.

I do not know the name of your other brother, so I put "The boy who got scolded" there, sorry for that. I miss the times when we used to talk after church — I miss you a lot. And I wish I could see you again. But you are always in my heart and mind.

I saw your other siblings in church the last time. I saw Gospel — light-skinned, handsome boy. He was laughing. I saw ANgel too, she looks just like you. Then I saw Prince, the one at John's. I saw your Mom too, beautiful as always, I decided to rewrite the game and add them.

It is a little world I made with care and love, because you deserve a world made especially for you.

Thank you for being you, and thanks for lighting it up and filling my life with colour. I hope you love and like it.

I am an ocean full of love, come and set sail on me. I await you, Beautiful Ship.

BYEEEEEEEE`;

export const MISSCPP = `// Missy.cpp — the gift program (auto-run; no input required).
#include <iostream>
#include <string>
#include <thread>
#include <chrono>

int main() {
    const std::string name = "Misswell";
    std::cout << "\\n  --- Missy.cpp ---\\n\\n";
    std::cout << "  ";
    for (char c : name) { std::cout << c << std::flush; std::this_thread::sleep_for(std::chrono::milliseconds(120)); }
    std::cout << "\\n\\n";
    std::cout << "  The best gift is you, yourself, Missy.\\n";
    std::cout << "  You brought the world back to life, and it is yours.\\n\\n";
    const std::string sparkles = "  **  **  **  **  **  **";
    for (int i = 0; i < 3; ++i) { std::cout << sparkles << "\\n"; std::this_thread::sleep_for(std::chrono::milliseconds(180)); }
    std::cout << "\\n  ( Program complete. )\\n";
    return 0;
}`;

// ---- Story fragments shown in Welcome screen & puzzles (§4.8, spec §5.1) ----
export const FRAG = {
  missy: "You brought the world back to life, and it is yours.",
  gospel: "A small, bright idea always finds its way home.",
  owusu: "Soon the mission will be complete.",
  kobby: "Some gifts only work when you stop looking for them.",
  kofi: "The Keeper forgot to write my name. I am still here.",
  prince: "Show off if you like, but the stars are watching.",
  angel: "These are the best ones! Look again.",
  scolded: "Sorry I got told off. Come on, let's finish."
};

// ---- Character dialogue lines (existing prototype, kept) ----
export const REACT = {
  missy: "The colour has gone from the edges first. Did it fade slowly, or all at once?",
  gospel: "Whoa, everything is grey! Is this a game? Can I help look?",
  owusu: "Report, please. When did the colour begin to fade?",
  kobby: "That's not normal. How long has it been like this?",
  kofi: "Why does it feel like I've been here before? Weird."
};
export const PIECE = {
  missy: "Look, there's a faint path in the hedge. Someone has walked here before.",
  gospel: "I found it! I found it! Do I get a prize?",
  owusu: "Objective secured. One piece down, three to go.",
  kobby: "Okay. One down.",
  kofi: "Huh. That actually worked."
};
export const WHOLE = {
  missy: "The lantern has six tiny stars drawn around it. I think that's the real clue.",
  gospel: "Six stars? That's so many! Can we get a snack first?",
  owusu: "Six stars. Then that is our mission: recover all six.",
  kobby: "A lantern with six stars. I guess that's the plan.",
  kofi: "Six stars. Great. Easy, right?"
};
export const GATE6 = {
  missy: "Wait, please. I'm not going to hurt you. Who are you?",
  gospel: "Ooh, who's that? He looks cool. Hey, wait for me!",
  owusu: "Halt. Identify yourself. Who sent you?",
  kobby: "Who was that? Strange. Let's keep going.",
  kofi: "Why would the Keeper write to me?"
};
export const KEEPER_NOTE = "Dear Explorer, the Lantern has fallen and the Hush has reached the edge of town. Don't be afraid. It only takes what is forgotten. Start with the torn picture. — The Keeper";
export const MIRROR_GREETING = "The best gift is you, yourself, Missy.";
export const MIRROR_LINE = "You brought the world back to life — and it is yours.";
export const MIRROR_PRIVACY = "Your face stays on your device.";
