export const birthdaySubcategories = [
  { id: "girl", label: "Для девушки", emoji: "🌹", color: "from-pink-400 to-rose-500", main: true },
  { id: "man", label: "Для мужчины", emoji: "🎩", color: "from-blue-500 to-blue-700", main: true },
  { id: "kid-girl", label: "Для девочки", emoji: "🎀", color: "from-purple-400 to-pink-500", main: true },
  { id: "boy", label: "Для мальчика", emoji: "🚀", color: "from-cyan-400 to-blue-500", main: true },
]

export const dischargeSubcategories = [
  { id: "boy-discharge", label: "Выписка мальчика", emoji: "👦" },
  { id: "girl-discharge", label: "Выписка девочки", emoji: "👧" },
]

export type Composition = {
  id: number
  image: string
  title: string
  description: string
  price: string
  priceNum: number
  colors: string[]
  subcategory?: string
  contain?: boolean
  highlight?: boolean
}

export const COLOR_OPTIONS = [
  { id: "gold", label: "Золотые", hex: "#d4a017" },
  { id: "blue", label: "Синие", hex: "#60a5fa" },
  { id: "beige", label: "Коричневые", hex: "#a0785a" },
  { id: "brown", label: "Коричневые", hex: "#a0785a" },
  { id: "white", label: "Белые", hex: "#ffffff", border: true },
  { id: "pink", label: "Розовые", hex: "#f472b6" },
  { id: "yellow", label: "Жёлтые", hex: "#facc15" },
  { id: "green", label: "Зелёные", hex: "#4ade80" },
  { id: "black", label: "Чёрные", hex: "#1f2937" },
  { id: "silver", label: "Серебристые", hex: "#9ca3af" },
  { id: "rosegold", label: "Розовое золото", hex: "#e8b4a0" },
  { id: "cream", label: "Кремовые", hex: "#f5e6c8", border: true },
  { id: "purple", label: "Фиолетовые", hex: "#a78bfa" },
  { id: "red", label: "Красные", hex: "#f87171" },
  { id: "orange", label: "Оранжевые", hex: "#fb923c" },
  { id: "multicolor", label: "Разноцветные", hex: "#a855f7" },
]

export type ModalItem = Composition | null

let _allCompositions: Composition[] = []

export function registerAllCompositions(items: Composition[]) {
  _allCompositions = items
}

export function getAllCompositions(): Composition[] {
  return _allCompositions
}