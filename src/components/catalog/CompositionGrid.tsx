import { useState, useMemo, useEffect, useRef } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import Icon from "@/components/ui/icon"
import {
  Composition,
  COLOR_OPTIONS,
  birthdaySubcategories,
  dischargeSubcategories,
} from "@/data/catalogData"
import { useFavorites } from "@/context/FavoritesContext"

declare global { interface Window { _catalogScrollY?: number } }

const PAGE_SIZE = 40

// Универсальная кнопка-фильтр с выпадающей панелью
function FilterDropdown({
  label,
  icon,
  activeLabel,
  isActive,
  panel,
}: {
  label: string
  icon: string
  activeLabel?: string
  isActive: boolean
  panel: (close: () => void) => React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          display: "flex", alignItems: "center", gap: 7,
          padding: "9px 14px", borderRadius: 999,
          fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 13,
          background: isActive ? "#6d28d9" : "#fff",
          color: isActive ? "#fff" : "#3a2d4d",
          border: isActive ? "1px solid #6d28d9" : "1px solid #ece4fb",
          whiteSpace: "nowrap", cursor: "pointer", transition: "all 0.15s",
        }}
      >
        <span>{icon}</span>
        <span>{isActive && activeLabel ? activeLabel : label}</span>
        <Icon name="ChevronDown" size={14} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
      </button>
      {open && (
        <div
          className="absolute left-0 top-[calc(100%+8px)] z-50 bg-white rounded-2xl shadow-2xl"
          style={{ minWidth: 260, border: "1px solid #ece4fb", padding: 16 }}
        >
          {panel(() => setOpen(false))}
        </div>
      )}
    </div>
  )
}

