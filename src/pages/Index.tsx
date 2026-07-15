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
        <div className="text-center mb-8 sm:mb-12">
          <p style={{
            fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 12,
            letterSpacing: "2px", textTransform: "uppercase", color: "#a855f7", marginBottom: 10,
          }}>Выберите повод</p>
          <h2 style={{
            fontFamily: "'Montserrat', sans-serif", fontWeight: 700,
            fontSize: "clamp(26px, 3.6vw, 42px)", color: "#1a1024", lineHeight: 1.2,
          }}>
            Для кого нужны шарики?
          </h2>
          <p style={{
            fontFamily: "'Montserrat', sans-serif", fontWeight: 400, color: "#5c5468",
            fontSize: "clamp(14px,1.1vw,16px)", marginTop: 10,
          }}>
            Подберите готовый набор под повод — доставим уже сегодня
          </p>
        </div>

        {/* Категории: карточки с круглым фото-бейджем */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.path}
              onClick={() => navigate(cat.path)}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden text-center transition-all duration-300 flex flex-col items-center bg-white px-3 py-5 sm:px-4 sm:py-7"
              style={{ border: "1px solid #ece4fb" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 14px 34px rgba(124,58,237,0.16)"
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
                className="relative rounded-full overflow-hidden flex items-center justify-center flex-shrink-0"
                style={{
                  width: "clamp(72px,13vw,108px)", height: "clamp(72px,13vw,108px)",
                  background: "linear-gradient(160deg,#f5f0ff 0%,#ece4fb 100%)",
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-[80%] h-[80%] object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <p style={{
                fontFamily: "'Montserrat', sans-serif", fontWeight: 500, color: "#a99bc0",
                fontSize: "clamp(10px,0.85vw,12px)", marginTop: 12,
              }}>
                {cat.sub}
              </p>
              <p style={{
                fontFamily: "'Montserrat', sans-serif", fontWeight: 700, color: "#1a1024",
                fontSize: "clamp(14px,1.4vw,17px)", lineHeight: 1.2, marginTop: 2,
              }}>
                {cat.label}
              </p>
              <span
                className="inline-flex items-center gap-1 mt-2 transition-colors"
                style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 12, color: "#a855f7" }}
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
      <Reviews />
      <CatalogCTA />
      <Footer />
      <FloatingSocials />
    </main>
  )
}