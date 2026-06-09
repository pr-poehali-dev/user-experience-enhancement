import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

const LOGO_FULL = "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2b7aa5e7-076f-477e-9c08-2524b06cad6a.png"
const LOGO_COMPACT = "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9eef4dd7-63f9-4820-bcbd-49aa233a21f2.png"

const NAV = [
  { label: "О нас",     path: "/about",    svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg> },
  { label: "Прайс",    path: "/contacts", svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="12" y2="16"/></svg> },
  { label: "Каталог",  path: "/catalog",  svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="11" r="7"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M9 8 Q10 6 12 7" strokeWidth="2.4"/></svg> },
  { label: "Отзывы",   path: "#popular",  svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
  { label: "Доставка", path: "/delivery", svg: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> },
]

export function SiteHeader() {
  const navigate = useNavigate()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const isHome = location.pathname === "/"

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const go = (path: string) => {
    if (path === "#popular") {
      document.getElementById("popular")?.scrollIntoView({ behavior: "smooth" })
    } else {
      navigate(path)
    }
  }

  const isCompact = !isHome
  const logo = isCompact ? LOGO_COMPACT : LOGO_FULL

  return (
    <header style={{
      position: "fixed",
      top: 0, left: 0, right: 0,
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: isCompact ? "0px 28px 0px 8px" : "0px 32px 0px 8px",
      height: isCompact ? "clamp(60px, 7.5vw, 86px)" : "clamp(80px, 11vw, 128px)",
      background: (isCompact || scrolled) ? "rgba(242,237,255,0.97)" : "transparent",
      backdropFilter: (isCompact || scrolled) ? "blur(14px)" : "none",
      boxShadow: (isCompact || scrolled) ? "0 3px 24px rgba(124,58,237,0.13)" : "none",
      borderBottom: (isCompact || scrolled) ? "1px solid rgba(167,139,250,0.2)" : "none",
      transition: "all 0.3s ease",
    }}>
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
          marginLeft: "clamp(8px, 2vw, 32px)",
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
          marginTop: isCompact ? "0px" : "12px",
        }}
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.transform = "scale(1.06)")}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")}
      >
        📞 +7 988 065 37 00
      </a>
    </header>
  )
}