import { useNavigate } from "react-router-dom"
import { useFavorites } from "@/context/FavoritesContext"
import Icon from "@/components/ui/icon"
import { Footer } from "@/components/Footer"
import { useState } from "react"
import CompositionModal from "@/components/catalog/CompositionModal"
import { Composition, getAllCompositions } from "@/data/catalogData"

export default function Favorites() {
  const navigate = useNavigate()
  const { favorites, toggleFavorite } = useFavorites()
  const [modal, setModal] = useState<Composition | null>(null)

  const allItems = getAllCompositions()
  const items = allItems.filter(c => favorites.includes(c.id))

  return (
    <main className="min-h-screen pt-[clamp(60px,7.5vw,86px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors text-sm"
        >
          <Icon name="ArrowLeft" size={16} /> Назад
        </button>

        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl sm:text-5xl font-light tracking-tight">
            Избранное <span className="font-semibold text-rose-500">♥</span>
          </h1>
          {items.length > 0 && (
            <span className="text-lg text-muted-foreground font-light">{items.length} шт.</span>
          )}
        </div>
        <p className="text-base text-muted-foreground mb-8">Сохранённые вами композиции</p>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
            <span className="text-8xl">🤍</span>
            <div>
              <p className="text-xl font-semibold mb-2">Пока ничего нет</p>
              <p className="text-muted-foreground">Нажмите ♥ на любой композиции, чтобы сохранить её здесь</p>
            </div>
            <button
              onClick={() => navigate("/catalog")}
              className="px-8 py-3 rounded-full text-white font-semibold transition-transform hover:scale-105"
              style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)" }}
            >
              Перейти в каталог
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
            {items.map((item, idx) => (
              <div
                key={`fav-${item.id}-${idx}`}
                className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                onClick={() => setModal(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full object-cover"
                  style={{ aspectRatio: "1/1" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Кнопка убрать */}
                <button
                  className="absolute top-2 left-2 z-10 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-110"
                  style={{ background: "linear-gradient(135deg,#f43f5e,#e11d48)" }}
                  onClick={e => { e.stopPropagation(); toggleFavorite(item.id) }}
                  title="Убрать из избранного"
                >
                  <Icon name="Heart" size={14} className="text-white" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-8 pb-2.5 px-3">
                  <p className="text-white font-extrabold text-base drop-shadow-lg">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {modal && (
        <CompositionModal
          modal={modal}
          allItems={items}
          onNavigate={setModal}
          onClose={() => setModal(null)}
        />
      )}

      <Footer />
    </main>
  )
}