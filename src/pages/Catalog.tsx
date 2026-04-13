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
    { id: 1, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Набор для девушки 1", description: "Розовые и белые шары с фольгированными сердечками.", price: "1 490 ₽", priceNum: 1490, colors: ["pink", "white"], subcategory: "girl" },
    { id: 2, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Набор для девушки 2", description: "Сиреневые и золотые шары с фольгированной короной.", price: "1 890 ₽", priceNum: 1890, colors: ["purple", "gold"], subcategory: "girl" },
    { id: 3, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Набор для девушки 3", description: "Большая облачная композиция из розовых шаров разных размеров.", price: "2 200 ₽", priceNum: 2200, colors: ["pink"], subcategory: "girl" },
    { id: 4, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Набор для девушки 4", description: "Яркая арка из розовых, коралловых и белых шаров для фотозоны.", price: "3 500 ₽", priceNum: 3500, colors: ["pink", "white"], subcategory: "girl" },
    { id: 5, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Набор для девушки 5", description: "Фольгированная цифра в розово-золотом оформлении.", price: "990 ₽", priceNum: 990, colors: ["pink", "gold"], subcategory: "girl" },
    { id: 6, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Набор для девушки 6", description: "Нежные пастельные шары с живыми цветами и атласными лентами.", price: "2 800 ₽", priceNum: 2800, colors: ["pink", "white"], subcategory: "girl" },
    { id: 7, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9c99662e-bef5-4504-a623-e3bdc9ab36a3.jpg", title: "Набор для девушки 7", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 8, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c4801d79-dc90-4d7f-8763-42f85ecd49bf.jpg", title: "Набор для девушки 8", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 9, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3fd83284-b2ec-45ff-bd42-c6eb2cd87246.jpg", title: "Набор для девушки 9", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 10, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6b5ed6c2-adbc-46f4-a8da-7c50eab42f8e.jpg", title: "Набор для девушки 10", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 11, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d05c932b-4339-475e-8233-c9868e8a2a6c.jpg", title: "Набор для девушки 11", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 12, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/62cb939f-05f5-4e41-89b6-3504437129e0.jpg", title: "Набор для девушки 12", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 13, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/dfe2ab59-e17a-44cf-800f-d64f8af0c606.jpg", title: "Набор для девушки 13", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 14, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/23a9c8fe-ef93-423b-8aca-7b5c0aebb6a1.jpg", title: "Набор для девушки 14", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 15, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8f7c075c-87bf-476f-a6b8-629984c74a4a.jpg", title: "Набор для девушки 15", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 16, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/93df0c07-b260-4461-a39b-5d354e8dbe46.jpg", title: "Набор для девушки 16", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 17, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b7548198-01e7-43b0-8a91-6c3e89cba0e7.jpg", title: "Набор для девушки 17", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 18, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7dea4e39-4bb6-4cf1-bfc1-bcd0f538dff5.jpg", title: "Набор для девушки 18", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 19, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e3b65741-a214-43ca-9d2b-159691cc559f.jpg", title: "Набор для девушки 19", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 20, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/45c49962-4e56-453b-8e46-8e58bdaa0df7.jpg", title: "Набор для девушки 20", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 21, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4e259000-cb7c-4a7a-96cf-84db21d7c173.jpg", title: "Набор для девушки 21", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 22, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5a6e8d5a-123f-4f46-8939-6c8d46966694.jpg", title: "Набор для девушки 22", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 23, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/dc633c7c-d7ad-4bad-afcb-1d4aa9c5e1bd.jpg", title: "Набор для девушки 23", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 24, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/012dd622-6519-4e27-8e05-637e4d890e63.jpg", title: "Набор для девушки 24", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 25, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/93f9a47f-87dd-45ca-b2f8-efe34a12b90a.jpg", title: "Набор для девушки 25", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 26, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/fabfefbf-0ba4-4e9f-96ba-0a58962290d2.jpg", title: "Набор для девушки 26", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 27, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a580c851-e92b-453d-983d-e7eb3730e151.jpg", title: "Набор для девушки 27", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 28, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a7ffd129-bde5-4044-adf6-4b3eb24767d4.jpg", title: "Набор для девушки 28", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 29, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/167428bf-abd9-47cf-beb2-81d73c575918.jpg", title: "Набор для девушки 29", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 30, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b1579e94-8c3e-41db-a1ec-d53154641fac.jpg", title: "Набор для девушки 30", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 31, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6205583c-75c6-4cae-9a4d-d04f7e91dd4f.jpg", title: "Набор для девушки 31", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 32, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1b07f684-e67b-4010-afb7-dcc1a8861409.jpg", title: "Набор для девушки 32", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 33, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/282275b1-a6ca-4cdb-a51d-12dd3486c0fd.jpg", title: "Набор для девушки 33", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 34, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e139275c-2782-411f-97e2-a6b7261fe674.jpg", title: "Набор для девушки 34", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 35, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/54a3a041-6ac1-45ba-8ed6-8e926d55656f.jpg", title: "Набор для девушки 35", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 36, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7abb5cd3-5138-4ab0-a2b6-fc4b4a619872.jpg", title: "Набор для девушки 36", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 37, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b7ea8bc0-f6fc-4dd2-9332-7ce7fb1e7ec9.jpg", title: "Набор для девушки 37", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 38, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/cc0fa4b6-fbe3-4c29-9bae-067098ca7a60.jpg", title: "Набор для девушки 38", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 39, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6e509ede-c7dd-4473-96a7-1590415b4f96.jpg", title: "Набор для девушки 39", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 40, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4beb866c-812c-41f3-a3ae-df7ec0be0788.jpg", title: "Набор для девушки 40", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 41, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/70aab47c-5df8-4796-b2de-9cb915bb17b1.jpg", title: "Набор для девушки 41", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 42, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f870b36b-1e36-4fb1-a0dd-2ef71170bf8b.jpg", title: "Набор для девушки 42", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 43, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4f21d80e-b682-47ad-be8e-d8a431fc92ff.jpg", title: "Набор для девушки 43", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 44, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/42af5c39-754f-456d-a490-2d041bff0ff5.jpg", title: "Набор для девушки 44", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 45, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/91f37758-db57-47b3-bc03-1470f7e7db79.jpg", title: "Набор для девушки 45", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 46, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7b85fcbb-844e-41c5-8b70-cc35c1db3961.jpg", title: "Набор для девушки 46", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 47, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b8c0371a-cf2f-47f5-9aa6-98b4c347eaf0.jpg", title: "Набор для девушки 47", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 48, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3b993517-c829-4029-b179-df572b2a46f3.jpg", title: "Набор для девушки 48", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 49, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/cbfec128-1e62-41ce-9128-ec50a49b83d1.jpg", title: "Набор для девушки 49", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 50, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/41666dff-2472-484c-b318-dd34b08c91f7.jpg", title: "Набор для девушки 50", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 51, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/30649c04-ac94-4197-9820-4db629cf2e6c.jpg", title: "Набор для девушки 51", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 52, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/de0a7243-38c3-4e18-8b80-aab8943f2fe0.jpg", title: "Набор для девушки 52", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 53, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/68d535ec-a7b0-4faa-ae71-011bd673ae5f.jpg", title: "Набор для девушки 53", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 54, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/0e33c4a5-50b0-4345-b0db-ee845795a193.jpg", title: "Набор для девушки 54", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 55, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b880be31-f42a-43a2-a388-7a60b0eb4710.jpg", title: "Набор для девушки 55", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 56, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7243c3dc-174b-4156-bc76-0b8dd610bc15.jpg", title: "Набор для девушки 56", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 57, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/72cb2623-78ae-45f3-93a9-960814b3eb01.jpg", title: "Набор для девушки 57", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 58, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3667be83-d02c-47e1-a7ef-d444dd1d9ffb.jpg", title: "Набор для девушки 58", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 59, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7cc1af8f-d508-4c20-9cae-50c44608bfa7.jpg", title: "Набор для девушки 59", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 60, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/323b52bc-49ab-48cd-b1df-40f7962f489f.jpg", title: "Набор для девушки 60", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 61, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3662f991-f763-4bd4-b2e6-9cf29d87451b.jpg", title: "Набор для девушки 61", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 62, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a47a35e0-55b1-46ed-b63a-edcfef017821.jpg", title: "Набор для девушки 62", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 63, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7b61b975-b73a-4c5d-af07-eaf4e72d13d9.jpg", title: "Набор для девушки 63", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 64, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b211aa7f-330e-4d1a-a79b-1de7b9e6a4dc.jpg", title: "Набор для девушки 64", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 65, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c8ce9107-26b4-455f-9660-4510cc5604eb.jpg", title: "Набор для девушки 65", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 66, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7db3285d-352e-4125-b4c7-a88006126bcc.jpg", title: "Набор для девушки 66", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 67, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3e389bd7-f598-4ed3-8d89-40e7535095ba.jpg", title: "Набор для девушки 67", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 68, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f3fff6c6-9a1b-4f38-a98b-e6c673478cdc.jpg", title: "Набор для девушки 68", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 69, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6f241f12-c896-4e23-ab6b-cd73d4d391c7.jpg", title: "Набор для девушки 69", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 70, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/bfc333af-3d05-4535-8d68-5fb7b1e63bc1.jpg", title: "Набор для девушки 70", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 71, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/07f51c8d-7935-40b1-9937-9b1e53249478.jpg", title: "Набор для девушки 71", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 72, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e81a785b-aa8d-4ba6-a2b8-a38a68e9d1bf.jpg", title: "Набор для девушки 72", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 73, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9f493015-c566-4439-b088-55735bb64c33.jpg", title: "Набор для девушки 73", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 74, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a6022246-c11d-46e5-ae19-fd4e9e7c7e08.jpg", title: "Набор для девушки 74", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 75, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8ca2913b-df38-455c-aa6a-3d7b749ff731.jpg", title: "Набор для девушки 75", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 76, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1ffff0d3-b6e5-41dc-ae42-ea4a544a009a.jpg", title: "Набор для девушки 76", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 77, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/353eb74a-c018-4bc1-a1f4-8ac3be732c10.jpg", title: "Набор для девушки 77", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 78, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5b916afa-cf59-44c2-8c88-32ea4954c6dd.jpg", title: "Набор для девушки 78", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 79, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a2a76ca8-7386-4277-97b0-db6f990b6b46.jpg", title: "Набор для девушки 79", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 80, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7e4d94ed-bbbc-48d2-8320-6bd1349ae488.jpg", title: "Набор для девушки 80", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 81, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d33a560f-8ba4-455b-a4e2-c154383fb6e0.jpg", title: "Набор для девушки 81", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 82, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/40b47215-e536-4098-88e0-89d9a23812af.jpg", title: "Набор для девушки 82", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 83, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e7e6555d-132d-4da8-9ef7-f053ea5147e7.jpg", title: "Набор для девушки 83", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 84, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/83a744ce-be52-4353-a022-4ffb12b1aef3.jpg", title: "Набор для девушки 84", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 85, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/670fd56b-f985-4b93-acab-bd9d2e06ad2e.jpg", title: "Набор для девушки 85", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 86, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6602a9a7-4f50-4e16-90ad-e0d3818900ed.jpg", title: "Набор для девушки 86", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 87, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/eb70c28d-48b5-4d25-9bb9-7612c1c7512d.jpg", title: "Набор для девушки 87", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 88, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5d9569ce-ef42-466a-9d26-1283438ad29a.jpg", title: "Набор для девушки 88", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 89, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/82e22194-fdc6-4075-89d1-ed1f6f4cd0d9.jpg", title: "Набор для девушки 89", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 90, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ad3c5ccd-abdf-41f0-af01-5a37b43d7958.jpg", title: "Набор для девушки 90", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 91, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8ad6dc85-ebae-4a04-990e-3f124a77784e.jpg", title: "Набор для девушки 91", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 92, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1800d312-48cd-4ba6-a7e6-4fd67fd49b9e.jpg", title: "Набор для девушки 92", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 93, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a3e64220-c307-4baf-ba54-649fe730d2fd.jpg", title: "Набор для девушки 93", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 94, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/75e4d540-1d2c-4d86-b253-d228487da386.jpg", title: "Набор для девушки 94", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 95, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/81a5a212-286f-465b-80eb-7401a02d36f9.jpg", title: "Набор для девушки 95", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 96, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/de44dff3-ebb6-4c08-a9c9-a6b614fde231.jpg", title: "Набор для девушки 96", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 97, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/543eb99a-4552-42f4-bb93-2b8a75c04001.jpg", title: "Набор для девушки 97", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 98, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a1022ed0-dbe7-485e-ae08-fbac8483c2b6.jpg", title: "Набор для девушки 98", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 99, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/57ed6e7a-70fa-43f7-9217-02855e76e83c.jpg", title: "Набор для девушки 99", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 100, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e41c8cc0-dc63-41f9-90c8-a5754e5930cd.jpg", title: "Набор для девушки 100", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 101, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3bb212ac-e980-42e2-b697-c5ed01c729f5.jpg", title: "Набор для девушки 101", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 102, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/94c206d9-1f04-4056-a310-86ddd4ac5922.jpg", title: "Набор для девушки 102", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 103, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f0e81957-5113-450e-bc26-4b13ca1faf0a.jpg", title: "Набор для девушки 103", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 104, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/dd6cf241-b65f-4d84-86fd-27c6f9f61ac4.jpg", title: "Набор для девушки 104", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 105, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/705ca319-2353-4ba6-bc3d-a6f0b079e5a4.jpg", title: "Набор для девушки 105", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 106, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/22035862-7e4e-489c-93e6-ded7ae79bb0e.jpg", title: "Набор для девушки 106", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 107, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2fcfc9cb-43e0-4945-adbb-83271abfe0c6.jpg", title: "Набор для девушки 107", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 108, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c0478e19-10d9-42e0-af0d-0fb2539c42b5.jpg", title: "Набор для девушки 108", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 109, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e98c5ca0-bcd1-44fd-9f67-ae955fb7a58e.jpg", title: "Набор для девушки 109", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 110, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/fe4f5981-777f-4b9e-88de-063b90849b4c.jpg", title: "Набор для девушки 110", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 111, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7362df61-147d-4534-bc5e-29f7a42f59da.jpg", title: "Набор для девушки 111", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 112, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4976af09-fee7-4181-830d-7810c8977d49.jpg", title: "Набор для девушки 112", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 113, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/0f95dd73-d570-483d-9f08-2605bca55e17.jpg", title: "Набор для девушки 113", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 114, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3d97625d-1307-4aaf-a698-c64e6567fecc.jpg", title: "Набор для девушки 114", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 115, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5c7432d5-f5dd-473f-83a5-209339ee4a5f.jpg", title: "Набор для девушки 115", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 116, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3cd2b4cb-ad3d-46c0-8332-ca0285484dcb.jpg", title: "Набор для девушки 116", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 117, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/bc15d42d-93fe-43d2-8602-9215f2206293.jpg", title: "Набор для девушки 117", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 118, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7e86abb0-9ade-4838-ad92-5b039c141b73.jpg", title: "Набор для девушки 118", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 119, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/fb6774cf-d023-4028-a762-e6f2f3ee58ca.jpg", title: "Набор для девушки 119", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 120, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e9b6884b-921d-4336-9879-2a80a1d8d7bc.jpg", title: "Набор для девушки 120", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 121, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a577e9a1-dc7f-4cab-9257-295272a64113.jpg", title: "Набор для девушки 121", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 122, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/614aa9dc-2bae-4392-819a-4b18314a0f54.jpg", title: "Набор для девушки 122", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 123, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6b0fc664-4c59-4fa6-90c5-794502e450ad.jpg", title: "Набор для девушки 123", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 124, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5f7f71be-dd42-4455-ac2b-d4d854a12031.jpg", title: "Набор для девушки 124", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 125, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9ff29493-b5ea-44ea-9c1a-0bd0c1ba8863.jpg", title: "Набор для девушки 125", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 126, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3e30e6f7-7906-4d9b-87b0-238d0c4f93fb.jpg", title: "Набор для девушки 126", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 127, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8366d7fd-f6b4-483d-83b4-c1ed30104b39.jpg", title: "Набор для девушки 127", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 128, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a1fb6532-b1fd-4ec5-9266-855c9c7f103c.jpg", title: "Набор для девушки 128", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 129, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c895c453-6d17-49fb-8409-2ed7b3b0ff73.jpg", title: "Набор для девушки 129", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 130, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2371ec3a-8da4-4b06-a9f5-7841941762fb.jpg", title: "Набор для девушки 130", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 131, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c05888c4-0af1-464f-bcbb-0d392c2e39b0.jpg", title: "Набор для девушки 131", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 132, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d7e33394-6760-434c-99a7-f82db8a0b863.jpg", title: "Набор для девушки 132", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 133, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/135b55eb-93c1-404b-bf51-c3ee09dfbbcf.jpg", title: "Набор для девушки 133", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 134, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/19729859-e10b-4f1f-89b8-5f854e8e0c8c.jpg", title: "Набор для девушки 134", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 135, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/56d8f74e-681b-4587-b5fc-5a4ff28a7245.jpg", title: "Набор для девушки 135", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 136, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/aa3ca436-a468-4f87-99c2-f04f6cbe4b01.jpg", title: "Набор для девушки 136", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 137, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c517db23-9c9e-46cf-9d66-2073fd60a134.jpg", title: "Набор для девушки 137", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 138, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/689f1b77-74bb-4ea6-a0f9-5b6725a5b3be.jpg", title: "Набор для девушки 138", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 139, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9986bad0-626e-4f82-84fa-cadbd2c58a55.jpg", title: "Набор для девушки 139", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 140, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/0f9c314b-66f1-44af-a373-63e0e3d6ff4a.jpg", title: "Набор для девушки 140", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 141, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9566d985-3559-4f58-a4cd-8412c8b1e84f.jpg", title: "Набор для девушки 141", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 142, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ea6c4058-e00a-4899-92dd-3ef909796345.jpg", title: "Набор для девушки 142", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 143, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b1e9f95d-5730-4af7-bd2b-a7fdf20a0ebf.jpg", title: "Набор для девушки 143", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 144, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ecd2a84b-59b9-4da7-ac95-e7bd200256bb.jpg", title: "Набор для девушки 144", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 145, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e1525365-d1e6-454c-90e9-f81cc29e0549.jpg", title: "Набор для девушки 145", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 146, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4f6a5b60-e136-4e2b-b64e-f14d4ba881be.jpg", title: "Набор для девушки 146", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 147, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c706f6e0-c8d0-462e-bc8e-5e8895019f8f.jpg", title: "Набор для девушки 147", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 148, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/faba83e4-a5bd-485c-8de7-57f40f279c2e.jpg", title: "Набор для девушки 148", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 149, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/eb015e96-0d3d-4011-a357-6f6472d01af2.jpg", title: "Набор для девушки 149", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 150, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/36bedbeb-752c-4b30-a53f-78046c4e3569.jpg", title: "Набор для девушки 150", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 151, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d011ba49-6b62-4d59-86e2-e3c0b427ad60.jpg", title: "Набор для девушки 151", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 152, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7d562783-4e29-48ea-985e-dd5fce5cc0ea.jpg", title: "Набор для девушки 152", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 153, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e8dfc673-5926-4c59-873d-67519451b8d5.jpg", title: "Набор для девушки 153", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 154, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/74494707-ae6a-4a6b-a2f0-3576d23ef65c.jpg", title: "Набор для девушки 154", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 155, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/01f23696-8f17-4dbe-aeaa-33ca61baaa73.jpg", title: "Набор для девушки 155", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 156, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a5977170-2c38-4ff4-88dc-c58beafe7187.jpg", title: "Набор для девушки 156", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 157, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/50336539-d2d6-485a-8a5e-e74fbfb6a60b.jpg", title: "Набор для девушки 157", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 158, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8c7ae02b-2363-4a26-a798-5f034eb6621f.jpg", title: "Набор для девушки 158", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 159, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/26ad5e64-b38e-4f84-979d-bd6d60b5c914.JPG", title: "Набор для девушки 159", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 160, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/460c9496-1ff1-426c-b150-0b554b1c0dc3.JPG", title: "Набор для девушки 160", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 161, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/88032802-45bf-41ea-9b54-fea3f28ef3d1.JPG", title: "Набор для девушки 161", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 162, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/00bbf434-3a69-44ac-a0a5-fbb3375c419d.JPG", title: "Набор для девушки 162", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 163, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/631ac9a2-6499-4732-9c84-bb3ab360878e.JPG", title: "Набор для девушки 163", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 164, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/46918a08-fc89-428c-8fce-c3f1ac8e199e.JPG", title: "Набор для девушки 164", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 165, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e20afeda-cdb2-4d02-a83f-10b4d917c622.JPG", title: "Набор для девушки 165", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 166, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/419e6b46-8e21-45c6-b328-ac7f2e9036cc.JPG", title: "Набор для девушки 166", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 167, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e6f09fe7-9e55-42bc-a4f2-233481e588f1.JPG", title: "Набор для девушки 167", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 168, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/58057721-e7f4-44b6-8bcf-9921b77ae291.JPG", title: "Набор для девушки 168", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 169, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7cb80026-8eb2-4e44-96a4-7d8405629e43.JPG", title: "Набор для девушки 169", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 170, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1db322c7-35dc-449c-a6e2-43a34b5df53f.JPG", title: "Набор для девушки 170", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 171, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/152fae57-d667-4fc4-8562-5c0816c28b3c.jpg", title: "Набор для девушки 171", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 172, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c83baa78-3cf9-432d-bc12-6718df2741ab.jpg", title: "Набор для девушки 172", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 173, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c784a0ed-4f1f-4253-a7ad-4c71dc7775ce.jpg", title: "Набор для девушки 173", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 174, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/46d3660c-9043-4de5-9579-da49ac1b5a27.jpg", title: "Набор для девушки 174", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 175, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/be1845b5-1b7f-4056-bb21-62c143b85c43.jpg", title: "Набор для девушки 175", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 176, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3b0ca61e-2d31-4aa9-a4ec-867178692516.jpg", title: "Набор для девушки 176", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 177, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/aed0079a-a8d4-4495-b406-167c518789c4.jpg", title: "Набор для девушки 177", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 178, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e85d6847-c2f2-4f27-b5c5-2abf24b51cf5.jpg", title: "Набор для девушки 178", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 179, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d2f52ccb-8380-457f-af71-6a083da546d0.jpg", title: "Набор для девушки 179", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 180, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/16b2ecff-ee38-48ab-b9ef-38df0414b0d4.jpg", title: "Набор для девушки 180", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 181, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3e18d3de-c67d-4588-a399-f1d343991c2c.jpg", title: "Набор для девушки 181", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 182, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f668458a-5b7e-48d1-bd16-44178b48ebf4.jpg", title: "Набор для девушки 182", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 183, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/06ce0a99-b874-4213-9d20-85121a2563cb.jpg", title: "Набор для девушки 183", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 184, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2561d645-737d-4564-850e-13fb462396ac.jpg", title: "Набор для девушки 184", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 185, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/34b68cb0-dbc4-4825-bbba-c37c83f063f6.jpg", title: "Набор для девушки 185", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 186, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/acb6b615-5006-410f-b031-1e506c99a958.jpg", title: "Набор для девушки 186", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 187, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/0530d4db-14af-4915-9d72-e93d95880543.jpg", title: "Набор для девушки 187", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 188, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/279d18f7-d004-4cfe-8aa4-5778fe348978.jpg", title: "Набор для девушки 188", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 189, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/dcb470df-25cb-4ac2-86ea-211c2724d249.jpg", title: "Набор для девушки 189", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 190, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ca0f67ea-ea96-4e32-afc0-9d10819d184a.jpg", title: "Набор для девушки 190", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 191, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/015c0400-37d6-449c-b866-4787f38b1937.jpg", title: "Набор для девушки 191", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 192, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5f1da220-90bf-4802-b318-b8ff0820abd1.jpg", title: "Набор для девушки 192", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 193, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/04881167-a323-4df9-b630-1aa9a5562384.jpg", title: "Набор для девушки 193", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 194, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6124ca95-1b52-4eb9-b4e7-ca27d7a6714b.jpg", title: "Набор для девушки 194", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 195, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d720437f-a193-4b1e-800b-be56031113e5.jpg", title: "Набор для девушки 195", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 196, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f2ab997c-111e-4e27-b4b6-62d80e8dcd3e.jpg", title: "Набор для девушки 196", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 197, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1db9ce67-ab76-4822-bfa2-30940743c934.jpg", title: "Набор для девушки 197", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 198, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e9d295cf-5760-4648-9359-f8486d64c396.jpg", title: "Набор для девушки 198", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 199, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/47bb0c39-4483-4235-9a65-1f2727c2c82b.jpg", title: "Набор для девушки 199", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 200, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2c56389b-d8de-47c1-b427-c22f2f020328.jpg", title: "Набор для девушки 200", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 201, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ca8070e0-b17c-46d6-96bb-c928ce141087.jpg", title: "Набор для девушки 201", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 202, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/32026cfc-70a5-4d97-b78d-cb523af000dc.jpg", title: "Набор для девушки 202", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 203, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d02c4901-1a8d-43c4-8c4f-ab84e9f66e77.jpg", title: "Набор для девушки 203", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 204, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/717a7d44-cce0-4c5c-a838-e7d8c651fec7.jpg", title: "Набор для девушки 204", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 205, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/83e8f542-fe2d-4265-bef2-ecee658777d8.jpg", title: "Набор для девушки 205", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 206, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c1d58852-9b46-4643-ab95-f512c5826fd6.jpg", title: "Набор для девушки 206", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 207, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/0193f3fc-30b5-4d30-89c6-387ba75f33a7.jpg", title: "Набор для девушки 207", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 208, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/241caa68-7fca-4279-aba1-4b7b671c3757.jpg", title: "Набор для девушки 208", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 209, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/19b1dced-bd70-495d-b681-b18a920eae8b.jpg", title: "Набор для девушки 209", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 210, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/481569ca-f8e3-46c2-a63f-b49b2f090eb3.jpg", title: "Набор для девушки 210", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 211, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e9c27870-0fd6-49cb-8ef6-65f08c40e32e.jpg", title: "Набор для девушки 211", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 212, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/54121dd3-d274-4f15-99d4-f8343778b596.jpg", title: "Набор для девушки 212", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 213, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d4a910c8-6b04-4220-8ee1-260b8320dea4.jpg", title: "Набор для девушки 213", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 214, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7cc82fba-9b86-493e-b72f-414254787f53.jpg", title: "Набор для девушки 214", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 215, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/be160c1b-61c4-48c4-a387-d456441933c5.jpg", title: "Набор для девушки 215", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 216, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e80a0769-a630-4cef-8f5e-9a709f6a7ec4.jpg", title: "Набор для девушки 216", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 217, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/cc2a6eab-8fce-45e2-a3a5-0e6380c602fd.jpg", title: "Набор для девушки 217", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 218, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f7c7cbbe-a9ed-42b1-9a3a-991199585351.jpg", title: "Набор для девушки 218", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 219, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8b534e51-c201-4b72-813e-394d0033f13b.jpg", title: "Набор для девушки 219", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 220, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4fec5d7d-3332-42d5-b622-5ac3b7b4cfea.jpg", title: "Набор для девушки 220", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 221, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/fcae3e9c-fb90-4723-90a5-fda5e52b821e.jpg", title: "Набор для девушки 221", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 222, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/745bea8c-956e-496d-822d-d3ffe7f497f2.jpg", title: "Набор для девушки 222", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 223, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c9085fbe-13bf-48a5-8099-9d027d44f24c.jpg", title: "Набор для девушки 223", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 224, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/729b3e37-cb49-43c7-b380-55387d89a02b.jpg", title: "Набор для девушки 224", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 225, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/05414896-8585-4018-b858-b6e2910e501f.jpg", title: "Набор для девушки 225", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 226, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/aa07d79e-772a-4cde-9d7b-3b5d0fda13c7.jpg", title: "Набор для девушки 226", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 227, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/55114a28-79f8-458d-8c9c-3c166ecf54dd.jpg", title: "Набор для девушки 227", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 228, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/41ee86ab-f91a-49ba-9931-48b1e0d39aa9.jpg", title: "Набор для девушки 228", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 229, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1bf477cf-1d02-4de5-b256-2d40d27738b5.jpg", title: "Набор для девушки 229", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 230, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/92d3ecbc-0b8a-4367-b0f1-9aa0e74b81ad.jpg", title: "Набор для девушки 230", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 231, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a30e9e06-f20e-4283-8172-dd294eb3f50f.jpg", title: "Набор для девушки 231", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 232, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/818e0dde-0686-4fa9-a784-ffc3f66fb301.jpg", title: "Набор для девушки 232", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 233, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b5a9ac27-c8ef-445c-bd82-b03e271d82d8.jpg", title: "Набор для девушки 233", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 234, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ca1f34f4-33d6-43d2-92bf-f1dc220eac74.jpg", title: "Набор для девушки 234", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 235, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3daec883-3781-400f-9801-b5ba9af8fddd.jpg", title: "Набор для девушки 235", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 236, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/afb31b93-0dce-4016-9cbb-70181e6a76d8.jpg", title: "Набор для девушки 236", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 237, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7e54d29f-9488-4c24-bf89-728ca9314cfa.jpg", title: "Набор для девушки 237", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 238, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/269c223f-5e1b-4a11-9dd2-3aca2e72cf01.jpg", title: "Набор для девушки 238", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 239, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/51bf200c-719e-4e82-903a-f1dea9886645.jpg", title: "Набор для девушки 239", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 240, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6270621c-0e2e-4247-a282-79c0018afe0c.jpg", title: "Набор для девушки 240", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 241, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e43cd062-4b9d-4512-a19f-f56770c88cdd.jpg", title: "Набор для девушки 241", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 242, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b19ea713-c192-40dd-a8be-e84c58626e0e.jpg", title: "Набор для девушки 242", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 243, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/fd1c9180-4dcf-4013-a281-20c9c96480df.jpg", title: "Набор для девушки 243", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 244, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a3cd4ece-fa6f-4500-a1e8-2446717aa7a1.jpg", title: "Набор для девушки 244", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 245, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/31111dd3-965c-40a4-8a61-94e18b0a5a02.jpg", title: "Набор для девушки 245", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 246, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5d9477a3-9ff3-4c32-a373-869a2506b573.jpg", title: "Набор для девушки 246", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 247, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e3b02fc0-ff7c-4b7c-b701-75b738353cff.jpg", title: "Набор для девушки 247", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 248, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5c9f746b-02f6-491f-ae1b-c24b3862bc82.jpg", title: "Набор для девушки 248", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 249, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5618af1b-033c-4451-9646-6b639cd91339.jpg", title: "Набор для девушки 249", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 250, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/279881cb-7a4a-4e72-81bf-e730a4b329e0.jpg", title: "Набор для девушки 250", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 251, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/65339669-27c6-49c5-8ac0-25230c44cacf.jpg", title: "Набор для девушки 251", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 252, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a1703ffa-3145-4027-a453-85e891c88a9d.jpg", title: "Набор для девушки 252", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 253, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a55b3d2b-dbff-4cb8-9234-90a2a71f20da.jpg", title: "Набор для девушки 253", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 254, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/0b4a6acc-584a-4455-9742-57cd845865a0.jpg", title: "Набор для девушки 254", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 255, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/005619a2-3d9c-4ee4-9142-864f3dd88856.jpg", title: "Набор для девушки 255", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 256, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/567ecf0d-f909-4992-b5bb-282027121a0c.jpg", title: "Набор для девушки 256", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 257, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/58f45ca7-3af9-44a6-943f-9b0cbe43fcee.jpg", title: "Набор для девушки 257", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 258, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/95539e51-e817-4357-bf8d-7a14423936f4.jpg", title: "Набор для девушки 258", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 259, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/aa9e98ff-5068-41aa-9070-007ec7eda96e.jpg", title: "Набор для девушки 259", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 260, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/35dc7b34-340c-4dd2-afb9-aac576e548f4.jpg", title: "Набор для девушки 260", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 261, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c31aab61-668c-4e09-8750-b7702e321edf.jpg", title: "Набор для девушки 261", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 262, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2a2c3713-f940-4bab-8a71-0d5c630ce963.jpg", title: "Набор для девушки 262", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 263, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4621b898-ba64-4fed-ad95-0b1f1605154b.jpg", title: "Набор для девушки 263", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 264, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/652dc60b-512d-4ff1-8a01-33c5c9dcec02.jpg", title: "Набор для девушки 264", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 265, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/35396cb9-b1b3-4173-9bd1-ffc93ee413ea.jpg", title: "Набор для девушки 265", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 266, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/88a28a5f-d02d-41e7-8c87-bf19438c44ff.jpg", title: "Набор для девушки 266", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 267, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/bddd62d8-be27-4677-aba7-a0aa56677fc1.jpg", title: "Набор для девушки 267", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 268, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/17f1546b-af0b-4224-896b-6a84c97f3645.jpg", title: "Набор для девушки 268", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 269, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e66ee61e-f31f-4f41-9205-341410eb1611.jpg", title: "Набор для девушки 269", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 270, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f1232ebc-89e4-4d0c-85fd-cddd73bf5bcb.jpg", title: "Набор для девушки 270", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 271, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7ae5c690-16d0-412a-bd6d-90259887a947.jpg", title: "Набор для девушки 271", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 272, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/22cad5f4-3a1e-4470-b0d3-aa1b8e1f1c2a.jpg", title: "Набор для девушки 272", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 273, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c513a4c9-c443-465c-895f-d8346604605a.jpg", title: "Набор для девушки 273", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 274, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5f81ebcd-efd2-46c2-9b7c-6d82585562d4.jpg", title: "Набор для девушки 274", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 275, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/031c37d7-3d8c-48da-80a0-caf0eff82ff9.jpg", title: "Набор для девушки 275", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 276, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7e7e2cf0-1c07-4a5c-869f-93f532ba3cb9.jpg", title: "Набор для девушки 276", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 277, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2b8d4cd1-e95c-4ddd-a506-73d83d3b5384.jpg", title: "Набор для девушки 277", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 278, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/38f5708c-b90a-4d79-a455-538c4df84eb1.jpg", title: "Набор для девушки 278", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 279, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d53eb61a-815d-4a9a-9b97-94d59259cd86.jpg", title: "Набор для девушки 279", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 280, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/11428f35-18a4-44c1-9f07-a42e922e16c3.jpg", title: "Набор для девушки 280", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 281, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5978a7d3-eda5-4b0b-a079-db82036fc2d9.jpg", title: "Набор для девушки 281", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 282, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a7cf1dbb-da68-4f60-9578-c2213230a407.jpg", title: "Набор для девушки 282", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 283, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f4b227cb-c1e0-4719-b8a5-5e1c96886d52.jpg", title: "Набор для девушки 283", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 284, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7bd1cab2-88b5-4361-8ad0-b2d3de557075.jpg", title: "Набор для девушки 284", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 285, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/031d0950-d059-42c0-9fd8-8e99f6e20121.jpg", title: "Набор для девушки 285", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 286, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a36043d1-3e30-4418-90c2-fe48e74869e2.jpg", title: "Набор для девушки 286", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 287, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/dacf7b83-f14a-47ac-a40c-253e18b6a92f.png", title: "Набор для девушки 287", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 288, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8c3324af-1e0b-416c-a4d1-fb26c1179dcc.jpg", title: "Набор для девушки 288", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 289, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f1d69972-9a31-4f82-8243-bcf05f064fcd.jpg", title: "Набор для девушки 289", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 290, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a76a24bb-73a3-4ace-b7d1-a16e346b4be0.jpg", title: "Набор для девушки 290", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 291, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8b84a13f-7934-4523-9cde-850eb610fdbf.jpg", title: "Набор для девушки 291", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 292, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8aa85743-9913-4bbc-98de-feb413746e3d.jpg", title: "Набор для девушки 292", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 293, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/0d36b720-c06e-49b0-98d9-1121e0f48d06.jpg", title: "Набор для девушки 293", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 294, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a8b8c354-505c-4186-a7e7-aba01fb6b897.jpg", title: "Набор для девушки 294", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 295, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c8aa325c-0ae6-4b71-a170-b743d6f59891.jpg", title: "Набор для девушки 295", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 296, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9b2773ed-b641-440e-bb84-be0913520b23.jpg", title: "Набор для девушки 296", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 297, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ac171be4-088f-407c-9e59-36748a0f0034.jpg", title: "Набор для девушки 297", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 298, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/dcad6c8f-23e5-4dfa-8de0-3aed4763e6c8.jpg", title: "Набор для девушки 298", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 299, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e377f6ea-bee7-446c-baa9-1d6e1d67d156.jpg", title: "Набор для девушки 299", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 300, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6ed10919-9c83-4512-b610-41a53c84de36.jpg", title: "Набор для девушки 300", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 301, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a393ad57-bca1-40f7-b5c7-dea946bbe633.jpg", title: "Набор для девушки 301", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 302, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/130f82fc-0833-413e-b9b6-08d7ff0dd41f.jpg", title: "Набор для девушки 302", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 303, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4cf8e71f-2e69-4c2a-affa-37a43132b13c.jpg", title: "Набор для девушки 303", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 304, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7a4ce191-9d5b-4d65-87e2-4b29fb4311f3.jpg", title: "Набор для девушки 304", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 305, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ac7910c4-71dd-4163-b5e9-b8c21f064ac0.jpg", title: "Набор для девушки 305", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 306, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c5dbfb99-2d55-4a28-9528-ac7a4fec5a4c.jpg", title: "Набор для девушки 306", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
  ],
  man: [
    { id: 1, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Набор для мужчины 1", description: "Синие, чёрные и серебряные шары — строго и стильно.", price: "1 690 ₽", priceNum: 1690, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 2, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Набор для мужчины 2", description: "Тёмно-синие шары с золотыми звёздами и фольгированными цифрами.", price: "2 290 ₽", priceNum: 2290, colors: ["blue", "gold"], subcategory: "man" },
    { id: 3, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Набор для мужчины 3", description: "Арка из синих и серебряных шаров — эффектная фотозона.", price: "3 200 ₽", priceNum: 3200, colors: ["blue", "silver"], subcategory: "man" },
    { id: 4, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Набор для мужчины 4", description: "Большая фольгированная цифра в синем и золотом цвете.", price: "990 ₽", priceNum: 990, colors: ["blue", "gold"], subcategory: "man" },
  ],
  boy: [
    { id: 1, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Набор для мальчика 1", description: "Яркие синие и красные шары с фольгированными звёздами.", price: "1 290 ₽", priceNum: 1290, colors: ["blue"], subcategory: "boy" },
    { id: 2, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Набор для мальчика 2", description: "Синие и серебряные шары с ракетами и звёздами.", price: "1 890 ₽", priceNum: 1890, colors: ["blue", "silver"], subcategory: "boy" },
    { id: 3, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Набор для мальчика 3", description: "Красно-синяя арка с машинками для юного гонщика.", price: "2 900 ₽", priceNum: 2900, colors: ["blue"], subcategory: "boy" },
    { id: 4, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Набор для мальчика 4", description: "Яркая цифра пять в синих и зелёных тонах.", price: "890 ₽", priceNum: 890, colors: ["blue", "green"], subcategory: "boy" },
    { id: 5, image: "https://cdn.poehali.dev/files/0f4a96e8-4afc-48fa-9ece-5be036b34b3e.jpg", title: "Набор для мальчика 5", description: "Фольгированная цифра — 1 шт., фольгированное сердце — 3 шт., фольгированная фигурка Космонавт — 1 шт.", price: "5 000 ₽", priceNum: 5000, colors: ["blue", "red", "gold"], subcategory: "boy" },
  ],
  "kid-girl": [
    { id: 1, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Набор для девочки 1", description: "Розовые, белые и сиреневые шары с единорогом.", price: "1 490 ₽", priceNum: 1490, colors: ["pink", "white", "purple"], subcategory: "kid-girl" },
    { id: 2, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Набор для девочки 2", description: "Нежная арка из лиловых и розовых шаров со звёздами.", price: "2 800 ₽", priceNum: 2800, colors: ["purple", "pink"], subcategory: "kid-girl" },
    { id: 3, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Набор для девочки 3", description: "Ярко-розовые шары с надписями и сердечками.", price: "1 690 ₽", priceNum: 1690, colors: ["pink"], subcategory: "kid-girl" },
    { id: 4, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Набор для девочки 4", description: "Розово-золотая цифра семь для маленькой принцессы.", price: "890 ₽", priceNum: 890, colors: ["pink", "gold"], subcategory: "kid-girl" },
  ],
  "bubbles-box": [
    { id: 1, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Баблс-бокс 1", description: "Прозрачные шары-пузыри с конфетти внутри, упакованные в коробку.", price: "1 990 ₽", priceNum: 1990, colors: ["pink", "white"], subcategory: "bubbles-box" },
    { id: 2, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Баблс-бокс 2", description: "Прозрачные шары с синим конфетти в стильной коробке.", price: "1 990 ₽", priceNum: 1990, colors: ["blue", "silver"], subcategory: "bubbles-box" },
  ],
  "surprise-box": [
    { id: 1, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Коробка-сюрприз 1", description: "Шары вылетают при открытии — незабываемый момент!", price: "1 890 ₽", priceNum: 1890, colors: ["pink", "gold"], subcategory: "surprise-box" },
    { id: 2, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Коробка-сюрприз 2", description: "Синие и серебряные шары вылетают из тёмной коробки.", price: "1 890 ₽", priceNum: 1890, colors: ["blue", "silver"], subcategory: "surprise-box" },
  ],
  "first-year": [
    { id: 1, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Набор «1 годик» 1", description: "Розовые шары с цифрой 1, звёздочками и конфетти.", price: "1 490 ₽", priceNum: 1490, colors: ["pink", "gold"], subcategory: "first-year" },
    { id: 2, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Набор «1 годик» 2", description: "Синие и белые шары с цифрой 1 и звёздочками.", price: "1 490 ₽", priceNum: 1490, colors: ["blue", "white"], subcategory: "first-year" },
  ],
  "ceiling": [
    { id: 1, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Шарики под потолок 1", description: "50 розовых и белых шаров, которые поднимутся к потолку.", price: "1 200 ₽", priceNum: 1200, colors: ["pink", "white"], subcategory: "ceiling" },
    { id: 2, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Шарики под потолок 2", description: "50 синих и серебряных шаров для мужской вечеринки.", price: "1 200 ₽", priceNum: 1200, colors: ["blue", "silver"], subcategory: "ceiling" },
  ],
  "numbers": [
    { id: 1, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Цифра 1", description: "Большая фольгированная цифра в розово-золотом оформлении.", price: "890 ₽", priceNum: 890, colors: ["pink", "gold"], subcategory: "numbers" },
    { id: 2, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Цифра 2", description: "Большая фольгированная цифра в синем и серебряном цвете.", price: "890 ₽", priceNum: 890, colors: ["blue", "silver"], subcategory: "numbers" },
    { id: 3, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Цифра 3", description: "Золотая фольгированная цифра — универсальный вариант.", price: "890 ₽", priceNum: 890, colors: ["gold"], subcategory: "numbers" },
  ],
  "cartoon": [
    { id: 1, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Фигурка 1", description: "Фольгированный единорог с розовыми и белыми шарами.", price: "1 390 ₽", priceNum: 1390, colors: ["pink", "purple", "white"], subcategory: "cartoon" },
    { id: 2, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Фигурка 2", description: "Зелёный фольгированный динозавр с яркими шарами.", price: "1 390 ₽", priceNum: 1390, colors: ["green"], subcategory: "cartoon" },
    { id: 3, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Фигурка 3", description: "Фольгированная принцесса с розовыми и золотыми шарами.", price: "1 390 ₽", priceNum: 1390, colors: ["pink", "gold"], subcategory: "cartoon" },
  ],
  discharge: [
    { id: 1, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/30158ce7-cc58-475e-9f95-85bc8e9f0376.jpg", title: "Набор для выписки мальчика 1", description: "Нежно-голубые и белые шары с надписью «Это мальчик!».", price: "2 490 ₽", priceNum: 2490, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 2, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/30158ce7-cc58-475e-9f95-85bc8e9f0376.jpg", title: "Набор для выписки мальчика 2", description: "Синие и белые шары со звёздами.", price: "1 990 ₽", priceNum: 1990, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 3, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/30158ce7-cc58-475e-9f95-85bc8e9f0376.jpg", title: "Набор для выписки мальчика 3", description: "Голубая арка из шаров у входа роддома.", price: "4 500 ₽", priceNum: 4500, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 97, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/22d1e846-f3ed-4233-add8-b04c4757b1d6.png", title: "Набор для выписки мальчика 4", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 98, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b5beb1b2-88f2-4ca4-92d4-d597512dbd8a.png", title: "Набор для выписки мальчика 5", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 99, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/58820ce5-b53c-4276-afeb-c386a1b9b2d6.jpg", title: "Набор для выписки мальчика 6", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 100, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/dfc9fe95-e310-4faa-8a4e-1bb332738e61.jpg", title: "Набор для выписки мальчика 7", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 101, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ece3fd12-e55f-4dfe-94f0-bb31794dbbc4.jpg", title: "Набор для выписки мальчика 8", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 102, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ee175644-fafe-4798-8f1a-1f97bdbdc1b4.jpg", title: "Набор для выписки мальчика 9", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 103, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7fc72bdf-2e3e-4900-89e5-5bd6ca5a1be5.jpg", title: "Набор для выписки мальчика 10", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 104, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ed302ca2-1e7c-459b-97e0-4585bbf4354a.jpg", title: "Набор для выписки мальчика 11", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 105, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2650e83e-ea36-4674-a0ee-53a5f4cee768.jpg", title: "Набор для выписки мальчика 12", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 106, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ca897952-7165-4d8c-b1ec-2e6b9f701137.jpg", title: "Набор для выписки мальчика 13", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 107, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8d39d620-0450-49ce-9dbc-310003050399.jpg", title: "Набор для выписки мальчика 14", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 108, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/51ddc1c0-6bd6-4712-a375-5f9a9bf57b94.jpg", title: "Набор для выписки мальчика 15", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 109, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/075abab0-8158-4f10-8670-c5db608dc7b2.jpg", title: "Набор для выписки мальчика 16", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 110, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8a49c6ed-af7b-4ac7-85c1-aea04b3c3077.jpg", title: "Набор для выписки мальчика 17", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 111, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f49f3a0b-a190-412e-b59d-fa294ba1d0a6.jpg", title: "Набор для выписки мальчика 18", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 112, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d062cc02-de2d-42d7-8caa-e69d8582867a.jpg", title: "Набор для выписки мальчика 19", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 113, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/279dc0b6-de30-44d6-bfda-174e936b4022.jpg", title: "Набор для выписки мальчика 20", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 114, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2ea1b033-6cf2-4ec9-99ed-35a82e65fc51.jpg", title: "Набор для выписки мальчика 21", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 115, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/481c3c6b-6fe4-4dc7-9455-7313e7ec8754.jpg", title: "Набор для выписки мальчика 22", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 116, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5c413d1d-80a1-4914-a420-ca5f82ad77e2.jpg", title: "Набор для выписки мальчика 23", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 117, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/208b7c38-7825-47a9-a3ac-321dbc71ca98.jpg", title: "Набор для выписки мальчика 24", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 118, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/194b1b17-e1cf-4e6b-b08b-fa61065bc301.jpg", title: "Набор для выписки мальчика 25", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 119, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8600d3f4-fdf6-482c-9c71-981d0baecec1.jpg", title: "Набор для выписки мальчика 26", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 120, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3bb461c3-1204-4799-abb2-c501a295e9c4.jpg", title: "Набор для выписки мальчика 27", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 121, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9d19784c-bb5f-485e-b801-a2415557b3bd.jpg", title: "Набор для выписки мальчика 28", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 122, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/33463dfe-a9df-436e-a181-5584b2f02192.jpg", title: "Набор для выписки мальчика 29", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 123, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/fd6e0df7-427c-4ee3-aac6-eb07b5caa120.jpg", title: "Набор для выписки мальчика 30", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 124, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4cc06dd5-007e-4703-b5db-9f215b79682b.jpg", title: "Набор для выписки мальчика 31", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 125, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1b28a22e-7b8e-4d61-a21f-15d0cd8ecd0d.jpg", title: "Набор для выписки мальчика 32", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 126, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e5f502d9-82c9-4410-ad3f-100e19ceb3b7.jpg", title: "Набор для выписки мальчика 33", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 127, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5503bf78-0ef2-4cdc-afa5-37d901f3daad.jpg", title: "Набор для выписки мальчика 34", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 128, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4ff5e510-dd3d-49a4-8e5a-9aca79d5e2da.jpg", title: "Набор для выписки мальчика 35", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 129, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/451b0373-17d1-40ff-8be4-8a159d851b20.jpg", title: "Набор для выписки мальчика 36", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 130, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1cd2091a-613c-4c8b-b83e-dff4f24905b0.jpg", title: "Набор для выписки мальчика 37", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 131, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/750b6f34-6062-41cc-abc2-33d23b8d2e1e.jpg", title: "Набор для выписки мальчика 38", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 132, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/261dbe1f-160b-4f82-9b39-728b54000051.jpg", title: "Набор для выписки мальчика 39", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 133, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4679bc67-e45d-48e1-b873-99fd17e5ce10.jpg", title: "Набор для выписки мальчика 40", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 134, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/03f7f746-2c55-4492-abe0-3c09dfc012aa.jpg", title: "Набор для выписки мальчика 41", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 135, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3b97fb8a-248a-441c-9548-03ee8059d168.jpg", title: "Набор для выписки мальчика 42", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 136, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/115839c1-2735-4aea-8a18-aea09e9d850f.jpg", title: "Набор для выписки мальчика 43", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 137, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/87dcdbed-eac4-44d7-9f51-efd510b5d42f.jpg", title: "Набор для выписки мальчика 44", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 138, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e86dc762-dea5-4201-8aef-7b23ed788a30.jpg", title: "Набор для выписки мальчика 45", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 139, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d89156e3-70a9-4f62-9179-54c0506cef96.jpg", title: "Набор для выписки мальчика 46", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 140, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5b80b4a9-6499-453c-bb02-16f2c1cbeb73.jpg", title: "Набор для выписки мальчика 47", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 141, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/fdd93c3b-5661-46df-936f-83335bbc0c63.jpg", title: "Набор для выписки мальчика 48", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 142, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d2d35ec7-35b7-4902-96cf-0d0752588218.jpg", title: "Набор для выписки мальчика 49", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 143, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/127ab112-489f-4948-8d0d-2acf4c3cc59f.jpg", title: "Набор для выписки мальчика 50", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 144, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d0fb62b3-810b-4990-b292-be8adc633a5f.jpg", title: "Набор для выписки мальчика 51", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 145, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e549dd72-ca9b-4a9d-9ac8-6adcd30f3944.jpg", title: "Набор для выписки мальчика 52", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 146, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5ce982e3-27d9-4eb7-9fc0-34e1e7808aec.jpg", title: "Набор для выписки мальчика 53", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 147, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b7d33434-b251-49cf-9835-cbc9175c1c8c.jpg", title: "Набор для выписки мальчика 54", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 148, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/bedbd40d-6f0e-4545-a4f5-3938553e6227.jpg", title: "Набор для выписки мальчика 55", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 149, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/bf152849-a903-4864-9a53-f825399b79b3.jpg", title: "Набор для выписки мальчика 56", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 150, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d073a588-a213-4801-bee1-8a2510d1d4ef.jpg", title: "Набор для выписки мальчика 57", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 151, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c6cf505a-bf96-4921-a87c-e04174ae2bea.jpg", title: "Набор для выписки мальчика 58", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 152, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1803848f-b842-4630-9438-98d0b0327711.jpg", title: "Набор для выписки мальчика 59", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 153, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/75f3da1c-2862-465c-8c0f-8d9dd9ac7d45.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 154, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3479a773-87ee-460c-ad09-c6f1da7ad6ff.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 155, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c8a3e69e-9ac7-42fd-a94c-6b068bb0376a.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 156, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/96a75ce2-92b0-4e0a-9e74-590435654cb8.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 157, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8a67b095-9060-4ebc-8881-2bf647a545b6.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 158, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/db3ffbcc-a8b9-4934-8590-81e9c3dc329e.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 159, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/291b68b2-ea1c-4311-b0be-7bbbb2fa1e81.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 160, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6afa34fa-a1a0-4cdc-8d14-da6dde0f8157.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 161, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9939a47a-5991-4690-b1ba-d8c47f0881e2.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 162, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d88a74c0-2275-40f6-9f7a-73f08b89df32.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 163, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7f68efaa-ce3d-4cba-acb7-9f349558a967.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 164, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5036ccb1-c544-4063-a2e6-1496b21a0f84.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 165, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c2c4d806-36a3-4526-83fc-4f56b74b3c5d.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 166, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7e4ad5b8-08b8-49e0-846f-882b0e985a61.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 167, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/cd6e0276-ea29-419e-b254-80afaa0ef113.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 168, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1d61e094-ff22-4296-b746-c21660628212.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 169, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f50e91f5-5472-4adf-8aa2-bcba95fbc669.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 170, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/74c3299c-9531-461f-b64d-e0c19bdc00cb.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 171, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/842a6460-d69c-468c-805e-0ab4cebd80b5.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 172, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/df879017-a0e8-40f6-97ed-ef2db2c84576.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 173, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/df6206b7-00ac-41a1-859a-c7c631d7f687.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 174, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c66ca0cb-8e7b-42bf-a77b-729c62b0aa7b.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 175, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ce3711da-978d-4995-9009-0992d6fad825.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 176, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6d567cde-4987-420d-9b74-59ba336cd4ee.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 177, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9ccfba41-915e-4559-8d93-17a4568294c0.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 178, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a5164bb2-e313-4165-9f39-80234a3d8094.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 179, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/632b73b3-6643-4482-b64b-196d1d1e8e6a.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 180, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c82e7e39-2f8a-4d69-a142-6d96b23a8eea.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 181, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/44da5459-8c34-401f-9b64-d491e16bc501.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 182, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/55717254-6c7c-42f4-bcb9-4516d3b84821.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 183, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d869dd81-29b6-4cc3-8b67-88707872fed9.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 184, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/de5fe1af-4666-452d-9085-93f524d336b9.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 185, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7ad445ed-1247-4d09-8f22-15b31e684fdb.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 186, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2eec981e-590e-4669-90e6-45ffe0427388.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 187, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7affcc73-8650-4e4d-9bbd-7d2739b10eb9.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 188, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8d3857b7-0933-4cae-99e7-af7bdbe92bb3.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 189, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a2e0c2d9-9b36-4974-92d6-0f371d45f55e.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 190, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/90dd1936-6e9a-4cb8-a475-ba9cfcc04832.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 191, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1d0f0d7e-f43d-4afc-9ccd-e50916b3129a.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 192, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/26cc50e0-bf97-41f9-ba17-9e40035cc11e.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 193, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/59b9c28e-75fa-4df9-ab9b-23f315cc9e60.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 194, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6f5fdf9d-77d7-4d40-92aa-72878d79ee52.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 195, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f88c192d-42f7-4c92-a7c8-ebfb6ae6026e.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 196, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/91055f5d-2de8-464e-a55c-532eb1f790c8.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 197, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/537f75ad-9a25-4488-b426-e4d42e899261.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 198, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a2e0fd6c-7dac-4d27-b04e-64c5792644c0.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 199, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/eb0c4cee-9172-4b9a-b84c-5229181c7a31.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 200, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a5681565-bc46-4dc5-8f1f-e435c0902c55.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 201, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d4a03f16-0790-49b8-aa70-ae115927a59c.jpg", title: "Выписка мальчик", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
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
    { id: 54, image: "https://cdn.poehali.dev/files/d18846ce-7044-4039-ae54-b4e4f1fadb39.jpg", title: "Два сердца с облаком и золотом", description: "Два сердца с метриками и надписью «Добро пожаловать в мир», большое облако с ресничками и золотые шары.", price: "Цена по запросу", priceNum: 0, colors: ["white", "gold"], subcategory: "girl-discharge" },
    { id: 55, image: "https://cdn.poehali.dev/files/0331fb37-ede0-43cb-a37c-4e845f4586a4.jpg", title: "Луна с мишкой и облаком", description: "Большая луна с мишкой, облако с ресничками, сердце с именем и нежно-розовые конфетти-шары.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "beige"], subcategory: "girl-discharge" },
    { id: 56, image: "https://cdn.poehali.dev/files/a6c92aeb-f857-4d94-9a9c-dac8aee8cc12.jpg", title: "Розовый шар с бантиками", description: "Большой розово-пудровый шар с именем, датой и бантиками, рядом букет из пудровых, белых и золотых шаров.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "gold", "white"], subcategory: "girl-discharge" },
    { id: 57, image: "https://cdn.poehali.dev/files/4cea9087-7379-471c-9c44-19fcccb1c6e8.jpg", title: "Мишка с баблсом и метриками", description: "Большой мишка с бантиком, баблс с метриками и шар с надписью «Добро пожаловать домой» — нежная кремовая композиция.", price: "Цена по запросу", priceNum: 0, colors: ["beige", "pink", "white"], subcategory: "girl-discharge" },
    { id: 58, image: "https://cdn.poehali.dev/files/be462c6c-10c8-4639-98ec-85e6c2801c94.jpg", title: "Бант и баблс с надписью", description: "Большой пудровый бант, баблс «Добро пожаловать домой, мои любимые девочки» и облако с ресничками.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "silver"], subcategory: "girl-discharge" },
    { id: 59, image: "https://cdn.poehali.dev/files/62581137-2c15-4eba-9f35-242095b6dce8.jpg", title: "Коляска Welcome Home", description: "Нежная коляска с мишкой, сердце «Welcome Home» и букет из мятных, золотых и розовых шаров «Oh Baby».", price: "Цена по запросу", priceNum: 0, colors: ["pink", "gold", "green"], subcategory: "girl-discharge" },
    { id: 60, image: "https://cdn.poehali.dev/files/3414be80-884e-4210-93cd-bd1bfaa5ee36.jpg", title: "Баблс с луной", description: "Прозрачный баблс с надписью «Девочки, добро пожаловать домой» и большая луна с ресничками.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 61, image: "https://cdn.poehali.dev/files/b2dd6ba7-1ab6-4a8d-b5b6-7b05574527b1.jpg", title: "Белый шар с метриками и облаком", description: "Большой белый шар с именем и метриками, облако с ресничками и белые конфетти-шары — лаконичная нежная композиция.", price: "Цена по запросу", priceNum: 0, colors: ["white"], subcategory: "girl-discharge" },
    { id: 62, image: "https://cdn.poehali.dev/files/8c791420-3e20-455e-8212-f8e354e97197.jpg", title: "Баблс с метриками и сердцами", description: "Большой белый баблс с метриками, два сердца «Добро пожаловать домой» и «От души», розово-белые конфетти-шары.", price: "Цена по запросу", priceNum: 0, colors: ["white", "pink"], subcategory: "girl-discharge" },
    { id: 63, image: "https://cdn.poehali.dev/files/f533125a-2a8d-4dff-acb2-4588dd8e4b50.jpg", title: "Утёнок с сердцем", description: "Большой фольгированный утёнок, сердце с именем и датой и букет белых жемчужных шаров.", price: "Цена по запросу", priceNum: 0, colors: ["white"], subcategory: "girl-discharge" },
    { id: 64, image: "https://cdn.poehali.dev/files/b7128b66-0582-47ff-8fa6-3eb4545e13a4.jpg", title: "Шар «Спасибо за доченьку» с луной", description: "Розовый шар «Любимая, спасибо за доченьку», луна с мишкой и букет из розовых, голубых и серебристых сердец.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "silver"], subcategory: "girl-discharge" },
    { id: 65, image: "https://cdn.poehali.dev/files/31edc3c7-348b-4201-83b7-90e78013e9c2.jpg", title: "Баблс с облаком и золотом", description: "Прозрачный баблс с метриками и облако с ресничками, рядом букет из мятных, кремовых шаров и золотое сердце.", price: "Цена по запросу", priceNum: 0, colors: ["beige", "gold", "green"], subcategory: "girl-discharge" },
    { id: 66, image: "https://cdn.poehali.dev/files/5a7e2b7b-f670-4522-a538-22f8d5ab3ea5.jpg", title: "Баблс «Добро пожаловать в семью»", description: "Большой белый баблс с именем, датой и розовыми бантиками среди жемчужных и прозрачных конфетти-шаров.", price: "Цена по запросу", priceNum: 0, colors: ["white", "pink"], subcategory: "girl-discharge" },
    { id: 67, image: "https://cdn.poehali.dev/files/e076435d-b8fd-4e91-9fb7-5f92b1fdb04f.jpg", title: "Шар «Дочка, добро пожаловать» с облаком", description: "Белый шар с надписью «Дочка, добро пожаловать в семью» и розовыми бантиками, облако с ресничками и розовые сердца.", price: "Цена по запросу", priceNum: 0, colors: ["white", "pink"], subcategory: "girl-discharge" },
    { id: 68, image: "https://cdn.poehali.dev/files/ca8246d0-ed9f-496c-9e20-0caa278fdebb.jpg", title: "Единорог с баблсом и сердцем", description: "Большой единорог, кремовый баблс с метриками, розовое сердце и конфетти-шары.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "beige", "white"], subcategory: "girl-discharge" },
    { id: 69, image: "https://cdn.poehali.dev/files/b083acf7-cf61-4a82-8f8b-03539eb41bd4.jpg", title: "Луна с мишкой и метриками", description: "Кремовый шар с метриками, луна с мишкой и букет из розовых, кремовых и лиловых хромированных шаров.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "beige"], subcategory: "girl-discharge" },
    { id: 70, image: "https://cdn.poehali.dev/files/521f8fb5-802a-417f-9c8c-ca74b76a6500.jpg", title: "Баблс с бантом и конфетти", description: "Розовый баблс с метриками и фольгированный бант, рядом букет из кремовых и конфетти-шаров с бантиками.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "beige"], subcategory: "girl-discharge" },
    { id: 71, image: "https://cdn.poehali.dev/files/12ffb319-8460-406c-abf9-ad107a4576f6.jpg", title: "Баблс с метриками и два букета", description: "Большой баблс с именем и метриками в центре, два букета из розовых, белых и конфетти-шаров с бантиками.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 72, image: "https://cdn.poehali.dev/files/08de93ed-6820-4aed-8e69-401a7bff1274.jpg", title: "Сердце «Принцесса» и динозаврик", description: "Большое розовое сердце «Принцесса, добро пожаловать домой», динозаврик с короной и сердце с метриками.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "beige"], subcategory: "girl-discharge" },
    { id: 73, image: "https://cdn.poehali.dev/files/2d42935d-c460-4473-8ee7-2e7c2e94ec33.jpg", title: "Баблс «Мои любимые девочки»", description: "Большой розовый баблс с надписью «Добро пожаловать домой, мои любимые девочки» и букет из золотисто-розовых хромированных шаров.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "gold"], subcategory: "girl-discharge" },
    { id: 74, image: "https://cdn.poehali.dev/files/8dcd66b3-e6c1-4710-81d6-1e4917623897.jpg", title: "Кремовый баблс с жемчугом", description: "Кремовый баблс с именем и метриками в жемчужных бусинах и букет прозрачных конфетти-шаров.", price: "Цена по запросу", priceNum: 0, colors: ["beige", "white"], subcategory: "girl-discharge" },
    { id: 75, image: "https://cdn.poehali.dev/files/a38686d1-5f06-4935-b554-9200b3495381.jpg", title: "Сердце с метриками и зайка", description: "Розовое сердце с именем и метриками, большой зайка и букет из розовых, серебристых сердец и белых шаров.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "silver"], subcategory: "girl-discharge" },
    { id: 76, image: "https://cdn.poehali.dev/files/31eadf75-0efd-48a0-82f8-01980bdddd0d.jpg", title: "Кошечка с баблсом и луной", description: "Розовая кошечка с короной, баблс с метриками, звёзды с датой, луна и облако с ресничками — золотая тематика.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "gold"], subcategory: "girl-discharge" },
    { id: 77, image: "https://cdn.poehali.dev/files/1400333e-8c66-4880-9b11-5293c5dcc12a.jpg", title: "Облака, банты и баблсы", description: "Пудровые банты, белые облака с ресничками, баблс «Добро пожаловать домой, доченька» и баблс «Спасибо за дочь».", price: "Цена по запросу", priceNum: 0, colors: ["beige", "white"], subcategory: "girl-discharge" },
    { id: 78, image: "https://cdn.poehali.dev/files/1a68793a-7aa6-4b01-8911-d8bd66087ae1.jpg", title: "Ярко-розовый баблс «Доченька»", description: "Большой ярко-розовый баблс с надписью «Добро пожаловать домой, доченька» и букет из розовых и серых шаров.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "girl-discharge" },
    { id: 79, image: "https://cdn.poehali.dev/files/ea6199fe-851d-4803-8631-8bdc92d1b176.jpg", title: "Аист с баблсом «Мои любимые»", description: "Большой аист с малышкой, белый баблс с надписью «Мои любимые» и букет из кремовых и белых шаров.", price: "Цена по запросу", priceNum: 0, colors: ["white", "beige", "gold"], subcategory: "girl-discharge" },
    { id: 80, image: "https://cdn.poehali.dev/files/6daae88e-b877-4ceb-88e4-faf16b4e209f.jpg", title: "Баблс с малышкой на облаке", description: "Белый баблс с метриками и розовыми бантиками, шар-малышка на облаке и букет нежно-розовых шаров.", price: "Цена по запросу", priceNum: 0, colors: ["white", "pink"], subcategory: "girl-discharge" },
    { id: 81, image: "https://cdn.poehali.dev/files/e663cd30-31f2-4549-b9a3-6dd9b6d45d0a.jpg", title: "Голубой баблс с именем", description: "Большой голубой баблс с именем, голубые звёзды и розово-голубые шары — нежная пастельная композиция.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "pink"], subcategory: "girl-discharge" },
    { id: 82, image: "https://cdn.poehali.dev/files/e995b2e6-3456-48bd-97bd-e216ad6aa5f7.jpg", title: "Баблс с бабочками", description: "Белый баблс «Доченька, добро пожаловать домой» с бабочками, облако с ресничками и серебряные конфетти-шары.", price: "Цена по запросу", priceNum: 0, colors: ["white", "silver"], subcategory: "girl-discharge" },
    { id: 83, image: "https://cdn.poehali.dev/files/07f7e956-656c-4576-b742-39fb1dc80039.jpg", title: "Единорог с баблсом и сердцем", description: "Большой единорог, кремовый баблс с метриками и бабочками, розовое сердце и конфетти-шары.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "beige", "white"], subcategory: "girl-discharge" },
    { id: 84, image: "https://cdn.poehali.dev/files/350d61f4-7c4c-4525-9546-4c28f272922d.jpg", title: "Аист с баблсом «Мои любимые»", description: "Золотой аист, белый баблс «Мои любимые» и два букета из белых, кремовых и розовых шаров.", price: "Цена по запросу", priceNum: 0, colors: ["white", "beige", "gold"], subcategory: "girl-discharge" },
    { id: 85, image: "https://cdn.poehali.dev/files/713006ee-24ee-4275-b15f-48f91d025d74.jpg", title: "Луна с мишкой и облаком", description: "Большая луна с мишкой, белое облако с золотыми ресничками и розовые сердца — нежная пастельная композиция.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 86, image: "https://cdn.poehali.dev/files/1df5689a-5fc0-404f-983b-72d900f88f53.jpg", title: "Два баблса с облаком", description: "Баблс «Добро пожаловать домой» с перьями, баблс с метриками и розовыми бантиками, облако с ресничками.", price: "Цена по запросу", priceNum: 0, colors: ["white", "pink"], subcategory: "girl-discharge" },
    { id: 87, image: "https://cdn.poehali.dev/files/d6ba091f-7ed0-4dee-9501-a741b05781cd.jpg", title: "Баблс «Добро пожаловать домой»", description: "Розовый баблс «Добро пожаловать домой» с облаком и нежными кремово-розовыми шарами.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "beige"], subcategory: "girl-discharge" },
    { id: 88, image: "https://cdn.poehali.dev/files/01461be4-4604-4eb9-acb6-56723fdf47a2.jpg", title: "Баблс с метриками и бантиками", description: "Белый баблс с именем, метриками и розовыми бантиками, два букета из нежно-розовых и белых шаров.", price: "Цена по запросу", priceNum: 0, colors: ["white", "pink"], subcategory: "girl-discharge" },
    { id: 89, image: "https://cdn.poehali.dev/files/fe6fbf6f-90f3-409f-95e8-556df6f46ae1.jpg", title: "Розовый баблс с жемчугом", description: "Розовый баблс с именем и жемчужными бусинами, конфетти-шары с жемчугом и розовые шары рядом.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 90, image: "https://cdn.poehali.dev/files/af7b2b30-e0fe-4df8-a4f7-ab22274244b5.jpg", title: "Луна с мишкой и мятный мишка", description: "Луна с мишкой, мятный мишка с бантиком, розовый баблс с метриками и букет розово-кремовых шаров.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "beige"], subcategory: "girl-discharge" },
    { id: 91, image: "https://cdn.poehali.dev/files/7611fadb-6388-4c75-b45c-a1f30cd5f053.jpg", title: "Коляска с баблсом «Нежность»", description: "Нежная коляска с бабочками, белый баблс со стихом «Это моя нежность» и букеты из розовых, жемчужных шаров.", price: "Цена по запросу", priceNum: 0, colors: ["white", "pink", "gold"], subcategory: "girl-discharge" },
    { id: 92, image: "https://cdn.poehali.dev/files/e48837c4-6148-43cd-9590-6eab7a64d1c8.jpg", title: "Баблс с бабочками и облаком", description: "Розовый баблс с метриками и бабочками, облако с ресничками и сердце «Мы тебя очень ждали».", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 93, image: "https://cdn.poehali.dev/files/9babdccb-a2e9-4cfd-b6a9-d5e9a188f816.jpg", title: "Баблс с именем, звёзды и луна", description: "Прозрачный баблс с именем, серебряные звёзды с метриками, большая луна и облако с ресничками.", price: "Цена по запросу", priceNum: 0, colors: ["silver", "pink", "white"], subcategory: "girl-discharge" },
    { id: 94, image: "https://cdn.poehali.dev/files/815a48c5-0d26-4dba-b3ba-73dc9d3f9fbe.jpg", title: "Единорог с баблсом и сердцами", description: "Большой единорог, розовый баблс с метриками, сердца «Доченька, ждали» и «Любимая, спасибо за дочь».", price: "Цена по запросу", priceNum: 0, colors: ["pink", "beige", "white"], subcategory: "girl-discharge" },
    { id: 95, image: "https://cdn.poehali.dev/files/fe39600c-7ea2-471b-b239-ef607a61de6c.jpg", title: "Облако и сердце с поздравлением", description: "Серое облако с ресничками, серебряное сердце «Поздравляю с рождением доченьки» и белые шары.", price: "Цена по запросу", priceNum: 0, colors: ["white", "silver"], subcategory: "girl-discharge" },
    { id: 96, image: "https://cdn.poehali.dev/files/d3e24706-bf4c-428b-a1e8-26a3ba55c129.jpg", title: "Баблс «Мои любимые девочки»", description: "Прозрачный баблс с жемчугом и надписью «Добро пожаловать домой, мои любимые девочки» и жемчужные шары.", price: "Цена по запросу", priceNum: 0, colors: ["white"], subcategory: "girl-discharge" },
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