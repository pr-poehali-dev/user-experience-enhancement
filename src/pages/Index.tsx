import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Hero } from "@/components/Hero"
import { PopularPackages } from "@/components/PopularPackages"
import { DeliverySection } from "@/components/DeliverySection"
import { Reviews } from "@/components/Reviews"
import { Footer } from "@/components/Footer"
import Icon from "@/components/ui/icon"

const BIRTHDAY_CATS = [
  { path: "/catalog/girl",     label: "Девушке",   emoji: "🌹", color: "#e11d48" },
  { path: "/catalog/man",      label: "Мужчине",   emoji: "🎩", color: "#1d4ed8" },
  { path: "/catalog/boy",      label: "Мальчику",  emoji: "🚀", color: "#0284c7" },
  { path: "/catalog/kid-girl", label: "Девочке",   emoji: "🎀", color: "#9333ea" },
]

const DISCHARGE_CATS = [
  { path: "/catalog/girl-discharge", label: "Выписка девочки",   emoji: "👧", color: "#db2777" },
  { path: "/catalog/boy-discharge",  label: "Выписка мальчика",  emoji: "👦", color: "#0369a1" },
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
      <div className="max-w-3xl mx-auto">

        {/* Заголовок */}
        <div className="text-center mb-8 sm:mb-14">
          <p style={{
            fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 12,
            letterSpacing: "2px", textTransform: "uppercase", color: "#a855f7", marginBottom: 8,
          }}>Выберите категорию</p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 500,
            fontSize: "clamp(28px, 4.2vw, 54px)", color: "#1a1024", lineHeight: 1.1,
          }}>
            Готовы выбрать{" "}
            <span style={{ fontFamily: "'Marck Script', cursive", fontWeight: 400, color: "#8b5cf6" }}>
              шарики?
            </span>
          </h2>
        </div>

        {/* День рождения */}
        <div className="mb-5 sm:mb-7">
          <p style={{
            fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 11,
            letterSpacing: "1.5px", textTransform: "uppercase", color: "#8a7d9c",
            marginBottom: 12, display: "flex", alignItems: "center", gap: 8,
          }}>
            <span>🎂</span> На День Рождения
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {BIRTHDAY_CATS.map(cat => (
              <button
                key={cat.path}
                onClick={() => navigate(cat.path)}
                className="group relative rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 p-3 sm:p-6 flex flex-col items-center gap-2 sm:gap-3 text-center bg-white"
                style={{ border: "1px solid #ece4fb" }}
              >
                <div
                  className="w-11 h-11 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-4xl"
                  style={{ background: "rgba(124,58,237,0.06)" }}
                >
                  {cat.emoji}
                </div>
                <div>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, color: "#1a1024" }} className="text-xs sm:text-base leading-tight">{cat.label}</p>
                  <p className="text-[9px] sm:text-xs font-medium mt-0.5" style={{color: "#8b5cf6"}}>на День Рождения</p>
                </div>
                <span className="text-[10px] sm:text-[11px] font-semibold flex items-center gap-0.5" style={{color: "#7c3aed"}}>
                  Смотреть <Icon name="ArrowRight" size={10} />
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Выписка */}
        <div className="mb-8 sm:mb-10">
          <p style={{
            fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 11,
            letterSpacing: "1.5px", textTransform: "uppercase", color: "#8a7d9c",
            marginBottom: 12, display: "flex", alignItems: "center", gap: 8,
          }}>
            <span>👶</span> На выписку
          </p>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {DISCHARGE_CATS.map(cat => (
              <button
                key={cat.path}
                onClick={() => navigate(cat.path)}
                className="group relative rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 p-3 sm:p-6 flex flex-col items-center gap-2 sm:gap-3 text-center bg-white"
                style={{ border: "1px solid #ece4fb" }}
              >
                <div
                  className="w-11 h-11 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-4xl"
                  style={{ background: "rgba(124,58,237,0.06)" }}
                >
                  {cat.emoji}
                </div>
                <div>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, color: "#1a1024" }} className="text-xs sm:text-base leading-tight">{cat.label}</p>
                </div>
                <span className="text-[10px] sm:text-[11px] font-semibold flex items-center gap-0.5" style={{color: "#7c3aed"}}>
                  Смотреть <Icon name="ArrowRight" size={10} />
                </span>
              </button>
            ))}
          </div>
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
    </main>
  )
}