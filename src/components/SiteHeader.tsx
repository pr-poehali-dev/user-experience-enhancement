import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { useFavorites } from "@/context/FavoritesContext"

const LOGO_FULL = "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/0bd60024-d203-4687-8ece-19f097927434.png"
const LOGO_COMPACT = "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9eef4dd7-63f9-4820-bcbd-49aa233a21f2.png"

const NAV = [
  { label: "О нас",     path: "/about",    svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg> },
  { label: "Прайс",    path: "/contacts", svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="12" y2="16"/></svg> },
  { label: "Каталог",  path: "/catalog",  svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="11" r="7"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M9 8 Q10 6 12 7" strokeWidth="2.4"/></svg> },
  { label: "Отзывы",   path: "#reviews",  svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
  { label: "Доставка", path: "/delivery", svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> },
]

export function SiteHeader() {
  const navigate = useNavigate()
  const location = useLocation()
  const { count } = useFavorites()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const isHome = location.pathname === "/"

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Скрываем шапку когда открыт модал (по классу на body или data-атрибуту)
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
    if (path === "#reviews") {
      if (location.pathname === "/") {
        document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" })
      } else {
        navigate("/")
        setTimeout(() => document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" }), 400)
      }
    } else {
      navigate(path)
    }
  }

  const isCompact = !isHome
  const logo = isCompact ? LOGO_COMPACT : LOGO_FULL
  const showBg = isCompact || scrolled

  return (
    <header
      data-site-header
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        display: "flex",
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
      {/* Логотип */}
      <img
        src={logo}
        alt="Шаровик Затейник"
        onClick={() => navigate("/")}
        style={{
          height: isCompact ? "clamp(40px, 5vw, 64px)" : "clamp(60px, 8.5vw, 115px)",
          width: "auto",
          cursor: "pointer",
          filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.12))",
          flexShrink: 0,
          marginLeft: "clamp(20px, 3vw, 48px)",
          marginTop: isCompact ? "0px" : "12px",
          transition: "all 0.3s ease",
        }}
      />

      {/* Навигация */}
      <nav style={{
        display: "flex",
        alignItems: "center",
        gap: "clamp(10px, 2.4vw, 38px)",
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
        top: isCompact ? "50%" : "42px",
        marginTop: isCompact ? "-14px" : "0",
      }}>
        {NAV.map((item) => (
          <button
            key={item.label}
            onClick={() => go(item.path)}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "transparent", border: "none", cursor: "pointer",
              padding: "6px 4px",
              fontSize: "clamp(13px, 1.25vw, 17px)",
              fontWeight: 700,
              fontFamily: "'Montserrat', sans-serif",
              color: "#1a1a1a",
              whiteSpace: "nowrap",
              transition: "color 0.2s, transform 0.15s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = "#7c3aed"
              ;(e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = "#1a1a1a"
              ;(e.currentTarget as HTMLElement).style.transform = "translateY(0)"
            }}
          >
            <span style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>{item.svg}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Правая часть: Телефон + Избранное */}
      <div style={{ display: "flex", alignItems: "center", gap: "clamp(8px,1vw,14px)", flexShrink: 0, marginTop: isCompact ? 0 : "12px" }}>
        {/* Телефон */}
        <a
          href="tel:+79880653700"
          style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            color: "#fff",
            borderRadius: 999,
            padding: isCompact ? "clamp(7px,0.9vh,10px) clamp(12px,1.4vw,20px)" : "clamp(10px,1.2vh,15px) clamp(16px,1.8vw,28px)",
            fontWeight: 800,
            fontSize: isCompact ? "clamp(12px, 1.2vw, 16px)" : "clamp(14px, 1.4vw, 20px)",
            fontFamily: "'Montserrat', sans-serif",
            textDecoration: "none",
            whiteSpace: "nowrap",
            flexShrink: 0,
            animation: "phonePulse 2s infinite",
            transition: "transform 0.2s",
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.transform = "scale(1.06)")}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")}
        >
          📞 +7 988 065 37 00
        </a>

        {/* Кнопка Избранного */}
        <button
          onClick={() => navigate("/favorites")}
          style={{
            position: "relative",
            display: "flex", alignItems: "center", justifyContent: "center",
            width: isCompact ? 40 : 48,
            height: isCompact ? 40 : 48,
            borderRadius: "50%",
            background: count > 0 ? "linear-gradient(135deg,#fce7f3,#fdf2f8)" : "rgba(124,58,237,0.08)",
            border: count > 0 ? "2px solid #f9a8d4" : "2px solid transparent",
            cursor: "pointer",
            transition: "all 0.2s",
            flexShrink: 0,
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.transform = "scale(1.1)")}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")}
          title="Избранное"
        >
          <svg
            width={isCompact ? 20 : 24}
            height={isCompact ? 20 : 24}
            viewBox="0 0 24 24"
            fill={count > 0 ? "#f43f5e" : "none"}
            stroke={count > 0 ? "#f43f5e" : "#7c3aed"}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          {count > 0 && (
            <span style={{
              position: "absolute",
              top: -4, right: -4,
              background: "linear-gradient(135deg,#f97316,#e63000)",
              color: "#fff",
              borderRadius: 999,
              minWidth: 18,
              height: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.68rem",
              fontWeight: 800,
              fontFamily: "'Montserrat',sans-serif",
              padding: "0 4px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            }}>
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}