import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import Icon from "@/components/ui/icon"

const birthdaySubcategories = [
  { id: "girl", label: "Для девушки", emoji: "💕", color: "from-pink-400 to-rose-500", main: true },
  { id: "man", label: "Для мужчины", emoji: "🎩", color: "from-blue-500 to-blue-700", main: true },
  { id: "boy", label: "Для мальчика", emoji: "🚀", color: "from-cyan-400 to-blue-500", main: true },
  { id: "kid-girl", label: "Для девочки", emoji: "👑", color: "from-purple-400 to-pink-500", main: true },
  { id: "bubbles-box", label: "Баблс-бокс", emoji: "💐", color: "from-sky-300 to-blue-400", hit: true },
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
  { id: "gold", label: "Золотые", hex: "#d4a017" },
  { id: "blue", label: "Синие", hex: "#60a5fa" },
  { id: "beige", label: "Бежевые", hex: "#e8d5b0", border: true },
  { id: "pink", label: "Розовые", hex: "#f472b6" },
  { id: "yellow", label: "Жёлтые", hex: "#facc15" },
  { id: "green", label: "Зелёные", hex: "#4ade80" },
  { id: "black", label: "Чёрные", hex: "#1f2937" },
  { id: "silver", label: "Серебристые", hex: "#9ca3af" },
  { id: "purple", label: "Фиолетовые", hex: "#a78bfa" },
  { id: "red", label: "Красные", hex: "#f87171" },
  { id: "orange", label: "Оранжевые", hex: "#fb923c" },
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
    { id: 5, image: "https://cdn.poehali.dev/files/0f4a96e8-4afc-48fa-9ece-5be036b34b3e.jpg", title: "Космонавт", description: "Фольгированная цифра — 1 шт., фольгированное сердце — 3 шт., фольгированная фигурка Космонавт — 1 шт.", price: "5 000 ₽", priceNum: 5000, colors: ["blue", "red", "gold"], subcategory: "boy" },
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
    { id: 7, image: "https://cdn.poehali.dev/files/e663f426-66ac-4f32-b758-226de1188a44.jpg", title: "Малышка с сердечками", description: "Фольгированный шар-малышка с розовыми сердечками — нежная композиция для встречи девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "purple"], subcategory: "girl-discharge" },
    { id: 8, image: "https://cdn.poehali.dev/files/304bf334-c3f2-4d39-9279-c52e814ee600.jpg", title: "Зайка с облаками", description: "Серебристый зайка и шары-облака с ресничками на фоне нежных серо-зелёных и белых шаров.", price: "Цена по запросу", priceNum: 0, colors: ["silver", "white"], subcategory: "girl-discharge" },
    { id: 9, image: "https://cdn.poehali.dev/files/a84a3d89-931f-4cd5-90c4-89457c4fca4d.jpg", title: "Баблс «Добро пожаловать, доченька!»", description: "Большой прозрачный шар с надписью и бантиками, облако с ресничками, розовые и конфетти-шары.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 10, image: "https://cdn.poehali.dev/files/8c7a3642-3165-4400-91ac-d32cfe9cede6.jpg", title: "Малышка с облаком", description: "Шар-малышка с соской, облако с ресничками и букет из розовых и конфетти-шаров с сердечком.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 11, image: "https://cdn.poehali.dev/files/dd238e27-648b-4afe-8071-67d2251286a6.jpg", title: "Сердце с метриками и луна", description: "Фольгированное сердце с метриками новорождённой, розовая луна и блестящие конфетти-шары.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "silver"], subcategory: "girl-discharge" },
    { id: 12, image: "https://cdn.poehali.dev/files/e94c963f-3301-4ee5-8f2d-1e9456e24132.jpg", title: "Баблс «Добро пожаловать домой»", description: "Большой кремовый баблс-шар с именем, фольгированные сердца с надписями и зайка — всё в золотисто-жемчужных тонах.", price: "Цена по запросу", priceNum: 0, colors: ["beige", "gold"], subcategory: "girl-discharge" },
    { id: 13, image: "https://cdn.poehali.dev/files/32e43802-c665-44ec-b4a9-4f8428c5fd23.jpg", title: "Сердце «Спасибо за дочь»", description: "Розовое фольгированное сердце с надписью в окружении розовых, серебристых и конфетти-шаров со звёздами.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "silver"], subcategory: "girl-discharge" },
    { id: 14, image: "https://cdn.poehali.dev/files/70e32496-2695-44f6-91b9-df4ea9cc6da4.jpg", title: "Малышка с коляской «It's a Girl»", description: "Фольгированная малышка с соской, розовая коляска с надписью «It's a Girl» и букет розовых шаров.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "girl-discharge" },
    { id: 15, image: "https://cdn.poehali.dev/files/ab574c8d-d338-454a-8323-8d1e3d4475f4.jpg", title: "Аист с конфетти", description: "Большой фольгированный аист с малышкой и букет розовых и конфетти-шаров — яркая встреча из роддома.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "girl-discharge" },
    { id: 16, image: "https://cdn.poehali.dev/files/d879182f-5d57-425a-a02c-97dca1055e8f.jpg", title: "Сердце с мишками и бантом", description: "Большое розовое сердце с метриками, фольгированный бант, два шара-мишки и нежные розово-белые шары.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "beige"], subcategory: "girl-discharge" },
    { id: 17, image: "https://cdn.poehali.dev/files/d150d34e-7423-4c1d-9cb3-5b7f84ecdde6.jpg", title: "Баблс с метриками и облаком", description: "Большой белый баблс-шар с метриками и рисунком медвежонка, облако с ресничками и жемчужные шары.", price: "Цена по запросу", priceNum: 0, colors: ["white", "beige"], subcategory: "girl-discharge" },
    { id: 18, image: "https://cdn.poehali.dev/files/2678f09d-ee3d-482f-891f-710074fc7851.jpg", title: "Облако и баблс — серебро", description: "Большое облако с ресничками, баблс с метриками и серебристые шары — нежная серебристо-белая композиция.", price: "Цена по запросу", priceNum: 0, colors: ["white", "silver"], subcategory: "girl-discharge" },
    { id: 19, image: "https://cdn.poehali.dev/files/03180278-fd20-45e4-900a-3fe9d7e11f53.jpg", title: "Облака с метриками — золото", description: "Белые шары-облака с мимикой, фольгированное сердце с метриками и баблс-шар с надписью в золотисто-кремовых тонах.", price: "Цена по запросу", priceNum: 0, colors: ["white", "gold", "silver"], subcategory: "girl-discharge" },
    { id: 20, image: "https://cdn.poehali.dev/files/784f66d9-fa11-43ec-b38b-9ea73b0b9bb7.jpg", title: "Баблс с золотом и кистями", description: "Большой прозрачный шар с золотыми шарами внутри и розовыми кистями, розовые и конфетти-шары вокруг.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "gold"], subcategory: "girl-discharge" },
    { id: 21, image: "https://cdn.poehali.dev/files/3f49c9ec-0bb6-4b77-93b0-4cd8ff751e26.jpg", title: "Два сердца с облаком", description: "Большое розовое сердце с метриками, малое сердце «Спасибо за дочку» и голубое облако с ресничками.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 22, image: "https://cdn.poehali.dev/files/24f55090-65a6-4df9-b877-f00097795f2e.jpg", title: "Единорог и карета принцессы", description: "Большой единорог, карета принцессы, замок и розовый баблс с метриками — сказочная встреча из роддома.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "gold"], subcategory: "girl-discharge" },
    { id: 23, image: "https://cdn.poehali.dev/files/29c0652c-81eb-4b3f-afc4-8f314f505497.jpg", title: "Баблс с бантиками под потолок", description: "Прозрачный баблс с именем и бантиками среди розовых и белых шаров с лентами под потолком.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 24, image: "https://cdn.poehali.dev/files/813355fc-db5b-46c4-8391-aabd7462e41a.jpg", title: "Розовый баблс с сердцем", description: "Большой розовый баблс с метриками и бантиками, сердце «Наша девочка дома» и кремово-белые шары.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "beige"], subcategory: "girl-discharge" },
    { id: 25, image: "https://cdn.poehali.dev/files/3f82b4e0-7d26-4668-9850-fa3bdb0ac62d.jpg", title: "Баблс «Добро пожаловать в семью»", description: "Большой белый баблс с золотой надписью и розовыми бантиками, жемчужные и прозрачные шары.", price: "Цена по запросу", priceNum: 0, colors: ["white", "pink"], subcategory: "girl-discharge" },
    { id: 26, image: "https://cdn.poehali.dev/files/2a7e738a-0695-4a29-a93b-1618d9bf8ffb.jpg", title: "Лошадка-качалка с бантом", description: "Фольгированная лошадка-качалка, розовый бант, баблс с метриками и букет розовых прозрачных шаров.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "beige"], subcategory: "girl-discharge" },
    { id: 27, image: "https://cdn.poehali.dev/files/fbdb15e5-4e76-4a90-a10a-0318b1522d25.jpg", title: "Мишка на лошадке с золотом", description: "Большой мишка на лошадке-качалке, облака с надписями, баблс с метриками — в золотисто-кремовых тонах.", price: "Цена по запросу", priceNum: 0, colors: ["beige", "gold"], subcategory: "girl-discharge" },
    { id: 28, image: "https://cdn.poehali.dev/files/a1db3848-b8fd-4e52-91bb-35477c91665c.jpg", title: "Баблс «Малышка, добро пожаловать»", description: "Баблс с надписью и конфетти, два облака с ресничками и букеты из розовых, белых и хромированных шаров.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "silver", "white"], subcategory: "girl-discharge" },
    { id: 29, image: "https://cdn.poehali.dev/files/08fa9443-3f7f-4cd3-aec4-eac81f549e87.jpg", title: "Единорог и карета — сказка", description: "Единорог, карета принцессы, замок и розовый баблс с метриками среди нежно-розовых шаров.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "gold"], subcategory: "girl-discharge" },
    { id: 30, image: "https://cdn.poehali.dev/files/16008149-ade4-4be9-a851-75d555ac849c.jpg", title: "Баблс с бантом", description: "Большой розовый баблс с метриками и фольгированный бант — лаконичная нежная композиция.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 31, image: "https://cdn.poehali.dev/files/ee838662-fd9f-43ba-909d-54097dd215d7.jpg", title: "Два баблса с облаком и сердцами", description: "Баблс с метриками, прозрачный баблс «Добро пожаловать домой», облако и сердца — кремово-розовое оформление.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "beige", "gold"], subcategory: "girl-discharge" },
    { id: 32, image: "https://cdn.poehali.dev/files/3749b2f6-9e53-47f2-90c6-13d2dbb30d53.jpg", title: "Баблс с сердцем «Спасибо за дочь»", description: "Прозрачный баблс с метриками, серебристое сердце «Любимая, спасибо за дочь» и букет золотисто-белых шаров.", price: "Цена по запросу", priceNum: 0, colors: ["white", "gold"], subcategory: "girl-discharge" },
    { id: 33, image: "https://cdn.poehali.dev/files/38a2e2c3-85fb-465d-a56a-eb300f885d99.jpg", title: "Баблс «Доченька, добро пожаловать»", description: "Большой кремовый баблс с надписью и бантиками среди нежно-розовых и белых шаров.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 34, image: "https://cdn.poehali.dev/files/b1bfb1e9-d631-4068-84b3-cb3b17122582.jpg", title: "Мишка с баблсом и метриками", description: "Мятный мишка с бантиком, большой кремовый шар с именем и датой, арка из розовых и кремовых шаров.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "beige"], subcategory: "girl-discharge" },
    { id: 35, image: "https://cdn.poehali.dev/files/2f066f2f-87ff-4c9a-8941-6df55a61268c.jpg", title: "Динозаврик с баблсом", description: "Розовый динозаврик с короной, облако с ресничками, баблс с метриками и золотые конфетти-шары.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "gold"], subcategory: "girl-discharge" },
    { id: 36, image: "https://cdn.poehali.dev/files/235df2f8-f4fc-49f4-9e80-4db82093e749.jpg", title: "Баблс «Добро пожаловать в семью»", description: "Белый баблс с золотой надписью и розовыми бантиками, облако с ресничками и нежные жемчужные шары.", price: "Цена по запросу", priceNum: 0, colors: ["white", "pink"], subcategory: "girl-discharge" },
    { id: 37, image: "https://cdn.poehali.dev/files/9c62a7fd-65bc-43a4-a787-0daf63c5ff85.jpg", title: "Сердце с метриками и облако", description: "Розовое сердце с метриками, баблс с перьями, облако с ресничками и золотые шары под потолок.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "gold"], subcategory: "girl-discharge" },
    { id: 38, image: "https://cdn.poehali.dev/files/dd5d74be-10e2-4b92-a891-32a072c4b0dc.jpg", title: "Три шара с надписями", description: "Два сердца «Спасибо за доченьку» и «Добро пожаловать домой», большой шар с метриками и облако с ресничками.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 39, image: "https://cdn.poehali.dev/files/0485dead-a08f-426f-b94f-719c1afc6909.jpg", title: "Баблс с бантиками и сердцем", description: "Кремовый баблс с метриками и бантиками, прозрачный шар с перьями, розовое сердце и облако с ресничками.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "beige"], subcategory: "girl-discharge" },
    { id: 40, image: "https://cdn.poehali.dev/files/5c8ce543-1b55-4600-a51c-aa878a31440b.jpg", title: "Белое сердце с метриками", description: "Большое белое сердце с именем и метриками — лаконичная классическая композиция с розовыми шарами.", price: "Цена по запросу", priceNum: 0, colors: ["white", "pink"], subcategory: "girl-discharge" },
    { id: 41, image: "https://cdn.poehali.dev/files/7082819e-e750-4c39-bbb0-710a8606a9a3.jpg", title: "Зайка с баблсом и сердцами", description: "Большой зайка с золотыми ушами, баблс с метриками, шар «Добро пожаловать домой» и кремовые сердца.", price: "Цена по запросу", priceNum: 0, colors: ["beige", "gold"], subcategory: "girl-discharge" },
    { id: 42, image: "https://cdn.poehali.dev/files/12ccf906-1973-42e4-9abf-06ab9f6ed433.jpg", title: "Баблс с облаками и конфетти", description: "Розовый баблс с метриками и бантиками, два розовых облака с мимикой и нежные перламутровые шары.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "girl-discharge" },
    { id: 43, image: "https://cdn.poehali.dev/files/757bc314-504a-4f07-ae92-5cab33a0bbb7.jpg", title: "Мишка с сердцами и баблсом", description: "Мишка с золотым бантом, баблс с метриками, два сердца с надписями и белые шары под потолок.", price: "Цена по запросу", priceNum: 0, colors: ["white", "silver"], subcategory: "girl-discharge" },
    { id: 44, image: "https://cdn.poehali.dev/files/69c9c337-dc8e-4942-b7f9-6d4d03b71d9b.jpg", title: "Баблс с мишкой и облаком", description: "Прозрачный баблс с мишкой и перьями внутри, розовый шар «Добро пожаловать домой» и облако с ресничками.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "beige"], subcategory: "girl-discharge" },
    { id: 45, image: "https://cdn.poehali.dev/files/80a307bb-4b73-4946-89c6-b2cdfd663125.jpg", title: "Баблс с бантом и сердцами", description: "Прозрачный баблс с именем и бантиками, большой фольгированный бант и два сердца — нежно-розовая композиция.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "beige"], subcategory: "girl-discharge" },
    { id: 46, image: "https://cdn.poehali.dev/files/11e692cb-9e8b-4bdc-8a40-bce61dac0413.jpg", title: "Розовый баблс под потолок", description: "Большой розовый баблс с метриками и бантиками, сердца и кремово-розовые шары под потолком.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "beige"], subcategory: "girl-discharge" },
    { id: 47, image: "https://cdn.poehali.dev/files/8fcccdee-adcc-4d33-a3e2-71e1ebd1d034.jpg", title: "Сердце с именем и баблс", description: "Розовое сердце с именем, баблс «Доченька, добро пожаловать домой», облако с ресничками и жемчужные шары.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "beige"], subcategory: "girl-discharge" },
    { id: 48, image: "https://cdn.poehali.dev/files/72567da6-cae4-4c2a-beab-1f0fe2d0c1df.jpg", title: "Сердце и облако с золотом", description: "Розовое сердце с метриками, баблс с перьями, облако с ресничками и золотые шары под потолок.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "gold"], subcategory: "girl-discharge" },
    { id: 49, image: "https://cdn.poehali.dev/files/7b09bfcf-8821-4d78-9acf-b5a412de7482.jpg", title: "Розовое сердце с метриками", description: "Большое розовое сердце «Добро пожаловать домой» с метриками и букет из хромированных и нежно-розовых шаров.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "girl-discharge" },
    { id: 50, image: "https://cdn.poehali.dev/files/94e56713-e6ea-424e-ab50-e952478332fe.jpg", title: "Баблс с мишкой и облаком — золото", description: "Прозрачный баблс с именем и мишкой внутри, розовый шар «Добро пожаловать домой» и облако с ресничками.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "beige", "gold"], subcategory: "girl-discharge" },
    { id: 51, image: "https://cdn.poehali.dev/files/2104f8c5-d858-4a44-a42a-2d7578146989.jpg", title: "Баблс с надписью и сердцами", description: "Большой розовый баблс «Добро пожаловать», сердца и облако с ресничками среди нежно-розовых и кремовых шаров.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "beige"], subcategory: "girl-discharge" },
    { id: 52, image: "https://cdn.poehali.dev/files/d5f84217-c6e5-444a-919c-f8cbb007ba8b.jpg", title: "Баблс с бантом и букетом", description: "Большой кремовый баблс с метриками и фольгированный бант, рядом букет из серебристых и розово-лиловых шаров.", price: "Цена по запросу", priceNum: 0, colors: ["beige", "pink", "silver"], subcategory: "girl-discharge" },
    { id: 53, image: "https://cdn.poehali.dev/files/4c2a3f98-3228-4f8a-9c5d-38f35f06d1e6.jpg", title: "Малышка с золотыми шарами", description: "Фольгированная малышка с соской на фоне розовых, белых и золотых хромированных шаров.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "gold", "white"], subcategory: "girl-discharge" },
    { id: 54, image: "https://cdn.poehali.dev/files/6e9b8641-fa2a40f1-bc12-984c63b439c6.jpg", title: "Два сердца с облаком и золотом", description: "Два сердца с метриками и надписью «Добро пожаловать в мир», большое облако с ресничками и золотые шары.", price: "Цена по запросу", priceNum: 0, colors: ["white", "gold"], subcategory: "girl-discharge" },
    { id: 55, image: "https://cdn.poehali.dev/files/0331fb37-ede0-43cb-a37c-4e845f4586a4.jpg", title: "Луна с мишкой и облаком", description: "Большая луна с мишкой, облако с ресничками, сердце с именем и нежно-розовые конфетти-шары.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "beige"], subcategory: "girl-discharge" },
    { id: 56, image: "https://cdn.poehali.dev/files/a6c92aeb-f857-4d94-9a9c-dac8aee8cc12.jpg", title: "Розовый шар с бантиками", description: "Большой розово-пудровый шар с именем, датой и бантиками, рядом букет из пудровых, белых и золотых шаров.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "gold", "white"], subcategory: "girl-discharge" },
    { id: 57, image: "https://cdn.poehali.dev/files/4cea9087-7379-471c-9c44-19fcccb1c6e8.jpg", title: "Мишка с баблсом и метриками", description: "Большой мишка с бантиком, баблс с метриками и шар с надписью «Добро пожаловать домой» — нежная кремовая композиция.", price: "Цена по запросу", priceNum: 0, colors: ["beige", "pink", "white"], subcategory: "girl-discharge" },
    { id: 58, image: "https://cdn.poehali.dev/files/be462c6c-10c8-4639-98ec-85e6c2801c94.jpg", title: "Бант и баблс с надписью", description: "Большой пудровый бант, баблс «Добро пожаловать домой, мои любимые девочки» и облако с ресничками.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "silver"], subcategory: "girl-discharge" },
    { id: 59, image: "https://cdn.poehali.dev/files/62581137-2c15-4eba-9f35-242095b6dce8.jpg", title: "Коляска Welcome Home", description: "Нежная коляска с мишкой, сердце «Welcome Home» и букет из мятных, золотых и розовых шаров «Oh Baby».", price: "Цена по запросу", priceNum: 0, colors: ["pink", "gold", "green"], subcategory: "girl-discharge" },
    { id: 60, image: "https://cdn.poehali.dev/files/3414be80-884e-4210-93cd-bd1bfaa5ee36.jpg", title: "Баблс с луной", description: "Прозрачный баблс с надписью «Девочки, добро пожаловать домой» и большая луна с ресничками.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 61, image: "https://cdn.poehali.dev/files/b2dd6ba7-1ab6-4a8d-b5b6-7b05574527b1.jpg", title: "Белый шар с метриками и облаком", description: "Большой белый шар с именем и метриками, облако с ресничками и белые конфетти-шары — лаконичная нежная композиция.", price: "Цена по запросу", priceNum: 0, colors: ["white"], subcategory: "girl-discharge" },
  ],
}

type ModalItem = Composition | null

const PRICE_MIN = 0
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
  return (
    <div className="flex items-center gap-2">
      <p className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">Бюджет</p>
      <div className="flex items-center gap-1.5 ml-2">
        <input
          type="number"
          value={minPrice}
          placeholder="от"
          onChange={(e) => onMinChange(e.target.value === "" ? "" : Number(e.target.value))}
          className="w-20 text-center text-sm font-bold text-primary border border-border rounded-lg px-2 py-1 focus:outline-none focus:border-primary"
        />
        <span className="text-muted-foreground text-sm">—</span>
        <input
          type="number"
          value={maxPrice}
          placeholder="до"
          onChange={(e) => onMaxChange(e.target.value === "" ? "" : Number(e.target.value))}
          className="w-24 text-center text-sm font-bold text-primary border border-border rounded-lg px-2 py-1 focus:outline-none focus:border-primary"
        />
        <span className="text-sm text-primary font-bold">₽</span>
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
  const [activeSubcategories, setActiveSubcategories] = useState<string[]>([])
  const [activeColors, setActiveColors] = useState<string[]>([])
  const [minPrice, setMinPrice] = useState<number | "">("")
  const [maxPrice, setMaxPrice] = useState<number | "">("")

  const toggleSubcategory = (id: string) => {
    setActiveSubcategories((prev) =>
      prev.includes(id) ? [] : [id]
    )
  }

  const toggleColor = (id: string) => {
    setActiveColors((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )
  }

  const resetAll = () => {
    setActiveSubcategories([])
    setActiveColors([])
    setMinPrice("")
    setMaxPrice("")
  }

  const hasFilters =
    activeSubcategories.length > 0 ||
    activeColors.length > 0 ||
    minPrice !== "" ||
    maxPrice !== ""

  const filtered = items
    .filter((item) => minPrice === "" || item.priceNum >= minPrice)
    .filter((item) => maxPrice === "" || item.priceNum <= maxPrice)
    .filter(
      (item) =>
        activeSubcategories.length === 0 ||
        (item.subcategory && activeSubcategories.includes(item.subcategory))
    )
    .filter(
      (item) =>
        activeColors.length === 0 ||
        activeColors.some((c) => item.colors.includes(c))
    )

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
                    <span className="text-xl sm:text-3xl">{cat.emoji}</span>
                    <span className="text-[10px] sm:text-base text-center leading-tight">{cat.label}</span>
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
                    {cat.hit && (
                      <span className="absolute -top-2 -right-1 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow">ХИТ</span>
                    )}
                    <span className="text-lg sm:text-2xl">{cat.emoji}</span>
                    <span className="text-center leading-tight text-[9px] sm:text-sm">{cat.label}</span>
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
                    <span className="text-base">{cat.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Color filter */}
        <div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            <p className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap self-center">Цвет</p>
            {COLOR_OPTIONS.map((color) => {
              const isActive = activeColors.includes(color.id)
              return (
                <button
                  key={color.id}
                  onClick={() => toggleColor(color.id)}
                  title={color.label}
                  className={`flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium border-2 transition-all ${
                    isActive
                      ? "border-primary shadow-md scale-105"
                      : "border-transparent bg-muted hover:border-border"
                  }`}
                >
                  <span
                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-full flex-shrink-0"
                    style={{
                      background: color.id === "beige" ? "#8B6914" : color.hex,
                      border: color.border ? "1px solid #d1d5db" : undefined,
                    }}
                  />
                  <span className="text-foreground/80">{color.label}</span>
                </button>
              )
            })}
          </div>
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
          {filtered.map((item, idx) => (
            <div
              key={`${item.subcategory ?? "item"}-${item.id}-${idx}`}
              className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-110"
              onClick={() => setModal(item)}
            >
              <img src={item.image} alt={item.title} className="w-full object-cover group-hover:scale-110 transition-transform duration-500" style={{ aspectRatio: "1/1" }} />
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
              {/* Price always visible */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pt-6 pb-2.5 px-3">
                <p className="text-white text-xs font-semibold truncate opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.title}</p>
                <p className="text-white font-extrabold text-base drop-shadow-lg">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <CompositionModal
          modal={modal}
          allItems={filtered}
          onNavigate={(item) => setModal(item)}
          onClose={() => setModal(null)}
        />
      )}
    </>
  )
}

function CompositionModal({ modal, allItems, onNavigate, onClose }: {
  modal: Composition
  allItems: Composition[]
  onNavigate: (item: Composition) => void
  onClose: () => void
}) {
  const idx = allItems.findIndex((i) => i === modal || (i.id === modal.id && i.subcategory === modal.subcategory))
  const hasPrev = idx > 0
  const hasNext = idx < allItems.length - 1

  const goPrev = () => { if (hasPrev) onNavigate(allItems[idx - 1]) }
  const goNext = () => { if (hasNext) onNavigate(allItems[idx + 1]) }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev()
      if (e.key === "ArrowRight") goNext()
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [idx, allItems])

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
      >
        {/* Фото 3:4 */}
        <div className="relative w-full flex-shrink-0" style={{ aspectRatio: "3/4", maxHeight: "58vh" }}>
          <img
            src={modal.image}
            alt={modal.title}
            className="absolute inset-0 w-full h-full object-cover"
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
          <div className="px-4 pt-4 pb-2 flex items-start justify-between gap-2 flex-shrink-0">
            <div>
              <h3 className="text-base font-bold text-foreground leading-tight">{modal.title}</h3>
              <span className="text-primary font-bold text-lg">{modal.price}</span>
            </div>
          </div>
          <div className="px-4 pb-1 flex-shrink-0">
            <p className="text-xs font-semibold text-primary uppercase tracking-wide flex items-center gap-1">
              <Icon name="Sparkles" size={11} /> Наполнение
            </p>
          </div>
          <div className="px-4 pb-3 space-y-2 flex-shrink-0">
            <p className="text-sm text-foreground/80 leading-relaxed">{modal.description}</p>
            <div className="bg-primary/8 border border-primary/20 rounded-xl px-3 py-2 text-primary text-xs font-medium">
              🎨 Наполнение можно изменить под ваш бюджет и пожелания
            </div>
            <div className="bg-muted/50 rounded-xl px-3 py-2 text-xs text-muted-foreground space-y-1">
              <div className="flex items-center gap-2"><Icon name="Clock" size={12} className="text-primary flex-shrink-0" /><span>Доставка 24/7 по Краснодару и Краю</span></div>
              <div className="flex items-center gap-2"><Icon name="MapPin" size={12} className="text-primary flex-shrink-0" /><span>Самовывоз: ул. Героя Яцкова 19к3</span></div>
            </div>
          </div>
          <div className="border-t border-border px-4 py-3 flex-shrink-0 space-y-2 bg-white">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Как заказать</p>
            <p className="text-xs text-muted-foreground">Напишите нам номер композиции, сориентируем по наполнению и доставке</p>
            <div className="flex flex-wrap gap-2">
              <a href="tel:+79885973303" className="flex items-center gap-1 bg-primary text-primary-foreground px-3 py-2 rounded-full text-xs font-medium">
                <Icon name="Phone" size={12} /> 8 988 597 33 03
              </a>
              <a href="https://wa.me/79885973303" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 bg-green-500 text-white px-3 py-2 rounded-full text-xs font-medium">
                <Icon name="MessageSquare" size={12} /> WhatsApp
              </a>
              <a href="#" className="flex items-center gap-1 bg-blue-500 text-white px-3 py-2 rounded-full text-xs font-medium">
                <Icon name="Send" size={12} /> Telegram
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
            className="absolute inset-0 w-full h-full object-cover"
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
          <div className="flex items-start justify-between px-5 pt-5 pb-3 border-b border-border/40 flex-shrink-0">
            <div className="flex-1 min-w-0 pr-3">
              <h3 className="text-lg sm:text-xl font-medium text-foreground leading-tight" style={{ fontFamily: "'Nunito', 'Segoe UI', sans-serif" }}>
                {modal.title}
              </h3>
              <span className="text-primary font-bold text-base sm:text-lg">{modal.price}</span>
            </div>
            <button className="w-9 h-9 flex-shrink-0 bg-muted rounded-full flex items-center justify-center hover:bg-muted/80 transition-colors" onClick={onClose}>
              <Icon name="X" size={18} />
            </button>
          </div>
          <div className="px-5 pt-4 pb-1 flex-shrink-0">
            <p className="text-xs font-semibold text-primary uppercase tracking-wide flex items-center gap-1.5">
              <Icon name="Sparkles" size={13} /> Наполнение
            </p>
          </div>
          <div className="flex-1 overflow-y-auto px-5 pb-4 space-y-3 min-h-0">
            <p className="text-foreground/80 leading-relaxed text-sm sm:text-base">{modal.description}</p>
            <div className="bg-primary/8 border border-primary/20 rounded-xl px-4 py-3 text-primary text-sm font-medium">
              🎨 Наполнение любой композиции можно изменить под ваш бюджет и пожелания.
            </div>
            <div className="bg-muted/50 rounded-xl px-4 py-3 text-sm text-muted-foreground space-y-1.5">
              <div className="flex items-center gap-2"><Icon name="Clock" size={14} className="text-primary flex-shrink-0" /><span>Доставка 24/7 по Краснодару и Краю</span></div>
              <div className="flex items-center gap-2"><Icon name="MapPin" size={14} className="text-primary flex-shrink-0" /><span>Самовывоз: ул. Героя Яцкова 19к3</span></div>
            </div>
          </div>
          <div className="border-t border-border px-5 py-4 flex-shrink-0 space-y-3 bg-white">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Как заказать</p>
              <p className="text-xs text-muted-foreground leading-relaxed">Напишите нам номер композиции, сориентируем по наполнению и доставке</p>
            </div>
            <div className="flex flex-col gap-2">
              <a href="tel:+79885973303" className="flex items-center gap-2 bg-rose-50 border border-rose-200 rounded-xl px-4 py-2.5 font-bold text-foreground hover:bg-rose-100 transition-colors text-sm">
                <Icon name="Phone" size={14} className="text-primary" /> 8 988 597 33 03
              </a>
              <a href="tel:+79182457204" className="flex items-center gap-2 bg-rose-50 border border-rose-200 rounded-xl px-4 py-2.5 font-bold text-foreground hover:bg-rose-100 transition-colors text-sm">
                <Icon name="Phone" size={14} className="text-primary" /> 8 918 245 72 04
              </a>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <a href="https://wa.me/79885973303" className="flex items-center gap-1 bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-medium hover:bg-green-600 transition-colors">
                <Icon name="MessageSquare" size={12} /> WhatsApp
              </a>
              <a href="#" className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-medium hover:bg-blue-600 transition-colors">
                <Icon name="Send" size={12} /> Telegram
              </a>
              <a href="#" className="flex items-center gap-1 bg-blue-700 text-white px-3 py-1.5 rounded-full text-xs font-medium hover:bg-blue-800 transition-colors">
                <Icon name="MessageCircle" size={12} /> ВКонтакте
              </a>
              <a href="#" className="flex items-center gap-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-medium hover:opacity-90 transition-opacity">
                <Icon name="Instagram" size={12} /> Instagram
              </a>
              <a href="#" className="flex items-center gap-1 text-white px-3 py-1.5 rounded-full text-xs font-medium" style={{ backgroundColor: "#1e3a5f" }}>
                <Icon name="Flame" size={12} /> Max
              </a>
            </div>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-16">
          <div className="flex items-center gap-4 mb-3">
            <button
              onClick={() => navigate("/catalog")}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <Icon name="ArrowLeft" size={16} /> Назад
            </button>
          </div>
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <span className="text-3xl sm:text-4xl">🎂</span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold leading-tight">На день рождения</h1>
              <p className="text-muted-foreground text-xs sm:text-sm">Для девушки, мужчины, мальчика, девочки и другие</p>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-16">
          <button
            onClick={() => navigate("/catalog")}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground mb-3 transition-colors text-sm"
          >
            <Icon name="ArrowLeft" size={16} /> Назад
          </button>
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <span className="text-3xl sm:text-4xl">👶</span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold leading-tight">На выписку</h1>
              <p className="text-muted-foreground text-xs sm:text-sm">Встречаем малыша из роддома</p>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-16">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 sm:mb-6 transition-colors text-sm"
        >
          <Icon name="ArrowLeft" size={16} /> На главную
        </button>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight mb-2 sm:mb-3">
          Каталог <span className="font-semibold">шариков</span>
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-10">Выберите повод для праздника</p>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-8">
          <button
            onClick={() => navigate("/catalog?section=birthday")}
            className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-pink-400 via-rose-400 to-purple-500 min-h-[180px] sm:min-h-[400px] flex flex-col items-center justify-center gap-2 sm:gap-4 shadow-xl hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 p-4 sm:p-8"
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            <span className="relative text-5xl sm:text-8xl">🎂</span>
            <div className="relative text-center">
              <h2 className="text-white text-lg sm:text-4xl font-bold mb-1 sm:mb-2 leading-tight">На день рождения</h2>
              <p className="text-white/80 text-xs sm:text-lg hidden sm:block">Для девушки, мужчины, мальчика и девочки</p>
            </div>
            <div className="relative flex items-center gap-1 sm:gap-2 text-white/90 text-xs sm:text-sm font-medium">
              Смотреть <Icon name="ArrowRight" size={14} className="sm:hidden" />
              <span className="hidden sm:inline">все композиции</span>
              <Icon name="ArrowRight" size={18} className="hidden sm:inline" />
            </div>
          </button>
          <button
            onClick={() => navigate("/catalog?section=discharge")}
            className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-sky-300 via-blue-400 to-indigo-500 min-h-[180px] sm:min-h-[400px] flex flex-col items-center justify-center gap-2 sm:gap-4 shadow-xl hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 p-4 sm:p-8"
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            <span className="relative text-5xl sm:text-8xl">👶</span>
            <div className="relative text-center">
              <h2 className="text-white text-lg sm:text-4xl font-bold mb-1 sm:mb-2 leading-tight">На выписку</h2>
              <p className="text-white/80 text-xs sm:text-lg hidden sm:block">Встречаем малыша из роддома</p>
            </div>
            <div className="relative flex items-center gap-1 sm:gap-2 text-white/90 text-xs sm:text-sm font-medium">
              Смотреть <Icon name="ArrowRight" size={14} className="sm:hidden" />
              <span className="hidden sm:inline">композиции</span>
              <Icon name="ArrowRight" size={18} className="hidden sm:inline" />
            </div>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}