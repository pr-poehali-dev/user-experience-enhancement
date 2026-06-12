import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Icon from "@/components/ui/icon"
import { Composition } from "@/data/catalogData"
import { useFavorites } from "@/context/FavoritesContext"
import { Navbar } from "@/components/Navbar"
import { FloatingSocials } from "@/components/FloatingSocials"

export default function CompositionDetail() {
  const navigate = useNavigate()
  const location = useLocation()
  const { toggleFavorite, isFavorite } = useFavorites()

  const item: Composition | undefined = location.state?.item
  const backScrollY: number = location.state?.scrollY ?? 0
  const backPath: string = location.state?.backPath ?? -1

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="text-5xl">🎈</div>
        <p className="text-lg text-muted-foreground">Набор не найден</p>
        <button onClick={() => navigate(-1)} className="text-primary underline">Назад</button>
      </div>
    )
  }

  const goBack = () => {
    navigate(backPath, { state: { restoreScrollY: backScrollY } })
  }

  const goOrder = (mode: "order" | "details") => {
    window.scrollTo({ top: 0, behavior: "instant" })
    navigate(`/order?mode=${mode}&title=${encodeURIComponent(item.title)}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Отступ под навбар */}
      <div className="h-14" />

      {/* Кнопка Назад + заголовок */}
      <div className="sticky top-14 z-40 bg-white/95 backdrop-blur border-b border-border px-4 py-2.5 flex items-center gap-3">
        <button
          onClick={goBack}
          className="flex items-center gap-1.5 text-primary font-semibold text-sm"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Назад
        </button>
        <h1 className="flex-1 text-sm font-bold text-foreground truncate">{item.title}</h1>
        <button
          onClick={() => toggleFavorite(item.id)}
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: isFavorite(item.id) ? "linear-gradient(135deg,#f43f5e,#e11d48)" : "#f5f3ff" }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24"
            fill={isFavorite(item.id) ? "#fff" : "none"}
            stroke={isFavorite(item.id) ? "#fff" : "#f43f5e"}
            strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>

      {/* Фото */}
      <div className="w-full bg-gray-50" style={{ aspectRatio: "1/1", maxHeight: "70vw", overflow: "hidden" }}>
        <img
          src={item.image}
          alt={item.title}
          className={`w-full h-full ${item.contain ? "object-contain" : "object-cover"}`}
          style={{ display: "block" }}
        />
      </div>

      {/* Радужная полоска */}
      <div style={{ height: 3, background: "linear-gradient(90deg,#7c3aed,#f97316,#f43f5e,#7c3aed)" }} />

      {/* Контент */}
      <div className="px-4 pt-4 pb-32 space-y-5">

        {/* Название + цена */}
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl font-extrabold leading-tight text-foreground" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            {item.title}
          </h2>
          <div
            className="flex-shrink-0 px-4 py-2 rounded-2xl text-white font-black text-lg"
            style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)", fontFamily: "'Montserrat', sans-serif" }}
          >
            {item.price}
          </div>
        </div>

        {/* Наполнение */}
        <div className="rounded-2xl bg-violet-50 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-primary/70 flex items-center gap-1.5 mb-2">
            <Icon name="Sparkles" size={12} /> Наполнение
          </p>
          <p className="text-sm text-foreground/80 leading-relaxed">{item.description}</p>
          <p className="text-xs text-primary mt-2 font-medium">🎨 Можно изменить под ваш бюджет и пожелания</p>
        </div>

        {/* Доставка */}
        <div className="rounded-2xl bg-green-50 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-green-700/80 flex items-center gap-1.5 mb-2">
            <Icon name="Truck" size={12} /> Доставка по г. Краснодар
          </p>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-sm text-green-800">
              <span className="text-base">🎁</span>
              <span>от 3 500 ₽ — <strong>Бесплатно</strong></span>
            </div>
            <div className="flex items-center gap-2 text-sm text-orange-700">
              <span className="text-base">🚚</span>
              <span>менее 3 500 ₽ — <strong>150–500 ₽</strong></span>
            </div>
            <div className="flex items-center gap-2 text-sm text-violet-700">
              <span className="text-base">📍</span>
              <span>Самовывоз: ул. Героя Яцкова 19к3</span>
            </div>
          </div>
        </div>

        {/* Связаться */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Написать нам</p>
          <div className="flex flex-wrap gap-2">
            <a href="https://wa.me/79885973303" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white"
              style={{ background: "#25D366" }}>
              <Icon name="MessageSquare" size={14} /> WhatsApp
            </a>
            <a href="https://t.me/sharovik_krd" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white"
              style={{ background: "#229ED9" }}>
              <Icon name="Send" size={14} /> Telegram
            </a>
            <a href="https://vk.com/sharovik_krd" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white"
              style={{ background: "#0077FF" }}>
              <Icon name="MessageCircle" size={14} /> ВКонтакте
            </a>
            <a href="https://instagram.com/sharovik_krd" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white"
              style={{ background: "linear-gradient(45deg,#f09433,#dc2743,#bc1888)" }}>
              <Icon name="Instagram" size={14} /> Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Кнопки заказа — фиксированные снизу */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border px-4 py-3 flex gap-2"
        style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom, 12px))" }}
      >
        <button
          onClick={() => goOrder("order")}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white font-bold text-sm"
          style={{ background: "linear-gradient(135deg,#f97316,#e63000)", boxShadow: "0 4px 14px rgba(249,115,22,0.4)" }}
        >
          🎈 Оформить заказ
        </button>
        <button
          onClick={() => goOrder("details")}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm border-2"
          style={{ borderColor: "#7c3aed", color: "#7c3aed", background: "#faf5ff" }}
        >
          💬 Уточнить детали
        </button>
      </div>

      <FloatingSocials />
    </div>
  )
}
