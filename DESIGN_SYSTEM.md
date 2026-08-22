# Design System Specification: Aetheris AI Design Tokens & Standard

## 1. Visual Philosophy
Aetheris AI adopts a **sleek, dark-first enterprise aesthetic** defined by high visual density, precise structural borders, controlled contrast, and subtle micro-interactions.

---

## 2. Design Tokens

### Color Palette

#### Dark Mode (Default)
- `--bg-root`: `#09090b` (Zinc-950)
- `--bg-surface`: `#18181b` (Zinc-900)
- `--bg-surface-hover`: `#27272a` (Zinc-800)
- `--bg-surface-active`: `#3f3f46` (Zinc-700)
- `--border-subtle`: `#27272a` (Zinc-800)
- `--border-focus`: `#818cf8` (Indigo-400)
- `--text-primary`: `#fafafa` (Zinc-50)
- `--text-secondary`: `#a1a1aa` (Zinc-400)
- `--text-muted`: `#71717a` (Zinc-500)
- `--accent-primary`: `#818cf8` (Indigo-400)
- `--accent-glow`: `rgba(129, 140, 248, 0.15)`
- `--success`: `#4ade80` (Emerald-400)
- `--warning`: `#fbbf24` (Amber-400)
- `--error`: `#f87171` (Red-400)

#### Light Mode
- `--bg-root`: `#ffffff`
- `--bg-surface`: `#f4f4f5` (Zinc-100)
- `--bg-surface-hover`: `#e4e4e7` (Zinc-200)
- `--bg-surface-active`: `#d4d4d8` (Zinc-300)
- `--border-subtle`: `#e4e4e7` (Zinc-200)
- `--border-focus`: `#6366f1` (Indigo-500)
- `--text-primary`: `#18181b` (Zinc-900)
- `--text-secondary`: `#71717a` (Zinc-500)
- `--text-muted`: `#a1a1aa` (Zinc-400)
- `--accent-primary`: `#6366f1` (Indigo-500)
- `--accent-glow`: `rgba(99, 102, 241, 0.15)`
- `--success`: `#22c55e`
- `--warning`: `#f59e0b`
- `--error`: `#ef4444`

---

## 3. Typography Rules
- **Primary UI Font:** `'Inter'`, sans-serif
- **Tamil Font:** `'Noto Sans Tamil'`, sans-serif (line-height: `1.6`)
- **Code & Data Font:** `'JetBrains Mono'`, monospace

---

## 4. Layout Tokens & Grid

- **Global Header Height:** `52px`
- **Left Panel Width:** `260px` (Collapsible to `64px`)
- **Right Panel Width:** `420px` (Resizable up to `680px`)
- **Border Radius Scale:**
  - `sm`: `6px`
  - `md`: `8px`
  - `lg`: `12px`
  - `xl`: `16px`
- **Spacing Scale:** `4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`
