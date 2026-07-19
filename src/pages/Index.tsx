import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Hero } from "@/components/Hero"
import { PopularPackages } from "@/components/PopularPackages"
import { DeliveryPromo } from "@/components/DeliveryPromo"
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
      className="px-4 flex flex-col justify-center"
      style={{
        background: "linear-gradient(180deg, #fdfbff 0%, #f7f2fd 100%)",
        scrollMarginTop: "clamp(58px,7.5vw,84px)",
        minHeight: "calc(100svh - clamp(58px,7.5vw,84px))",
        paddingTop: "clamp(16px,3vw,32px)",
        paddingBottom: "clamp(16px,3vw,32px)",
      }}
    >
      <div className="max-w-5xl mx-auto w-full">

        {/* ═══ МОБИЛЬНАЯ ВЕРСИЯ — с нуля ═══ */}
        <div className="lg:hidden">
          <div className="text-center mb-4">
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontWeight: 500,
              fontSize: 26, color: "#1a1024", lineHeight: 1.15,
            }}>
              Для кого нужны{" "}
              <span style={{ fontFamily: "'Marck Script', cursive", fontWeight: 400, color: "#8b5cf6" }}>
                шарики?
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.path}
                onClick={() => navigate(cat.path)}
                className="active:scale-[0.97] transition-transform relative rounded-2xl overflow-hidden text-left flex flex-col bg-white"
                style={{ border: "1px solid #ece4fb", boxShadow: "0 4px 16px rgba(124,58,237,0.08)" }}
              >
                <div
                  className="relative w-full overflow-hidden flex items-center justify-center p-3"
                  style={{ aspectRatio: "1/1", background: "linear-gradient(160deg,#f5f0ff 0%,#ece4fb 100%)" }}
                >
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="max-w-full max-h-full w-auto h-auto object-contain"
                  />
                </div>
                <div className="flex items-center justify-between gap-1 px-3 py-2.5">
                  <div className="min-w-0">
                    <p style={{
                      fontFamily: "'Montserrat', sans-serif", fontWeight: 700, color: "#1a1024",
                      fontSize: 13.5, lineHeight: 1.25,
                    }} className="truncate">
                      {cat.label}
                    </p>
                    <p style={{
                      fontFamily: "'Montserrat', sans-serif", fontWeight: 500, color: "#8a7d9c",
                      fontSize: 11, marginTop: 1,
                    }} className="truncate">
                      {cat.sub}
                    </p>
                  </div>
                  <Icon name="ArrowRight" size={15} className="flex-shrink-0" style={{ color: "#a855f7" }} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ═══ ДЕСКТОП/ПЛАНШЕТ — без изменений ═══ */}
        <div className="hidden lg:block">
          {/* Заголовок */}
          <div className="text-center mb-6">
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
          <div className="grid grid-cols-3 gap-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.path}
                onClick={() => navigate(cat.path)}
                className="group relative rounded-2xl overflow-hidden text-left transition-all duration-300 flex flex-col bg-white"
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
                  className="relative w-full overflow-hidden flex items-center justify-center p-3"
                  style={{ aspectRatio: "4/3", background: "linear-gradient(160deg,#f5f0ff 0%,#ece4fb 100%)" }}
                >
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div
                  className="relative flex items-center justify-between gap-1 px-3 py-2.5"
                  style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }}
                >
                  <div className="min-w-0">
                    <p style={{
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
                  <Icon name="ArrowRight" size={13} className="flex-shrink-0 text-white/85 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Index() {
  const location = useLocation()

  useEffect(() => {
    const restoreScrollY = (location.state as { restoreScrollY?: number } | null)?.restoreScrollY
    if (typeof restoreScrollY === "number") {
      window.scrollTo({ top: restoreScrollY, behavior: "instant" })
      return
    }
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
      <DeliveryPromo />
      <CatalogCTA />
      <Footer />
      <FloatingSocials />
    </main>
  )
}