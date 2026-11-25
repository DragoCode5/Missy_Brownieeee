# LOVE IN PIXELS

## Complete Game Design & Development Documentation

**Document version:** 1.1\
**Project status:** Early prototype\
**Genre:** Romantic 2D pixel-art puzzle adventure\
**Platform:** Web browser (desktop and mobile)\
**Visual direction:** Soft pastel pixel art\
**Gameplay structure:** Hybrid exploration and room-based puzzles\
**Working title:** Love in Pixels

------------------------------------------------------------------------

# 1. Project Overview

## 1.1 The concept

**Love in Pixels** is a small, personal, browser-based romantic puzzle
adventure. The player controls a customizable female protagonist as she
explores a charming pastel pixel-art world, interacts with characters
and objects, solves puzzles, collects items, unlocks locations and
discovers personal rewards.

The game should feel like a lovingly crafted indie game rather than a
sequence of web pages. Its main appeal comes from the combination of:

-   Exploration in a connected 2D world.
-   Puzzle rooms and environmental challenges.
-   A warm, balanced romantic storyline.
-   Humour, mystery and unexpected discoveries.
-   Collectible objects and achievements.
-   Personal letters, photographs, music and video rewards.

The project is intended as a private personal gift. It does not need
accounts, multiplayer, monetization or a complicated online backend for
its initial release.

## 1.2 Design pillars

1.  **A world worth exploring:** locations should feel coherent,
    inviting and full of discoverable details.
2.  **Puzzles with satisfying solutions:** challenge should increase
    gradually without making the player feel punished.
3.  **Personal rewards:** the creator can add their own letters,
    photographs, music and videos.
4.  **A protagonist who feels like the player:** character appearance
    should be customizable and may be based on a reference photograph
    supplied by the creator.
5.  **Lightweight delivery:** the game should load quickly and work in
    modern desktop and mobile browsers.

## 1.3 Current design decisions

  Area                  Decision
  --------------------- ---------------------------------------------------
  Working title         Love in Pixels
  Graphics              Pastel 2D pixel art
  Gameplay              Hybrid exploration and puzzle rooms
  Romantic tone         Balanced: romance, humour, adventure and mystery
  Main character        Customizable female protagonist
  Rewards               Letters, photographs, music, surprises and videos
  Platform              Web browser
  Initial persistence   Browser LocalStorage
  Initial release       One polished playable area, then expansion

------------------------------------------------------------------------

# 2. Story and World

## 2.1 The setting: The Little Somewhere

The adventure takes place in a charming fictional world called **The
Little Somewhere**. It contains colorful houses, quiet gardens, a cozy
café, a star-lit bridge and a mysterious castle.

The world's memories have been scattered. Important places are locked,
clues have been hidden and objects have been left behind. The
protagonist gradually restores the world by exploring, solving puzzles
and collecting fragments of its story.

As she progresses, she receives messages from a mysterious companion. He
seems to know her, occasionally teases her and leaves clues. The player
gradually discovers that the adventure has been prepared especially for
her.

The romantic reveal should feel earned. It should not be explained too
early.

## 2.2 Main protagonist

The player controls a female character. Her appearance should be
customizable.

Planned customization options:

-   Skin tone.
-   Hairstyle.
-   Hair color.
-   Outfit.
-   Accessories.
-   Display name.

The first implementation can use a small number of carefully designed
options. More outfits and accessories can become unlockable rewards
later.

### Character animations

-   Idle.
-   Walk north, south, east and west.
-   Interact.
-   Celebrate.
-   Surprise or reaction.

The character should remain visually consistent across all locations and
menus.

## 2.3 The mysterious companion

A second character appears through notes, dialogue, clues and occasional
encounters.

His role is to add warmth, humour and mystery without taking control
away from the protagonist.

His dialogue can include:

-   Gentle teasing.
-   Encouragement.
-   Romantic messages.
-   Small jokes.
-   Hints and riddles.
-   Occasional emotional moments.

The creator should be able to edit the dialogue and story content
without changing the game engine.

## 2.4 Narrative progression

The story is divided into chapters. Each chapter should:

