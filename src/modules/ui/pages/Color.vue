<script setup>
import { ref, computed, onMounted } from 'vue'

// ─────────────────────────────────────────────
// CSS import — তোমার actual path অনুযায়ী ঠিক করে নাও
// ─────────────────────────────────────────────
import '@/assets/css/core.css'

// ============================================================
// PREFIX → GROUP MAPPING
// নতুন section add করতে হলে এখানে একটা লাইন যোগ করো
// ============================================================
const sectionMap = [
  // ── 2. Brand / Core Colors ──
  { prefix: '--primary',        group: '2. Brand / Core Colors' },
  { prefix: '--secondary',      group: '2. Brand / Core Colors' },

  // ── 3. Base / Neutral Colors ──
  { prefix: '--white',          group: '3. Base / Neutral Colors' },
  { prefix: '--black',          group: '3. Base / Neutral Colors' },
  { prefix: '--transparent',    group: '3. Base / Neutral Colors' },
  { prefix: '--gray',           group: '3. Base / Neutral Colors' },
  { prefix: '--border',         group: '3. Base / Neutral Colors' },
  { prefix: '--modal-outline',  group: '3. Base / Neutral Colors' },
  { prefix: '--text',           group: '3. Base / Neutral Colors' },
  { prefix: '--table-text',     group: '3. Base / Neutral Colors' },
  { prefix: '--table-sort',     group: '3. Base / Neutral Colors' },
  { prefix: '--icon',           group: '3. Base / Neutral Colors' },

  // ── 4. Semantic / Status Colors ──
  { prefix: '--success',        group: '4. Semantic / Status Colors' },
  { prefix: '--danger',         group: '4. Semantic / Status Colors' },
  { prefix: '--warning',        group: '4. Semantic / Status Colors' },
  { prefix: '--info',           group: '4. Semantic / Status Colors' },
  { prefix: '--light-green',    group: '4. Semantic / Status Colors' },

  // ── 5. Sidebar Menu - Default State ──
  { prefix: '--sd_br_mnu_bg',   group: '5. Sidebar Menu - Default State' },
  { prefix: '--sd_br_mnu_txt',  group: '5. Sidebar Menu - Default State' },
  { prefix: '--sd_br_mnu_bdr',  group: '5. Sidebar Menu - Default State' },
  { prefix: '--sd_br_mnu_icon', group: '5. Sidebar Menu - Default State' },
  { prefix: '--sd_br_mnu_hvr',  group: '5. Sidebar Menu - Default State' },

  // ── 6. Sidebar Menu - Active State ──
  { prefix: '--sd_br_mnu_act',  group: '6. Sidebar Menu - Active State' },

  // ── 7. Topbar / Navbar Menu ──
  { prefix: '--tb_mnu',         group: '7. Topbar / Navbar Menu' },
  { prefix: '--topbar',         group: '7. Topbar / Navbar Menu' },

  // ── 8. Button States ──
  { prefix: '--btn',            group: '8. Button States' },

  // ── 9. Form / Input Field ──
  { prefix: '--input',          group: '9. Form / Input Field' },

  // ── 10. Table ──
  { prefix: '--table-header',   group: '10. Table' },
  { prefix: '--table-row',      group: '10. Table' },
  { prefix: '--table-border',   group: '10. Table' },
  { prefix: '--table-stripe',   group: '10. Table' },

  // ── 11. Shadow / Overlay / Modal ──
  { prefix: '--shadow',         group: '11. Shadow / Overlay / Modal' },
  { prefix: '--overlay',        group: '11. Shadow / Overlay / Modal' },
  { prefix: '--modal-bg',       group: '11. Shadow / Overlay / Modal' },

  // ── 12. Pagination ──
  { prefix: '--pagination',     group: '12. Pagination' },

  // ── 13. Panel ──
  { prefix: '--panel',          group: '13. Panel' },

  // ── 14. Module Header / Breadcrumb ──
  { prefix: '--module',         group: '14. Module Header / Breadcrumb' },

  // ── 15. Page Card Background ──
  { prefix: '--page-card',      group: '15. Page Card Background' },
]

// Group display order — নতুন group হলে এখানে add করো
const groupOrder = [
  '2. Brand / Core Colors',
  '3. Base / Neutral Colors',
  '4. Semantic / Status Colors',
  '5. Sidebar Menu - Default State',
  '6. Sidebar Menu - Active State',
  '7. Topbar / Navbar Menu',
  '8. Button States',
  '9. Form / Input Field',
  '10. Table',
  '11. Shadow / Overlay / Modal',
  '12. Pagination',
  '13. Panel',
  '14. Module Header / Breadcrumb',
  '15. Page Card Background',
  'Other',
]

