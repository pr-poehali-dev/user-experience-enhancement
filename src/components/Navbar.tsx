import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Icon from "@/components/ui/icon"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showCatalogBtn, setShowCatalogBtn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const vh = window.innerHeight
      setIsScrolled(scrollY > 20)
      setShowCatalogBtn(scrollY > vh * 0.8)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-xl border-b border-border shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="https://cdn.poehali.dev/files/067decf6-cc51-47c4-b8e7-f586768c16bf.png"
              alt="Шарим — студия аэродизайна"
              className="h-12 sm:h-16 md:h-20 w-auto object-contain mt-2 sm:mt-3"
            />
          </div>

          {/* Desktop Navigation — либо ссылки, либо кнопка каталога */}
          <div className="hidden md:flex items-center gap-8">
            {showCatalogBtn ? (
              <Button
                onClick={() => navigate("/catalog")}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 shadow-lg transition-all duration-300"
                style={{ height: "3rem", fontSize: "1.1rem" }}
              >
                Смотреть каталог
                <Icon name="ArrowRight" className="ml-2 h-5 w-5" />
              </Button>
            ) : (
              <>
                <a href="#categories" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Каталог</a>
                <a href="#popular" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Популярное</a>
                <a href="#about" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">О нас</a>
                <a href="#contact" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">Контакты</a>
              </>
            )}
          </div>

          {/* Right — телефон + кнопка */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+79885973303"
              className="flex items-center gap-1.5 text-sm text-foreground/70 hover:text-primary transition-colors"
            >
              <Icon name="Phone" className="h-4 w-4 text-primary" />
              8 988 597 33 03
            </a>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-5">
              Заказать
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-border">
          <div className="px-6 py-6 space-y-4">
            <a href="#categories" className="block text-base font-medium text-foreground/70 hover:text-foreground">Каталог</a>
            <a href="#popular" className="block text-base font-medium text-foreground/70 hover:text-foreground">Популярное</a>
            <a href="#about" className="block text-base font-medium text-foreground/70 hover:text-foreground">О нас</a>
            <a href="#contact" className="block text-base font-medium text-foreground/70 hover:text-foreground">Контакты</a>
            <a href="tel:+79885973303" className="flex items-center gap-2 text-sm text-foreground/70">
              <Icon name="Phone" className="h-4 w-4 text-primary" />
              8 988 597 33 03
            </a>
            <Button
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
              onClick={() => { navigate("/catalog"); setIsMobileMenuOpen(false) }}
            >
              Смотреть каталог
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