1.  Introduce a location and objective.
2.  Give the player room to explore.
3.  Introduce a new puzzle mechanic or build on a familiar one.
4.  Reveal a story detail.
5.  Reward progress.
6.  Unlock a new location or chapter.

Some choices can alter dialogue, reactions, later events and reward
details. Major choices should have meaningful consequences.

------------------------------------------------------------------------

# 3. World Map and Level Plan

The planned world contains six principal locations. They do not all need
to be built for the first playable release.

## Location 1 --- The Little Town

**Purpose:** Tutorial, introduction and first exploration.

A peaceful town square with pastel houses, a fountain, a small shop,
trees, flower beds and a locked flower gate.

### Gameplay

-   Learn movement.
-   Learn how to interact.
-   Meet a friendly town character.
-   Find three golden hearts.
-   Find a brass key.
-   Unlock the flower gate.

### Initial puzzle: The Missing Pieces

The player finds a damaged picture. Four missing pieces are hidden
around the town. The player must find and arrange them to restore the
image.

### Planned reward

-   First golden hearts.
-   First personal letter.
-   Access to the Garden of Beginnings.

### Current prototype status

A basic version of The Little Town has been implemented. It contains a
town map, movement, three collectible hearts, a brass key, an NPC, a
locked flower gate, basic customization and local saving.

The current prototype does **not** yet contain the final Missing Pieces
sliding puzzle. That puzzle is planned for the next gameplay iteration.

## Location 2 --- The Garden of Beginnings

**Theme:** First meetings and discovery.

A flower-filled garden with butterflies, fountains, benches, hidden
paths and small secrets.

### Planned puzzles

**Flower Sequence:** Use environmental clues to reproduce the correct
flower-color sequence.

**Hidden Key:** Search the garden and distinguish important clues from
decorative objects.

**Butterfly Trail:** Observe a butterfly sequence and follow it to a
hidden area.

### Planned rewards

-   Golden hearts.
-   A personal photograph.
-   A story letter.
-   A new collectible.

## Location 3 --- The Little Café

**Theme:** Memories, conversations and mystery.

A cozy café with warm lighting, pastel furniture, rainy windows and
outdoor seating.

### Planned puzzles

**The Forgotten Order:** Reconstruct an order from scattered notes.

**The Secret Table:** Discover a numerical or symbolic combination from
clues in the café.

**The Conversation Puzzle:** Arrange dialogue fragments into the correct
order.

### Planned rewards

-   Music reward.
-   Collectible item.
-   Unlockable memory room.

## Location 4 --- The Bridge of Stars

**Theme:** Trust, patience and connection.

A nighttime setting with a river, wooden bridge, glowing stars and
reflections.

### Planned puzzles

**The Constellation:** Connect stars in the correct order.

**The River Crossing:** Move objects across a river with limited moves.

**The Light Sequence:** Activate lanterns in the correct sequence.

### Planned rewards

-   Personal video message.
-   Rare collectible.
-   Access to the Memory Castle.

## Location 5 --- The Memory Castle

**Theme:** Reflection and discovery.

A castle containing photographs, letters, books, collected objects and
secret rooms.

### Planned puzzles

**The Memory Archive:** Arrange photographs and objects using clues.

**The Locked Library:** Solve interconnected riddles.

**The Final Door:** Use information discovered in earlier locations to
determine the final combination.

### Planned rewards

-   Final story revelation.
-   Access to the final location.

## Location 6 --- The Place of a Thousand Stars

**Theme:** Love, gratitude and the ultimate surprise.

A secret location with glowing flowers, floating lights, a starry sky
and a small house overlooking the landscape.

The final challenge should combine mechanics learned throughout the
adventure. Completing it reveals why the world was created and unlocks
the creator's ultimate personal surprise.

------------------------------------------------------------------------

# 4. Gameplay Systems

## 4.1 Hybrid gameplay loop

The main loop is:

1.  Explore a location.
2.  Find objects and clues.
3.  Interact with characters and environmental objects.
4.  Enter a puzzle or challenge.
5.  Solve it to earn progress, collectibles or a reward.
6.  Update the journal and inventory.
7.  Unlock a new area or story event.

Exploration should be continuous within a location. Puzzle challenges
may open in dedicated interfaces or rooms.

## 4.2 Movement and interaction

