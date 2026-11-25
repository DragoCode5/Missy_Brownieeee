// ---- Systems: state, save, movement, puzzle engine, inventory, journal, rewards, audio ----
import { CHARS, MODES, MAPS, CHAPTERS, PUZZLES, REWARDS, MISSCPP } from "./data.js";

// Re-exports used by main.js (spec §5.3)
export { CHARS, MODES, MAPS, CHAPTERS, PUZZLES, REWARDS, LETTER, MIRROR_GREETING, MIRROR_LINE, MIRROR_PRIVACY } from "./data.js";

// ---- Game state ----
export const g = {
  hearts: 0, pieces: 0, key: false, done: false, activePuzzle: null,
  chapter: 1, chaptersDone: {}, puzzles: {}, charIdx: 0, modeIdx: 0
};

// Chapter rewards per spec §8.9 table
export const CHAPTER_REWARDS = {
  1: ["golden_3", "letter_01", "brass_key", "video_mmmm"],
  2: ["golden_2", "photo_you", "letter_02"],
  3: ["golden_2", "music_be_happy"],
  4: ["golden_2", "photo_graded", "video_companion"],
  5: ["golden_c", "program_missy", "photo_note", "photo_kaka"],
  6: ["golden_3", "mirror"]
};

// ---- Save system (LocalStorage, spec §5.5) ----
const SAVE_KEY = "lip_save_v3";
const SAVE_VERSION = 3;

let _gState = {
  char: "missy", mode: "adventure", chapter: 1, chaptersDone: {},
  hearts: 0, key: false, done: false, puzzles: {}, rewards: [], journal: [],
  settings: { dark: false, sound: true, music: true, subtitles: false, controls: "touch" }
};

export function getGameState() { return { ..._gState }; }

export function loadGameState() {
  try {
    const s = localStorage.getItem(SAVE_KEY);
    if (s) {
      const d = JSON.parse(s);
      if (d.v !== SAVE_VERSION) localStorage.removeItem(SAVE_KEY);
      else {
        _gState = {
          char: d.char || "missy", mode: d.mode || "adventure", chapter: d.chapter || 1,
          chaptersDone: d.chaptersDone || {}, hearts: d.hearts || 0, key: d.key || false,
          done: d.done || false, puzzles: d.puzzles || {}, rewards: d.rewards || [],
          journal: d.journal || [], settings: { ..._gState.settings, ...(d.settings || {}) }
        };
        return d;
      }
    }
  } catch (e) { /* storage unavailable */ }
  return null;
}

export function saveGame() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify({
      v: SAVE_VERSION, char: _gState.char, mode: _gState.mode, chapter: _gState.chapter,
      hearts: _gState.hearts, key: _gState.key, done: _gState.done, puzzles: _gState.puzzles,
      rewards: _gState.rewards, journal: _gState.journal, settings: { ..._gState.settings }
    }));
  } catch (e) { /* ignore */ }
}

export function setChar(i) { g.charIdx = _gState.char = i; saveGame(); }
export function setMode(i) { g.modeIdx = _gState.mode = i; saveGame(); }
export function jumpToChapter(n) { _gState.chapter = n; saveGame(); }

// ---- Audio system (WebAudio; optional assets, §12.2) ----
const Audio = (() => {
  let ctx = null, started = false;
  const sources = new Map();
  function init() {
    if (ctx) return true;
    try { ctx = new (window.AudioContext || window.webkitAudioContext)(); return true; }
    catch (e) { return false; }
  }
  function playUrl(url, volume = 0.4) {
    if (!init() || !_gState.settings.sound && volume > 0.3) return;
    if (!_gState.settings.music && volume <= 0.3) return;
    try {
      const req = new XMLHttpRequest();
      req.open("GET", url, true);
      req.responseType = "arraybuffer";
      req.onload = () => {
        try {
          const src = ctx.createBufferSource();
          ctx.decodeAudioData(req.response, buf => { src.buffer = buf; src.connect(ctx.destination); src.start(0); }, () => {});
          src.onended = () => sources.delete(url);
          sources.set(url, src);
        } catch (e) { /* optional audio */ }
      };
      req.send();
    } catch (e) { /* offline */ }
  }
  // Tiny soft synth chimes (generated, no assets needed) — §12.4 feedback
  function beep(freq, ms, vol) {
    if (!init()) return;
    try {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = "sine"; o.frequency.value = freq;
      g.gain.setValueAtTime(vol, ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + ms / 1000);
      o.connect(g); g.connect(ctx.destination);
      o.start(ctx.currentTime); o.stop(ctx.currentTime + ms / 1000);
    } catch (e) { /* ignore */ }
  }
  function reveal() { beep(440, 120, 0.25); beep(660, 80, 0.2); }
  function button() { beep(880, 60, 0.18); }
  function success() { beep(554, 100, 0.3); beep(659, 100, 0.3); beep(784, 150, 0.35); }
  return { playUrl, beep, reveal, button, success, init };
})();