// ============================================================
// SKIP LIST — এই prefix গুলোর variable দেখানো হবে না
// Bootstrap / third-party variables বাদ দেওয়ার জন্য
// ============================================================
const SKIP_PREFIXES = [
  '--bs-',        // Bootstrap variables
  '--fc-',        // FullCalendar
  '--tox-',       // TinyMCE
  '--swiper-',    // Swiper
  '--toastify-',  // Toastify
]

// Internal palette-page variables — hide করা হবে
const INTERNAL_VARS = new Set([
  '--bg', '--ink', '--ink-soft', '--line',
  '--accent', '--accent-soft', '--card',
  '--cargoaim-font',
])

function shouldSkip(name) {
  if (INTERNAL_VARS.has(name)) return true
  return SKIP_PREFIXES.some(p => name.startsWith(p))
}

// Variable name দিয়ে group title বের করা
function getGroupTitle(varName) {
  // দীর্ঘ prefix আগে match করতে হবে
  const sorted = [...sectionMap].sort((a, b) => b.prefix.length - a.prefix.length)
  for (const { prefix, group } of sorted) {
    if (varName.startsWith(prefix)) return group
  }
  return 'Other'
}

// ============================================================
// VALUE TYPE DETECT — color কিনা বোঝার জন্য
// color value না হলে swatch blank দেখাবে
// ============================================================
function looksLikeColor(value) {
  if (!value) return false
  const v = value.trim().toLowerCase()
  return (
    v.startsWith('#') ||
    v.startsWith('rgb') ||
    v.startsWith('hsl') ||
    v === 'transparent' ||
    v === 'white' ||
    v === 'black' ||
    /^[a-z]+$/.test(v) // named colors like 'red', 'blue'
  )
}

const groups = ref([])

onMounted(() => {
  const computedRoot = getComputedStyle(document.documentElement)
  const seen = new Set()
  const allVars = []

  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) {
        if (rule.selectorText !== ':root') continue
        const matches = [...rule.cssText.matchAll(/(--[\w-]+)\s*:/g)]
        for (const [, name] of matches) {
          if (seen.has(name)) continue
          seen.add(name)
          if (shouldSkip(name)) continue
          const value = computedRoot.getPropertyValue(name).trim()
          if (value) allVars.push({ name, value })
        }
      }
    } catch {
      // cross-origin stylesheet — skip
    }
  }

  // Group map তৈরি
  const groupMap = {}
  for (const item of allVars) {
    const title = getGroupTitle(item.name)
    if (!groupMap[title]) groupMap[title] = { title, items: [] }
    groupMap[title].items.push(item)
  }

  groups.value = groupOrder
    .filter(t => groupMap[t])
    .map(t => groupMap[t])
})

// ============================================================
// SEARCH LOGIC
// ============================================================
const searchQuery = ref('')
const activeGroup = ref('all')

const filteredGroups = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  let list = groups.value
  if (activeGroup.value !== 'all') {
    list = list.filter(g => g.title === activeGroup.value)
  }
  if (!q) return list
  return list
    .map(group => ({
      title: group.title,
      items: group.items.filter(item =>
        item.name.toLowerCase().includes(q) ||
        item.value.toLowerCase().includes(q)
      )
    }))
    .filter(group => group.items.length > 0)
})

const totalCount = computed(() =>
  groups.value.reduce((sum, g) => sum + g.items.length, 0)
)

// ============================================================
// COPY LOGIC
// ============================================================
const copiedName = ref('')

async function copyVar(name) {
  try {
    await navigator.clipboard.writeText(`var(${name})`)
    copiedName.value = name
    setTimeout(() => {
      if (copiedName.value === name) copiedName.value = ''
    }, 1200)
  } catch (e) {
    console.error('Copy failed:', e)
  }
}
</script>

