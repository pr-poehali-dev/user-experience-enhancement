import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import Icon from "@/components/ui/icon"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showCatalogBtn, setShowCatalogBtn] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

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
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 20)
      setShowCatalogBtn(scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-xl border-b border-border shadow-sm" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16 sm:h-24">

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
              className="h-10 sm:h-14 md:h-16 w-auto object-contain"
            />
          </div>

          {/* Desktop nav links — по центру */}
          <div className="hidden md:flex items-center gap-7 lg:gap-12 absolute left-1/2 -translate-x-1/2">
            {[
              { label: "О нас", icon: "Star", action: () => navigate("/about") },
              { label: "Каталог", icon: "Sparkles", action: () => navigate("/catalog") },
              { label: "Доставка", icon: "Gift", action: () => navigate("/delivery") },
              { label: "Отзывы", icon: "MessageCircle", action: handlePopular },
              { label: "Контакты", icon: "Phone", action: () => navigate("/contacts") },
            ].map((item) => (
              <span
                key={item.label}
                onClick={item.action}
                className="flex items-center gap-2 text-base font-semibold text-foreground/80 hover:text-primary transition-colors cursor-pointer whitespace-nowrap"
              >
                <span className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name={item.icon} className="text-primary" size={18} />
                </span>
                {item.label}
              </span>
            ))}
          </div>

          {/* Right side — номер телефона */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+79880653700"
              className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 shadow-lg font-bold transition-colors"
              style={{ height: "3rem", fontSize: "1.05rem" }}
            >
              <Icon name="Phone" className="h-4 w-4" />
              +7 988 065 37 00
            </a>
          </div>

          {/* Mobile right side */}
          <div className="flex md:hidden items-center gap-2">
            {showCatalogBtn && !isMobileMenuOpen && (
              <button
                onClick={() => window.location.href = "/catalog"}
                className="bg-primary text-primary-foreground rounded-full px-4 py-2 text-sm font-semibold shadow-md"
              >
                Каталог
              </button>
            )}
            <button className="p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-border">
          <div className="px-6 py-6 space-y-4">
            <span onClick={() => { navigate("/about"); setIsMobileMenuOpen(false) }} className="block text-base font-medium text-foreground/70 hover:text-foreground cursor-pointer">О нас</span>
            <span onClick={() => { navigate("/contacts"); setIsMobileMenuOpen(false) }} className="block text-base font-medium text-foreground/70 hover:text-foreground cursor-pointer">Контакты</span>
            <span onClick={() => { navigate("/delivery"); setIsMobileMenuOpen(false) }} className="block text-base font-medium text-foreground/70 hover:text-foreground cursor-pointer">Доставка</span>
            <div className="flex flex-col gap-2 pt-1 border-t border-border">
              <a href="tel:+79885973303" className="flex items-center gap-2 text-sm text-foreground/70 pt-2"><Icon name="Phone" className="h-4 w-4 text-primary" />8 988 597 33 03</a>
              <a href="tel:+79182457204" className="flex items-center gap-2 text-sm text-foreground/70"><Icon name="Phone" className="h-4 w-4 text-primary" />8 918 245 72 04</a>
            </div>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full" onClick={() => { navigate("/catalog"); setIsMobileMenuOpen(false) }}>
              Смотреть каталог
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}