// ---- Inventory system (§6.3) ----
export const Inventory = (() => {
  const items = new Map();
  const collected = new Set();
  function add(id, name) { if (!items.has(id)) items.set(id, { id, name, collected: false }); }
  function collect(id) {
    add(id);
    items.get(id).collected = true;
    collected.add(id);
    _gState.rewards = Array.from(collected);
    saveGame();
  }
  function has(id) { return items.has(id) && items.get(id).collected; }
  function getCollected() { return Array.from(collected); }
  function list() { return Array.from(items.values()).filter(i => i.collected); }
  return { add, collect, has, getCollected, list };
})();

// ---- Journal system (§6.4) ----
export const Journal = (() => {
  const entries = [];
  function add(entry) {
    entries.unshift(entry);
    if (entries.length > 99) entries.pop();
    window._journal = entries;
  }
  function get() { return entries; }
  function log(id, title, desc, type) { add({ id, title, desc, type: type || "note", at: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }); }
  return { add, get, log };
})();

// ---- Reward system (§8.3, §8.12) ----
export const Reward = (() => {
  function give(id) {
    if (Inventory.has(id)) return false;
    const r = REWARDS.find(x => x.id === id);
    Inventory.collect(id);
    Journal.log(id, r ? r.title : id, r ? r.desc : "");
    Audio.success();
    return r || { id };
  }
  return { give };
})();

// ---- Puzzle engine (§7) — data-driven play states for all 8 types ----
export const Puzzle = (() => {
  function start(p) {
    const s = {
      id: p.id, type: p.type, difficulty: p.difficulty,
      status: "start", index: 0, seq: [],
      cells: [], cursor: 0, matched: {},
      stars: [], starIndex: 0,
      completedAt: null, hintLeft: 3, lastWrong: ""
    };
    switch (p.type) {
      case "pattern": s.cells = ["a", "b", "c", "d"]; s.target = p.steps[0].order; break;
      case "search": s.cells = Array.from({ length: p.steps[0].cells }, (_, i) => i); s.target = p.steps[0].target; break;
      case "combo": s.cells = ["c0", "c1", "c2"]; s.target = p.steps[0].code; s.cursor = 0; break;
      case "trace": s.cells = p.steps[0].path; s.target = p.steps[0].path; break;
      case "light": s.cells = p.steps[0].lights; s.target = p.steps[0].order; break;
      case "constellation": s.cells = p.steps[0].stars; s.target = p.steps[0].order; break;
      case "maze": s.cells = ["centre"]; break;
      case "match": s.cells = ["c1", "c2", "c3", "c4", "c5", "c6"]; s.matched = {}; break;
      case "conversation": s.cells = p.steps[0].dialogue || []; break;
      case "finale": s.cells = p.steps[0].sources || []; s.target = p.steps[0].sources || []; break;
    }
    return s;
  }
  function progress(s) {
    if (!s) return 0;
    if (s.type === "maze") return s.status === "solved" ? 100 : 0;
    if (s.type === "conversation") return s.status === "solved" ? 100 : (s.index || 0) * 100;
    const t = s.target || [];
    if (!t.length) return s.status === "solved" ? 100 : 0;
    const n = s.status === "solved" ? t.length : Math.min(s.index || 0, t.length);
    return Math.round((n / t.length) * 100);
  }
  function tap(s, val) { // val = index into cells or label
    const idx = typeof val === "number" ? val : s.cells.indexOf(val);
    if (idx < 0) return { result: "invalid" };
    if (s.status === "solved") return { result: "already_solved" };
    switch (s.type) {
      case "pattern":
        if (s.target[s.index] === s.cells[idx]) {
          s.index++;
          if (s.index >= s.target.length) { s.status = "solved"; s.completedAt = Date.now(); return { result: "solved" }; }
          return { result: "correct" };
        }
        s.lastWrong = s.cells[idx];
        s.index = 0;
        return { result: "wrong" };
      case "search":
        if (s.target === idx) { s.status = "solved"; s.completedAt = Date.now(); return { result: "solved" }; }
        if (s.cells.includes(idx)) { s.index++; return { result: "correct" }; }
        return { result: "wrong" };
      case "combo": {
        const code = s.target;
        if (idx !== s.cursor) return { result: "wrong" };
        s.cursor++;
        if (s.cursor >= code.length) { s.status = "solved"; s.completedAt = Date.now(); return { result: "solved" }; }
        return { result: "correct" };
      }
      case "trace":
      case "light":
      case "constellation":
      case "finale":
        if (s.target[s.index] === s.cells[idx]) {
          s.index++;
          if (s.index >= s.target.length) { s.status = "solved"; s.completedAt = Date.now(); return { result: "solved" }; }
          return { result: "correct" };
        }
        return { result: "wrong" };
      case "match": {
        const c = s.cells[idx];
        if (s.matched[c]) return { result: "already" };
        if (!s.picked) { s.picked = c; return { result: "picked" }; }
        const pair = s.pairs || findPairs(c, s.picked);
        s.matched[s.picked] = true; s.matched[c] = true;
        const done = Object.keys(s.matched).length === s.cells.length;
        const res = done ? "solved" : "correct";
        if (done) s.status = "solved";
        s.picked = null;
        return { result: res };
      }
      case "conversation": {
        const d = s.cells[idx];
        if (s.index < s.cells.length) { s.index++; if (s.index >= s.cells.length) { s.status = "solved"; s.completedAt = Date.now(); } }
        return { result: "next", q: d, next: s.cells[s.index] };
      }
      default: return { result: "n/a" };
    }
  }
  function findPairs(a, b) { return [a, b]; }
  function hint(s) {
    if (s.hintLeft <= 0) return "Try again — look at the whole scene.";
    s.hintLeft--;
    if (s.type === "pattern") {
      const t = s.target || [];
      return "Next up: " + (s.index < t.length ? t[s.index] : t[t.length - 1]) + ".";
    }
    if (s.type === "search") return "Check the dark corners of the scene.";
    if (s.type === "combo") return "Try " + (s.target ? (s.target[s.cursor] || s.target[0]) : "") + " on the next dial.";
    if (s.type === "maze") return "Walk until you reach the centre marker.";
    if (s.type === "trace" || s.type === "constellation" || s.type === "light" || s.type === "finale") {
      const t = s.target || [];
      return "Next: " + (t[s.index] || "?") + ".";
    }
    if (s.type === "match") return "Find another card with the same picture.";
    if (s.type === "conversation") return "Answer the barista's questions in order.";
    return "Try again.";
  }
  return { start, tap, hint, progress };
})();

