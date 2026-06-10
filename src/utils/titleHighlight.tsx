import React from "react"

// IDs первых 5 наборов в каждой категории (для цветных меток)
const HIGHLIGHTED_IDS: Record<string, number[]> = {
  girl:          [7, 8, 10, 11, 12],
  man:           [8, 9, 11, 12, 13],
  boy:           [5, 6, 7, 8, 15],
  "kid-girl":    [5, 10, 12, 14, 20],
  "boy-discharge":  [99, 101, 102, 109, 110],
  "girl-discharge": [10, 11, 13, 16, 34],
}

// Цвета меток по категории / ключевым словам
const KEYWORD_COLORS: { keywords: string[]; color: string; bg: string }[] = [
  { keywords: ["для девушки", "девушки"],   color: "#fff", bg: "#e11d48" },        // красный
  { keywords: ["для мужчины", "мужчины"],   color: "#fff", bg: "#16a34a" },        // зелёный
  { keywords: ["для мальчика", "мальчика"], color: "#fff", bg: "#2563eb" },        // синий
  { keywords: ["для девочки", "девочки"],   color: "#fff", bg: "#db2777" },        // розовый
  { keywords: ["выписка девочки", "выписки девочки"], color: "#1e1b4b", bg: "#fce7f3" }, // нежно-розовый
  { keywords: ["выписка мальчика", "выписки мальчика"], color: "#1e1b4b", bg: "#bfdbfe" }, // голубой
  { keywords: ["на выписку"],               color: "#1e1b4b", bg: "#bfdbfe" },     // голубой (общий выписка)
]

export function isHighlightedId(id: number, subcategory?: string): boolean {
  if (!subcategory) return false
  const ids = HIGHLIGHTED_IDS[subcategory]
  return ids ? ids.includes(id) : false
}

export function HighlightedTitle({
  title,
  id,
  subcategory,
  className,
  style,
}: {
  title: string
  id: number
  subcategory?: string
  className?: string
  style?: React.CSSProperties
}) {
  if (!isHighlightedId(id, subcategory)) {
    return <span className={className} style={style}>{title}</span>
  }

  const lower = title.toLowerCase()

  for (const { keywords, color, bg } of KEYWORD_COLORS) {
    for (const kw of keywords) {
      const idx = lower.indexOf(kw)
      if (idx !== -1) {
        const before = title.slice(0, idx)
        const match = title.slice(idx, idx + kw.length)
        const after = title.slice(idx + kw.length)
        return (
          <span className={className} style={style}>
            {before}
            <span style={{
              background: bg,
              color,
              borderRadius: 4,
              padding: "0 5px 1px",
              fontWeight: 800,
              fontSize: "0.95em",
              display: "inline-block",
              lineHeight: 1.4,
            }}>{match}</span>
            {after}
          </span>
        )
      }
    }
  }

  return <span className={className} style={style}>{title}</span>
}
