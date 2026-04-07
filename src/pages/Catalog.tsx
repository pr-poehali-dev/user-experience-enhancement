import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import Icon from "@/components/ui/icon"

const birthdaySubcategories = [
  { id: "girl", label: "Для девушки", emoji: "💕", color: "from-pink-400 to-rose-500" },
  { id: "man", label: "Для мужчины", emoji: "🎩", color: "from-blue-500 to-blue-700" },
  { id: "boy", label: "Для мальчика", emoji: "🚀", color: "from-cyan-400 to-blue-500" },
  { id: "kid-girl", label: "Для девочки", emoji: "👑", color: "from-purple-400 to-pink-500" },
]

type Composition = {
  id: number
  image: string
  title: string
  description: string
  price: string
  priceNum: number
  colors: string[]
  subcategory?: string
}

const COLOR_OPTIONS = [
  { id: "pink", label: "Розовый", hex: "#f472b6" },
  { id: "red", label: "Красный", hex: "#f87171" },
  { id: "purple", label: "Фиолетовый", hex: "#a78bfa" },
  { id: "blue", label: "Синий", hex: "#60a5fa" },
  { id: "cyan", label: "Голубой", hex: "#67e8f9" },
  { id: "green", label: "Зелёный", hex: "#4ade80" },
  { id: "yellow", label: "Жёлтый", hex: "#fbbf24" },
  { id: "gold", label: "Золотой", hex: "#d97706" },
  { id: "white", label: "Белый", hex: "#f3f4f6", border: true },
  { id: "black", label: "Чёрный", hex: "#1f2937" },
  { id: "silver", label: "Серебряный", hex: "#9ca3af" },
  { id: "mint", label: "Мятный", hex: "#6ee7b7" },
]

