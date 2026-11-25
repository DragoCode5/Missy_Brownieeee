// ---- Love in Pixels — game entry point (spec §5.3, §8.9) ----
import {
  CHARS, MODES, MAPS, CHAPTERS, PUZZLES, REWARDS, LETTER, MIRROR_GREETING, MIRROR_LINE, MIRROR_PRIVACY,
  g, saveGame, loadGameState, setChar, setMode, jumpToChapter,
  Inventory, Journal, Reward, Puzzle, Terminal, Movement, isSolid, chapterUnlocked, CHAPTER_REWARDS,
  getGameState
} from "./systems.js";

// ---- DOM refs ----
const $ = id => document.getElementById(id);
const pick = $("pick"), modes = $("modes"), welcome = $("welcome");
const roster = $("roster");
const dName = $("dName"), dRole = $("dRole"), dBlurb = $("dBlurb"), dPerk = $("dPerk");
const big = $("big");
const goBtn = $("go");
const mRow = $("mRow"), modeGo = $("modeGo"), modeBack = $("modeBack");
const welcomeGo = $("welcomeGo"), welcomeBack = $("welcomeBack");
const wName = $("wName"), wMsg = $("wMsg");
const gameCanvas = $("gc"), gCtx = gameCanvas.getContext("2d");
const hudEl = $("hud"), hs = $("hs"), ho = $("ho"), gx = $("gx");
const dlg = $("dlg");
const dpad = $("dpad"), actBtn = $("act");
const letterScn = $("letter"), lBody = $("lBody");
const albumScn = $("album"), lItems = $("lItems"), aClose = $("aClose");
const videoScn = $("video"), vItem = $("vItem"), vAu = $("vAu"), vClose = $("vClose");
const musicScn = $("music"), mItem = $("mItem"), mAu = $("mAu");
const invenScn = $("inven"), iItems = $("iItems"), iClose = $("iClose");
const journalScn = $("journal"), jBody = $("jBody"), jClose = $("jClose");
const settingsScn = $("settings"), sBody = $("sBody"), sClose = $("sClose");
const lettersBtn = $("lettersBtn"), lettersBtn2 = $("lettersBtn2");
const puzzleScn = $("puzzle"), pI = $("pI"), ps = $("ps"), psCtx = ps.getContext("2d");
const pInst = $("pInst"), pBar = $("pBar"), pHint = $("pHint"), pTap = $("pTap");
const terminalScn = $("terminal"), termRoot = $("termRoot"), termClose = $("termClose");
const mirrorScn = $("mirror"), mrc = $("mrc"), mirrorPanel = $("mirrorPanel"), mirrorCloseBtn = $("mirrorCloseBtn");
const toastEl = $("toast");

const CHAP = i => CHAPTERS[i - 1];
const FRAG_TEXTS = {
  missy: "You brought the world back to life, and it is yours.",
  gospel: "A small, bright idea always finds its way home.",
  owusu: "Soon the mission will be complete.",
  kobby: "Some gifts only work when you stop looking for them.",
  kofi: "The Keeper forgot to write my name. I am still here.",
  prince: "Show off if you like, but the stars are watching.",
  angel: "These are the best ones! Look again.",
  scolded: "Sorry I got told off. Come on, let's finish.",
  mrsbrown: "She has seen the whole town come together. Come visit her."
};

// ---- Drawing helpers ----
function C(x, y, w, h, col, ctx = gCtx) { ctx.fillStyle = col; ctx.fillRect(x, y, w, h); }

