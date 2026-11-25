# BUILD SPEC — Love in Pixels (finish & ship)

**To:** Developer
**Project:** Love in Pixels — a private, browser-based pastel pixel-art puzzle adventure (personal gift)
**Goal:** A lightweight but fun, interactive, and rewarding web game that runs on iOS, built from an existing playable prototype.
**Status:** Spec for finishing and shipping. Existing prototype: character select → story-mode select → Chapter 1 (The Little Town) playable skeleton.
**Reference files:** `letter.html` + `Love in Pixels - A Letter to You.pdf` (Kobby's letter for on-screen display / printing). See §12 for the full letter text.

---

## 1. GOAL & SCOPE

Finish the game so it is genuinely **playable, interactive, and rewarding**, not just a demo. The player should feel a sense of progress, discovery, and personal reward by the time they finish a chapter.

### What "lightweight but fun, interactive, rewarding" means
- **Short sessions:** 5–10 minutes per chapter so mobile players can play between things.
- **Clear feedback on every action:** any tap, pickup, puzzle move, or item use produces a visible + audible reaction (particle burst, sound, text, screen pulse).
- **Visible progress:** hearts, pieces, key, journal entries, and an unlock map make progress obvious.
- **Satisfying completion:** each puzzle ends in a "reveal" (a note, a glowing image, a reward) rather than a bare "correct".
- **Personal/gift feel:** the letters, photos, and small story details should feel made for a specific person — but keep them data-driven so they can be swapped.

---

## 2. PLATFORM PLAN

### 2.1 Web first (MVP)
- A single-page web app: plain HTML + CSS + vanilla JS + a canvas 2D renderer.
- No build step, no npm dependencies required to run. (A `package.json` + `npm run dev` is nice to have but not required.)
- Icons: inline SVG or tiny inline 8×8/16×16 "sprites" drawn on `<canvas>`.
- All game logic in JS; all drawing as code or cached bitmaps.

### 2.2 iOS afterwards (PWA → native)
- Wrap the web app as a **Progressive Web App**:
  - `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`
  - `apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style`, full-screen layout, no URL bars in standalone mode.
  - Landscape-only lock (portrait shows a "turn sideways" screen), as per the handoff.
  - Touch-first: on-screen D-pad + interact button for menus and gameplay.
- If a native app is later required (App Store), wrap the same PWA with **Capacitor** and reuse the exact same HTML/JS — do not rewrite for a native engine.

### 2.3 Screen & input
- Logical resolution: **320 × 192** (20 × 12 tiles of 16 px), rendered to a 960 × 576 canvas at `SC=3`, scaled with CSS and `image-rendering: pixelated`.
- Mobile: on-screen D-pad (up/left/right/down) + jump/action button + tap to interact.
- Desktop: keyboard WASD/arrows + E/Space + mouse clicks on interactive tiles.
- Always support pointer events; never require a physical keyboard.

---

## 3. TECH STACK & ARCHITECTURE

### 3.1 Stack
- **HTML5, CSS3, vanilla JavaScript** (TypeScript optional but not required — prefer keeping it simple and runnable).
- **Canvas 2D** for the game world (already in the prototype).
- **JSON** for data (characters, chapters, puzzles, rewards) — loaded at startup or via local files.
- **LocalStorage** for saves (private game, single browser).
- **No heavy engine** for now. The existing prototype is plain canvas; migrate to Phaser 3 only when the prototype has been evaluated.

### 3.2 Project structure (expand the existing prototype)
```
love-in-pixels/
├── index.html              ← entry; loads CSS/JS
├── package.json            ← (optional) dev scripts
├── src/
│   ├── main.js             ← boot, routing between screens
│   ├── config.js           ← constants (SC, SPD, GRAV, tile sizes)
│   ├── screens/
│   │   ├── CharacterSelectScreen.js
│   │   ├── ModeSelectScreen.js
│   │   ├── WelcomeScreen.js
│   │   ├── GameScene.js    ← rendering, input, update loop
│   │   ├── DialogueBox.js  ← dialogue manager
│   │   ├── HUD.js
│   │   └── SettingsScreen.js
│   ├── systems/
│   │   ├── Player.js
│   │   ├── Movement.js
│   │   ├── Interaction.js
│   │   ├── Inventory.js
│   │   ├── Journal.js
│   │   ├── SaveManager.js
│   │   ├── PuzzleManager.js
│   │   ├── RewardManager.js
│   │   └── AudioManager.js
│   ├── data/
│   │   ├── characters.js   ← CHARS
│   │   ├── chapters.js     ← CHAPTERS
│   │   ├── puzzles.js      ← PUZZLES (data-driven)
│   │   ├── rewards.js      ← REWARDS (data-driven)
│   │   └── story.js        ← dialogue, notes, events
│   └── ui/
│       ├── HUD.css
│       ├── InventoryUI.js
│       ├── JournalUI.js
│       └── SettingsUI.js
├── assets/
│   ├── sprites/            ← code-drawn or PNG/SVG
│   ├── maps/               ← tilemaps (start with hand-rolled)
│   ├── photos/             ← personal photos (private)
│   ├── videos/             ← personal videos (private)
│   ├── music/              ← audio (private, authorised)
│   ├── sounds/             ← SFX
│   └── fonts/
└── index.html
```

### 3.3 Core design rules
1. **Data-driven everything:** puzzles, rewards, characters, dialogue, and story events are loaded from data, not hardcoded. Change a JSON file to add content.
2. **One game loop:** a single `update(dt)` + `render(t)` loop. Mouse/keyboard/touch input is normalized into a single `keys` and `touch` state object.
3. **Separation of concerns:** rendering does not know about puzzles; puzzles do not know about dialogue.
4. **Input is abstract:** the game never asks "who is pressing this key" directly — it asks "is the 'interact' action active?", and the action is mapped to keyboard, D-pad button, or tap.

---

## 4. CHARACTER ROSTER

The user will replace names later. For the build, fix the names and identities below, but mark them as **draft placeholders** so they can be swapped without changing code. All character data lives in `characters.js`.

### 4.1 Missy — Explorer (existing)
- **Age:** late teens/20s
- **Look:** skin `#8b5a3a` (brown, not very dark), very long dark hair worn in two long braids (plaits) with pink ribbons, warm/observant. Style `skirt` with skirt color `#e8c4b8`; fuller build (leg 8, torso 7).
- **Personality:** lovely, curious, very observant; gentle questions, notices small details; quick to smile
- **Role in story:** the heart of the story; follows the companion's clues
- **Draft perk (idea only):** sees sparkles near hidden clues

### 4.2 Gospel — Little Adventurer (existing)
- **Age:** 10
- **Look:** light skin, short male hair
- **Personality:** acts like a 10-year-old — excited, impatient, asks many questions, a little scared but brave
- **Role:** helps find the torn picture, points out small details
- **Draft perk:** can squeeze through small gaps

### 4.3 Sgt. Brown — Soldier (existing)
- **Age:** adult
- **Look:** skin `#452d22` (dark), tall and strongly built (leg 8, torso 7), cap style with medal
- **Personality:** strong, disciplined, formal; short clipped sentences; treats puzzles like missions
- **Role:** guards the Bridge of Stars; brings mission-briefing energy
- **Draft perk:** hints cost nothing extra

### 4.4 Kobby — Young Man (existing)
- **Age:** 20
- **Look:** dark skin `#5c4a3a`, average height, white long-sleeved shirt with blue jeans
- **Personality:** calm, reserved, ordinary young man; speaks little, thinks before answering, dry understated humour
- **Role:** runs the Café; hides a Star fragment out of fear of losing it
- **Draft perk:** walks faster

### 4.5 Prince — Teen Explorer (new)
- **Age:** 16–17
- **Look:** dark skin `#6b4a38`, average height, stud earring, **green attire (green shirt `#4caf7d` and blue jeans) with the words "ST. JOHN’S" printed on the shirt** (shown as text on the large preview; small sprites show a white stripe stand-in)
- **Personality (age-appropriate):** confident and somewhat dramatic, likes to show off slightly but is secretly earnest; wants to be taken seriously; a little impulsive but eager to prove himself; speaks in a mix of youthful energy and genuine warmth; protective of others
- **Role in story:** another explorer who joins the journey; his chapters should raise the stakes and show him maturing
- **Draft perk (idea only):** quick to attempt risky shortcuts (encourages trial-and-error play)

### 4.6 Angel — Young Explorer (new)
- **Age:** 12–13
- **Look:** dark skin `#5a3c40`, skirt style with skirt color `#bfe8d2` (dark hair, short)
- **Personality (age-appropriate):** enthusiastic, imaginative, fearless but sometimes careless; literal-minded; uses informal, hype language; notices small things because she is small and quick; likes collecting small treasures; can be impatient with grown-ups but trusts them
- **Role in story:** quick and nimble; fits into tight spots; her chapters are light-hearted and puzzle-filled; she helps the player find clues by looking where others don't
- **Draft perk (idea only):** finds things in the "background" of a scene (encourages observation puzzles)

### 4.7 "The boy who got scolded" — Teen Explorer (new)
- **Age:** 15
- **Look:** dark skin `#7a5a3c`, average height, kerchief
- **Personality (age-appropriate):** defensive but contrite; easily embarrassed; tries to act tough but is sensitive to being scolded; speaks in a hesitant, slightly self-conscious way; wants to prove he is not in trouble; dry/awkward humour; quick to deflect blame with a joke
- **Role in story:** an ally who shows up after making a mistake; his presence reminds the player that everyone makes errors; his chapters reward honesty and second chances
- **Draft perk (idea only):** double-time interaction hints when he is present (lowers frustration)

### 4.8 Mrs. Brown — Community elder (new)
- **Age:** adult
- **Look:** fair skin `#e8c9a8`, short woman (leg 6, torso 6), style `skirt` with skirt color `#f2d8b0`, dark curly afro hair
- **Personality:** gentle, listens and advises the young ones around her; the town's quiet heart
- **Role in story:** community elder who can be visited from the start of the game
- **Draft perk:** patient and kind — always ready to listen

### 4.9 Avatar rendering notes (new)
Avatars are drawn by `drawChar` in `js/main.js` (16×24 logical canvas, colors applied via `fillStyle`):
- All character data lives in `CHARS` (`js/data.js`); each entry has `id, name, role, age, blurb, style, hair, skin, top, bottom, shoe, leg, torso` plus optional fields (`skirt`, `longHair`, `medal`, `badge`, `pig`, `grad`, `moto`, `kerc`, `hood`).
- Style `skirt` draws the skirt around the bottom of the body: `dd(2, torTop, 12, 4, c.skirt); dd(3, torTop + 4, 8, 2, c.skirt)`; legs keep their normal bottoms below.
- `longHair: true` lengthens Missy's hair: `dd(5, hd - 1, 6, 6, c.hair); dd(4, hd + 3, 2, 4, c.hair); dd(9, hd + 3, 2, 4, c.hair)`.
- All avatars currently use dark hair (`#2d2b2b` or `#1c1224`); Missy's skin is brown `#8b5a3a`.

- **Legs & clothing rule (2026-11-25):** every avatar has two clearly separate legs with shoes. Female characters (Missy, Angel, Mrs. Brown) wear skirts with bare legs below; all male characters (Gospel, Sgt. Brown, Kobby, Prince, The boy who got scolded) wear blue denim jeans with a dark belt line.

### 4.10 Naming & perks
- Names are currently placeholders and will be updated by the user (see §12).
- All perks are **draft ideas only**, not implemented. Build them only if a character's personality benefits from a light gameplay difference; otherwise keep all characters mechanically identical and use dialogue/roles for distinction.

---

## 5. GAMEFLOW / PLAYER JOURNEY

### 5.1 Entry flow
1. **Character select** — 8 character cards in this order: Missy, Gospel, Angel, Sgt. Brown, Mrs. Brown, Prince, Kobby, "The boy who got scolded" (Kofi removed from the roster, 2026-11-25), each with a code-drawn sprite, name, role, blurb, and draft perk. Ages are hidden in the UI. Selection remembered in `localStorage`.
2. **Story mode** — **Adventure only** (key icon). Romance and Horror modes were removed from scope (decision 2026-11-25); the game is a single Adventure story. The build keeps a one-button "Your story awaits / Adventure" step after character select.
3. **Welcome screen** — character name + mode + one-line intro.
4. **Music reward** — after the player selects a character and completes their first quest of progress, show a music reward (original or authorized audio) as the first musical reward of the game. [Copyright: this replaces the earlier vanilla intro ("how vanilla is made"), which carried copyright concerns.]
5. **Chapter 1 (The Little Town)** — travel to the town, explore, meet characters, solve puzzles, unlock the Garden.

### 5.2 Main loop
1. Enter a location.
2. Find objects, clues, and characters.
3. Talk to NPCs (dialogue; the player's character's lines change per character).
4. Solve a puzzle (measured by a "progress bar" that fills as you complete steps).
5. Collect a reward (heart, letter, photo, music, video, surprise).
6. Log it in the journal; update the map and inventory.
7. Unlock a new area or chapter.

### 5.3 Chapter structure (6 planned, in order)
1. **The Little Town** — tutorial + golden hearts + brass key + flower gate. (Already playable.)
2. **Garden of Beginnings** — flower sequence, butterfly trail, hidden key. Reward: personal photo (`you.jpg`).
3. **Little Café** — forgotten order, secret table, conversation puzzle. Rewards: music track (`Be Happy` video), the vanilla story & facts & easy home recipe, and the knife-holding tutorial (from Mireille).
4. **Bridge of Stars** — constellation, river crossing, light sequence. Rewards: `graded.jpg` + "A Rose" photo.
5. **Memory Castle** — memory archive, locked library, final door. Reward: the `Missy.cpp` program (Chapter 5 gift — shown in-game when tapped; prints "Misswell" automatically).
6. **Place of a Thousand Stars** — finale: relight the Lantern, Q&A with Mireille, mirror gift. The surprise is a mirror-like view of the player's own face with the text: "The best gift is you, yourself, Missy." — plus a "Press to exit" button with confetti.

---

## 6. SYSTEMS

### 6.1 Movement
- Top-down tile-based movement (the prototype already has this).
- **Smooth easing:** acceleration and deceleration, equal diagonal speed, sliding along walls.
- **Render:** 3× zoom (`SC=3`) so there are no pixel jumps; small walking bounce.
- **Collision:** solid tiles (`T H F G`), per-axis collision resolution.
- **Jump:** a visual hop only (`GRAV=520`, `JV=135`) — it does **not** clear obstacles. (Revert this to a meaningful action later if the player wants to reach high places.)

### 6.2 Interaction
- **Touch/D-pad/Jump button** for menus and gameplay (touch-only build).
- **Tap the "! "** that appears over an interactive tile to act.
- **Dialogue:** tap a character or a "talk" prompt; a dialogue box shows speaker + text; tapping advances.
- **Feedback:** interactive objects should be discoverable (subtle highlight, icon, or prompt) but never obtrusive.

### 6.3 Inventory
- Stores collected objects: golden hearts, pieces, key, letters, photos, collectibles.
- Each item has: unique ID, display name, icon, description, collection status, optional use conditions.
- Some items are usable elsewhere (e.g., a key found early opens a later chest).

### 6.4 Journal / objective
- Shows: current objective, story events, important clues, completed puzzles, discovered locations, character interactions.
- Helps the player remember without revealing every solution.

### 6.5 Save/load
- **LocalStorage** for the first private version.
- Save schema: version, character, current location, player position/checkpoint, completed puzzles, story decisions, hearts, collected objects, unlocked rewards, achievements, settings.
- **Validation & recovery:** if saved data is missing or malformed, don't crash — reset to defaults.
- **Memory aid:** add an in-game "Export save / Import save" option so progress isn't locked to one browser (deferred build).

---

## 7. PUZZLE DESIGN

Puzzles must be **varied, fair, data-driven, and graded by difficulty**. Store all puzzle definitions in `puzzles.js` with this structure:

```json
{
  "id": "town_fountain",
  "location": "little_town",
  "chapter": 1,
  "type": "pattern",
  "instructions": "Press the three fountains in the order the water jumps.",
  "steps": [
    { "id": "p1", "type": "sequence", "target": ["left","right","middle"] }
  ],
  "hints": {
    "gentle": "Watch the water.",
    "strong": "Look at the fountain's spouts.",
    "solution": "Left, then right, then the middle one."
  },
  "difficulty": 1,
  "reward": "golden_heart"
}
```

### 7.1 Puzzle types (build all 8)
1. **Pattern/sequence** — repeat a colour/sound/order.
2. **Hidden-object search** — find items partially hidden in an illustrated scene.
3. **Combination lock** — set dials / enter a code from clues.
4. **Pattern recognition** — complete a sequence or find the missing element.
5. **Matching** — pair related symbols (memory optional).
6. **Maze** — navigate to a goal (7×7 basic; add switches later).
7. **Constellation** — connect stars by clues to reveal a symbol.
8. **Inventory puzzle** — use collected items in the correct place.

### 7.2 Difficulty progression
- **Tutorial:** very easy (teach controls).
- **Early game:** easy (observation + simple logic).
- **Middle game:** medium (multi-step reasoning).
- **Late game:** hard (combine clues across locations).
- **Finale:** challenging (several learned mechanics in one).
- Difficulty should go up through **complexity, not obscurity**. No failure penalties.

### 7.3 Hint system
- Three levels: gentle (nudge toward the area), strong (name the object), solution (show the answer).
- Free after 30 seconds of being stuck. Hints never permanently remove rewards or punish.

---

## 8. REWARDS & COLLECTIBLES

Rewards are central to the game's feel. Every reward should have a **reveal animation** and a **context** (where and how it was earned).

### 8.1 Golden hearts (main currency)
- Earn through puzzles, exploration, optional challenges, hidden discoveries.
- Unlocks: bonus rooms, outfits, optional dialogue, hidden collectibles, extra challenges.
- **Rule:** the main story must still be completable even if a player misses optional collectibles.

### 8.2 Personal letters
- The creator supplies the letter text. Each letter has: title, sender, letter text, unlock condition, optional envelope art.
- Player opens unlocked letters and revisits them in a "Letters" collection screen.

### 8.3 Photographs
- Creator supplies personal photos (private hosting if sensitive). Each has: title, image, caption, unlock condition, optional date/memory description.
- Show in a "Memory Album" screen; locked photos appear as silhouettes.

### 8.4 Music
- Original or author-authorised audio only. Play/pause, volume, replay, optional accompanying message, clear active-play indicator.

### 8.5 Videos
- Personal video messages. Play/pause, full-screen where supported, replay, optional caption, clear close control.

### 8.6 Mystery rewards
- Secret rooms, funny messages, special outfits, hidden conversations, bonus puzzles, the final surprise.

### 8.7 Reward manager
- Data-driven reward record: unique ID, type, title, description, asset path, unlock condition, unlocked status.
- Prevents duplicate unlocks and saves reward progress.

### 8.8 Prize tiers & currency
- **Golden hearts (3 max per chapter, more in later chapters)** — the in-world currency. Earned through exploration, puzzles, optional challenges, and hidden discoveries. Unlocks bonus rooms, outfits, optional dialogue, hidden collectibles, and extra challenges.
- **Progress pieces (in multi-stage puzzles)** — a sub-currency that fills toward a complete picture or a locked gate; not sellable.
- **Keys** — unlock specific doors/gates (e.g., the brass key opens the flower gate). Keys are not currency; they are one-way unlocks.
- **Non-currency collectibles** (specific outfits, secret dialogue, bonus photographs) — cosmetic/story-only; no "price" in hearts.
- **Rule:** the main story must remain completable even if a player misses any optional or hidden collectible.

### 8.9 Chapter reward plan

| Chapter | Puzzles | Reward(s) | Significance |
|---|---|---|---|
| 1 Little Town | fountain pattern, glasses hidden-object, bench chest, hedge maze, sliding board | 3 golden hearts, first personal letter, brass key, and the **mmmm mmmm.mp4** video | Gateway to the Garden of Beginnings; the player's first musical video reward |
| 2 Garden of Beginnings | flower sequence, butterfly trail, hidden key | golden hearts, personal photograph **(you.jpg)**, story letter (02), new collectible **(dandelion-extract.jpg)**, knife-holding tutorial (Chapter 2) | First colour returns; a memory revealed |
| 3 Little Café | forgotten order, secret table, conversation puzzle | golden hearts, **Be happy .mp4** video, vanilla story & facts & home recipe | A favourite memory song; a café that exists only at certain times |
| 4 Bridge of Stars | constellation, river crossing, light sequence | golden hearts, **graded.jpg** (rare collectible) and **kaka with a rose .jpg** (photo "A rose"). The companion video message was removed from scope. | Night becomes hopeful; a small gift kept for the bridge |
| 5 Memory Castle | memory archive, locked library, final door | golden hearts + the **`Missy.cpp`** program (auto-runs when tapped and prints "Misswell") + **note.jpg** | Reflection and the final clue set |
| 6 Place of a Thousand Stars | finale (Q&A, lantern relit) | golden hearts + final Memory Star + mirror gift (web view of the player's own face with the text "The best gift is you, yourself, Missy") + "Press to exit" button with confetti | The reason the world was made; the gift itself |

### 8.10 Hidden & secret rewards (opt-in; never gate the main story)
- Hidden collectibles, bonus dialogues, secret outfits, "lucky find" photographs, extra challenges.
- Tracked by the reward manager with its own unlock condition; no two chapters share a duplicate reward; secrets never lock the main path.

### 8.11 The prize economy (lightweight)
- Keep scoring simple: **golden hearts = points.** Optional challenge = bonus hearts; secret discovery = bonus hearts.
- A "prize" is any unlock that costs a meaningful but achievable number of hearts — e.g., a special outfit, a bonus dialogue branch, or a delayed photograph.
- Some prizes are **deferred**: the condition is met early, but the reward appears only when the chapter completes (e.g., a photograph the player can't view until they reach the album).

### 8.12 Reward manager contract
- **Data-driven record:** unique ID, type (heart, piece, key, letter, photo, music, video, surprise, outfit, collectible), title, description, asset path, unlock condition, unlocked status.
- Prevent duplicate unlocks.
- Save reward progress with the save file.
- Enforce unlock conditions (never trigger a reward prematurely).
- No reward may block the main story path.
- Support export/import of the rewards state so a player can back up progress (deferred).

### 8.13 Feedback for every reward
- Every reward plays a **short reveal animation**, a **sound effect**, and shows a **one-line notification** ("You found a golden heart", "A letter arrives").
- Collection screens (Inventory, Journal, Letters, Photo Album, Music, Video) are the permanent archive. Locked items appear as silhouettes/sealed frames.

### 8.14 Chapter 6 gift: the mirror program
The Chapter 6 ultimate surprise is a **mirror-like program that shows her own face** (the character the player selected). It is a self-contained web program the player can run in the browser.

**What it shows:**
- Her own face, reflected as in a true mirror (horizontal flip).
- A greeting text: **"The best gift is you, yourself, Missy."**
- An optional reflection line: "You brought the world back to life — and it is yours."

**Technical spec (build this as a small web app):**
- **Face capture:** use the device webcam via `navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })`. Render the live feed on a `<canvas>` (or CSS `<video>`) element, then mirror it with `transform: scaleX(-1)` so it reads as a real mirror.
- **Face source (two options, in this order of preference):**
  1. Real-time webcam capture at runtime (player grants camera permission).
  2. A supplied personal photo of her face, shown as a still mirror image.
- **Fallback:** if webcam access is denied or unavailable, show the supplied photo still.
- **UI:** a soft pastel panel with the greeting text, a small close/exit button, and the mirrored face centered. Full-screen or centered overlay — the player chooses.
- **Privacy:** the face feed never leaves the device. It is local-only; no upload, no cloud processing, no third-party SDK for face detection. (Avoid third-party face-detection libraries that send data off-device.)
- **Sound:** a soft, warm chime when the mirror opens; the final song can play softly in the background.

**Trigger / flow:**
- Shown at the end of Chapter 6, after the Lantern is relit and the colour floods back.
- Player opens it via a "Look in the mirror" / "See the mirror" button (or it auto-opens as a full-screen overlay on that screen).
- After viewing, a close button returns the player to the Memory Album / thanks screen.

**Content to supply (user input):**
- The face source: a personal photo, or confirm webcam capture at runtime.
- The greeting text is final: "The best gift is you, yourself, Missy."

**Deliverables for the developer:**
- `mirror.html` + `mirror.css` + `mirror.js` (or fold into the existing `index.html` as a separate view/screen).
- A "mirror open" event that fires when the player reaches the Chapter 6 finale screen, plus a close event to return to the Memory Album.
- A privacy notice line under the mirror ("Your face stays on your device").

---

## 9. PERSONAL LETTER (for on-screen display / printing)

The letter is the personal note the player receives as part of the gift. It was written by Kobby (the player's chosen character) and should be displayed on a "sheet" screen or printed as a PDF. The letter text is in `letter.html` and `Love in Pixels - A Letter to You.pdf` (both in the project directory).

**Letter text (exact):**

> Dear you,
>
> I have spent some time getting to know you, and I think I'm starting to understand just how much you mean to me. I like the way you laugh and smile all the time — no, I don't like it, I love it. I made this as a small gift to you.
>
> I do not know the name of your other brother, so I put "The boy who got scolded" there, sorry for that. I miss the times when we used to talk after church — I miss you a lot. And I wish I could see you again. But you are always in my heart and mind.
>
> I saw your other siblings in church the last time. I saw Gospel — light-skinned, handsome boy. He was laughing. I saw ANgel too, she looks just like you. Then I saw Prince, the one at John's. I saw your Mom too, beautiful as always. I decided to rewrite the game and add them. It is a little world I made with care and love, because you deserve a world made especially for you.
>
> Thank you for being you, and thanks for lighting it up and filling my life with colour. I hope you love and like it.
>
> I am an ocean full of love, come and set sail on me. I await you, Beautiful Ship.
>
> BYEEEEEEEE

**Design notes for the developer:**
- Use a readable serif font (e.g., Cormorant Garamond or Georgia) at ~18–20px for on-screen.
- Use a warm cream panel (`#faf0e8`) with soft pink/lavender accents.
- The letter should feel like a "sheet of paper" — subtle dashed border, generous padding, elegant typography.
- Include the sender's name ("Kobby"), the heart emoji, and the final "BYEEEEEEEE" in large text.
- The letter should be clear, not locked, and revisit-able in a "Letters" collection screen.

---

## 9.1 MEDIA ASSET INVENTORY (user-supplied personal content)

All personal media (photos, videos, music) must be user-supplied and copied to the `assets/` folder. Keep filenames clean and avoid private info in filenames.

| File | Type | Used in | Purpose | Notes |
|---|---|---|---|---|
| `you.jpg` | JPEG (735×739) | Chapter 2 | Personal photograph | First color returns; a memory revealed |
| `Be happy .mp4` | MP4 | Chapter 3 | Music/reward video | A favourite memory song; a café that exists only at certain times |
| `mmmm mmmm.mp4` | MP4 | Chapter 1 | Music video reward | The player's first musical video reward |
| `dandelion-extract.jpg` | JPEG | Chapter 2 | New collectible | Reward alongside you.jpg |
| `graded.jpg` | JPEG (736×914) | Chapter 4 | Rare collectible | Night becomes hopeful |
| `note.jpg` | JPEG (736×750) | Chapter 5 | Reward | Reflection and the final clue set |
| `kaka with a rose .jpg` | JPEG (735×601) | Chapter 4 | Photo "A rose" | Moved from Chapter 5 to Chapter 4 |
| `letter.html` | HTML | (explains gift) | On-screen letter display | See §9 for letter text |
| `Love in Pixels - A Letter to You.pdf` | PDF | (explains gift) | Printable letter | Printable sheet version |
| `Missy.cpp` | C++ source | Chapter 5 | Program gift | Auto-runs and prints "Misswell" |

- **Directory mapping:** photos → `assets/photos/`, videos → `assets/videos/`, music → `assets/music/`, sounds → `assets/sounds/`, fonts → `assets/fonts/`.
- **Privacy note:** personal photos and videos must be hosted privately; do not place sensitive assets in an unrestricted public repository. Keep filenames free of private info.

---

## 9.2 LETTER 2 (Chapter 2 reward)

Plain and short on purpose, written to sound like a person. Also saved as `assets/letters/letter-02.txt`.

> Dear you,
>
> You made it to the garden. I hoped you would.
>
> This is where the colour starts to come back, so I tried to make it a gentle place. Just flowers and a few butterflies, nothing too hard. I didn't want you to feel rushed.
>
> I am looking at a photo of you as I write this letter. I look at it a lot and it makes me smile every time. There's a dandelion as well. Make a wish on it if you like. I won't ask what it was.
>
> I hope you're doing okay today. I think about you more than I say.
>
> Okay, go and find the next bit. Bye for now.
>
> Kobby

---

## 10. VISUAL ART DIRECTION

- **Style:** soft pastel 2D pixel art, clean pixel edges, consistent proportions, cozy environments.
- **Palette:** lavender (magic/UI), soft pink (romance/highlights), cream (panels/interiors), mint green (gardens), baby blue (sky/water), peach (warm light), deep purple (outlines/text/night).
- **Tile size:** 16 × 16 px. **Character sprite:** ~32 × 48 px. **Logical canvas:** 320 × 192, rendered 960 × 576 at `SC=3`, `image-rendering: pixelated`.
- **Code-draw the sprites** first (like the prototype's `draw()`), then swap in finished PNG/SVG art later.
- Keep a source folder for editable artwork; avoid anti-aliased edges in pixel art; keep animations on a consistent grid.

---

## 11. UI SCREENS

1. **Main menu** — logo, animated background, Start New Game, Continue, Settings, Credits.
2. **Character select** — swipeable carousel + thumbnail strip, 8 cards (final roster, see §5.1). Detail panel shows name, role, blurb, draft perk. **Ages are NOT displayed in the UI** (kept in data for dialogue only).
3. **Story mode** — Adventure only (Romance/Horror removed; no dark Horror UI needed).
4. **Welcome screen** — character name + mode + intro text.
5. **Letter sheet** — the personal letter (Kobby's letter) displayed on a "sheet" with elegant typography, heart emoji, and the final "BYEEEEEEEE". Include "Letter" in the main menu so players can re-read it at any time.
6. **Gameplay HUD** — hearts, pieces, key, objective, map, pause/settings, Menu.
7. **Puzzle screen** — instructions, interactive tiles/inputs, hint button, progress bar.
8. **Reward screen** — short reveal animation, then add to the right collection.
9. **Inventory UI** — icons with descriptions.
10. **Journal UI** — objectives, story, clues, completed puzzles.
11. **Letters / Photo album / Music / Video viewers** (built in later phases).
12. **Settings** — music volume, SFX volume, text speed, full-screen, control preferences, reduced animation.

---

## 12. AUDIO & FEEDBACK

- **Background audio** (optional, later phase): 6 themes + ambient.
- **Sound effects:** footsteps, pickup, button press, door open, puzzle solved, achievement unlocked, reward reveal.
- **Rules:** audio optional with volume controls; music starts only after the first player interaction (browsers block autoplay); use original or authorised audio only.
- **UI feedback:** every action should produce a small visual + sound cue (particle burst, heart pop, screen pulse, note slide-in).

---

## 13. DEVELOPMENT PHASES

### Phase 0 — Stabilise MVP
- [ ] Confirm the prototype runs in a modern browser and on a real phone (test button sizes, speed, tap accuracy).
- [ ] Lock the logical resolution and input mapping.
- [ ] Make the D-pad + tap-to-interact feel smooth and responsive.

### Phase 1 — Utility systems
- [ ] Save/load with validation and recovery.
- [ ] Inventory UI (icons + descriptions).
- [ ] Journal/objective UI.
- [ ] Dialogue system polish (more than 2 screens; auto-advance + tap-to-advance).
- [ ] Menu flow polish (transitions, settings screen).

### Phase 2 — Chapter 1 completion
- [ ] Build the 4 mini-puzzles (fountain pattern, glasses hidden-object, bench chest combination lock, hedge maze).
- [ ] Add Mrs. Adjoa's shop, benches, and the bench chest.
- [ ] Build the sliding "Missing Pieces" puzzle (drag 4 pieces into frame → 9-tile slide puzzle, 20 random legal shuffles, no move limit).
- [ ] Make Chapter 1 end with a reward + a gate-opening scene.

### Phase 3 — Chapter 2
- [ ] Garden of Beginnings: flower sequence, butterfly trail, hidden key.
- [ ] Add a photo reward + letter reward.

### Phase 4 — Chapters 3–4
- [ ] Café: forgotten order, secret table, conversation puzzle.
- [ ] Bridge of Stars: constellation, river crossing, light sequence.

### Phase 5 — Chapters 5–6
- [ ] Memory Castle: memory archive, locked library, final door.
- [ ] Place of a Thousand Stars: finale combining all puzzle types.

### Phase 6 — Rewards & completion
- [ ] Letter collection screen + photo album + music player + video viewer.
- [ ] Mystery rewards + final surprise + achievement screen.
- [ ] Story choices + consequences (publish if ready).
- [ ] Save-export/import (deferred, optional).

---

## 14. TESTING CHECKLIST (acceptance criteria)

Before calling the game "done-ish":

- [ ] Game loads in a modern desktop browser.
- [ ] Game fits common mobile screens and rotates to landscape.
- [ ] Player moves in all four directions without getting stuck.
- [ ] Player cannot walk through solid objects.
- [ ] Interaction prompt appears at the right distance.
- [ ] Collectibles cannot be collected repeatedly.
- [ ] Inventory updates correctly.
- [ ] Puzzle completion is recorded.
- [ ] Rewards unlock only when their conditions are met.
- [ ] Progress survives a browser refresh.
- [ ] Invalid/missing save data does not crash the game.
- [ ] Audio can be muted.
- [ ] All text is readable.
- [ ] The game can be completed without a keyboard (mobile).
- [ ] PWA install works on iOS (Add to Home Screen → full-screen play).

---

## 15. DEPLOYMENT

### 15.1 Web (hosted artifact)
- Host the single `index.html` + assets on a static host (or the existing hosted-artifact flow).
- Keep the page lean: inline CSS/JS, lazy-load data.

### 15.2 iOS
- Add PWA manifest + meta tags; test "Add to Home Screen" on a real iPhone.
- Landscape lock: try `screen.orientation.lock('landscape')`; show the "turn sideways" screen as a fallback.
- Test on real iOS Safari (button sizes, tap accuracy, speed).
- **Optional native App Store build:** wrap the same PWA with Capacitor; reuse the same HTML/JS — do not rewrite.

---

## 16. FINAL NOTES FOR THE DEVELOPER

- This is a **personal gift game**, not a commercial product. Keep scope small, progress visible, and the mood warm and cozy.
- The existing prototype is the foundation — reuse it. Do not rebuild the movement system.
- Everything fun should be **data-driven** so the user can swap content (names, letters, photos, music) without touching code.
- The three new characters (Prince, Angel, "The boy who got scolded") should be **mechanically equal** to the others, with their personalities expressed through dialogue, role, and brief perk ideas only.
- Everything in §12 is content, not code — the build must not depend on the final names or text.
- The **letter** is a key emotional deliverable — display it beautifully on a "sheet" and make it revisitable.
- The **gifts** (photos, videos, music) are the heart of the personal nature of the game. Store them privately and confirm licensing.

---

**Document version:** 2.1
**Status:** For developer handoff — content placeholders marked "draft user content". Complete with letter, gift inventory, and media assets.

---

## 17. BUILD LOG & CURRENT STATUS (updated 2026-11-25)

**Scope decisions**
- **Final roster (8):** Missy, Gospel, Angel, Sgt. Brown, Mrs. Brown, Prince, Kobby, The boy who got scolded. Kofi removed. "Sgt. Owusu-Brown" renamed "Sgt. Brown"; "ANGEL" shown as "Angel". Cards appear in that order.
- **Prince's outfit:** green attire with "ST. JOHN’S" on the shirt (gold sash removed so it doesn't cover the text).
- **Legs & clothing:** legs now have a visible gap and shoes. Skirts for Missy, Angel, Mrs. Brown; blue jeans for everyone else (Prince's trousers changed from green to jeans, shirt stays green).
- **Kobby's outfit:** white long-sleeved shirt (full-length sleeves, small button line) with blue jeans.
- **Mrs. Brown's hair:** curly afro (round hair mass with curl highlights) replaces the bun.
- **Kofi** is a non-playable hooded NPC (the Keeper's messenger). **dandelion-extract.jpg** is a Chapter 2 reward. **Chapter 4:** the companion video message is removed; the photo "A rose" now sits there (Chapter 5 keeps Missy.cpp and note.jpg). **Letter 2** is written (§9.2).
- **Adventure mode only.** Romance and Horror removed. Goal: finish the Adventure story as fast as possible.
- All content stays data-driven (characters, signs/digits, puzzle sequences are plain data at the top of the script).

**Built so far (single self-contained `index`-style HTML page, published as a private artifact)**
- **Character select:** carousel (swipe / arrows / keys), thumbnail strip, idle bob + blink animation, choice saved in `localStorage` (`lip_char`). Ages not shown.
- **Avatars:** 16x24 code-drawn sprites via `drawChar` (fillRect). Missy now has longer hair in two braids with pink ribbons. Mrs. Adjoa (NPC, not in spec) has her own sprite: bun, pink top, blue skirt.
- **Mode step:** one Adventure button after character select.
- **Chapter 1 playable slice (The Little Town):** 20x12 tile map, D-pad + A button (mobile), arrows/WASD + Space/E (desktop), smooth movement with per-axis collision, y-sorted drawing, "!" prompt near interactables, dialogue box (tap/A to advance), HUD (hearts, key, objective, mute, menu), particle bursts + WebAudio blips, portrait "turn sideways" screen, save/load with validation (`lip_save`).
- **Chapter 1 puzzles built:** (1) glasses hidden-object (bush search for Mrs. Adjoa), (2) fountain pattern (watch & repeat Left, Right, Middle), (3) bench chest combination lock (code 528 from three signs: Morning 5, Noon 2, Evening 8), (4) flower gate opened with the brass key. Hints: 3 levels, free at any time.
- **Hearts:** 3 in Chapter 1 (glasses returned, fountain, chest). Fountain heart is optional; the main path needs only glasses -> chest key -> gate.

**Chapter 1 rebuilt to the Handoff story (2026-11-25)** (supersedes the first slice above)
- Scene 1 note on the fountain; Scene 2 Gospel (shown as Bea if you play Gospel); Scene 3 Mrs. Adjoa; Scenes 4 to 6 as in §18. Each of the 8 characters says their own line in scenes 2 to 6 (§19).
- Four picture pieces: fountain pattern (shown twice), glasses in the flower beds returned to Mrs. Adjoa, chest with three colour dials (pink, mint, blue read from the east houses), 7x7 hedge maze with Gospel shouting directions at forks (no failure, solvable).
- Assemble the torn picture (tap a piece, tap its coloured slot), then a 3x3 sliding puzzle (20 random legal shuffle moves, always solvable, no move limit), lantern picture with six empty stars, brass key.
- Flower gate: colour floods back (the town starts grey and regains colour with each piece), Kofi appears as the hooded NPC, then the Chapter complete card with "Read Letter 1" and "Watch mmmm mmmm" (video plays from `assets/videos/mmmm-mmmm.mp4`; it shows a message if the file is missing, as in the hosted preview).
- Golden hearts: 1 at two pieces, 1 at four pieces, 1 for the key (3 total). Hints are three levels, available any time (the 30 s delay is not implemented yet).
- Tested end to end in a headless browser with no errors; not yet tested on a real phone.

**Chapters 2-6 built (2026-11-25)** — the world extends and all six chapters now build:
- **World:** W extended 20→34; new zones: Garden of Beginnings (cols 20–23, rows 4–9), Bridge of Stars (cols 24–27, rows 8–13), Memory Castle (cols 28–31, rows 8–13), Lantern of the Place (cols 32–33, rows 8–12).
- **Chapter 2 — Garden of Beginnings:** flower sequence (`pzG`), butterfly trail (`pzBT`), hidden key (`garden_key`); rewards: photo `you.jpg` + the knife-holding tutorial (Mireille).
- **Chapter 3 — Little Café (Story Line A, vanilla):** forgotten order (`pzOrd`), secret table (`pzSecTable`), conversation puzzle (`pzConv`); rewards: "Be Happy" video, vanilla story & facts & home recipe (`vanillaFacts`).
- **Chapter 4 — Bridge of Stars:** constellation (`pzConst`), river crossing (`pzRiver`), light sequence (`pzLights`); rewards: `graded.jpg` + `kaka-with-a-rose.jpg`.
- **Chapter 5 — Memory Castle:** memory archive (`pzMemArchive`), locked library (`pzLibLock`), final door (`pzFinalDoor`); reward: the Missy.cpp program viewer (`showProgram`).
- **Chapter 6 — Place of a Thousand Stars:** Q&A puzzles (`pzQA` — "Who sang Unethical?"→Faouzia, "Who and who sang Raindance?"→Tems & Dave, the lyrics fill, "Who sang Papoutai?"→Stromae, capitals of France/Canada/Australia), lantern relighting (`pzFinale`), mirror gift (`showMirror`), and a "Press to exit" button (`runConfetti` + "I HOPE YOU LIKED ITTTTTTTTT , BYEEEE").

**Not built yet (next, in order)**
1. Letters collection screen + Letter sheet (text in §9).
2. Inventory/Journal screens, settings, PWA manifest + iOS Add-to-Home-Screen test.

**Known open items**
- Landscape lock is not possible on iOS Safari; the portrait "turn sideways" screen is the real solution.
- The in-game Missy.cpp viewer (`showProgram`) simulates the run; the `Missy.cpp` file itself is kept in `assets/programs/`.
- Media (photos, videos, music) still needs to be supplied and hosted privately.

---

## 18. PROJECT PAIRING: LIP.zip + THIS SPEC (2026-11-25)

**What the zip contained**
- A legacy prototype (ES modules, 9-character roster including Kofi, Romance/Horror modes, a skeleton world with gold puzzle dots, separate puzzle canvas). It runs, but the world is mostly placeholder tiles.
- Docs: `Complete Documentation v1.1` and the 16 Nov `Handoff` (story "The Scattered Memories", Chapter 1 scenes and the Missing Pieces design).
- Media: 5 photos, 2 videos, the Missy program, a standalone letter page and PDF, plus aider logs and an empty `.git`.

**Decision (proposed, awaiting confirmation):** the playable core is the new single-file game built in this spec, because it already has working movement, interaction, dialogue and puzzles. The legacy prototype is kept in `legacy-prototype/` for reference only. Merged project: `LIP-game/`.

**Housekeeping done:** web-safe file names (`be-happy.mp4`, `mmmm-mmmm.mp4`, `kaka-with-a-rose.jpg`, `dandelion-extract.jpg`), duplicates removed (the Be happy video existed four times), `.git` and aider files dropped, manifest fixed (it referenced a missing PNG icon). Both videos are H.264/AAC (iOS-safe), portrait 720x1280.

**Asset to reward mapping**

| Chapter | Reward | File |
| --- | --- | --- |
| 1 | video "mmmm mmmm", Letter 1 (text in §9) | `assets/videos/mmmm-mmmm.mp4` |
| 2 | photo "You", collectible photo, Letter 2 | `assets/photos/you.jpg`, `assets/photos/dandelion-extract.jpg` |
| 3 | music "Be happy" (a 14 s video, played as audio) | `assets/music/be-happy.mp4` |
| 4 | photo "Graded", photo "A rose" (companion video removed) | `assets/photos/graded.jpg`, `assets/photos/kaka-with-a-rose.jpg` |
| 5 | Missy program, photo "note" | `assets/programs/Missy.cpp`, `assets/photos/note.jpg` |
| 6 | mirror surprise | camera, no file |

**Chapter 1 target (from the Handoff; supersedes the first slice built here)**
Scenes: (1) the Keeper's note on the fountain, (2) Gospel and the torn picture, (3) Mrs. Adjoa's shop, (4) four pieces: fountain pattern, glasses in the flower bed, chest with the house-door colours pink/mint/blue, 7x7 hedge maze (one dead end, no failure), (5) assemble the four pieces, then a 3x3 sliding picture (20 shuffle moves, always solvable), the picture shows a lantern with six empty stars and a brass key slides out, (6) the flower gate opens and a hooded figure delivers a warning. Hints are free after 30 s in three levels. Rewards: golden hearts, Letter 1, the "mmmm mmmm" video. The existing slice (glasses, fountain, signs-and-chest, gate) becomes parts of this.

**Story:** the Memory Lantern shatters into six Memory Stars, the Hush drains colour, notes come from the Keeper (Handoff §5).

**Conflicts to settle**
1. **Kofi (RESOLVED).** Kofi is a non-playable hooded NPC, the Keeper's messenger. He is not on the character-select screen.
2. **Dialogue lines (DRAFTED).** Lines for Angel, Prince, Mrs. Brown and The boy who got scolded are drafted in §19, pending your edits.
3. **Controls:** the Handoff said touch only. This build supports touch and keyboard (needed for the web version).
4. **Two Missy programs.** `Missy.cpp` is the short auto-run one that prints "Misswell" (no input, matches §8.12). `missy-alt.cpp` (199 lines) is an older interactive version that asks for a name and confirmation. The game should use `Missy.cpp`; the alt is kept only for reference.
5. **Privacy:** the media and letter are personal. Host privately, no public repo or public Pages site.

---

## 19. CHAPTER 1 CHARACTER LINES (draft, 2026-11-25)

"Explorer" is whoever the player picked; the line below is what that character says. Missy, Gospel, Sgt. Brown and Kobby come from the Handoff (§6.2); the other four are new drafts to edit. Kofi is no longer playable, so his column becomes NPC lines (see the end).

**Scene 2: the grey world (reaction to Gospel)**
- Missy: The colour has gone from the edges first. Did it fade slowly, or all at once?
- Gospel: Whoa, everything is grey! Is this a game? Can I help look?
- Sgt. Brown: Report, please. When did the colour begin to fade?
- Kobby: That's not normal. How long has it been like this?
- Angel: Ooh, everything's gone grey! Like a secret level! I bet there are treasures hiding in it.
- Prince: Grey? Hm. Fine. I've handled worse. Probably. So, what's the plan?
- Mrs. Brown: Oh, my dears, the colour has slipped away. Don't worry, nothing is lost for good. Tell me what you remember.
- The boy who got scolded: I didn't do it, okay? ...Sorry, habit. It went grey on its own, right?

**Scene 3: Mrs. Adjoa's glasses**
- Missy: Somewhere pretty, with flowers? I'll check the flower bed.
- Gospel: Maybe your glasses are hiding in the flowers! I'll look low, where grown-ups never look.
- Sgt. Brown: Understood, ma'am. Objective: find your glasses. I'll sweep the flower bed.
- Kobby: Sure, I'll take a look. Flower bed, you said?
- Angel: Glasses in the flowers? Ooh, I'll find those and any shiny things on the way!
- Prince: Glasses, in a flower bed. Easy. Two minutes. Maybe one.
- Mrs. Brown: Somewhere with flowers, dear? Let me look slowly. Things hide best from people in a hurry.
- The boy who got scolded: Fine, I'll look. It's not like I'll get yelled at for looking. Right?

**Scene 4: a piece is found**
- Missy: Look, there's a faint path in the hedge. Someone has walked here before.
- Gospel: I found it! I found it! Do I get a prize?
- Sgt. Brown: Objective secured. One piece down, three to go.
- Kobby: Okay. One down.
- Angel: Got one! And a pretty pebble too. That counts as two.
- Prince: Told you. One piece, zero problems. Okay, maybe a few problems.
- Mrs. Brown: There we are. One piece home, three to go. No rush.
- The boy who got scolded: Okay, that worked. Don't look at me like that, I'm allowed to get one right.

**Scene 5: the lantern and six stars**
- Missy: The lantern has six tiny stars drawn around it. I think that's the real clue.
- Gospel: Six stars? That's so many! Can we get a snack first?
- Sgt. Brown: Six stars. Then that is our mission: recover all six.
- Kobby: A lantern with six stars. I guess that's the plan.
- Angel: A lantern with six stars! I want every single one, even the tiny ones.
- Prince: Six stars. A bit dramatic, but I respect it. Let's go.
- Mrs. Brown: A lantern with six little stars. Someone is asking us to remember something kind.
- The boy who got scolded: Six stars... that's a lot. Fine. Better than getting told off for not helping.

**Scene 6: the hooded figure at the gate**
- Missy: Wait, please. I'm not going to hurt you. Who are you?
- Gospel: Ooh, who's that? He looks cool. Hey, wait for me!
- Sgt. Brown: Halt. Identify yourself. Who sent you?
- Kobby: Who was that? Strange. Let's keep going.
- Angel: Wait! Who are you? Did you drop anything? Aw, nothing shiny.
- Prince: Hey! You there! Stop. I will catch you. ...Okay, he's fast.
- Mrs. Brown: Gently, dear one. We mean you no harm. Who sends you?
- The boy who got scolded: Who was that? Not my problem. ...Okay, it is a little my problem.

**Kofi (NPC, hooded messenger):** Scene 6: "The Keeper says to be careful of the butterflies." He never stays to explain. His original player-column lines from the Handoff are retired.
