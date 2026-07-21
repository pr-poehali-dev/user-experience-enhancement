import { useRef, useEffect, useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import Icon from "@/components/ui/icon"
import { Composition, getPopularCompositions } from "@/data/catalogData"
import CompositionCard from "@/components/catalog/CompositionCard"

const CARD_W = "clamp(132px, 34vw, 220px)"
const CARD_GAP = 14
const BASE_SPEED = 1.8

export function PopularPackages() {
  const navigate = useNavigate()
  const [packages, setPackages] = useState<Composition[]>([])

  // Catalog.tsx подгружается лениво и именно там регистрируются все композиции.
  // На главной странице этот модуль ещё не загружен, поэтому подгружаем его явно,
  // чтобы получить актуальный список популярных наборов.
  useEffect(() => {
    const existing = getPopularCompositions()
    if (existing.length > 0) {
      setPackages(existing)
      return
    }
    import("@/pages/Catalog").then(() => {
      setPackages(getPopularCompositions())
    })
  }, [])

  const trackRef = useRef<HTMLDivElement>(null)
  const posRef = useRef(0)
  const speedRef = useRef(BASE_SPEED)
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const isPausedRef = useRef(false) // пауза во время ручного свайпа
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Свайп — touch
  const touchStartXRef = useRef(0)
  const lastTouchXRef = useRef(0)
  const touchVelRef = useRef(0)
  const touchMovedRef = useRef(false) // двигали ли палец (не просто тап)

  // Свайп — mouse
  const mouseDownRef = useRef(false)
  const mouseStartXRef = useRef(0)
  const lastMouseXRef = useRef(0)
  const mouseMovedRef = useRef(false)

  const startAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current)
    autoRef.current = setInterval(() => {
      if (isPausedRef.current) return
      const track = trackRef.current
      if (!track) return
      const halfW = track.scrollWidth / 2
      if (halfW <= 0) return
      if (speedRef.current > BASE_SPEED) {
        speedRef.current = Math.max(BASE_SPEED, speedRef.current * 0.97)
      }
      posRef.current += speedRef.current
      if (posRef.current >= halfW) posRef.current -= halfW
      track.style.transform = `translateX(-${posRef.current}px)`
    }, 16)
  }, [])

  useEffect(() => {
    startAuto()
    return () => {
      if (autoRef.current) clearInterval(autoRef.current)
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    }
  }, [startAuto, packages.length])

  // Возобновляем авто-прокрутку через 1.5с после того как пользователь прекратил листать
  const scheduleResume = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    resumeTimerRef.current = setTimeout(() => {
      isPausedRef.current = false
    }, 1500)
  }

  const doubled = [...packages, ...packages]

  // --- Touch handlers ---
  const handleTouchStart = (e: React.TouchEvent) => {
    isPausedRef.current = true
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    touchStartXRef.current = e.touches[0].clientX
    lastTouchXRef.current = e.touches[0].clientX
    touchVelRef.current = 0
    touchMovedRef.current = false
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const dx = lastTouchXRef.current - e.touches[0].clientX
    lastTouchXRef.current = e.touches[0].clientX
    touchVelRef.current = dx
    if (Math.abs(dx) > 2) touchMovedRef.current = true

    const track = trackRef.current
    if (!track) return
    const halfW = track.scrollWidth / 2
    posRef.current += dx
    if (posRef.current < 0) posRef.current += halfW
    if (posRef.current >= halfW) posRef.current -= halfW
    track.style.transform = `translateX(-${posRef.current}px)`
  }

  const handleTouchEnd = () => {
    const vel = touchVelRef.current
    if (Math.abs(vel) > 1) {
      speedRef.current = Math.max(BASE_SPEED, Math.min(12, Math.abs(vel)))
    }
    scheduleResume()
  }

  // --- Mouse handlers ---
  const handleMouseDown = (e: React.MouseEvent) => {
    mouseDownRef.current = true
    mouseStartXRef.current = e.clientX
    lastMouseXRef.current = e.clientX
    mouseMovedRef.current = false
    isPausedRef.current = true
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!mouseDownRef.current) return
    const dx = lastMouseXRef.current - e.clientX
    lastMouseXRef.current = e.clientX
    if (Math.abs(dx) > 2) mouseMovedRef.current = true

    const track = trackRef.current
    if (!track) return
    const halfW = track.scrollWidth / 2
    posRef.current += dx
    if (posRef.current < 0) posRef.current += halfW
    if (posRef.current >= halfW) posRef.current -= halfW
    track.style.transform = `translateX(-${posRef.current}px)`
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!mouseDownRef.current) return
    mouseDownRef.current = false
    const totalDx = Math.abs(mouseStartXRef.current - e.clientX)
    if (totalDx > 5) {
      speedRef.current = Math.max(BASE_SPEED, Math.min(10, totalDx / 20))
    }
    scheduleResume()
  }

  const handleMouseLeave = () => {
    if (mouseDownRef.current) {
      mouseDownRef.current = false
    }
    isPausedRef.current = false
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
  }

  const handleMouseEnter = () => {
    isPausedRef.current = true
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
  }

  if (packages.length === 0) return null

  return (
    <section id="popular" className="py-10 sm:py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-12">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontWeight: 500,
              fontSize: "clamp(30px, 4.2vw, 54px)", color: "#1a1024", lineHeight: 1.1,
            }}>
              Популярные{" "}
              <span style={{ fontFamily: "'Marck Script', cursive", fontWeight: 400, color: "#8b5cf6" }}>
                наборы
              </span>
            </h2>
            <p className="text-sm sm:text-lg mt-1 sm:mt-2" style={{ color: "#5c5468", fontFamily: "'Montserrat', sans-serif" }}>
              Самые любимые композиции наших покупателей
            </p>
          </div>
          <button
            onClick={() => navigate("/popular")}
            className="flex-shrink-0 flex items-center gap-2 rounded-full font-bold text-white transition-transform hover:scale-105"
            style={{
              background: "#6d28d9",
              boxShadow: "0 6px 20px rgba(109,40,217,0.28)",
              padding: "10px 20px",
              fontSize: "clamp(13px,1.3vw,16px)",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Смотреть все <Icon name="ArrowRight" size={18} />
          </button>
        </div>
      </div>

      {/* Лента: пауза при ручном листании, возобновление через 1.5с */}
      <div
        style={{ cursor: "grab", userSelect: "none" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={trackRef} style={{ display: "flex", gap: CARD_GAP, willChange: "transform" }}>
          {doubled.map((pkg, index) => (
            <div
              key={`${pkg.id}-${index}`}
              style={{ width: CARD_W, flexShrink: 0 }}
              onClickCapture={(e) => { if (mouseMovedRef.current) { e.stopPropagation(); e.preventDefault() } }}
            >
              <CompositionCard item={pkg} backPath="/" square />
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}