<template>
    <div class="palette-page">
            <div class="card palette-card">
      
          <!-- ===== HERO ===== -->
          <header class="palette-hero">
            <div class="hero-text">
              <span class="hero-eyebrow">Design Tokens</span>
              <div class="hero-title-row">
                <h1 class="hero-title">Color Palette</h1>
                <p class="hero-sub">
                  Click any <code>var(--color-name)</code> to copy the CSS variable to your clipboard.
                </p>
              </div>
            </div>
            <div class="hero-count">
              <span class="count-num">{{ totalCount }}</span>
              <span class="count-label">Tokens</span>
            </div>
          </header>
      
          <!-- ===== CONTROLS ===== -->
          <div class="controls-bar">
            <div class="search-wrap">
              <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="7"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                v-model="searchQuery"
                class="search-input"
                placeholder="Search variable... (border, primary, btn)"
              >
              <button
                v-if="searchQuery"
                type="button"
                class="search-clear"
                @click="searchQuery = ''"
                aria-label="Clear search"
              >✕</button>
            </div>
      
            <div class="chip-row">
              <button
                type="button"
                class="chip"
                :class="{ 'is-active': activeGroup === 'all' }"
                @click="activeGroup = 'all'"
              >All</button>
              <button
                v-for="group in groups"
                :key="group.title"
                type="button"
                class="chip"
                :class="{ 'is-active': activeGroup === group.title }"
                @click="activeGroup = group.title"
              >{{ group.title.replace(/^\d+\.\s*/, '') }}</button>
            </div>
          </div>
      
          <!-- ===== GROUPS ===== -->
          <div v-for="group in filteredGroups" :key="group.title" class="cp-group">
            <div class="cp-group-head">
              <span class="cp-group-bar"></span>
              <h2 class="cp-group-title">{{ group.title }}</h2>
              <span class="cp-group-count">{{ group.items.length }}</span>
            </div>
            <div class="cp-grid">
              <button
                v-for="item in group.items"
                :key="item.name"
                type="button"
                class="cp-card"
                :class="{ 'is-copied': copiedName === item.name }"
                @click="copyVar(item.name)"
              >
                <span
                  class="cp-swatch"
                  :class="{ 'no-color': !looksLikeColor(item.value) }"
                  :style="looksLikeColor(item.value) ? { background: item.value } : {}"
                >
                  <span v-if="!looksLikeColor(item.value)" class="cp-swatch-non-color">{ }</span>
                  <span v-else class="cp-swatch-check">✓</span>
                </span>
                <span class="cp-info">
                  <span class="cp-var-name">{{ item.name }}</span>
                  <span class="cp-var-value">{{ item.value }}</span>
                </span>
                <span class="cp-copy-tag">{{ copiedName === item.name ? 'Copied!' : 'Copy' }}</span>
              </button>
            </div>
          </div>
      
          <!-- Empty states -->
          <div v-if="filteredGroups.length === 0 && groups.length > 0" class="cp-empty">
            <span class="cp-empty-emoji">🎨</span>
            <p>কোনো variable পাওয়া যায়নি "<b>{{ searchQuery }}</b>" এর জন্য।</p>
          </div>
          <div v-if="groups.length === 0" class="cp-empty">
            <span class="cp-empty-emoji">⏳</span>
            <p>CSS variables লোড হচ্ছে...</p>
          </div>
      
        </div>
        </div>
</template>

<style scoped>
.palette-page {
  --bg: #f6f7fb;
  --ink: #1c2230;
  --ink-soft: #6b7385;
  --line: #e3e6ee;
  --accent: #5b5bd6;
  --accent-soft: #ecebfe;
  --card: #ffffff;

  height: calc(101vh - 69px);
  overflow-y: auto;
  overflow-x: hidden;
  background: var(--bg);
  color: var(--ink);
  font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
  padding: 0px;
}
.palette-card{
    padding:10px;
}

/* ===== HERO ===== */
.palette-hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid var(--line);
}

.hero-eyebrow {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  background: var(--accent-soft);
  padding: 3px 8px;
  border-radius: 999px;
  margin-bottom: 6px;
}

.hero-title-row {
  display: flex;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
}

.hero-title {
  font-size: clamp(18px, 2.5vw, 22px);
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0;
  line-height: 1.1;
  white-space: nowrap;
}

.hero-sub { font-size: 11.5px; color: var(--ink-soft); line-height: 1.5; margin: 0; }

.hero-sub code {
  background: var(--accent-soft);
  color: var(--accent);
  padding: 1px 5px;
  border-radius: 4px;
  font-size: 11px;
}

