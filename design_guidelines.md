# Design Guidelines for ABD Revisi Kilat
## Telecommunication Network Schematic Editor

### Design Approach: Professional Design Tool System
**Selected Approach:** Design system approach inspired by professional creative/technical tools (Figma, AutoCAD, Linear) with emphasis on clarity, precision, and workflow efficiency.

**Design Principles:**
- **Functional Clarity:** Every UI element serves a clear purpose in the drawing workflow
- **Visual Hierarchy:** Canvas is the star; toolbars support without distraction
- **Precision First:** Crisp edges, clear icons, accurate feedback for technical work
- **Professional Aesthetic:** Clean, modern interface suitable for extended professional use

---

## Core Design Elements

### A. Color Palette

**Dark Mode Primary (Default):**
- Background Primary: `222 15% 12%` (deep charcoal for reduced eye strain)
- Background Secondary: `222 15% 16%` (sidebars, panels)
- Background Tertiary: `222 15% 20%` (hover states, elevated elements)
- Canvas Background: `0 0% 98%` (white/light gray - drawings need light background)
- Border: `222 10% 25%` (subtle panel dividers)

**Accent Colors:**
- Primary Action: `217 91% 60%` (vibrant blue for primary buttons, active states)
- Danger/Delete: `0 84% 60%` (red for destructive actions)
- Success/Confirm: `142 71% 45%` (green for confirmations)
- Warning: `38 92% 50%` (amber for cautions)

**Telecom Symbol Colors (Canvas):**
- Red Components: `0 100% 50%` (bright red for ODC, ODP, poles, closures)
- Black Outlines: `0 0% 0%`
- White Fill: `0 0% 100%`

**Text Colors:**
- Primary: `0 0% 95%` (high contrast on dark panels)
- Secondary: `0 0% 70%` (labels, descriptions)
- Disabled: `0 0% 45%`

### B. Typography

**Font Stack:**
- Primary: 'Inter' (Google Fonts) - for all UI text, labels, buttons
- Monospace: 'JetBrains Mono' (Google Fonts) - for technical data, coordinates if needed

**Type Scale:**
- Headers (Panel Titles): 14px, semibold (600)
- Body Text (Labels): 13px, regular (400)
- Small Text (Hints): 11px, regular (400)
- Button Text: 13px, medium (500)
- Input Fields: 13px, regular (400)

### C. Layout System

**Spacing Primitives:** Use Tailwind units of **2, 3, 4, 6, 8** for consistent spacing
- Component padding: `p-4` (16px)
- Section gaps: `gap-3` (12px)
- Tight spacing: `space-y-2` (8px)
- Panel margins: `m-6` (24px)

**Layout Structure:**
```
┌─────────────────────────────────────────────────────┐
│ Top Bar (h-14, bg-secondary, border-b)              │
│ [Title] [Spacer] [Export PDF Button]                │
├──────────┬──────────────────────────┬───────────────┤
│ Left     │ Center Canvas            │ Right         │
│ Sidebar  │ (bg-white/light)         │ Properties    │
│ w-52     │ (flex-1)                 │ w-64          │
│ (200px)  │                          │ (250px)       │
│          │                          │               │
│ Symbol   │ Fabric.js Canvas         │ Context Panel │
│ Library  │                          │               │
├──────────┴──────────────────────────┴───────────────┤
│ Bottom Title Block Editor (h-24, bg-secondary)      │
│ [Nama Gambar Input] [Daerah STO Input]              │
└─────────────────────────────────────────────────────┘
```

### D. Component Library

**Navigation/Top Bar:**
- Height: 56px (h-14), dark background with subtle bottom border
- App title: Left-aligned, semibold, 16px
- Export PDF button: Right-aligned, primary blue, medium size with icon

**Left Sidebar - Symbol Library:**
- Background: Secondary dark
- Symbol buttons: Grid layout, 2 columns, `gap-2`
- Each button: Square aspect ratio, rounded corners (rounded-lg), hover state with bg-tertiary
- Icon size: 32x32px, centered in 40x40px button
- Labels: Below icon, 11px, truncated if needed
- Active/selected state: Blue border (2px)

**Center Canvas Area:**
- Full white/light gray background for drawing clarity
- Subtle 1px border around canvas
- Canvas controls overlay (top-right corner): Zoom controls, reset view
- Cursor feedback: Crosshair in line-drawing mode

**Right Sidebar - Properties Panel:**
- Background: Secondary dark
- Header: "Properties" or "Object Properties", 14px semibold
- Default state: Centered empty state with icon and "No Object Selected" text
- Active state sections:
  - Object Type: Read-only badge with icon, rounded-full, small padding
  - Name Input: Full-width text field with label above
  - Spacing between sections: `space-y-4`

**Input Fields:**
- Background: Tertiary dark (lighter than panel)
- Border: 1px subtle, focus: 2px blue
- Padding: `px-3 py-2`
- Rounded: `rounded-md`
- Font: 13px regular

**Buttons:**
- Primary (Export, Add Cable active): Blue background, white text, `px-4 py-2`, `rounded-md`, medium weight
- Secondary (Symbol buttons): Transparent, border on hover, icon-focused
- Danger (implied for delete): Red variant when needed
- All buttons: Smooth hover transitions (150ms)

**Bottom Title Block Editor:**
- Two-column grid layout
- Each input: Label above, full-width text field
- Background: Secondary dark, top border separator
- Padding: `p-4`

**Canvas Object Styling:**
- Selection handles: Blue circles (6px diameter)
- Bounding box: Dashed blue line (1px)
- Rotation handle: Blue line with circular end
- Hover state: Subtle blue glow/outline

### E. Interactions & Feedback

**Visual Feedback:**
- Button hover: Brightness increase, smooth 150ms transition
- Active tool: Blue accent border + slight background change
- Canvas object selection: Blue handles appear immediately
- Line drawing mode: Cursor changes to crosshair, canvas has subtle blue tint overlay (5% opacity)

**Animations:**
- Panel transitions: None (instant for professional tool responsiveness)
- Button states: Subtle 150ms ease-in-out
- Object manipulation: Native Fabric.js smooth dragging
- NO decorative animations - focus on immediate feedback

---

## Professional Tool Considerations

**Keyboard Shortcuts Indication:**
- Display keyboard hints in tooltips on hover (e.g., "Delete: Del key")
- Tooltips: Dark background, white text, 11px, appear after 500ms hover

**Precision Controls:**
- Grid overlay option: Toggle for alignment assistance
- Snap-to-grid when enabled: Visual feedback with magnetic effect
- Coordinate display: Show X,Y position on canvas (bottom-left corner, small monospace text)

**Status Indicators:**
- Canvas mode indicator (top-left): "Selection Mode" or "Drawing Cable"
- Object count: Small badge showing total objects on canvas
- Save state: Auto-save indicator (future feature placeholder)

---

## Images Section

**No Hero Images Required** - This is a professional application interface, not a marketing page.

**Icon Assets:**
- All 11 telecom symbols: SVG format matching the provided legend (red, precise geometric shapes)
- UI Icons: Use Heroicons (outline style) for toolbar actions, properties panel indicators
- Symbol library icons should be exact replicas of the legend provided in the attached screenshots

**Favicon/Logo:**
- Simple monogram "ABD" in blue on dark background, modern sans-serif

This design prioritizes workflow efficiency, visual clarity for technical work, and professional aesthetics suitable for extended daily use by telecom engineers.