### Desktop controls

  Action              Control
  ------------------- --------------------
  Move                WASD or arrow keys
  Interact            E or Space
  Menus and puzzles   Mouse
  Pause               Escape (planned)

### Mobile controls

-   On-screen directional pad.
-   Contextual interaction button.
-   Touch controls for puzzles.
-   Responsive menus and reward screens.

The game should not require a physical keyboard.

## 4.3 Interaction design

Objects should provide clear feedback when the player is close enough to
interact.

Examples:

-   A key can be collected.
-   A chest can be opened.
-   An NPC can be spoken to.
-   A gate can explain why it is locked.
-   A clue can be added to the journal.
-   A photograph can be inspected.

The player should not need to guess which objects are interactive. Use a
subtle highlight, icon or interaction prompt.

## 4.4 Inventory

The inventory stores collected objects.

Each object should have:

-   Unique ID.
-   Display name.
-   Icon or sprite.
-   Description.
-   Collection status.
-   Optional use conditions.

Some items should be usable in other locations. For example, a key
discovered in one area may open a chest later.

## 4.5 Journal

The journal records:

-   Current objective.
-   Story events.
-   Important clues.
-   Completed puzzles.
-   Discovered locations.
-   Character interactions.

It should help players remember clues without revealing every solution.

------------------------------------------------------------------------

# 5. Puzzle Design

The game should use varied puzzle types rather than repeating one
mechanic.

## 5.1 Puzzle categories

### Sliding tile puzzles

Move tiles into the correct order to recreate a picture. Later puzzles
may use larger grids or more complex images.

### Hidden-object puzzles

Search an illustrated environment for specific items. Objects may be
partially obscured but should remain reasonably discoverable.

### Combination locks

Use numbers, symbols, colors or clues found elsewhere to unlock
containers and doors.

### Pattern recognition

Repeat visual or musical sequences, identify missing elements and
recognize recurring patterns.

### Matching puzzles

Match pairs or related symbols. Memory-based matching can be used as an
optional challenge.

### Maze puzzles

Navigate a garden, building or passage. Later mazes may include
switches, moving obstacles or one-way paths.

### Constellation puzzles

Connect stars according to visual clues. Correct connections reveal a
symbol, message or route.

### Inventory puzzles

Combine or use collected objects in the correct place. The game should
explain why an object is relevant after it is selected.

## 5.2 Difficulty progression

  Stage         Difficulty    Design goal
  ------------- ------------- ---------------------------------
  Tutorial      Very easy     Teach controls and interactions
  Early game    Easy          Observation and simple logic
  Middle game   Medium        Multi-step reasoning
  Late game     Hard          Combine clues across locations
  Finale        Challenging   Use several learned mechanics

Difficulty should increase through complexity, not arbitrary obscurity.

## 5.3 Hint system

Provide three levels of assistance:

1.  **Gentle hint:** Direct attention toward a relevant clue.
2.  **Stronger hint:** Identify the relevant object or area.
3.  **Solution help:** Explain enough to complete the puzzle.

Hints should not permanently remove rewards or punish the player.

## 5.4 Puzzle data design

Puzzle definitions should be stored separately from gameplay code. A
puzzle data record should include:

-   ID.
-   Location and chapter.
-   Puzzle type.
-   Instructions.
-   Required items.
-   Clues.
-   Solution data.
-   Hint text.
-   Completion event.
-   Reward ID.

This makes it easier to add puzzles without rewriting the engine.

------------------------------------------------------------------------

# 6. Rewards and Collectibles

Rewards are a central feature, not an afterthought.

## 6.1 Golden hearts

Golden hearts are the main collectible currency. They can be earned
through puzzles, exploration, optional challenges and hidden
discoveries.

They may unlock:

-   Bonus rooms.
-   Outfits.
-   Optional dialogue.
-   Hidden collectibles.
-   Extra challenges.

Do not make the main story impossible to complete because a player
missed an optional collectible.

## 6.2 Personal letters

The creator writes and supplies the letters.

A letter reward should include:

-   Title.
-   Optional sender.
-   Letter text.
-   Unlock condition.
-   Optional decorative envelope art.

The player can open unlocked letters and revisit them in a dedicated
collection.

