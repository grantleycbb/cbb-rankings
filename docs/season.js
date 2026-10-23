// season.js — shared season-switcher state, loaded on every page.
//
// Season selection precedence: ?season= URL param (shareable/bookmarkable
// links) > localStorage["cbb_season"] (persists across pages/navigation,
// same pattern as the existing localStorage["cbb_theme"] convention) >
// DEFAULT_SEASON.
//
// DEFAULT_SEASON: the season a first-time visitor lands on — bump each
// year once the new season's rosters land; everything else derives from it.
const DEFAULT_SEASON = 2027; // 2026-27

let _seasonsManifest = null;

async function loadSeasonsManifest() {
  if (_seasonsManifest) return _seasonsManifest;
  try {
    _seasonsManifest = await fetch("data/seasons.json").then(r => r.json());
  } catch (e) {
    _seasonsManifest = [{ season: DEFAULT_SEASON, label: String(DEFAULT_SEASON), team_pages: true, player_pages: true }];
  }
  return _seasonsManifest;
}

function getSeason() {
  const q = new URLSearchParams(location.search).get("season");
  if (q) return q;
  try {
    const stored = localStorage.getItem("cbb_season");
    if (stored) return stored;
  } catch (e) { /* localStorage unavailable (private mode etc) */ }
  return String(DEFAULT_SEASON);
}

function setSeason(season) {
  try {
    localStorage.setItem("cbb_season", String(season));
  } catch (e) { /* ignore */ }
}

// Builds a season-scoped data URL, e.g. dataUrl("data.json") ->
// "data/2026/data.json", dataUrl("player_data/123.json") ->
// "data/2026/player_data/123.json".
function dataUrl(path) {
  return "data/" + getSeason() + "/" + path;
}

// Populates a <select> element with the available seasons (from
// seasons.json) and wires it to call onChange(newSeason) when the user
// picks a different one. `require` is "team_pages" or "player_pages" (or
// null) — seasons missing that capability are shown but disabled, so the
// dropdown always lists the full season history even where a given page's
// data isn't available for that season.
async function initSeasonSelect(selectEl, require, onChange) {
  const seasons = await loadSeasonsManifest();
  const current = getSeason();
  selectEl.innerHTML = "";
  for (const s of seasons.slice().reverse()) { // newest first
    const opt = document.createElement("option");
    opt.value = String(s.season);
    const available = !require || s[require];
    opt.textContent = s.label + (available ? "" : " (unavailable)");
    opt.disabled = !available;
    if (String(s.season) === current) opt.selected = true;
    selectEl.appendChild(opt);
  }
  selectEl.addEventListener("change", () => {
    if (selectEl.value) onChange(selectEl.value);
  });
}

// Tournament field format by season -- mirrors bracket_format.py.
// 68 teams (First Four: 2 AQ + 2 at-large play-in games) through 2025-26;
// 76 teams (6 AQ + 6 at-large play-in games) from 2026-27.
function bracketFormat(season) {
  return Number(season || getSeason()) >= 2027
    ? { field: 76, aqPlayinGames: 6, alPlayinGames: 6, playinName: "Play-In Round" }
    : { field: 68, aqPlayinGames: 2, alPlayinGames: 2, playinName: "First Four" };
}

// How far the at-large cut line (and the "bubble" team used for WAB)
// moves down from a 68-team field: 0, or 8 for 76 teams.
function bubbleShift(season) {
  return bracketFormat(season).field - 68;
}
