import { useEffect, useMemo } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Footer } from "@/components/Footer"
import Icon from "@/components/ui/icon"
import CompositionGrid from "@/components/catalog/CompositionGrid"
import { Composition } from "@/data/catalogData"
import { compositions } from "@/pages/Catalog"

type SubInfo = {
  label: string
  emoji: string
  description: string
  gradient: string
}

const SUB_MAP: Record<string, SubInfo> = {
  girl: {
    label: "Девушке на День Рождения",
    emoji: "🌹",
    description: "Нежные и стильные композиции для любимой девушки",
    gradient: "from-pink-400 to-rose-500",
  },
  man: {
    label: "Мужчине на День Рождения",
    emoji: "🎩",
    description: "Стильные и брутальные наборы для мужчин",
    gradient: "from-blue-500 to-blue-700",
  },
  "kid-girl": {
    label: "Девочке на День Рождения",
    emoji: "🎀",
    description: "Яркие праздничные композиции для маленькой принцессы",
    gradient: "from-purple-400 to-pink-500",
  },
  boy: {
    label: "Мальчику на День Рождения",
    emoji: "🚀",
    description: "Яркие и весёлые наборы для маленьких героев",
    gradient: "from-cyan-400 to-blue-500",
  },
  "girl-discharge": {
    label: "Выписка Девочки",
    emoji: "👧",
    description: "Нежные розовые наборы для встречи маленькой принцессы",
    gradient: "from-pink-300 to-rose-400",
  },
  "boy-discharge": {
    label: "Выписка Мальчика",
    emoji: "👦",
    description: "Голубые и нежные наборы для встречи маленького богатыря",
    gradient: "from-sky-300 to-blue-400",
  },
}

export default function CatalogSub() {
  const { sub } = useParams<{ sub: string }>()
  const navigate = useNavigate()

  const info = sub ? SUB_MAP[sub] : null

  const items: Composition[] = useMemo(() => {
    if (!sub) return []
    if (sub === "boy-discharge" || sub === "girl-discharge") {
      return (compositions.discharge ?? []).filter(c => c.subcategory === sub)
    }
    return compositions[sub] ?? []
  }, [sub])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [sub])

  if (!info || items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4 text-center px-4">
        <span className="text-6xl">🎈</span>
        <h2 className="text-2xl font-bold">Категория не найдена</h2>
        <button onClick={() => navigate("/catalog")} className="text-primary underline">
          Перейти в каталог
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Компактный заголовок */}
      <div className="pt-[clamp(72px,10vw,120px)] border-b border-border/50 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <button
            onClick={() => navigate("/catalog")}
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-xs mb-2"
          >
            <Icon name="ArrowLeft" size={13} /> Каталог
          </button>
          <div className="flex items-center gap-2.5">
            <span className="text-2xl sm:text-3xl">{info.emoji}</span>
            <div>
              <h1 className="text-base sm:text-xl font-bold text-foreground leading-tight">
                {info.label}
              </h1>
              <p className="text-xs text-muted-foreground">{items.length} композиций</p>
            </div>
          </div>
        </div>
      </div>

      {/* Сетка */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 pb-20">
        <CompositionGrid items={items} />
      </div>

      <Footer />
    </div>
  )
}