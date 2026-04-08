import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Icon from "@/components/ui/icon"

const orderContacts = [
  { label: "8 988 597 33 03", href: "tel:+79885973303", icon: "Phone", bg: "linear-gradient(135deg, #fb7185, #e11d48)" },
  { label: "WhatsApp", href: "https://wa.me/79885973303", icon: "MessageSquare", bg: "linear-gradient(135deg, #4ade80, #16a34a)" },
  { label: "Telegram", href: "#", icon: "Send", bg: "linear-gradient(135deg, #60a5fa, #3b82f6)" },
  { label: "ВКонтакте", href: "#", icon: "MessageCircle", bg: "linear-gradient(135deg, #3b82f6, #1d4ed8)" },
  { label: "Instagram", href: "#", icon: "Instagram", bg: "linear-gradient(135deg, #ec4899, #9333ea)" },
  { label: "Max", href: "#", icon: "Flame", bg: "#1e3a5f" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showCatalogBtn, setShowCatalogBtn] = useState(false)
  const [orderOpen, setOrderOpen] = useState(false)
  const orderRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 20)
      setShowCatalogBtn(scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (orderRef.current && !orderRef.current.contains(e.target as Node)) setOrderOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-xl border-b border-border shadow-sm" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16 sm:h-20">

          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate("/")}>
            <img
              src="https://cdn.poehali.dev/files/53388624-09fc-4e5b-be49-44cc6273a16d.png"
              alt="Шарим — студия аэродизайна"
              className="h-8 sm:h-10 md:h-12 w-auto object-contain"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>

          {/* Desktop nav links — по центру */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {showCatalogBtn ? (
              <Button
                onClick={() => navigate("/catalog")}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 shadow-lg"
                style={{ height: "3rem", fontSize: "1.1rem" }}
              >
                Смотреть каталог
                <Icon name="ArrowRight" className="ml-2 h-5 w-5" />
              </Button>
            ) : (
              <>
                <span onClick={() => navigate("/catalog")} className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors cursor-pointer">Каталог</span>
                <a href="#popular" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Популярное</a>
                <a href="#about" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">О нас</a>
                <span onClick={() => navigate("/contacts")} className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors cursor-pointer">Контакты</span>
              </>
            )}
          </div>

          {/* Right side — Заказать с телефонами снизу */}
          <div className="hidden md:flex items-center gap-4">
            {/* Заказать с соцсетями и телефонами */}
            <div className="relative" ref={orderRef}>
              {orderOpen && (
                <div className="absolute top-full right-0 mt-3 flex flex-col items-end gap-2 z-50">
                  {orderContacts.map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg text-white font-semibold text-sm hover:scale-105 transition-transform whitespace-nowrap"
                      style={{ background: c.bg }}
                    >
                      <Icon name={c.icon} size={15} />
                      {c.label}
                    </a>
                  ))}
                </div>
              )}
              <div className="flex flex-col items-end gap-1">
                <Button
                  onClick={() => setOrderOpen((p) => !p)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-5"
                >
                  {orderOpen ? "Закрыть" : "Заказать"}
                  <Icon name={orderOpen ? "X" : "ChevronUp"} className="ml-1.5 h-4 w-4" />
                </Button>
                <div className="flex flex-col items-end gap-0">
                  <a href="tel:+79885973303" className="flex items-center gap-1 text-xs text-foreground/70 hover:text-primary transition-colors">
                    <Icon name="Phone" className="h-3 w-3 text-primary" />
                    8 988 597 33 03
                  </a>
                  <a href="tel:+79182457204" className="flex items-center gap-1 text-xs text-foreground/70 hover:text-primary transition-colors">
                    <Icon name="Phone" className="h-3 w-3 text-primary" />
                    8 918 245 72 04
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile burger */}
          <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-border">
          <div className="px-6 py-6 space-y-4">
            <span onClick={() => { navigate("/catalog"); setIsMobileMenuOpen(false) }} className="block text-base font-medium text-foreground/70 hover:text-foreground cursor-pointer">Каталог</span>
            <a href="#popular" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-medium text-foreground/70 hover:text-foreground">Популярное</a>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-medium text-foreground/70 hover:text-foreground">О нас</a>
            <span onClick={() => { navigate("/contacts"); setIsMobileMenuOpen(false) }} className="block text-base font-medium text-foreground/70 hover:text-foreground cursor-pointer">Контакты</span>
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