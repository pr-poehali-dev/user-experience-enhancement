import { useNavigate } from "react-router-dom"
import { Hero } from "@/components/Hero"
import { PopularPackages } from "@/components/PopularPackages"
import { Reviews } from "@/components/Reviews"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
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
    <section className="py-12 sm:py-20 bg-background border-t border-border/40 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Заголовок */}
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-3">Выберите категорию</p>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight">
            Готовы выбрать{" "}
            <span className="font-semibold" style={{color:"#f97316"}}>шарики?</span>
          </h2>
        </div>

        {/* День рождения */}
        <div className="mb-5">
          <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
            <span>🎂</span> На День Рождения
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {BIRTHDAY_CATS.map(cat => (
              <button
                key={cat.path}
                onClick={() => navigate(cat.path)}
                className="group relative rounded-2xl border border-border bg-white hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all duration-150 p-4 flex flex-col items-center gap-2 text-center"
              >
                <span className="text-3xl">{cat.emoji}</span>
                <span className="text-sm font-semibold text-foreground">{cat.label}</span>
                <span className="text-[11px] text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-0.5">
                  Смотреть <Icon name="ArrowRight" size={10} />
                </span>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" style={{background: cat.color}} />
              </button>
            ))}
          </div>
        </div>

        {/* Выписка */}
        <div className="mb-8">
          <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
            <span>👶</span> На выписку
          </p>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {DISCHARGE_CATS.map(cat => (
              <button
                key={cat.path}
                onClick={() => navigate(cat.path)}
                className="group relative rounded-2xl border border-border bg-white hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all duration-150 p-4 flex flex-col items-center gap-2 text-center"
              >
                <span className="text-3xl">{cat.emoji}</span>
                <span className="text-sm font-semibold text-foreground">{cat.label}</span>
                <span className="text-[11px] text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-0.5">
                  Смотреть <Icon name="ArrowRight" size={10} />
                </span>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity" style={{background: cat.color}} />
              </button>
            ))}
          </div>
        </div>

        {/* Весь каталог */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={() => navigate("/catalog")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-10 sm:px-16 shadow-lg"
            style={{ height: "3.25rem", fontSize: "1rem", fontWeight: 700 }}
          >
            Весь каталог
            <Icon name="ArrowRight" className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default function Index() {
  return (
    <main className="min-h-screen">
      <Hero />
      <PopularPackages />
      <Reviews />
      <CatalogCTA />
      <Footer />
    </main>
  )
}