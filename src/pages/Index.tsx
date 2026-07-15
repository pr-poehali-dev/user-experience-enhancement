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
      className="py-6 sm:py-10 px-4 min-h-screen flex flex-col justify-center"
      style={{ background: "linear-gradient(180deg, #fdfbff 0%, #f7f2fd 100%)" }}
    >
      <div className="max-w-6xl mx-auto w-full">

        {/* Заголовок */}
        <div className="text-center mb-4 sm:mb-8">
          <p style={{
            fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 11,
            letterSpacing: "2px", textTransform: "uppercase", color: "#a855f7", marginBottom: 6,
          }}>Выберите повод</p>
          <h2 style={{
            fontFamily: "'Montserrat', sans-serif", fontWeight: 700,
            fontSize: "clamp(22px, 3vw, 38px)", color: "#1a1024", lineHeight: 1.2,
          }}>
            Для кого нужны шарики?
          </h2>
          <p className="hidden sm:block" style={{
            fontFamily: "'Montserrat', sans-serif", fontWeight: 400, color: "#5c5468",
            fontSize: "clamp(13px,1vw,15px)", marginTop: 6,
          }}>
            Подберите готовый набор под повод — доставим уже сегодня
          </p>
        </div>

        {/* Категории: крупное фото + фиолетовая плашка снизу */}
        <div className="grid grid-cols-3 gap-2 sm:gap-5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.path}
              onClick={() => navigate(cat.path)}
              className="group relative rounded-xl sm:rounded-3xl overflow-hidden text-left transition-all duration-300 flex flex-col bg-white"
              style={{ border: "1px solid #ece4fb" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 14px 34px rgba(124,58,237,0.18)"
                ;(e.currentTarget as HTMLElement).style.borderColor = "#c9b3f5"
                ;(e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none"
                ;(e.currentTarget as HTMLElement).style.borderColor = "#ece4fb"
                ;(e.currentTarget as HTMLElement).style.transform = "translateY(0)"
              }}
            >
              <div
                className="relative w-full overflow-hidden flex items-center justify-center"
                style={{ aspectRatio: "1/1", background: "linear-gradient(160deg,#f5f0ff 0%,#ece4fb 100%)" }}
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div
                className="relative flex items-center justify-between gap-1 px-2 py-1.5 sm:px-4 sm:py-4"
                style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }}
              >
                <div className="min-w-0">
                  <p className="hidden sm:block" style={{
                    fontFamily: "'Montserrat', sans-serif", fontWeight: 500, color: "rgba(255,255,255,0.75)",
                    fontSize: "clamp(10px,0.85vw,12px)",
                  }}>
                    {cat.sub}
                  </p>
                  <p style={{
                    fontFamily: "'Montserrat', sans-serif", fontWeight: 700, color: "#fff",
                    fontSize: "clamp(11px,1.5vw,18px)", lineHeight: 1.2,
                  }} className="truncate">
                    {cat.label}
                  </p>
                </div>
                <Icon name="ArrowRight" size={14} className="hidden sm:block flex-shrink-0 text-white/85 transition-transform group-hover:translate-x-1" />
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