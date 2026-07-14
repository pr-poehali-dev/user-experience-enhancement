import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Hero } from "@/components/Hero"
import { PopularPackages } from "@/components/PopularPackages"
import { DeliverySection } from "@/components/DeliverySection"
import { Reviews } from "@/components/Reviews"
import { Footer } from "@/components/Footer"
import { FloatingSocials } from "@/components/FloatingSocials"
import Icon from "@/components/ui/icon"

const CATEGORIES = [
  { path: "/catalog/girl",            label: "Для неё",          sub: "День рождения",  emoji: "🌹" },
  { path: "/catalog/man",             label: "Для него",         sub: "День рождения",  emoji: "🎩" },
  { path: "/catalog/boy",             label: "Мальчику",         sub: "День рождения",  emoji: "🚀" },
  { path: "/catalog/kid-girl",        label: "Девочке",          sub: "День рождения",  emoji: "🎀" },
  { path: "/catalog/girl-discharge",  label: "Выписка девочки",  sub: "Встречаем малыша", emoji: "👧" },
  { path: "/catalog/boy-discharge",   label: "Выписка мальчика", sub: "Встречаем малыша", emoji: "👦" },
]

function CatalogCTA() {
  const navigate = useNavigate()
  return (
    <section
      id="catalog-cta"
      className="py-14 sm:py-24 px-4"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 85% 10%, #f3ebff 0%, transparent 55%), linear-gradient(180deg, #fdfbff 0%, #f7f2fd 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Заголовок */}
        <div className="text-center mb-10 sm:mb-16">
          <p style={{
            fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 12,
            letterSpacing: "2px", textTransform: "uppercase", color: "#a855f7", marginBottom: 8,
          }}>Выберите повод</p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 500,
            fontSize: "clamp(30px, 4.5vw, 58px)", color: "#1a1024", lineHeight: 1.1,
          }}>
            Готовы выбрать{" "}
            <span style={{ fontFamily: "'Marck Script', cursive", fontWeight: 400, color: "#8b5cf6" }}>
              шарики?
            </span>
          </h2>
        </div>

        {/* Категории */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.path}
              onClick={() => navigate(cat.path)}
              className="group relative rounded-3xl overflow-hidden text-left transition-all duration-300"
              style={{
                background: "#fff",
                border: "1px solid #ece4fb",
                padding: "clamp(18px,2.4vw,32px) clamp(16px,2vw,26px)",
                animationDelay: `${i * 60}ms`,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"
                ;(e.currentTarget as HTMLElement).style.boxShadow = "0 16px 40px rgba(124,58,237,0.16)"
                ;(e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.3)"
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = ""
                ;(e.currentTarget as HTMLElement).style.boxShadow = "none"
                ;(e.currentTarget as HTMLElement).style.borderColor = "#ece4fb"
              }}
            >
              <div
                className="flex items-center justify-center rounded-2xl mb-4"
                style={{
                  width: "clamp(52px,6vw,72px)", height: "clamp(52px,6vw,72px)",
                  fontSize: "clamp(24px,3vw,36px)",
                  background: "linear-gradient(145deg, rgba(124,58,237,0.10), rgba(168,85,247,0.05))",
                }}
              >
                {cat.emoji}
              </div>
              <p style={{
                fontFamily: "'Playfair Display', serif", fontWeight: 600, color: "#1a1024",
                fontSize: "clamp(16px,1.5vw,22px)", lineHeight: 1.2,
              }}>
                {cat.label}
              </p>
              <p style={{
                fontFamily: "'Montserrat', sans-serif", fontWeight: 500, color: "#8a7d9c",
                fontSize: "clamp(11px,0.9vw,13px)", marginTop: 4,
              }}>
                {cat.sub}
              </p>
              <span
                className="inline-flex items-center gap-1 mt-4 font-semibold"
                style={{ color: "#7c3aed", fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(12px,0.95vw,14px)" }}
              >
                Смотреть <Icon name="ArrowRight" size={13} className="transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Index() {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "")
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  }, [])

  return (
    <main className="min-h-screen">
      <Hero />
      <PopularPackages />
      <DeliverySection />
      <Reviews />
      <CatalogCTA />
      <Footer />
      <FloatingSocials />
    </main>
  )
}