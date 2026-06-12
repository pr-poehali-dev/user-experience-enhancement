import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { useFavorites } from "@/context/FavoritesContext"

const LOGO_FULL = "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/0bd60024-d203-4687-8ece-19f097927434.png"
const LOGO_COMPACT = "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9eef4dd7-63f9-4820-bcbd-49aa233a21f2.png"
// Новый логотип для бокового меню
const LOGO_MENU = "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9becd1f1-f1f4-44ee-a8af-15d82e98e381.png"

const SOCIALS = [
  { label: "WhatsApp", href: "https://wa.me/79885973303", bg: "#25D366", icon: <svg width="20" height="20" viewBox="0 0 32 32" fill="white"><path d="M16 2C8.28 2 2 8.28 2 16c0 2.46.66 4.76 1.8 6.76L2 30l7.44-1.76A13.9 13.9 0 0016 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm6.26 19.86c-.34-.17-2.02-.998-2.334-1.112-.312-.114-.54-.17-.766.17-.228.34-.882 1.112-1.082 1.34-.198.228-.396.256-.73.086-.336-.17-1.416-.522-2.698-1.664-.998-.888-1.672-1.986-1.868-2.32-.196-.336-.02-.518.148-.686.152-.152.336-.396.504-.594.17-.198.226-.34.338-.566.114-.228.056-.428-.028-.596-.086-.17-.766-1.842-1.048-2.522-.276-.66-.558-.57-.766-.582-.198-.01-.426-.012-.654-.012-.228 0-.596.086-.908.426-.312.34-1.192 1.164-1.192 2.838s1.22 3.294 1.39 3.522c.17.228 2.4 3.666 5.814 5.138.812.35 1.446.56 1.94.716.814.26 1.556.224 2.142.136.654-.098 2.014-.822 2.298-1.616.284-.794.284-1.474.198-1.616-.084-.14-.312-.226-.646-.396z"/></svg> },
  { label: "Telegram", href: "https://t.me/sharovik_krd", bg: "#229ED9", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg> },
  { label: "ВКонтакте", href: "https://vk.com/sharovik_krd", bg: "#0077FF", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm3.08 13.5h-1.85c-.7 0-.91-.56-2.16-1.81-1.09-1.05-1.57-.93-1.57.22v1.65c0 .39-.13.62-1.18.62-1.74 0-3.67-1.05-5.03-3.01C4.42 10.5 4 8.5 4 8.5s0-.23.25-.23h1.85c.68 0 .94.31 1.19 1.04.65 1.9 1.74 3.57 2.19 3.57.17 0 .25-.08.25-.5V10.1c-.06-1.06-.62-1.15-.62-1.53 0-.21.17-.42.45-.42h2.9c.38 0 .51.21.51.66v3.12c0 .38.17.51.28.51.17 0 .31-.13.62-.44 1.07-1.2 1.83-3.06 1.83-3.06.1-.23.3-.44.68-.44h1.85c.56 0 .68.29.56.67-.23.97-2.42 4.14-2.42 4.14-.19.31-.26.45 0 .79.19.26.8.79 1.21 1.27.74.84 1.31 1.55 1.46 2.04.17.49-.08.74-.57.74z"/></svg> },
  { label: "Instagram", href: "https://instagram.com/sharovik_krd", bg: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
  { label: "Max", href: "https://vk.com/sharovik_krd", bg: "#1e3a5f", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg> },
]

const NAV_DESKTOP = [
  { label: "О нас",     path: "/about" },
  { label: "Прайс",    path: "/contacts" },
  { label: "Каталог",  path: "/catalog" },
  { label: "Отзывы",   path: "#reviews" },
  { label: "Доставка", path: "/delivery" },
]

const NAV_MOBILE = [
  { label: "О нас",      path: "/about",     emoji: "ℹ️" },
  { label: "Прайс",     path: "/contacts",  emoji: "🏷️" },
  { label: "Доставка",  path: "/delivery",  emoji: "🚚" },
  { label: "Отзывы",    path: "#reviews",   emoji: "💬" },
  { label: "Каталог",   path: "/catalog",   emoji: "🎈" },
  { label: "Соцсети",   path: "#socials",   emoji: "📱" },
  { label: "Популярное",path: "#popular",   emoji: "⭐" },
]

// Кнопка соцсетей — правый нижний угол, всегда видна
function FloatingSocialsBtn() {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ position: "fixed", bottom: 90, right: 16, zIndex: 200 }}>
      {/* Список соцсетей */}
      {open && (
        <div style={{ position: "absolute", bottom: 72, right: 0, display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end" }}>
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: 8,
                background: s.bg, borderRadius: 999,
                padding: "9px 16px",
                fontWeight: 700, fontSize: 14,
                fontFamily: "'Montserrat', sans-serif",
                color: "#fff", textDecoration: "none",
                boxShadow: "0 4px 16px rgba(0,0,0,0.22)",
                whiteSpace: "nowrap",
                animation: "fadeSlideUp 0.2s ease-out",
              }}
            >
              {s.icon}
              <span>{s.label}</span>
            </a>
          ))}
        </div>
      )}
      {/* Круглая кнопка */}
      <button
        data-socials-btn
        onClick={() => setOpen(v => !v)}
        style={{
          width: 58, height: 58, borderRadius: "50%",
          background: open
            ? "linear-gradient(135deg,#f43f5e,#e11d48)"
            : "linear-gradient(135deg,#7c3aed,#a855f7)",
          boxShadow: "0 6px 24px rgba(124,58,237,0.5)",
          border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.2s",
          animation: open ? "none" : "phonePulse 2.5s ease-in-out infinite",
        }}
        aria-label={open ? "Закрыть" : "Наши соцсети"}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
          </svg>
        )}
      </button>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity:0; transform:translateY(12px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>
    </div>
  )
}

