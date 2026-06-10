import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Icon from "@/components/ui/icon"
import { Composition, birthdaySubcategories } from "@/data/catalogData"
import { useFavorites } from "@/context/FavoritesContext"

const itemKey = (i: Composition) => `${i.subcategory ?? ""}|${i.id}|${i.title}`

export default function CompositionModal({ modal, allItems, onNavigate, onClose }: {
  modal: Composition
  allItems: Composition[]
  onNavigate: (item: Composition) => void
  onClose: () => void
}) {
  const navigate = useNavigate()
  const idx = allItems.findIndex((i) => itemKey(i) === itemKey(modal))
  const hasPrev = idx > 0
  const hasNext = idx < allItems.length - 1
  const { toggleFavorite, isFavorite } = useFavorites()

  const goOrder = (mode: "order" | "details") => {
    onClose()
    navigate(`/order?mode=${mode}&title=${encodeURIComponent(modal.title)}`)
  }

  const goPrev = () => { if (hasPrev) onNavigate(allItems[idx - 1]) }
  const goNext = () => { if (hasNext) onNavigate(allItems[idx + 1]) }

  const touchStartX = useRef(0)
  const touchCurrentX = useRef(0)
  const isDragging = useRef(false)
  const [swipeOffset, setSwipeOffset] = useState(0)
  const [slideDir, setSlideDir] = useState<"left" | "right" | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX
    touchCurrentX.current = e.changedTouches[0].clientX
    isDragging.current = true
    setSlideDir(null)
  }
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return
    touchCurrentX.current = e.changedTouches[0].clientX
    const diff = touchCurrentX.current - touchStartX.current
    if ((diff > 0 && !hasPrev) || (diff < 0 && !hasNext)) {
      setSwipeOffset(diff * 0.3)
    } else {
      setSwipeOffset(diff)
    }
  }
  const handleTouchEnd = () => {
    isDragging.current = false
    const diff = touchCurrentX.current - touchStartX.current
    if (Math.abs(diff) > 60) {
      if (diff < 0 && hasNext) {
        setSlideDir("left")
        setTimeout(() => { goNext(); setSwipeOffset(0); setSlideDir(null) }, 200)
        return
      }
      if (diff > 0 && hasPrev) {
        setSlideDir("right")
        setTimeout(() => { goPrev(); setSwipeOffset(0); setSlideDir(null) }, 200)
        return
      }
    }
    setSwipeOffset(0)
  }

  useEffect(() => {
    setSwipeOffset(0)
    setSlideDir(null)
  }, [modal])

  useEffect(() => {
    document.body.setAttribute("data-modal-open", "1")
    return () => document.body.removeAttribute("data-modal-open")
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev()
      if (e.key === "ArrowRight") goNext()
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [idx, allItems])

  const slideTransform = slideDir === "left" ? "translateX(-100%)" : slideDir === "right" ? "translateX(100%)" : `translateX(${swipeOffset}px)`
  const slideTransition = slideDir ? "transform 0.2s ease-out, opacity 0.2s ease-out" : isDragging.current ? "none" : "transform 0.25s ease-out"
  const slideOpacity = slideDir ? 0 : 1

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm sm:p-4 md:p-6"
      onClick={onClose}
    >
      {/* MOBILE — вертикальная карточка снизу */}
      <div
        className="sm:hidden w-full rounded-t-3xl overflow-hidden shadow-2xl flex flex-col bg-white"
        style={{ maxHeight: "95vh" }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Фото 3:4 */}
        <div
          className="relative w-full flex-shrink-0"
          style={{
            aspectRatio: "3/4",
            maxHeight: "58vh",
            transform: slideTransform,
            transition: slideTransition,
            opacity: slideOpacity,
          }}
        >
          <img
            src={modal.image}
            alt={modal.title}
            className={`absolute inset-0 w-full h-full ${modal.contain ? "object-contain bg-white" : "object-cover"}`}
          />
          {/* Закрыть */}
          <button
            className="absolute top-3 right-3 z-20 w-9 h-9 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center"
            onClick={onClose}
          >
            <Icon name="X" size={18} className="text-white" />
          </button>
          {/* Счётчик */}
          {allItems.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-black/40 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
              {idx + 1} / {allItems.length}
            </div>
          )}
          {/* Стрелки */}
          {hasPrev && (
            <button onClick={(e) => { e.stopPropagation(); goPrev() }} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
              <Icon name="ChevronLeft" size={20} />
            </button>
          )}
          {hasNext && (
            <button onClick={(e) => { e.stopPropagation(); goNext() }} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
              <Icon name="ChevronRight" size={20} />
            </button>
          )}
        </div>
        {/* Контент под фото */}
        <div className="flex-1 overflow-y-auto flex flex-col min-h-0">
          {/* Шапка с названием и ценой */}
          <div className="flex-shrink-0">
            {/* Полоска-акцент */}
            <div style={{height:3, background:"linear-gradient(90deg,#7c3aed,#f97316,#f43f5e)"}} />
            <div className="px-4 pt-3 pb-3 flex items-start justify-between gap-2 bg-white">
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-1">🎈 Набор</p>
                <h3 className="text-base font-extrabold leading-snug text-foreground mb-3" style={{fontFamily:"'Montserrat',sans-serif"}}>{modal.title}</h3>
                <div className="inline-flex items-baseline gap-1.5 px-3 py-1 rounded-full" style={{background:"linear-gradient(135deg,#7c3aed,#a855f7)"}}>
                  <span className="text-lg font-black text-white" style={{fontFamily:"'Montserrat',sans-serif"}}>{modal.price}</span>
                </div>
              </div>
              <button
                onClick={() => toggleFavorite(modal.id)}
                className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center shadow-sm transition-all hover:scale-110 active:scale-90 mt-1"
                style={{ background: isFavorite(modal.id) ? "linear-gradient(135deg,#f43f5e,#e11d48)" : "#f5f3ff" }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill={isFavorite(modal.id) ? "#fff" : "none"} stroke={isFavorite(modal.id) ? "#fff" : "#f43f5e"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="px-4 pt-3 pb-1 flex-shrink-0">
            <p className="text-xs font-semibold text-primary uppercase tracking-wide flex items-center gap-1">
              <Icon name="Sparkles" size={11} /> Наполнение
            </p>
          </div>
          <div className="px-4 pb-3 space-y-1.5 flex-shrink-0">
            {modal.description.includes(',') ? (
              <ul className="space-y-1">
                {modal.description.split(',').map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                    <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                    <span>{item.trim().replace(/\.$/, '')}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-foreground/80 leading-relaxed">{modal.description}</p>
            )}
            <div className="bg-primary/8 border border-primary/20 rounded-xl px-3 py-2 text-primary text-xs font-medium">
              🎨 Наполнение можно изменить под ваш бюджет и пожелания
            </div>
          </div>

          {/* Раздел Доставка — единый для всех */}
          <div className="px-4 pb-3 flex-shrink-0">
            <p className="text-xs font-semibold text-primary uppercase tracking-wide flex items-center gap-1 mb-2">
              <Icon name="Truck" size={11} /> Доставка
            </p>
            <div className="rounded-xl overflow-hidden border border-border">
              <div className="flex items-start gap-3 px-3 py-2.5 bg-green-50">
                <span className="flex-shrink-0 mt-0.5">🎁</span>
                <span className="text-xs text-foreground">При заказе от 3500 ₽ — <b>Бесплатно!</b></span>
              </div>
              <div className="flex items-start gap-3 px-3 py-2.5 bg-orange-50 border-t border-border">
                <span className="flex-shrink-0 mt-0.5">🚚</span>
                <span className="text-xs text-foreground">При сумме менее 3500 ₽ — <b>150–500 ₽</b></span>
              </div>
              <div className="flex items-start gap-3 px-3 py-2.5 bg-violet-50 border-t border-border">
                <span className="flex-shrink-0 mt-0.5">📍</span>
                <span className="text-xs text-foreground">Самовывоз: р-н Губернский: ул. Героя Яцкова 19к3</span>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border px-4 py-3 flex-shrink-0 space-y-2.5 bg-white">
            <button
              onClick={() => goOrder("order")}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-bold text-base transition-transform hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg,#f97316,#e63000)", boxShadow: "0 4px 14px rgba(249,115,22,0.35)" }}
            >
              🎈 Оформить заказ
            </button>
            <button
              onClick={() => goOrder("details")}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-base border-2 transition-transform hover:scale-[1.02]"
              style={{ borderColor: "#7c3aed", color: "#7c3aed", background: "#faf5ff" }}
            >
              💬 Уточнить детали
            </button>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <a href="https://wa.me/79885973303" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-white" style={{background:"#25D366"}}>
                <Icon name="MessageSquare" size={11} /> WhatsApp
              </a>
              <a href="https://t.me/sharovik_krd" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-white" style={{background:"#229ED9"}}>
                <Icon name="Send" size={11} /> Telegram
              </a>
              <a href="https://vk.com/sharovik_krd" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-white" style={{background:"#0077FF"}}>
                <Icon name="MessageCircle" size={11} /> ВКонтакте
              </a>
              <a href="https://instagram.com/sharovik_krd" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-white" style={{background:"linear-gradient(45deg,#f09433,#dc2743,#bc1888)"}}>
                <Icon name="Instagram" size={11} /> Instagram
              </a>
              <a href="https://vk.com/sharovik_krd" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-white" style={{background:"#1e3a5f"}}>
                <Icon name="MessageSquare" size={11} /> Max
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP — горизонтальная карточка */}
      <div
        className="hidden sm:flex relative w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl flex-row bg-white"
        style={{ height: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* LEFT — фото */}
        <div className="relative w-[62%] flex-shrink-0">
          <img
            src={modal.image}
            alt={modal.title}
            className={`absolute inset-0 w-full h-full ${modal.contain ? "object-contain bg-white" : "object-cover"}`}
          />
          {modal.subcategory && (
            <div className="absolute top-3 left-3 z-10">
              <span className="text-xs bg-black/40 backdrop-blur-md text-white px-3 py-1 rounded-full font-medium">
                {birthdaySubcategories.find((s) => s.id === modal.subcategory)?.emoji}{" "}
                {birthdaySubcategories.find((s) => s.id === modal.subcategory)?.label}
              </span>
            </div>
          )}
          {hasPrev && (
            <button onClick={(e) => { e.stopPropagation(); goPrev() }} className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
              <Icon name="ChevronLeft" size={22} />
            </button>
          )}
          {hasNext && (
            <button onClick={(e) => { e.stopPropagation(); goNext() }} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
              <Icon name="ChevronRight" size={22} />
            </button>
          )}
          {allItems.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-black/40 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
              {idx + 1} / {allItems.length}
            </div>
          )}
        </div>

        {/* RIGHT — контент */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white">
          {/* Заголовок десктоп */}
          <div className="flex-shrink-0">
            <div style={{height:3, background:"linear-gradient(90deg,#7c3aed,#f97316,#f43f5e)"}} />
            <div className="px-5 pt-4 pb-4 flex items-start justify-between gap-3 bg-white">
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-1">🎈 Набор</p>
                <h3 className="text-xl font-extrabold leading-snug text-foreground mb-3" style={{fontFamily:"'Montserrat',sans-serif"}}>{modal.title}</h3>
                <div className="inline-flex items-baseline gap-1.5 px-4 py-1.5 rounded-full" style={{background:"linear-gradient(135deg,#7c3aed,#a855f7)"}}>
                  <span className="text-xl font-black text-white" style={{fontFamily:"'Montserrat',sans-serif"}}>{modal.price}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 mt-1">
                <button onClick={() => toggleFavorite(modal.id)} className="w-9 h-9 rounded-full flex items-center justify-center shadow-sm transition-all hover:scale-110 active:scale-90" style={{ background: isFavorite(modal.id) ? "linear-gradient(135deg,#f43f5e,#e11d48)" : "#f5f3ff" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill={isFavorite(modal.id) ? "#fff" : "none"} stroke={isFavorite(modal.id) ? "#fff" : "#f43f5e"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </button>
                <button className="w-9 h-9 flex-shrink-0 bg-muted rounded-full flex items-center justify-center hover:bg-muted/80 transition-colors" onClick={onClose}><Icon name="X" size={18} /></button>
              </div>
            </div>
          </div>
          <div className="px-5 pt-4 pb-1 flex-shrink-0">
            <p className="text-xs font-semibold text-primary uppercase tracking-wide flex items-center gap-1.5">
              <Icon name="Sparkles" size={13} /> Наполнение
            </p>
          </div>
          <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-3 min-h-0">
            {modal.description.includes(',') ? (
              <ul className="space-y-1.5">
                {modal.description.split(',').map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm sm:text-base text-foreground/80">
                    <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                    <span>{item.trim().replace(/\.$/, '')}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-foreground/80 leading-relaxed text-sm sm:text-base text-left">{modal.description}</p>
            )}
            <div className="bg-primary/8 border border-primary/20 rounded-xl px-4 py-3 text-primary text-sm font-medium">
              🎨 Наполнение любой композиции можно изменить под ваш бюджет и пожелания.
            </div>
            {/* Доставка — единый красивый блок */}
            <div>
              <p className="text-xs font-semibold text-primary uppercase tracking-wide flex items-center gap-1.5 mb-2">
                <Icon name="Truck" size={13} /> Доставка
              </p>
              <div className="rounded-xl overflow-hidden border border-border">
                <div className="flex items-center gap-3 px-4 py-3 bg-green-50">
                  <span className="text-base">🎁</span>
                  <span className="text-sm text-foreground">При заказе от 3500 ₽ — <b>Бесплатно!</b></span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 bg-orange-50 border-t border-border">
                  <span className="text-base">🚚</span>
                  <span className="text-sm text-foreground">При сумме менее 3500 ₽ — <b>150–500 ₽</b></span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 bg-violet-50 border-t border-border">
                  <span className="text-base">📍</span>
                  <span className="text-sm text-foreground">Самовывоз: р-н Губернский: ул. Героя Яцкова 19к3</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-border px-5 py-4 flex-shrink-0 space-y-2.5 bg-white">
            <button
              onClick={() => goOrder("order")}
              className="w-full py-3.5 rounded-xl text-white font-bold text-base transition-transform hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg,#f97316,#e63000)", boxShadow: "0 4px 14px rgba(249,115,22,0.35)" }}
            >
              🎈 Оформить заказ
            </button>
            <button
              onClick={() => goOrder("details")}
              className="w-full py-3.5 rounded-xl font-bold text-base border-2 transition-transform hover:scale-[1.02]"
              style={{ borderColor: "#7c3aed", color: "#7c3aed", background: "#faf5ff" }}
            >
              💬 Уточнить детали
            </button>
            <div className="flex flex-wrap gap-1.5">
              <a href="https://wa.me/79885973303" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-white transition-opacity hover:opacity-90" style={{background:"#25D366"}}>
                <Icon name="MessageSquare" size={12} /> WhatsApp
              </a>
              <a href="https://t.me/sharovik_krd" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-white transition-opacity hover:opacity-90" style={{background:"#229ED9"}}>
                <Icon name="Send" size={12} /> Telegram
              </a>
              <a href="https://vk.com/sharovik_krd" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-white transition-opacity hover:opacity-90" style={{background:"#0077FF"}}>
                <Icon name="MessageCircle" size={12} /> ВКонтакте
              </a>
              <a href="https://instagram.com/sharovik_krd" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-white transition-opacity hover:opacity-90" style={{background:"linear-gradient(45deg,#f09433,#dc2743,#bc1888)"}}>
                <Icon name="Instagram" size={12} /> Instagram
              </a>
              <a href="https://vk.com/sharovik_krd" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-white transition-opacity hover:opacity-90" style={{background:"#1e3a5f"}}>
                <Icon name="MessageSquare" size={12} /> Max
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}