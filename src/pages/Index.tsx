import { useNavigate } from "react-router-dom"
import { Hero } from "@/components/Hero"
import { PopularPackages } from "@/components/PopularPackages"
import { Reviews } from "@/components/Reviews"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

const CATEGORIES = [
  { path: "/catalog/girl",          label: "Девушке",          sub: "на ДР",   emoji: "🌹", grad: "from-pink-400 to-rose-500" },
  { path: "/catalog/man",           label: "Мужчине",          sub: "на ДР",   emoji: "🎩", grad: "from-blue-500 to-blue-700" },
  { path: "/catalog/boy",           label: "Мальчику",         sub: "на ДР",   emoji: "🚀", grad: "from-cyan-400 to-blue-500" },
  { path: "/catalog/kid-girl",      label: "Девочке",          sub: "на ДР",   emoji: "🎀", grad: "from-purple-400 to-pink-500" },
  { path: "/catalog/girl-discharge",label: "Выписка",          sub: "девочки", emoji: "👧", grad: "from-pink-300 to-rose-400" },
  { path: "/catalog/boy-discharge", label: "Выписка",          sub: "мальчика",emoji: "👦", grad: "from-sky-300 to-blue-400" },
]

function CatalogCTA() {
  const navigate = useNavigate()
  return (
    <section className="py-14 sm:py-20 bg-gradient-to-br from-violet-100 via-orange-50 to-rose-50 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-5xl sm:text-6xl block mb-4">🎈</span>
          <h2 className="text-3xl sm:text-5xl font-bold leading-tight mb-3">
            Готовы выбрать<br />
            <span className="text-primary">шарики?</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Выберите нужную категорию или смотрите весь каталог
          </p>
        </div>

        {/* Сетка категорий */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat.path}
              onClick={() => navigate(cat.path)}
              className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br ${cat.grad} p-4 sm:p-6 flex flex-col items-center gap-2 shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-200 text-center`}
            >
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              <span className="relative text-3xl sm:text-5xl drop-shadow">{cat.emoji}</span>
              <div className="relative">
                <p className="text-white font-black text-sm sm:text-xl leading-tight">{cat.label}</p>
                <p className="text-white/80 text-xs sm:text-sm font-medium">{cat.sub}</p>
              </div>
              <div className="relative flex items-center gap-1 text-white/90 text-[11px] sm:text-sm font-medium mt-1">
                Смотреть <Icon name="ArrowRight" size={12} />
              </div>
            </button>
          ))}
        </div>

        {/* Кнопка весь каталог */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={() => navigate("/catalog")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-10 sm:px-16 shadow-xl"
            style={{ height: "3.5rem", fontSize: "1.1rem", fontWeight: 700 }}
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