export function SiteHeader() {
  const navigate = useNavigate()
  const location = useLocation()
  const { count } = useFavorites()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isHome = location.pathname === "/"

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const hasModal = document.body.classList.contains("modal-open") ||
        !!document.querySelector("[data-modal-open]")
      setHidden(hasModal)
    })
    observer.observe(document.body, { attributes: true, childList: true, subtree: false })
    return () => observer.disconnect()
  }, [])

  const go = (path: string) => {
    setMobileMenuOpen(false)
    if (path === "#reviews") {
      if (location.pathname === "/") {
        document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" })
      } else {
        navigate("/")
        setTimeout(() => document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" }), 400)
      }
    } else if (path === "#socials") {
      // Открываем кнопку соцсетей — эмулируем клик по ней
      const btn = document.querySelector("[data-socials-btn]") as HTMLButtonElement | null
      btn?.click()
    } else if (path === "#popular") {
      if (location.pathname === "/") {
        document.getElementById("popular")?.scrollIntoView({ behavior: "smooth" })
      } else {
        navigate("/")
        setTimeout(() => document.getElementById("popular")?.scrollIntoView({ behavior: "smooth" }), 400)
      }
    } else {
      navigate(path)
    }
  }

  const isCompact = !isHome
  const logo = isCompact ? LOGO_COMPACT : LOGO_FULL
  const showBg = isCompact || scrolled

  return (
    <>
      {/* ============================================================
          ДЕСКТОП (md+) — без изменений
      ============================================================ */}
      <header
        data-site-header
        className="hidden md:flex"
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          alignItems: "center",
          justifyContent: "space-between",
          padding: isCompact ? "0px 20px 0px 8px" : "0px 24px 0px 8px",
          height: isCompact ? "clamp(60px, 7.5vw, 86px)" : "clamp(80px, 11vw, 128px)",
          background: showBg ? "rgba(242,237,255,0.97)" : "transparent",
          backdropFilter: showBg ? "blur(14px)" : "none",
          boxShadow: showBg ? "0 3px 24px rgba(124,58,237,0.13)" : "none",
          borderBottom: showBg ? "1px solid rgba(167,139,250,0.2)" : "none",
          transition: "all 0.3s ease",
          opacity: hidden ? 0 : 1,
          pointerEvents: hidden ? "none" : "auto",
          transform: hidden ? "translateY(-100%)" : "translateY(0)",
        }}
      >
        <img
          src={logo}
          alt="Шаровик Затейник"
          onClick={() => {
            if (location.pathname === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" })
            } else {
              navigate("/")
              setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100)
            }
          }}
          style={{
            height: isCompact ? "clamp(40px, 5vw, 64px)" : "clamp(60px, 8.5vw, 115px)",
            width: "auto", cursor: "pointer",
            filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.12))",
            flexShrink: 0,
            marginLeft: "clamp(20px, 3vw, 48px)",
            marginTop: isCompact ? "0px" : "12px",
            transition: "all 0.3s ease",
          }}
        />
        <nav style={{
          display: "flex", alignItems: "center",
          gap: "clamp(10px, 2.4vw, 38px)",
          position: "absolute", left: "50%",
          transform: "translateX(-50%)",
          top: isCompact ? "50%" : "42px",
          marginTop: isCompact ? "-14px" : "0",
        }}>
          {NAV_DESKTOP.map((item) => (
            <button
              key={item.label}
              onClick={() => go(item.path)}
              style={{
                background: "transparent", border: "none", cursor: "pointer",
                padding: "6px 4px",
                fontSize: "clamp(13px, 1.25vw, 17px)", fontWeight: 700,
                fontFamily: "'Montserrat', sans-serif", color: "#1a1a1a",
                whiteSpace: "nowrap", transition: "color 0.2s, transform 0.15s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#7c3aed"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)" }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#1a1a1a"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)" }}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(8px,1vw,16px)", flexShrink: 0, marginTop: isCompact ? "-4px" : "6px", marginRight: "clamp(4px,0.5vw,12px)" }}>
          <a href="tel:+79880653700" style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "linear-gradient(135deg, #7c3aed, #a855f7)", color: "#fff",
            borderRadius: 999,
            padding: isCompact ? "clamp(7px,0.85vh,10px) clamp(12px,1.3vw,20px)" : "clamp(10px,1.1vh,14px) clamp(16px,1.7vw,26px)",
            fontWeight: 800, fontSize: isCompact ? "clamp(12px, 1.15vw, 15px)" : "clamp(13px, 1.3vw, 18px)",
            fontFamily: "'Montserrat', sans-serif", textDecoration: "none", whiteSpace: "nowrap",
            flexShrink: 0, animation: "phonePulse 2.5s ease-in-out infinite",
          }}>
            📞 +7 988 065 37 00
          </a>
          <button
            onClick={() => navigate("/favorites")}
            style={{
              position: "relative", display: "flex", alignItems: "center", justifyContent: "center",
              width: isCompact ? 36 : 44, height: isCompact ? 36 : 44,
              borderRadius: "50%",
              background: count > 0 ? "linear-gradient(135deg,#fce7f3,#fdf2f8)" : "rgba(124,58,237,0.08)",
              border: count > 0 ? "2px solid #f9a8d4" : "2px solid transparent",
              cursor: "pointer", transition: "all 0.2s", flexShrink: 0,
            }}
            title="Избранное"
          >
            <svg width={isCompact ? 20 : 24} height={isCompact ? 20 : 24} viewBox="0 0 24 24"
              fill={count > 0 ? "#f43f5e" : "none"} stroke={count > 0 ? "#f43f5e" : "#7c3aed"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            {count > 0 && (
              <span style={{
                position: "absolute", top: -4, right: -4,
                background: "linear-gradient(135deg,#f97316,#e63000)",
                color: "#fff", fontSize: 10, fontWeight: 800,
                borderRadius: "50%", minWidth: 18, height: 18,
                display: "flex", alignItems: "center", justifyContent: "center", padding: "0 3px",
              }}>{count}</span>
            )}
          </button>
        </div>
      </header>

      {/* ============================================================
          МОБИЛЬНЫЙ ХЕДЕР (< md)
          Структура: [бургер] [телефон по центру] [избранное]
      ============================================================ */}
      <header
        className="flex md:hidden"
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 12px",
          height: 56,
          background: showBg ? "rgba(242,237,255,0.97)" : "transparent",
          backdropFilter: showBg ? "blur(14px)" : "none",
          boxShadow: showBg ? "0 2px 16px rgba(124,58,237,0.12)" : "none",
          borderBottom: showBg ? "1px solid rgba(167,139,250,0.18)" : "none",
          transition: "all 0.3s ease",
          opacity: hidden ? 0 : 1,
          pointerEvents: hidden ? "none" : "auto",
          transform: hidden ? "translateY(-100%)" : "translateY(0)",
        }}
      >
        {/* Кнопка-бургер (слева) */}
        <button
          onClick={() => setMobileMenuOpen(v => !v)}
          style={{
            width: 42, height: 42, borderRadius: 12, border: "none",
            background: "rgba(124,58,237,0.10)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", flexShrink: 0,
          }}
          aria-label="Меню"
        >
          {mobileMenuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="5.5" width="18" height="2.5" rx="1.25" fill="#7c3aed"/>
              <rect x="3" y="10.75" width="18" height="2.5" rx="1.25" fill="#7c3aed"/>
              <rect x="3" y="16" width="18" height="2.5" rx="1.25" fill="#7c3aed"/>
            </svg>
          )}
        </button>

        {/* Телефон по центру */}
        <a
          href="tel:+79880653700"
          style={{
            display: "flex", alignItems: "center", gap: 5,
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            color: "#fff", borderRadius: 999,
            padding: "7px 11px",
            fontWeight: 800, fontSize: 13,
            fontFamily: "'Montserrat', sans-serif",
            textDecoration: "none", whiteSpace: "nowrap",
            animation: "phonePulse 2.5s ease-in-out infinite",
          }}
        >
          📞 +7 988 065 37 00
        </a>

        {/* Избранное (справа) */}
        <button
          onClick={() => navigate("/favorites")}
          style={{
            position: "relative", width: 42, height: 42,
            borderRadius: "50%", border: "none",
            background: count > 0 ? "linear-gradient(135deg,#fce7f3,#fdf2f8)" : "rgba(124,58,237,0.08)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", flexShrink: 0,
          }}
          title="Избранное"
        >
          <svg width="22" height="22" viewBox="0 0 24 24"
            fill={count > 0 ? "#f43f5e" : "none"}
            stroke={count > 0 ? "#f43f5e" : "#7c3aed"}
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          {count > 0 && (
            <span style={{
              position: "absolute", top: 2, right: 2,
              background: "#e63000", color: "#fff",
              fontSize: 9, fontWeight: 800,
              borderRadius: "50%", minWidth: 15, height: 15,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>{count}</span>
          )}
        </button>
      </header>

      {/* ============================================================
          МОБИЛЬНОЕ ВЫДВИЖНОЕ МЕНЮ
      ============================================================ */}
      {mobileMenuOpen && (
        <div
          className="md:hidden"
          style={{ position: "fixed", inset: 0, zIndex: 99 }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)" }} />
          <div
            style={{
              position: "absolute", top: 0, left: 0, bottom: 0, width: 280,
              background: "#fff", boxShadow: "4px 0 32px rgba(0,0,0,0.15)",
              display: "flex", flexDirection: "column",
              paddingTop: 72,
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Логотип в меню — новый, большой, по центру */}
            <div style={{ padding: "0 12px 16px", borderBottom: "1px solid #f0ebff", display: "flex", justifyContent: "center" }}>
              <img
                src={LOGO_MENU}
                alt="Шаровик Затейник"
                style={{ height: 110, width: "auto", objectFit: "contain", cursor: "pointer" }}
                onClick={() => { navigate("/"); setMobileMenuOpen(false) }}
              />
            </div>
            {/* Пункты меню */}
            <nav style={{ flex: 1, padding: "12px 8px" }}>
              {NAV_MOBILE.map(item => (
                <button
                  key={item.label}
                  onClick={() => go(item.path)}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", gap: 14,
                    padding: "14px 16px", borderRadius: 14, border: "none",
                    background: "transparent", cursor: "pointer", textAlign: "left",
                    fontSize: 16, fontWeight: 700,
                    fontFamily: "'Montserrat', sans-serif", color: "#1a1a1a",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#f5f0ff"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
                >
                  <span style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: "rgba(124,58,237,0.10)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18, flexShrink: 0,
                  }}>{item.emoji}</span>
                  {item.label}
                </button>
              ))}
            </nav>
            {/* Телефоны */}
            <div style={{ padding: "16px 20px", borderTop: "1px solid #f0ebff" }}>
              <a href="tel:+79885973303" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#555", textDecoration: "none", marginBottom: 6 }}>
                📞 8 988 597 33 03
              </a>
              <a href="tel:+79182457204" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#555", textDecoration: "none" }}>
                📞 8 918 245 72 04
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
          КНОПКА СОЦСЕТЕЙ — всегда в правом нижнем углу на мобайле
      ============================================================ */}
      <div className="md:hidden">
        <FloatingSocialsBtn />
      </div>
    </>
  )
}