## 6.3 Photographs

The creator supplies personal photographs.

Each photograph can have:

-   Title.
-   Image file.
-   Caption.
-   Unlock condition.
-   Optional date or memory description.

Photographs appear in a memory album. Locked photographs may appear as
silhouettes or sealed frames.

## 6.4 Music

Music rewards can unlock a song or audio message.

Features:

-   Play and pause.
-   Volume control.
-   Replay.
-   Optional accompanying message.
-   Clear indication when playback is active.

Use audio files the creator has permission to use. Do not assume a
commercial song can be redistributed with the game.

## 6.5 Videos

Video rewards contain personal video messages supplied by the creator.

Features:

-   Play and pause.
-   Full-screen playback where supported.
-   Replay.
-   Optional caption or message.
-   A clear close/back control.

## 6.6 Mystery rewards

Examples:

-   Secret rooms.
-   Funny messages.
-   Special outfits.
-   Hidden conversations.
-   Unexpected photographs.
-   Bonus puzzles.
-   The final surprise.

## 6.7 Reward manager

All rewards should be data-driven. A reward record should contain:

-   Unique ID.
-   Type: letter, photo, music, video, surprise or collectible.
-   Title.
-   Description.
-   Asset path.
-   Unlock condition.
-   Unlocked status.

The reward manager should prevent duplicate unlocks and save reward
progress.

------------------------------------------------------------------------

# 7. Visual Art Direction

## 7.1 Style

The game uses soft pastel 2D pixel art with clean pixel edges,
consistent proportions, expressive characters and cozy environments.

The target mood is charming, warm, dreamy and playful.

Avoid mixing unrelated art styles or using blurry non-pixel images
inside the game world.

## 7.2 Color palette

  Color         Use
  ------------- ---------------------------------------
  Lavender      Magical spaces and UI accents
  Soft pink     Romantic details and highlights
  Cream         Panels, menus and warm interiors
  Mint green    Gardens and nature
  Baby blue     Sky, water and calm details
  Peach         Warm light and decorative accents
  Deep purple   Outlines, text and nighttime contrast

Use darker complementary shades for readable outlines and text. Pastel
colors alone may not provide enough contrast.

## 7.3 Pixel dimensions and rendering

Initial recommendations:

-   Tile size: 16 × 16 pixels.
-   Character sprite: approximately 32 × 48 pixels.
-   Logical game canvas: 640 × 400 for the current prototype, or a
    consistent 16:9 logical resolution if the game layout is redesigned.
-   Disable image smoothing for pixel-art rendering.
-   Scale by integer multiples where possible.

The final logical resolution should be selected after testing on both
desktop and mobile.

## 7.4 Required asset families

### Character assets

-   Main protagonist sprite sheet.
-   Alternate hairstyles.
-   Outfit variations.
-   Accessories.
-   Supporting character sprites.
-   NPC sprites.
-   Character portraits.

### Environment assets

-   Grass and path tiles.
-   Water tiles.
-   Flowers and bushes.
-   Trees.
-   Houses.
-   Café interior.
-   Garden objects.
-   Bridge and river.
-   Castle interiors.
-   Doors, gates and chests.

### UI assets

-   Buttons.
-   Dialog panels.
-   Inventory slots.
-   Heart icons.
-   Letter envelopes.
-   Reward frames.
-   Map markers.
-   Journal and settings icons.

### Animation assets

-   Walking.
-   Idle.
-   Water movement.
-   Butterflies.
-   Falling petals.
-   Flickering lights.
-   Chest opening.
-   Door unlocking.
-   Reward reveal.

## 7.5 Asset consistency rules

1.  Keep a consistent pixel scale.
2.  Use a consistent outline style.
3.  Keep character proportions consistent.
4.  Use a limited palette per location.
5.  Avoid anti-aliased edges in pixel sprites.
6.  Keep sprite animations aligned to a consistent grid.
7.  Maintain a source folder for editable artwork.

## 7.6 Visual references

The initial concept direction includes: - A sunset title screen with the
game logo. - A cute character customization screen. - A pastel town
square with a fountain. - A garden with flowers and hidden objects. - A
sliding-puzzle interface. - A glowing envelope reward reveal. - A
collectible inventory. - A moonlit waterside scene.