const compositions: Record<string, Composition[]> = {
  girl: [
    { id: 1, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Композиция «Нежность»", description: "Розовые и белые шары с фольгированными сердечками.", price: "от 1 490 ₽", priceNum: 1490, colors: ["pink", "white"], subcategory: "girl" },
    { id: 2, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Композиция «Принцесса»", description: "Сиреневые и золотые шары с фольгированной короной.", price: "от 1 890 ₽", priceNum: 1890, colors: ["purple", "gold"], subcategory: "girl" },
    { id: 3, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Облако «Розовая мечта»", description: "Большая облачная композиция из розовых шаров разных размеров.", price: "от 2 200 ₽", priceNum: 2200, colors: ["pink"], subcategory: "girl" },
    { id: 4, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Арка «Фламинго»", description: "Яркая арка из розовых, коралловых и белых шаров для фотозоны.", price: "от 3 500 ₽", priceNum: 3500, colors: ["pink", "red", "white"], subcategory: "girl" },
    { id: 5, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Цифра «25»", description: "Фольгированная цифра в розово-золотом оформлении.", price: "от 990 ₽", priceNum: 990, colors: ["pink", "gold"], subcategory: "girl" },
    { id: 6, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Композиция «Весна»", description: "Нежные пастельные шары с живыми цветами и атласными лентами.", price: "от 2 800 ₽", priceNum: 2800, colors: ["pink", "mint", "white"], subcategory: "girl" },
  ],
  man: [
    { id: 1, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Композиция «Стиль»", description: "Синие, чёрные и серебряные шары — строго и стильно.", price: "от 1 690 ₽", priceNum: 1690, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 2, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Набор «Джентльмен»", description: "Тёмно-синие шары с золотыми звёздами и фольгированными цифрами.", price: "от 2 290 ₽", priceNum: 2290, colors: ["blue", "gold"], subcategory: "man" },
    { id: 3, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Арка «Синяя волна»", description: "Арка из синих и серебряных шаров — эффектная фотозона.", price: "от 3 200 ₽", priceNum: 3200, colors: ["blue", "silver"], subcategory: "man" },
    { id: 4, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Цифра «40»", description: "Большая фольгированная цифра в синем и золотом цвете.", price: "от 990 ₽", priceNum: 990, colors: ["blue", "gold"], subcategory: "man" },
  ],
  boy: [
    { id: 1, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Композиция «Супергерой»", description: "Яркие синие и красные шары с фольгированными звёздами.", price: "от 1 290 ₽", priceNum: 1290, colors: ["blue", "red"], subcategory: "boy" },
    { id: 2, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Набор «Космонавт»", description: "Синие и серебряные шары с ракетами и звёздами.", price: "от 1 890 ₽", priceNum: 1890, colors: ["blue", "silver"], subcategory: "boy" },
    { id: 3, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Арка «Гонки»", description: "Красно-синяя арка с машинками для юного гонщика.", price: "от 2 900 ₽", priceNum: 2900, colors: ["red", "blue"], subcategory: "boy" },
    { id: 4, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Цифра «5»", description: "Яркая цифра пять в синих и зелёных тонах.", price: "от 890 ₽", priceNum: 890, colors: ["blue", "green"], subcategory: "boy" },
  ],
  "kid-girl": [
    { id: 1, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Композиция «Единорог»", description: "Розовые, белые и сиреневые шары с единорогом.", price: "от 1 490 ₽", priceNum: 1490, colors: ["pink", "white", "purple"], subcategory: "kid-girl" },
    { id: 2, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Арка «Фея»", description: "Нежная арка из лиловых и розовых шаров со звёздами.", price: "от 2 800 ₽", priceNum: 2800, colors: ["purple", "pink"], subcategory: "kid-girl" },
    { id: 3, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Набор «Барби»", description: "Ярко-розовые шары с надписями и сердечками.", price: "от 1 690 ₽", priceNum: 1690, colors: ["pink"], subcategory: "kid-girl" },
    { id: 4, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Цифра «7»", description: "Розово-золотая цифра семь для маленькой принцессы.", price: "от 890 ₽", priceNum: 890, colors: ["pink", "gold"], subcategory: "kid-girl" },
  ],
  discharge: [
    { id: 1, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/30158ce7-cc58-475e-9f95-85bc8e9f0376.jpg", title: "Встреча мальчика", description: "Нежно-голубые и белые шары с надписью «Это мальчик!».", price: "от 2 490 ₽", priceNum: 2490, colors: ["cyan", "white"] },
    { id: 2, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/30158ce7-cc58-475e-9f95-85bc8e9f0376.jpg", title: "Встреча девочки", description: "Розовые и мятные шары с сердечками и надписью «Это девочка!».", price: "от 2 490 ₽", priceNum: 2490, colors: ["pink", "mint"] },
    { id: 3, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/30158ce7-cc58-475e-9f95-85bc8e9f0376.jpg", title: "Облако «Малыш»", description: "Большая облачная композиция из пастельных шаров.", price: "от 3 200 ₽", priceNum: 3200, colors: ["mint", "white", "yellow"] },
    { id: 4, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/30158ce7-cc58-475e-9f95-85bc8e9f0376.jpg", title: "Сюрприз-бокс", description: "Коробка с шарами, которые вылетают при открытии.", price: "от 1 890 ₽", priceNum: 1890, colors: ["pink", "gold", "white"] },
    { id: 5, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/30158ce7-cc58-475e-9f95-85bc8e9f0376.jpg", title: "Арка «Первый вдох»", description: "Нежная арка из шаров у входа роддома.", price: "от 4 500 ₽", priceNum: 4500, colors: ["white", "mint", "cyan"] },
    { id: 6, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/30158ce7-cc58-475e-9f95-85bc8e9f0376.jpg", title: "Набор «Звёздочка»", description: "Жёлтые и белые шары со звёздами.", price: "от 1 990 ₽", priceNum: 1990, colors: ["yellow", "white"] },
  ],
}

type ModalItem = Composition | null

const PRICE_MIN = 500
const PRICE_MAX = 20000

// Все композиции "на день рождения" объединённые
const allBirthdayCompositions: Composition[] = [
  ...compositions.girl,
  ...compositions.man,
  ...compositions.boy,
  ...compositions["kid-girl"],
]

function PriceSlider({
  minPrice,
  maxPrice,
  onMinChange,
  onMaxChange,
}: {
  minPrice: number
  maxPrice: number
  onMinChange: (v: number) => void
  onMaxChange: (v: number) => void
}) {
  const pctMin = ((minPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100
  const pctMax = ((maxPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Бюджет</p>
        <span className="text-base font-bold text-primary">
          {minPrice.toLocaleString("ru")} ₽ — {maxPrice.toLocaleString("ru")} ₽
        </span>
      </div>
      {/* Two separate sliders stacked */}
      <div className="relative h-6 mx-2.5">
        {/* Background track */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 bg-border rounded-full" />
        {/* Active range */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-2 rounded-full bg-primary"
          style={{ left: `${pctMin}%`, width: `${pctMax - pctMin}%` }}
        />
        {/* Min input — left half pointer-events */}
        <input
          type="range"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={100}
          value={minPrice}
          onChange={(e) => {
            const v = Number(e.target.value)
            if (v <= maxPrice - 500) onMinChange(v)
          }}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          style={{ zIndex: minPrice > PRICE_MAX - 1000 ? 5 : 4 }}
        />
        {/* Max input */}
        <input
          type="range"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={100}
          value={maxPrice}
          onChange={(e) => {
            const v = Number(e.target.value)
            if (v >= minPrice + 500) onMaxChange(v)
          }}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          style={{ zIndex: minPrice > PRICE_MAX - 1000 ? 4 : 5 }}
        />
        {/* Min handle visual */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-primary rounded-full shadow pointer-events-none"
          style={{ left: `calc(${pctMin}% - 10px)`, zIndex: 6 }}
        />
        {/* Max handle visual */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-primary rounded-full shadow pointer-events-none"
          style={{ left: `calc(${pctMax}% - 10px)`, zIndex: 6 }}
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground mt-1 mx-2.5">
        <span>{PRICE_MIN.toLocaleString("ru")} ₽</span>
        <span>{PRICE_MAX.toLocaleString("ru")} ₽</span>
      </div>
    </div>
  )
}

function CompositionGrid({
  items,
  showSubcategoryBadge,
}: {
  items: Composition[]
  showSubcategoryBadge?: boolean
}) {
  const [modal, setModal] = useState<ModalItem>(null)
  const [activeColors, setActiveColors] = useState<string[]>([])
  const [activeSubcategories, setActiveSubcategories] = useState<string[]>([])
  const [minPrice, setMinPrice] = useState(PRICE_MIN)
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX)

  const toggleColor = (colorId: string) => {
    setActiveColors((prev) =>
      prev.includes(colorId) ? prev.filter((c) => c !== colorId) : [...prev, colorId]
    )
  }

  const toggleSubcategory = (id: string) => {
    setActiveSubcategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )
  }

  const resetAll = () => {
    setActiveColors([])
    setActiveSubcategories([])
    setMinPrice(PRICE_MIN)
    setMaxPrice(PRICE_MAX)
  }

  const hasFilters =
    activeColors.length > 0 ||
    activeSubcategories.length > 0 ||
    minPrice > PRICE_MIN ||
    maxPrice < PRICE_MAX

  const filtered = items
    .filter((item) => item.priceNum >= minPrice && item.priceNum <= maxPrice)
    .filter((item) => activeColors.length === 0 || activeColors.some((c) => item.colors.includes(c)))
    .filter(
      (item) =>
        activeSubcategories.length === 0 ||
        (item.subcategory && activeSubcategories.includes(item.subcategory))
    )

  const subcategoryLabel = (id: string) =>
    birthdaySubcategories.find((s) => s.id === id)?.label ?? id

  return (
    <>
      {/* Filters */}
      <div className="mb-8 space-y-6 bg-muted/40 rounded-2xl p-5">

        {/* Subcategory filter (only shown if items have subcategories) */}
        {showSubcategoryBadge && (
          <div>
            <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Для кого</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {birthdaySubcategories.map((cat) => {
                const isActive = activeSubcategories.includes(cat.id)
                return (
                  <button
                    key={cat.id}
                    onClick={() => toggleSubcategory(cat.id)}
                    className={`flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-2xl text-sm font-semibold border-2 transition-all ${
                      isActive
                        ? "border-primary bg-primary text-primary-foreground shadow-md scale-[1.03]"
                        : "border-border bg-white text-foreground hover:border-primary/60 hover:bg-primary/5"
                    }`}
                  >
                    <span className="text-2xl">{cat.emoji}</span>
                    <span>{cat.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Price range slider */}
        <PriceSlider
          minPrice={minPrice}
          maxPrice={maxPrice}
          onMinChange={setMinPrice}
          onMaxChange={setMaxPrice}
        />

        {/* Color filter */}
        <div>
          <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Цвет шариков</p>
          <div className="flex flex-wrap gap-2">
            {COLOR_OPTIONS.map((color) => {
              const isActive = activeColors.includes(color.id)
              return (
                <button
                  key={color.id}
                  onClick={() => toggleColor(color.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border-2 transition-all ${
                    isActive
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-white text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: color.hex,
                      border: color.border ? "1px solid #d1d5db" : "none",
                    }}
                  />
                  {color.label}
                </button>
              )
            })}
          </div>
        </div>

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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item, idx) => (
            <div
              key={`${item.subcategory ?? "item"}-${item.id}-${idx}`}
              className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => setModal(item)}
            >
              <img src={item.image} alt={item.title} className="w-full aspect-square object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Subcategory badge */}
              {showSubcategoryBadge && item.subcategory && (
                <div className="absolute top-2 left-2">
                  <span className="text-xs bg-black/50 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
                    {birthdaySubcategories.find((s) => s.id === item.subcategory)?.emoji}{" "}
                    {birthdaySubcategories.find((s) => s.id === item.subcategory)?.label}
                  </span>
                </div>
              )}
              {/* Color dots */}
              <div className="absolute top-2 right-2 flex gap-1">
                {item.colors.slice(0, 3).map((cid) => {
                  const c = COLOR_OPTIONS.find((o) => o.id === cid)
                  return c ? (
                    <span
                      key={cid}
                      className="w-3 h-3 rounded-full border border-white/80 shadow"
                      style={{ backgroundColor: c.hex }}
                    />
                  ) : null
                })}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-sm font-semibold">{item.title}</p>
                <p className="text-white/80 text-xs">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && <CompositionModal modal={modal} onClose={() => setModal(null)} />}
    </>
  )
}

function CompositionModal({ modal, onClose }: { modal: Composition; onClose: () => void }) {
  const [openSection, setOpenSection] = useState<string>("content")

  const toggle = (id: string) => setOpenSection((prev) => (prev === id ? "" : id))

  const sections = [
    {
      id: "content",
      icon: "Sparkles",
      title: "Наполнение",
      content: (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed">{modal.description}</p>
          <div className="flex gap-1.5 flex-wrap">
            {modal.colors.map((cid) => {
              const c = COLOR_OPTIONS.find((o) => o.id === cid)
              return c ? (
                <span key={cid} className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded-full">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.hex, border: c.border ? "1px solid #d1d5db" : "none" }} />
                  {c.label}
                </span>
              ) : null
            })}
          </div>
          <div className="bg-primary/8 border border-primary/20 rounded-xl p-3 text-sm text-primary font-medium">
            🎨 Наполнение любой композиции можно изменить под ваш бюджет и пожелания
          </div>
        </div>
      ),
    },
    {
      id: "order",
      icon: "MessageCircle",
      title: "Как заказать",
      content: (
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>Напишите нам в любой удобный мессенджер и укажите номер понравившейся композиции:</p>
          <div className="bg-muted rounded-xl px-4 py-2 font-mono text-base font-bold text-foreground text-center">
            № {modal.id} — {modal.title}
          </div>
          <div className="flex gap-2 flex-wrap pt-1">
            <a href="#" className="flex items-center gap-1.5 bg-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-medium hover:bg-blue-600 transition-colors">
              <Icon name="Send" size={13} /> Telegram
            </a>
            <a href="#" className="flex items-center gap-1.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-medium hover:opacity-90 transition-opacity">
              <Icon name="Instagram" size={13} /> Instagram
            </a>
            <a href="#" className="flex items-center gap-1.5 bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-medium hover:bg-blue-700 transition-colors">
              <Icon name="MessageCircle" size={13} /> ВКонтакте
            </a>
          </div>
        </div>
      ),
    },
    {
      id: "delivery",
      icon: "Truck",
      title: "Доставка / Самовывоз",
      content: (
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <div className="flex items-start gap-2">
            <Icon name="Clock" size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <p><span className="text-foreground font-medium">Доставка 24/7</span> по Краснодару и Краснодарскому краю</p>
          </div>
          <div className="flex items-start gap-2">
            <Icon name="Banknote" size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <p>Стоимость доставки уточняйте у менеджера. Есть <span className="text-foreground font-medium">бесплатная доставка</span></p>
          </div>
          <div className="flex items-start gap-2">
            <Icon name="MapPin" size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <p><span className="text-foreground font-medium">Самовывоз:</span> ул. Героя Яцкова 19к3</p>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative flex-shrink-0">
          <img src={modal.image} alt={modal.title} className="w-full h-56 object-cover" />
          <button
            className="absolute top-3 right-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow"
            onClick={onClose}
          >
            <Icon name="X" size={18} />
          </button>
          {modal.subcategory && (
            <div className="absolute top-3 left-3">
              <span className="text-xs bg-black/50 text-white px-3 py-1 rounded-full backdrop-blur-sm font-medium">
                {birthdaySubcategories.find((s) => s.id === modal.subcategory)?.emoji}{" "}
                {birthdaySubcategories.find((s) => s.id === modal.subcategory)?.label}
              </span>
            </div>
          )}
        </div>

        {/* Header */}
        <div className="px-6 pt-4 pb-2 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">{modal.title}</h3>
            <span className="text-primary font-bold text-base">{modal.price}</span>
          </div>
        </div>

        {/* Accordion */}
        <div className="overflow-y-auto px-6 pb-6 space-y-2">
          {sections.map((s) => (
            <div key={s.id} className="border border-border rounded-2xl overflow-hidden">
              <button
                onClick={() => toggle(s.id)}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <Icon name={s.icon} size={16} className="text-primary" />
                  {s.title}
                </div>
                <Icon
                  name="ChevronDown"
                  size={16}
                  className={`text-muted-foreground transition-transform ${openSection === s.id ? "rotate-180" : ""}`}
                />
              </button>
              {openSection === s.id && (
                <div className="px-4 pb-4 pt-1 border-t border-border bg-muted/20">
                  {s.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function subcategoryLabel(id: string) {
  return birthdaySubcategories.find((s) => s.id === id)?.label ?? id
}

export default function Catalog() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const section = searchParams.get("section")

  // ──────────────────────────────────────────────────────
  // "На день рождения" — показываем все подкатегории сразу
  // ──────────────────────────────────────────────────────
  if (section === "birthday") {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate("/catalog")}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <Icon name="ArrowLeft" size={16} /> Назад
            </button>
          </div>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">🎂</span>
            <div>
              <h1 className="text-3xl font-bold leading-tight">На день рождения</h1>
              <p className="text-muted-foreground text-sm">Для девушки, мужчины, мальчика и девочки</p>
            </div>
          </div>
          <CompositionGrid items={allBirthdayCompositions} showSubcategoryBadge />
        </div>
        <Footer />
      </div>
    )
  }

  // ──────────────────────────────────────────────────────
  // "На выписку"
  // ──────────────────────────────────────────────────────
  if (section === "discharge") {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-16">
          <button
            onClick={() => navigate("/catalog")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <Icon name="ArrowLeft" size={18} /> Назад
          </button>
          <h1 className="text-4xl md:text-5xl font-semibold mb-2">👶 На выписку</h1>
          <p className="text-muted-foreground mb-10">Выберите композицию для встречи малыша</p>
          <CompositionGrid items={compositions.discharge} />
        </div>
        <Footer />
      </div>
    )
  }

  // ──────────────────────────────────────────────────────
  // Главная страница каталога
  // ──────────────────────────────────────────────────────
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-16">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <Icon name="ArrowLeft" size={18} /> На главную
        </button>
        <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-4">
          Каталог <span className="font-semibold">шариков</span>
        </h1>
        <p className="text-lg text-muted-foreground mb-14">Выберите повод для праздника</p>
        <div className="grid md:grid-cols-2 gap-8">
          <button
            onClick={() => navigate("/catalog?section=birthday")}
            className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-pink-400 via-rose-400 to-purple-500 min-h-[400px] flex flex-col items-center justify-center gap-4 shadow-xl hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 p-8"
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            <span className="relative text-8xl">🎂</span>
            <div className="relative text-center">
              <h2 className="text-white text-4xl font-bold mb-2">На день рождения</h2>
              <p className="text-white/80 text-lg">Для девушки, мужчины, мальчика и девочки</p>
            </div>
            <div className="relative flex items-center gap-2 text-white/90 text-sm font-medium mt-2">
              Смотреть все композиции <Icon name="ArrowRight" size={18} />
            </div>
          </button>
          <button
            onClick={() => navigate("/catalog?section=discharge")}
            className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-sky-300 via-blue-400 to-indigo-500 min-h-[400px] flex flex-col items-center justify-center gap-4 shadow-xl hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 p-8"
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            <span className="relative text-8xl">👶</span>
            <div className="relative text-center">
              <h2 className="text-white text-4xl font-bold mb-2">На выписку</h2>
              <p className="text-white/80 text-lg">Встречаем малыша из роддома</p>
            </div>
            <div className="relative flex items-center gap-2 text-white/90 text-sm font-medium mt-2">
              Смотреть композиции <Icon name="ArrowRight" size={18} />
            </div>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}