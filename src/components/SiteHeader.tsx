import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import Icon from "@/components/ui/icon"
import { useFavorites } from "@/context/FavoritesContext"

const NAV_LINKS = [
  { label: "Каталог",   target: "catalog-cta" },
  { label: "Популярное", path: "/popular" },
  { label: "Доставка",  path: "/delivery" },
  { label: "Контакты",  path: "/contacts" },
]

const NAV_MOBILE = [
  { label: "Каталог",   target: "catalog-cta",      icon: "PartyPopper" },
  { label: "Популярное", path: "/popular",           icon: "Sparkles" },
  { label: "Доставка",  path: "/delivery", icon: "Truck" },
  { label: "Контакты",  path: "/contacts", icon: "Phone" },
]

const CATALOG_CATEGORIES = [
  { label: "Для неё",           path: "/catalog/girl" },
  { label: "Для него",          path: "/catalog/man" },
  { label: "Для мальчика",      path: "/catalog/boy" },
  { label: "Для девочки",       path: "/catalog/kid-girl" },
  { label: "Выписка мальчика",  path: "/catalog/boy-discharge" },
  { label: "Выписка девочки",   path: "/catalog/girl-discharge" },
]

export function SiteHeader() {
  const navigate = useNavigate()
  const location = useLocation()
  const { count } = useFavorites()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [catalogMenuOpen, setCatalogMenuOpen] = useState(false)
  const [catalogAccordionOpen, setCatalogAccordionOpen] = useState(false)
  const catalogMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!catalogMenuOpen) return
    const handler = (e: MouseEvent) => {
      if (catalogMenuRef.current && !catalogMenuRef.current.contains(e.target as Node)) {
        setCatalogMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [catalogMenuOpen])

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

  const goToSection = (id: string) => {
    setMobileMenuOpen(false)
    if (location.pathname === "/") {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: "smooth" })
    } else {
      navigate(`/#${id}`)
    }
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
          style={{ cursor: "pointer", lineHeight: 1.05, userSelect: "none", display: "flex", alignItems: "center", gap: 8, marginLeft: "clamp(20px,6vw,140px)" }}
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
            item.target ? (
              <div key={item.label} ref={catalogMenuRef} style={{ position: "relative" }}>
                <button
                  onClick={() => setCatalogMenuOpen(v => !v)}
                  style={{
                    background: "transparent", border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 4,
                    fontFamily: "'Montserrat', sans-serif", fontWeight: 500,
                    fontSize: "clamp(14px,0.95vw,16px)",
                    color: catalogMenuOpen ? "#7c3aed" : "#3a2d4d",
                    transition: "color 0.2s", whiteSpace: "nowrap",
                    padding: "6px 2px",
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#7c3aed"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = catalogMenuOpen ? "#7c3aed" : "#3a2d4d"}
                >
                  {item.label}
                  <Icon name="ChevronDown" size={14} style={{ transform: catalogMenuOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                </button>
                {catalogMenuOpen && (
                  <div
                    style={{
                      position: "absolute", top: "calc(100% + 12px)", left: "50%", transform: "translateX(-50%)",
                      background: "#fff", borderRadius: 18, boxShadow: "0 16px 40px rgba(124,58,237,0.16)",
                      border: "1px solid #ece4fb", padding: 8, minWidth: 200, zIndex: 200,
                      display: "flex", flexDirection: "column", gap: 2,
                    }}
                  >
                    {CATALOG_CATEGORIES.map(cat => (
                      <button
                        key={cat.path}
                        onClick={() => { setCatalogMenuOpen(false); go(cat.path) }}
                        style={{
                          padding: "10px 14px", borderRadius: 12, border: "none",
                          background: "transparent", cursor: "pointer", textAlign: "left",
                          fontFamily: "'Montserrat', sans-serif", fontWeight: 500,
                          fontSize: "clamp(14px,0.95vw,16px)",
                          color: "#3a2d4d", transition: "background 0.15s", whiteSpace: "nowrap",
                        }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#f5f0ff"}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button
                key={item.label}
                onClick={() => go(item.path!)}
                style={{
                  background: "transparent", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 4,
                  fontFamily: "'Montserrat', sans-serif", fontWeight: 500,
                  fontSize: "clamp(14px,0.95vw,16px)",
                  color: item.path && location.pathname === item.path ? "#7c3aed" : "#3a2d4d",
                  transition: "color 0.2s", whiteSpace: "nowrap",
                  padding: "6px 2px",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#7c3aed"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = item.path && location.pathname === item.path ? "#7c3aed" : "#3a2d4d"}
              >
                {item.label}
              </button>
            )
          ))}
        </nav>

        {/* Правая часть: телефон + избранное */}
        <div style={{ display: "flex", alignItems: "center", gap: "clamp(14px,1.6vw,26px)", marginRight: "clamp(20px,6vw,140px)" }}>
          <a
            href="tel:+79885973303"
            style={{
              display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.7"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
          >
            <span style={{
              fontFamily: "'Nunito', sans-serif", fontWeight: 300,
              fontSize: "clamp(17px,1.4vw,20px)", color: "#3a2d4d",
              whiteSpace: "nowrap", letterSpacing: "1px",
              fontVariantNumeric: "tabular-nums",
            }}>
              +7 988 597 33 03
            </span>
            <span style={{
              width: 22, height: 1.5, borderRadius: 1,
              background: "linear-gradient(90deg, transparent, #a855f7)",
            }} />
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
          padding: "0 16px", height: 58,
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
            width: 40, height: 40, borderRadius: 11, border: "none",
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

        <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
          <a
            href="tel:+79885973303"
            style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1 }}
          >
            <span style={{
              fontFamily: "'Nunito', sans-serif", fontWeight: 300,
              fontSize: 15, color: "#3a2d4d", whiteSpace: "nowrap",
              letterSpacing: "0.7px",
              fontVariantNumeric: "tabular-nums",
            }}>
              +7 988 597 33 03
            </span>
            <span style={{
              width: 18, height: 1.5, borderRadius: 1,
              background: "linear-gradient(90deg, transparent, #a855f7)",
            }} />
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
            <Icon name="Heart" size={21} color={count > 0 ? "#a855f7" : "#3a2d4d"} fill={count > 0 ? "#a855f7" : "none"} />
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
              display: "flex", flexDirection: "column", paddingTop: 58,
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid #ece4fb", display: "flex", justifyContent: "center" }}>
              <div
                onClick={() => { navigate("/"); setMobileMenuOpen(false) }}
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 23, color: "#1a1024", cursor: "pointer", lineHeight: 1.15, textAlign: "center", display: "flex", alignItems: "center", gap: 6 }}
              >
                Victoria Balloons
                <span style={{ fontSize: 19, color: "#a855f7", marginTop: -18 }}>✦</span>
              </div>
            </div>
            <nav style={{ flex: 1, padding: "12px 8px", overflowY: "auto" }}>
              {NAV_MOBILE.map(item => (
                item.target ? (
                  <div key={item.label}>
                    <button
                      onClick={() => setCatalogAccordionOpen(v => !v)}
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
                      <span style={{ flex: 1 }}>{item.label}</span>
                      <Icon name="ChevronDown" size={16} style={{ color: "#8a7d9c", transform: catalogAccordionOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                    </button>
                    {catalogAccordionOpen && (
                      <div style={{ paddingLeft: 12, display: "flex", flexDirection: "column", gap: 2, marginBottom: 4 }}>
                        {CATALOG_CATEGORIES.map(cat => (
                          <button
                            key={cat.path}
                            onClick={() => go(cat.path)}
                            style={{
                              display: "flex", alignItems: "center", gap: 10,
                              padding: "11px 16px", borderRadius: 12, border: "none",
                              background: "transparent", cursor: "pointer", textAlign: "left",
                              fontSize: 14.5, fontWeight: 600,
                              fontFamily: "'Montserrat', sans-serif", color: "#3a2d4d",
                            }}
                            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#f5f0ff"}
                            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
                          >
                            {cat.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    key={item.label}
                    onClick={() => go(item.path!)}
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
                )
              ))}
            </nav>
            <div style={{ padding: "18px 20px", borderTop: "1px solid #ece4fb", display: "flex", flexDirection: "column", gap: 13 }}>
              <a href="tel:+79885973303" style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#5c5468", textDecoration: "none", fontWeight: 500 }}>
                <Icon name="Phone" size={15} className="text-primary" />
                8 988 597 33 03
              </a>
              <a
                href="https://max.ru/u/f9LHodD0cOJaX4tw2o5-lz7x0FHW8670cB9_7ZXIWxHIb2weTABpieYxM9s"
                target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#5c5468", textDecoration: "none", fontWeight: 500 }}
              >
                <Icon name="Flame" size={15} style={{ color: "#1e3a5f" }} />
                Max
              </a>
              <a
                href="https://t.me/vikashariki"
                target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#5c5468", textDecoration: "none", fontWeight: 500 }}
              >
                <Icon name="Send" size={15} style={{ color: "#229ED9" }} />
                Telegram
              </a>
              <a
                href="https://wa.me/message/SIGCSZPAMQ34J1"
                target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#5c5468", textDecoration: "none", fontWeight: 500 }}
              >
                <Icon name="MessageCircle" size={15} style={{ color: "#25D366" }} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}