function drawChar(cv, c) {
  const x = cv.getContext("2d");
  x.clearRect(0, 0, cv.width, cv.height);
  const h = cv.height, g = h - 1, legTop = g - c.leg, torTop = legTop - c.torso, hd = torTop - 6;
  x.beginPath();
  const dd = (dx, dy, w, h, ccol) => { x.fillStyle = ccol; x.fillRect(dx, dy, w, h); };
  dd(5, legTop, 2, c.leg, c.bottom); dd(9, legTop, 2, c.leg, c.bottom);
  dd(5, g, 2, 1, c.shoe); dd(9, g, 2, 1, c.shoe);
  dd(4, torTop, 8, c.torso, c.top); dd(3, torTop, 1, c.torso, c.top); dd(12, torTop, 1, c.torso, c.top);
  dd(3, legTop, 1, 1, c.skin); dd(12, legTop, 1, 1, c.skin);
  if (c.style === "long") { dd(4, hd - 1, 8, 2, c.hair); dd(4, hd, 1, 10, c.hair); dd(11, hd, 1, 10, c.hair); }
  if (c.style === "rotund") { dd(3, torTop, 10, c.torso, c.top); dd(2, torTop, 1, c.torso, c.top); dd(13, torTop, 1, c.torso, c.top); }
  dd(5, hd, 6, 6, c.skin);
  if (c.style === "skirt") { dd(2, torTop, 12, 4, c.skirt); dd(3, torTop + 4, 8, 2, c.skirt); }
  if (c.style === "long" || c.style === "short" || c.style === "skirt") { dd(5, hd - 1, 6, 4, c.hair); if (c.style === "skirt") { dd(4, hd + 3, 2, 2, c.hair); dd(9, hd + 3, 2, 2, c.hair); } }
  if (c.longHair) { dd(5, hd - 1, 6, 6, c.hair); dd(4, hd + 3, 2, 4, c.hair); dd(9, hd + 3, 2, 4, c.hair); }
  if (c.style === "short") { dd(4, hd, 1, 2, c.hair); dd(11, hd, 1, 2, c.hair); }
  if (c.style === "buzz") dd(5, hd, 6, 1, c.hair);
  if (c.style === "cap") { dd(4, hd - 1, 8, 2, c.cap); dd(5, hd + 1, 6, 1, c.cap); }
  if (c.style === "hood") { dd(4, hd - 1, 8, 2, c.hood); dd(4, hd, 1, 7, c.hood); dd(11, hd, 1, 7, c.hood); }
  if (c.medal) dd(5, torTop + 1, 1, 1, "#f2b632");
  if (c.badge) { dd(7, torTop + 2, 2, 1, "#f8ecff"); dd(8, torTop + 3, 1, 1, "#f8ecff"); dd(8, torTop + 5, 1, 1, "#f8ecff"); }
  if (c.pig) { dd(5, hd - 1, 3, 2, c.pig); dd(9, hd - 1, 3, 2, c.pig); dd(5, hd, 1, 8, c.pig); dd(9, hd, 1, 8, c.pig); dd(6, hd + 4, 1, 1, c.pig); dd(10, hd + 4, 1, 1, c.pig); }
  if (c.grad) { dd(4, hd, 1, 6, c.moto); dd(11, hd, 1, 6, c.moto); dd(5, hd + 6, 6, 1, c.moto); }
  if (c.kerchief) { dd(4, hd, 1, 8, c.kerc); dd(11, hd, 1, 8, c.kerc); }
  dd(6, hd + 3, 1, 1, "#2d1b3d"); dd(9, hd + 3, 1, 1, "#2d1b3d"); dd(7, hd + 5, 2, 1, "#a0414a");
}

// ---- Character select (spec §11.2) ----
function buildCharacterSelect() {
  roster.innerHTML = "";
  CHARS.forEach((c, i) => {
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("aria-pressed", "false");
    card.dataset.id = c.id;
    const cv = document.createElement("canvas");
    cv.width = 16; cv.height = 24;
    drawChar(cv, c);
    card.appendChild(cv);
    const b = document.createElement("b"); b.textContent = c.name; card.appendChild(b);
    const s = document.createElement("span"); s.textContent = c.role; card.appendChild(s);
    card.addEventListener("click", () => {
      document.querySelectorAll(".card").forEach(el => el.setAttribute("aria-pressed", "false"));
      card.setAttribute("aria-pressed", "true");
      setChar(i);
      updateDetail();
    });
    roster.appendChild(card);
  });
  g.charIdx = 0;
  updateDetail();
  lettersBtn.onclick = () => showScreen("letter");
}
function updateDetail() {
  const c = CHARS[g.charIdx];
  dName.textContent = c.name; dRole.textContent = "Role: " + c.role; dBlurb.textContent = c.blurb; dPerk.textContent = c.perk;
  drawChar(big, c);
}

// ---- Mode select (spec §5.1.2) ----
function buildModeSelect() {
  mRow.innerHTML = "";
  MODES.forEach((m, i) => {
    const div = document.createElement("div");
    div.className = "mode";
    div.setAttribute("aria-pressed", "false");
    const cv = document.createElement("canvas"); cv.width = 8; cv.height = 8;
    const ctx = cv.getContext("2d"); ctx.clearRect(0, 0, 8, 8);
    m.icon.forEach((row, y) => [...row].forEach((ch, x) => { if (ch !== ".") { ctx.fillStyle = ch === "E" ? "#2d1b3d" : m.col; ctx.fillRect(x, y, 1, 1); } }));
    div.appendChild(cv);
    div.appendChild(document.createElement("b")).textContent = m.name;
    div.appendChild(document.createElement("span")).textContent = m.blurb;
    div.addEventListener("click", () => {
      document.querySelectorAll(".mode").forEach(el => el.setAttribute("aria-pressed", "false"));
      div.setAttribute("aria-pressed", "true");
      setMode(i);
    });
    mRow.appendChild(div);
  });
  g.modeIdx = 0;
}

// ---- Screen routing (spec §11) ----
const ALL = ["pick", "modes", "welcome", "letter", "album", "video", "music", "game",
  "inven", "journal", "settings", "puzzle", "terminal", "mirror"];
