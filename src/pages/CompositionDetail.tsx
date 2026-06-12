import { useState, useEffect, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Composition } from "@/data/catalogData"
import { useFavorites } from "@/context/FavoritesContext"

export default function CompositionDetail() {
  const navigate = useNavigate()
  const location = useLocation()
  const { toggleFavorite, isFavorite } = useFavorites()

  // Текущий набор и список всех (для свайпа между ними)
  const initialItem: Composition | undefined = location.state?.item
  const allItems: Composition[] = location.state?.allItems ?? (initialItem ? [initialItem] : [])
  const backScrollY: number = location.state?.scrollY ?? 0
  const backPath: string = location.state?.backPath ?? "/"

  const initialIdx = allItems.findIndex(i => i.id === initialItem?.id && i.title === initialItem?.title)
  const [currentIdx, setCurrentIdx] = useState(initialIdx >= 0 ? initialIdx : 0)
  const item = allItems[currentIdx]

  const [showFill, setShowFill] = useState(false)
  const [showDelivery, setShowDelivery] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  // Свайп по фото
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const swipeActive = useRef(false)
  const [swipeOffset, setSwipeOffset] = useState(0)
  const [slideDir, setSlideDir] = useState<"left" | "right" | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
    setShowFill(false)
    setShowDelivery(false)
    setImgLoaded(false)
    setSwipeOffset(0)
    setSlideDir(null)
  }, [currentIdx])

  const goTo = (idx: number) => {
    if (idx >= 0 && idx < allItems.length) setCurrentIdx(idx)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    swipeActive.current = true
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!swipeActive.current) return
    const dx = e.touches[0].clientX - touchStartX.current
    const dy = e.touches[0].clientY - touchStartY.current
    // Горизонтальный свайп (не вертикальный скролл)
    if (Math.abs(dx) > Math.abs(dy)) {
      e.preventDefault()
      setSwipeOffset(dx)
    }
  }

  const handleTouchEnd = () => {
    if (!swipeActive.current) return
    swipeActive.current = false
    if (swipeOffset < -60 && currentIdx < allItems.length - 1) {
      setSlideDir("left")
      setTimeout(() => { goTo(currentIdx + 1); setSlideDir(null) }, 180)
    } else if (swipeOffset > 60 && currentIdx > 0) {
      setSlideDir("right")
      setTimeout(() => { goTo(currentIdx - 1); setSlideDir(null) }, 180)
    }
    setSwipeOffset(0)
  }

  if (!item) {
    return (
      <div style={{ minHeight: "100svh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
        <div style={{ fontSize: 48 }}>🎈</div>
        <p style={{ color: "#888" }}>Набор не найден</p>
        <button onClick={() => navigate(-1)} style={{ color: "#7c3aed", textDecoration: "underline", border: "none", background: "none", cursor: "pointer" }}>Назад</button>
      </div>
    )
  }

  const goBack = () => {
    navigate(backPath, { state: { restoreScrollY: backScrollY } })
  }

  const goOrder = (mode: "order" | "details") => {
    window.scrollTo({ top: 0, behavior: "instant" })
    navigate(`/order?mode=${mode}&title=${encodeURIComponent(item.title)}`)
  }

  const fillItems = item.description
    ? item.description.split(",").map(s => s.trim()).filter(Boolean)
    : []

  const imgTransform = slideDir === "left"
    ? "translateX(-100%)"
    : slideDir === "right"
    ? "translateX(100%)"
    : `translateX(${swipeOffset}px)`

  return (
    <div style={{ minHeight: "100svh", background: "#fff", display: "flex", flexDirection: "column" }}>

      {/* ── Верхняя строка ── */}
      <div style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid #f0ebff",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 12px", height: 56,
      }}>
        {/* Кнопка Назад — заметная */}
        <button onClick={goBack} style={{
          display: "flex", alignItems: "center", gap: 6,
          border: "none", background: "rgba(124,58,237,0.10)",
          borderRadius: 12, padding: "10px 16px",
          color: "#7c3aed", fontWeight: 800, fontSize: 15,
          fontFamily: "'Montserrat', sans-serif", cursor: "pointer",
          boxShadow: "0 2px 8px rgba(124,58,237,0.15)",
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Назад
        </button>

        <p style={{ flex: 1, textAlign: "center", fontWeight: 700, fontSize: 12, color: "#1a1a1a", margin: "0 8px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: "'Montserrat', sans-serif" }}>
          {item.title}
        </p>

        {/* Кнопка Избранное — большая и яркая */}
        <button onClick={() => toggleFavorite(item.id)} style={{
          display: "flex", alignItems: "center", gap: 6,
          border: "none",
          background: isFavorite(item.id)
            ? "linear-gradient(135deg,#f43f5e,#e11d48)"
            : "linear-gradient(135deg,#fff0f3,#ffe4ea)",
          borderRadius: 12, padding: "10px 14px",
          color: isFavorite(item.id) ? "#fff" : "#f43f5e",
          fontWeight: 800, fontSize: 13,
          fontFamily: "'Montserrat', sans-serif",
          cursor: "pointer", flexShrink: 0,
          boxShadow: isFavorite(item.id)
            ? "0 3px 12px rgba(244,63,94,0.4)"
            : "0 2px 8px rgba(244,63,94,0.15)",
          transition: "all 0.2s",
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24"
            fill={isFavorite(item.id) ? "#fff" : "#f43f5e"}
            stroke={isFavorite(item.id) ? "#fff" : "#f43f5e"}
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          {isFavorite(item.id) ? "В избранном" : "В избранное"}
        </button>
      </div>

      {/* ── Фото со свайпом ── */}
      <div
        style={{ width: "100%", background: "#f8f5ff", overflow: "hidden", position: "relative" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          key={item.id + "-" + item.title}
          src={item.image}
          alt={item.title}
          onLoad={() => setImgLoaded(true)}
          style={{
            width: "100%", objectFit: "contain", display: "block",
            opacity: imgLoaded ? 1 : 0,
            transition: slideDir ? "transform 0.18s ease-out, opacity 0.15s" : "opacity 0.3s",
            transform: imgTransform,
            willChange: "transform",
          }}
        />

        {/* Стрелки навигации */}
        {currentIdx > 0 && (
          <button onClick={() => goTo(currentIdx - 1)} style={{
            position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)",
            width: 36, height: 36, borderRadius: "50%",
            background: "rgba(255,255,255,0.85)", border: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.18)", zIndex: 5,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
        )}
        {currentIdx < allItems.length - 1 && (
          <button onClick={() => goTo(currentIdx + 1)} style={{
            position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
            width: 36, height: 36, borderRadius: "50%",
            background: "rgba(255,255,255,0.85)", border: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.18)", zIndex: 5,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        )}

        {/* Счётчик */}
        {allItems.length > 1 && (
          <div style={{
            position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)",
            background: "rgba(0,0,0,0.45)", color: "#fff", borderRadius: 999,
            padding: "3px 12px", fontSize: 12, fontWeight: 700, zIndex: 5,
          }}>
            {currentIdx + 1} / {allItems.length}
          </div>
        )}

        {/* Подсказка свайпа */}
        {allItems.length > 1 && (
          <div style={{
            position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)",
            color: "rgba(255,255,255,0.8)", fontSize: 11, whiteSpace: "nowrap", zIndex: 5,
            textShadow: "0 1px 3px rgba(0,0,0,0.5)",
          }}>
            ← листай для следующего →
          </div>
        )}
      </div>

      {/* Радужная полоска */}
      <div style={{ height: 3, background: "linear-gradient(90deg,#7c3aed,#f97316,#f43f5e,#7c3aed)", flexShrink: 0 }} />

      {/* ── Контент ── */}
      <div style={{ flex: 1, padding: "16px 16px 130px" }}>

        {/* Название + цена */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 16 }}>
          <h2 style={{ flex: 1, fontSize: 18, fontWeight: 800, lineHeight: 1.3, color: "#1a1a1a", fontFamily: "'Montserrat', sans-serif", margin: 0 }}>
            {item.title}
          </h2>
          <div style={{
            flexShrink: 0, background: "linear-gradient(135deg,#7c3aed,#a855f7)",
            color: "#fff", borderRadius: 16, padding: "8px 16px",
            fontWeight: 900, fontSize: 17, fontFamily: "'Montserrat', sans-serif",
          }}>
            {item.price}
          </div>
        </div>

        {/* ── Аккордеон: Наполнение ── */}
        <button onClick={() => setShowFill(v => !v)} style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 16px", marginBottom: showFill ? 0 : 8,
          borderRadius: showFill ? "14px 14px 0 0" : 14,
          border: "2px solid", borderColor: showFill ? "#7c3aed" : "#e9e3ff",
          background: showFill ? "#f5f0ff" : "#faf8ff",
          cursor: "pointer", transition: "all 0.2s",
        }}>
          <span style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700, fontSize: 15, color: "#7c3aed", fontFamily: "'Montserrat', sans-serif" }}>
            <span style={{ fontSize: 18 }}>✨</span> Наполнение
          </span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round"
            style={{ transform: showFill ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>

        {showFill && (
          <div style={{
            background: "#f5f0ff", borderRadius: "0 0 14px 14px",
            padding: "4px 16px 14px", marginBottom: 8,
            border: "2px solid #7c3aed", borderTop: "none",
          }}>
            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {fillItems.map((line, i) => (
                <li key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: 8,
                  padding: "7px 0",
                  borderBottom: i < fillItems.length - 1 ? "1px solid #e9e3ff" : "none",
                  fontSize: 13, color: "#333", lineHeight: 1.5,
                  fontFamily: "'Montserrat', sans-serif",
                }}>
                  <span style={{ color: "#a855f7", flexShrink: 0, marginTop: 2, fontWeight: 700 }}>•</span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── Аккордеон: Доставка ── */}
        <button onClick={() => setShowDelivery(v => !v)} style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 16px", marginBottom: showDelivery ? 0 : 8,
          borderRadius: showDelivery ? "14px 14px 0 0" : 14,
          border: "2px solid", borderColor: showDelivery ? "#16a34a" : "#d1fae5",
          background: showDelivery ? "#f0fdf4" : "#f9fffe",
          cursor: "pointer", transition: "all 0.2s",
        }}>
          <span style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700, fontSize: 15, color: "#16a34a", fontFamily: "'Montserrat', sans-serif" }}>
            <span style={{ fontSize: 18 }}>🚚</span> Доставка по г. Краснодар
          </span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round"
            style={{ transform: showDelivery ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>

        {showDelivery && (
          <div style={{
            background: "#f0fdf4", borderRadius: "0 0 14px 14px",
            padding: "4px 16px 14px", marginBottom: 8,
            border: "2px solid #16a34a", borderTop: "none",
          }}>
            <div style={{ padding: "9px 0", borderBottom: "1px solid #d1fae5", display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#166534", lineHeight: 1.4 }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>🎁</span>
              <span>от 3 500 ₽ — <strong>Бесплатно</strong></span>
            </div>
            <div style={{ padding: "9px 0", borderBottom: "1px solid #d1fae5", display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#92400e", lineHeight: 1.4 }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>🚚</span>
              <span>менее 3 500 ₽ — <strong>150–500 ₽</strong></span>
            </div>
            <div style={{ padding: "9px 0", display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#5b21b6", lineHeight: 1.4 }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>📍</span>
              <span>Самовывоз: ул. Героя Яцкова 19к3</span>
            </div>
          </div>
        )}

        {/* ── Подсказка про изменение наполнения ── */}
        <div style={{
          marginTop: 12, padding: "12px 16px",
          background: "linear-gradient(135deg, #fdf4ff, #f5f0ff)",
          borderRadius: 14, border: "1.5px solid #e9d5ff",
          display: "flex", alignItems: "flex-start", gap: 10,
        }}>
          <span style={{ fontSize: 20, flexShrink: 0 }}>🎨</span>
          <p style={{ margin: 0, fontSize: 13, color: "#6b21a8", lineHeight: 1.5, fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}>
            Наполнение любой композиции можно изменить под ваши пожелания — цвет, состав и бюджет
          </p>
        </div>
      </div>

      {/* ── Фиксированные кнопки снизу ── */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
        background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)",
        borderTop: "1px solid #f0ebff",
        padding: "10px 16px",
        paddingBottom: "max(10px, env(safe-area-inset-bottom, 10px))",
        display: "flex", gap: 10,
      }}>
        <button onClick={() => goOrder("order")} style={{
          flex: 1, padding: "14px", borderRadius: 16, border: "none",
          background: "linear-gradient(135deg,#f97316,#e63000)", color: "#fff",
          fontWeight: 800, fontSize: 14, cursor: "pointer",
          fontFamily: "'Montserrat', sans-serif",
          boxShadow: "0 4px 16px rgba(249,115,22,0.4)",
        }}>
          🎈 Оформить заказ
        </button>
        <button onClick={() => goOrder("details")} style={{
          flex: 1, padding: "14px", borderRadius: 16,
          border: "2px solid #7c3aed", background: "#faf5ff",
          color: "#7c3aed", fontWeight: 800, fontSize: 14, cursor: "pointer",
          fontFamily: "'Montserrat', sans-serif",
        }}>
          💬 Уточнить детали
        </button>
      </div>
    </div>
  )
}