import { useState, useMemo, useEffect, useRef, useCallback, Fragment } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import Icon from "@/components/ui/icon"
import {
  Composition,
  ModalItem,
  COLOR_OPTIONS,
  birthdaySubcategories,
  dischargeSubcategories,
} from "@/data/catalogData"
import CompositionModal from "./CompositionModal"
import { useFavorites } from "@/context/FavoritesContext"
import { HighlightedTitle } from "@/utils/titleHighlight"

declare global { interface Window { _catalogScrollY?: number } }

function PriceInputs({
  minPrice,
  maxPrice,
  onMinChange,
  onMaxChange,
}: {
  minPrice: number | ""
  maxPrice: number | ""
  onMinChange: (v: number | "") => void
  onMaxChange: (v: number | "") => void
}) {
  const hasValue = minPrice !== "" || maxPrice !== ""
  return (
    <div className="flex items-center gap-2">
      <span
        className="text-xs font-bold px-2.5 py-1.5 rounded-full whitespace-nowrap flex-shrink-0"
        style={{
          background: hasValue ? "linear-gradient(135deg,#7c3aed,#a855f7)" : "rgba(124,58,237,0.1)",
          color: hasValue ? "#fff" : "#7c3aed",
        }}
      >
        💰 Бюджет
      </span>
      <input
        type="number"
        value={minPrice}
        placeholder="от ₽"
        onChange={(e) => onMinChange(e.target.value === "" ? "" : Number(e.target.value))}
        className="w-0 flex-1 min-w-0 text-center text-sm font-bold text-primary border-2 border-primary/30 rounded-xl px-2 py-1.5 focus:outline-none focus:border-primary bg-white"
      />
      <span className="text-muted-foreground font-bold flex-shrink-0">—</span>
      <input
        type="number"
        value={maxPrice}
        placeholder="до ₽"
        onChange={(e) => onMaxChange(e.target.value === "" ? "" : Number(e.target.value))}
        className="w-0 flex-1 min-w-0 text-center text-sm font-bold text-primary border-2 border-primary/30 rounded-xl px-2 py-1.5 focus:outline-none focus:border-primary bg-white"
      />
    </div>
  )
}