function showScreen(name) {
  const h1 = document.querySelector("h1");
  for (const id of ALL) {
    const el = document.getElementById(id);
    if (!el) continue;
    el.classList.remove("show");
    el.style.display = id === name ? "block" : "none";
  }
  if (h1) h1.style.display = name === "pick" ? "block" : "none";
  const el = document.getElementById(name);
  if (el) {
    el.classList.add("show");
    if (name !== "game") { document.body.classList.remove("playing"); gameRunning = false; }
    else { document.body.classList.add("playing"); gameRunning = true; }
  }
  if (name === "puzzle") drawPuzzle();
  if (name === "game") updateHUD();
  if (name === "inven" || name === "journal") buildTextScreens();
  if (name === "settings") wireSettings();
}

// ---- Toast (spec §8.13) ----
let toastT;
function toast(msg) {
  clearTimeout(toastT);
  toastEl.textContent = msg;
  toastEl.style.display = "block";
  toastEl.style.animation = "none";
  toastEl.offsetHeight;
  toastEl.style.animation = "toast-in .25s";
  toastT = setTimeout(() => { toastEl.style.display = "none"; }, 2800);
}

// ---- Music reward after first quest (spec §5.1.4) ----
function giveFirstQuestMusic() {
  Reward.give("music_be_happy");
  const p = mItem; p.textContent = "Be happy — first music reward collected. Press play to hear it in the Game screen, too.";
  mAu.src = "assets/music/";
  mPlay?.click?.();
  mPlay.disabled = false;
}

// ---- Start game: chapters ----
let player = { x: 0, y: 0, face: 1 };
let entities = []; // on-map node markers (publish per chapter)
let gameRunning = false;
let dlgBox = $("dlg");
let lettersShown = false;

function startChapter(idx) {
  if (!chapterUnlocked(idx)) return showScreen("pick");
  const ch = CHAP(idx);
  g.chapter = idx;
  saveGame();
  player = { x: ch.x, y: ch.y, face: 1 };
  Movement.set(ch.x, ch.y, 1);
  const m = MAPS[ch.map];
  // Gate to chapter 2: the flower gate on the town map opens after the key.
  if (ch.map === "town") m[3][15] = g.key ? "G" : "H";
  showScreen("game");
  updateHUD();
}

function updateHUD() {
  hs.textContent = "♥ " + g.hearts + "   Key: " + (g.key ? "✦" : "—") + "   Chapter " + g.chapter;
  ho.textContent = chapterPuzzles(g.chapter).some(p => !g.puzzles[p.id])
    ? "Walk to a puzzle node (the gold marks) and press Interact"
    : "All puzzles solved — the next chapter unlocks!";
}
function chapterPuzzles(idx) { return PUZZLES.filter(p => p.chapter === idx); }

function checkChapterDone(idx) {
  if (g.chaptersDone[idx]) return;
  const done = chapterPuzzles(idx).every(p => g.puzzles[p.id]);
  if (!done) return;
  g.chaptersDone[idx] = true;
  saveGame();
  const next = CHAPTERS.find(c => c.order === idx + 1);
  (CHAPTER_REWARDS[idx] || []).forEach(id => {
    const r = Reward.give(id);
    if (r && r.asset) toast((id.startsWith("photo") ? "🖼️ " : "🎵 ") + r.title + " — " + r.desc);
  });
  if (idx === 6) { showMirror(); }
  else if (next) { toast(next.title + " is now unlocked!"); }
}

