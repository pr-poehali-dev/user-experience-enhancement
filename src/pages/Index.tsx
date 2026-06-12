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
        <div className="text-center mb-6 sm:mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-2">Выберите категорию</p>
          <h2 className="text-2xl sm:text-5xl font-light tracking-tight">
            Готовы выбрать{" "}
            <span className="font-semibold" style={{color:"#f97316"}}>шарики?</span>
          </h2>
        </div>

        {/* День рождения */}
        <div className="mb-4 sm:mb-5">
          <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2 sm:mb-3 flex items-center gap-2">
            <span>🎂</span> На День Рождения
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
            {BIRTHDAY_CATS.map(cat => (
              <button
                key={cat.path}
                onClick={() => navigate(cat.path)}
                className="group relative rounded-2xl overflow-hidden hover:shadow-xl hover:scale-[1.03] transition-all duration-200 p-3 sm:p-6 flex flex-col items-center gap-2 sm:gap-3 text-center"
                style={{
                  background: `linear-gradient(145deg, ${cat.color}18 0%, ${cat.color}0a 100%)`,
                  border: `1.5px solid ${cat.color}30`,
                }}
              >
                <div
                  className="w-11 h-11 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-4xl shadow-sm"
                  style={{ background: `${cat.color}15` }}
                >
                  {cat.emoji}
                </div>
                <div>
                  <p className="text-xs sm:text-base font-bold text-foreground leading-tight">{cat.label}</p>
                  <p className="text-[9px] sm:text-xs font-medium mt-0.5" style={{color: cat.color}}>на День Рождения</p>
                </div>
                <span className="text-[10px] sm:text-[11px] font-semibold flex items-center gap-0.5" style={{color: cat.color}}>
                  Смотреть <Icon name="ArrowRight" size={10} />
                </span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl" style={{boxShadow: `inset 0 0 0 2px ${cat.color}60`}} />
              </button>
            ))}
          </div>
        </div>

        {/* Выписка */}
        <div className="mb-6 sm:mb-8">
          <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2 sm:mb-3 flex items-center gap-2">
            <span>👶</span> На выписку
          </p>
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            {DISCHARGE_CATS.map(cat => (
              <button
                key={cat.path}
                onClick={() => navigate(cat.path)}
                className="group relative rounded-2xl overflow-hidden hover:shadow-xl hover:scale-[1.03] transition-all duration-200 p-3 sm:p-6 flex flex-col items-center gap-2 sm:gap-3 text-center"
                style={{
                  background: `linear-gradient(145deg, ${cat.color}18 0%, ${cat.color}0a 100%)`,
                  border: `1.5px solid ${cat.color}30`,
                }}
              >
                <div
                  className="w-11 h-11 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-4xl shadow-sm"
                  style={{ background: `${cat.color}15` }}
                >
                  {cat.emoji}
                </div>
                <div>
                  <p className="text-xs sm:text-base font-bold text-foreground leading-tight">{cat.label}</p>
                </div>
                <span className="text-[10px] sm:text-[11px] font-semibold flex items-center gap-0.5" style={{color: cat.color}}>
                  Смотреть <Icon name="ArrowRight" size={10} />
                </span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl" style={{boxShadow: `inset 0 0 0 2px ${cat.color}60`}} />
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