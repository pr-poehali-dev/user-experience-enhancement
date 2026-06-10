import { useEffect, useRef, useState } from "react"
import Icon from "@/components/ui/icon"
import { PopularPkg } from "@/components/PopularPackages"

export default function PopularModal({ item, all, onNav, onClose }: {
  item: PopularPkg
  all: PopularPkg[]
  onNav: (p: PopularPkg) => void
  onClose: () => void
}) {
  const idx = all.findIndex(p => p.title === item.title)
  const hasPrev = idx > 0
  const hasNext = idx < all.length - 1

  const touchStartX = useRef(0)
  const touchCurrentX = useRef(0)
  const isDragging = useRef(false)
  const [swipeOffset, setSwipeOffset] = useState(0)
  const [slideDir, setSlideDir] = useState<"left" | "right" | null>(null)

  const goPrev = () => { if (hasPrev) onNav(all[idx - 1]) }
  const goNext = () => { if (hasNext) onNav(all[idx + 1]) }

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
  }, [item])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev()
      if (e.key === "ArrowRight") goNext()
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [idx, all])

  const slideTransform = slideDir === "left" ? "translateX(-100%)" : slideDir === "right" ? "translateX(100%)" : `translateX(${swipeOffset}px)`
  const slideTransition = slideDir ? "transform 0.2s ease-out, opacity 0.2s ease-out" : isDragging.current ? "none" : "transform 0.25s ease-out"
  const slideOpacity = slideDir ? 0 : 1

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm sm:p-4"
      onClick={onClose}
    >
      {/* Mobile */}
      <div
        className="sm:hidden w-full rounded-t-3xl overflow-hidden shadow-2xl bg-white flex flex-col"
        style={{ maxHeight: "92vh" }}
        onClick={e => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="relative w-full flex-shrink-0"
          style={{
            aspectRatio: "3/4",
            maxHeight: "55vh",
            transform: slideTransform,
            transition: slideTransition,
            opacity: slideOpacity,
          }}
        >
          <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
          <button
            className="absolute top-3 right-3 z-10 w-9 h-9 bg-black/40 rounded-full flex items-center justify-center"
            onClick={onClose}
          >
            <Icon name="X" size={18} className="text-white" />
          </button>
          {all.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/40 text-white text-xs px-3 py-1 rounded-full">
              {idx + 1} / {all.length}
            </div>
          )}
          {hasPrev && (
            <button onClick={e => { e.stopPropagation(); goPrev() }} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg">
              <Icon name="ChevronLeft" size={20} />
            </button>
          )}
          {hasNext && (
            <button onClick={e => { e.stopPropagation(); goNext() }} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg">
              <Icon name="ChevronRight" size={20} />
            </button>
          )}
        </div>
        <div className="p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{item.emoji}</span>
            <div>
              <h3 className="font-bold text-base">{item.title}</h3>
              <div className="text-orange-500 font-bold">{item.price}</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {item.highlights.map((h, i) => (
              <span key={i} className="text-xs bg-muted px-2.5 py-1 rounded-full">{h}</span>
            ))}
          </div>
          <div className="flex gap-2 pt-1">
            <a href="tel:+79885973303" className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-2.5 rounded-full font-semibold text-sm">
              <Icon name="Phone" size={14} /> Позвонить
            </a>
            <a href="https://wa.me/79885973303" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-2.5 rounded-full font-semibold text-sm">
              <Icon name="MessageSquare" size={14} /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div
        className="hidden sm:flex w-full max-w-4xl rounded-3xl overflow-hidden bg-white shadow-2xl"
        style={{ height: "80vh" }}
        onClick={e => e.stopPropagation()}
      >
        <div className="relative w-1/2 flex-shrink-0">
          <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
          {hasPrev && (
            <button onClick={e => { e.stopPropagation(); goPrev() }} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white">
              <Icon name="ChevronLeft" size={22} />
            </button>
          )}
          {hasNext && (
            <button onClick={e => { e.stopPropagation(); goNext() }} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white">
              <Icon name="ChevronRight" size={22} />
            </button>
          )}
          {all.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/40 text-white text-xs px-3 py-1 rounded-full">
              {idx + 1} / {all.length}
            </div>
          )}
        </div>
        <div className="flex-1 flex flex-col p-8 gap-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{item.emoji}</span>
              <div>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{item.category}</span>
                <h3 className="text-xl font-bold mt-1">{item.title}</h3>
              </div>
            </div>
            <button onClick={onClose} className="w-9 h-9 bg-muted rounded-full flex items-center justify-center hover:bg-muted/80">
              <Icon name="X" size={18} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            {[1,2,3,4,5].map(s => (
              <span key={s} style={{ color: "#f97316", fontSize: 18 }}>★</span>
            ))}
            <span className="text-sm font-semibold">{item.rating}</span>
            <span className="text-sm text-muted-foreground">({item.reviews} отзывов)</span>
          </div>
          <div className="text-3xl font-bold text-orange-500">{item.price}</div>
          <div className="flex flex-wrap gap-2">
            {item.highlights.map((h, i) => (
              <span key={i} className="text-sm bg-muted px-3 py-1 rounded-full">{h}</span>
            ))}
          </div>
          <div className="mt-auto flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">Напишите нам номер набора, поможем с заказом и доставкой</p>
            <div className="flex gap-2">
              <a href="tel:+79885973303" className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-full font-semibold">
                <Icon name="Phone" size={16} /> 8 988 597 33 03
              </a>
              <a href="https://wa.me/79885973303" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-full font-semibold">
                <Icon name="MessageSquare" size={16} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
