import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import Icon from "@/components/ui/icon"
import { useFavorites } from "@/context/FavoritesContext"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { count } = useFavorites()

  const handlePopular = () => {
    if (location.pathname === "/") {
      const el = document.getElementById("popular")
      if (el) el.scrollIntoView({ behavior: "smooth" })
    } else {
      navigate("/#popular")
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Закрываем меню при смене страницы
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  const isHome = location.pathname === "/"

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-xl border-b border-border shadow-sm" : "bg-transparent"}`}>
        <div className="w-full mx-auto px-3 sm:px-8 lg:px-10">
          {/* === МОБИЛЬНЫЙ ХЕДЕР === */}
          <div className="flex md:hidden items-center justify-between h-14">

            {/* Кнопка меню слева — 3 горизонтальные черточки */}
            <button
              className="p-2 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(124,58,237,0.10)" }}
              onClick={() => setIsMobileMenuOpen(v => !v)}
              aria-label="Меню"
            >
              {isMobileMenuOpen
                ? <X size={22} className="text-primary" />
                : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
                    <rect x="3" y="6" width="18" height="2.5" rx="1.25" fill="currentColor"/>
                    <rect x="3" y="10.75" width="18" height="2.5" rx="1.25" fill="currentColor"/>
                    <rect x="3" y="15.5" width="18" height="2.5" rx="1.25" fill="currentColor"/>
                  </svg>
                )
              }
            </button>

            {/* Логотип по центру — только на главной (в hero) */}
            {isHome ? (
              <div style={{ width: 40 }} />
            ) : (
              <div
                className="cursor-pointer flex-1 flex justify-center"
                onClick={() => navigate("/")}
              >
                <img
                  src="https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/11bed93d-83b2-4394-b230-5a71a39a7427.png"
                  alt="Шаровик Затейник"
                  className="h-9 w-auto object-contain"
                />
              </div>
            )}

            {/* Правая сторона: телефон + избранное */}
            <div className="flex items-center gap-1">
              <a
                href="tel:+79880653700"
                className="flex items-center gap-1.5 text-white font-bold rounded-full px-3 py-1.5 text-sm whitespace-nowrap"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                  fontSize: "0.82rem",
                  letterSpacing: "-0.2px",
                }}
              >
                <Icon name="Phone" size={14} />
                <span>988 065 37 00</span>
              </a>
              <button
                onClick={() => navigate("/favorites")}
                className="relative p-2 rounded-xl"
                style={{ background: "rgba(124,58,237,0.10)" }}
                title="Избранное"
              >
                <Icon name="Heart" className="text-primary" size={22} />
                {count > 0 && (
                  <span
                    className="absolute top-0.5 right-0.5 text-white text-xs font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-0.5"
                    style={{ background: "#e63000", fontSize: "0.6rem" }}
                  >
                    {count}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* === ДЕСКТОП ХЕДЕР === */}
          <div className="hidden md:flex relative items-center justify-between h-24">
            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer" onClick={() => {
              if (location.pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" })
              } else {
                navigate("/")
              }
            }}>
              <img
                src="https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/11bed93d-83b2-4394-b230-5a71a39a7427.png"
                alt="Шаровик Затейник — магазин воздушных шаров"
                className="h-14 md:h-16 w-auto object-contain mt-4"
              />
            </div>

            {/* Desktop nav links — по центру */}
            <div className="flex items-center gap-5 lg:gap-9 absolute left-1/2 -translate-x-1/2">
              {[
                { label: "О нас",    icon: "Star",          action: () => navigate("/about") },
                { label: "Доставка", icon: "Truck",         action: () => navigate("/delivery") },
                { label: "Каталог",  icon: "Balloon",       action: () => navigate("/catalog") },
                { label: "Отзывы",   icon: "MessageCircle", action: handlePopular },
                { label: "Прайс",    icon: "Tag",           action: () => navigate("/contacts") },
              ].map((item) => (
                <span
                  key={item.label}
                  onClick={item.action}
                  className="flex items-center gap-2 text-base font-semibold text-foreground/80 hover:text-primary transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name={item.icon} fallback="Star" className="text-primary" size={18} />
                  </span>
                  {item.label}
                </span>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/favorites")}
                className="relative flex items-center justify-center w-11 h-11 rounded-full hover:bg-primary/10 transition-colors"
                title="Избранное"
              >
                <Icon name="Heart" className="text-primary" size={22} />
                {count > 0 && (
                  <span
                    className="absolute -top-1 -right-1 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1"
                    style={{ background: "linear-gradient(135deg,#f97316,#e63000)", fontSize: "0.7rem" }}
                  >
                    {count}
                  </span>
                )}
              </button>
              <a
                href="tel:+79880653700"
                className="flex items-center gap-2 text-white font-bold rounded-full px-5 whitespace-nowrap"
                style={{
                  height: "2.75rem",
                  fontSize: "1rem",
                  background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                  animation: "phonePulse 2s infinite",
                }}
              >
                <Icon name="Phone" className="h-4 w-4" />
                +7 988 065 37 00
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* === МОБИЛЬНОЕ БОКОВОЕ МЕНЮ === */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {/* затемнение */}
          <div className="absolute inset-0 bg-black/40" />
          {/* панель */}
          <div
            className="absolute top-0 left-0 bottom-0 w-72 bg-white shadow-2xl flex flex-col"
            onClick={e => e.stopPropagation()}
            style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
          >
            {/* Лого в меню */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <img
                src="https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/11bed93d-83b2-4394-b230-5a71a39a7427.png"
                alt="Шаровик Затейник"
                className="h-10 w-auto object-contain"
                onClick={() => { navigate("/"); setIsMobileMenuOpen(false) }}
              />
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                <X size={22} className="text-muted-foreground" />
              </button>
            </div>

            {/* Пункты меню */}
            <nav className="flex-1 px-4 py-4 space-y-1">
              {[
                { label: "О нас",    icon: "Star",          action: () => navigate("/about") },
                { label: "Прайс",    icon: "Tag",           action: () => navigate("/contacts") },
                { label: "Каталог",  icon: "Balloon",       action: () => navigate("/catalog") },
                { label: "Отзывы",   icon: "MessageCircle", action: handlePopular },
                { label: "Доставка", icon: "Truck",         action: () => navigate("/delivery") },
              ].map(item => (
                <button
                  key={item.label}
                  onClick={() => { item.action(); setIsMobileMenuOpen(false) }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left font-semibold text-foreground hover:bg-primary/8 transition-colors"
                  style={{ fontSize: "1rem" }}
                >
                  <span className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon} fallback="Star" className="text-primary" size={18} />
                  </span>
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Телефоны внизу */}
            <div className="px-5 py-4 border-t border-border space-y-2">
              <a href="tel:+79885973303" className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                <Icon name="Phone" className="text-primary" size={16} />
                8 988 597 33 03
              </a>
              <a href="tel:+79182457204" className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                <Icon name="Phone" className="text-primary" size={16} />
                8 918 245 72 04
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}