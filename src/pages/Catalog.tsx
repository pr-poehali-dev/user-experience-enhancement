import { useState, useEffect, useRef } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import Icon from "@/components/ui/icon"

const birthdaySubcategories = [
  { id: "girl", label: "Для девушки", emoji: "🌹", color: "from-pink-400 to-rose-500", main: true },
  { id: "man", label: "Для мужчины", emoji: "🎩", color: "from-blue-500 to-blue-700", main: true },
  { id: "kid-girl", label: "Для девочки", emoji: "🎀", color: "from-purple-400 to-pink-500", main: true },
  { id: "boy", label: "Для мальчика", emoji: "🚀", color: "from-cyan-400 to-blue-500", main: true },
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
  contain?: boolean
}

const COLOR_OPTIONS = [
  { id: "gold", label: "Золотые", hex: "#d4a017" },
  { id: "blue", label: "Синие", hex: "#60a5fa" },
  { id: "beige", label: "Коричневые", hex: "#a0785a" },
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
]

const compositions: Record<string, Composition[]> = {
  girl: [
    { id: 7, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9c99662e-bef5-4504-a623-e3bdc9ab36a3.jpg", title: "Набор для девушки 7", description: "Баблс шар стеклянный 60см с надписью и конфетти (1шт), латексные шары хром серебро (2шт), латексные шары пастель розовые (2шт), латексные шары дабл-стафф розовые с конфетти (2шт), латексные шары конфетти прозрачные (2шт), фольгированный круг серебро 46см (1шт).", price: "4 230 ₽", priceNum: 4230, colors: ["pink", "silver"], subcategory: "girl" },
    { id: 8, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c4801d79-dc90-4d7f-8763-42f85ecd49bf.jpg", title: "Набор для девушки 8", description: "Красивая композиция из шаров на день рождения.", price: "4 400 ₽", priceNum: 4400, colors: ["rosegold", "pink"], subcategory: "girl" },
    { id: 9, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3fd83284-b2ec-45ff-bd42-c6eb2cd87246.jpg", title: "Набор для девушки 9", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 10, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6b5ed6c2-adbc-46f4-a8da-7c50eab42f8e.jpg", title: "Набор для девушки 10", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 11, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d05c932b-4339-475e-8233-c9868e8a2a6c.jpg", title: "Набор для девушки 11", description: "Красивая композиция из шаров на день рождения.", price: "2 840 ₽", priceNum: 2840, colors: ["cream", "white"], subcategory: "girl" },
    { id: 12, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/62cb939f-05f5-4e41-89b6-3504437129e0.jpg", title: "Набор для девушки 12", description: "Красивая композиция из шаров на день рождения.", price: "3 940 ₽", priceNum: 3940, colors: ["purple", "black"], subcategory: "girl" },
    { id: 13, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/dfe2ab59-e17a-44cf-800f-d64f8af0c606.jpg", title: "Набор для девушки 13", description: "Красивая композиция из шаров на день рождения.", price: "4 250 ₽", priceNum: 4250, colors: ["cream", "white"], subcategory: "girl" },
    { id: 14, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/23a9c8fe-ef93-423b-8aca-7b5c0aebb6a1.jpg", title: "Набор для девушки 14", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 15, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8f7c075c-87bf-476f-a6b8-629984c74a4a.jpg", title: "Набор для девушки 15", description: "Красивая композиция из шаров на день рождения.", price: "3 740 ₽", priceNum: 3740, colors: ["red", "rosegold"], subcategory: "girl" },
    { id: 16, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/93df0c07-b260-4461-a39b-5d354e8dbe46.jpg", title: "Набор для девушки 16", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 17, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b7548198-01e7-43b0-8a91-6c3e89cba0e7.jpg", title: "Набор для девушки 17", description: "Красивая композиция из шаров на день рождения.", price: "2 650 ₽", priceNum: 2650, colors: ["pink", "silver"], subcategory: "girl" },
    { id: 18, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7dea4e39-4bb6-4cf1-bfc1-bcd0f538dff5.jpg", title: "Набор для девушки 18", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 19, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e3b65741-a214-43ca-9d2b-159691cc559f.jpg", title: "Набор для девушки 19", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 20, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/45c49962-4e56-453b-8e46-8e58bdaa0df7.jpg", title: "Набор для девушки 20", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 21, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4e259000-cb7c-4a7a-96cf-84db21d7c173.jpg", title: "Набор для девушки 21", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 22, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5a6e8d5a-123f-4f46-8939-6c8d46966694.jpg", title: "Набор для девушки 22", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },

    { id: 24, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/012dd622-6519-4e27-8e05-637e4d890e63.jpg", title: "Набор для девушки 24", description: "Красивая композиция из шаров на день рождения.", price: "2 770 ₽", priceNum: 2770, colors: ["cream"], subcategory: "girl" },
    { id: 25, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/93f9a47f-87dd-45ca-b2f8-efe34a12b90a.jpg", title: "Набор для девушки 25", description: "Красивая композиция из шаров на день рождения.", price: "2 490 ₽", priceNum: 2490, colors: ["cream", "white"], subcategory: "girl" },
    { id: 26, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/fabfefbf-0ba4-4e9f-96ba-0a58962290d2.jpg", title: "Набор для девушки 26", description: "Красивая композиция из шаров на день рождения.", price: "3 150 ₽", priceNum: 3150, colors: ["purple", "cream"], subcategory: "girl" },
    { id: 27, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a580c851-e92b-453d-983d-e7eb3730e151.jpg", title: "Набор для девушки 27", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 28, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a7ffd129-bde5-4044-adf6-4b3eb24767d4.jpg", title: "Набор для девушки 28", description: "Красивая композиция из шаров на день рождения.", price: "4 300 ₽", priceNum: 4300, colors: ["silver", "red", "white"], subcategory: "girl" },
    { id: 29, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/167428bf-abd9-47cf-beb2-81d73c575918.jpg", title: "Набор для девушки 29", description: "Красивая композиция из шаров на день рождения.", price: "3 720 ₽", priceNum: 3720, colors: ["pink"], subcategory: "girl" },
    { id: 30, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b1579e94-8c3e-41db-a1ec-d53154641fac.jpg", title: "Набор для девушки 30", description: "Красивая композиция из шаров на день рождения.", price: "3 100 ₽", priceNum: 3100, colors: ["black", "white"], subcategory: "girl" },
    { id: 31, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6205583c-75c6-4cae-9a4d-d04f7e91dd4f.jpg", title: "Набор для девушки 31", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 32, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1b07f684-e67b-4010-afb7-dcc1a8861409.jpg", title: "Набор для девушки 32", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 33, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/282275b1-a6ca-4cdb-a51d-12dd3486c0fd.jpg", title: "Набор для девушки 33", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 34, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e139275c-2782-411f-97e2-a6b7261fe674.jpg", title: "Набор для девушки 34", description: "Красивая композиция из шаров на день рождения.", price: "7 200 ₽", priceNum: 7200, colors: ["pink", "gold"], subcategory: "girl" },
    { id: 35, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/54a3a041-6ac1-45ba-8ed6-8e926d55656f.jpg", title: "Набор для девушки 35", description: "Красивая композиция из шаров на день рождения.", price: "2 770 ₽", priceNum: 2770, colors: ["silver", "purple"], subcategory: "girl" },
    { id: 37, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b7ea8bc0-f6fc-4dd2-9332-7ce7fb1e7ec9.jpg", title: "Набор для девушки 37", description: "Красивая композиция из шаров на день рождения.", price: "4 150 ₽", priceNum: 4150, colors: ["pink"], subcategory: "girl" },
    { id: 38, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/cc0fa4b6-fbe3-4c29-9bae-067098ca7a60.jpg", title: "Набор для девушки 38", description: "Красивая композиция из шаров на день рождения.", price: "4 990 ₽", priceNum: 4990, colors: ["white", "pink", "cream"], subcategory: "girl" },
    { id: 39, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6e509ede-c7dd-4473-96a7-1590415b4f96.jpg", title: "Набор для девушки 39", description: "Красивая композиция из шаров на день рождения.", price: "2 100 ₽", priceNum: 2100, colors: ["white"], subcategory: "girl" },
    { id: 40, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4beb866c-812c-41f3-a3ae-df7ec0be0788.jpg", title: "Набор для девушки 40", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 41, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/70aab47c-5df8-4796-b2de-9cb915bb17b1.jpg", title: "Набор для девушки 41", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 42, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f870b36b-1e36-4fb1-a0dd-2ef71170bf8b.jpg", title: "Набор для девушки 42", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 43, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4f21d80e-b682-47ad-be8e-d8a431fc92ff.jpg", title: "Набор для девушки 43", description: "Красивая композиция из шаров на день рождения.", price: "2 900 ₽", priceNum: 2900, colors: ["cream"], subcategory: "girl" },
    { id: 44, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/42af5c39-754f-456d-a490-2d041bff0ff5.jpg", title: "Набор для девушки 44", description: "Красивая композиция из шаров на день рождения.", price: "5 150 ₽", priceNum: 5150, colors: ["gold", "pink"], subcategory: "girl" },
    { id: 45, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/91f37758-db57-47b3-bc03-1470f7e7db79.jpg", title: "Набор для девушки 45", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 46, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7b85fcbb-844e-41c5-8b70-cc35c1db3961.jpg", title: "Набор для девушки 46", description: "Красивая композиция из шаров на день рождения.", price: "4 740 ₽", priceNum: 4740, colors: ["cream", "black"], subcategory: "girl" },

    { id: 48, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3b993517-c829-4029-b179-df572b2a46f3.jpg", title: "Набор для девушки 48", description: "Красивая композиция из шаров на день рождения.", price: "3 480 ₽", priceNum: 3480, colors: ["silver", "purple"], subcategory: "girl" },
    { id: 49, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/cbfec128-1e62-41ce-9128-ec50a49b83d1.jpg", title: "Набор для девушки 49", description: "Красивая композиция из шаров на день рождения.", price: "3 870 ₽", priceNum: 3870, colors: ["cream"], subcategory: "girl" },
    { id: 50, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/41666dff-2472-484c-b318-dd34b08c91f7.jpg", title: "Набор для девушки 50", description: "Красивая композиция из шаров на день рождения.", price: "4 050 ₽", priceNum: 4050, colors: ["pink"], subcategory: "girl" },
    { id: 51, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a348bda7-dd6c-441c-84ad-1918bf4c2274.jpg", title: "Набор для девушки 51", description: "Красивая композиция из шаров на день рождения.", price: "7 940 ₽", priceNum: 7940, colors: ["cream", "black"], subcategory: "girl" },
    { id: 52, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/de0a7243-38c3-4e18-8b80-aab8943f2fe0.jpg", title: "Набор для девушки 52", description: "Красивая композиция из шаров на день рождения.", price: "5 000 ₽", priceNum: 5000, colors: ["pink", "cream"], subcategory: "girl" },
    { id: 53, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/68d535ec-a7b0-4faa-ae71-011bd673ae5f.jpg", title: "Набор для девушки 53", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 54, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/0e33c4a5-50b0-4345-b0db-ee845795a193.jpg", title: "Набор для девушки 54", description: "Красивая композиция из шаров на день рождения.", price: "3 200 ₽", priceNum: 3200, colors: ["cream", "gold"], subcategory: "girl" },
    { id: 55, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b880be31-f42a-43a2-a388-7a60b0eb4710.jpg", title: "Набор для девушки 55", description: "Красивая композиция из шаров на день рождения.", price: "12 500 ₽", priceNum: 12500, colors: ["beige", "cream"], subcategory: "girl" },
    { id: 56, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7243c3dc-174b-4156-bc76-0b8dd610bc15.jpg", title: "Набор для девушки 56", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 58, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3667be83-d02c-47e1-a7ef-d444dd1d9ffb.jpg", title: "Набор для девушки 58", description: "Красивая композиция из шаров на день рождения.", price: "4 220 ₽", priceNum: 4220, colors: ["pink"], subcategory: "girl" },
    { id: 59, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7cc1af8f-d508-4c20-9cae-50c44608bfa7.jpg", title: "Набор для девушки 59", description: "Красивая композиция из шаров на день рождения.", price: "4 300 ₽", priceNum: 4300, colors: ["red", "white"], subcategory: "girl" },
    { id: 60, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/323b52bc-49ab-48cd-b1df-40f7962f489f.jpg", title: "Набор для девушки 60", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 61, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3662f991-f763-4bd4-b2e6-9cf29d87451b.jpg", title: "Набор для девушки 61", description: "Красивая композиция из шаров на день рождения.", price: "4 180 ₽", priceNum: 4180, colors: ["pink", "silver"], subcategory: "girl" },
    { id: 62, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a47a35e0-55b1-46ed-b63a-edcfef017821.jpg", title: "Набор для девушки 62", description: "Красивая композиция из шаров на день рождения.", price: "7 500 ₽", priceNum: 7500, colors: ["red"], subcategory: "girl" },
    
    { id: 64, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b211aa7f-330e-4d1a-a79b-1de7b9e6a4dc.jpg", title: "Набор для девушки 64", description: "Красивая композиция из шаров на день рождения.", price: "4 070 ₽", priceNum: 4070, colors: ["beige", "cream"], subcategory: "girl" },
    { id: 65, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f3962649-7e65-4ace-9443-30e042a7a9a4.jpg", title: "Набор для девушки 65", description: "Красивая композиция из шаров на день рождения.", price: "7 160 ₽", priceNum: 7160, colors: ["silver", "beige", "white", "cream"], subcategory: "girl", contain: true },
    { id: 66, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7db3285d-352e-4125-b4c7-a88006126bcc.jpg", title: "Набор для девушки 66", description: "Красивая композиция из шаров на день рождения.", price: "4 410 ₽", priceNum: 4410, colors: ["cream"], subcategory: "girl" },
    { id: 67, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3e389bd7-f598-4ed3-8d89-40e7535095ba.jpg", title: "Набор для девушки 67", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 68, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f3fff6c6-9a1b-4f38-a98b-e6c673478cdc.jpg", title: "Набор для девушки 68", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 69, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6f241f12-c896-4e23-ab6b-cd73d4d391c7.jpg", title: "Набор для девушки 69", description: "Красивая композиция из шаров на день рождения.", price: "6 100 ₽", priceNum: 6100, colors: ["red", "pink"], subcategory: "girl" },
    { id: 70, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/bfc333af-3d05-4535-8d68-5fb7b1e63bc1.jpg", title: "Набор для девушки 70", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 71, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/07f51c8d-7935-40b1-9937-9b1e53249478.jpg", title: "Набор для девушки 71", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["beige", "cream"], subcategory: "girl" },
    { id: 72, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e81a785b-aa8d-4ba6-a2b8-a38a68e9d1bf.jpg", title: "Набор для девушки 72", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 73, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9f493015-c566-4439-b088-55735bb64c33.jpg", title: "Набор для девушки 73", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },

    { id: 75, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8ca2913b-df38-455c-aa6a-3d7b749ff731.jpg", title: "Набор для девушки 75", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 76, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1ffff0d3-b6e5-41dc-ae42-ea4a544a009a.jpg", title: "Набор для девушки 76", description: "Красивая композиция из шаров на день рождения.", price: "4 810 ₽", priceNum: 4810, colors: ["red"], subcategory: "girl" },
    { id: 77, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9970c206-e012-4ebf-ae93-b5632d84053e.jpg", title: "Набор для девушки 77", description: "Красивая композиция из шаров на день рождения.", price: "5 250 ₽", priceNum: 5250, colors: ["white", "red"], subcategory: "girl", contain: true },
    { id: 78, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5b916afa-cf59-44c2-8c88-32ea4954c6dd.jpg", title: "Набор для девушки 78", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 79, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a2a76ca8-7386-4277-97b0-db6f990b6b46.jpg", title: "Набор для девушки 79", description: "Красивая композиция из шаров на день рождения.", price: "6 200 ₽", priceNum: 6200, colors: ["pink"], subcategory: "girl" },
    { id: 80, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7e4d94ed-bbbc-48d2-8320-6bd1349ae488.jpg", title: "Набор для девушки 80", description: "Красивая композиция из шаров на день рождения.", price: "11 150 ₽", priceNum: 11150, colors: ["cream", "white"], subcategory: "girl" },
    { id: 81, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d33a560f-8ba4-455b-a4e2-c154383fb6e0.jpg", title: "Набор для девушки 81", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 82, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/40b47215-e536-4098-88e0-89d9a23812af.jpg", title: "Набор для девушки 82", description: "Красивая композиция из шаров на день рождения.", price: "4 700 ₽", priceNum: 4700, colors: ["pink"], subcategory: "girl" },
    { id: 83, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e7e6555d-132d-4da8-9ef7-f053ea5147e7.jpg", title: "Набор для девушки 83", description: "Красивая композиция из шаров на день рождения.", price: "12 750 ₽", priceNum: 12750, colors: ["red"], subcategory: "girl" },
    { id: 84, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/83a744ce-be52-4353-a022-4ffb12b1aef3.jpg", title: "Набор для девушки 84", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 85, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/670fd56b-f985-4b93-acab-bd9d2e06ad2e.jpg", title: "Набор для девушки 85", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 86, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6602a9a7-4f50-4e16-90ad-e0d3818900ed.jpg", title: "Набор для девушки 86", description: "Красивая композиция из шаров на день рождения.", price: "8 500 ₽", priceNum: 8500, colors: ["pink"], subcategory: "girl" },
    { id: 87, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/eb70c28d-48b5-4d25-9bb9-7612c1c7512d.jpg", title: "Набор для девушки 87", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 88, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5d9569ce-ef42-466a-9d26-1283438ad29a.jpg", title: "Набор для девушки 88", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 89, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/82e22194-fdc6-4075-89d1-ed1f6f4cd0d9.jpg", title: "Набор для девушки 89", description: "Красивая композиция из шаров на день рождения.", price: "4 960 ₽", priceNum: 4960, colors: ["cream", "white"], subcategory: "girl" },
    { id: 90, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ad3c5ccd-abdf-41f0-af01-5a37b43d7958.jpg", title: "Набор для девушки 90", description: "Красивая композиция из шаров на день рождения.", price: "4 120 ₽", priceNum: 4120, colors: ["cream", "gold", "yellow"], subcategory: "girl" },
    { id: 91, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8ad6dc85-ebae-4a04-990e-3f124a77784e.jpg", title: "Набор для девушки 91", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    
    { id: 93, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a3e64220-c307-4baf-ba54-649fe730d2fd.jpg", title: "Набор для девушки 93", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 94, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/75e4d540-1d2c-4d86-b253-d228487da386.jpg", title: "Набор для девушки 94", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 95, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/81a5a212-286f-465b-80eb-7401a02d36f9.jpg", title: "Набор для девушки 95", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },

    { id: 97, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/543eb99a-4552-42f4-bb93-2b8a75c04001.jpg", title: "Набор для девушки 97", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 98, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a1022ed0-dbe7-485e-ae08-fbac8483c2b6.jpg", title: "Набор для девушки 98", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 99, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/57ed6e7a-70fa-43f7-9217-02855e76e83c.jpg", title: "Набор для девушки 99", description: "Красивая композиция из шаров на день рождения.", price: "3 970 ₽", priceNum: 3970, colors: ["cream", "beige", "white"], subcategory: "girl" },
    { id: 100, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e41c8cc0-dc63-41f9-90c8-a5754e5930cd.jpg", title: "Набор для девушки 100", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 101, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3bb212ac-e980-42e2-b697-c5ed01c729f5.jpg", title: "Набор для девушки 101", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },


    { id: 104, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/dd6cf241-b65f-4d84-86fd-27c6f9f61ac4.jpg", title: "Набор для девушки 104", description: "Красивая композиция из шаров на день рождения.", price: "4 760 ₽", priceNum: 4760, colors: ["white", "pink"], subcategory: "girl" },
    { id: 105, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/705ca319-2353-4ba6-bc3d-a6f0b079e5a4.jpg", title: "Набор для девушки 105", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 106, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/22035862-7e4e-489c-93e6-ded7ae79bb0e.jpg", title: "Набор для девушки 106", description: "Красивая композиция из шаров на день рождения.", price: "3 690 ₽", priceNum: 3690, colors: ["pink", "gold"], subcategory: "girl" },
    { id: 107, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2fcfc9cb-43e0-4945-adbb-83271abfe0c6.jpg", title: "Набор для девушки 107", description: "Красивая композиция из шаров на день рождения.", price: "5 750 ₽", priceNum: 5750, colors: ["pink", "white"], subcategory: "girl" },
    { id: 108, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c0478e19-10d9-42e0-af0d-0fb2539c42b5.jpg", title: "Набор для девушки 108", description: "Красивая композиция из шаров на день рождения.", price: "2 940 ₽", priceNum: 2940, colors: ["blue"], subcategory: "girl" },
    { id: 109, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e98c5ca0-bcd1-44fd-9f67-ae955fb7a58e.jpg", title: "Набор для девушки 109", description: "Красивая композиция из шаров на день рождения.", price: "3 160 ₽", priceNum: 3160, colors: ["white"], subcategory: "girl" },
    { id: 110, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/fe4f5981-777f-4b9e-88de-063b90849b4c.jpg", title: "Набор для девушки 110", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 111, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7362df61-147d-4534-bc5e-29f7a42f59da.jpg", title: "Набор для девушки 111", description: "Красивая композиция из шаров на день рождения.", price: "3 820 ₽", priceNum: 3820, colors: ["purple"], subcategory: "girl" },
    { id: 112, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4976af09-fee7-4181-830d-7810c8977d49.jpg", title: "Набор для девушки 112", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 114, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3d97625d-1307-4aaf-a698-c64e6567fecc.jpg", title: "Набор для девушки 114", description: "Красивая композиция из шаров на день рождения.", price: "4 470 ₽", priceNum: 4470, colors: ["pink"], subcategory: "girl" },
    { id: 115, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5c7432d5-f5dd-473f-83a5-209339ee4a5f.jpg", title: "Набор для девушки 115", description: "Красивая композиция из шаров на день рождения.", price: "11 400 ₽", priceNum: 11400, colors: ["red", "cream"], subcategory: "girl" },
    { id: 116, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3cd2b4cb-ad3d-46c0-8332-ca0285484dcb.jpg", title: "Набор для девушки 116", description: "Красивая композиция из шаров на день рождения.", price: "5 400 ₽", priceNum: 5400, colors: ["pink"], subcategory: "girl" },
    { id: 117, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/bc15d42d-93fe-43d2-8602-9215f2206293.jpg", title: "Набор для девушки 117", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 118, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7e86abb0-9ade-4838-ad92-5b039c141b73.jpg", title: "Набор для девушки 118", description: "Красивая композиция из шаров на день рождения.", price: "3 330 ₽", priceNum: 3330, colors: ["cream"], subcategory: "girl" },
    { id: 119, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/fb6774cf-d023-4028-a762-e6f2f3ee58ca.jpg", title: "Набор для девушки 119", description: "Красивая композиция из шаров на день рождения.", price: "2 550 ₽", priceNum: 2550, colors: ["pink"], subcategory: "girl" },
    { id: 120, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e9b6884b-921d-4336-9879-2a80a1d8d7bc.jpg", title: "Набор для девушки 120", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 121, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a577e9a1-dc7f-4cab-9257-295272a64113.jpg", title: "Набор для девушки 121", description: "Красивая композиция из шаров на день рождения.", price: "4 250 ₽", priceNum: 4250, colors: ["cream", "pink"], subcategory: "girl" },
    { id: 122, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/614aa9dc-2bae-4392-819a-4b18314a0f54.jpg", title: "Набор для девушки 122", description: "Красивая композиция из шаров на день рождения.", price: "8 080 ₽", priceNum: 8080, colors: ["pink", "black"], subcategory: "girl" },
    { id: 123, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6b0fc664-4c59-4fa6-90c5-794502e450ad.jpg", title: "Набор для девушки 123", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 124, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5f7f71be-dd42-4455-ac2b-d4d854a12031.jpg", title: "Набор для девушки 124", description: "Красивая композиция из шаров на день рождения.", price: "4 530 ₽", priceNum: 4530, colors: ["gold", "green"], subcategory: "girl" },
    { id: 125, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9ff29493-b5ea-44ea-9c1a-0bd0c1ba8863.jpg", title: "Набор для девушки 125", description: "Красивая композиция из шаров на день рождения.", price: "5 550 ₽", priceNum: 5550, colors: ["pink"], subcategory: "girl" },
    { id: 126, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3e30e6f7-7906-4d9b-87b0-238d0c4f93fb.jpg", title: "Набор для девушки 126", description: "Красивая композиция из шаров на день рождения.", price: "7 580 ₽", priceNum: 7580, colors: ["cream", "gold", "beige"], subcategory: "girl" },
    { id: 127, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8366d7fd-f6b4-483d-83b4-c1ed30104b39.jpg", title: "Набор для девушки 127", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 128, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a1fb6532-b1fd-4ec5-9266-855c9c7f103c.jpg", title: "Набор для девушки 128", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 129, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c895c453-6d17-49fb-8409-2ed7b3b0ff73.jpg", title: "Набор для девушки 129", description: "Красивая композиция из шаров на день рождения.", price: "3 140 ₽", priceNum: 3140, colors: ["white", "cream"], subcategory: "girl" },
    { id: 130, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2371ec3a-8da4-4b06-a9f5-7841941762fb.jpg", title: "Набор для девушки 130", description: "Красивая композиция из шаров на день рождения.", price: "4 980 ₽", priceNum: 4980, colors: ["pink", "gold"], subcategory: "girl" },
    { id: 131, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c05888c4-0af1-464f-bcbb-0d392c2e39b0.jpg", title: "Набор для девушки 131", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 132, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d7e33394-6760-434c-99a7-f82db8a0b863.jpg", title: "Набор для девушки 132", description: "Красивая композиция из шаров на день рождения.", price: "4 850 ₽", priceNum: 4850, colors: ["white", "red"], subcategory: "girl" },
    { id: 133, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/135b55eb-93c1-404b-bf51-c3ee09dfbbcf.jpg", title: "Набор для девушки 133", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 134, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/19729859-e10b-4f1f-89b8-5f854e8e0c8c.jpg", title: "Набор для девушки 134", description: "Красивая композиция из шаров на день рождения.", price: "11 800 ₽", priceNum: 11800, colors: ["pink"], subcategory: "girl" },
    { id: 135, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/56d8f74e-681b-4587-b5fc-5a4ff28a7245.jpg", title: "Набор для девушки 135", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 136, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/aa3ca436-a468-4f87-99c2-f04f6cbe4b01.jpg", title: "Набор для девушки 136", description: "Красивая композиция из шаров на день рождения.", price: "5 030 ₽", priceNum: 5030, colors: ["white"], subcategory: "girl" },
    
    { id: 138, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/689f1b77-74bb-4ea6-a0f9-5b6725a5b3be.jpg", title: "Набор для девушки 138", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 139, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9986bad0-626e-4f82-84fa-cadbd2c58a55.jpg", title: "Набор для девушки 139", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 140, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/0f9c314b-66f1-44af-a373-63e0e3d6ff4a.jpg", title: "Набор для девушки 140", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 141, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9566d985-3559-4f58-a4cd-8412c8b1e84f.jpg", title: "Набор для девушки 141", description: "Красивая композиция из шаров на день рождения.", price: "6 350 ₽", priceNum: 6350, colors: ["red"], subcategory: "girl" },
    { id: 142, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ea6c4058-e00a-4899-92dd-3ef909796345.jpg", title: "Набор для девушки 142", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 143, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b1e9f95d-5730-4af7-bd2b-a7fdf20a0ebf.jpg", title: "Набор для девушки 143", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 144, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ecd2a84b-59b9-4da7-ac95-e7bd200256bb.jpg", title: "Набор для девушки 144", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 145, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e1525365-d1e6-454c-90e9-f81cc29e0549.jpg", title: "Набор для девушки 145", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 146, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4f6a5b60-e136-4e2b-b64e-f14d4ba881be.jpg", title: "Набор для девушки 146", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 147, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c706f6e0-c8d0-462e-bc8e-5e8895019f8f.jpg", title: "Набор для девушки 147", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 148, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/faba83e4-a5bd-485c-8de7-57f40f279c2e.jpg", title: "Набор для девушки 148", description: "Красивая композиция из шаров на день рождения.", price: "4 250 ₽", priceNum: 4250, colors: ["pink", "cream"], subcategory: "girl" },
    { id: 149, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/eb015e96-0d3d-4011-a357-6f6472d01af2.jpg", title: "Набор для девушки 149", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 150, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/36bedbeb-752c-4b30-a53f-78046c4e3569.jpg", title: "Набор для девушки 150", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 151, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d011ba49-6b62-4d59-86e2-e3c0b427ad60.jpg", title: "Набор для девушки 151", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 152, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7d562783-4e29-48ea-985e-dd5fce5cc0ea.jpg", title: "Набор для девушки 152", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 153, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e8dfc673-5926-4c59-873d-67519451b8d5.jpg", title: "Набор для девушки 153", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 154, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/74494707-ae6a-4a6b-a2f0-3576d23ef65c.jpg", title: "Набор для девушки 154", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 155, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/01f23696-8f17-4dbe-aeaa-33ca61baaa73.jpg", title: "Набор для девушки 155", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 156, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a5977170-2c38-4ff4-88dc-c58beafe7187.jpg", title: "Набор для девушки 156", description: "Красивая композиция из шаров на день рождения.", price: "3 600 ₽", priceNum: 3600, colors: ["black", "red"], subcategory: "girl" },
    { id: 157, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/50336539-d2d6-485a-8a5e-e74fbfb6a60b.jpg", title: "Набор для девушки 157", description: "Красивая композиция из шаров на день рождения.", price: "4 250 ₽", priceNum: 4250, colors: ["pink"], subcategory: "girl" },
    { id: 158, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8c7ae02b-2363-4a26-a798-5f034eb6621f.jpg", title: "Набор для девушки 158", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 159, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/26ad5e64-b38e-4f84-979d-bd6d60b5c914.JPG", title: "Набор для девушки 159", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 160, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/460c9496-1ff1-426c-b150-0b554b1c0dc3.JPG", title: "Набор для девушки 160", description: "Красивая композиция из шаров на день рождения.", price: "2 500 ₽", priceNum: 2500, colors: ["pink", "cream"], subcategory: "girl" },
    { id: 161, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/88032802-45bf-41ea-9b54-fea3f28ef3d1.JPG", title: "Набор для девушки 161", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 162, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/00bbf434-3a69-44ac-a0a5-fbb3375c419d.JPG", title: "Набор для девушки 162", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 163, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/631ac9a2-6499-4732-9c84-bb3ab360878e.JPG", title: "Набор для девушки 163", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 164, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/46918a08-fc89-428c-8fce-c3f1ac8e199e.JPG", title: "Набор для девушки 164", description: "Красивая композиция из шаров на день рождения.", price: "1 800 ₽", priceNum: 1800, colors: ["white", "cream"], subcategory: "girl" },
    { id: 165, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e20afeda-cdb2-4d02-a83f-10b4d917c622.JPG", title: "Набор для девушки 165", description: "Красивая композиция из шаров на день рождения.", price: "2 000 ₽", priceNum: 2000, colors: ["purple"], subcategory: "girl" },
    { id: 166, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/419e6b46-8e21-45c6-b328-ac7f2e9036cc.JPG", title: "Набор для девушки 166", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 167, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e6f09fe7-9e55-42bc-a4f2-233481e588f1.JPG", title: "Набор для девушки 167", description: "Красивая композиция из шаров на день рождения.", price: "3 020 ₽", priceNum: 3020, colors: ["pink", "white"], subcategory: "girl" },
    { id: 168, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/58057721-e7f4-44b6-8bcf-9921b77ae291.JPG", title: "Набор для девушки 168", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 169, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7cb80026-8eb2-4e44-96a4-7d8405629e43.JPG", title: "Набор для девушки 169", description: "Красивая композиция из шаров на день рождения.", price: "3 760 ₽", priceNum: 3760, colors: ["cream"], subcategory: "girl" },
    { id: 170, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1db322c7-35dc-449c-a6e2-43a34b5df53f.JPG", title: "Набор для девушки 170", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 171, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/152fae57-d667-4fc4-8562-5c0816c28b3c.jpg", title: "Набор для девушки 171", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 172, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c83baa78-3cf9-432d-bc12-6718df2741ab.jpg", title: "Набор для девушки 172", description: "Красивая композиция из шаров на день рождения.", price: "8 600 ₽", priceNum: 8600, colors: ["gold", "red"], subcategory: "girl" },
    { id: 173, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c784a0ed-4f1f-4253-a7ad-4c71dc7775ce.jpg", title: "Набор для девушки 173", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 174, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/46d3660c-9043-4de5-9579-da49ac1b5a27.jpg", title: "Набор для девушки 174", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 175, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/be1845b5-1b7f-4056-bb21-62c143b85c43.jpg", title: "Набор для девушки 175", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 176, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3b0ca61e-2d31-4aa9-a4ec-867178692516.jpg", title: "Набор для девушки 176", description: "Красивая композиция из шаров на день рождения.", price: "2 500 ₽", priceNum: 2500, colors: ["pink"], subcategory: "girl" },
    { id: 177, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/aed0079a-a8d4-4495-b406-167c518789c4.jpg", title: "Набор для девушки 177", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 178, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e85d6847-c2f2-4f27-b5c5-2abf24b51cf5.jpg", title: "Набор для девушки 178", description: "Красивая композиция из шаров на день рождения.", price: "3 880 ₽", priceNum: 3880, colors: ["white"], subcategory: "girl" },
    { id: 179, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d2f52ccb-8380-457f-af71-6a083da546d0.jpg", title: "Набор для девушки 179", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 180, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/16b2ecff-ee38-48ab-b9ef-38df0414b0d4.jpg", title: "Набор для девушки 180", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 181, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3e18d3de-c67d-4588-a399-f1d343991c2c.jpg", title: "Набор для девушки 181", description: "Красивая композиция из шаров на день рождения.", price: "4 120 ₽", priceNum: 4120, colors: ["gold", "red"], subcategory: "girl" },
    { id: 182, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f668458a-5b7e-48d1-bd16-44178b48ebf4.jpg", title: "Набор для девушки 182", description: "Красивая композиция из шаров на день рождения.", price: "3 900 ₽", priceNum: 3900, colors: ["red"], subcategory: "girl" },
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
    
    { id: 211, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e9c27870-0fd6-49cb-8ef6-65f08c40e32e.jpg", title: "Набор для девушки 211", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 212, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/54121dd3-d274-4f15-99d4-f8343778b596.jpg", title: "Набор для девушки 212", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 213, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d4a910c8-6b04-4220-8ee1-260b8320dea4.jpg", title: "Набор для девушки 213", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 214, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7cc82fba-9b86-493e-b72f-414254787f53.jpg", title: "Набор для девушки 214", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 215, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/be160c1b-61c4-48c4-a387-d456441933c5.jpg", title: "Набор для девушки 215", description: "Красивая композиция из шаров на день рождения.", price: "3 320 ₽", priceNum: 3320, colors: ["cream", "white"], subcategory: "girl" },
    { id: 216, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e80a0769-a630-4cef-8f5e-9a709f6a7ec4.jpg", title: "Набор для девушки 216", description: "Красивая композиция из шаров на день рождения.", price: "2 570 ₽", priceNum: 2570, colors: ["silver", "purple"], subcategory: "girl" },
    { id: 217, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/cc2a6eab-8fce-45e2-a3a5-0e6380c602fd.jpg", title: "Набор для девушки 217", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 218, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f7c7cbbe-a9ed-42b1-9a3a-991199585351.jpg", title: "Набор для девушки 218", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 219, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8b534e51-c201-4b72-813e-394d0033f13b.jpg", title: "Набор для девушки 219", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 220, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4fec5d7d-3332-42d5-b622-5ac3b7b4cfea.jpg", title: "Набор для девушки 220", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 221, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/fcae3e9c-fb90-4723-90a5-fda5e52b821e.jpg", title: "Набор для девушки 221", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 222, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/745bea8c-956e-496d-822d-d3ffe7f497f2.jpg", title: "Набор для девушки 222", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 223, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c9085fbe-13bf-48a5-8099-9d027d44f24c.jpg", title: "Набор для девушки 223", description: "Красивая композиция из шаров на день рождения.", price: "4 050 ₽", priceNum: 4050, colors: ["white", "pink"], subcategory: "girl" },
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
    { id: 235, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3daec883-3781-400f-9801-b5ba9af8fddd.jpg", title: "Набор для девушки 235", description: "Красивая композиция из шаров на день рождения.", price: "3 950 ₽", priceNum: 3950, colors: ["pink"], subcategory: "girl" },
    { id: 236, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/afb31b93-0dce-4016-9cbb-70181e6a76d8.jpg", title: "Набор для девушки 236", description: "Красивая композиция из шаров на день рождения.", price: "5 500 ₽", priceNum: 5500, colors: ["pink", "cream"], subcategory: "girl" },
    { id: 237, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7e54d29f-9488-4c24-bf89-728ca9314cfa.jpg", title: "Набор для девушки 237", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 238, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/269c223f-5e1b-4a11-9dd2-3aca2e72cf01.jpg", title: "Набор для девушки 238", description: "Красивая композиция из шаров на день рождения.", price: "3 990 ₽", priceNum: 3990, colors: ["blue", "pink"], subcategory: "girl" },
    { id: 239, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/51bf200c-719e-4e82-903a-f1dea9886645.jpg", title: "Набор для девушки 239", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 240, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6270621c-0e2e-4247-a282-79c0018afe0c.jpg", title: "Набор для девушки 240", description: "Красивая композиция из шаров на день рождения.", price: "5 440 ₽", priceNum: 5440, colors: ["pink", "black"], subcategory: "girl" },
    { id: 241, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e43cd062-4b9d-4512-a19f-f56770c88cdd.jpg", title: "Набор для девушки 241", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 242, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b19ea713-c192-40dd-a8be-e84c58626e0e.jpg", title: "Набор для девушки 242", description: "Красивая композиция из шаров на день рождения.", price: "3 950 ₽", priceNum: 3950, colors: ["cream", "gold"], subcategory: "girl" },
    { id: 243, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/fd1c9180-4dcf-4013-a281-20c9c96480df.jpg", title: "Набор для девушки 243", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 244, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a3cd4ece-fa6f-4500-a1e8-2446717aa7a1.jpg", title: "Набор для девушки 244", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 245, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/31111dd3-965c-40a4-8a61-94e18b0a5a02.jpg", title: "Набор для девушки 245", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 246, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5d9477a3-9ff3-4c32-a373-869a2506b573.jpg", title: "Набор для девушки 246", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 247, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e3b02fc0-ff7c-4b7c-b701-75b738353cff.jpg", title: "Набор для девушки 247", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 248, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5c9f746b-02f6-491f-ae1b-c24b3862bc82.jpg", title: "Набор для девушки 248", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 249, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5618af1b-033c-4451-9646-6b639cd91339.jpg", title: "Набор для девушки 249", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 250, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/279881cb-7a4a-4e72-81bf-e730a4b329e0.jpg", title: "Набор для девушки 250", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 251, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/65339669-27c6-49c5-8ac0-25230c44cacf.jpg", title: "Набор для девушки 251", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 252, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a1703ffa-3145-4027-a453-85e891c88a9d.jpg", title: "Набор для девушки 252", description: "Красивая композиция из шаров на день рождения.", price: "3 880 ₽", priceNum: 3880, colors: ["rosegold"], subcategory: "girl" },
    
    { id: 254, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/0b4a6acc-584a-4455-9742-57cd845865a0.jpg", title: "Набор для девушки 254", description: "Красивая композиция из шаров на день рождения.", price: "2 950 ₽", priceNum: 2950, colors: ["green"], subcategory: "girl" },
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
    { id: 268, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/17f1546b-af0b-4224-896b-6a84c97f3645.jpg", title: "Набор для девушки 268", description: "Красивая композиция из шаров на день рождения.", price: "4 080 ₽", priceNum: 4080, colors: ["purple", "silver"], subcategory: "girl" },
    { id: 269, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e66ee61e-f31f-4f41-9205-341410eb1611.jpg", title: "Набор для девушки 269", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 270, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f1232ebc-89e4-4d0c-85fd-cddd73bf5bcb.jpg", title: "Набор для девушки 270", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 271, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7ae5c690-16d0-412a-bd6d-90259887a947.jpg", title: "Набор для девушки 271", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 272, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/22cad5f4-3a1e-4470-b0d3-aa1b8e1f1c2a.jpg", title: "Набор для девушки 272", description: "Красивая композиция из шаров на день рождения.", price: "4 100 ₽", priceNum: 4100, colors: ["red", "white"], subcategory: "girl" },
    { id: 273, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c513a4c9-c443-465c-895f-d8346604605a.jpg", title: "Набор для девушки 273", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 274, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5f81ebcd-efd2-46c2-9b7c-6d82585562d4.jpg", title: "Набор для девушки 274", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 275, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/031c37d7-3d8c-48da-80a0-caf0eff82ff9.jpg", title: "Набор для девушки 275", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 276, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7e7e2cf0-1c07-4a5c-869f-93f532ba3cb9.jpg", title: "Набор для девушки 276", description: "Красивая композиция из шаров на день рождения.", price: "3 780 ₽", priceNum: 3780, colors: ["green", "white", "cream"], subcategory: "girl" },
    { id: 277, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2b8d4cd1-e95c-4ddd-a506-73d83d3b5384.jpg", title: "Набор для девушки 277", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 278, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/38f5708c-b90a-4d79-a455-538c4df84eb1.jpg", title: "Набор для девушки 278", description: "Красивая композиция из шаров на день рождения.", price: "1 300 ₽", priceNum: 1300, colors: ["pink"], subcategory: "girl" },
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
    { id: 307, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e2b5b9f3-cdc8-46fb-ba7a-c22f67b1ff4a.jpg", title: "Набор для девушки 307", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 308, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/98f48454-24dd-482c-99e4-9a467202c0b3.jpg", title: "Набор для девушки 308", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 309, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c9a18f40-a3c6-476b-8647-df8acbaa6749.jpg", title: "Набор для девушки 309", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 310, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/06d8914f-f748-4606-acea-0e898623b6b7.jpg", title: "Набор для девушки 310", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 311, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/64a69dc3-f6d5-432a-ad0c-9692901e65d7.jpg", title: "Набор для девушки 311", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 312, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3dcd8e0f-9f18-4f25-a530-625b3b57f1a3.jpg", title: "Набор для девушки 312", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 313, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6f28086a-8bb3-40e7-af28-5dd42aea96bd.jpg", title: "Набор для девушки 313", description: "Красивая композиция из шаров на день рождения.", price: "5 920 ₽", priceNum: 5920, colors: ["silver", "purple"], subcategory: "girl" },
    { id: 314, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/276027a2-d6ed-4cc3-8473-d63641de5fa2.jpg", title: "Набор для девушки 314", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 315, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/439f6afd-35ea-46b5-82a4-1ade692126ec.jpg", title: "Набор для девушки 315", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 316, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6c438982-2441-42b3-bdea-325eaf6c90cb.jpg", title: "Набор для девушки 316", description: "Красивая композиция из шаров на день рождения.", price: "3 730 ₽", priceNum: 3730, colors: ["cream"], subcategory: "girl" },
    { id: 317, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9db17187-89dd-42f9-970d-a8ce29bd0d63.jpg", title: "Набор для девушки 317", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 318, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/eaa6a1f7-f180-45a7-ae1b-e1064520b97a.jpg", title: "Набор для девушки 318", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 319, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/629b8ee9-969f-4201-8430-5a143c2343e0.jpg", title: "Набор для девушки 319", description: "Красивая композиция из шаров на день рождения.", price: "3 700 ₽", priceNum: 3700, colors: ["gold", "white"], subcategory: "girl" },
    { id: 320, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/afb5afe4-0b75-4c66-9d6a-fb074d8f93da.jpg", title: "Набор для девушки 320", description: "Красивая композиция из шаров на день рождения.", price: "3 290 ₽", priceNum: 3290, colors: ["purple"], subcategory: "girl" },
    { id: 321, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f3999ee9-bc52-45ed-a275-27848a0dd8a3.jpg", title: "Набор для девушки 321", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 322, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b5e42bdd-c486-4b42-af71-2198edcbf45d.jpg", title: "Набор для девушки 322", description: "Красивая композиция из шаров на день рождения.", price: "4 900 ₽", priceNum: 4900, colors: ["red", "white"], subcategory: "girl" },
    { id: 323, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/458cc543-e10a-4167-a52a-e6277de8bf97.jpg", title: "Набор для девушки 323", description: "Красивая композиция из шаров на день рождения.", price: "5 390 ₽", priceNum: 5390, colors: ["white", "cream"], subcategory: "girl" },
    { id: 324, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5a2d9ce2-ea8d-4055-b039-782fa99305b2.jpg", title: "Набор для девушки 324", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 325, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2aa67718-e75f-471b-a20f-7ccfc1a79074.jpg", title: "Набор для девушки 325", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 326, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/49e4987c-caeb-4219-92e0-b9f2acb0c015.jpg", title: "Набор для девушки 326", description: "Красивая композиция из шаров на день рождения.", price: "3 850 ₽", priceNum: 3850, colors: ["cream"], subcategory: "girl" },
    { id: 327, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/0fca89e2-0445-4e42-b606-a5c47251e6f4.jpg", title: "Набор для девушки 327", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 328, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/aa2d4870-e09d-4e0a-a965-332c2a501df7.jpg", title: "Набор для девушки 328", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 329, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3f33587a-8ad5-460c-9231-cb4d5e654143.jpg", title: "Набор для девушки 329", description: "Красивая композиция из шаров на день рождения.", price: "4 050 ₽", priceNum: 4050, colors: ["green", "white"], subcategory: "girl" },
    { id: 330, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/92b93509-758e-4f85-9ef2-32c9bbef20f5.jpg", title: "Набор для девушки 330", description: "Красивая композиция из шаров на день рождения.", price: "4 850 ₽", priceNum: 4850, colors: ["white", "red"], subcategory: "girl" },
    { id: 331, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4b08b883-63b5-45c4-94af-ee9bd2f97479.jpg", title: "Набор для девушки 331", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },

    { id: 333, image: "https://cdn.poehali.dev/files/aba9da06-6674-44a0-862a-5a2da2582e96.jpg", title: "Набор для девушки 333", description: "Красивая композиция из шаров на день рождения.", price: "3 070 ₽", priceNum: 3070, colors: ["white", "cream"], subcategory: "girl" },
    { id: 334, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/bb9af16b-fbd8-4ded-9530-0692d6c04716.jpg", title: "Набор для девушки 334", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 335, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2f415df1-561e-4b6f-b950-f514c7708933.jpg", title: "Набор для девушки 335", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 336, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4627897e-2364-45ba-b9a2-e4135e190124.jpg", title: "Набор для девушки 336", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 337, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6ff1c61d-a2c8-4f6c-b1f5-095998591c20.jpg", title: "Набор для девушки 337", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 338, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9de0f793-0a90-4122-ae8f-3cbf402bc624.jpg", title: "Набор для девушки 338", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 339, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/771ce3c3-ef65-4962-a544-96757b819246.jpg", title: "Набор для девушки 339", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 340, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e86345b8-54da-4548-b385-cd4d00fe9244.jpg", title: "Набор для девушки 340", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 341, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/513378ab-f312-4960-b598-316e5f6fbe6d.jpg", title: "Набор для девушки 341", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 342, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/29002055-6e57-4c60-9abc-c361f9f8dfef.jpg", title: "Набор для девушки 342", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 343, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/0ce6ce14-e42a-468b-9fda-182ce72218d4.jpg", title: "Набор для девушки 343", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 344, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/28eb5ae7-3de9-44b5-b3b1-9ea3f6249e91.jpg", title: "Набор для девушки 344", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 345, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c879f406-0e55-498d-9346-c1037bf075ef.jpg", title: "Набор для девушки 345", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 346, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1d951447-a2d7-4321-98ae-31e278bd09b7.jpg", title: "Набор для девушки 346", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 347, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f3410b1d-4bef-40ea-b7d7-cf3dc42af4f3.jpg", title: "Набор для девушки 347", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 348, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b1ee5819-ad30-4f0b-ac26-521ce89c99fb.jpg", title: "Набор для девушки 348", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 349, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/673b2240-534f-4e62-b9d4-a657890d2be5.jpg", title: "Набор для девушки 349", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
    { id: 350, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c93d7fdb-48d6-4614-8167-e68ba6ac25bc.jpg", title: "Набор для девушки 350", description: "Красивая композиция из шаров на день рождения.", price: "1 500 ₽", priceNum: 1500, colors: ["pink"], subcategory: "girl" },
  ],
  man: [
    { id: 5, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/66fd2a4c-a22c-4717-8995-bdd2ec581332.jpg", title: "Набор для мужчины 5", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 6, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/492be4c8-e1c9-4086-af13-a90da62cb5c5.jpg", title: "Набор для мужчины 6", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 7, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f5e51be1-3813-4c3c-ab24-38f23ad99861.jpg", title: "Набор для мужчины 7", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 8, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/01e7ae2d-2743-430b-a430-07f040a6c6dc.jpg", title: "Набор для мужчины 8", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 9, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/800dd386-d12f-4ad8-9efd-8f5ec69d18df.jpg", title: "Набор для мужчины 9", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 10, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b3bd6c91-c75c-4b53-a2eb-1f51d03b55fe.jpg", title: "Набор для мужчины 10", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 11, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d31b7e40-58dd-400d-8549-46b93da1df23.jpg", title: "Набор для мужчины 11", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 12, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5521286d-5b01-4d03-bf0b-93f664ea1296.jpg", title: "Набор для мужчины 12", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 13, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3be29414-41b1-4b07-bd26-e687d4c7370d.jpg", title: "Набор для мужчины 13", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 14, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/af1e4c0c-5e59-4d21-96b2-b196b5c627c4.jpg", title: "Набор для мужчины 14", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 15, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/56eca436-d44e-44ae-9fe7-f4f720405054.jpg", title: "Набор для мужчины 15", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 16, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b5897295-4ea0-47c2-9621-3e4b39939556.jpg", title: "Набор для мужчины 16", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 17, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/682094a2-62e8-41c7-86e3-5d00f74eb77f.jpg", title: "Набор для мужчины 17", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 18, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/007436f9-3ff1-4e18-81c0-b23a9ca17762.jpg", title: "Набор для мужчины 18", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 19, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2176def4-3d99-4bd1-85e8-3a2a99344a4f.jpg", title: "Набор для мужчины 19", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 20, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/401584f4-24db-4789-a4d2-d0d50b4b4244.jpg", title: "Набор для мужчины 20", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 21, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/81b9012a-8649-4f5d-839b-2d867c24d61e.jpg", title: "Набор для мужчины 21", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 22, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f235c28e-c987-4433-ba8b-62cc55fb8bfc.jpg", title: "Набор для мужчины 22", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 23, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/242c22e8-51d8-4bad-9fe5-e62457f014a0.jpg", title: "Набор для мужчины 23", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 24, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8ebbc792-96fd-48f0-b370-4df22815633f.jpg", title: "Набор для мужчины 24", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 25, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6795110b-0881-4a9d-b773-c6629e39b0d5.jpg", title: "Набор для мужчины 25", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 26, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1765ff60-d1d3-44dd-9814-92e0a6c588ee.jpg", title: "Набор для мужчины 26", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 27, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d85eea34-88cc-4955-baa8-00e90ad3464c.jpg", title: "Набор для мужчины 27", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 28, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/46545d6e-1a2f-4c8d-9685-e11b04afcdc1.jpg", title: "Набор для мужчины 28", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 29, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b4ab50e1-fbd3-4219-b7cb-29abda553581.jpg", title: "Набор для мужчины 29", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 30, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b28afa88-9844-4d85-81ee-534a3a348d6f.jpg", title: "Набор для мужчины 30", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 31, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9847c4b4-9ff2-4a43-8d04-03afcbc3682e.jpg", title: "Набор для мужчины 31", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 32, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b134a123-48d2-4400-8ea8-c291557e9d45.jpg", title: "Набор для мужчины 32", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 33, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/76f8d104-34e5-48d9-a0fa-821c029db554.jpg", title: "Набор для мужчины 33", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 34, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ae73899b-aa5f-44e4-bf86-0d065e3de049.jpg", title: "Набор для мужчины 34", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 35, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/50f32814-45e7-44b9-80dd-bb720c6c55e8.jpg", title: "Набор для мужчины 35", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 36, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1626daf1-c90a-4eef-9008-9c629c984656.jpg", title: "Набор для мужчины 36", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 37, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c2e5ffda-501d-494f-9941-e2e8ccae128a.jpg", title: "Набор для мужчины 37", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 38, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/99637f5b-9824-40c3-a689-bbd44fc20c91.jpg", title: "Набор для мужчины 38", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 39, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2e268027-7388-4441-9ae4-db384eaf93de.jpg", title: "Набор для мужчины 39", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 40, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a98f73db-8dc6-4e57-9b99-cb343319706d.jpg", title: "Набор для мужчины 40", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 41, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/42f0e39c-c072-4c53-8e1d-586fe2efd724.jpg", title: "Набор для мужчины 41", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 42, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/dfb1ec73-a849-47b0-a73a-42989feb0cea.jpg", title: "Набор для мужчины 42", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 43, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/cc80c382-c22e-4e46-a28d-9fc08999e85a.jpg", title: "Набор для мужчины 43", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 44, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/846044d2-2e88-493e-a4c7-9c7561ad6bb7.jpg", title: "Набор для мужчины 44", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 45, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ba35447e-1cb2-4596-845a-8c55fd269770.jpg", title: "Набор для мужчины 45", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 46, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/64e6ff23-2eb9-4bbd-b33d-b049e743c3a9.jpg", title: "Набор для мужчины 46", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 47, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5679148e-d3ce-4432-99ba-8f1d05461175.jpg", title: "Набор для мужчины 47", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 48, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d43112a4-9f99-4461-a889-16c45b6983bc.jpg", title: "Набор для мужчины 48", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 49, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/fcbe0c7d-a975-42f8-8893-a3655faefcea.jpg", title: "Набор для мужчины 49", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 50, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6c6e9f29-c451-4eaf-be0d-6637f3bbc4ea.jpg", title: "Набор для мужчины 50", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 51, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/25a04e01-ee95-4397-863c-c0a78ad53f89.jpg", title: "Набор для мужчины 51", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 52, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9e300895-51ea-4f2c-b9f1-bb24fb93c813.jpg", title: "Набор для мужчины 52", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 53, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/25331d5e-d168-43ff-8c2b-73be3ab7b7f2.jpg", title: "Набор для мужчины 53", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 54, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7e5b801d-5077-4bf3-ac05-05c711a43a6c.jpg", title: "Набор для мужчины 54", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 55, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4234a401-d3d7-4683-ad1a-ccd62ac632a7.jpg", title: "Набор для мужчины 55", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 56, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/154d10c8-dcf7-4e33-ae57-f20f5fdae899.jpg", title: "Набор для мужчины 56", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 57, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6a0af2cb-0033-4546-94ec-55f5fb5b6e96.jpg", title: "Набор для мужчины 57", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 58, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/afccfca1-7d75-496a-bc07-c4c3ff9aac1b.jpg", title: "Набор для мужчины 58", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 59, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ca209889-45e2-413c-ac46-a135ebdf76af.jpg", title: "Набор для мужчины 59", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 60, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b5609b4e-55aa-4514-b7a1-f16ecc0cc418.jpg", title: "Набор для мужчины 60", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 61, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/edf48792-87ab-40dd-a10a-5033f1557a70.jpg", title: "Набор для мужчины 61", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 62, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3dea611b-8f2a-4405-ac95-08abdf629394.jpg", title: "Набор для мужчины 62", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 63, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ad3e1ff6-26fa-4c5a-ba33-6cc69eb566c1.jpg", title: "Набор для мужчины 63", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 64, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/cab8514a-3054-482e-82e2-e6bf7ea89add.jpg", title: "Набор для мужчины 64", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 65, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a92c49c8-3b40-4860-a13b-e53b42ebda98.jpg", title: "Набор для мужчины 65", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 66, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/de7d217c-d21f-44b8-9241-6152ffc0ac72.jpg", title: "Набор для мужчины 66", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 67, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e29a42c4-e8be-46f8-9e78-3fa2c682208c.jpg", title: "Набор для мужчины 67", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 68, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d77e909f-f77e-4530-82b3-a05641a6bd89.jpg", title: "Набор для мужчины 68", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 69, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e8c53c00-7616-4dff-aff5-e1fe21733882.jpg", title: "Набор для мужчины 69", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 70, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2fe01970-2f3d-4474-a86b-c2ae0cadf883.jpg", title: "Набор для мужчины 70", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 71, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/504e5462-e350-4d34-87ee-f201f8faa7d0.jpg", title: "Набор для мужчины 71", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 72, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/185fa6bd-47a2-4dff-8783-13a9e03ea497.jpg", title: "Набор для мужчины 72", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 73, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/add5a0f4-c684-499f-b819-5c0faf0f47d8.jpg", title: "Набор для мужчины 73", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 74, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/13e052d7-ee7c-4a5b-ad80-6e420993b0e2.jpg", title: "Набор для мужчины 74", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 75, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b99fa0cb-9126-48e6-b9dd-0800c57bf9a1.jpg", title: "Набор для мужчины 75", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 76, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a7efecd5-69aa-43dc-a1b8-a37d4ad81619.jpg", title: "Набор для мужчины 76", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 77, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7e612189-22aa-42d8-a4ae-a3ff06bdd372.jpg", title: "Набор для мужчины 77", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 78, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3d588561-c286-4fa2-a088-96d466a62d03.jpg", title: "Набор для мужчины 78", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 79, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1c646a95-d8aa-43ad-82a3-8164292c76a4.jpg", title: "Набор для мужчины 79", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 80, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d616fd44-b3b8-4bb7-a22d-5371d65ea2be.jpg", title: "Набор для мужчины 80", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 81, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a784bd9c-e094-4338-a439-d5d52ce7e2e3.jpg", title: "Набор для мужчины 81", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 82, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4c003f32-ad53-4707-a460-6eb958569dd2.jpg", title: "Набор для мужчины 82", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 83, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/502dafee-e407-4215-9fe9-8cb6582f065f.jpg", title: "Набор для мужчины 83", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 84, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d977649a-5bb3-45c6-a698-7788700a044d.jpg", title: "Набор для мужчины 84", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 85, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a8bfb14f-cada-4ec4-8764-36478dcda45f.jpg", title: "Набор для мужчины 85", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 86, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/24f42124-d9b0-486b-bcf5-4c8e079c0c22.jpg", title: "Набор для мужчины 86", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 87, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/89c7d44d-c852-45c1-a076-41ab0afc9cae.jpg", title: "Набор для мужчины 87", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 88, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2be56d36-4ab6-4912-b56b-7a2b53779d34.jpg", title: "Набор для мужчины 88", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 89, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6a37fae0-321d-4364-b4f1-36018b68e6e0.jpg", title: "Набор для мужчины 89", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 90, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/68a796bf-a93a-4fdf-b049-3ed3058c0a00.jpg", title: "Набор для мужчины 90", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 91, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/49d12654-c303-4562-98eb-dcce18868e00.jpg", title: "Набор для мужчины 91", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 92, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ce13ebb1-d0fa-4d85-bd01-13b9fd5e2024.jpg", title: "Набор для мужчины 92", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 93, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7ceae0e7-ecc3-4aad-8fcb-f61850b00d01.jpg", title: "Набор для мужчины 93", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 94, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b918cfc0-bad3-41aa-8113-17518faa0c73.jpg", title: "Набор для мужчины 94", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 95, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/29a8a9e3-5591-44a7-83c4-94015c2cf161.jpg", title: "Набор для мужчины 95", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 96, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e69330a5-a4f9-4e89-a51e-ea064d76f776.jpg", title: "Набор для мужчины 96", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 97, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a3e59f75-fc9c-4954-88a6-4418142021be.jpg", title: "Набор для мужчины 97", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 98, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2ac6491e-1bde-4ab4-894d-8d5c8d20bdfb.jpg", title: "Набор для мужчины 98", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 99, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/209fe676-7c06-406f-9ba4-87e492647103.jpg", title: "Набор для мужчины 99", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 100, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/41fa86ae-d271-4af0-8bf6-f0b990039e8b.jpg", title: "Набор для мужчины 100", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 101, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/465ed639-8c12-4ca6-8cc1-9299307a0a1b.jpg", title: "Набор для мужчины 101", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 102, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/bcdac707-8431-47a0-afb0-1e6eea5a5584.jpg", title: "Набор для мужчины 102", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 103, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/62e1fbc1-ea52-41b3-9714-e5b62df28c35.jpg", title: "Набор для мужчины 103", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 104, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5db792ea-8782-4f3c-8b28-e5ef70b60ad0.jpg", title: "Набор для мужчины 104", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 105, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/86d45af8-95ef-410c-92bf-ac3992ffc4b2.jpg", title: "Набор для мужчины 105", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 106, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7113f2f1-58ef-47ba-848d-09edf5a11f62.jpg", title: "Набор для мужчины 106", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 107, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c8c53a17-bb13-4049-be0b-7e9cd9bd7a92.jpg", title: "Набор для мужчины 107", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 108, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5db62822-b022-4ad3-98f0-5f1a62a2893f.jpg", title: "Набор для мужчины 108", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 109, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/77049265-72b3-4e01-8b7d-b38882d8e28c.jpg", title: "Набор для мужчины 109", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 110, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/951fe81d-9289-4d78-a7a4-e70707cd79a6.jpg", title: "Набор для мужчины 110", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 111, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7b8009ce-fde3-4ac4-a421-0936f4f204aa.jpg", title: "Набор для мужчины 111", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 112, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c6100ec8-33a4-4d72-a94b-2da39f17113b.jpg", title: "Набор для мужчины 112", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 113, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f714b8b5-5b28-4192-932e-150ee34af3ce.jpg", title: "Набор для мужчины 113", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 114, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e1d4aab0-ac85-4f0b-9da5-f5211d55241a.jpg", title: "Набор для мужчины 114", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 115, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b1dbcc8f-5753-4481-8901-309e8965bc4d.jpg", title: "Набор для мужчины 115", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 116, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b2f09a18-f58e-42aa-b0f7-ab95e8cef52a.jpg", title: "Набор для мужчины 116", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 117, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/57a28346-86a3-4a5a-b0da-980c3f3940ac.jpg", title: "Набор для мужчины 117", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 118, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/09d49c53-8ed7-4b26-9294-50fde63da295.jpg", title: "Набор для мужчины 118", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 119, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/48da3438-5bd4-4cdc-acbb-08393cc8ea56.jpg", title: "Набор для мужчины 119", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 120, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6a9e9bcf-6df0-4933-abcd-195a06e43574.jpg", title: "Набор для мужчины 120", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 121, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3c3f0367-1638-4c6a-9cbf-bac529085ac3.jpg", title: "Набор для мужчины 121", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 122, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/cd1504de-4e8e-49b6-84ff-aa630d5299e9.jpg", title: "Набор для мужчины 122", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 123, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ac2a4b06-0746-4e3b-9785-a3ccc05fd5e6.jpg", title: "Набор для мужчины 123", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 124, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/bc677dfb-90ff-4e48-80e8-079cdf9d3b27.jpg", title: "Набор для мужчины 124", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 125, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6d162e73-5f15-4cbc-9922-189da7cda06a.jpg", title: "Набор для мужчины 125", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 126, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/12a1aa90-6dcb-4971-bb2d-83fdb361e66f.jpg", title: "Набор для мужчины 126", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 127, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/828d760f-2390-4b68-be75-22fbf36193d4.jpg", title: "Набор для мужчины 127", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 128, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2fc75f2f-0207-4002-8cdc-b59c51286456.jpg", title: "Набор для мужчины 128", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 129, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/051b0fa4-94c1-4f39-a660-d94e6c5159cd.jpg", title: "Набор для мужчины 129", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 130, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/eb3470e3-f103-4e2a-b026-2f73c9dbb156.jpg", title: "Набор для мужчины 130", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 131, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7a0cade1-5a05-42ae-9225-43a400d00b9f.jpg", title: "Набор для мужчины 131", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 132, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e13d89db-df23-48a8-b748-b3ae6819b5cc.jpg", title: "Набор для мужчины 132", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 133, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2555053e-96e1-4c4f-b6fd-4a1b7ac61a90.jpg", title: "Набор для мужчины 133", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 134, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d0966f5d-3363-4496-b76a-9486e90dbfe2.jpg", title: "Набор для мужчины 134", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 135, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4172d68c-c4f9-4398-b205-3ecdfd88c8f5.jpg", title: "Набор для мужчины 135", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 136, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f7e8f0e1-f86c-4aaa-91a8-a829984c0983.jpg", title: "Набор для мужчины 136", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 137, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d3697ef2-b1da-4dd2-a5ec-52b2ebbdbdcb.jpg", title: "Набор для мужчины 137", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 138, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/07f42d87-55af-42c7-8213-e2d44e730d41.jpg", title: "Набор для мужчины 138", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 139, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8f4afc2f-e1ea-4650-9007-5313b677f097.jpg", title: "Набор для мужчины 139", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 140, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/09511e79-e8a8-40b2-a54a-b66786d487de.JPG", title: "Набор для мужчины 140", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 141, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7aa5f6d6-f62e-4ad2-abcd-4cbda18704f9.JPG", title: "Набор для мужчины 141", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 142, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/204bfdf3-7400-42c3-85f5-0b6e0de3d40d.JPG", title: "Набор для мужчины 142", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 143, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/99d76295-9344-4334-bb9b-ae1ee1cec464.JPG", title: "Набор для мужчины 143", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 144, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e5ddd90c-271c-400f-87a3-0b47d66d9623.JPG", title: "Набор для мужчины 144", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 145, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3f5b97f9-5e3a-4323-b847-0c0e0ec7d96b.JPG", title: "Набор для мужчины 145", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 146, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/421f2759-3fa7-431a-a536-ceef4eb4487d.JPG", title: "Набор для мужчины 146", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 147, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/bbe8e17f-482c-4c1c-962d-38f65c1e20e4.jpg", title: "Набор для мужчины 147", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 148, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f4e58fe7-4d5e-4730-acd2-e2cd1eb39453.jpg", title: "Набор для мужчины 148", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 149, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c4c30e31-5c49-41f9-8c37-ed0edaec98c0.jpg", title: "Набор для мужчины 149", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 150, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e22c2bf2-594c-45bf-82bb-432bf62cd2f6.jpg", title: "Набор для мужчины 150", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 151, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d4e4c9b3-1e87-4d6c-a88a-f6033df6d56b.jpg", title: "Набор для мужчины 151", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 152, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/11b025c1-7685-452e-86b2-c771e8ad39c9.jpg", title: "Набор для мужчины 152", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 153, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c70b2cb5-60dd-4768-a121-d0d34b0521f9.jpg", title: "Набор для мужчины 153", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 154, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/83625ada-9170-4c40-9b3c-876ff24d5d51.jpg", title: "Набор для мужчины 154", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 155, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/02eba868-4eb9-4fd2-993e-b584259386a4.jpg", title: "Набор для мужчины 155", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 156, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b5fd70eb-c734-49b2-b684-a5351b848d67.jpg", title: "Набор для мужчины 156", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 157, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4911f0b9-8799-411b-bb14-2c6efe22b48e.jpg", title: "Набор для мужчины 157", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 158, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b7c89263-36f4-48d0-a147-bb89b27244b2.jpg", title: "Набор для мужчины 158", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 159, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f66b823d-c341-4f07-bb7f-ccd8cbb5e6d9.jpg", title: "Набор для мужчины 159", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 160, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/196d7457-5787-4977-af2b-3294492d535d.jpg", title: "Набор для мужчины 160", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 161, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/19c46155-7abd-450a-8a6e-3ecd26c3115c.jpg", title: "Набор для мужчины 161", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 162, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4f39fed4-fed0-4039-89b4-c4c414d37612.jpg", title: "Набор для мужчины 162", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 163, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/58bb1e5b-f8cd-4184-b133-388177cf46b1.jpg", title: "Набор для мужчины 163", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 164, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e5fe32d4-4736-417e-a8ad-3b33e2a35cce.jpg", title: "Набор для мужчины 164", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 165, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/363df554-0c57-4749-9ccf-ca3895ab8905.jpg", title: "Набор для мужчины 165", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 166, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/76d34171-7cd9-46a9-9efe-9ca3b840d7c8.jpg", title: "Набор для мужчины 166", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 167, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/820d9007-fb93-4bd5-a9f1-2edf74a8b781.jpg", title: "Набор для мужчины 167", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 168, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1dc8babb-4c25-4087-841a-cf565a1228fc.jpg", title: "Набор для мужчины 168", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 169, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7cb85622-3253-412b-a8d1-ff2c3f06e809.jpg", title: "Набор для мужчины 169", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 170, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6d341f6c-b3de-465e-a561-630bdeaeaef0.jpg", title: "Набор для мужчины 170", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 171, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a4c18351-712f-4a15-8ce0-4339030b8948.jpg", title: "Набор для мужчины 171", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 172, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/69b48624-1a7c-41ea-ac18-82d880ac6313.jpg", title: "Набор для мужчины 172", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 173, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7a25a2c7-2fb7-4211-bbb7-efb84887e8da.jpg", title: "Набор для мужчины 173", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 174, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/90d1b9fd-c201-4b2a-9ffc-76a47193af16.jpg", title: "Набор для мужчины 174", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 175, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c4354acf-a582-4ae0-925b-53b04e2ebc68.jpg", title: "Набор для мужчины 175", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 176, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/0d1023f8-977a-4ebc-ae6c-de35e5ef8b85.jpg", title: "Набор для мужчины 176", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 177, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6acb37af-4000-44ba-ad47-1182cc4cd88e.png", title: "Набор для мужчины 177", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 178, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/eb7c5fe7-48b2-40c3-8951-672823d3ed4c.jpg", title: "Набор для мужчины 178", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 179, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/86dbc87a-81dc-421e-b552-8d6da2a84a09.jpg", title: "Набор для мужчины 179", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 180, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/51b8db8e-092f-4abe-965e-00e64d660537.jpg", title: "Набор для мужчины 180", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 181, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ddbd0621-eb5c-4209-811c-1afe8ac14867.jpg", title: "Набор для мужчины 181", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 182, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a243f4e8-e82a-453e-be5a-125b71880d57.jpg", title: "Набор для мужчины 182", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 183, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/11829b1a-2173-4f97-8550-7a9cdd416ed3.jpg", title: "Набор для мужчины 183", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 184, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ff3dd453-702a-4c6b-9686-f1f75055caaa.jpg", title: "Набор для мужчины 184", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 185, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/52da3fc4-a359-4091-9de3-e2f1515fc35e.jpg", title: "Набор для мужчины 185", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 186, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/166e2e5e-dd0b-41a8-bcdc-aa545af92803.jpg", title: "Набор для мужчины 186", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 187, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/09efb7a5-eb73-4cdb-9056-b9bf61c74ff6.jpg", title: "Набор для мужчины 187", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 188, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c2766248-8f76-4b80-8d4f-b7f7e0b4f441.jpg", title: "Набор для мужчины 188", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 189, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/0eae7d4d-bab5-4d46-a13d-034ad6cb0120.jpg", title: "Набор для мужчины 189", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 190, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1355272f-3c17-4a1b-9228-c309da82d4c8.jpg", title: "Набор для мужчины 190", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 191, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/476e67bf-44e9-49c5-bf99-462d2bb428e7.jpg", title: "Набор для мужчины 191", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 192, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/cd9d9cc9-1975-48f0-981d-6403bbc52e3b.jpg", title: "Набор для мужчины 192", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 193, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6ad392e3-d866-407d-8a14-bc6fb80df0ef.jpg", title: "Набор для мужчины 193", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 194, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/cb9a2175-1b88-4bb2-b249-16b2083c4711.jpg", title: "Набор для мужчины 194", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 195, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a2d4fdb8-f2a7-4d36-ab3a-bf230652bb83.jpg", title: "Набор для мужчины 195", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 196, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9e859e16-944d-442c-bfa4-1a57e7b412c2.jpg", title: "Набор для мужчины 196", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 197, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/0a2c688f-f250-4cc7-a450-08371d10d61f.jpg", title: "Набор для мужчины 197", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 198, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7b5ce09b-aabb-44f0-a1b1-1825f36ef1c2.jpg", title: "Набор для мужчины 198", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 199, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b7eef4e0-8f7e-455b-9d9e-baccc3762e0e.jpg", title: "Набор для мужчины 199", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 200, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/372568fe-d02c-4b64-bb64-e1fbbd6b4840.jpg", title: "Набор для мужчины 200", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 201, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/659d4ed3-60f5-411c-a8a0-60aacf873915.jpg", title: "Набор для мужчины 201", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 202, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4e837af0-2465-4175-ae36-a796e26bd37f.jpg", title: "Набор для мужчины 202", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 203, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/593060f3-0018-44b5-bbd7-20aae02e596a.jpg", title: "Набор для мужчины 203", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 204, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5d8e4b53-dc44-471c-8750-79cf21d64726.jpg", title: "Набор для мужчины 204", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 205, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8daf317a-b249-41d3-a624-d63ccf5a117c.jpg", title: "Набор для мужчины 205", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 206, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/756d4fc0-d0bf-41be-81bf-eedea460ee3c.jpg", title: "Набор для мужчины 206", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 207, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/42af32aa-df35-4a3f-87a0-c54c424164cd.jpg", title: "Набор для мужчины 207", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 208, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4a3d05e6-7ed3-4872-b202-b3553d66d32e.jpg", title: "Набор для мужчины 208", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 209, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/709e8a58-1e41-483c-bf3a-f2020e504b0e.jpg", title: "Набор для мужчины 209", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 210, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9685c1e4-24e1-4dc0-806f-4fb990caf2af.jpg", title: "Набор для мужчины 210", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 211, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b16af6ab-f631-4303-9abd-afc9f2a7d65b.jpg", title: "Набор для мужчины 211", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 212, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8ac68cca-ce62-4872-af7c-6e53618e1823.jpg", title: "Набор для мужчины 212", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 213, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4075a45b-234c-4097-957a-a106cb9de131.jpg", title: "Набор для мужчины 213", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 214, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/50d94544-746d-4c8a-a1a4-646090ce53b2.jpg", title: "Набор для мужчины 214", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 215, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4fd33cf8-c610-4895-9fce-98536a8980a5.jpg", title: "Набор для мужчины 215", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 216, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f78023b2-ac84-4cf7-af84-6b87684497c9.jpg", title: "Набор для мужчины 216", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 217, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/004b6465-564a-4f62-a30b-eba340201691.jpg", title: "Набор для мужчины 217", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 218, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/cd25de3e-3c77-484d-82e0-f75c594ab9c4.jpg", title: "Набор для мужчины 218", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 219, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/bc5476e7-814a-4711-a14f-1f9daa6e0c1b.jpg", title: "Набор для мужчины 219", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 220, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/26f471f9-326b-4cde-8af1-2027656e7bd8.jpg", title: "Набор для мужчины 220", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 221, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/29a89100-961a-4f01-90c3-e92a994bd8a1.jpg", title: "Набор для мужчины 221", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 222, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4ea3df42-8f8c-4d31-9855-3c498ac51091.jpg", title: "Набор для мужчины 222", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 223, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b49f5aed-70be-48d1-a1b9-94a1e15025c1.jpg", title: "Набор для мужчины 223", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 224, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/23427dbf-fa69-4450-b984-d0fae53e3a88.jpg", title: "Набор для мужчины 224", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 225, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/68bf9041-6a2c-4842-93d8-ba2c34f3b35a.jpg", title: "Набор для мужчины 225", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
    { id: 226, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ec0603c4-5f79-4860-aa23-dba5fdfb309e.jpg", title: "Набор для мужчины 226", description: "Шары для мужчины.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "black", "silver"], subcategory: "man" },
  ],
  boy: [
    { id: 1, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2387543c-fb63-44bd-9958-ace88271f647.jpg", title: "Набор для мальчика 1", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 2, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1fe034b2-813c-43a3-adfc-8d7bf944204b.jpg", title: "Набор для мальчика 2", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 3, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e2518833-c73f-4377-8dff-cd9099189ea2.jpg", title: "Набор для мальчика 3", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 4, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/99bdee3b-5a52-41c6-8627-d131d2a5392a.jpg", title: "Набор для мальчика 4", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 5, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/76c876c4-614f-4868-9130-65c236898921.jpg", title: "Набор для мальчика 5", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 6, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c7b78983-1f63-46d2-bebc-96575c5480ad.jpg", title: "Набор для мальчика 6", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 7, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/157742de-5187-48b3-9d2d-526fe2a34253.jpg", title: "Набор для мальчика 7", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 8, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f6283705-e06a-4663-87e5-0f00ffe3fc66.jpg", title: "Набор для мальчика 8", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 9, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4a301c00-1159-4b25-bc71-f8efc4f9b413.jpg", title: "Набор для мальчика 9", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 10, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/79fb689c-eb5c-4104-9400-2619bd87baa8.jpg", title: "Набор для мальчика 10", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 11, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5fea67f2-41d2-44b9-ab6c-8f4e88aeffac.jpg", title: "Набор для мальчика 11", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 12, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/097880d6-2618-4a02-8e79-d16a2ca733ff.jpg", title: "Набор для мальчика 12", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 13, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8d4f205b-a2be-4fa0-b1d2-36f557c583c2.jpg", title: "Набор для мальчика 13", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 14, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/dfb3e3b5-9788-44e8-b9e0-7e744b1a16ed.jpg", title: "Набор для мальчика 14", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 15, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4b4279a4-e700-4107-99ac-e2ad5717b991.jpg", title: "Набор для мальчика 15", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 16, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e836349a-c8f6-44f4-bb2d-61039a8591d4.jpg", title: "Набор для мальчика 16", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 17, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a4a6addf-b6c3-40f1-90b7-d8189a16af84.jpg", title: "Набор для мальчика 17", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 18, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9af6ac53-e346-4e53-b5fd-69b39bb3da46.jpg", title: "Набор для мальчика 18", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 19, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/93cc7183-1932-4ea9-bad1-d5bc31fa34e2.jpg", title: "Набор для мальчика 19", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 20, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c0cdddc2-bb76-4255-8485-48f1a7f4d296.jpg", title: "Набор для мальчика 20", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 21, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3d1307f3-c114-4c4a-9268-1cc4ea1603d8.jpg", title: "Набор для мальчика 21", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 22, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9068fbe4-2d6d-40cf-9ea9-af8de52d5cf1.jpg", title: "Набор для мальчика 22", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 23, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/33246776-9aa7-4ab6-9be1-9973708478fd.jpg", title: "Набор для мальчика 23", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 24, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c4d1f259-c697-456f-845c-c194c5997fbf.jpg", title: "Набор для мальчика 24", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 25, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f9af8f31-de18-42e2-9553-9eb20836fe37.jpg", title: "Набор для мальчика 25", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 26, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b93cca7e-fc80-46df-9121-9ef4b90c9b4b.jpg", title: "Набор для мальчика 26", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 27, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b33d743e-89c8-4e09-8bf6-2dc2ae4d5be3.jpg", title: "Набор для мальчика 27", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 28, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/64a9d829-2383-40ce-af9d-48da7a88b28e.jpg", title: "Набор для мальчика 28", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 29, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/80dc25ce-7bbd-44a9-8fc7-256429fcbca1.jpg", title: "Набор для мальчика 29", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 30, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/889d78c9-164b-4969-81ff-a88dc46b8984.jpg", title: "Набор для мальчика 30", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 31, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/45af28a9-df69-4eb3-95fb-9806c5e32ede.jpg", title: "Набор для мальчика 31", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 32, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7d489772-8bb6-4a1d-81bf-44a485d9bbfd.jpg", title: "Набор для мальчика 32", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 33, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9cb4bf76-8243-4e88-b45a-969ea09b2da4.jpg", title: "Набор для мальчика 33", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 34, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/76af6e5f-a02f-4273-bb5b-abf9288b0791.jpg", title: "Набор для мальчика 34", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 35, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c4df955d-023a-4f89-ac9d-16f1d973b3a2.jpg", title: "Набор для мальчика 35", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 36, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/02bb2d9c-6d3f-47d5-8498-4673f154e268.jpg", title: "Набор для мальчика 36", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 37, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/bc708991-c14f-43ec-9bcd-a08a7045ef2d.jpg", title: "Набор для мальчика 37", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 38, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c9fccf74-95ed-494d-a57a-ec2285eff9b6.jpg", title: "Набор для мальчика 38", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 39, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/81d85c26-f292-4c81-8302-c349e7ca3ece.jpg", title: "Набор для мальчика 39", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 40, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b5750a9b-3da6-467f-8d0f-7ca19b60de61.jpg", title: "Набор для мальчика 40", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 41, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f2fe3727-107d-4377-b388-504311c90495.jpg", title: "Набор для мальчика 41", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 42, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/96f1ab6c-cff0-47b4-aa1e-a9522190f53e.jpg", title: "Набор для мальчика 42", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 43, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9a0eb764-d735-4f4a-9ac9-18564d88d1ab.jpg", title: "Набор для мальчика 43", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 44, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5b7c6fef-91d7-4a3a-9d5f-7ed255e9c596.jpg", title: "Набор для мальчика 44", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 45, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ebbe7905-bc6c-40ee-8f1e-8a1a430bd3f3.jpg", title: "Набор для мальчика 45", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 46, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/75b3716b-7433-4150-b7b5-72e90ec4e939.jpg", title: "Набор для мальчика 46", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 47, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5d48b408-691f-45fe-a33b-03746e81aa05.jpg", title: "Набор для мальчика 47", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 48, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/abf279bc-1bc4-4724-bf31-ca3bbf94d475.jpg", title: "Набор для мальчика 48", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 49, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1bed58dc-274e-45ec-9c16-1f7daea715c5.jpg", title: "Набор для мальчика 49", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 50, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f282ce7a-219f-4ce6-95ce-d1bb0e83331c.jpg", title: "Набор для мальчика 50", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 51, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e26c6f06-a79c-4521-bb8c-1933e446fb95.jpg", title: "Набор для мальчика 51", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 52, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/773b72c4-9d5c-4ea0-be81-1e2a5d7c176b.jpg", title: "Набор для мальчика 52", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 53, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/514c84d1-d7d7-4d11-8ee1-1c00358927b4.jpg", title: "Набор для мальчика 53", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 54, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9ddfe5b0-83bd-458a-8413-40f12b7d4576.jpg", title: "Набор для мальчика 54", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 55, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/860c1d2e-faa1-4c68-a7a3-49d0c82a6087.jpg", title: "Набор для мальчика 55", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 56, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/52df6e2c-0b22-4b4d-9957-359ba2ff3b5d.jpg", title: "Набор для мальчика 56", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 57, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/41de9b49-329e-456c-88d0-09b6f5059ffb.jpg", title: "Набор для мальчика 57", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 58, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e160f8c1-3197-4b37-9f77-af81df5e1d82.jpg", title: "Набор для мальчика 58", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 59, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5ce3ed90-01da-4a3b-833b-6dc031cef609.jpg", title: "Набор для мальчика 59", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 60, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a9343c6b-8d6b-406e-a862-25293f8508c2.jpg", title: "Набор для мальчика 60", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 61, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5ca558ae-881d-40ff-bfec-28c9089ddbc1.jpg", title: "Набор для мальчика 61", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 62, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2a614401-95f9-483a-beaa-95dca363ebd4.jpg", title: "Набор для мальчика 62", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 63, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1cc96345-a152-461d-821d-d97af54a65e7.jpg", title: "Набор для мальчика 63", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 64, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e3a7a2f1-383b-4bac-aa4d-558ec7396ac0.jpg", title: "Набор для мальчика 64", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 65, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/0fe00fdb-1d6c-427b-ba61-467825b5af55.jpg", title: "Набор для мальчика 65", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 66, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a627e9f2-d1e5-49b8-8735-dc9d41fb040b.jpg", title: "Набор для мальчика 66", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 67, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/24a38286-0795-46e5-8fb2-d58489dcf00b.jpg", title: "Набор для мальчика 67", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 68, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e19a74eb-f33f-4a70-97ad-b44db51d21b6.jpg", title: "Набор для мальчика 68", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 69, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ca8aba27-229a-4db9-8380-9630930107f2.jpg", title: "Набор для мальчика 69", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 70, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/fe050f0b-1016-48ab-aa93-14f09808e806.jpg", title: "Набор для мальчика 70", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 71, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/917f2b19-2a0e-4143-a3d5-74636c9d4b73.jpg", title: "Набор для мальчика 71", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 72, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6a8c67e7-1e63-4a3f-ad97-973f4f8003fc.jpg", title: "Набор для мальчика 72", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 73, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4b1c6c75-ac3f-4af5-9dbd-d47bbbff1f49.jpg", title: "Набор для мальчика 73", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 74, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f50b118b-cb9d-44a4-84dc-3a7c3c38f272.jpg", title: "Набор для мальчика 74", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 75, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ac9b4744-1619-482d-a9e4-87e72c34bc83.jpg", title: "Набор для мальчика 75", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 76, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a1fb30f1-debf-4dfd-b5b1-d076fb1f6d64.jpg", title: "Набор для мальчика 76", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 77, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/61c4072c-6651-4864-8f3e-e8a1916612e3.jpg", title: "Набор для мальчика 77", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 78, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a5fa4621-7b81-4e83-9b40-08a5360d852e.jpg", title: "Набор для мальчика 78", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 79, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/af224c55-052c-453e-8279-a4132a62a1f4.jpg", title: "Набор для мальчика 79", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 80, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a386cc51-1b07-4c59-ba74-59ef5a4e8194.jpg", title: "Набор для мальчика 80", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 81, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/0655708d-7abe-4d42-9f16-41e04ae325ec.jpg", title: "Набор для мальчика 81", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 82, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/35b3bf02-03ec-44bc-b14a-8021dd5aec13.jpg", title: "Набор для мальчика 82", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 83, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4b32bc25-db24-4941-9f01-09a4e47e3ca9.jpg", title: "Набор для мальчика 83", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 84, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/da908a30-b1d4-4e8d-b159-de907a709601.jpg", title: "Набор для мальчика 84", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 85, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/55824e7e-90dd-4642-b575-828de29aeff3.jpg", title: "Набор для мальчика 85", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 86, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5147b1c2-cf35-4e57-bfeb-ecf778816624.jpg", title: "Набор для мальчика 86", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 87, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3373a7bf-a6dc-4f50-a711-9fcd1a1be4a2.jpg", title: "Набор для мальчика 87", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 88, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8706c6e2-5912-443d-a6e6-017de26a3154.jpg", title: "Набор для мальчика 88", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 89, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8ed139aa-9003-4f2f-a9b0-fdfac0bd5d9f.jpg", title: "Набор для мальчика 89", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 90, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d2814471-65e1-484a-b12d-904de82fa01e.jpg", title: "Набор для мальчика 90", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 91, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3dfa781a-2fc2-463f-9a54-a1f5d5192144.jpg", title: "Набор для мальчика 91", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 92, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/aa197846-d88b-40fd-8707-4d3f434857f7.jpg", title: "Набор для мальчика 92", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 93, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e27ebd2d-d629-4f62-91d2-fb93973546e6.jpg", title: "Набор для мальчика 93", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 94, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a6e9b20e-7494-4146-9f28-b077487f8c7c.jpg", title: "Набор для мальчика 94", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 95, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/effd341b-efe8-4ab7-8b84-ab4752dccd69.jpg", title: "Набор для мальчика 95", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 96, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2c3b85d4-ee1f-42b8-8d0d-518072bd914d.jpg", title: "Набор для мальчика 96", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 97, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/378e55bb-e3df-42ab-8f36-61a8615f8157.jpg", title: "Набор для мальчика 97", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 98, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/890deeb2-e8c0-4b8e-8982-868c97dccaa6.jpg", title: "Набор для мальчика 98", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 99, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d4892c82-a623-48de-9526-09b78b938284.jpg", title: "Набор для мальчика 99", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 100, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3f4f11f6-eec6-4b3a-ad27-1c33c389d530.jpg", title: "Набор для мальчика 100", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 101, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/eb676868-5ecc-46b6-acdc-bae092c2703b.jpg", title: "Набор для мальчика 101", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 102, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3e7f877b-f4e6-44f8-925a-a93f2d58ded8.jpg", title: "Набор для мальчика 102", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 103, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5489f5de-5b73-4845-b2e7-4135dc415408.jpg", title: "Набор для мальчика 103", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 104, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/107c6450-e873-4a53-a862-e4ee3d65c7c4.jpg", title: "Набор для мальчика 104", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 105, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a2698703-87e3-4348-b388-39b0adb980a2.jpg", title: "Набор для мальчика 105", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 106, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1f30d991-8cbf-4c22-976e-5f6eab2bbea8.jpg", title: "Набор для мальчика 106", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 107, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/56268053-32a3-48c7-8e29-68f5293e8268.jpg", title: "Набор для мальчика 107", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 108, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d96eef23-bbd4-4be5-ae97-0e112908c9ed.jpg", title: "Набор для мальчика 108", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 109, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/90190030-5020-489f-9ed7-3d96ffc89bd6.jpg", title: "Набор для мальчика 109", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 110, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6857c979-9e1f-4337-a14e-71b8f6df54e7.jpg", title: "Набор для мальчика 110", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 111, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8f710ef9-94d2-46e0-b934-de34e5598ef3.jpg", title: "Набор для мальчика 111", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 112, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/0385bd94-d4d8-4bc8-9221-65e95187e3a4.jpg", title: "Набор для мальчика 112", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 113, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b4674c8c-0ad8-4de6-951d-a34169d10acf.jpg", title: "Набор для мальчика 113", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 114, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8c5f78fb-ae15-4b63-bf88-ea7e208e1a4d.jpg", title: "Набор для мальчика 114", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 115, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8141dfc2-37a6-4cce-8bdd-3f6c56280f9a.jpg", title: "Набор для мальчика 115", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 116, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/cb1ed094-ffdf-4278-a94b-bb63a467424a.jpg", title: "Набор для мальчика 116", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 117, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e9f8c0ae-36f6-4488-9b83-81c762ff002d.jpg", title: "Набор для мальчика 117", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 118, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/710c89c7-9d76-4df2-a924-4cef8e2196a3.jpg", title: "Набор для мальчика 118", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 119, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/efd9f830-8541-4f41-ac47-05d482495395.jpg", title: "Набор для мальчика 119", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 120, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/866f3516-c317-42ca-a469-3f24748db6c8.jpg", title: "Набор для мальчика 120", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 121, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e9ebfd06-18a4-4011-b0d8-97acc2553dec.jpg", title: "Набор для мальчика 121", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 122, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7702f3ea-9cda-4ad4-be77-9da4421e2dd2.jpg", title: "Набор для мальчика 122", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 123, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b46fcd39-7822-48a1-b6a9-a4f28a7bd230.jpg", title: "Набор для мальчика 123", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 124, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d53c0148-59c4-4a4d-8d3b-5f4b0801dc31.jpg", title: "Набор для мальчика 124", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 125, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ac9802e4-a841-4909-a60c-2e3ab0983071.jpg", title: "Набор для мальчика 125", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 126, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/59d7a44e-947b-4dbd-8bc5-7779dc18b1be.jpg", title: "Набор для мальчика 126", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 127, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/26ae761d-609c-410c-9fbb-c04d8123832c.jpg", title: "Набор для мальчика 127", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 128, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/efec68be-fa65-4649-86eb-ee7d3d1771b2.jpg", title: "Набор для мальчика 128", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 129, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7c99fdda-d982-47af-91d3-f0f7babb42d1.jpg", title: "Набор для мальчика 129", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 130, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ee677a2f-f1ed-4ec6-95e7-6b7c8878b9db.jpg", title: "Набор для мальчика 130", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 131, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/169a2cac-bfa5-4966-bd8d-3c25a01ca54f.jpg", title: "Набор для мальчика 131", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 132, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/93f1393b-9cd1-41ea-8329-0151d3625312.jpg", title: "Набор для мальчика 132", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 133, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/504d4ad5-bf70-4281-9e01-800d41ee6fff.jpg", title: "Набор для мальчика 133", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 134, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4ada87d3-72f6-46f0-8a21-92418751facb.jpg", title: "Набор для мальчика 134", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 135, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/57c15a71-011e-4c06-903b-3e8e533fb76c.jpg", title: "Набор для мальчика 135", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 136, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/20de5c3e-b55e-42b9-a4b9-2a1e1668a6b5.jpg", title: "Набор для мальчика 136", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 137, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/74c0169c-dc2e-4e75-9223-3e4b6e700f19.jpg", title: "Набор для мальчика 137", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 138, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d57b9249-f4cc-41e0-9e5a-033be503f5c7.jpg", title: "Набор для мальчика 138", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 139, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a7d46d43-2f1c-46f3-ac4b-bf356fe70e3c.jpg", title: "Набор для мальчика 139", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 140, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ec9ba43a-f16c-4c0c-91a2-4313ca4a57c4.jpg", title: "Набор для мальчика 140", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 141, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/613ec3da-1bae-4cbd-a2db-d57192135678.jpg", title: "Набор для мальчика 141", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 142, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ab157851-1fb6-4da1-9e62-b6210573f052.jpg", title: "Набор для мальчика 142", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 143, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/abec86bd-b423-44c7-9c81-a195ef197645.jpg", title: "Набор для мальчика 143", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 144, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4083724e-4634-4915-b258-9afb14e6bd01.jpg", title: "Набор для мальчика 144", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 145, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e1028db2-8675-49bd-85c0-8cdc99efe374.jpg", title: "Набор для мальчика 145", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 146, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2207cdfc-c95d-41c7-a1c4-9310c575099f.jpg", title: "Набор для мальчика 146", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 147, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c3cc9e3f-f29a-4ffa-b16c-5c4a74dfea18.jpg", title: "Набор для мальчика 147", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 148, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5d9398f5-28a0-47ae-8fc5-a0c29b9340bb.jpg", title: "Набор для мальчика 148", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 149, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e1c3cc1e-bd76-4c65-adc2-8637264cc79a.jpg", title: "Набор для мальчика 149", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 150, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/edb4f90a-5b88-4cde-8a7f-5b8163858dee.jpg", title: "Набор для мальчика 150", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 151, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3ab4ad2e-21c9-429d-9c77-abcea6eb2133.jpg", title: "Набор для мальчика 151", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 152, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ffb69ce5-3df3-4720-8a90-c4aa724a685e.jpg", title: "Набор для мальчика 152", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 153, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3c97043c-89c0-4b53-8ae9-1632e084c924.jpg", title: "Набор для мальчика 153", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 154, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f1bf9713-2ca9-4ac2-b20e-9a85e9012b56.jpg", title: "Набор для мальчика 154", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 155, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a1f5d6e1-9bf4-4cbe-a34e-63ca9d264848.jpg", title: "Набор для мальчика 155", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 156, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/265fae32-987d-4f26-a1f2-e1fd43f56190.jpg", title: "Набор для мальчика 156", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 157, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/91c32a37-a1ec-4160-a771-a7e023d07d04.jpg", title: "Набор для мальчика 157", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 158, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/774eb3cf-d7ff-4484-bc19-a6a9287d43b6.jpg", title: "Набор для мальчика 158", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 159, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/66b7a0f0-30d6-42c3-9e2c-ff26ce71659f.jpg", title: "Набор для мальчика 159", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 160, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7821bc1e-2d7d-44aa-8fbc-2d9463ab22f3.jpg", title: "Набор для мальчика 160", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 161, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/718f969a-6d88-4629-91e0-05b54af33a9b.jpg", title: "Набор для мальчика 161", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 162, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2f0c6685-0c8b-488f-8c0a-97044d0fbcf0.jpg", title: "Набор для мальчика 162", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 163, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c651fb14-a7b6-4202-ac03-0d9cb946ada6.jpg", title: "Набор для мальчика 163", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 164, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5967996a-d167-4d92-a6bf-0a0223a39cea.jpg", title: "Набор для мальчика 164", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 165, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ccf52587-aef8-4c0c-9d5a-bacae284d96d.jpg", title: "Набор для мальчика 165", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 166, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5f35f794-cbbe-4bb8-a68d-9135a3aea6d6.jpg", title: "Набор для мальчика 166", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 167, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e33ed449-f623-4188-a562-b9e806e8677f.jpg", title: "Набор для мальчика 167", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 168, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ae6ef861-90cb-45b9-8b3b-1d12f0a6ebb8.jpg", title: "Набор для мальчика 168", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 169, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e20a6b43-fa42-404d-aa19-5fded71fa875.jpg", title: "Набор для мальчика 169", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 170, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5a816e56-6ac8-4761-8010-9c022aad448d.jpg", title: "Набор для мальчика 170", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 171, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/dbba5cd8-689c-4aee-bf13-c293ac7b9d17.jpg", title: "Набор для мальчика 171", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 172, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a4628dcb-d0ca-470c-bb5e-fa61430efb3a.jpg", title: "Набор для мальчика 172", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 173, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d79c429e-fdc1-407a-ac61-462bbe25db31.jpg", title: "Набор для мальчика 173", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 174, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d45660cd-1d8f-49a0-9237-fb9f0cde342a.jpg", title: "Набор для мальчика 174", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 175, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/fa14dd6a-6d26-4c81-b211-b252d4a9ee5b.jpg", title: "Набор для мальчика 175", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 176, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ff520557-ed09-46f2-b4ab-40416866472d.jpg", title: "Набор для мальчика 176", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 177, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/027b9b66-fe7e-4b20-9d39-2397778045c0.jpg", title: "Набор для мальчика 177", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 178, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/cd2c87b6-0f5c-48b7-8515-d3198e002a01.jpg", title: "Набор для мальчика 178", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 179, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/104d5051-9d78-4235-8d75-9334fdc0196e.jpg", title: "Набор для мальчика 179", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 180, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f52d08d6-cdc5-47ed-b848-33d8a7161dbe.jpg", title: "Набор для мальчика 180", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 181, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f966bed5-96b8-4191-8865-de682cba442e.jpg", title: "Набор для мальчика 181", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 182, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5f099f02-4b7a-4785-bad9-9acc4bf5356f.jpg", title: "Набор для мальчика 182", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 183, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c43c2821-91a8-40d6-9077-def7004d0bdd.jpg", title: "Набор для мальчика 183", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 184, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3e9529b0-d1a8-4163-8a5a-04c5644ea325.png", title: "Набор для мальчика 184", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 185, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/fbccc15f-d25a-4737-8c47-5b25c893f726.png", title: "Набор для мальчика 185", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 186, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7bac2f60-f89d-4bb8-8412-14d5174b133f.png", title: "Набор для мальчика 186", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 187, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/11cf617b-a767-4eff-ba93-b14dad10c078.png", title: "Набор для мальчика 187", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 188, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/fd2f6c75-a17e-48f9-aaba-6af84185552b.jpg", title: "Набор для мальчика 188", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 189, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9162e8a1-8d08-4164-a494-b9e5e7a9d26b.jpg", title: "Набор для мальчика 189", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 190, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f9029725-4c38-4ffd-b7f7-664c60fc772f.jpg", title: "Набор для мальчика 190", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 191, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c673bc11-7cfc-4ed6-9c37-348f3da2c30e.jpg", title: "Набор для мальчика 191", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 192, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1522e094-ca32-4d11-bc0f-19a6000585b4.jpg", title: "Набор для мальчика 192", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 193, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ccce7ee8-881c-4050-991d-c5a525e1ee5b.jpg", title: "Набор для мальчика 193", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 194, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/87470454-0ceb-4e4c-8503-62e538abb9ba.jpg", title: "Набор для мальчика 194", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 195, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7a8a9d14-67f2-41f0-a310-e48b17573c1f.jpg", title: "Набор для мальчика 195", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 196, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8239dc0c-48ff-4aab-8677-e656d212e672.jpg", title: "Набор для мальчика 196", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 197, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/cc4d77a9-d018-459f-b208-1ec9f7bf0ba9.jpg", title: "Набор для мальчика 197", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 198, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b47aa396-ffd1-4a9f-96eb-104bd7938d53.jpg", title: "Набор для мальчика 198", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 199, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/65b79fc3-ad59-46fa-90c1-e19a53c4bbb1.jpg", title: "Набор для мальчика 199", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 200, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/83f9e725-d414-4282-8dce-54294fff40ef.jpg", title: "Набор для мальчика 200", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 201, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/0903df2e-e111-4513-bf79-01aa11076006.png", title: "Набор для мальчика 201", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 202, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3924a57c-8a58-41da-9c89-de19ac92ec92.png", title: "Набор для мальчика 202", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 203, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1c87101c-2e84-4611-91a3-b3c54236987b.png", title: "Набор для мальчика 203", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 204, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/84677195-176c-4e1c-a6bf-05342cddeddd.jpg", title: "Набор для мальчика 204", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 205, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1bd010f4-511e-4fb4-b119-4a2d8c42edcb.jpg", title: "Набор для мальчика 205", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
    { id: 206, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4f7b1da6-2f38-4ed2-89c8-911065e10f01.png", title: "Набор для мальчика 206", description: "Шары для мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue"], subcategory: "boy" },
  ],
  "kid-girl": [
    { id: 1, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Набор для девочки 1", description: "Розовые, белые и сиреневые шары с единорогом.", price: "1 490 ₽", priceNum: 1490, colors: ["pink", "white", "purple"], subcategory: "kid-girl" },
    { id: 2, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Набор для девочки 2", description: "Нежная арка из лиловых и розовых шаров со звёздами.", price: "2 800 ₽", priceNum: 2800, colors: ["purple", "pink"], subcategory: "kid-girl" },
    { id: 3, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Набор для девочки 3", description: "Ярко-розовые шары с надписями и сердечками.", price: "1 690 ₽", priceNum: 1690, colors: ["pink"], subcategory: "kid-girl" },
    { id: 4, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Набор для девочки 4", description: "Розово-золотая цифра семь для маленькой принцессы.", price: "890 ₽", priceNum: 890, colors: ["pink", "gold"], subcategory: "kid-girl" },
    { id: 5, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6a5360b0-6642-40fa-bb31-5466cd723b06.jpg", title: "Набор для девочки 5", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 6, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3744c1fb-783e-446b-b02d-db45a1a7e357.jpg", title: "Набор для девочки 6", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 7, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d0648ed0-983a-4759-9d2e-39f0e4ff3578.jpg", title: "Набор для девочки 7", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 8, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f36164de-6d36-46d6-8376-1308d6eeb158.jpg", title: "Набор для девочки 8", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 9, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/fafe78db-e39e-4978-bb67-01c5feccdf9e.jpg", title: "Набор для девочки 9", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 10, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/32f17abc-0332-4d28-acb0-4906de9e5b5c.jpg", title: "Набор для девочки 10", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 11, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7f108e98-d640-471b-a04b-153acc171580.jpg", title: "Набор для девочки 11", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 12, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/cd893d6a-651b-409e-9f17-a0ec00a3cfeb.jpg", title: "Набор для девочки 12", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 13, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/db9cd3fc-6f74-4974-bb48-2740f7d46ee7.jpg", title: "Набор для девочки 13", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 14, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e83e7c2e-88b9-45ea-8e80-70f4a9d83fa8.jpg", title: "Набор для девочки 14", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 15, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/82b88446-090e-4311-beb9-d91864079481.jpg", title: "Набор для девочки 15", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 16, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/86699d1a-e69a-4a46-a9ae-3a1e849dedab.jpg", title: "Набор для девочки 16", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 17, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/be17cca2-e87a-41f1-be53-f8417a2e3fea.jpg", title: "Набор для девочки 17", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 18, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9ed6487c-837a-4167-80a7-c9be7cb4f224.jpg", title: "Набор для девочки 18", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 19, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f5d09c1c-5391-44f6-98ed-ad87fe12d303.jpg", title: "Набор для девочки 19", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 20, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/64db2d26-d014-46a7-a245-4547a016643c.jpg", title: "Набор для девочки 20", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 21, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/08f2bedc-0c87-490c-bc39-dbdfc0c4f7af.jpg", title: "Набор для девочки 21", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 22, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/801f6532-68aa-4e0e-be31-768593c20d58.jpg", title: "Набор для девочки 22", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 23, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2fe9778a-9d1d-4fb6-9735-bf70ca6b86c3.jpg", title: "Набор для девочки 23", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 24, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4107b442-70ce-4075-94c5-7323046d198d.jpg", title: "Набор для девочки 24", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 25, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5821a24b-ed8c-40de-a40b-29e961ae0a9c.jpg", title: "Набор для девочки 25", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 26, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/eb61916f-156f-4dbb-9151-bc880411ef7d.jpg", title: "Набор для девочки 26", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 27, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/17df82c7-61fe-4434-b703-07b3fd0af253.jpg", title: "Набор для девочки 27", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 28, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ff10f440-7ccb-47bf-87da-c8ae9c4a7965.jpg", title: "Набор для девочки 28", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 29, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4d4aee46-f808-4b87-acc4-15b2e035dba9.jpg", title: "Набор для девочки 29", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 30, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/0b623600-e4cd-4dab-9530-93a8c2636638.jpg", title: "Набор для девочки 30", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 31, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/26451936-24e3-4791-a057-a9790d3e98fd.jpg", title: "Набор для девочки 31", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 32, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5bf4a085-ca42-40d4-8e1e-668c81513378.jpg", title: "Набор для девочки 32", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 33, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f9857a52-aff5-4b50-a6e2-2f6c07ab1705.jpg", title: "Набор для девочки 33", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 34, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e866b867-0bcf-4397-a500-31cdf789d5b1.jpg", title: "Набор для девочки 34", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 35, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ac818fb1-1882-4a77-836b-4aead895efa7.jpg", title: "Набор для девочки 35", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 36, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/aa78f965-e29e-47e2-bdc9-389a07b0a5b4.jpg", title: "Набор для девочки 36", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 37, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/50f82180-d93b-42c6-9256-c3a62462554d.jpg", title: "Набор для девочки 37", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 38, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ff7413d3-65e2-4b1b-8b86-d7ece0580b92.jpg", title: "Набор для девочки 38", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 39, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/efb6b149-f005-405d-9261-0a0ef256fd7b.jpg", title: "Набор для девочки 39", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 40, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8a387a8b-a727-4147-a538-d7d7ba9ff9d2.jpg", title: "Набор для девочки 40", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 41, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ac925a8a-d93a-4818-9319-43f00012a7dd.jpg", title: "Набор для девочки 41", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 42, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ce76ccbb-2e56-41d2-aaf5-5a1acf00dcc6.jpg", title: "Набор для девочки 42", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 43, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/711c9af9-942b-4183-b0c8-ed58052e43c7.jpg", title: "Набор для девочки 43", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 44, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/75280ecb-9f56-4b12-9bae-4253343aace0.jpg", title: "Набор для девочки 44", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 45, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/899dd503-6aa4-4da0-9f31-a57f0f958d27.jpg", title: "Набор для девочки 45", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 46, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e2572b57-ac9a-4628-a553-d3529b3aec78.jpg", title: "Набор для девочки 46", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 47, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f455ef4e-5280-4f16-944f-a7e6946972e8.jpg", title: "Набор для девочки 47", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 48, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8f5cae54-947a-4228-bf8d-84a43134a9be.jpg", title: "Набор для девочки 48", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 49, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/0f3015a4-3204-4f58-b3b0-9c47aa9daea1.jpg", title: "Набор для девочки 49", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 50, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/de9499de-2bfc-4fb3-952f-62465a92f6f5.jpg", title: "Набор для девочки 50", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 51, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2895f1e2-b1b9-4826-af17-118ab4a75e8c.jpg", title: "Набор для девочки 51", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 52, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7dd037dc-4c8d-42e8-b103-11398d7bc9a6.jpg", title: "Набор для девочки 52", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 53, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ca7b7824-ea65-4ed7-9f5b-d8f5b51aa7b3.jpg", title: "Набор для девочки 53", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 54, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1b057567-81ad-4bf3-b197-4d8638a3470a.jpg", title: "Набор для девочки 54", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 55, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8b446610-4b8c-4831-9e24-4b77f3ea0fb6.jpg", title: "Набор для девочки 55", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 56, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e6db7ac3-d512-4b37-9cfc-b7a24dcde19f.jpg", title: "Набор для девочки 56", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 57, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/56c347e5-a98d-4a6f-9d5c-67fc1da7e886.jpg", title: "Набор для девочки 57", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 58, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ba7230e2-7b95-460b-af9e-0b4d5e66ab20.jpg", title: "Набор для девочки 58", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 59, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/bb065ed3-91b8-4a8c-8b9f-62b16addaebf.jpg", title: "Набор для девочки 59", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 60, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6de182ac-d320-4a54-adf1-2d88309e265e.jpg", title: "Набор для девочки 60", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 61, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/417a8cbe-65bc-4ee6-a2fe-cf638e653c3b.jpg", title: "Набор для девочки 61", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 62, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1420f73b-9611-483e-ade9-a8d304c5b763.jpg", title: "Набор для девочки 62", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 63, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/80acaa2b-ef03-414b-9be7-3f9534aa4b87.jpg", title: "Набор для девочки 63", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 64, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/66337546-76d7-422a-bb85-20599d6e3c8c.jpg", title: "Набор для девочки 64", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 65, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/725191e1-a35c-472b-9061-34d30dd5e55d.jpg", title: "Набор для девочки 65", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 66, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a88b0dd9-3d19-425e-8807-6c3b67aee15d.jpg", title: "Набор для девочки 66", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 67, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/259771e9-af95-4363-87f3-949d480dbba5.jpg", title: "Набор для девочки 67", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 68, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4e4fe71f-a02e-4d52-b7f6-78a5f77cd4ef.jpg", title: "Набор для девочки 68", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 69, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/45589a57-136c-4555-81a8-c1691c2cb894.jpg", title: "Набор для девочки 69", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 70, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e3a000a1-2251-402c-9671-b9fc480afad0.jpg", title: "Набор для девочки 70", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 71, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ae35ea97-3535-4cc5-9a8c-585d0e47b7e5.jpg", title: "Набор для девочки 71", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 72, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/77caecbc-f5b1-41f1-bc3e-ab6fdc9d999a.jpg", title: "Набор для девочки 72", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 73, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f4d0dab0-bbf2-4ed1-8350-715aee5c45a8.jpg", title: "Набор для девочки 73", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 74, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/70be88fd-1095-47cd-bb62-5385d9d37d82.jpg", title: "Набор для девочки 74", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 75, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c3fa1f6f-3869-4cd4-97fd-0a1eebae5c26.jpg", title: "Набор для девочки 75", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 76, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/319cf13e-c8ec-45ed-9f17-d9a3346af087.jpg", title: "Набор для девочки 76", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 77, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/28e080bc-24a5-4e3b-9c85-0eb1346bb587.jpg", title: "Набор для девочки 77", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 78, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/949f4cf9-3be2-4817-8282-e9e0a8b41f99.jpg", title: "Набор для девочки 78", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 79, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1780759b-b2a3-407d-b7f6-c13dce66bc60.jpg", title: "Набор для девочки 79", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 80, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c6410d5a-2080-465b-b406-eb4ad8aa7975.jpg", title: "Набор для девочки 80", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 81, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/182ab2ec-4889-4068-a7d9-bcebea2c7706.jpg", title: "Набор для девочки 81", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 82, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/aada9875-089c-4de6-aebe-939ac1381099.jpg", title: "Набор для девочки 82", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 83, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/21035b80-5233-4e36-9b6f-57c0e2d204ca.jpg", title: "Набор для девочки 83", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 84, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b78277f1-4006-4cd3-a5ad-6762f68a6649.jpg", title: "Набор для девочки 84", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 85, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5c9dad5c-2954-45c2-a829-88567dfeeeaf.jpg", title: "Набор для девочки 85", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 86, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d918efc4-aac9-4c6a-9145-2957335e27cd.jpg", title: "Набор для девочки 86", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 87, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f0a08063-233c-4a56-8bec-37bf0bd7e349.jpg", title: "Набор для девочки 87", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 88, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ad278b3f-e82e-49a2-82ae-82a70212f53f.jpg", title: "Набор для девочки 88", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 89, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/268aa286-4fa8-4b77-9c76-418bda3f2da4.jpg", title: "Набор для девочки 89", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 90, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1cf15efd-d269-4443-818b-1fa726211a4f.jpg", title: "Набор для девочки 90", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 91, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/62e7021c-718e-46dc-82bc-6a6256c1a5e7.jpg", title: "Набор для девочки 91", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 92, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f4d65c53-633f-45f9-8aaf-800c13f948ec.jpg", title: "Набор для девочки 92", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 93, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/33d214c8-dbac-4c21-b9f3-28ba781fdd56.jpg", title: "Набор для девочки 93", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 94, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8d28b8af-6f7d-40a9-beb6-e3e27aef7dd4.jpg", title: "Набор для девочки 94", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 95, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/047bc8d7-0048-4cad-bd5b-296d419868a3.jpg", title: "Набор для девочки 95", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 96, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/466259e8-1a1c-4529-97f0-45fded71427e.jpg", title: "Набор для девочки 96", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 97, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4d4b30f6-81dd-4a44-a6f0-e1b7eb3a9585.jpg", title: "Набор для девочки 97", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 98, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/899263db-982a-479f-86d5-e8b26efa3471.jpg", title: "Набор для девочки 98", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 99, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/dfcfdcf6-f160-4e6f-8821-fd9ff116c43b.jpg", title: "Набор для девочки 99", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 100, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6902d232-c370-4ea0-af98-aeea129e94d0.jpg", title: "Набор для девочки 100", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 101, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/109e2e32-3aaf-4c4c-8fce-7ffb518049cd.jpg", title: "Набор для девочки 101", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 102, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4aa8bd50-b7e8-42a3-b204-77534282a075.jpg", title: "Набор для девочки 102", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 103, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ff7973ac-48ef-4e17-ab24-2f34ba125fd2.jpg", title: "Набор для девочки 103", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 104, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3e91cecf-aa55-4af8-a73e-3cbcff800916.jpg", title: "Набор для девочки 104", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 105, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/0724a0f6-fb22-43b7-8d30-6ee20c9b05f7.jpg", title: "Набор для девочки 105", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 106, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7c12c932-7729-4553-8c00-1dda5d561016.jpg", title: "Набор для девочки 106", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 107, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3c0b8c0b-b3d7-41f1-97a8-50abbb2e31f6.jpg", title: "Набор для девочки 107", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 108, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2893f698-2780-47ce-afee-9d4993547417.jpg", title: "Набор для девочки 108", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 109, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/76ff34c9-4c30-4710-96a4-5511a64754b6.jpg", title: "Набор для девочки 109", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 110, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8362f3ce-a367-43e2-a47d-62f70b8b74bc.jpg", title: "Набор для девочки 110", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 111, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/91551982-a471-4400-a367-d577a90b91bb.jpg", title: "Набор для девочки 111", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 112, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/0ed8d8ef-fe3d-4d92-b2eb-511dff735f90.jpg", title: "Набор для девочки 112", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 113, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/153550ad-0574-4160-b297-8063eb5c4afb.jpg", title: "Набор для девочки 113", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 114, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7a25d057-b933-4c1b-90c3-7d397d62d737.jpg", title: "Набор для девочки 114", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 115, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9a2b94cf-c9ff-492b-ac10-96c3ce1ad9a9.jpg", title: "Набор для девочки 115", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 116, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/fabec4a4-b7b5-4a5d-a2ea-466dcc4c03a8.jpg", title: "Набор для девочки 116", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 117, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f316959a-09dd-4f0d-a311-ae5864ec47d4.jpg", title: "Набор для девочки 117", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 118, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6d573a80-adaf-4bbd-a5c1-b152c1f1c508.jpg", title: "Набор для девочки 118", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 119, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/25999fb4-e03e-4cc0-b841-6095e1a30d5c.jpg", title: "Набор для девочки 119", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 120, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/102a5118-dfb8-4fc6-b129-d4b9430e5aa7.jpg", title: "Набор для девочки 120", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 121, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e3c3d753-d68f-4abf-a947-a738d370b277.jpg", title: "Набор для девочки 121", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 122, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c1231da7-ed94-40b1-a42f-f1b7f699bb1f.jpg", title: "Набор для девочки 122", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 123, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b62d09df-12ae-4f87-93cb-11b74f819f5f.jpg", title: "Набор для девочки 123", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 124, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4c3a931e-2d67-46a4-b1ac-daf7ab217e43.jpg", title: "Набор для девочки 124", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 125, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/dad27ddd-6649-437a-9d7a-908fb5861b44.jpg", title: "Набор для девочки 125", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 126, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/80790d93-8fde-4e4a-bf40-9aafb5143f33.jpg", title: "Набор для девочки 126", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 127, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a851d06d-157f-4f2e-822a-a3cc968cb493.jpg", title: "Набор для девочки 127", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 128, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3ae93ace-b744-4df4-a66c-592107b9ebcc.jpg", title: "Набор для девочки 128", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 129, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2dab0a54-2af2-44e8-84fb-da67862b5953.jpg", title: "Набор для девочки 129", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 130, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f8b6c819-ff64-47e5-bbad-dd8839120fc1.jpg", title: "Набор для девочки 130", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 131, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5d680ce4-a601-411f-9552-c07c2ea9533f.jpg", title: "Набор для девочки 131", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 132, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b1d1d169-630e-47c3-aade-672af8b81f39.jpg", title: "Набор для девочки 132", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 133, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d9abbb22-b94a-4648-9cc0-ec4eb6a1f766.jpg", title: "Набор для девочки 133", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 134, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4d5198fb-d439-4742-a185-d2adbe88f736.jpg", title: "Набор для девочки 134", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 135, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/cd73001e-fb31-4221-a17e-cdd28df874dc.jpg", title: "Набор для девочки 135", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 136, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d820756e-f57e-4d09-91df-27934ab49edb.jpg", title: "Набор для девочки 136", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 137, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/58995581-328f-4254-86b3-42af5dbad5be.jpg", title: "Набор для девочки 137", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 138, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/24b4adf1-e721-40b5-8136-a07bb74da6b5.jpg", title: "Набор для девочки 138", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 139, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9e7d21e7-77b5-41b5-959a-9b122cbff8a2.jpg", title: "Набор для девочки 139", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 140, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/74acaca9-b7ac-4dde-bb4d-4b01839aa1ca.jpg", title: "Набор для девочки 140", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 141, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8be55160-1e29-41a0-bca1-ac06dc575209.jpg", title: "Набор для девочки 141", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 142, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/739761a6-aae0-4ece-b4e8-e52273010b80.jpg", title: "Набор для девочки 142", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 143, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a32c78c0-3a93-4517-9fd7-c74f73d0263d.jpg", title: "Набор для девочки 143", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 144, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/14626b33-7544-4349-99ed-3db26c24c3d1.jpg", title: "Набор для девочки 144", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 145, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e831a898-9784-4be0-884b-64562cbbca0a.jpg", title: "Набор для девочки 145", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 146, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/102fe2d9-192f-4af6-b009-2ac696c5f2b1.jpg", title: "Набор для девочки 146", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 147, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/090b87fa-5095-428c-adfe-c77d284c69e6.jpg", title: "Набор для девочки 147", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 148, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4b4f9395-2702-4d84-8d81-e9ad80e5510e.jpg", title: "Набор для девочки 148", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 149, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/042d37b1-fa2f-4a55-96df-b984d00ed5d1.jpg", title: "Набор для девочки 149", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 150, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/448d6af5-ad3a-48b7-a72d-ac565488f666.jpg", title: "Набор для девочки 150", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 151, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/10fae7bf-764d-480d-921a-e32f5b5ea47e.jpg", title: "Набор для девочки 151", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 152, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/71d7cea3-3471-4afc-8528-40f3cd79e212.jpg", title: "Набор для девочки 152", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 153, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a8d5629c-389e-4352-a955-cab19f5d674b.jpg", title: "Набор для девочки 153", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 154, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/bc5a31e3-25b1-493f-bbcc-701042c74594.jpg", title: "Набор для девочки 154", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 155, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a4712084-671a-4e58-b0ab-b71bd271cd0e.jpg", title: "Набор для девочки 155", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 156, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c3b155c4-9e96-4525-ab96-55d0f49678c4.jpg", title: "Набор для девочки 156", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 157, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/88be0788-6fcb-4825-9b02-d1e0297778dc.jpg", title: "Набор для девочки 157", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 158, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2910039f-4829-48a3-a717-81590d0e29a1.jpg", title: "Набор для девочки 158", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 159, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c27935aa-73fd-4178-ae72-eb0db2513878.jpg", title: "Набор для девочки 159", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 160, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/09fc6a87-372e-4b73-bf3d-d3ebcb6731df.jpg", title: "Набор для девочки 160", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 161, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/42d71405-9a28-47f3-b00b-8315a5a099fc.jpg", title: "Набор для девочки 161", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 162, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ee4573b6-c3b3-499b-bc59-2ce0b8e233a1.jpg", title: "Набор для девочки 162", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 163, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5f8d1aff-e66f-4022-8f1c-f514ae682006.jpg", title: "Набор для девочки 163", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 164, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/26888e81-604f-438d-91d1-36fe5f3b9809.jpg", title: "Набор для девочки 164", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 165, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b89c5dd9-9c10-476a-82e3-d54f5c02db61.jpg", title: "Набор для девочки 165", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 166, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2123aff4-bd4c-4a30-a7a3-08539bb0646e.jpg", title: "Набор для девочки 166", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 167, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ebaa887d-a831-44f1-b49f-5bb28a4f0161.jpg", title: "Набор для девочки 167", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 168, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/91229621-8904-4b24-ab88-fcd52c61527a.jpg", title: "Набор для девочки 168", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 169, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/0274cf13-11af-45b2-9f53-776cd3103669.jpg", title: "Набор для девочки 169", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 170, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/37e7f537-65ef-4000-822e-b6184c6b84e2.jpg", title: "Набор для девочки 170", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 171, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/0f205605-12e7-4430-8dad-915722e8c8fa.jpg", title: "Набор для девочки 171", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 172, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3b16ae38-3cf2-4c67-aa87-4646077f3d87.jpg", title: "Набор для девочки 172", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 173, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/66b84e9e-7a3a-485e-b035-ff60308c561a.jpg", title: "Набор для девочки 173", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 174, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3b8e9007-6ffb-4d6a-9f81-f18f2f4b5a96.jpg", title: "Набор для девочки 174", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 175, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2faf9c98-cf0e-4c15-9352-c0f298b66682.jpg", title: "Набор для девочки 175", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 176, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/96ccbad9-6cba-4fe9-a1f2-bbdd3e3a80f3.jpg", title: "Набор для девочки 176", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 177, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b58773ba-0071-413e-8fcc-ed6df84c448c.jpg", title: "Набор для девочки 177", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 178, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7e766ddd-6db0-450d-86db-76f2e1d3cd6e.jpg", title: "Набор для девочки 178", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 179, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/af4c16e2-cac9-4e81-a15c-2ee31114ecdc.jpg", title: "Набор для девочки 179", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 180, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3370b4e1-dc55-4064-b9c8-449c9cd747fc.jpg", title: "Набор для девочки 180", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 181, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5a011cde-2ca6-4176-b960-02858656d869.jpg", title: "Набор для девочки 181", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 182, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1d33e6bb-3f97-446f-9437-41b25e67012d.jpg", title: "Набор для девочки 182", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 183, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/20956647-700d-4c17-af6f-2bc79d9ced44.jpg", title: "Набор для девочки 183", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 184, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/83df3dea-905a-406c-ad1f-41b69fced6e9.jpg", title: "Набор для девочки 184", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 185, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6ac80374-dc2c-45c7-b9f8-94eb9493499c.jpg", title: "Набор для девочки 185", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 186, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/85921faa-3ee3-4e2e-b5f8-854b5be68700.jpg", title: "Набор для девочки 186", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 187, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5e944ed6-775e-4463-80ed-09f69df3ebc8.jpg", title: "Набор для девочки 187", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 188, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/fccccf36-4b38-4dc9-b617-e3e41aa607a0.jpg", title: "Набор для девочки 188", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 189, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4ea5caca-2573-4aad-9481-8e79141acf6a.jpg", title: "Набор для девочки 189", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 190, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/41290096-060c-4f95-be44-ca27822f53ce.jpg", title: "Набор для девочки 190", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 191, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d10969ba-e629-4274-9f9d-70019ec80864.jpg", title: "Набор для девочки 191", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 192, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/16d771bc-5e57-4268-a378-b6809c6dd34f.jpg", title: "Набор для девочки 192", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 193, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f3a65ae7-cb50-4427-93ad-4024444327c0.jpg", title: "Набор для девочки 193", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 194, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1d8e6cd3-d2fd-43d8-95aa-d478adedd406.jpg", title: "Набор для девочки 194", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 195, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a7215b04-52f7-4a69-a93e-95e589775f78.jpg", title: "Набор для девочки 195", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 196, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/db7a123b-d3dc-462f-addd-cd663dc688b3.jpg", title: "Набор для девочки 196", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 197, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/02f2eb33-799d-419c-b81c-ee9a1907bbb6.jpg", title: "Набор для девочки 197", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 198, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ff69b7e8-6b7a-4de7-87cc-d20e0d4c4bd1.jpg", title: "Набор для девочки 198", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 199, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a2491b09-7e77-4d8f-b23f-8ee6b5086720.jpg", title: "Набор для девочки 199", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 200, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c66c4d66-39a3-4c9a-8515-68067f1a37a2.jpg", title: "Набор для девочки 200", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 201, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/931538ab-146b-455c-b19f-8f4976c0dded.jpg", title: "Набор для девочки 201", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 202, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/0fa716f8-8254-423c-bc3f-4c2ac6898e58.jpg", title: "Набор для девочки 202", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 203, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7d568cd0-460a-423e-8de3-0651e990fb5e.jpg", title: "Набор для девочки 203", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 204, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7cb7bbe7-4dab-4ff5-91a3-e1d85567c6a0.jpg", title: "Набор для девочки 204", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 205, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5a357411-9ffc-469c-aadb-4c78a0ffb129.jpg", title: "Набор для девочки 205", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 206, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a2be2ccd-581d-4c4e-8f26-848a1a092e52.jpg", title: "Набор для девочки 206", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 207, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/00dadd59-9c06-493d-b665-6951f1b1f240.jpg", title: "Набор для девочки 207", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 208, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/eea98126-4200-4e1a-a9c1-19fc325e40ea.jpg", title: "Набор для девочки 208", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 209, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6d903daa-af30-4a9f-b654-65cce38bb50d.jpg", title: "Набор для девочки 209", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 210, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/54c46be7-a436-46e1-9b6b-0fd3992eef33.jpg", title: "Набор для девочки 210", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 211, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a3eb778a-02ec-4179-966f-b84c01247e95.jpg", title: "Набор для девочки 211", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 212, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/dbb924ef-8361-4016-8d18-778c2da699f6.jpg", title: "Набор для девочки 212", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 213, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5aa2a7bf-7ec5-49f1-8e1d-402c19d0d087.jpg", title: "Набор для девочки 213", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 214, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8a20ee1a-14b2-4984-ba2b-5cbbd7668be6.jpg", title: "Набор для девочки 214", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 215, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/cc01c576-8178-4eb1-8619-ef8472315819.jpg", title: "Набор для девочки 215", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 216, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b9ff246b-0297-436c-9d97-2f10e92d0419.jpg", title: "Набор для девочки 216", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 217, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/671e7047-ab4d-4567-8dd9-4c16d7b6e479.jpg", title: "Набор для девочки 217", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 218, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3c91daf6-400b-4b22-acae-6eeda24f9315.jpg", title: "Набор для девочки 218", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 219, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e7c91e25-99af-4a3d-b2c4-3b2175c150ac.jpg", title: "Набор для девочки 219", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 220, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9e9bfbdc-aac4-418d-a0f6-3e070a0a36c3.jpg", title: "Набор для девочки 220", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 221, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ce85abdc-92cb-4237-aa11-c89842a056cc.jpg", title: "Набор для девочки 221", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 222, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a9b1bf85-7fba-447a-b4cb-7f4960c1336c.jpg", title: "Набор для девочки 222", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 223, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5780cc22-1371-4cb6-9130-a2d6ebbed11b.jpg", title: "Набор для девочки 223", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 224, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d14d80ca-8cf8-4f93-8326-16b8e8566f8e.jpg", title: "Набор для девочки 224", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 225, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f317283d-92e0-4dae-8d2e-a55a6c15d533.jpg", title: "Набор для девочки 225", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 226, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f80f3e28-1bb2-4749-949b-f0c49fe6e3db.jpg", title: "Набор для девочки 226", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 227, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b6a9e248-a861-45ab-9261-1633cbf9dd1a.jpg", title: "Набор для девочки 227", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 228, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/181a7ec0-7b1f-4761-9aee-c1eeea4a2aa4.jpg", title: "Набор для девочки 228", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 229, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/10cf2ca9-fbd2-4bb0-ba33-53990addc7c3.jpg", title: "Набор для девочки 229", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 230, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5f302404-b45a-4d1d-ba79-e0caed4b150b.jpg", title: "Набор для девочки 230", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 231, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b26756da-5257-4862-acbd-1e026183d9e5.jpg", title: "Набор для девочки 231", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 232, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/78eaf0c4-b972-4c6e-b7a5-0c212a4a272a.jpg", title: "Набор для девочки 232", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 233, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/472878ff-6513-4904-8101-9518d0ecf79e.jpg", title: "Набор для девочки 233", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 234, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/82353bb7-9b87-43df-8834-c56a1f3db8fb.jpg", title: "Набор для девочки 234", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 235, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6ea3bac9-24e5-4c2b-b394-07d0ad31397c.jpg", title: "Набор для девочки 235", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 236, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/46a62aca-9ac8-4e66-b18d-32b60730bdbc.jpg", title: "Набор для девочки 236", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 237, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/53181645-9c66-4a65-9ac2-feb70b048e02.jpg", title: "Набор для девочки 237", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 238, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4d9c2268-547d-4c6e-a125-9deeef971524.jpg", title: "Набор для девочки 238", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 239, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3744c5ff-01d2-4258-a2fb-055b5e67741a.jpg", title: "Набор для девочки 239", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 240, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6e1f5024-34a6-4d89-9b98-56eac4e8a00c.jpg", title: "Набор для девочки 240", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 241, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9eb4fa8c-abcf-4e7f-953a-8945874eaad5.jpg", title: "Набор для девочки 241", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 242, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/121facaa-47bb-47c6-bf6f-fcbd0ecb2901.jpg", title: "Набор для девочки 242", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 243, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/414846e2-5c81-4544-8fe7-0310da447779.jpg", title: "Набор для девочки 243", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 244, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7c046c1e-d3de-4889-9106-0126bff6e60e.jpg", title: "Набор для девочки 244", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 245, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ffb5040d-844c-4508-87da-1a27e47a6911.jpg", title: "Набор для девочки 245", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 246, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/93a7436e-8100-4c5c-af81-bfd98f09f286.jpg", title: "Набор для девочки 246", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 247, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1cfa3347-1e9b-42db-8c7b-a584d5cb616f.jpg", title: "Набор для девочки 247", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 248, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8c340174-eeae-4d63-a508-01562a95ce23.jpg", title: "Набор для девочки 248", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 249, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/95506689-2a77-4cd4-aedf-1f1dfbfa1a31.jpg", title: "Набор для девочки 249", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 250, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/941033b8-ea56-4f30-8f5e-a0dabfc1f78a.jpg", title: "Набор для девочки 250", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 251, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d6522317-d057-41bf-b2df-cb9abab7cba2.jpg", title: "Набор для девочки 251", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 252, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f3cdcb0a-33d6-4338-908a-672b0ee5cbb8.jpg", title: "Набор для девочки 252", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 253, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/697da803-c812-4880-90a7-b1befb52b625.jpg", title: "Набор для девочки 253", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 254, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3b6e10e2-c854-4c0f-86a2-5c3499c9e4f9.jpg", title: "Набор для девочки 254", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 255, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/22ced8d9-584b-4722-a947-c1139d5d7bb3.jpg", title: "Набор для девочки 255", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 256, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6008ed00-e7a9-4b9f-86d4-bf492ae57da3.jpg", title: "Набор для девочки 256", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 257, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d80f03d6-1f0b-4bbe-9796-7debe226d931.jpg", title: "Набор для девочки 257", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 258, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3a41a9aa-e619-4669-964c-667c4439747a.jpg", title: "Набор для девочки 258", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 259, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c1edb779-c6a2-42b4-8300-02b9288fa085.jpg", title: "Набор для девочки 259", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 260, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/348c67c7-9e39-4530-ab04-fd7f6f32e43c.jpg", title: "Набор для девочки 260", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 261, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8524134f-a091-4fe8-89f7-268c09e42a75.jpg", title: "Набор для девочки 261", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 262, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/734d18cb-0f26-4945-8141-b3ab260abd37.jpg", title: "Набор для девочки 262", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 263, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7ac0320c-366f-4edb-88b9-8f0bdb088a62.jpg", title: "Набор для девочки 263", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 264, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6663d103-a100-4229-976a-abd970973d05.jpg", title: "Набор для девочки 264", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 265, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/0c0aa3c4-8fac-484d-8704-3b9d673e91ca.jpg", title: "Набор для девочки 265", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
    { id: 266, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/dc54825e-b184-407d-b151-aa0f5fe74f6d.jpg", title: "Набор для девочки 266", description: "Шары для девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink"], subcategory: "kid-girl" },
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
    { id: 97, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/22d1e846-f3ed-4233-add8-b04c4757b1d6.png", title: "Набор на выписку мальчика 4", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 98, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b5beb1b2-88f2-4ca4-92d4-d597512dbd8a.png", title: "Набор на выписку мальчика 5", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 99, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/58820ce5-b53c-4276-afeb-c386a1b9b2d6.jpg", title: "Набор на выписку мальчика 6", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 100, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/dfc9fe95-e310-4faa-8a4e-1bb332738e61.jpg", title: "Набор на выписку мальчика 7", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 101, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ece3fd12-e55f-4dfe-94f0-bb31794dbbc4.jpg", title: "Набор на выписку мальчика 8", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 102, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ee175644-fafe-4798-8f1a-1f97bdbdc1b4.jpg", title: "Набор на выписку мальчика 9", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 103, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7fc72bdf-2e3e-4900-89e5-5bd6ca5a1be5.jpg", title: "Набор на выписку мальчика 10", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 104, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ed302ca2-1e7c-459b-97e0-4585bbf4354a.jpg", title: "Набор на выписку мальчика 11", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 105, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2650e83e-ea36-4674-a0ee-53a5f4cee768.jpg", title: "Набор на выписку мальчика 12", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 106, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ca897952-7165-4d8c-b1ec-2e6b9f701137.jpg", title: "Набор на выписку мальчика 13", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 107, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8d39d620-0450-49ce-9dbc-310003050399.jpg", title: "Набор на выписку мальчика 14", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 108, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/51ddc1c0-6bd6-4712-a375-5f9a9bf57b94.jpg", title: "Набор на выписку мальчика 15", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 109, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/075abab0-8158-4f10-8670-c5db608dc7b2.jpg", title: "Набор на выписку мальчика 16", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 110, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8a49c6ed-af7b-4ac7-85c1-aea04b3c3077.jpg", title: "Набор на выписку мальчика 17", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 111, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f49f3a0b-a190-412e-b59d-fa294ba1d0a6.jpg", title: "Набор на выписку мальчика 18", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 112, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d062cc02-de2d-42d7-8caa-e69d8582867a.jpg", title: "Набор на выписку мальчика 19", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 113, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/279dc0b6-de30-44d6-bfda-174e936b4022.jpg", title: "Набор на выписку мальчика 20", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 114, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2ea1b033-6cf2-4ec9-99ed-35a82e65fc51.jpg", title: "Набор на выписку мальчика 21", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 115, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/481c3c6b-6fe4-4dc7-9455-7313e7ec8754.jpg", title: "Набор на выписку мальчика 22", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 116, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5c413d1d-80a1-4914-a420-ca5f82ad77e2.jpg", title: "Набор на выписку мальчика 23", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 117, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/208b7c38-7825-47a9-a3ac-321dbc71ca98.jpg", title: "Набор на выписку мальчика 24", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 118, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/194b1b17-e1cf-4e6b-b08b-fa61065bc301.jpg", title: "Набор на выписку мальчика 25", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 119, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8600d3f4-fdf6-482c-9c71-981d0baecec1.jpg", title: "Набор на выписку мальчика 26", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 120, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3bb461c3-1204-4799-abb2-c501a295e9c4.jpg", title: "Набор на выписку мальчика 27", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 121, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9d19784c-bb5f-485e-b801-a2415557b3bd.jpg", title: "Набор на выписку мальчика 28", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 122, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/33463dfe-a9df-436e-a181-5584b2f02192.jpg", title: "Набор на выписку мальчика 29", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 123, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/fd6e0df7-427c-4ee3-aac6-eb07b5caa120.jpg", title: "Набор на выписку мальчика 30", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 124, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4cc06dd5-007e-4703-b5db-9f215b79682b.jpg", title: "Набор на выписку мальчика 31", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 125, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1b28a22e-7b8e-4d61-a21f-15d0cd8ecd0d.jpg", title: "Набор на выписку мальчика 32", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 126, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e5f502d9-82c9-4410-ad3f-100e19ceb3b7.jpg", title: "Набор на выписку мальчика 33", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 127, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5503bf78-0ef2-4cdc-afa5-37d901f3daad.jpg", title: "Набор на выписку мальчика 34", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 128, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4ff5e510-dd3d-49a4-8e5a-9aca79d5e2da.jpg", title: "Набор на выписку мальчика 35", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 129, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/451b0373-17d1-40ff-8be4-8a159d851b20.jpg", title: "Набор на выписку мальчика 36", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 130, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1cd2091a-613c-4c8b-b83e-dff4f24905b0.jpg", title: "Набор на выписку мальчика 37", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 131, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/750b6f34-6062-41cc-abc2-33d23b8d2e1e.jpg", title: "Набор на выписку мальчика 38", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 132, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/261dbe1f-160b-4f82-9b39-728b54000051.jpg", title: "Набор на выписку мальчика 39", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 133, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4679bc67-e45d-48e1-b873-99fd17e5ce10.jpg", title: "Набор на выписку мальчика 40", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 134, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/03f7f746-2c55-4492-abe0-3c09dfc012aa.jpg", title: "Набор на выписку мальчика 41", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 135, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3b97fb8a-248a-441c-9548-03ee8059d168.jpg", title: "Набор на выписку мальчика 42", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 136, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/115839c1-2735-4aea-8a18-aea09e9d850f.jpg", title: "Набор на выписку мальчика 43", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 137, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/87dcdbed-eac4-44d7-9f51-efd510b5d42f.jpg", title: "Набор на выписку мальчика 44", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 138, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e86dc762-dea5-4201-8aef-7b23ed788a30.jpg", title: "Набор на выписку мальчика 45", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 139, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d89156e3-70a9-4f62-9179-54c0506cef96.jpg", title: "Набор на выписку мальчика 46", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 140, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5b80b4a9-6499-453c-bb02-16f2c1cbeb73.jpg", title: "Набор на выписку мальчика 47", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 141, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/fdd93c3b-5661-46df-936f-83335bbc0c63.jpg", title: "Набор на выписку мальчика 48", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 142, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d2d35ec7-35b7-4902-96cf-0d0752588218.jpg", title: "Набор на выписку мальчика 49", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 143, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/127ab112-489f-4948-8d0d-2acf4c3cc59f.jpg", title: "Набор на выписку мальчика 50", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 144, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d0fb62b3-810b-4990-b292-be8adc633a5f.jpg", title: "Набор на выписку мальчика 51", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 145, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e549dd72-ca9b-4a9d-9ac8-6adcd30f3944.jpg", title: "Набор на выписку мальчика 52", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 146, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5ce982e3-27d9-4eb7-9fc0-34e1e7808aec.jpg", title: "Набор на выписку мальчика 53", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 147, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b7d33434-b251-49cf-9835-cbc9175c1c8c.jpg", title: "Набор на выписку мальчика 54", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 148, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/bedbd40d-6f0e-4545-a4f5-3938553e6227.jpg", title: "Набор на выписку мальчика 55", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 149, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/bf152849-a903-4864-9a53-f825399b79b3.jpg", title: "Набор на выписку мальчика 56", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 150, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d073a588-a213-4801-bee1-8a2510d1d4ef.jpg", title: "Набор на выписку мальчика 57", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 151, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c6cf505a-bf96-4921-a87c-e04174ae2bea.jpg", title: "Набор на выписку мальчика 58", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 152, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1803848f-b842-4630-9438-98d0b0327711.jpg", title: "Набор на выписку мальчика 59", description: "Шары для выписки мальчика.", price: "Цена по запросу", priceNum: 0, colors: ["blue", "white"], subcategory: "boy-discharge" },
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
    { id: 4, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3904621a-b776-40e9-97ae-3da54154591d.jpg", title: "Набор на выписку девочки 1", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 5, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9648eeb4-d6a7-4acb-b8bf-dc1a87edff40.jpg", title: "Набор на выписку девочки 2", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 6, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d254fc68-b124-4a5e-9474-5b0a9f8cb408.jpg", title: "Набор на выписку девочки 3", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 7, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/70be7483-b75a-406e-976f-93cc8fffaf89.jpg", title: "Набор на выписку девочки 4", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 8, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/50dcaa7e-fca3-4d65-875a-e95fa04a1b84.jpg", title: "Набор на выписку девочки 5", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 9, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f13c7c5c-30e1-4952-8ab2-7eb44713c562.jpg", title: "Набор на выписку девочки 6", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 10, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a405d4b5-92f0-4271-94ea-f3dce8d6d0e9.jpg", title: "Набор на выписку девочки 7", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 11, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4c5e623a-4fab-4d55-9e56-ac43a2ad6e76.jpg", title: "Набор на выписку девочки 8", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 12, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/38dfd72a-1394-412a-9274-3c98f825e034.jpg", title: "Набор на выписку девочки 9", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 13, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d32221ae-3cef-4353-9e51-3da9e01bcaa5.jpg", title: "Набор на выписку девочки 10", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 14, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/14ef23bf-4fb8-4610-8719-2104a330a3a7.jpg", title: "Набор на выписку девочки 11", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 15, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2f06a97f-d1c6-472c-8c08-381984857400.jpg", title: "Набор на выписку девочки 12", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 16, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6178bbea-28f8-4f7d-9f5e-30853654f7b1.jpg", title: "Набор на выписку девочки 13", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 17, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/bebafc15-ae4b-4deb-bdd6-c17301d18bbf.jpg", title: "Набор на выписку девочки 14", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 18, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b1f3e725-acd5-40ed-a314-525d75a07554.jpg", title: "Набор на выписку девочки 15", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 19, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8366a17d-75d2-42ed-a25a-1c886c847006.jpg", title: "Набор на выписку девочки 16", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 20, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e5a659b5-a25d-4070-95e7-b77453440973.jpg", title: "Набор на выписку девочки 17", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 21, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5cb26bd0-4aae-4ebb-bf53-652f3b7374f4.jpg", title: "Набор на выписку девочки 18", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 22, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e1c5a72d-e54e-4815-92d2-b339fe2b0134.jpg", title: "Набор на выписку девочки 19", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 23, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/0514ad24-b887-4739-8e54-1a8503042f73.jpg", title: "Набор на выписку девочки 20", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 24, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/299ec68e-fdb9-4d27-b88d-38c80f13934a.jpg", title: "Набор на выписку девочки 21", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 25, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/242813d3-64e7-4d67-93f3-b591b84ca7d1.jpg", title: "Набор на выписку девочки 22", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 26, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/707a309d-1afc-41f6-bd53-d1d3ef7fec46.jpg", title: "Набор на выписку девочки 23", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 27, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d3a0f068-a7cc-4ced-ab16-363273dfa16b.jpg", title: "Набор на выписку девочки 24", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 28, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c55b6ff8-72bf-4936-90c5-390b07173a4e.jpg", title: "Набор на выписку девочки 25", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 29, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/bdab899b-b95e-4e52-a66b-2e8e0fbff26b.jpg", title: "Набор на выписку девочки 26", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 30, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/bf2f960a-ce8a-42bb-b07b-d8e55d89d81a.jpg", title: "Набор на выписку девочки 27", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 31, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/27531983-2f9e-4796-b470-c1c5c1340150.jpg", title: "Набор на выписку девочки 28", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 32, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ba96374a-e795-440c-8e4f-db4a99b9bccd.jpg", title: "Набор на выписку девочки 29", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 33, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9b68e636-9721-4ef4-adc3-77b3b5b211ab.jpg", title: "Набор на выписку девочки 30", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 34, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/fdfaf9a0-b0af-4dd3-8130-7f449ff07bd2.jpg", title: "Набор на выписку девочки 31", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 35, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/604dac19-20c5-4392-b6a7-aa197f384142.jpg", title: "Набор на выписку девочки 32", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 36, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1380a614-4da8-49ed-8c60-dd3415a44317.jpg", title: "Набор на выписку девочки 33", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 37, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/953f1ef8-1940-405e-b0f6-55e87ea48065.jpg", title: "Набор на выписку девочки 34", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 38, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1e53296c-3ecf-4d4c-95e2-df5cdf6dbb9e.jpg", title: "Набор на выписку девочки 35", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 39, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e40b61dd-40d1-46b6-83d1-f708bbdb19b2.jpg", title: "Набор на выписку девочки 36", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 40, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/edcffcf4-e553-44b3-a560-ec2106d3a36e.jpg", title: "Набор на выписку девочки 37", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 41, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/0fb26889-591c-43c6-93a7-1bda6f2c55d8.jpg", title: "Набор на выписку девочки 38", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 42, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/cb35ce28-e1cd-4b90-a7bd-3f1c7722e7cf.jpg", title: "Набор на выписку девочки 39", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 43, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/52ff177d-db08-4265-9a39-f51d76af8ecd.jpg", title: "Набор на выписку девочки 40", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 44, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/fa29bc90-9479-45db-86b2-53d5dc33965e.jpg", title: "Набор на выписку девочки 41", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 45, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/058e735d-79d8-4e46-8bc7-8466816453ab.jpg", title: "Набор на выписку девочки 42", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 46, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/dd26414f-f6c8-40a4-b70c-5801b95555d9.jpg", title: "Набор на выписку девочки 43", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 47, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/72e03c14-c49d-4d30-8c91-1c25c6fcc583.jpg", title: "Набор на выписку девочки 44", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 48, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/55e08ff5-29ab-4d8a-823e-ce388bd8ad1e.jpg", title: "Набор на выписку девочки 45", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 49, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/148a597f-57eb-4a44-bf47-3b5c56f7d22d.jpg", title: "Набор на выписку девочки 46", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 50, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c5479980-b339-4ff9-9fa0-e79cc9f6ca8e.jpg", title: "Набор на выписку девочки 47", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 51, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1483df2b-5469-44ef-871e-8b08c063ff1f.jpg", title: "Набор на выписку девочки 48", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 52, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/17ae63af-e59f-49e5-8351-8c05bb433e67.jpg", title: "Набор на выписку девочки 49", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 53, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/27288ee6-95a6-4d19-aa3a-12fcab27e9ad.jpg", title: "Набор на выписку девочки 50", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 54, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/0daff32e-04c3-4c8c-b233-813e7235307b.jpg", title: "Набор на выписку девочки 51", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 55, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8c7ade86-8173-465a-adaa-2fe15d44a1a7.jpg", title: "Набор на выписку девочки 52", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 56, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/52983ca0-4a95-4248-8aee-c71e8c797e45.jpg", title: "Набор на выписку девочки 53", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 57, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ce339c82-7a2a-4f93-a201-171422cbc798.jpg", title: "Набор на выписку девочки 54", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 58, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/dab036cc-6815-4148-aab4-6517afad8035.jpg", title: "Набор на выписку девочки 55", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 59, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e98dab48-e6ad-48d6-86d4-ae20fd9a6516.jpg", title: "Набор на выписку девочки 56", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 60, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/bc1fbe0c-0b64-4cec-85d8-6bcdf59b34c1.jpg", title: "Набор на выписку девочки 57", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 61, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/dfb35a0f-bf7a-46e5-9367-557fdfed92e6.jpg", title: "Набор на выписку девочки 58", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 62, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/000fc62e-9a06-468a-9d51-089a4159452e.jpg", title: "Набор на выписку девочки 59", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 63, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9868ad49-2eaf-4a5f-85c3-d6fa891999bd.jpg", title: "Набор на выписку девочки 60", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 64, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f925282e-8460-4752-904b-d3cd7f366019.jpg", title: "Набор на выписку девочки 61", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 65, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8bd390b0-4713-401d-9eee-b8c9bee10dcd.jpg", title: "Набор на выписку девочки 62", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 66, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f44ee8bb-709a-4078-94d8-67a15a74fccb.jpg", title: "Набор на выписку девочки 63", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 67, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/707aab3c-f0d7-4b11-a5f7-c08bcc9b0e35.jpg", title: "Набор на выписку девочки 64", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 68, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c31cddb5-7f7f-47b9-abfa-d43daee3b6e7.jpg", title: "Набор на выписку девочки 65", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 69, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/49e936db-7cd0-4c84-9ab3-c46b88156164.jpg", title: "Набор на выписку девочки 66", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 70, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/aaf0e6cf-5996-4591-953b-84b77d40cb39.jpg", title: "Набор на выписку девочки 67", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 71, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1e04abf8-5e2e-4b65-bbca-c5803ef42dd0.jpg", title: "Набор на выписку девочки 68", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 72, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d89a692d-c922-4b54-bb06-174e25f51325.jpg", title: "Набор на выписку девочки 69", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 73, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/86dfb25e-2722-4e0a-acc0-18a790f9212f.jpg", title: "Набор на выписку девочки 70", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 74, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4f562a96-1cbd-4cd0-aa85-60554ec91aea.jpg", title: "Набор на выписку девочки 71", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 75, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/261b52d2-8455-42cb-a555-04c6468f5d75.jpg", title: "Набор на выписку девочки 72", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 76, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/577ea56d-7f28-4ca7-b38b-214273ef032a.jpg", title: "Набор на выписку девочки 73", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 77, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ef9026d4-c519-4bcb-a503-323b7eaf2216.jpg", title: "Набор на выписку девочки 74", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 78, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/18454617-43f3-4f55-854a-d8152bd161b4.jpg", title: "Набор на выписку девочки 75", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 79, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4c760cd9-8919-45ff-8fe0-f34cea546d2a.jpg", title: "Набор на выписку девочки 76", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 80, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/79b7fa7d-b0d7-48e6-9803-45718d9d6f37.jpg", title: "Набор на выписку девочки 77", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 81, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1f29127a-c9c6-433e-8726-270da7132f14.jpg", title: "Набор на выписку девочки 78", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 82, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5e733f26-f288-40e3-8398-a2921875138b.jpg", title: "Набор на выписку девочки 79", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 83, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/87161528-025b-48ff-9c63-7a2ac85edb35.jpg", title: "Набор на выписку девочки 80", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 84, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6d42dda5-795c-4478-b758-3256bd99aa48.jpg", title: "Набор на выписку девочки 81", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 85, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/83d02592-b7ed-4330-9908-7d14a2eef816.jpg", title: "Набор на выписку девочки 82", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 86, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9380b273-4d51-475c-b3e4-d88cc046933c.jpg", title: "Набор на выписку девочки 83", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 87, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ffdfa719-d2ed-463c-8699-229e02362c9c.jpg", title: "Набор на выписку девочки 84", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 88, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/dca51dfa-c59f-42bd-9acd-c44be9420600.jpg", title: "Набор на выписку девочки 85", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 89, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f3827139-edb5-4ba2-bf24-5483572e3edd.jpg", title: "Набор на выписку девочки 86", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 90, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3edb0c28-05b2-4d33-8ca5-ba858ce8c461.jpg", title: "Набор на выписку девочки 87", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 91, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/943ef33a-79ea-4c71-bc8b-0b6932ac80e6.jpg", title: "Набор на выписку девочки 88", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 92, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a75b9752-0c30-4dd1-9cdb-e5599353509f.jpg", title: "Набор на выписку девочки 89", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 93, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d5df8325-f885-448c-a15f-5cef42403de1.jpg", title: "Набор на выписку девочки 90", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 94, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3662bedf-1d07-4868-a103-c089f11318a9.jpg", title: "Набор на выписку девочки 91", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 95, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a141e157-37ba-453a-b12e-fa893851d904.jpg", title: "Набор на выписку девочки 92", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 96, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/06d37a7f-0334-4b68-a793-ad5ecc455ec0.jpg", title: "Набор на выписку девочки 93", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 97, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7f8fdd8c-7dfd-4a85-9504-c3a1a83254aa.jpg", title: "Набор на выписку девочки 94", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 98, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f32a3904-9341-49bd-8be6-07008f9fe988.jpg", title: "Набор на выписку девочки 95", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 99, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/83638ed2-dde5-4c48-a7d5-b0e7b4e52aeb.jpg", title: "Набор на выписку девочки 96", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 100, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ecca287f-b19f-4258-a5d9-f0009b05fb5b.png", title: "Набор на выписку девочки 97", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 101, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9ef16d33-9e54-4bb3-baf4-1f74fe18d1a9.jpg", title: "Набор на выписку девочки 98", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 102, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7d3b85d3-cc75-45af-80a2-c00badeb1b96.jpg", title: "Набор на выписку девочки 99", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 103, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d0dcf776-7193-4238-b2c6-7b31427475f7.jpg", title: "Набор на выписку девочки 100", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 104, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6bc528d2-458a-4d5c-a5f6-0535da1b44d5.jpg", title: "Набор на выписку девочки 101", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 105, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6e016e63-7c3a-4aaf-b3ae-86ab34f407ad.jpg", title: "Набор на выписку девочки 102", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 106, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3055e31e-5289-4d0e-86cf-b76dc5fde7e2.jpg", title: "Набор на выписку девочки 103", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 107, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/08ed649d-6d39-4a6e-929f-104d949b445c.jpg", title: "Набор на выписку девочки 104", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 108, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/64aa05bd-c00c-4418-baf1-7408bbbd0c63.jpg", title: "Набор на выписку девочки 105", description: "Шары для выписки девочки.", price: "Цена по запросу", priceNum: 0, colors: ["pink", "white"], subcategory: "girl-discharge" },
  ],
}

type ModalItem = Composition | null

const PRICE_MIN = 0
const PRICE_MAX = 20000

// Все композиции дня рождения в случайном порядке
function buildBirthdayGrid(): Composition[] {
  const all = [
    ...compositions.girl,
    ...compositions.man,
    ...compositions.boy,
    ...compositions["kid-girl"],
  ]
  // Fisher-Yates shuffle с фиксированным seed-like подходом (детерминировано по дню)
  const arr = [...all]
  const seed = Math.floor(Date.now() / 86400000) // меняется раз в день
  for (let i = arr.length - 1; i > 0; i--) {
    const j = (seed * (i + 1) * 1664525 + 1013904223) % (i + 1)
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
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
    .sort((a, b) => {
      const numA = parseInt(a.title.match(/\d+$/)?.[0] ?? "0")
      const numB = parseInt(b.title.match(/\d+$/)?.[0] ?? "0")
      return numA - numB
    })

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
                    {cat.hit && (
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
              {/* Color dots — always visible bottom-right */}
              {item.colors && item.colors.length > 0 && (
                <div className="absolute top-2 right-2 flex gap-1">
                  {item.colors.slice(0, 4).map((colorId) => {
                    const colorOpt = COLOR_OPTIONS.find((c) => c.id === colorId)
                    if (!colorOpt) return null
                    return (
                      <span
                        key={colorId}
                        title={colorOpt.label}
                        className="w-3.5 h-3.5 rounded-full shadow-md border border-white/60 flex-shrink-0"
                        style={{ background: colorOpt.hex }}
                      />
                    )
                  })}
                </div>
              )}
              {/* Price + title overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-8 pb-2.5 px-3">
                <p
                  className="text-white text-[11px] font-medium truncate mb-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
                >{item.title}</p>
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
          <div className="px-4 pt-4 pb-2 flex items-start justify-between gap-2 flex-shrink-0">
            <div>
              <h3
                className="text-sm font-black leading-tight text-white inline-block px-2 py-0.5 rounded-md mb-1"
                style={{ background: "linear-gradient(135deg, hsl(var(--primary)), #fb7185)", letterSpacing: "0.02em", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}
              >{modal.title}</h3>
              <div><span className="text-primary font-bold text-lg">{modal.price}</span></div>
            </div>
          </div>
          <div className="px-4 pb-1 flex-shrink-0">
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
          <div className="flex items-start justify-between px-5 pt-5 pb-3 border-b border-border/40 flex-shrink-0">
            <div className="flex-1 min-w-0 pr-3">
              <h3
                className="text-base sm:text-lg font-black leading-tight text-white inline-block px-3 py-1 rounded-lg mb-1"
                style={{ background: "linear-gradient(135deg, hsl(var(--primary)), #fb7185)", letterSpacing: "0.02em", boxShadow: "0 2px 12px rgba(0,0,0,0.2)" }}
              >{modal.title}</h3>
              <div><span className="text-primary font-bold text-base sm:text-lg">{modal.price}</span></div>
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

  if (section === "other") {
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
          <div className="flex items-center gap-3 mb-6 sm:mb-10">
            <span className="text-3xl sm:text-4xl">🎉</span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold leading-tight">Другое мероприятие</h1>
              <p className="text-muted-foreground text-xs sm:text-sm">Гендер пати, выпускной, девичник, признание в любви</p>
            </div>
          </div>
          <div className="text-center py-24 text-muted-foreground">
            <span className="text-6xl mb-6 block">🎀</span>
            <p className="text-xl font-medium mb-2">Раздел скоро появится</p>
            <p className="text-sm">Пока можете заказать любую композицию через мессенджер</p>
            <a href="https://wa.me/79885973303" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-colors shadow-md">
              <Icon name="MessageSquare" size={18} /> Написать в WhatsApp
            </a>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (section === "custom") {
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
          <div className="flex items-center gap-3 mb-6 sm:mb-10">
            <span className="text-3xl sm:text-4xl">✨</span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold leading-tight">Собрать свою композицию</h1>
              <p className="text-muted-foreground text-xs sm:text-sm">Цифры, баблс, фигуры, хром, пастель</p>
            </div>
          </div>
          <div className="text-center py-24 text-muted-foreground">
            <span className="text-6xl mb-6 block">✨</span>
            <p className="text-xl font-medium mb-2">Раздел скоро появится</p>
            <p className="text-sm">Опишите желаемую композицию в мессенджере — подберём под вас</p>
            <a href="https://wa.me/79885973303" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-colors shadow-md">
              <Icon name="MessageSquare" size={18} /> Написать в WhatsApp
            </a>
          </div>
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
        <div className="grid grid-cols-2 gap-3 sm:gap-8">
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
          <button
            onClick={() => navigate("/catalog?section=other")}
            className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-violet-400 via-fuchsia-400 to-pink-500 min-h-[180px] sm:min-h-[320px] flex flex-col items-center justify-center gap-2 sm:gap-4 shadow-xl hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 p-4 sm:p-8"
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            <span className="relative text-5xl sm:text-7xl">🎉</span>
            <div className="relative text-center">
              <h2 className="text-white text-lg sm:text-3xl font-bold mb-1 sm:mb-2 leading-tight">Другое мероприятие</h2>
              <p className="text-white/80 text-xs sm:text-base hidden sm:block">Гендер пати, выпускной, девичник, признание в любви</p>
            </div>
            <div className="relative flex items-center gap-1 sm:gap-2 text-white/90 text-xs sm:text-sm font-medium">
              Смотреть <Icon name="ArrowRight" size={14} className="sm:hidden" />
              <span className="hidden sm:inline">композиции</span>
              <Icon name="ArrowRight" size={18} className="hidden sm:inline" />
            </div>
          </button>
          <button
            onClick={() => navigate("/catalog?section=custom")}
            className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 min-h-[180px] sm:min-h-[320px] flex flex-col items-center justify-center gap-2 sm:gap-4 shadow-xl hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 p-4 sm:p-8"
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            <span className="relative text-5xl sm:text-7xl">✨</span>
            <div className="relative text-center">
              <h2 className="text-white text-lg sm:text-3xl font-bold mb-1 sm:mb-2 leading-tight">Собрать свою композицию</h2>
              <p className="text-white/80 text-xs sm:text-base hidden sm:block">Цифры, баблс, фигуры, хром, пастель</p>
            </div>
            <div className="relative flex items-center gap-1 sm:gap-2 text-white/90 text-xs sm:text-sm font-medium">
              Смотреть <Icon name="ArrowRight" size={14} className="sm:hidden" />
              <span className="hidden sm:inline">элементы</span>
              <Icon name="ArrowRight" size={18} className="hidden sm:inline" />
            </div>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}