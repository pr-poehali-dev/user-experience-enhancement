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
      className="px-4 min-h-screen flex flex-col justify-center"
      style={{
        background: "linear-gradient(180deg, #fdfbff 0%, #f7f2fd 100%)",
        scrollMarginTop: "clamp(58px,7.5vw,84px)",
        paddingTop: "clamp(58px,7.5vw,84px)",
        paddingBottom: "clamp(16px,3vw,32px)",
      }}
    >
      <div className="max-w-5xl mx-auto w-full">

        {/* Заголовок */}
        <div className="text-center mb-3 sm:mb-6">
          <h2 style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 500,
            fontSize: "clamp(24px, 3.4vw, 42px)", color: "#1a1024", lineHeight: 1.1,
          }}>
            Для кого нужны{" "}
            <span style={{ fontFamily: "'Marck Script', cursive", fontWeight: 400, color: "#8b5cf6" }}>
              шарики?
            </span>
          </h2>
        </div>

        {/* Категории: фото + фиолетовая плашка снизу */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.path}
              onClick={() => navigate(cat.path)}
              className="group relative rounded-lg sm:rounded-2xl overflow-hidden text-left transition-all duration-300 flex flex-col bg-white"
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
                className="relative w-full overflow-hidden flex items-center justify-center p-2 sm:p-3"
                style={{ aspectRatio: "4/3", background: "linear-gradient(160deg,#f5f0ff 0%,#ece4fb 100%)" }}
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div
                className="relative flex items-center justify-between gap-1 px-2 py-1 sm:px-3 sm:py-2.5"
                style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }}
              >
                <div className="min-w-0">
                  <p className="hidden sm:block" style={{
                    fontFamily: "'Montserrat', sans-serif", fontWeight: 500, color: "rgba(255,255,255,0.75)",
                    fontSize: "clamp(9px,0.75vw,11px)",
                  }}>
                    {cat.sub}
                  </p>
                  <p style={{
                    fontFamily: "'Montserrat', sans-serif", fontWeight: 700, color: "#fff",
                    fontSize: "clamp(10px,1.3vw,16px)", lineHeight: 1.2,
                  }} className="truncate">
                    {cat.label}
                  </p>
                </div>
                <Icon name="ArrowRight" size={13} className="hidden sm:block flex-shrink-0 text-white/85 transition-transform group-hover:translate-x-1" />
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