These are art-direction references, not final game assets.

------------------------------------------------------------------------

# 8. User Interface and Screens

## 8.1 Main menu

Elements:

-   Game logo.
-   Animated background.
-   Start New Game.
-   Continue.
-   Settings.
-   Credits.

The menu should be welcoming and uncluttered.

## 8.2 Character customization

Provide a character preview and a small set of appearance choices. The
player should be able to confirm the design before entering the world.

## 8.3 World map

Show:

-   Unlocked locations.
-   Locked locations.
-   Completed locations.
-   Optional hidden locations.

Each location should have a distinct miniature illustration and a short
description.

## 8.4 Gameplay HUD

Keep the interface minimal. Show:

-   Golden heart count.
-   Current objective.
-   Inventory access.
-   Journal access.
-   Map access.
-   Pause/settings.

## 8.5 Reward screen

Use a short reveal animation. The reward should be clearly identified
and then added to the relevant collection.

## 8.6 Settings

Include:

-   Music volume.
-   Sound effects volume.
-   Text speed.
-   Full-screen mode.
-   Control preferences.
-   Reduced animation option.

------------------------------------------------------------------------

# 9. Sound Design

Suggested background audio:

-   Peaceful town theme.
-   Gentle garden ambience.
-   Rain and café ambience.
-   Magical nighttime bridge theme.
-   Atmospheric castle theme.
-   Emotional finale theme.

Suggested sound effects:

-   Footsteps.
-   Item pickup.
-   Button press.
-   Door opening.
-   Puzzle solved.
-   Achievement unlocked.
-   Reward reveal.

Audio should be optional and volume-controlled. Browsers often restrict
autoplay, so music should begin only after the player interacts with the
game.

Use original, licensed or otherwise authorized audio assets.

------------------------------------------------------------------------

# 10. Technical Architecture

## 10.1 Recommended stack

  Technology                 Responsibility
  -------------------------- ----------------------------------------------------
  HTML5                      Page and application structure
  CSS3                       Menus, responsive layout and interface styling
  JavaScript or TypeScript   Game logic and systems
  Phaser 3                   2D rendering, scenes, input, physics and animation
  Tiled                      Tile-based map authoring
  Aseprite or LibreSprite    Pixel-art sprites and animation
  JSON                       Story, puzzle, level and reward data
  LocalStorage               Initial local save system

The current prototype is plain HTML, CSS and JavaScript using a canvas.
Phaser 3 is the recommended direction for the fuller game, but the
project should migrate deliberately rather than rewrite everything
before the prototype has been evaluated.

## 10.2 Application modules

1.  Boot and initialization.
2.  Main menu.
3.  Character customization.
4.  World map.
5.  Exploration.
6.  Interaction system.
7.  Puzzle engine.
8.  Inventory manager.
9.  Reward manager.
10. Story and dialogue manager.
11. Audio manager.
12. Save/load manager.
13. Settings.

Each system should have a clear responsibility and communicate through
defined events or interfaces.

## 10.3 Suggested project structure

``` text
love-in-pixels/
├── index.html
├── package.json
├── README.md
├── src/
│   ├── main.js
│   ├── config.js
│   ├── scenes/
│   │   ├── BootScene.js
│   │   ├── MenuScene.js
│   │   ├── CustomizationScene.js
│   │   ├── WorldMapScene.js
│   │   ├── ExplorationScene.js
│   │   └── RewardScene.js
│   ├── systems/
│   │   ├── PuzzleManager.js
│   │   ├── InventoryManager.js
│   │   ├── RewardManager.js
│   │   ├── StoryManager.js
│   │   ├── SaveManager.js
│   │   └── AudioManager.js
│   ├── data/
│   │   ├── characters.json
│   │   ├── chapters.json
│   │   ├── puzzles.json
│   │   └── rewards.json
│   └── ui/
│       ├── HUD.js
│       ├── InventoryUI.js
│       ├── JournalUI.js
│       └── SettingsUI.js
└── assets/
    ├── sprites/
    ├── tilesets/
    ├── maps/
    ├── backgrounds/
    ├── portraits/
    ├── music/
    ├── sounds/
    ├── photos/
    ├── videos/
    └── fonts/
```

