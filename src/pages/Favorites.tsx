import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useFavorites } from "@/context/FavoritesContext"
import Icon from "@/components/ui/icon"
import { Footer } from "@/components/Footer"
import { getAllCompositions } from "@/data/catalogData"
import CompositionCard from "@/components/catalog/CompositionCard"
import SEO from "@/components/SEO"

export default function Favorites() {
  const navigate = useNavigate()
  const location = useLocation()
  const { favorites } = useFavorites()

  const [allItems, setAllItems] = useState(getAllCompositions())
  const items = allItems.filter(c => favorites.includes(c.id))

  useEffect(() => {
    if (allItems.length === 0) {
      import("@/pages/Catalog").then(() => {
        setAllItems(getAllCompositions())
      })
    }

    const restoreScrollY = (location.state as { restoreScrollY?: number } | null)?.restoreScrollY
    if (typeof restoreScrollY === "number") {
      window.scrollTo({ top: restoreScrollY, behavior: "instant" })
    }
  }, [])

  return (
    <main
      className="min-h-screen pt-[clamp(58px,7.5vw,86px)]"
      style={{
        background: "radial-gradient(ellipse 80% 50% at 15% 0%, #f3ebff 0%, transparent 55%), linear-gradient(180deg, #fdfbff 0%, #ffffff 30%)",
      }}
    >
      <SEO
        title="Избранное | Victoria Balloons"
        description="Ваши избранные композиции из воздушных шаров."
        path="/favorites"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 transition-colors text-sm"
          style={{ color: "#8a7d9c", fontFamily: "'Montserrat', sans-serif" }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#7c3aed"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#8a7d9c"}
        >
          <Icon name="ArrowLeft" size={16} /> Назад
        </button>

        <div className="text-center mb-8 sm:mb-12">
          <p style={{
            fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 12,
            letterSpacing: "2px", textTransform: "uppercase", color: "#a855f7", marginBottom: 8,
          }}>Сохранённые вами композиции</p>
          <h1 style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 500,
            fontSize: "clamp(32px, 5vw, 60px)", color: "#1a1024", lineHeight: 1.1,
          }}>
            Избранное{" "}
            <span style={{ fontFamily: "'Marck Script', cursive", fontWeight: 400, color: "#8b5cf6" }}>
              ваше
            </span>
          </h1>
          {items.length > 0 && (
            <p style={{ fontFamily: "'Montserrat', sans-serif", color: "#5c5468", fontSize: 16, marginTop: 12 }}>
              {items.length} {items.length === 1 ? "композиция" : "композиций"}
            </p>
          )}
        </div>

        {items.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-20 sm:py-24 gap-5 text-center rounded-3xl"
            style={{ background: "rgba(124,58,237,0.04)", border: "1px dashed #d8c8fa" }}
          >
            <span className="text-7xl">🤍</span>
            <div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: 22, color: "#1a1024", marginBottom: 8 }}>
                Пока ничего нет
              </p>
              <p style={{ fontFamily: "'Montserrat', sans-serif", color: "#8a7d9c", fontSize: 15 }}>
                Нажмите ♥ на любой композиции, чтобы сохранить её здесь
              </p>
            </div>
            <button
              onClick={() => navigate("/#catalog-cta")}
              className="px-8 py-3 rounded-full text-white font-semibold transition-transform hover:scale-105"
              style={{
                background: "linear-gradient(135deg,#7c3aed,#a855f7)",
                fontFamily: "'Montserrat', sans-serif",
                boxShadow: "0 6px 20px rgba(124,58,237,0.28)",
              }}
            >
              Перейти в каталог
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {items.map((item) => (
              <CompositionCard key={item.id} item={item} backPath="/favorites" />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}