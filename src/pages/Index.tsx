import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Hero } from "@/components/Hero"
import { PopularPackages } from "@/components/PopularPackages"
import { Reviews } from "@/components/Reviews"
import { Footer } from "@/components/Footer"
import { FloatingSocials } from "@/components/FloatingSocials"
import Icon from "@/components/ui/icon"

const CATEGORIES = [
  { path: "/catalog/girl", label: "Для неё", sub: "День рождения", image: "/categories/girl.png" },
  { path: "/catalog/man", label: "Для него", sub: "День рождения", image: "/categories/man.png" },
  { path: "/catalog/boy", label: "Мальчику", sub: "День рождения", image: "/categories/boy.png" },
  { path: "/catalog/kid-girl", label: "Девочке", sub: "День рождения", image: "/categories/kid-girl.png" },
  { path: "/catalog/girl-discharge", label: "Выписка девочки", sub: "Встречаем малыша", image: "/categories/girl-discharge.png" },
  { path: "/catalog/boy-discharge", label: "Выписка мальчика", sub: "Встречаем малыша", image: "/categories/boy-discharge.png" },
]

function CatalogCTA() {
  const navigate = useNavigate()
  return (
    <section
      id="catalog-cta"
      className="py-14 sm:py-24 px-4"
      style={{ background: "linear-gradient(180deg, #fdfbff 0%, #f7f2fd 100%)" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Заголовок */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8 sm:mb-12">
          <div>
            <p style={{
              fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 12,
              letterSpacing: "2px", textTransform: "uppercase", color: "#a855f7", marginBottom: 8,
            }}>Выберите повод</p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontWeight: 500,
              fontSize: "clamp(30px, 4.5vw, 54px)", color: "#1a1024", lineHeight: 1.1,
            }}>
              Для кого нужны{" "}
              <span style={{ fontFamily: "'Marck Script', cursive", fontWeight: 400, color: "#8b5cf6" }}>
                шарики?
              </span>
            </h2>
          </div>
          <p style={{
            fontFamily: "'Montserrat', sans-serif", fontWeight: 400, color: "#5c5468",
            fontSize: "clamp(13px,1vw,15px)", maxWidth: 340,
          }}>
            Подберите готовый набор под повод — доставим уже сегодня
          </p>
        </div>

        {/* Категории: белые карточки с фиолетовым акцентом */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.path}
              onClick={() => navigate(cat.path)}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden text-left transition-all duration-300 flex flex-col bg-white"
              style={{ aspectRatio: "3/2", border: "1px solid #ece4fb" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 40px rgba(124,58,237,0.22)"
                ;(e.currentTarget as HTMLElement).style.borderColor = "#c9b3f5"
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none"
                ;(e.currentTarget as HTMLElement).style.borderColor = "#ece4fb"
              }}
            >
              <div
                className="relative flex-1 flex items-center justify-center overflow-hidden px-2 pt-2"
                style={{ background: "linear-gradient(160deg,#f5f0ff 0%,#faf5ff 100%)" }}
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div
                className="relative flex items-center justify-between gap-1 px-3 py-2.5 sm:px-4 sm:py-3"
                style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }}
              >
                <div className="min-w-0">
                  <p style={{
                    fontFamily: "'Montserrat', sans-serif", fontWeight: 500, color: "rgba(255,255,255,0.75)",
                    fontSize: "clamp(9px,0.75vw,11px)", letterSpacing: "0.4px",
                  }}>
                    {cat.sub}
                  </p>
                  <p style={{
                    fontFamily: "'Playfair Display', serif", fontWeight: 600, color: "#fff",
                    fontSize: "clamp(14px,1.5vw,19px)", lineHeight: 1.15,
                  }} className="truncate">
                    {cat.label}
                  </p>
                </div>
                <Icon name="ArrowRight" size={16} className="flex-shrink-0 text-white/85 transition-transform group-hover:translate-x-1" />
              </div>
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
      <Reviews />
      <CatalogCTA />
      <Footer />
      <FloatingSocials />
    </main>
  )
}