// ---- Terminal screen — embeds the Missy.cpp program (spec §8.14 / data.js) ----
export const Terminal = (() => {
  function render(rootEl, done) {
    rootEl.innerHTML = "";
    const doc = document.createElement("div");
    doc.style.cssText = "max-width:560px;margin:0 auto;padding:16px;font-family:'Courier New',monospace;font-size:13px;white-space:pre-wrap;color:#1c1224;background:#fff8e0;border:2px solid #7a5538;border-radius:6px;line-height:1.5";
    const lines = MISSCPP.split("\n");
    lines.forEach((line, i) => {
      const l = document.createElement("div");
      l.style.opacity = 0; l.textContent = line;
      doc.appendChild(l);
      setTimeout(() => { l.style.transition = "opacity .08s"; l.style.opacity = 1; }, 15 + i * 25);
    });
    rootEl.appendChild(doc);
    setTimeout(() => {
      const extra = document.createElement("div");
      extra.textContent = "\n  ( Program complete. )\n";
      doc.appendChild(extra);
      if (done) done();
    }, lines.length * 25 + 300);
    Audio.reveal();
  }
  return { render };
})();

// ---- Movement system (spec §6.1; reused from the prototype) ----
export const Movement = (() => {
  const keys = {};
  let x = 0, y = 0, face = 1, inAir = false, vy = 0;
  const SPD = 5.5; const GRAV = 9.8; const JMP = 4.8;
  function input(dir, down) { if (!down) { keys[dir] = false; return; } keys[dir] = true; }
  function update(dt, isSolid) {
    let moveX = 0, moveY = 0;
    if (keys["left"]) moveX = -1;
    if (keys["right"]) moveX = 1;
    if (keys["down"]) moveY = 1;
    if (keys["up"]) moveY = -1;
    const len = Math.hypot(moveX, moveY) || 1;
    moveX /= len; moveY /= len;
    const speed = SPD * dt * 60;
    const tx = x + moveX * speed, ty = y + moveY * speed;
    if (!isSolid(tx, y)) x = tx; else x = Math.round(x);
    if (!isSolid(x, ty)) { y = ty; inAir = moveY > 0; vy = moveY > 0 ? Math.min(vy + GRAV * dt * 60, 8) : 0; }
    else { y = Math.round(y); if (moveY > 0) { inAir = false; vy = 0; } }
    if (moveX > 0.3) face = 1; else if (moveX < -0.3) face = -1;
    return { x, y, face, inAir };
  }
  function jump() { if (!inAir) { vy = -JMP; inAir = true; } }
  return { input, update, jump, set: (px, py, f) => { x = px; y = py; face = f || 1; }, getX: () => x, getY: () => y, getFace: () => face };
})();

// ---- map helpers ----
export function isSolid(mapName, px, py) {
  const m = MAPS[mapName];
  if (!m) return true;
  const tx = Math.floor(px), ty = Math.floor(py);
  if (tx < 0 || ty < 0 || tx >= 20 || ty >= 12) return true;
  const c = m[ty]?.[tx];
  return c === "T";
}

// ---- chapter gates ----
export function chapterUnlocked(i) { return i === 1 || g.chaptersDone[i - 1]; }