// ---- Game world loop ----
let lastT = 0;
const keys = {};
const keyMap = { ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up", ArrowDown: "down", a: "left", d: "right", w: "up", s: "down" };

function gameLoop(t) {
  if (!gameRunning) return;
  const dt = Math.min(0.05, (t - lastT) / 1000 || 0);
  lastT = t;
  const m = MAPS[CHAP(g.chapter).map];
  Movement.update(dt, (px, py) => isSolid(m, Math.round(px) + 0.5, Math.round(py) + 0.5) || isSolid(m, px, py));
  renderWorld();
  requestAnimationFrame(gameLoop);
}

function isAtNode() {
  const c = CHAP(g.chapter);
  const p = Movement.getX() + 0.5, q = Movement.getY() + 0.5;
  return chapterPuzzles(g.chapter).find(pl => {
    const n = pl.node; return n && Math.hypot(p - n.x, q - n.y) < 0.9;
  });
}

function onMapTap(px, py) {
  const pl = isAtNode();
  if (pl) { openPuzzle(pl); return; }
  ho.textContent = "Press Interact near a puzzle node";
}

function renderWorld() {
  const scale = 3;
  const ox = (960 - 20 * 16 * scale) / 2, oy = 10;
  const ctx = gCtx;
  ctx.clearRect(0, 0, 960, 576);
  const m = MAPS[CHAP(g.chapter).map];
  for (let ty = 0; ty < 12; ty++) for (let tx = 0; tx < 20; tx++) {
    const c = m[ty][tx];
    if (c === "H") { C(ox + tx * 48, oy + ty * 48, 48, 48, "#e8d5b0"); C(ox + tx * 48 + 12, oy + ty * 48 + 8, 16, 20, "#c9b080"); }
    else if (c === "G") { C(ox + tx * 48, oy + ty * 48, 48, 48, "#9fbfa8"); }
  }
  for (const pl of chapterPuzzles(g.chapter)) {
    if (!g.puzzles[pl.id]) {
      const x = ox + pl.node.x * 48 + (pl.type === "search" ? 8 : 8), y = oy + pl.node.y * 48 - 8;
      ctx.fillStyle = "#f2b632"; ctx.beginPath(); ctx.arc(x, y, 7, 0, 6.28); ctx.fill();
      ctx.fillStyle = "#3b2457"; ctx.font = "bold 10px 'Courier New'"; ctx.fillText(pl.id.split("_")[0].toUpperCase().slice(0, 2), x - 3, y + 3);
    }
  }
  drawChar({ getContext: () => ctx }, CHARS[g.charIdx]);
  const xp = (Movement.getX() + 0.5) * 48 + ox, yp = (Movement.getY() + 0.5) * 48 + oy - 8;
  hs.textContent = "♥ " + g.hearts + "   Key: " + (g.key ? "✦" : "—") + "   Chapter " + g.chapter;
  ho.textContent = (chapterPuzzles(g.chapter).some(p => !g.puzzles[p.id])
    ? "Walk to a puzzle node (the gold marks) and press Interact" : "All puzzles solved — the next chapter unlocks!");
}

// ---- Puzzle screens (spec §7) ----
let currentPuzzle = null, mazePos = { x: 0, y: 0 }, mazeGoal = null;

function openPuzzle(p) {
  showScreen("puzzle");
  currentPuzzle = Puzzle.start(p);
  mazeGoal = p.type === "maze" ? (MAPS.town.length, { x: 2, y: 4 }) : null;
  mazePos = { x: 1, y: 1 };
  $("pI").textContent = p.instructions;
  drawPuzzle();
  updatePuzzleUI();
  Audio.reveal();
}

function drawPuzzle() {
  const s = currentPuzzle;
  if (!s) return;
  psCtx.clearRect(0, 0, 320, 192);
  psCtx.fillStyle = "#f6e9f3"; psCtx.fillRect(0, 0, 320, 192);
  psCtx.fillStyle = "#e8d5b0"; psCtx.fillRect(30, 20, 260, 140); // play area
  s.ui = [];
  switch (s.type) {
    case "pattern": drawPattern(s); break;
    case "search": drawSearch(s); break;
    case "combo": drawCombo(s); break;
    case "maze": drawMaze(s); break;
    case "trace": drawTrace(s); break;
    case "light": drawLight(s); break;
    case "constellation": drawConstellation(s); break;
    case "match": drawMatch(s); break;
    case "conversation": drawConversation(s); break;
    case "finale": drawFinale(s); break;
  }
  updatePuzzleUI();
}

function upd(ctx, x, y, w, h, col, stroke) { ctx.fillStyle = col; ctx.fillRect(x, y, w, h); if (stroke) { ctx.strokeStyle = "#3b2457"; ctx.strokeRect(x, y, w, h); } }
function lbl(ctx, x, y, w, h, txt) { ctx.fillStyle = "#3b2457"; ctx.font = "bold 11px 'Courier New'"; ctx.textAlign = "center"; ctx.fillText(txt, x + w / 2, y + h / 2 + 3); ctx.textAlign = "start"; }

function drawPattern(s) {
  const pos = [[5, 5], [15, 5], [25, 5], [5, 15]];
  s.cells = pos.map(([x, y], i) => ({ idx: i, x, y, w: 10, h: 10 }));
  pos.forEach(([x, y], i) => { upd(psCtx, x, y, 10, 10, "#fff0d8", true); s.ui.push({ x, y, w: 10, h: 10, idx: i }); if (i === s.target[s.index]) psCtx.fillStyle = "#f2b632", lbl(psCtx, x, y, 10, 10, s.cells[i]); });
}
function drawSearch(s) {
  s.cells = [[5, 5], [11, 5], [17, 5], [5, 12], [11, 12], [17, 12]].map(([x, y], i) => ({ idx: i, x, y, w: 6, h: 6 }));
  s.cells.forEach(c => { upd(psCtx, c.x, c.y, 6, 6, "#c9b080", true); s.ui.push(c); });
  if (s.index > 0) { const g = s.cells[s.index - 1]; upd(psCtx, g.x + 1, g.y + 1, 4, 4, "#f2b632"); upd(psCtx, g.x + 1, g.y + 1, 4, 4, "#7a5f99"); psCtx.beginPath(); psCtx.arc(g.x + 3, g.y + 3, 5, 0, 6.28); psCtx.strokeStyle = "#f2b632"; psCtx.stroke(); }
  psCtx.fillStyle = "#3b2457"; psCtx.font = "10px 'Courier New'"; psCtx.fillText("Tap a cell — find the glasses", 5, 190);
}
function drawCombo(s) {
  const code = s.target;
  [0, 1, 2].forEach(i => {
    const cx = 40 + i * 60;
    psCtx.beginPath(); psCtx.arc(cx, 18, 8, 0, 6.28); psCtx.fillStyle = "#fff6e6"; psCtx.fill();
    psCtx.strokeStyle = "#3b2457"; psCtx.stroke();
    lbl(psCtx, cx - 8, 12, 16, 8, code[s.cursor + i] || code[i]);
    s.cells.push({ idx: i, x: cx - 8, y: 10, w: 16, h: 8 });
  });
  psCtx.fillStyle = "#3b2457"; psCtx.font = "10px 'Courier New'"; psCtx.fillText("Tap the next dial — pink, mint, blue", 5, 40);
}
function drawMaze(s) {
  // A gentle winding path in a 230x120 area; player moves with keys.
  const pts = [[35, 100], [80, 80], [120, 60], [150, 100], [190, 70], [230, 95]];
  const path = [[35, 20], [30, 100], [60, 95], [90, 100], [120, 60], [150, 100], [190, 70], [230, 95], [275, 95]];
  psCtx.beginPath(); psCtx.strokeStyle = "#9fbfa8"; psCtx.lineWidth = 8;
  path.forEach(([x, y], i) => psCtx.lineTo(x + 10, y)); psCtx.stroke();
  path.forEach(([x, y]) => { const c = document.createElement("canvas").getContext("2d"); psCtx.beginPath(); psCtx.arc(x + 10, y, 4, 0, 6.28); psCtx.fillStyle = "#9fbfa8"; psCtx.fill(); });
  const end = path[path.length - 1];
  upd(psCtx, end[0] - 8, end[1] - 8, 16, 16, "#f2b632", true);
  const px = end[0], py = end[1]; // goal fixed: bottom-right
  const mp = mazePos;
  const goX = px - 15, goY = py - 15;
  upd(psCtx, goX - 4, goY - 4, 8, 8, "#c9b080"); // player token (drawn small)
  psCtx.fillStyle = "#3b2457"; psCtx.font = "10px 'Courier New'";
  psCtx.fillText("Walk to the gold marker", 40, 170);
}
function drawTrace(s) {
  s.cells.forEach((cell, i) => { const pos = [[6, 6], [10, 6], [14, 6], [18, 6]][i]; const o = { x: pos[0] * 8 - 4, y: pos[1] * 8 - 4, w: 8, h: 8, idx: i }; s.ui.push(o); upd(psCtx, o.x, o.y, 8, 8, i <= s.index ? "#f2b632" : "#c9b080", true); lbl(psCtx, pos[0] * 8 - 8, pos[1] * 8 - 8, 16, 16, String(i)); });
}
function drawLight(s) {
  const lights = [[6, 10], [12, 10], [18, 10], [6, 5], [12, 5], [18, 5]];
  lights.forEach(([x, y], i) => { upd(psCtx, x * 5, y * 5, 8, 4, "#3b2457", true); s.ui.push({ x: x * 5, y: y * 5, w: 8, h: 4, idx: i }); if (i < s.index) upd(psCtx, x * 5 + 1, y * 5 + 1, 6, 2, "#f2b632"); });
  psCtx.fillStyle = "#3b2457"; psCtx.font = "10px 'Courier New'"; psCtx.fillText("Tap the lights in order", 5, 185);
}
function drawConstellation(s) {
  const stars = [[16, 6], [50, 8], [95, 5], [140, 7], [185, 6], [230, 4], [275, 6]];
  stars.forEach(([x, y], i) => { psCtx.fillStyle = "#f2b632"; drawStar(psCtx, x, y); if (s.index > i) psCtx.fill(); else { psCtx.fillStyle = "#a0a0c0"; drawStar(psCtx, x, y); } s.cells.push({ idx: i, x: x - 6, y: y - 6, w: 12, h: 12 }); });
  s.cells.forEach((c, i) => { const x = [16, 50, 95, 140, 185, 230, 275][i]; const y = [6, 8, 5, 7, 6, 4, 6][i]; psCtx.fillStyle = s.index > i ? "#f2b632" : "#3b2457"; lbl(psCtx, x - 6, y - 8, 12, 12, String(i)); });
}
function drawStar(ctx, x, y) { ctx.beginPath(); ctx.moveTo(x, y - 6); ctx.lineTo(x + 2, y + 1); ctx.lineTo(x + 7, y + 1); ctx.lineTo(x + 3, y + 4); ctx.lineTo(x + 5, y + 10); ctx.lineTo(x, y + 6); ctx.lineTo(x - 5, y + 10); ctx.lineTo(x - 3, y + 4); ctx.lineTo(x - 7, y + 1); ctx.lineTo(x - 2, y + 1); ctx.closePath(); ctx.fill(); }
function drawMatch(s) {
  const pos = [[4, 5], [11, 5], [18, 5], [4, 13], [11, 13], [18, 13]];
  s.cells.forEach((c, i) => { const [x, y] = pos[i]; const o = { x: x * 8 + 8, y: y * 8, w: 6, h: 6, idx: i }; s.ui.push(o); if (!s.matched[c]) upd(psCtx, o.x, o.y, 6, 6, "#fff0d8", true); lbl(psCtx, x * 8 + 4, y * 8 + 2, 8, 8, String(i + 1)); });
  const picked = s.picked;
  if (picked) upd(psCtx, pos[s.cells.indexOf(picked)][0] * 8 + 8 + 1, pos[s.cells.indexOf(picked)][1] * 8 + 1, 4, 4, "#f2b632");
}
function drawConversation(s) {
  psCtx.fillStyle = "#e8d5b0"; psCtx.fillRect(5, 10, 310, 40);
  psCtx.fillStyle = "#3b2457"; psCtx.font = "bold 13px 'Courier New'"; psCtx.fillText("Barista:", 12, 28);
  psCtx.font = "13px 'Courier New'"; psCtx.fillText(s.cells[0].q, 12, 44);
  s.cells.forEach((d, i) => {
    if (i !== s.index || d.a.includes("end")) { upd(psCtx, 30, 60 + i * 20, 260, 16, "#fff6e6", true); lbl(psCtx, 30, 60 + i * 20, 260, 16, d.a[0]); s.ui.push({ x: 30, y: 60 + i * 20, w: 260, h: 16, idx: i }); }
  });
}
function drawFinale(s) {
  s.cells.forEach((src, i) => { const y = 70 + i * 25; upd(psCtx, 8 + i * 35, y, 28, 20, "#3b2457", true); lbl(psCtx, 8 + i * 35, y + 4, 28, 20, String(i + 1)); s.ui.push({ x: 8 + i * 35, y, w: 28, h: 20, idx: i }); });
  psCtx.fillStyle = "#3b2457"; psCtx.font = "10px 'Courier New'"; psCtx.fillText("Relight the Lantern — place the stars in order", 30, 45);
}

function updatePuzzleUI() {
  if (!currentPuzzle) return;
  const s = currentPuzzle;
  pInst.textContent = (PUZZLES.find(p => p.id === s.id)?.instructions || s.id).slice(0, 58);
  const done = s.status === "solved";
  pBar.style.width = (Puzzle.progress(s) || 0) + "%";
  pBar.style.background = done ? "#f2b632" : "#cbb5f0";
  pHint.textContent = done ? "Tap the Next button." : "Tap here for a hint";
  pTap.disabled = s.type !== "maze";
}

function puzzleTap(x, y) {
  const s = currentPuzzle;
  const rect = ps.getBoundingClientRect();
  const sx = Math.floor((x - rect.left) / ps.clientWidth * 320);
  const sy = Math.floor((y - rect.top) / ps.clientHeight * 192);
  if (s.type === "maze") return;
  const cell = s.ui && s.ui.find(c => sx >= c.x && sx < c.x + c.w && sy >= c.y && sy < c.y + c.h);
  if (cell) {
    const r = Puzzle.tap(s, cell.idx);
    Audio.button();
    if (r.result === "solved") {
      setTimeout(onPuzzleSolved, 400);
    } else { drawPuzzle(); toast(r.result === "wrong" ? "Almost!" : ""); }
  } else if (s.type === "match") {
    // clicking anywhere flips: pick or compare (simple tap-pair play)
    Puzzle.tap(s, 0);
    drawPuzzle();
  }
}

function onPuzzleSolved() {
  const s = currentPuzzle, p = PUZZLES.find(x => x.id === s.id);
  Audio.success();
  if (p && p.reward) Reward.give(p.reward);
  g.puzzles[s.id] = true;
  Journal.log(s.id, p?.id || s.id, "");
  checkChapterDone(g.chapter);
  showScreen("game");
}

ps.addEventListener("pointerdown", e => { e.preventDefault(); puzzleTap(e.clientX, e.clientY); });
pTap.addEventListener("click", () => { if (currentPuzzle?.hintLeft > 0) { toast(Puzzle.hint(currentPuzzle)); drawPuzzle(); } });
dpad.addEventListener("pointerdown", e => { e.preventDefault(); const k = e.target.dataset.k; keys[k] = true; Movement.input(k, true); });
dpad.addEventListener("pointerup", e => { const k = e.target.dataset.k; keys[k] = false; Movement.input(k, false); });
dpad.addEventListener("pointerleave", e => { const k = e.target.dataset.k; keys[k] = false; Movement.input(k, false); });
actBtn.addEventListener("pointerdown", e => {
  e.preventDefault();
  const pl = isAtNode();
  if (pl) openPuzzle(pl);
});
lettersBtn2.onclick = () => showScreen("letter");

// ---- Terminal (Missy.cpp viewer, spec §8.14) ----
function openTerminal() {
  showScreen("terminal");
  Terminal.render($("termRoot"), () => showScreen("game"));
}
termClose.addEventListener("click", () => showScreen("game"));

// ---- Mirror gift (spec §8.14) ----
function showMirror() {
  mirrorPanel.innerHTML = `
    <h2 style="text-align:center;margin-bottom:6px">The Mirror Gift</h2>
    <div id="mirrorCanvasWrap" style="display:flex;justify-content:center"></div>
    <div id="mirrorText" style="font-weight:bold;text-align:center;color:#3b2457;margin:6px 0"></div>
    <div id="mirrorLine" style="text-align:center;color:#5b3a29;margin-bottom:6px"></div>
    <div id="mirrorPrivacy" style="text-align:center;font-size:10px;color:#7a5f99;margin-bottom:10px"></div>
    <button class="go" id="mirrorCloseBtn">Close →</button>`;
  mirrorPanel.querySelector("#mirrorText").textContent = MIRROR_GREETING;
  mirrorPanel.querySelector("#mirrorLine").textContent = MIRROR_LINE;
  mirrorPanel.querySelector("#mirrorPrivacy").textContent = MIRROR_PRIVACY;
  const wrap = mirrorPanel.querySelector("#mirrorCanvasWrap");
  let camStream = null;
  const stopCam = () => { if (camStream) camStream.getTracks().forEach(t => t.stop()); camStream = null; };
  const softBeep = () => {
    try {
      const A = window.AudioContext || window.webkitAudioContext;
      if (!A) return;
      const ctx = new A(); const o = ctx.createOscillator(); o.type = "sine"; o.connect(ctx.destination);
      o.frequency.value = 220; if (ctx.currentTime) o.start(0); o.stop(ctx.currentTime + 0.12);
    } catch (e) { /* optional */ }
  };
  const drawFallback = () => {
    const img = new Image(); img.src = "assets/photos/you.jpg";
    img.onload = () => {
      const cv = document.createElement("canvas"); cv.width = 480; cv.height = 480;
      const cx = cv.getContext("2d"); cx.save(); cx.translate(480, 0); cx.scale(-1, 1);
      cx.drawImage(img, 20, 40, 440, 360); cx.restore();
      wrap.appendChild(cv);
    };
  };
  showScreen("mirror");
  softBeep();
  if (navigator.mediaDevices?.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } }).then(stream => {
      camStream = stream;
      const v = document.createElement("video"); v.srcObject = stream; v.muted = true;
      const cv = document.createElement("canvas"); cv.width = 480; cv.height = 480;
      const cx = cv.getContext("2d");
      v.onloadedmetadata = () => { v.play(); requestAnimationFrame(function tick() {
        if (!document.getElementById("mirror")) { stopCam(); return; }
        cx.save(); cx.translate(480, 0); cx.scale(-1, 1); cx.drawImage(v, 0, 0, 480, 480); cx.restore();
        requestAnimationFrame(tick);
      }); };
      wrap.appendChild(cv);
    }).catch(() => drawFallback());
  } else drawFallback();
}
mirrorCloseBtn.addEventListener("click", () => showScreen("game"));

