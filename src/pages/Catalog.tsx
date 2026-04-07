import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import Icon from "@/components/ui/icon"

const birthdaySubcategories = [
  { id: "girl", label: "Для девушки", emoji: "💕", color: "from-pink-400 to-rose-500", main: true },
  { id: "man", label: "Для мужчины", emoji: "🎩", color: "from-blue-500 to-blue-700", main: true },
  { id: "boy", label: "Для мальчика", emoji: "🚀", color: "from-cyan-400 to-blue-500", main: true },
  { id: "kid-girl", label: "Для девочки", emoji: "👑", color: "from-purple-400 to-pink-500", main: true },
  { id: "bubbles-box", label: "Баблс-бокс", emoji: "🫧", color: "from-sky-300 to-blue-400", hit: true },
  { id: "surprise-box", label: "Коробка-сюрприз", emoji: "🎁", color: "from-rose-400 to-pink-500" },
  { id: "first-year", label: "Шарики на 1 годик", emoji: "🍼", color: "from-yellow-300 to-orange-400" },
  { id: "cartoon", label: "Мульт-герои", emoji: "🦄", color: "from-pink-400 to-purple-500" },
  { id: "ceiling", label: "Под потолок", emoji: "🏠", color: "from-indigo-400 to-purple-500" },
  { id: "numbers", label: "Шары-цифры", emoji: "🔢", color: "from-emerald-400 to-teal-500" },
]

const dischargeSubcategories = [
  { id: "boy-discharge", label: "Выписка мальчика", emoji: "👦" },
  { id: "girl-discharge", label: "Выписка девочки", emoji: "👧" },
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
  { id: "pink", label: "Розовые", hex: "#f472b6" },
  { id: "purple", label: "Фиолетовые", hex: "#a78bfa" },
  { id: "white", label: "Белые", hex: "#f3f4f6", border: true },
  { id: "black", label: "Чёрные", hex: "#1f2937" },
  { id: "blue", label: "Синие", hex: "#60a5fa" },
  { id: "green", label: "Зелёные", hex: "#4ade80" },
  { id: "gold", label: "Золотые", hex: "#d97706" },
  { id: "silver", label: "Серебряные", hex: "#9ca3af" },
]

