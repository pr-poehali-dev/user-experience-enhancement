import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Composition } from "@/data/catalogData"
import { useFavorites } from "@/context/FavoritesContext"
import { FloatingSocials } from "@/components/FloatingSocials"
import Icon from "@/components/ui/icon"

const SOCIALS = [
  { label: "Max", href: "https://vk.com/sharovik_krd", bg: "#1e3a5f" },
  { label: "WhatsApp", href: "https://wa.me/79885973303", bg: "#25D366" },
  { label: "Telegram", href: "https://t.me/sharovik_krd", bg: "#229ED9" },
]

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
  const [zoomed, setZoomed] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  if (!item) {
    return (
      <div className="mt-[58px] md:mt-[84px]" style={{ minHeight: "calc(100svh - 58px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
        <div style={{ fontSize: 48 }}>🎈</div>
        <p style={{ fontFamily: "'Montserrat', sans-serif", color: "#8a7d9c" }}>Набор не найден</p>
        <button
          onClick={() => navigate(-1)}
          style={{ color: "#7c3aed", fontFamily: "'Montserrat', sans-serif", fontWeight: 700, border: "none", background: "none", cursor: "pointer" }}
        >
          Назад
        </button>
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
    <div className="mt-[58px] md:mt-[84px]" style={{ minHeight: "calc(100svh - 58px)", background: "linear-gradient(180deg, #fdfbff 0%, #f7f2fd 45%, #ffffff 100%)" }}>

      <div className="max-w-6xl mx-auto lg:px-6 lg:py-8">
        <div
          className="bg-white lg:rounded-[32px] lg:shadow-xl overflow-hidden lg:border"
          style={{ borderColor: "#ece4fb" }}
        >
          <div className="grid lg:grid-cols-2">

            {/* ══════ ЛЕВАЯ КОЛОНКА: ФОТО ══════ */}
            <div className="relative">
              <div
                className="relative w-full flex items-center justify-center overflow-hidden cursor-zoom-in"
                style={{ background: "linear-gradient(160deg,#f5f0ff 0%,#faf5ff 100%)", height: "min(78vh, 760px)" }}
                onClick={() => setZoomed(true)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  onLoad={() => setImgLoaded(true)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: item.contain ? "contain" : "cover",
                    display: "block",
                    opacity: imgLoaded ? 1 : 0,
                    transition: "opacity 0.4s",
                  }}
                />

                {/* Подсказка «увеличить» */}
                <div
                  className="absolute bottom-4 right-4 flex items-center gap-1.5 shadow-md"
                  style={{
                    background: "rgba(255,255,255,0.92)", backdropFilter: "blur(6px)",
                    borderRadius: 999, padding: "7px 14px",
                    color: "#7c3aed", fontWeight: 700, fontSize: 12,
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  <Icon name="ZoomIn" size={14} />
                  Увеличить
                </div>

                {/* Кнопка «Назад» — поверх фото */}
                <button
                  onClick={(e) => { e.stopPropagation(); goBack() }}
                  className="absolute top-4 left-4 flex items-center gap-1.5 shadow-md"
                  style={{
                    border: "none", background: "rgba(255,255,255,0.92)", backdropFilter: "blur(6px)",
                    borderRadius: 999, padding: "9px 16px",
                    color: "#7c3aed", fontWeight: 700, fontSize: 13,
                    fontFamily: "'Montserrat', sans-serif", cursor: "pointer",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"/>
                  </svg>
                  Назад
                </button>

                {/* Избранное — поверх фото */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(item.id) }}
                  className="absolute top-4 right-4 shadow-md"
                  style={{
                    width: 40, height: 40, borderRadius: "50%", border: "none",
                    background: isFavorite(item.id) ? "linear-gradient(135deg,#f43f5e,#e11d48)" : "rgba(255,255,255,0.92)",
                    backdropFilter: "blur(6px)",
                    display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24"
                    fill={isFavorite(item.id) ? "#fff" : "none"}
                    stroke={isFavorite(item.id) ? "#fff" : "#f43f5e"}
                    strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* ══════ ПРАВАЯ КОЛОНКА: ИНФОРМАЦИЯ ══════ */}
            <div className="flex flex-col px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">

              <span
                className="inline-block self-start mb-3 px-3 py-1 rounded-full"
                style={{ background: "rgba(124,58,237,0.08)", color: "#a855f7", fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase" }}
              >
                🎈 Готовая композиция
              </span>

              <h1 style={{
                fontFamily: "'Playfair Display', serif", fontWeight: 600,
                fontSize: "clamp(24px,2.4vw,34px)", color: "#1a1024", lineHeight: 1.2, marginBottom: 14,
              }}>
                {item.title}
              </h1>

              <div
                className="inline-flex self-start items-center gap-1 mb-6"
                style={{
                  background: "linear-gradient(135deg,#7c3aed,#a855f7)",
                  color: "#fff", borderRadius: 18, padding: "10px 20px",
                  fontWeight: 800, fontSize: 22, fontFamily: "'Montserrat', sans-serif",
                }}
              >
                {item.price}
              </div>

              {/* ── Наполнение ── */}
              <button
                onClick={() => setShowFill(v => !v)}
                className="w-full flex items-center justify-between transition-all"
                style={{
                  padding: "14px 18px", marginBottom: showFill ? 0 : 10,
                  borderRadius: showFill ? "16px 16px 0 0" : 16,
                  border: "1.5px solid", borderColor: showFill ? "#c9b3f5" : "#ece4fb",
                  background: showFill ? "#f5f0ff" : "#faf8ff",
                  cursor: "pointer",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700, fontSize: 15, color: "#7c3aed", fontFamily: "'Montserrat', sans-serif" }}>
                  <Icon name="Sparkles" size={17} />
                  Наполнение
                </span>
                <Icon
                  name="ChevronDown"
                  size={18}
                  style={{ color: "#7c3aed", transform: showFill ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}
                />
              </button>

              {showFill && (
                <div
                  className="mb-2.5"
                  style={{ background: "#f5f0ff", borderRadius: "0 0 16px 16px", padding: "6px 18px 16px", border: "1.5px solid #c9b3f5", borderTop: "none" }}
                >
                  <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                    {fillItems.map((line, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2"
                        style={{
                          padding: "8px 0",
                          borderBottom: i < fillItems.length - 1 ? "1px solid #e9e3ff" : "none",
                          fontSize: 13.5, color: "#3a2d4d", lineHeight: 1.5,
                          fontFamily: "'Montserrat', sans-serif",
                        }}
                      >
                        <span style={{ color: "#a855f7", flexShrink: 0, marginTop: 2, fontWeight: 700 }}>•</span>
                        {line}
                      </li>
                    ))}
                  </ul>
                  <p style={{ margin: "10px 0 0", fontSize: 11.5, color: "#a855f7", fontWeight: 600, fontFamily: "'Montserrat', sans-serif" }}>
                    🎨 Можно изменить под ваш бюджет и пожелания
                  </p>
                </div>
              )}

              {/* ── Доставка ── */}
              <button
                onClick={() => setShowDelivery(v => !v)}
                className="w-full flex items-center justify-between transition-all"
                style={{
                  padding: "14px 18px", marginBottom: showDelivery ? 0 : 10,
                  borderRadius: showDelivery ? "16px 16px 0 0" : 16,
                  border: "1.5px solid", borderColor: showDelivery ? "#86e0b4" : "#d1fae5",
                  background: showDelivery ? "#f0fdf4" : "#f9fffe",
                  cursor: "pointer",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700, fontSize: 15, color: "#16a34a", fontFamily: "'Montserrat', sans-serif" }}>
                  <Icon name="Truck" size={17} />
                  Доставка по г. Краснодар
                </span>
                <Icon
                  name="ChevronDown"
                  size={18}
                  style={{ color: "#16a34a", transform: showDelivery ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}
                />
              </button>

              {showDelivery && (
                <div
                  className="mb-2.5"
                  style={{ background: "#f0fdf4", borderRadius: "0 0 16px 16px", padding: "6px 18px 16px", border: "1.5px solid #86e0b4", borderTop: "none" }}
                >
                  <div className="flex items-center gap-2.5" style={{ padding: "9px 0", borderBottom: "1px solid #d1fae5", fontSize: 13.5, color: "#166534", fontFamily: "'Montserrat', sans-serif" }}>
                    <span style={{ fontSize: 17, flexShrink: 0 }}>🎁</span>
                    <span>от 4 000 ₽ — <strong>бесплатно</strong> (кроме районов Западный Обход, Юбилейный, Пашковский)</span>
                  </div>
                  <div className="flex items-center gap-2.5" style={{ padding: "9px 0", borderBottom: "1px solid #d1fae5", fontSize: 13.5, color: "#92400e", fontFamily: "'Montserrat', sans-serif" }}>
                    <span style={{ fontSize: 17, flexShrink: 0 }}>🚚</span>
                    <span>менее 4 000 ₽ — <strong>от 150 ₽</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5" style={{ padding: "9px 0", fontSize: 13.5, color: "#5b21b6", fontFamily: "'Montserrat', sans-serif" }}>
                    <span style={{ fontSize: 17, flexShrink: 0 }}>📍</span>
                    <span>Самовывоз: ул. Героя Яцкова 19к3</span>
                  </div>
                </div>
              )}

              {/* ── Кнопки заказа (в потоке, десктоп) ── */}
              <div className="hidden lg:flex gap-2.5 mt-6">
                <button
                  onClick={() => goOrder("order")}
                  className="flex-1 transition-transform hover:scale-[1.02]"
                  style={{
                    padding: "15px", borderRadius: 16, border: "none",
                    background: "linear-gradient(135deg,#7c3aed,#a855f7)", color: "#fff",
                    fontWeight: 800, fontSize: 14.5, cursor: "pointer",
                    fontFamily: "'Montserrat', sans-serif",
                    boxShadow: "0 6px 20px rgba(124,58,237,0.35)",
                  }}
                >
                  🎈 Оформить заказ
                </button>
                <button
                  onClick={() => goOrder("details")}
                  className="flex-1 transition-transform hover:scale-[1.02]"
                  style={{
                    padding: "15px", borderRadius: 16,
                    border: "2px solid #7c3aed", background: "#faf5ff",
                    color: "#7c3aed", fontWeight: 800, fontSize: 14.5, cursor: "pointer",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  💬 Уточнить детали
                </button>
              </div>

              {/* ── Соцсети ── */}
              <div className="mt-7">
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#a99bc0", marginBottom: 10, fontFamily: "'Montserrat', sans-serif" }}>
                  Написать нам
                </p>
                <div className="flex flex-wrap gap-2">
                  {SOCIALS.map(s => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center transition-transform hover:scale-105"
                      style={{
                        padding: "8px 16px", borderRadius: 999, background: s.bg, color: "#fff",
                        fontSize: 13, fontWeight: 700, textDecoration: "none",
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ── Кнопки снизу: фиксированы только на мобиле ── */}
      <div
        className="fixed lg:hidden bottom-0 left-0 right-0 flex gap-2.5"
        style={{
          zIndex: 50,
          background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)",
          borderTop: "1px solid #f0ebff",
          padding: "10px 16px",
          paddingBottom: "max(10px, env(safe-area-inset-bottom, 10px))",
        }}
      >
        <button
          onClick={() => goOrder("order")}
          style={{
            flex: 1, padding: "14px", borderRadius: 16, border: "none",
            background: "linear-gradient(135deg,#7c3aed,#a855f7)", color: "#fff",
            fontWeight: 800, fontSize: 14, cursor: "pointer",
            fontFamily: "'Montserrat', sans-serif",
            boxShadow: "0 4px 16px rgba(124,58,237,0.4)",
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
          💬 Уточнить детали
        </button>
      </div>

      {/* Отступ снизу под fixed-панель на мобиле */}
      <div className="lg:hidden" style={{ height: 82 }} />

      {/* ── Лайтбокс: увеличенное фото ── */}
      {zoomed && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{ zIndex: 200, background: "rgba(26,16,36,0.92)", backdropFilter: "blur(4px)" }}
          onClick={() => setZoomed(false)}
        >
          <button
            onClick={() => setZoomed(false)}
            className="absolute top-5 right-5 flex items-center justify-center shadow-lg"
            style={{ width: 44, height: 44, borderRadius: "50%", border: "none", background: "rgba(255,255,255,0.15)", cursor: "pointer" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <img
            src={item.image}
            alt={item.title}
            className="max-w-full max-h-full"
            style={{ objectFit: "contain", borderRadius: 16 }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <FloatingSocials />
    </div>
  )
}