## 10.4 Save system

Use LocalStorage for the first private version.

Save:

-   Save schema version.
-   Character customization.
-   Current location.
-   Player position or checkpoint.
-   Completed puzzles.
-   Story decisions.
-   Golden hearts.
-   Collected objects.
-   Unlocked rewards.
-   Achievements.
-   Settings.

Implement basic validation and recovery if saved data is missing or
malformed.

LocalStorage is browser-specific. Clearing browser data can erase
progress, and progress does not automatically synchronize between
devices. A downloadable save/export feature or cloud save can be
considered later if needed.

## 10.5 Privacy and personal media

The game is intended for private use, but a hosted website is not
automatically private.

If personal photographs and videos are included: - Do not place
sensitive assets in an unrestricted public repository. - Use a private
hosting arrangement or access controls if the content should not be
publicly accessible. - Avoid embedding private information in filenames
or source code. - Keep backups of original media. - Confirm permission
to use any third-party music or images.

------------------------------------------------------------------------

# 11. Current Prototype: Version 0.1

## 11.1 What has been implemented

The first prototype is a single-page HTML game with canvas-based
pixel-style drawing.

It currently includes:

-   The Little Town scene.
-   Top-down player movement.
-   WASD and arrow-key controls.
-   On-screen mobile directional buttons.
-   Interaction using E, Space or the interaction button.
-   Three collectible golden hearts.
-   A brass key.
-   A friendly town NPC.
-   A locked flower gate.
-   A simple character name and outfit-color customization dialog.
-   A basic inventory display.
-   A town journal/objective panel.
-   LocalStorage save functionality.
-   A reset option.

## 11.2 How to play the prototype

1.  Open `index.html` in a modern browser.
2.  Move around the town using WASD or arrow keys.
3.  On mobile, use the directional buttons.
4.  Walk close to an object or character.
5.  Press E or Space, or tap INTERACT.
6.  Collect three hearts and the brass key.
7.  Visit the flower gate to unlock it.
8.  Customize the explorer's name and outfit color if desired.

## 11.3 Known limitations

Version 0.1 is a mechanics prototype, not the finished game.

It currently has: - Simple canvas-drawn graphics rather than finished
sprite sheets. - A small test map rather than a complete tilemap. -
Basic movement and proximity interaction. - Placeholder NPC dialogue. -
A basic collectible system. - A simple local save format.

It does not yet have: - Final protagonist artwork. - Sprite-sheet
animation. - A full character customization system. - The Missing Pieces
puzzle. - The Garden of Beginnings. - A complete story and dialogue
system. - The final reward collection screens. - Music or video reward
playback. - A complete mobile-responsive puzzle interface. - A
production-ready save/export system.

These are planned development tasks, not missing features that should be
assumed to work already.

------------------------------------------------------------------------

# 12. Development Roadmap

## Phase 1 --- Visual and technical foundation

-   Finalize protagonist design.
-   Create character sprite sheet.
-   Establish tile size and color palette.
-   Build the first town tileset.
-   Decide on the final game resolution.
-   Set up the chosen game engine architecture.

**Deliverable:** A consistent visual foundation and controllable
character.

## Phase 2 --- First playable town

-   Build a proper town tilemap.
-   Add collision boundaries.
-   Add interactive objects.
-   Add NPC dialogue.
-   Add inventory interactions.
-   Add the first tutorial puzzle.
-   Improve saving and loading.

**Deliverable:** A polished first location with a complete gameplay
loop.

## Phase 3 --- Puzzle engine

-   Implement hidden-object puzzles.
-   Implement sliding puzzles.
-   Implement combination locks.
-   Implement pattern and matching puzzles.
-   Add hints and completion feedback.

**Deliverable:** Reusable puzzle systems.

## Phase 4 --- Story and progression

-   Implement chapters.
-   Add dialogue and story choices.
-   Add objectives and journal entries.
-   Implement location unlocking.
-   Add achievements.

**Deliverable:** A connected playable story.

## Phase 5 --- Rewards

-   Add personal letters.
-   Add photo album.
-   Add music player.
-   Add video viewer.
-   Add mystery rewards.
-   Add reward reveal animations.

