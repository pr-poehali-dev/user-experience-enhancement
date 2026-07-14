import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import Icon from "@/components/ui/icon"
import { useFavorites } from "@/context/FavoritesContext"

const NAV_LINKS = [
  { label: "Каталог",  path: "/catalog" },
  { label: "О нас",    path: "/about" },
  { label: "Доставка и оплата", path: "/delivery" },
  { label: "Контакты", path: "/contacts" },
]

const NAV_MOBILE = [
  { label: "Каталог",  path: "/catalog",  icon: "Balloon" },
  { label: "О нас",    path: "/about",    icon: "Info" },
  { label: "Доставка и оплата", path: "/delivery", icon: "Truck" },
  { label: "Контакты", path: "/contacts", icon: "Phone" },
]

export function SiteHeader() {
  const navigate = useNavigate()
  const location = useLocation()
  const { count } = useFavorites()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
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
    navigate(path)
    setTimeout(() => window.scrollTo({ top: 0, behavior: "instant" }), 0)
  }

  const goHome = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      navigate("/")
      setTimeout(() => window.scrollTo({ top: 0, behavior: "instant" }), 0)
    }
  }

  return (
    <>
      {/* ============ ДЕСКТОП ============ */}
      <header
        data-site-header
        className="hidden md:flex"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          alignItems: "center", justifyContent: "space-between",
          padding: "0 clamp(24px,3vw,56px)",
          height: 84,
          background: scrolled ? "rgba(255,255,255,0.92)" : "#fff",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid #ece4fb",
          boxShadow: scrolled ? "0 4px 20px rgba(124,58,237,0.06)" : "none",
          transition: "all 0.25s ease",
          opacity: hidden ? 0 : 1,
          pointerEvents: hidden ? "none" : "auto",
          transform: hidden ? "translateY(-100%)" : "translateY(0)",
        }}
      >
        {/* Логотип текстовый */}
        <div
          onClick={goHome}
          style={{ cursor: "pointer", lineHeight: 1.05, userSelect: "none", display: "flex", alignItems: "center", gap: 8, marginLeft: "clamp(20px,3vw,64px)" }}
        >
          <div style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 600,
            fontSize: "clamp(20px,1.7vw,26px)", color: "#1a1024",
            whiteSpace: "nowrap",
          }}>
            Victoria Balloons
          </div>
          <span style={{ fontSize: 18, color: "#a855f7", marginTop: -18 }}>✦</span>
        </div>

        {/* Навигация по центру */}
        <nav style={{
          display: "flex", alignItems: "center", gap: "clamp(20px,2.4vw,44px)",
          position: "absolute", left: "50%", transform: "translateX(-50%)",
        }}>
          {NAV_LINKS.map(item => (
            <button
              key={item.label}
              onClick={() => go(item.path)}
              style={{
                background: "transparent", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 4,
                fontFamily: "'Montserrat', sans-serif", fontWeight: 500,
                fontSize: "clamp(14px,0.95vw,16px)",
                color: location.pathname === item.path ? "#7c3aed" : "#3a2d4d",
                transition: "color 0.2s", whiteSpace: "nowrap",
                padding: "6px 2px",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#7c3aed"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = location.pathname === item.path ? "#7c3aed" : "#3a2d4d"}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Правая часть: телефон + избранное */}
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(14px,1.6vw,26px)", marginRight: "clamp(20px,3vw,64px)" }}>
          <a
            href="tel:+79885973303"
            style={{
              display: "flex", alignItems: "center", gap: 10,
              color: "#3a2d4d",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#7c3aed"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#3a2d4d"}
          >
            <span style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "rgba(124,58,237,0.07)", color: "#7c3aed",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <Icon name="Phone" size={18} />
            </span>
            <span style={{
              fontFamily: "'Montserrat', sans-serif", fontWeight: 600,
              fontSize: "clamp(18px,1.5vw,24px)", whiteSpace: "nowrap",
            }}>
              8 988 597 33 03
            </span>
          </a>
          <button
            onClick={() => navigate("/favorites")}
            style={{
              position: "relative", display: "flex", alignItems: "center", justifyContent: "center",
              width: 38, height: 38, cursor: "pointer",
            }}
            title="Избранное"
          >
            <Icon name="Heart" size={22} color={count > 0 ? "#a855f7" : "#3a2d4d"} fill={count > 0 ? "#a855f7" : "none"} />
            <span style={{
              position: "absolute", top: -2, right: -2,
              background: count > 0 ? "#a855f7" : "#c4b5fd", color: "#fff", fontSize: 10, fontWeight: 700,
              borderRadius: "50%", minWidth: 17, height: 17,
              display: "flex", alignItems: "center", justifyContent: "center", padding: "0 3px",
            }}>{count}</span>
          </button>
        </div>
      </header>

      {/* ============ МОБИЛЬНЫЙ ХЕДЕР ============ */}
      <header
        className="flex md:hidden"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          alignItems: "center", justifyContent: "space-between",
          padding: "0 14px", height: 58,
          background: "#fff", borderBottom: "1px solid #ece4fb",
          boxShadow: scrolled ? "0 2px 14px rgba(124,58,237,0.07)" : "none",
          transition: "all 0.25s ease",
          opacity: hidden ? 0 : 1,
          pointerEvents: hidden ? "none" : "auto",
          transform: hidden ? "translateY(-100%)" : "translateY(0)",
        }}
      >
        <button
          onClick={() => setMobileMenuOpen(v => !v)}
          style={{
            width: 38, height: 38, borderRadius: 10, border: "none",
            background: "rgba(124,58,237,0.08)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}
          aria-label="Меню"
        >
          {mobileMenuOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="5.5" width="18" height="2.2" rx="1.1" fill="#7c3aed"/>
              <rect x="3" y="10.9" width="18" height="2.2" rx="1.1" fill="#7c3aed"/>
              <rect x="3" y="16.3" width="18" height="2.2" rx="1.1" fill="#7c3aed"/>
            </svg>
          )}
        </button>

        <div onClick={goHome} style={{ cursor: "pointer", textAlign: "center", lineHeight: 1.05 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: 14, color: "#1a1024", whiteSpace: "nowrap" }}>
            Victoria Balloons
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 2, flexShrink: 0 }}>
          <a
            href="tel:+79885973303"
            style={{
              width: 34, height: 34, borderRadius: "50%",
              background: "rgba(124,58,237,0.08)", color: "#7c3aed",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <Icon name="Phone" size={15} />
          </a>
          <button
            onClick={() => navigate("/favorites")}
            style={{
              position: "relative", width: 34, height: 34,
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "none", background: "transparent",
            }}
            title="Избранное"
          >
            <Icon name="Heart" size={19} color={count > 0 ? "#a855f7" : "#3a2d4d"} fill={count > 0 ? "#a855f7" : "none"} />
            <span style={{
              position: "absolute", top: 1, right: 1,
              background: count > 0 ? "#a855f7" : "#c4b5fd", color: "#fff", fontSize: 9, fontWeight: 700,
              borderRadius: "50%", minWidth: 15, height: 15,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>{count}</span>
          </button>
        </div>
      </header>

      {/* ============ МОБИЛЬНОЕ ВЫДВИЖНОЕ МЕНЮ ============ */}
      {mobileMenuOpen && (
        <div
          className="md:hidden"
          style={{ position: "fixed", inset: 0, zIndex: 99 }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div style={{ position: "absolute", inset: 0, background: "rgba(26,16,36,0.45)" }} />
          <div
            style={{
              position: "absolute", top: 0, left: 0, bottom: 0, width: 280,
              background: "#fff", boxShadow: "4px 0 32px rgba(0,0,0,0.15)",
              display: "flex", flexDirection: "column", paddingTop: 64,
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ padding: "0 20px 20px", borderBottom: "1px solid #ece4fb" }}>
              <div
                onClick={() => { navigate("/"); setMobileMenuOpen(false) }}
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: 20, color: "#1a1024", cursor: "pointer", lineHeight: 1.1 }}
              >
                Victoria Balloons
              </div>
            </div>
            <nav style={{ flex: 1, padding: "12px 8px" }}>
              {NAV_MOBILE.map(item => (
                <button
                  key={item.label}
                  onClick={() => go(item.path)}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", gap: 14,
                    padding: "14px 16px", borderRadius: 14, border: "none",
                    background: "transparent", cursor: "pointer", textAlign: "left",
                    fontSize: 16, fontWeight: 600,
                    fontFamily: "'Montserrat', sans-serif", color: "#1a1024",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#f5f0ff"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
                >
                  <span style={{
                    width: 38, height: 38, borderRadius: 12,
                    background: "rgba(124,58,237,0.08)", color: "#7c3aed",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <Icon name={item.icon} size={18} />
                  </span>
                  {item.label}
                </button>
              ))}
            </nav>
            <div style={{ padding: "16px 20px", borderTop: "1px solid #ece4fb" }}>
              <a href="tel:+79885973303" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#555", textDecoration: "none", marginBottom: 6, fontWeight: 600 }}>
                <Icon name="Phone" size={14} className="text-primary" />
                8 988 597 33 03
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}