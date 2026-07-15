import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Composition } from "@/data/catalogData"
import { useFavorites } from "@/context/FavoritesContext"
import { FloatingSocials } from "@/components/FloatingSocials"

export default function CompositionDetail() {
  const navigate = useNavigate()
  const location = useLocation()
  const { toggleFavorite, isFavorite } = useFavorites()

  const item: Composition | undefined = location.state?.item
  const backScrollY: number = location.state?.scrollY ?? 0
  const backPath: string = location.state?.backPath ?? "/"

  const [showFill, setShowFill] = useState(false)
  const [showDelivery, setShowDelivery] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

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

  return (
    <div className="min-h-[100svh] md:min-h-0 mt-[58px] md:mt-[84px] max-w-2xl mx-auto md:my-8 md:rounded-3xl md:overflow-hidden md:shadow-xl md:border md:border-[#f0ebff]" style={{ background: "#fff", display: "flex", flexDirection: "column" }}>

      {/* ── Верхняя строка: Назад + Избранное ── */}
      <div className="sticky md:static" style={{
        top: "clamp(58px,7.5vw,84px)", zIndex: 50,
        background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid #f0ebff",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 12px", height: 52,
      }}>
        <button
          onClick={goBack}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            border: "none", background: "rgba(124,58,237,0.08)",
            borderRadius: 10, padding: "8px 14px",
            color: "#7c3aed", fontWeight: 700, fontSize: 14,
            fontFamily: "'Montserrat', sans-serif", cursor: "pointer",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Назад
        </button>

        <p style={{ flex: 1, textAlign: "center", fontWeight: 700, fontSize: 13, color: "#1a1a1a", margin: "0 8px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: "'Montserrat', sans-serif" }}>
          {item.title}
        </p>

        <button
          onClick={() => toggleFavorite(item.id)}
          style={{
            width: 38, height: 38, borderRadius: "50%", border: "none",
            background: isFavorite(item.id) ? "linear-gradient(135deg,#f43f5e,#e11d48)" : "rgba(124,58,237,0.08)",
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24"
            fill={isFavorite(item.id) ? "#fff" : "none"}
            stroke={isFavorite(item.id) ? "#fff" : "#f43f5e"}
            strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>

      {/* ── Фото — ограничено по высоте ── */}
      <div style={{
        width: "100%", background: "#f8f5ff",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
        maxHeight: "min(46vh, 420px)",
      }}>
        <img
          src={item.image}
          alt={item.title}
          onLoad={() => setImgLoaded(true)}
          style={{
            width: "100%",
            height: "100%",
            maxHeight: "min(46vh, 420px)",
            objectFit: item.contain ? "contain" : "cover",
            display: "block",
            opacity: imgLoaded ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        />
      </div>

      {/* Радужная полоска */}
      <div style={{ height: 3, background: "linear-gradient(90deg,#7c3aed,#f97316,#f43f5e,#7c3aed)", flexShrink: 0 }} />

      {/* ── Контент ── */}
      <div className="pb-[130px] md:pb-4" style={{ flex: 1, padding: "16px" }}>

        {/* Название + цена */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 16 }}>
          <h2 style={{
            flex: 1, fontSize: 18, fontWeight: 800, lineHeight: 1.3, color: "#1a1a1a",
            fontFamily: "'Montserrat', sans-serif", margin: 0,
          }}>
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

        {/* ── Кнопка Наполнение ── */}
        <button
          onClick={() => setShowFill(v => !v)}
          style={{
            width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "14px 16px", marginBottom: showFill ? 0 : 8,
            borderRadius: showFill ? "14px 14px 0 0" : 14,
            border: "2px solid", borderColor: showFill ? "#7c3aed" : "#e9e3ff",
            background: showFill ? "#f5f0ff" : "#faf8ff",
            cursor: "pointer", transition: "all 0.2s",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700, fontSize: 15, color: "#7c3aed", fontFamily: "'Montserrat', sans-serif" }}>
            <span style={{ fontSize: 18 }}>✨</span>
            Наполнение
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
            <p style={{ margin: "10px 0 0", fontSize: 11, color: "#a855f7", fontWeight: 600 }}>
              🎨 Можно изменить под ваш бюджет и пожелания
            </p>
          </div>
        )}

        {/* ── Кнопка Доставка ── */}
        <button
          onClick={() => setShowDelivery(v => !v)}
          style={{
            width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "14px 16px", marginBottom: showDelivery ? 0 : 8,
            borderRadius: showDelivery ? "14px 14px 0 0" : 14,
            border: "2px solid", borderColor: showDelivery ? "#16a34a" : "#d1fae5",
            background: showDelivery ? "#f0fdf4" : "#f9fffe",
            cursor: "pointer", transition: "all 0.2s",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700, fontSize: 15, color: "#16a34a", fontFamily: "'Montserrat', sans-serif" }}>
            <span style={{ fontSize: 18 }}>🚚</span>
            Доставка по г. Краснодар
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

        {/* Соцсети */}
        <div style={{ marginTop: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#888", marginBottom: 10 }}>Написать нам</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {[
              { label: "WhatsApp", href: "https://wa.me/79885973303", bg: "#25D366" },
              { label: "Telegram", href: "https://t.me/sharovik_krd", bg: "#229ED9" },
              { label: "ВКонтакте", href: "https://vk.com/sharovik_krd", bg: "#0077FF" },
              { label: "Instagram", href: "https://instagram.com/sharovik_krd", bg: "linear-gradient(45deg,#f09433,#dc2743,#bc1888)" },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                display: "inline-flex", alignItems: "center", padding: "8px 16px",
                borderRadius: 999, background: s.bg, color: "#fff",
                fontSize: 13, fontWeight: 700, textDecoration: "none",
                fontFamily: "'Montserrat', sans-serif",
              }}>
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Кнопки снизу: fixed на мобиле, обычные в карточке на десктопе ── */}
      <div className="fixed md:static bottom-0 left-0 right-0" style={{
        zIndex: 50,
        background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)",
        borderTop: "1px solid #f0ebff",
        padding: "10px 16px",
        paddingBottom: "max(10px, env(safe-area-inset-bottom, 10px))",
        display: "flex", gap: 10,
      }}>
        <button
          onClick={() => goOrder("order")}
          style={{
            flex: 1, padding: "14px", borderRadius: 16, border: "none",
            background: "linear-gradient(135deg,#f97316,#e63000)", color: "#fff",
            fontWeight: 800, fontSize: 14, cursor: "pointer",
            fontFamily: "'Montserrat', sans-serif",
            boxShadow: "0 4px 16px rgba(249,115,22,0.4)",
          }}
        >
          🎈 Оформить заказ
        </button>
        <button
          onClick={() => goOrder("details")}
          style={{
            flex: 1, padding: "14px", borderRadius: 16,
            border: "2px solid #7c3aed", background: "#faf5ff",
            color: "#7c3aed", fontWeight: 800, fontSize: 14, cursor: "pointer",
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          💬 Уточнить детали / Изменить набор
        </button>
      </div>

      <FloatingSocials />
    </div>
  )
}