// ---- Letters / instrument screens (spec §6.5, §11) ----
function showLetters() {
  let html = Inventory.list().map(it => {
    const r = REWARDS.find(x => x.id === it.id);
    if (!r) return "";
    if (r.type === "letter") return `<div style="margin:8px 0;padding:10px;background:#fff6e6;border:2px solid #cbb5f0;border-radius:4px;color:#3b2457;font-size:14px"><b>${r.title}</b> — ${r.desc}</div>`;
    if (r.type === "photo") return `<img src="assets/photos/${encodeURIComponent(r.asset)}" style="max-width:100%;border:2px solid #cbb5f0;border-radius:4px;display:block;margin:8px auto">`;
    if (r.type === "music") return `<div style="margin:8px 0;color:#3b2457"><b>${r.title}</b> — ${r.desc}</div><audio controls style="width:100%" src="assets/music/${encodeURIComponent(r.asset)}"></audio>`;
    if (r.type === "video") return `<div style="margin:8px 0;color:#3b2457"><b>${r.title}</b> — ${r.desc}</div><video controls style="width:100%" src="assets/videos/${encodeURIComponent(r.asset)}"></video>`;
    if (r.type === "program") return `<div style="margin:8px 0;color:#3b2457"><b>${r.title}</b> — ${r.desc}</div>`;
    return "";
  }).join("");
  lItems.innerHTML = html || "<p style='color:var(--soft)'>Nothing collected yet. Play through the chapters!</p>";
  showScreen("album");
}
function showInventory() { iItems.innerHTML = Inventory.list().map(it => `<div style="margin:4px 0;font-size:14px;color:#3b2457">${it.name}</div>`).join(""); showScreen("inven"); }
function showJournal() { jBody.innerHTML = Journal.get().slice(0, 30).map(e => `<div style="margin:8px 0"><b style="color:#f2b632">${e.title}</b><span style="color:var(--soft);font-size:11px"> (${e.type})</span><br>${e.desc}</div>`).join(""); showScreen("journal"); }
function showAlbum() { showLetters(); }