const compositions: Record<string, Composition[]> = {
  girl: [
    { id: 1, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Композиция «Нежность»", description: "Розовые и белые шары с фольгированными сердечками.", price: "1 490 ₽", priceNum: 1490, colors: ["pink", "white"], subcategory: "girl" },
    { id: 2, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Композиция «Принцесса»", description: "Сиреневые и золотые шары с фольгированной короной.", price: "1 890 ₽", priceNum: 1890, colors: ["purple", "gold"], subcategory: "girl" },
    { id: 3, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Облако «Розовая мечта»", description: "Большая облачная композиция из розовых шаров разных размеров.", price: "2 200 ₽", priceNum: 2200, colors: ["pink"], subcategory: "girl" },
    { id: 4, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Арка «Фламинго»", description: "Яркая арка из розовых, коралловых и белых шаров для фотозоны.", price: "3 500 ₽", priceNum: 3500, colors: ["pink", "white"], subcategory: "girl" },
    { id: 5, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Цифра «25»", description: "Фольгированная цифра в розово-золотом оформлении.", price: "990 ₽", priceNum: 990, colors: ["pink", "gold"], subcategory: "girl" },
    { id: 6, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Композиция «Весна»", description: "Нежные пастельные шары с живыми цветами и атласными лентами.", price: "2 800 ₽", priceNum: 2800, colors: ["pink", "white"], subcategory: "girl" },
  ],
  man: [
    { id: 1, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Композиция «Стиль»", description: "Синие, чёрные и серебряные шары — строго и стильно.", price: "1 690 ₽", priceNum: 1690, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 2, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Набор «Джентльмен»", description: "Тёмно-синие шары с золотыми звёздами и фольгированными цифрами.", price: "2 290 ₽", priceNum: 2290, colors: ["blue", "gold"], subcategory: "man" },
    { id: 3, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Арка «Синяя волна»", description: "Арка из синих и серебряных шаров — эффектная фотозона.", price: "3 200 ₽", priceNum: 3200, colors: ["blue", "silver"], subcategory: "man" },
    { id: 4, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Цифра «40»", description: "Большая фольгированная цифра в синем и золотом цвете.", price: "990 ₽", priceNum: 990, colors: ["blue", "gold"], subcategory: "man" },
  ],
  boy: [
    { id: 1, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Композиция «Супергерой»", description: "Яркие синие и красные шары с фольгированными звёздами.", price: "1 290 ₽", priceNum: 1290, colors: ["blue"], subcategory: "boy" },
    { id: 2, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Набор «Космонавт»", description: "Синие и серебряные шары с ракетами и звёздами.", price: "1 890 ₽", priceNum: 1890, colors: ["blue", "silver"], subcategory: "boy" },
    { id: 3, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Арка «Гонки»", description: "Красно-синяя арка с машинками для юного гонщика.", price: "2 900 ₽", priceNum: 2900, colors: ["blue"], subcategory: "boy" },
    { id: 4, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Цифра «5»", description: "Яркая цифра пять в синих и зелёных тонах.", price: "890 ₽", priceNum: 890, colors: ["blue", "green"], subcategory: "boy" },
  ],
  "kid-girl": [
    { id: 1, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Композиция «Единорог»", description: "Розовые, белые и сиреневые шары с единорогом.", price: "1 490 ₽", priceNum: 1490, colors: ["pink", "white", "purple"], subcategory: "kid-girl" },
    { id: 2, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Арка «Фея»", description: "Нежная арка из лиловых и розовых шаров со звёздами.", price: "2 800 ₽", priceNum: 2800, colors: ["purple", "pink"], subcategory: "kid-girl" },
    { id: 3, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Набор «Барби»", description: "Ярко-розовые шары с надписями и сердечками.", price: "1 690 ₽", priceNum: 1690, colors: ["pink"], subcategory: "kid-girl" },
    { id: 4, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Цифра «7»", description: "Розово-золотая цифра семь для маленькой принцессы.", price: "890 ₽", priceNum: 890, colors: ["pink", "gold"], subcategory: "kid-girl" },
  ],
  "bubbles-box": [
    { id: 1, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Баблс-бокс «Нежный»", description: "Прозрачные шары-пузыри с конфетти внутри, упакованные в коробку.", price: "1 990 ₽", priceNum: 1990, colors: ["pink", "white"], subcategory: "bubbles-box" },
    { id: 2, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Баблс-бокс «Синий»", description: "Прозрачные шары с синим конфетти в стильной коробке.", price: "1 990 ₽", priceNum: 1990, colors: ["blue", "silver"], subcategory: "bubbles-box" },
  ],
  "surprise-box": [
    { id: 1, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Коробка-сюрприз «Розовая»", description: "Шары вылетают при открытии — незабываемый момент!", price: "1 890 ₽", priceNum: 1890, colors: ["pink", "gold"], subcategory: "surprise-box" },
    { id: 2, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Коробка-сюрприз «Синяя»", description: "Синие и серебряные шары вылетают из тёмной коробки.", price: "1 890 ₽", priceNum: 1890, colors: ["blue", "silver"], subcategory: "surprise-box" },
  ],
  "first-year": [
    { id: 1, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "«1 годик» для девочки", description: "Розовые шары с цифрой 1, звёздочками и конфетти.", price: "1 490 ₽", priceNum: 1490, colors: ["pink", "gold"], subcategory: "first-year" },
    { id: 2, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "«1 годик» для мальчика", description: "Синие и белые шары с цифрой 1 и звёздочками.", price: "1 490 ₽", priceNum: 1490, colors: ["blue", "white"], subcategory: "first-year" },
  ],
  "ceiling": [
    { id: 1, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Шарики под потолок «Нежные»", description: "50 розовых и белых шаров, которые поднимутся к потолку.", price: "1 200 ₽", priceNum: 1200, colors: ["pink", "white"], subcategory: "ceiling" },
    { id: 2, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Шарики под потолок «Классика»", description: "50 синих и серебряных шаров для мужской вечеринки.", price: "1 200 ₽", priceNum: 1200, colors: ["blue", "silver"], subcategory: "ceiling" },
  ],
  "numbers": [
    { id: 1, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Цифра розово-золотая", description: "Большая фольгированная цифра в розово-золотом оформлении.", price: "890 ₽", priceNum: 890, colors: ["pink", "gold"], subcategory: "numbers" },
    { id: 2, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Цифра сине-серебряная", description: "Большая фольгированная цифра в синем и серебряном цвете.", price: "890 ₽", priceNum: 890, colors: ["blue", "silver"], subcategory: "numbers" },
    { id: 3, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Цифра золотая", description: "Золотая фольгированная цифра — универсальный вариант.", price: "890 ₽", priceNum: 890, colors: ["gold"], subcategory: "numbers" },
  ],
  "cartoon": [
    { id: 1, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Единорог", description: "Фольгированный единорог с розовыми и белыми шарами.", price: "1 390 ₽", priceNum: 1390, colors: ["pink", "purple", "white"], subcategory: "cartoon" },
    { id: 2, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Динозавр", description: "Зелёный фольгированный динозавр с яркими шарами.", price: "1 390 ₽", priceNum: 1390, colors: ["green"], subcategory: "cartoon" },
    { id: 3, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Принцесса", description: "Фольгированная принцесса с розовыми и золотыми шарами.", price: "1 390 ₽", priceNum: 1390, colors: ["pink", "gold"], subcategory: "cartoon" },
  ],
  discharge: [
    { id: 1, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/30158ce7-cc58-475e-9f95-85bc8e9f0376.jpg", title: "Встреча мальчика", description: "Нежно-голубые и белые шары с надписью «Это мальчик!».", price: "2 490 ₽", priceNum: 2490, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 2, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/30158ce7-cc58-475e-9f95-85bc8e9f0376.jpg", title: "Набор «Звёздочка» для мальчика", description: "Синие и белые шары со звёздами.", price: "1 990 ₽", priceNum: 1990, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 3, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/30158ce7-cc58-475e-9f95-85bc8e9f0376.jpg", title: "Арка «Первый вдох» для мальчика", description: "Голубая арка из шаров у входа роддома.", price: "4 500 ₽", priceNum: 4500, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 4, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/30158ce7-cc58-475e-9f95-85bc8e9f0376.jpg", title: "Встреча девочки", description: "Розовые и мятные шары с сердечками и надписью «Это девочка!».", price: "2 490 ₽", priceNum: 2490, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 5, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/30158ce7-cc58-475e-9f95-85bc8e9f0376.jpg", title: "Облако «Малышка»", description: "Большая облачная композиция из розовых и белых шаров.", price: "3 200 ₽", priceNum: 3200, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 6, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/30158ce7-cc58-475e-9f95-85bc8e9f0376.jpg", title: "Набор «Звёздочка» для девочки", description: "Розовые и золотые шары со звёздами.", price: "1 990 ₽", priceNum: 1990, colors: ["pink", "gold"], subcategory: "girl-discharge" },
  ],
}

type ModalItem = Composition | null

const PRICE_MIN = 500
const PRICE_MAX = 20000

// Равномерная подборка: 4 основных + по 2 остальных (кроме баблс/сюрприз — по 1 из 8)
function buildBirthdayGrid(): Composition[] {
  const main = [...compositions.girl, ...compositions.man, ...compositions.boy, ...compositions["kid-girl"]]
  const secondary = [...compositions["first-year"], ...compositions["ceiling"], ...compositions["numbers"], ...compositions["cartoon"]]
  const rare = [...compositions["bubbles-box"], ...compositions["surprise-box"]]
  const result: Composition[] = []
  let si = 0, ri = 0
  for (let i = 0; i < main.length; i++) {
    result.push(main[i])
    if (i % 2 === 1 && si < secondary.length) { result.push(secondary[si++]) }
    if (i % 8 === 7 && ri < rare.length) { result.push(rare[ri++]) }
  }
  while (si < secondary.length) result.push(secondary[si++])
  while (ri < rare.length) result.push(rare[ri++])
  return result
}

const allBirthdayCompositions: Composition[] = buildBirthdayGrid()

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
      <div className="relative h-6 mx-2.5">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 bg-border rounded-full" />
        <div
          className="absolute top-1/2 -translate-y-1/2 h-2 rounded-full bg-primary"
          style={{ left: `${pctMin}%`, width: `${pctMax - pctMin}%` }}
        />
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
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-primary rounded-full shadow pointer-events-none"
          style={{ left: `calc(${pctMin}% - 10px)`, zIndex: 6 }}
        />
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
  showDischargeBadge,
}: {
  items: Composition[]
  showSubcategoryBadge?: boolean
  showDischargeBadge?: boolean
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

  const getBirthdayLabel = (id: string) =>
    birthdaySubcategories.find((s) => s.id === id)?.label ?? id
  const getDischargeLabel = (id: string) =>
    dischargeSubcategories.find((s) => s.id === id)?.label ?? id

  return (
    <>
      {/* Filters */}
      <div className="mb-8 space-y-6 bg-muted/40 rounded-2xl p-5">

        {/* Birthday subcategory filter */}
        {showSubcategoryBadge && (
          <div>
            <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Для кого</p>
            {/* Main 4 — full row, bigger */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
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
                    className={`flex flex-col items-center justify-center gap-2 py-4 px-3 rounded-2xl font-bold border-2 transition-all ${
                      isActive
                        ? `${mainColors[cat.id]} text-white shadow-lg scale-[1.03] border-transparent`
                        : "border-border bg-white text-foreground hover:border-primary/60 hover:bg-primary/5"
                    }`}
                  >
                    <span className="text-2xl">{cat.emoji}</span>
                    <span className="text-sm text-center leading-tight">{cat.label}</span>
                  </button>
                )
              })}
            </div>
            {/* Secondary — smaller grid */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {birthdaySubcategories.filter(c => !c.main).map((cat) => {
                const isActive = activeSubcategories.includes(cat.id)
                return (
                  <button
                    key={cat.id}
                    onClick={() => toggleSubcategory(cat.id)}
                    className={`relative flex flex-col items-center justify-center gap-1 py-2.5 px-1 rounded-xl text-xs font-semibold border-2 transition-all ${
                      isActive
                        ? "border-primary bg-primary text-primary-foreground shadow-md scale-[1.03]"
                        : "border-border bg-white text-foreground hover:border-primary/60 hover:bg-primary/5"
                    }`}
                  >
                    {cat.hit && (
                      <span className="absolute -top-2 -right-1 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow">ХИТ</span>
                    )}
                    <span className="text-lg">{cat.emoji}</span>
                    <span className="text-center leading-tight" style={{ fontSize: "0.7rem" }}>{cat.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Discharge subcategory filter */}
        {showDischargeBadge && (
          <div>
            <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Кого встречаем</p>
            <div className="grid grid-cols-2 gap-3">
              {dischargeSubcategories.map((cat) => {
                const isActive = activeSubcategories.includes(cat.id)
                return (
                  <button
                    key={cat.id}
                    onClick={() => toggleSubcategory(cat.id)}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl text-sm font-semibold border-2 transition-all ${
                      isActive
                        ? "border-primary bg-primary text-primary-foreground shadow-md"
                        : "border-border bg-white text-foreground hover:border-primary/60 hover:bg-primary/5"
                    }`}
                  >
                    <span className="text-2xl">{cat.emoji}</span>
                    {cat.label}
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
          <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Цвет композиций</p>
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
              className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-110"
              onClick={() => setModal(item)}
            >
              <img src={item.image} alt={item.title} className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Badge */}
              {(showSubcategoryBadge || showDischargeBadge) && item.subcategory && (
                <div className="absolute top-2 left-2">
                  <span className="text-xs bg-black/50 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">
                    {showSubcategoryBadge
                      ? (birthdaySubcategories.find((s) => s.id === item.subcategory)?.emoji + " " + getBirthdayLabel(item.subcategory))
                      : (dischargeSubcategories.find((s) => s.id === item.subcategory)?.emoji + " " + getDischargeLabel(item.subcategory))
                    }
                  </span>
                </div>
              )}
              {/* Title on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white text-xs font-semibold truncate">{item.title}</p>
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
          <p>Напишите нам или позвоните, и укажите номер понравившейся композиции:</p>
          <div className="bg-muted rounded-xl px-4 py-2 font-mono text-base font-bold text-foreground text-center">
            № {modal.id} — {modal.title}
          </div>
          <a href="tel:+79885973303" className="flex items-center gap-2 bg-rose-50 border border-rose-200 rounded-xl px-4 py-2.5 font-bold text-foreground hover:bg-rose-100 transition-colors">
            <Icon name="Phone" size={16} className="text-primary" />
            8 988 597 33 03
          </a>
          <div className="flex gap-2 flex-wrap pt-1">
            <a href="#" className="flex items-center gap-1.5 bg-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-medium hover:bg-blue-600 transition-colors">
              <Icon name="Send" size={13} /> Telegram
            </a>
            <a href="https://wa.me/79885973303" className="flex items-center gap-1.5 bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-medium hover:bg-green-600 transition-colors">
              <Icon name="MessageSquare" size={13} /> WhatsApp
            </a>
            <a href="#" className="flex items-center gap-1.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-medium hover:opacity-90 transition-opacity">
              <Icon name="Instagram" size={13} /> Instagram
            </a>
            <a href="#" className="flex items-center gap-1.5 bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-medium hover:bg-blue-700 transition-colors">
              <Icon name="MessageCircle" size={13} /> ВКонтакте
            </a>
            <a href="#" className="flex items-center gap-1.5 text-white px-3 py-1.5 rounded-full text-xs font-medium hover:opacity-90 transition-opacity" style={{ backgroundColor: "#1e3a5f" }}>
              <Icon name="Flame" size={13} /> Max
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl max-h-[92vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Large image — left column */}
        <div className="relative md:w-[45%] flex-shrink-0">
          <img
            src={modal.image}
            alt={modal.title}
            className="w-full h-72 md:h-full object-cover"
            style={{ minHeight: "320px" }}
          />
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

        {/* Right column — title + accordion */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="px-6 pt-5 pb-3">
            <h3
              className="text-2xl mb-1 text-foreground/90"
              style={{ fontFamily: "Georgia, 'Palatino Linotype', serif", fontWeight: 400, letterSpacing: "0.01em" }}
            >
              {modal.title}
            </h3>
            <span className="text-primary font-bold text-xl">{modal.price}</span>
          </div>

          {/* Accordion */}
          <div className="overflow-y-auto px-6 pb-6 space-y-2 flex-1">
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
    </div>
  )
}

export default function Catalog() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const section = searchParams.get("section")

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
              <p className="text-muted-foreground text-sm">Для девушки, мужчины, мальчика, девочки и другие</p>
            </div>
          </div>
          <CompositionGrid items={allBirthdayCompositions} showSubcategoryBadge />
        </div>
        <Footer />
      </div>
    )
  }

  if (section === "discharge") {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16">
          <button
            onClick={() => navigate("/catalog")}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground mb-6 transition-colors text-sm"
          >
            <Icon name="ArrowLeft" size={16} /> Назад
          </button>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">👶</span>
            <div>
              <h1 className="text-3xl font-bold leading-tight">На выписку</h1>
              <p className="text-muted-foreground text-sm">Встречаем малыша из роддома</p>
            </div>
          </div>
          <CompositionGrid items={compositions.discharge} showDischargeBadge />
        </div>
        <Footer />
      </div>
    )
  }

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