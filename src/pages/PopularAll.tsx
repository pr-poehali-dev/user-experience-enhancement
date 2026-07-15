import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Icon from "@/components/ui/icon"
import { Footer } from "@/components/Footer"
import { Composition, getPopularCompositions } from "@/data/catalogData"
import CompositionCard from "@/components/catalog/CompositionCard"

const FILTERS: { label: string; sub: string[] | null }[] = [
  { label: "Все", sub: null },
  { label: "Для неё", sub: ["girl"] },
  { label: "Для него", sub: ["man"] },
  { label: "Девочке", sub: ["kid-girl"] },
  { label: "Мальчику", sub: ["boy"] },
  { label: "На выписку", sub: ["girl-discharge", "boy-discharge"] },
]

export default function PopularAll() {
  const navigate = useNavigate()
  const location = useLocation()
  const [filter, setFilter] = useState("Все")
  const [packages, setPackages] = useState<Composition[]>([])

  useEffect(() => {
    setPackages(getPopularCompositions())
    const restoreScrollY = (location.state as { restoreScrollY?: number } | null)?.restoreScrollY
    if (typeof restoreScrollY === "number") {
      window.scrollTo({ top: restoreScrollY, behavior: "instant" })
    }
  }, [])

  const activeFilter = FILTERS.find(f => f.label === filter)
  const filtered = !activeFilter?.sub
    ? packages
    : packages.filter(p => p.subcategory && activeFilter.sub!.includes(p.subcategory))

  return (
    <main
      className="min-h-screen pt-[clamp(60px,7.5vw,86px)]"
      style={{
        background: "radial-gradient(ellipse 80% 50% at 15% 0%, #f3ebff 0%, transparent 55%), linear-gradient(180deg, #fdfbff 0%, #ffffff 30%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 mb-6 transition-colors text-sm"
          style={{ color: "#8a7d9c", fontFamily: "'Montserrat', sans-serif" }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#7c3aed"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#8a7d9c"}
        >
          <Icon name="ArrowLeft" size={16} /> На главную
        </button>

        <div className="text-center mb-8 sm:mb-12">
          <p style={{
            fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 12,
            letterSpacing: "2px", textTransform: "uppercase", color: "#a855f7", marginBottom: 8,
          }}>Любимые нашими клиентами</p>
          <h1 style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 500,
            fontSize: "clamp(32px, 5vw, 60px)", color: "#1a1024", lineHeight: 1.1,
          }}>
            Популярные{" "}
            <span style={{ fontFamily: "'Marck Script', cursive", fontWeight: 400, color: "#8b5cf6" }}>
              наборы
            </span>
          </h1>
          <p style={{ fontFamily: "'Montserrat', sans-serif", color: "#5c5468", fontSize: 16, marginTop: 12 }}>
            Самые любимые композиции наших покупателей
          </p>
        </div>

        {/* Фильтры */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-10">
          {FILTERS.map(f => (
            <button
              key={f.label}
              onClick={() => setFilter(f.label)}
              style={{
                fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 13,
                padding: "9px 20px", borderRadius: 999,
                background: filter === f.label ? "#6d28d9" : "#fff",
                color: filter === f.label ? "#fff" : "#5c5468",
                border: filter === f.label ? "1px solid #6d28d9" : "1px solid #ece4fb",
                transition: "all 0.2s", cursor: "pointer",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <div className="text-5xl mb-4">🎈</div>
            <p className="text-lg">Пока нет популярных наборов в этой категории</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {filtered.map((pkg) => (
              <CompositionCard key={pkg.id} item={pkg} backPath="/popular" />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}