function showVideo() { vItem.innerHTML = "<strong>Bridge of Stars</strong> — A night message from a companion."; vAu.src = "assets/videos/Be happy .mp4"; showScreen("video"); }
function showMusic() { mItem.innerHTML = "<strong>Be happy</strong> — The café plays this at night."; mAu.src = "assets/music/Be happy .mp4"; mPlay.disabled = false; showScreen("music"); }

function wireSettings() {
  const d = getGameState();
  $("sDark").checked = d.settings.dark; $("sSound").checked = d.settings.sound;
  $("sMusic").checked = d.settings.music; $("sSubtitles").checked = d.settings.subtitles;
  $("sCtrl").value = d.settings.controls || "auto";
  document.documentElement.dataset.theme = d.settings.dark ? "dark" : "";
  $("sBody").querySelectorAll("input").forEach(el => {
    el.onchange = () => { d.settings[el.id === "sDark" ? "dark" : el.id === "sSound" ? "sound" : el.id === "sMusic" ? "music" : el.id === "sSubtitles" ? "subtitles" : "controls"] = el.type === "checkbox" ? el.checked : el.value; saveGame(); document.documentElement.dataset.theme = d.settings.dark ? "dark" : ""; };
  });
  sClose.onclick = () => showScreen("game");
}

// ---- Main init (spec §5) ----
document.addEventListener("DOMContentLoaded", () => {
  buildCharacterSelect();
  buildModeSelect();
  g.modeIdx = 0; saveGame();
  showScreen("pick");

  goBtn.addEventListener("click", () => {
    showScreen("welcome");
    const c = CHARS[g.charIdx];
    wName.textContent = c.name;
    wMsg.textContent = "Welcome, " + c.name + ". " + FRAG_TEXTS[c.id];
  });
  welcomeGo.addEventListener("click", () => {
    giveFirstQuestMusic();
    showScreen("modes");
  });
  welcomeBack.addEventListener("click", () => showScreen("pick"));
  modeGo.addEventListener("click", () => startChapter(1));
  modeBack.addEventListener("click", () => showScreen("pick"));

  lettersBtn.addEventListener("click", () => showScreen("letter"));
  lClose.addEventListener("click", () => showScreen("pick"));
  aClose.addEventListener("click", () => showScreen("pick"));
  vClose.addEventListener("click", () => showScreen("pick"));
  mClose2.addEventListener("click", () => showScreen("pick"));
  iClose.addEventListener("click", () => showScreen("pick"));
  jClose.addEventListener("click", () => showScreen("pick"));
  sClose.addEventListener("click", () => showScreen("game"));
  gx.addEventListener("click", () => showScreen("pick"));
  lettersBtn2.addEventListener("click", () => showScreen("letter"));
  window._openMusic = showMusic;
  window._openVideo = showVideo;
  window._openTerminal = openTerminal;

  // iOS PWA landscape lock with fallback (spec §15.2)
  if (document.body.classList.contains("playing")) { /* placeholder */ }
  const rot = $("rot");
  document.addEventListener("fullscreenchange", () => {});
  if (screen && screen.orientation && screen.orientation.lock) screen.orientation.lock("landscape").catch(() => {});
  window.addEventListener("orientationchange", () => {
    if (document.documentElement.clientWidth < document.documentElement.clientHeight && gameRunning) rot.style.display = "flex";
  });

  // Keyboard input
  document.addEventListener("keydown", e => {
    if (currentPuzzle && currentPuzzle.type === "maze") {
      const k = keyMap[e.key];
      if (k) { Movement.input(k, true); const m = MAPS[CHAP(g.chapter).map]; Movement.update(0.05, (px, py) => isSolid(m, px, py)); drawPuzzle();
      if (currentPuzzle?.type === "maze") { const t = mazeGoal; if (t && Math.hypot(Movement.getX() - t.x, Movement.getY() - t.y) < 0.6) setTimeout(onPuzzleSolved, 300); } }
    } else if (gameRunning && document.activeElement.id !== "sCtrl") {
      const k = keyMap[e.key];
      if (k) Movement.input(k, true);
    }
  });
  document.addEventListener("keyup", e => { const k = keyMap[e.key]; if (k) Movement.input(k, false); });

  showScreen("pick");
  loadGameState();
  updateDetail();
});

// ---- Simple dialogue (spec §6.2) ----
function showDialog(lines) {
  dlgBox.innerHTML = lines.map(([who, text]) => `<b>${who}:</b> ${text}`).join("");
  dlgBox.style.display = "block";
  dlgBox.onclick = () => { dlgBox.style.display = "none"; lastDialogue = null; };
  setTimeout(() => (dlgBox.style.display = "none"), 4000);
  if (lastDialogue) Audio.beep(700, 50, 0.1);
  lastDialogue = lines;
}