// Мобильный фильтр цветов — кнопка + попап
function MobileColorFilter({
  activeColors,
  toggleColor,
}: {
  activeColors: string[]
  toggleColor: (id: string) => void
}) {
  const [open, setOpen] = useState(false)
  const hasActive = activeColors.length > 0

  return (
    <Fragment>
      {/* Кнопка — только мобайл */}
      <div className="flex sm:hidden items-center gap-2">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-bold border-2 transition-all"
          style={{
            background: hasActive ? "linear-gradient(135deg,#f97316,#e63000)" : "rgba(249,115,22,0.08)",
            borderColor: hasActive ? "#e63000" : "rgba(249,115,22,0.3)",
            color: hasActive ? "#fff" : "#f97316",
          }}
        >
          <span>🎨</span>
          <span>Выбрать цвет</span>
          {hasActive && (
            <span className="bg-white/30 text-white rounded-full px-1.5 text-xs font-bold">
              {activeColors.length}
            </span>
          )}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
        {/* Сброс активных цветов */}
        {hasActive && (
          <button
            onClick={() => activeColors.forEach(c => toggleColor(c))}
            className="text-xs text-muted-foreground underline"
          >
            Сбросить
          </button>
        )}
      </div>

      {/* Попап */}
      {open && (
        <div className="sm:hidden fixed inset-0 z-50 flex items-end" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="relative w-full bg-white rounded-t-3xl shadow-2xl p-5 pb-8"
            onClick={e => e.stopPropagation()}
          >
            {/* Шапка попапа */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-foreground">🎨 Выберите цвет</h3>
              <button onClick={() => setOpen(false)} className="p-1.5 rounded-full bg-muted">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            {/* Цвета */}
            <div className="flex flex-wrap gap-2">
              {COLOR_OPTIONS.map((color) => {
                const isActive = activeColors.includes(color.id)
                return (
                  <button
                    key={color.id}
                    onClick={() => toggleColor(color.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium border-2 transition-all ${
                      isActive ? "border-primary shadow-md scale-105" : "border-transparent bg-muted"
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ background: color.hex, border: color.border ? "1px solid #d1d5db" : undefined }}
                    />
                    <span className="text-foreground/80">{color.label}</span>
                  </button>
                )
              })}
            </div>
            {/* Кнопка применить */}
            <button
              onClick={() => setOpen(false)}
              className="mt-5 w-full py-3 rounded-2xl text-white font-bold text-sm"
              style={{ background: "linear-gradient(135deg,#f97316,#e63000)" }}
            >
              Применить {hasActive ? `(${activeColors.length})` : ""}
            </button>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default function CompositionGrid({
  items,
  showSubcategoryBadge,
  showDischargeBadge,
}: {
  items: Composition[]
  showSubcategoryBadge?: boolean
  showDischargeBadge?: boolean
}) {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const activeSubcategories = useMemo(() => {
    const val = searchParams.get("sub")
    return val ? [val] : []
  }, [searchParams])

  const activeColors = useMemo(() => {
    const val = searchParams.get("colors")
    return val ? val.split(",") : []
  }, [searchParams])

  const minPrice: number | "" = useMemo(() => {
    const val = searchParams.get("minPrice")
    return val ? Number(val) : ""
  }, [searchParams])

  const maxPrice: number | "" = useMemo(() => {
    const val = searchParams.get("maxPrice")
    return val ? Number(val) : ""
  }, [searchParams])

  const [modal, setModal] = useState<ModalItem>(null)
  const { toggleFavorite, isFavorite } = useFavorites()

  const visibleCountKey = "catalog_visible_" + (searchParams.get("section") ?? "home")
  const [visibleCount, setVisibleCountState] = useState<number>(() => {
    const saved = sessionStorage.getItem(visibleCountKey)
    return saved ? parseInt(saved) : 50
  })
  const setVisibleCount = (val: number | ((prev: number) => number)) => {
    setVisibleCountState(prev => {
      const next = typeof val === "function" ? val(prev) : val
      sessionStorage.setItem(visibleCountKey, String(next))
      return next
    })
  }

  // Автозагрузка при скролле до конца
  const sentinelRef = useRef<HTMLDivElement>(null)
  const loadMore = useCallback(() => {
    setVisibleCount(prev => prev + 50)
  }, [])
  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) loadMore()
    }, { rootMargin: "400px" })
    obs.observe(el)
    return () => obs.disconnect()
  }, [loadMore, visibleCount])

  const updateParams = (updates: Record<string, string | null>) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev)
      Object.entries(updates).forEach(([k, v]) => {
        if (v === null || v === "") next.delete(k)
        else next.set(k, v)
      })
      if (!next.has("section") && prev.has("section")) {
        next.set("section", prev.get("section")!)
      }
      return next
    }, { replace: true })
  }

  const resetVisible = () => {
    sessionStorage.removeItem(visibleCountKey)
    setVisibleCount(50)
  }

  const toggleSubcategory = (id: string) => {
    updateParams({ sub: activeSubcategories.includes(id) ? null : id })
    resetVisible()
  }

  const toggleColor = (id: string) => {
    const next = activeColors.includes(id) ? [] : [id]
    updateParams({ colors: next.length ? next.join(",") : null })
    resetVisible()
  }

  const setMinPrice = (val: number | "") => {
    updateParams({ minPrice: val === "" ? null : String(val) })
    resetVisible()
  }

  const setMaxPrice = (val: number | "") => {
    updateParams({ maxPrice: val === "" ? null : String(val) })
    resetVisible()
  }

  const resetAll = () => {
    updateParams({ sub: null, colors: null, minPrice: null, maxPrice: null })
    resetVisible()
  }

  const hasFilters =
    activeSubcategories.length > 0 ||
    activeColors.length > 0 ||
    minPrice !== "" ||
    maxPrice !== ""

  const filtered = useMemo(() => items
    .filter((item) => minPrice === "" || item.priceNum >= minPrice)
    .filter((item) => maxPrice === "" || item.priceNum <= maxPrice)
    .filter((item) => activeSubcategories.length === 0 || (item.subcategory && activeSubcategories.includes(item.subcategory)))
    .filter((item) => activeColors.length === 0 || activeColors.some((c) => item.colors.includes(c)))
    .sort((a, b) => {
      const numA = parseInt(a.title.match(/\d+$/)?.[0] ?? "0")
      const numB = parseInt(b.title.match(/\d+$/)?.[0] ?? "0")
      return numA - numB
    }), [items, minPrice, maxPrice, activeSubcategories, activeColors])

  const getBirthdayLabel = (id: string) =>
    birthdaySubcategories.find((s) => s.id === id)?.label ?? id
  const getDischargeLabel = (id: string) =>
    dischargeSubcategories.find((s) => s.id === id)?.label ?? id

  return (
    <>
      {/* Filters */}
      <div className="mb-4 sm:mb-8 space-y-2 sm:space-y-6 bg-muted/40 rounded-2xl p-2.5 sm:p-5">

        {/* Birthday subcategory filter */}
        {showSubcategoryBadge && (
          <div>
            <p className="text-xs sm:text-sm font-semibold text-muted-foreground mb-1.5 sm:mb-3 uppercase tracking-wide">Выберите для кого нужны шарики</p>
            {/* Main 4 — full row, bigger */}
            <div className="grid grid-cols-4 gap-1.5 sm:gap-3 mb-1.5 sm:mb-3">
              {birthdaySubcategories.filter(c => c.main).map((cat) => {
                const isActive = activeSubcategories.includes(cat.id)
                const mainColors: Record<string, string> = {
                  girl: "bg-gradient-to-br from-pink-400 to-rose-500",
                  man: "bg-gradient-to-br from-blue-500 to-blue-700",
                  boy: "bg-gradient-to-br from-cyan-400 to-blue-500",
                  "kid-girl": "bg-gradient-to-br from-purple-400 to-pink-500",
                }
                return (
                  <button
                    key={cat.id}
                    onClick={() => toggleSubcategory(cat.id)}
                    className={`flex flex-col items-center justify-center gap-1 sm:gap-2 py-2 sm:py-5 px-1 sm:px-3 rounded-xl sm:rounded-2xl font-bold border-2 transition-all ${
                      isActive
                        ? `${mainColors[cat.id]} text-white shadow-lg scale-[1.03] border-transparent`
                        : "border-border bg-white text-foreground hover:border-primary/60 hover:bg-primary/5"
                    }`}
                  >
                    <span className="text-2xl sm:text-3xl">{cat.emoji}</span>
                    <span className="text-xs sm:text-base text-center leading-tight">{cat.label}</span>
                  </button>
                )
              })}
            </div>
            {/* Secondary — smaller grid */}
            <div className="grid grid-cols-6 gap-1 sm:gap-2">
              {birthdaySubcategories.filter(c => !c.main).map((cat) => {
                const isActive = activeSubcategories.includes(cat.id)
                return (
                  <button
                    key={cat.id}
                    onClick={() => toggleSubcategory(cat.id)}
                    className={`relative flex flex-col items-center justify-center gap-0.5 sm:gap-1 py-1.5 sm:py-4 px-0.5 sm:px-2 rounded-lg sm:rounded-xl font-semibold border-2 transition-all ${
                      isActive
                        ? "border-primary bg-primary text-primary-foreground shadow-md scale-[1.03]"
                        : "border-border bg-white text-foreground hover:border-primary/60 hover:bg-primary/5"
                    }`}
                  >
                    {(cat as { hit?: boolean }).hit && (
                      <span className="absolute -top-2 -right-1 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow">ХИТ</span>
                    )}
                    <span className="text-xl sm:text-2xl">{cat.emoji}</span>
                    <span className="text-center leading-tight text-[10px] sm:text-sm">{cat.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Discharge subcategory filter */}
        {showDischargeBadge && (
          <div>
            <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Выберите кого встречаем</p>
            <div className="grid grid-cols-2 gap-4">
              {dischargeSubcategories.map((cat) => {
                const isActive = activeSubcategories.includes(cat.id)
                const isBoy = cat.id === "boy-discharge"
                const activeBg = isBoy
                  ? "bg-gradient-to-br from-blue-400 to-blue-600 text-white"
                  : "bg-gradient-to-br from-pink-400 to-rose-500 text-white"
                return (
                  <button
                    key={cat.id}
                    onClick={() => toggleSubcategory(cat.id)}
                    className={`flex flex-col items-center justify-center gap-3 py-6 px-4 rounded-2xl font-bold border-2 transition-all shadow-md ${
                      isActive
                        ? `${activeBg} border-transparent shadow-lg scale-[1.02]`
                        : "bg-white text-foreground border-border hover:border-primary/40 hover:bg-primary/5"
                    }`}
                  >
                    <span className="text-4xl">{cat.emoji}</span>
                    <span className="text-lg font-bold">{cat.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Color filter — на мобайле: кнопка + попап; на десктопе: как раньше */}
        <MobileColorFilter
          activeColors={activeColors}
          toggleColor={toggleColor}
        />
        {/* Десктоп цвета */}
        <div className="hidden sm:flex flex-wrap items-center gap-1.5">
          <span
            className="text-xs font-bold px-2.5 py-1.5 rounded-full whitespace-nowrap flex-shrink-0"
            style={{
              background: activeColors.length > 0 ? "linear-gradient(135deg,#f97316,#e63000)" : "rgba(249,115,22,0.1)",
              color: activeColors.length > 0 ? "#fff" : "#f97316",
            }}
          >
            🎨 Цвет
          </span>
          {COLOR_OPTIONS.map((color) => {
            const isActive = activeColors.includes(color.id)
            return (
              <button
                key={color.id}
                onClick={() => toggleColor(color.id)}
                title={color.label}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border-2 transition-all whitespace-nowrap ${
                  isActive ? "border-primary shadow-md scale-105" : "border-transparent bg-muted hover:border-border"
                }`}
              >
                <span
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ background: color.hex, border: color.border ? "1px solid #d1d5db" : undefined }}
                />
                <span className="text-foreground/80">{color.label}</span>
              </button>
            )
          })}
        </div>

        {/* Price inputs */}
        <PriceInputs
          minPrice={minPrice}
          maxPrice={maxPrice}
          onMinChange={setMinPrice}
          onMaxChange={setMaxPrice}
        />

        {hasFilters && (
          <button
            onClick={resetAll}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name="X" size={14} /> Сбросить все фильтры
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <div className="text-5xl mb-4">🎈</div>
          <p className="text-lg">Нет подходящих композиций</p>
          <button onClick={resetAll} className="mt-4 text-primary underline text-sm">
            Сбросить фильтры
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
          {filtered.slice(0, visibleCount).map((item, idx) => (
            <div
              key={`${item.subcategory ?? "item"}-${item.id}-${idx}`}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 sm:hover:scale-110${item.highlight ? " ring-4 ring-red-500 ring-offset-2" : ""}`}
              onClick={() => { window._catalogScrollY = window.scrollY; setModal(item) }}
            >
              <img src={item.image} alt={item.title} className="w-full object-cover sm:group-hover:scale-110 transition-transform duration-500" style={{ aspectRatio: "3/4" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300" />
              {/* Price + title overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent pt-6 pb-9 px-2">
                <p className="text-white font-extrabold text-sm sm:text-base drop-shadow-lg leading-tight">{item.price}</p>
              </div>
              {/* Нижняя панель: ♥ + Оформить */}
              <div className="absolute bottom-0 left-0 right-0 flex items-center gap-1.5 px-2 pb-2 z-10">
                <button
                  className="w-7 h-7 rounded-full flex items-center justify-center shadow-md transition-all active:scale-90 flex-shrink-0"
                  style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(4px)" }}
                  onClick={e => { e.stopPropagation(); toggleFavorite(item.id) }}
                  title={isFavorite(item.id) ? "Убрать из избранного" : "В избранное"}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24"
                    fill={isFavorite(item.id) ? "#f43f5e" : "none"}
                    stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    style={{ transition: "transform 0.2s, fill 0.2s", transform: isFavorite(item.id) ? "scale(1.25)" : "scale(1)" }}
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
                <button
                  className="w-7 h-7 rounded-full flex items-center justify-center shadow-md transition-all active:scale-90 flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#f97316,#e63000)" }}
                  onClick={e => { e.stopPropagation(); navigate(`/order?mode=order&title=${encodeURIComponent(item.title)}`) }}
                  title="Оформить заказ"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div ref={sentinelRef} className="h-4" />
      {filtered.length > visibleCount && (
        <div className="h-12 flex items-center justify-center">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{animationDelay:"0ms"}} />
            <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{animationDelay:"150ms"}} />
            <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{animationDelay:"300ms"}} />
          </div>
        </div>
      )}

      {modal && (
        <CompositionModal
          modal={modal}
          allItems={filtered}
          onNavigate={(item) => {
            const newIdx = filtered.findIndex(i => `${i.subcategory ?? ""}|${i.id}|${i.title}` === `${item.subcategory ?? ""}|${item.id}|${item.title}`)
            if (newIdx >= visibleCount) setVisibleCount(newIdx + 12)
            setModal(item)
          }}
          onClose={() => {
            const scrollY = window._catalogScrollY ?? 0
            setModal(null)
            requestAnimationFrame(() => window.scrollTo(0, scrollY))
          }}
        />
      )}
    </>
  )
}