function ColorPanel({ activeColors, toggleColor, close }: {
  activeColors: string[]
  toggleColor: (id: string) => void
  close: () => void
}) {
  return (
    <div>
      <div className="flex flex-wrap gap-2" style={{ maxWidth: 320 }}>
        {COLOR_OPTIONS.map((color) => {
          const isActive = activeColors.includes(color.id)
          return (
            <button
              key={color.id}
              onClick={() => toggleColor(color.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border-2 transition-all ${
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
      <button
        onClick={close}
        className="mt-4 w-full py-2.5 rounded-xl text-white font-bold text-sm"
        style={{ background: "#6d28d9" }}
      >
        Применить
      </button>
    </div>
  )
}

function BudgetPanel({ minPrice, maxPrice, onMinChange, onMaxChange, close }: {
  minPrice: number | ""
  maxPrice: number | ""
  onMinChange: (v: number | "") => void
  onMaxChange: (v: number | "") => void
  close: () => void
}) {
  return (
    <div style={{ width: 260 }}>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={minPrice}
          placeholder="от ₽"
          onChange={(e) => onMinChange(e.target.value === "" ? "" : Number(e.target.value))}
          className="w-0 flex-1 min-w-0 text-center text-sm font-bold rounded-xl px-2 py-2 focus:outline-none bg-muted"
          style={{ color: "#6d28d9" }}
        />
        <span className="text-muted-foreground font-bold flex-shrink-0">—</span>
        <input
          type="number"
          value={maxPrice}
          placeholder="до ₽"
          onChange={(e) => onMaxChange(e.target.value === "" ? "" : Number(e.target.value))}
          className="w-0 flex-1 min-w-0 text-center text-sm font-bold rounded-xl px-2 py-2 focus:outline-none bg-muted"
          style={{ color: "#6d28d9" }}
        />
      </div>
      <button
        onClick={close}
        className="mt-4 w-full py-2.5 rounded-xl text-white font-bold text-sm"
        style={{ background: "#6d28d9" }}
      >
        Применить
      </button>
    </div>
  )
}

function Pagination({ page, totalPages, onChange }: {
  page: number
  totalPages: number
  onChange: (p: number) => void
}) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div
      className="sticky bottom-0 z-30 flex items-center justify-center gap-1.5 flex-wrap mt-8 sm:mt-12 py-2.5 bg-white/95 backdrop-blur-sm"
      style={{ boxShadow: "0 -4px 16px rgba(109,40,217,0.08)" }}
    >
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="w-9 h-9 rounded-full flex items-center justify-center disabled:opacity-30 bg-white flex-shrink-0"
        style={{ border: "1px solid #ece4fb", color: "#5b21b6" }}
      >
        <Icon name="ChevronLeft" size={16} />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className="flex-shrink-0"
          style={{
            width: 36, height: 36, borderRadius: "50%",
            fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 13,
            background: p === page ? "#6d28d9" : "#fff",
            color: p === page ? "#fff" : "#3a2d4d",
            border: p === page ? "1px solid #6d28d9" : "1px solid #ece4fb",
          }}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="w-9 h-9 rounded-full flex items-center justify-center disabled:opacity-30 bg-white flex-shrink-0"
        style={{ border: "1px solid #ece4fb", color: "#5b21b6" }}
      >
        <Icon name="ChevronRight" size={16} />
      </button>
    </div>
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

  const page = useMemo(() => {
    const val = searchParams.get("page")
    return val ? Math.max(1, Number(val)) : 1
  }, [searchParams])

  const { toggleFavorite, isFavorite } = useFavorites()

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

  const gridTopRef = useRef<HTMLDivElement>(null)
  const goToPage = (p: number) => {
    updateParams({ page: p === 1 ? null : String(p) })
    gridTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const toggleSubcategory = (id: string) => {
    updateParams({ sub: activeSubcategories.includes(id) ? null : id, page: null })
  }

  const toggleColor = (id: string) => {
    const next = activeColors.includes(id) ? [] : [id]
    updateParams({ colors: next.length ? next.join(",") : null, page: null })
  }

  const setMinPrice = (val: number | "") => {
    updateParams({ minPrice: val === "" ? null : String(val), page: null })
  }

  const setMaxPrice = (val: number | "") => {
    updateParams({ maxPrice: val === "" ? null : String(val), page: null })
  }

  const resetAll = () => {
    updateParams({ sub: null, colors: null, minPrice: null, maxPrice: null, page: null })
  }

  const hasColorOrBudget = activeColors.length > 0 || minPrice !== "" || maxPrice !== ""

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

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pageItems = useMemo(
    () => filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE),
    [filtered, safePage]
  )

  const colorActiveLabel = activeColors.length
    ? COLOR_OPTIONS.find(c => activeColors.includes(c.id))?.label
    : undefined

  const budgetActiveLabel = (minPrice !== "" || maxPrice !== "")
    ? `${minPrice || 0} — ${maxPrice || "∞"} ₽`
    : undefined

  return (
    <>
      <div ref={gridTopRef} />

      {/* Subcategory badges (только для общего каталога) */}
      {(showSubcategoryBadge || showDischargeBadge) && (
        <div className="mb-3 sm:mb-4">
          {showSubcategoryBadge && (
            <div>
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

          {showDischargeBadge && (
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
          )}
        </div>
      )}

      {/* Закреплённые фильтры: цвет + бюджет */}
      <div
        className="sticky z-40 flex items-center gap-2 flex-wrap py-2.5 mb-4 sm:mb-6 bg-white/95 backdrop-blur-sm"
        style={{ top: "clamp(58px,7.5vw,84px)" }}
      >
        <FilterDropdown
          label="Выбрать цвет"
          icon="🎨"
          isActive={activeColors.length > 0}
          activeLabel={colorActiveLabel}
          panel={(close) => <ColorPanel activeColors={activeColors} toggleColor={toggleColor} close={close} />}
        />
        <FilterDropdown
          label="Выбрать бюджет"
          icon="💰"
          isActive={minPrice !== "" || maxPrice !== ""}
          activeLabel={budgetActiveLabel}
          panel={(close) => (
            <BudgetPanel minPrice={minPrice} maxPrice={maxPrice} onMinChange={setMinPrice} onMaxChange={setMaxPrice} close={close} />
          )}
        />
        {hasColorOrBudget && (
          <button
            onClick={() => updateParams({ colors: null, minPrice: null, maxPrice: null, page: null })}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name="X" size={14} /> Сбросить
          </button>
        )}
        <span className="ml-auto text-xs text-muted-foreground whitespace-nowrap hidden sm:inline">
          {filtered.length} композиций
        </span>
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {pageItems.map((item, idx) => (
            <div
              key={`${item.subcategory ?? "item"}-${item.id}-${idx}`}
              className="group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 bg-white"
              style={{ border: "1px solid #ece4fb" }}
              onClick={() => {
                window._catalogScrollY = window.scrollY
                navigate("/composition", { state: { item, scrollY: window.scrollY, backPath: window.location.pathname + window.location.search } })
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
                {item.colors && item.colors.length > 0 && (
                  <div className="flex flex-wrap gap-x-2 gap-y-1 mt-1.5">
                    {item.colors.map(colorId => {
                      const color = COLOR_OPTIONS.find(c => c.id === colorId)
                      if (!color) return null
                      return (
                        <span key={color.id} className="inline-flex items-center gap-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                            style={{ background: color.hex, border: color.border ? "1px solid #d1d5db" : undefined }}
                          />
                          <span style={{ fontFamily: "'Montserrat', sans-serif", color: "#8a7d9c" }} className="text-[10px] sm:text-xs">{color.label}</span>
                        </span>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <Pagination page={safePage} totalPages={totalPages} onChange={goToPage} />
    </>
  )
}