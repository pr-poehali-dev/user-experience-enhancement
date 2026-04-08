import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/465cc8c2-ca6e-4fcc-a0aa-7bab4c240a9a.png"
              alt="Шарим — студия аэродизайна"
              className="h-20 w-auto object-contain"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            <a
              href="#categories"
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              Каталог
            </a>
            <a
              href="#popular"
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              Популярное
            </a>
            <a href="#about" className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
              О нас
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              Контакты
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6">
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
            <a href="#categories" className="block text-base font-medium text-foreground/70 hover:text-foreground">
              Каталог
            </a>
            <a href="#popular" className="block text-base font-medium text-foreground/70 hover:text-foreground">
              Популярное
            </a>
            <a href="#about" className="block text-base font-medium text-foreground/70 hover:text-foreground">
              О нас
            </a>
            <a href="#contact" className="block text-base font-medium text-foreground/70 hover:text-foreground">
              Контакты
            </a>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full">
              Заказать
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}