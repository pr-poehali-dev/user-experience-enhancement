import { useNavigate } from "react-router-dom"
import { Composition } from "@/data/catalogData"
import { useFavorites } from "@/context/FavoritesContext"

export default function CompositionCard({ item, backPath }: { item: Composition; backPath?: string }) {
  const navigate = useNavigate()
  const { toggleFavorite, isFavorite } = useFavorites()

  return (
    <div
      className="group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 bg-white"
      style={{ border: "1px solid #ece4fb" }}
      onClick={() => {
        navigate("/composition", { state: { item, scrollY: window.scrollY, backPath: backPath ?? window.location.pathname + window.location.search } })
      }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(124,58,237,0.14)"}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = "none"}
    >
      {/* Картинка + сердечко сверху */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <button
          className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all active:scale-90"
          style={{ background: "rgba(255,255,255,0.92)" }}
          onClick={e => { e.stopPropagation(); toggleFavorite(item.id) }}
          title={isFavorite(item.id) ? "Убрать из избранного" : "В избранное"}
        >
          <svg width="15" height="15" viewBox="0 0 24 24"
            fill={isFavorite(item.id) ? "#f43f5e" : "none"}
            stroke={isFavorite(item.id) ? "#f43f5e" : "#7c3aed"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            style={{ transition: "transform 0.2s, fill 0.2s", transform: isFavorite(item.id) ? "scale(1.2)" : "scale(1)" }}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      {/* Название + цена */}
      <div className="px-3 pt-2.5 pb-3">
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, color: "#1a1024" }} className="text-xs sm:text-sm leading-tight truncate">{item.title}</p>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, color: "#6d28d9", letterSpacing: "0.2px" }} className="text-sm sm:text-base mt-1">{item.price}</p>
      </div>
    </div>
  )
}