.hero-count {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 58px;
  height: 58px;
  flex-shrink: 0;
  border-radius: 12px;
  background: linear-gradient(155deg, var(--accent) 0%, #8b7bf0 100%);
  color: #fff;
  box-shadow: 0 8px 18px -6px rgba(91, 91, 214, 0.4);
}

.count-num { font-size: 20px; font-weight: 800; line-height: 1; }
.count-label { font-size: 9px; text-transform: uppercase; letter-spacing: 0.08em; opacity: 0.85; margin-top: 2px; }

/* ===== CONTROLS ===== */
.controls-bar { display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px; }

.search-wrap { position: relative; max-width: 460px; }

.search-icon {
  position: absolute;
  left: 13px;
  top: 50%;
  transform: translateY(-50%);
  width: 15px;
  height: 15px;
  color: var(--ink-soft);
  pointer-events: none;
}

.search-input {
  width: 100%;
  font-size: 13px;
  padding: 9px 34px 9px 36px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--card);
  color: var(--ink);
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

.search-input::placeholder { color: #aab0bf; }
.search-input:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }

.search-clear {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: var(--bg);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  color: var(--ink-soft);
  font-size: 11px;
  cursor: pointer;
  display: grid;
  place-items: center;
}

.search-clear:hover { background: #fde2e2; color: #b91c1c; }

.chip-row { display: flex; flex-wrap: wrap; gap: 6px; }

.chip {
  font-size: 11.5px;
  font-weight: 600;
  padding: 5px 11px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: var(--card);
  color: var(--ink-soft);
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s;
}

.chip:hover { border-color: var(--accent); color: var(--accent); }
.chip.is-active { background: var(--ink); border-color: var(--ink); color: #fff; }

/* ===== EMPTY STATE ===== */
.cp-empty {
  text-align: center;
  padding: 48px 20px;
  color: var(--ink-soft);
  background: var(--card);
  border: 1px dashed var(--line);
  border-radius: 14px;
}

.cp-empty-emoji { font-size: 28px; display: block; margin-bottom: 8px; }
.cp-empty p { font-size: 13px; margin: 0; }

/* ===== GROUPS ===== */
.cp-group { margin-bottom: 24px; }

.cp-group-head { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }

.cp-group-bar { width: 4px; height: 14px; border-radius: 3px; background: var(--accent); }

.cp-group-title { font-size: 13.5px; font-weight: 700; margin: 0; color: var(--ink); }

.cp-group-count {
  font-size: 11px;
  font-weight: 600;
  color: var(--ink-soft);
  background: var(--line);
  padding: 2px 8px;
  border-radius: 999px;
}

.cp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 10px;
}

/* ===== CARD ===== */
.cp-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 9px;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  transition: border-color 0.18s, box-shadow 0.18s, transform 0.18s;
  overflow: hidden;
}

.cp-card:hover {
  border-color: var(--accent);
  box-shadow: 0 8px 18px -10px rgba(40, 40, 80, 0.18);
  transform: translateY(-2px);
}

.cp-card.is-copied { border-color: #1fa363; background: #f3fdf7; }

.cp-swatch {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 9px;
  flex-shrink: 0;
  border: 1px solid rgba(0, 0, 0, 0.07);
  display: grid;
  place-items: center;
}

.cp-swatch.no-color {
  background: var(--bg);
  border: 1px dashed var(--line);
}

.cp-swatch-non-color {
  font-size: 11px;
  font-weight: 700;
  color: var(--ink-soft);
  font-family: monospace;
}

.cp-swatch-check {
  color: #fff;
  font-size: 15px;
  font-weight: 800;
  opacity: 0;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  transition: opacity 0.18s, transform 0.18s;
  transform: scale(0.6);
}

.cp-card.is-copied .cp-swatch-check { opacity: 1; transform: scale(1); }

.cp-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }

.cp-var-name {
  font-size: 12px;
  font-weight: 700;
  color: var(--ink);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cp-var-value {
  font-size: 10.5px;
  color: var(--ink-soft);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: 'SF Mono', 'Cascadia Code', monospace;
}

.cp-copy-tag {
  flex-shrink: 0;
  font-size: 10px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 6px;
  color: var(--accent);
  background: var(--accent-soft);
  transition: background 0.18s, color 0.18s;
}

.cp-card.is-copied .cp-copy-tag { background: #1fa363; color: #fff; }
.cp-card:hover .cp-copy-tag { background: var(--accent); color: #fff; }

/* ===== RESPONSIVE ===== */
@media (max-width: 640px) {
  .palette-hero { flex-wrap: wrap; }
  .hero-title-row { flex-direction: column; gap: 4px; }
  .hero-count { width: 100%; height: 48px; flex-direction: row; gap: 6px; border-radius: 10px; }
}
</style>