**Deliverable:** A working personal reward system.

## Phase 6 --- Expand the world

-   Garden of Beginnings.
-   Little Café.
-   Bridge of Stars.
-   Memory Castle.
-   Place of a Thousand Stars.

**Deliverable:** Full planned adventure.

## Phase 7 --- Polish and release

-   Add sound and music.
-   Improve mobile controls.
-   Test all puzzles and rewards.
-   Optimize assets and loading.
-   Test save recovery.
-   Deploy the private web game.

**Deliverable:** A stable browser game.

------------------------------------------------------------------------

# 13. First Production Milestone: Character and Little Town

The immediate next milestone should be deliberately small.

## 13.1 Character design

Create one protagonist with: - A clear front, back and side
appearance. - Four-direction walking animation. - Idle animation. - A
small set of outfit and accessory options. - Consistent proportions and
palette.

A photograph may be supplied as a visual reference. The pixel-art
character should be a stylized interpretation, not a photorealistic
rendering.

## 13.2 Town environment

Create a coherent top-down town map containing: - Main square. -
Fountain. - Shop or café exterior. - Houses. - Flower beds. - Trees. -
Benches. - Decorative paths. - Locked flower gate.

The player should be able to walk around the environment without passing
through buildings, trees or solid objects.

## 13.3 First complete gameplay loop

The first production-quality loop should be:

1.  Start the game.
2.  Customize the protagonist.
3.  Enter The Little Town.
4.  Meet the town character.
5.  Explore and collect clues.
6.  Solve the Missing Pieces puzzle.
7.  Receive a first personal reward.
8.  Unlock the Garden of Beginnings.
9.  Save progress and return later.

This loop is the test of whether the game is fun before the full world
is built.

------------------------------------------------------------------------

# 14. Quality Checklist

Before calling the first production milestone complete, verify:

-   [ ] The game loads in a modern desktop browser.
-   [ ] The game fits common mobile screens.
-   [ ] The character moves in all four directions.
-   [ ] The character cannot walk through solid objects.
-   [ ] The interaction prompt appears at the right distance.
-   [ ] Collectibles cannot be collected repeatedly.
-   [ ] Inventory updates correctly.
-   [ ] Puzzle completion is recorded.
-   [ ] Rewards unlock only when their conditions are met.
-   [ ] Progress survives a browser refresh.
-   [ ] Invalid or missing save data does not crash the game.
-   [ ] Audio can be muted.
-   [ ] Text is readable.
-   [ ] The game can be completed without a keyboard on mobile.

------------------------------------------------------------------------

# 15. Creative North Star

**Love in Pixels** should feel like a small world made with care.

It should reward curiosity, make the player smile, provide satisfying
challenges and reveal personal surprises at the right moments.

The romance should feel natural. The humour should feel warm. The
puzzles should be fair. The graphics should be consistent. The rewards
should be personal.

The goal is not simply to finish a game.

It is to give someone a little world that was made especially for them.

------------------------------------------------------------------------

# Appendix A --- Creator Content Checklist

Content the creator will eventually need to supply:

-   [ ] Character reference photograph (optional).
-   [ ] Preferred character name.
-   [ ] Preferred hairstyles, outfits and accessories.
-   [ ] Supporting character design or reference.
-   [ ] Personal letters.
-   [ ] Personal photographs.
-   [ ] Music files or authorized music links.
-   [ ] Personal video messages.
-   [ ] Captions and descriptions for rewards.
-   [ ] Final surprise content.
-   [ ] Any personal dates, places or inside jokes to incorporate into
    the story.

# Appendix B --- Project Decisions Still to Confirm

These decisions can be made during development:

1.  Final protagonist appearance and name.
2.  Whether the mysterious companion is visibly playable or appears only
    in story events.
3.  Final game resolution and tile size.
4.  Whether to use Phaser 3 with JavaScript or TypeScript.
5.  Final hosting method and privacy requirements.
6.  Whether save progress should remain on one browser or be exportable
    between devices.
7.  Exact story choices and their consequences.
8.  Exact reward content and unlock conditions.

**Document status:** This document records the agreed concept, current
prototype scope and proposed production plan. It is a living
specification and should be updated as the game evolves.
