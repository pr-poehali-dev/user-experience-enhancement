import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Hero } from "@/components/Hero"
import { PopularPackages } from "@/components/PopularPackages"
import { Reviews } from "@/components/Reviews"
import { Footer } from "@/components/Footer"
import { FloatingSocials } from "@/components/FloatingSocials"
import Icon from "@/components/ui/icon"

const CATEGORIES = [
  {
    path: "/catalog/girl", label: "Для неё", sub: "День рождения",
    image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/07a8e9dd-25ba-4fae-bede-f14b8a502903.png",
    big: true,
  },
  {
    path: "/catalog/man", label: "Для него", sub: "День рождения",
    image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/01e7ae2d-2743-430b-a430-07f040a6c6dc.jpg",
    big: true,
  },
  {
    path: "/catalog/boy", label: "Мальчику", sub: "День рождения",
    image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/76c876c4-614f-4868-9130-65c236898921.jpg",
  },
  {
    path: "/catalog/kid-girl", label: "Девочке", sub: "День рождения",
    image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6a5360b0-6642-40fa-bb31-5466cd723b06.jpg",
  },
  {
    path: "/catalog/girl-discharge", label: "Выписка девочки", sub: "Встречаем малыша",
    image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a405d4b5-92f0-4271-94ea-f3dce8d6d0e9.jpg",
  },
  {
    path: "/catalog/boy-discharge", label: "Выписка мальчика", sub: "Встречаем малыша",
    image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/58820ce5-b53c-4276-afeb-c386a1b9b2d6.jpg",
  },
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
              Готовы выбрать{" "}
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

        {/* Категории: асимметричная сетка с фото */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.path}
              onClick={() => navigate(cat.path)}
              className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden text-left transition-all duration-300 ${
                cat.big ? "col-span-2 sm:col-span-2" : "col-span-1 sm:col-span-1"
              }`}
              style={{ aspectRatio: cat.big ? "16/11" : "3/4" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 40px rgba(124,58,237,0.22)"
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none"
              }}
            >
              <img
                src={cat.image}
                alt={cat.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5">
                <p style={{
                  fontFamily: "'Montserrat', sans-serif", fontWeight: 500, color: "rgba(255,255,255,0.75)",
                  fontSize: "clamp(10px,0.8vw,12px)", letterSpacing: "0.5px",
                }}>
                  {cat.sub}
                </p>
                <p style={{
                  fontFamily: "'Playfair Display', serif", fontWeight: 600, color: "#fff",
                  fontSize: cat.big ? "clamp(20px,2.2vw,30px)" : "clamp(15px,1.5vw,20px)", lineHeight: 1.15,
                }}>
                  {cat.label}
                </p>
                <span
                  className="inline-flex items-center gap-1 mt-2 font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: "#fff", fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(11px,0.9vw,13px)" }}
                >
                  Смотреть <Icon name="ArrowRight" size={13} className="transition-transform group-hover:translate-x-1" />
                </span>
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