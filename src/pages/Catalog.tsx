import { useState, useEffect, useRef, useMemo } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import Icon from "@/components/ui/icon"

declare global { interface Window { _catalogScrollY?: number } }

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

const compositions: Record<string, Composition[]> = {
  girl: [
    { id: 7, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/07a8e9dd-25ba-4fae-bede-f14b8a502903.png", title: "Набор для девушки 7", description: "Шар-Баблс гигант стеклянный с конфетти и надписью (1шт), Прозрачные шары с конфетти (2шт), Хром шары серебро (3шт), Стеклянные шары розовые (5шт)", price: "4 180 ₽", priceNum: 4180, colors: ["pink", "silver"], subcategory: "girl" },
    { id: 8, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/97705f28-4088-4952-a2c5-2edbd299f917.png", title: "Набор для девушки 8", description: "Шары-Цифры фольгированные (2шт), Сердца фольгированные (2шт), Звезда фольгированная (1шт), Прозрачные шары с конфетти (3шт), Хром шары (5шт), Пастель шары (3шт)", price: "4 530 ₽", priceNum: 4530, colors: ["rosegold"], subcategory: "girl" },

    { id: 10, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/0c9ec2b1-da23-42d9-aa41-9e716ca91293.png", title: "Набор для девушки 10", description: "Шар-Баблс стеклянный с надписью (1шт), Сердце фольгированное (1шт), Хром шары золотые (3шт), Пастель шары белые (3шт)", price: "3 320 ₽", priceNum: 3320, colors: ["white"], subcategory: "girl" },
    { id: 11, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1f8dfda3-f3c1-4be6-8c15-01c601899fcc.png", title: "Набор для девушки 11", description: "Цифры фольгированные (2шт), Шары пастель (8шт)", price: "2 640 ₽", priceNum: 2640, colors: ["cream", "white"], subcategory: "girl" },
    { id: 12, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b4c20dea-4a11-488c-b862-f7b4a26773a4.png", title: "Набор для девушки 12", description: "Цифры фольгированные (2шт), Хром шары фиолетовые (8шт), Пастель шары черные (5шт)", price: "3 530 ₽", priceNum: 3530, colors: ["purple", "black"], subcategory: "girl" },

    { id: 15, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8f7c075c-87bf-476f-a6b8-629984c74a4a.jpg", title: "Набор для девушки 15", description: "Цифры фольгированные (2шт), Сердце фольгированное (1шт), Звезда фольгированная (1шт), Конфетти шары (2шт), Пастель шары (8шт)", price: "3 740 ₽", priceNum: 3740, colors: ["red", "rosegold"], subcategory: "girl" },
    { id: 16, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/93df0c07-b260-4461-a39b-5d354e8dbe46.jpg", title: "Набор для девушки 16", description: "Шар-баблс Гигант латексный с надписью и бантиками (1шт), Сердце фольгированное с бантиками (1шт), Шары пастель с бантиками (6шт)", price: "3 480 ₽", priceNum: 3480, colors: ["pink"], subcategory: "girl" },


    { id: 20, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/45c49962-4e56-453b-8e46-8e58bdaa0df7.jpg", title: "Набор для девушки 20", description: "Шар-Баблс Гигант стеклянный с надписью и бантиками (1шт), Стеклянные шары с бантиками (7шт)", price: "4 000 ₽", priceNum: 4000, colors: ["white"], subcategory: "girl" },
    { id: 21, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4e259000-cb7c-4a7a-96cf-84db21d7c173.jpg", title: "Набор для девушки 21", description: "Шар-Баблс Гигант стеклянный с надписью (1шт), Прозрачные шары (2шт), Пастель шары (6шт)", price: "3 290 ₽", priceNum: 3290, colors: ["cream", "white"], subcategory: "girl" },




    { id: 27, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a580c851-e92b-453d-983d-e7eb3730e151.jpg", title: "Набор для девушки 27", description: "Цифры фольгированные (2шт), Сердце фольгированное (1шт), Стеклянные шары (9шт)", price: "3 570 ₽", priceNum: 3570, colors: ["cream"], subcategory: "girl" },


    { id: 30, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b1579e94-8c3e-41db-a1ec-d53154641fac.jpg", title: "Набор для девушки 30", description: "Цифры фольгированные (2шт), Пастель шары с бантиками (10шт)", price: "3 400 ₽", priceNum: 3400, colors: ["black", "white"], subcategory: "girl" },


    

    { id: 38, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/cc0fa4b6-fbe3-4c29-9bae-067098ca7a60.jpg", title: "Набор для девушки 38", description: "Шар-Баблс гигант латексный с бантиками и надписью (1шт), Прозрачные шары с конфетти (2шт), Пастель шары (14шт)", price: "4 220 ₽", priceNum: 4220, colors: ["white", "pink", "cream"], subcategory: "girl" },
    { id: 39, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6e509ede-c7dd-4473-96a7-1590415b4f96.jpg", title: "Набор для девушки 39", description: "Шар-баблс гигант прозрачный с конфетти и надписью (1шт), Пастель шары (10шт)", price: "3 100 ₽", priceNum: 3100, colors: ["white"], subcategory: "girl" },







    { id: 50, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/41666dff-2472-484c-b318-dd34b08c91f7.jpg", title: "Набор для девушки 50", description: "Шар-баблс гигант стеклянный с бантиками и надписью (1шт), Стеклянные шары (10шт)", price: "4 200 ₽", priceNum: 4200, colors: ["pink"], subcategory: "girl" },
    { id: 51, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a348bda7-dd6c-441c-84ad-1918bf4c2274.jpg", title: "Набор для девушки 51", description: "Шар-баблс гигант стеклянный с надписью (1шт), Цифры фольгированные (1шт), Бантик фольгированный (1шт), Стеклянные шары под потолок (8шт), Стеклянные шары на связке (4шт), Баблс прозрачный маленький на связке (не посчитан)", price: "6 650 ₽", priceNum: 6650, colors: ["cream", "black"], subcategory: "girl" },
    { id: 55, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b880be31-f42a-43a2-a388-7a60b0eb4710.jpg", title: "Набор для девушки 55", description: "Шар-баблс гигант стеклянный с бантиками и надписью (1шт), Стеклянные шары под потолок (14шт), Сердца фольгированные (6шт), Стеклянные шары на связке (10шт), Прозрачные баблс шары без наполнения (не посчитаны)", price: "8 820 ₽", priceNum: 8820, colors: ["beige", "cream"], subcategory: "girl" },
    { id: 56, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7243c3dc-174b-4156-bc76-0b8dd610bc15.jpg", title: "Набор для девушки 56", description: "Звезда гигант фольгированная с надписью (1шт), Стеклянные шары с конфетти розовые и белые (7шт), Пастель шары черные (2шт)", price: "3 510 ₽", priceNum: 3510, colors: ["pink"], subcategory: "girl" },


    { id: 60, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/038c18ad-9f74-41dc-aa99-d647a5b2681a.png", title: "Набор для девушки 60", description: "Шар-Баблс гигант прозрачный с бантиками и надписью (1шт), Мишка фигурка фольгированная (1шт), Пастель шары (9шт)", price: "3 620 ₽", priceNum: 3620, colors: ["white", "pink", "cream"], subcategory: "girl" },

    

    { id: 65, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f3962649-7e65-4ace-9443-30e042a7a9a4.jpg", title: "Набор для девушки 65", description: "Шар-сердце гигант с надписью (1шт), Фотографии на сердце гигант, Цифры фольгированные (2шт), Шары прозрачный с конфетти (5шт), Хром шары коричневые и золотые (8шт), Пастель шары кремовые (10шт), Ленты атласные (25шт)", price: "6 830 ₽", priceNum: 6830, colors: ["silver", "beige", "white", "cream"], subcategory: "girl", contain: true },
    { id: 66, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7db3285d-352e-4125-b4c7-a88006126bcc.jpg", title: "Набор для девушки 66", description: "Шар-Баблс гигант стеклянный с надписью и бантиками (1шт), Шары сердца фольгированные (3шт), Пастель шары кремовые (7шт), Ленты атласные (11шт)", price: "4 320 ₽", priceNum: 4320, colors: ["cream"], subcategory: "girl" },
    { id: 67, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3e389bd7-f598-4ed3-8d89-40e7535095ba.jpg", title: "Набор для девушки 67", description: "Шар-Баблс гигант стеклянный с надписью и бантиками (1шт), Стеклянные шары с бантиками (5шт), Ленты атласные (6шт)", price: "3 460 ₽", priceNum: 3460, colors: ["white"], subcategory: "girl" },


    { id: 73, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9f493015-c566-4439-b088-55735bb64c33.jpg", title: "Набор для девушки 73", description: "Шар-Баблс гигант стеклянный с конфетти и надписью, Пастель шары фиолетовые и желтые (20шт)", price: "5 000 ₽", priceNum: 5000, colors: ["purple", "yellow"], subcategory: "girl" },

    { id: 75, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8ca2913b-df38-455c-aa6a-3d7b749ff731.jpg", title: "Набор для девушки 75", description: "Фигура Бэтмен (1шт), Пастель шары белые и черные (30шт)", price: "4 700 ₽", priceNum: 4700, colors: ["white", "black"], subcategory: "girl" },





    { id: 83, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e580e320-9f0c-4a46-9b3c-9cc947023a22.jpg", title: "Набор для девушки 83", description: "", price: "0 ₽", priceNum: 0, colors: [], subcategory: "girl" },
    { id: 84, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d428e434-207e-4f5b-b671-48533f17c441.jpg", title: "Набор для девушки 84", description: "", price: "0 ₽", priceNum: 0, colors: [], subcategory: "girl" },
    { id: 85, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3f29d56e-b5b2-4051-b2be-31fc45633682.jpg", title: "Набор для девушки 85", description: "", price: "0 ₽", priceNum: 0, colors: [], subcategory: "girl" },
    { id: 86, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/96315c5d-e4ea-4d0b-8803-c4079d86ffec.jpg", title: "Набор для девушки 86", description: "", price: "0 ₽", priceNum: 0, colors: [], subcategory: "girl" },
    { id: 87, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4aef92d8-7ac3-4102-b83a-33ba9b8cb1d9.jpg", title: "Набор для девушки 87", description: "", price: "0 ₽", priceNum: 0, colors: [], subcategory: "girl" },
    { id: 88, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1b105db1-7d69-4ae6-b4fd-ea7a9db72078.jpg", title: "Набор для девушки 88", description: "", price: "0 ₽", priceNum: 0, colors: [], subcategory: "girl" },
    { id: 89, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b5acb38e-3f6e-4aa9-a511-1d9a2e738bfd.jpg", title: "Набор для девушки 89", description: "", price: "0 ₽", priceNum: 0, colors: [], subcategory: "girl" },
    { id: 90, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8029ce86-b754-4d2d-8aa0-582b0012c6fa.jpg", title: "Набор для девушки 90", description: "", price: "0 ₽", priceNum: 0, colors: [], subcategory: "girl" },
    { id: 91, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/fb210d32-c8a7-46ce-836c-86aa25f64c3b.jpg", title: "Набор для девушки 91", description: "", price: "0 ₽", priceNum: 0, colors: [], subcategory: "girl" },
    { id: 92, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/58b4871c-7aff-4308-b4c0-0a47ee5e1b5a.jpg", title: "Набор для девушки 92", description: "", price: "0 ₽", priceNum: 0, colors: [], subcategory: "girl" },
    { id: 93, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/46c4e5dd-35c8-41be-bd8d-bb298213ac3c.jpg", title: "Набор для девушки 93", description: "", price: "0 ₽", priceNum: 0, colors: [], subcategory: "girl" },
    { id: 94, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9572e95c-844b-4963-a643-fdafd013ae83.jpg", title: "Набор для девушки 94", description: "", price: "0 ₽", priceNum: 0, colors: [], subcategory: "girl" },
    { id: 95, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ab4059bf-8b2e-4c3a-8267-96389b778a60.jpg", title: "Набор для девушки 95", description: "", price: "0 ₽", priceNum: 0, colors: [], subcategory: "girl" },
    { id: 96, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/527f054c-8a60-4ee2-98d5-2eb8b751b57b.jpg", title: "Набор для девушки 96", description: "", price: "0 ₽", priceNum: 0, colors: [], subcategory: "girl" },
    { id: 97, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/afcfd052-dcf5-47cb-8775-57679f7ed0af.png", title: "Набор для девушки 97", description: "", price: "0 ₽", priceNum: 0, colors: [], subcategory: "girl" },
    { id: 98, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/bb50e0f9-1184-4d5e-a4a1-0ba826e1e783.jpg", title: "Набор для девушки 98", description: "", price: "0 ₽", priceNum: 0, colors: [], subcategory: "girl" },
    { id: 99, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/12791a71-db90-4594-947f-b764d8af3998.jpg", title: "Набор для девушки 99", description: "", price: "0 ₽", priceNum: 0, colors: [], subcategory: "girl" },
    { id: 100, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/93fddedc-e8c7-4fc9-9acc-b0f711d09648.jpg", title: "Набор для девушки 100", description: "", price: "0 ₽", priceNum: 0, colors: [], subcategory: "girl" },
    { id: 101, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2030d943-39fe-457f-80d7-de9d82ea0506.jpg", title: "Набор для девушки 101", description: "", price: "0 ₽", priceNum: 0, colors: [], subcategory: "girl" },
    { id: 102, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/73f94248-dd55-4f06-a5b9-5142dc439fb7.jpg", title: "Набор для девушки 102", description: "", price: "0 ₽", priceNum: 0, colors: [], subcategory: "girl" },
    { id: 103, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/97b69809-9826-41c3-89ad-8e8440444053.jpg", title: "Набор для девушки 103", description: "", price: "0 ₽", priceNum: 0, colors: [], subcategory: "girl" },
    { id: 104, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9aeb834b-0f87-47cd-a5f4-85a0259674ce.jpg", title: "Набор для девушки 104", description: "", price: "0 ₽", priceNum: 0, colors: [], subcategory: "girl" },

    { id: 82, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/40b47215-e536-4098-88e0-89d9a23812af.jpg", title: "Набор для девушки 82", description: "Шар-Баблс гигант прозрачный с фатином и надписью (1шт), Пастель шары пыльная роза с бантиками (20шт)", price: "5 200 ₽", priceNum: 5200, colors: ["pink"], subcategory: "girl" },
    { id: 83, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e7e6555d-132d-4da8-9ef7-f053ea5147e7.jpg", title: "Набор для девушки 83", description: "Баблс-Гигант стеклянный с бантиками и надписью (1шт), Сердца фольгированные (24шт), Ленты атласные (25шт)", price: "10 900 ₽", priceNum: 10900, colors: ["red"], subcategory: "girl" },
    { id: 84, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/83a744ce-be52-4353-a022-4ffb12b1aef3.jpg", title: "Набор для девушки 84", description: "Шар-Баблс прозрачный с перьями внутри, бантиками и надписью (1шт), Шары-Цифры с бантиками (2шт), Стеклянные шары с бантиками (7шт)", price: "5 560 ₽", priceNum: 5560, colors: ["pink"], subcategory: "girl" },


    { id: 89, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/82e22194-fdc6-4075-89d1-ed1f6f4cd0d9.jpg", title: "Набор для девушки 89", description: "Шар-Баблс гигант стеклянный с бантиками и надписью (1шт), Сердце фольгированное (1шт), Шары прозрачные с конфетти (2шт), Стеклянные шары (7шт), Ленты атласные (11шт)", price: "4 370 ₽", priceNum: 4370, colors: ["cream", "white"], subcategory: "girl" },
    { id: 90, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ad3c5ccd-abdf-41f0-af01-5a37b43d7958.jpg", title: "Набор для девушки 90", description: "Шар-Баблс гигант стеклянный с конфетти и надписью (1шт), Хром шары (4шт), Стеклянные шары (6шт)", price: "4 120 ₽", priceNum: 4120, colors: ["cream", "gold", "yellow"], subcategory: "girl" },
    { id: 91, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8ad6dc85-ebae-4a04-990e-3f124a77784e.jpg", title: "Набор для девушки 91", description: "Шар-Баблс гигант прозрачный с шариками внутри (1шт), Цифры фольгированные (2шт), Звезды фольгированные (2шт), Прозрачные шары с конфетти (3шт), Пастель шары (3шт), Ленты атласные (10шт)", price: "5 390 ₽", priceNum: 5390, colors: ["pink"], subcategory: "girl" },
    

    

    { id: 97, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/543eb99a-4552-42f4-bb93-2b8a75c04001.jpg", title: "Набор для девушки 97", description: "Шар-Баблс гигант с бантиками и надписью (1шт), Стеклянные шары с бантиками (20шт)", price: "6 400 ₽", priceNum: 6400, colors: ["pink", "cream"], subcategory: "girl" },
    { id: 98, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a1022ed0-dbe7-485e-ae08-fbac8483c2b6.jpg", title: "Набор для девушки 98", description: "Шар-Баблс стеклянный с бантиками и надписью (1шт), Хром шары золотые (6шт), Пастель шары зеленые и кремовые с бантиками (18шт)", price: "6 000 ₽", priceNum: 6000, colors: ["green"], subcategory: "girl" },

    { id: 100, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e41c8cc0-dc63-41f9-90c8-a5754e5930cd.jpg", title: "Набор для девушки 100", description: "Шар-Сердце гигант с надписью (1шт), Хром шары серебро (3шт), Пастель шары черные и кремовые (6шт), Ленты атласные (10шт)", price: "3 040 ₽", priceNum: 3040, colors: ["silver"], subcategory: "girl" },
    { id: 101, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3bb212ac-e980-42e2-b697-c5ed01c729f5.jpg", title: "Набор для девушки 101", description: "Шар-Баблс гигант стеклянный с бантиками и надписью (1шт), Стеклянные шары с бантиками (5шт), Ленты атласные (6шт)", price: "3 480 ₽", priceNum: 3480, colors: ["white"], subcategory: "girl" },



    { id: 105, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/705ca319-2353-4ba6-bc3d-a6f0b079e5a4.jpg", title: "Набор для девушки 105", description: "Шары цифры фольгированные (2шт), Хром шары золотые (3шт), Пастель шары (6шт)", price: "2 860 ₽", priceNum: 2860, colors: ["gold"], subcategory: "girl" },

    { id: 111, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7362df61-147d-4534-bc5e-29f7a42f59da.jpg", title: "Набор для девушки 111", description: "Шар-Баблс гигант с фатином внутри и надписью (1шт), Сердце фольгированное (1шт), Прозрачные шары с конфетти (4шт), Хром шары фиолетовые (4шт), Пастель шары черные (4шт)", price: "4 310 ₽", priceNum: 4310, colors: ["purple"], subcategory: "girl" },
    { id: 112, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4976af09-fee7-4181-830d-7810c8977d49.jpg", title: "Набор для девушки 112", description: "Шар-Баблс гигант прозрачный с перьями и надписью, Прозрачные шары с конфетти (2шт), Хром шары золотые (8шт), Пастель шары черные и белые (8шт)", price: "4 720 ₽", priceNum: 4720, colors: ["gold"], subcategory: "girl" },

    { id: 115, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5c7432d5-f5dd-473f-83a5-209339ee4a5f.jpg", title: "Набор для девушки 115", description: "Цифры фольгированные (2шт), Сердца фольгированные (25шт)", price: "10 000 ₽", priceNum: 10000, colors: ["red", "cream"], subcategory: "girl" },
    { id: 116, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3cd2b4cb-ad3d-46c0-8332-ca0285484dcb.jpg", title: "Набор для девушки 116", description: "Шар-Баблс прозрачный с перьями и надписью (1шт), Цифры фольгированные (2шт), Сердца фольгированные (4шт), Прозрачные шары с конфетти (2шт)", price: "5 400 ₽", priceNum: 5400, colors: ["pink"], subcategory: "girl" },
    
    { id: 118, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7e86abb0-9ade-4838-ad92-5b039c141b73.jpg", title: "Набор для девушки 118", description: "Шар-гигант стеклянные с бантиками (1шт), Стеклянные шары с бантиками (7шт), Ленты атласные (8шт)", price: "4 000 ₽", priceNum: 4000, colors: ["cream"], subcategory: "girl" },
    { id: 119, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/fb6774cf-d023-4028-a762-e6f2f3ee58ca.jpg", title: "Набор для девушки 119", description: "Торт фигурка (1шт), Сердце фольгированное с надписью 46 см (1шт), Прозрачные шары с конфетти (3шт), Пастель шары (5шт)", price: "2 650 ₽", priceNum: 2650, colors: ["pink"], subcategory: "girl" },
    { id: 120, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e9b6884b-921d-4336-9879-2a80a1d8d7bc.jpg", title: "Набор для девушки 120", description: "Шары-цифры фольгированные (2шт), Прозрачные шары с конфетти (3шт), Хром шары золотые (4шт), Пастель шары черные (3шт)", price: "3 230 ₽", priceNum: 3230, colors: ["gold"], subcategory: "girl" },
    { id: 121, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a577e9a1-dc7f-4cab-9257-295272a64113.jpg", title: "Набор для девушки 121", description: "Шар-баблс гигант стеклянный с бантиками и надписью (1шт), Стеклянные шары (9шт)", price: "3 870 ₽", priceNum: 3870, colors: ["cream", "pink"], subcategory: "girl" },

    { id: 124, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5f7f71be-dd42-4455-ac2b-d4d854a12031.jpg", title: "Набор для девушки 124", description: "Шары-цифры фольгированные (2шт), Хром шары золотые (12шт), Пастель шары зеленые и кремовые (8шт)", price: "4 560 ₽", priceNum: 4560, colors: ["gold", "green"], subcategory: "girl" },
    { id: 128, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a1fb6532-b1fd-4ec5-9266-855c9c7f103c.jpg", title: "Набор для девушки 128", description: "Шар-Баблс гигант стеклянный и надписью (1шт), Шары-сердца фольгированные (4шт), Хром шары золотые (6шт), Пастель шары (6шт)", price: "5 240 ₽", priceNum: 5240, colors: ["pink"], subcategory: "girl" },
    { id: 129, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c895c453-6d17-49fb-8409-2ed7b3b0ff73.jpg", title: "Набор для девушки 129", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Прозрачные шары (2шт), Пастель шары (6шт), Ленты атласные (9шт)", price: "3 230 ₽", priceNum: 3230, colors: ["white", "cream"], subcategory: "girl" },

    

    
    { id: 136, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/aa3ca436-a468-4f87-99c2-f04f6cbe4b01.jpg", title: "Набор для девушки 136", description: "Шар-Баблс гигант стеклянный с бантиками и надписью (1шт), Сердца фольгированные (2шт), Стеклянные шары с конфетти (16шт), Ленты-дождик (18шт)", price: "7 500 ₽", priceNum: 7500, colors: ["white"], subcategory: "girl" },
    
    { id: 138, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/689f1b77-74bb-4ea6-a0f9-5b6725a5b3be.jpg", title: "Набор для девушки 138", description: "Шары-Цифры фольгированные (2шт), Звезда фольгированная (1шт), Сердце фольгированное (1шт), Прозрачные шары с конфетти (2шт), Хром шары (3шт), Пастель шары (3шт)", price: "3 570 ₽", priceNum: 3570, colors: ["rose-gold"], subcategory: "girl" },
    { id: 142, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ea6c4058-e00a-4899-92dd-3ef909796345.jpg", title: "Набор для девушки 142", description: "Шар-Цифра с бантиками (1шт), Пастель шары с бантиками (5шт), Ленты атласные (6шт)", price: "1 800 ₽", priceNum: 1800, colors: ["white"], subcategory: "girl" },
    { id: 143, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b1e9f95d-5730-4af7-bd2b-a7fdf20a0ebf.jpg", title: "Набор для девушки 143", description: "Шары-Цифры фольгированные (2шт), Прозрачный шар с конфетти (1шт), Хром шары (4шт), Пастель шары (4шт)", price: "2 960 ₽", priceNum: 2960, colors: ["rose-gold"], subcategory: "girl" },

    { id: 146, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4f6a5b60-e136-4e2b-b64e-f14d4ba881be.jpg", title: "Набор для девушки 146", description: "Шар-Сердце гигант с надписью (1шт), Фигурка Мишка фольгированная (1шт), Сердце фольгированная (2шт), Хром шары золотые (10шт), Пастель шары белые и розовые (28шт)", price: "8 000 ₽", priceNum: 8000, colors: ["pink", "gold"], subcategory: "girl" },
    { id: 148, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/faba83e4-a5bd-485c-8de7-57f40f279c2e.jpg", title: "Набор для девушки 148", description: "Шар-Баблс гигант стеклянный с конфетти и надписью (1шт), Сердца фольгированные (2шт), Стеклянные шары с конфетти (2шт), Пастель шары (5шт)", price: "4 250 ₽", priceNum: 4250, colors: ["pink", "cream"], subcategory: "girl" },
    { id: 152, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7d562783-4e29-48ea-985e-dd5fce5cc0ea.jpg", title: "Набор для девушки 152", description: "Шары-Цифры фольгированные (2шт), Шар-Баблс прозрачный с шариками внутри (1шт), Сердца фольгированные (2шт), Хром шары (2шт), Пастель шары (2шт)", price: "3 630 ₽", priceNum: 3630, colors: ["gold"], subcategory: "girl" },
    { id: 153, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e8dfc673-5926-4c59-873d-67519451b8d5.jpg", title: "Набор для девушки 153", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Шары-Цифры фольгированные (2шт), Сердца фольгированные (3шт), Хром шары фольгированные (3шт)", price: "5 230 ₽", priceNum: 5230, colors: ["cream", "white"], subcategory: "girl" },
    { id: 155, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/01f23696-8f17-4dbe-aeaa-33ca61baaa73.jpg", title: "Набор для девушки 155", description: "Шары-Цифры (2шт), Прозрачные шары с конфетти (2шт), Хром шары серебро (4шт), Перламутр шары белые (4шт), Атласные ленты (12шт)", price: "3 280 ₽", priceNum: 3280, colors: ["silver"], subcategory: "girl" },

    { id: 157, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/50336539-d2d6-485a-8a5e-e74fbfb6a60b.jpg", title: "Набор для девушки 157", description: "Шар-Баблс гигант стеклянный с конфетти, наклейкой, надписью (1шт), Стеклянные шары с наклейкой (9шт), Ленты атласные (10шт)", price: "4 340 ₽", priceNum: 4340, colors: ["pink"], subcategory: "girl" },

    
    { id: 162, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/00bbf434-3a69-44ac-a0a5-fbb3375c419d.JPG", title: "Набор для девушки 162", description: "Шар-Цифра (1шт), Хром шары серебро с бантиками (2шт), Пастель шары розовые с бантиками (5шт), Ленты атласные (8шт)", price: "1 840 ₽", priceNum: 1840, colors: ["pink"], subcategory: "girl" },
    { id: 163, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/631ac9a2-6499-4732-9c84-bb3ab360878e.JPG", title: "Набор для девушки 163", description: "Шары-Цифры (2шт), Прозрачные шары с конфетти (3шт), Хром шары золотые (4шт), Пастель шары черные (3шт), Ленты атласные (2шт)", price: "3 250 ₽", priceNum: 3250, colors: ["gold"], subcategory: "girl" },

    
    { id: 168, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/58057721-e7f4-44b6-8bcf-9921b77ae291.JPG", title: "Набор для девушки 168", description: "Шары-Цифры фольгированные (2шт), Сердца фольгированные (2шт), Прозрачные шары с конфетти (6шт), Перламутр шары (8шт)", price: "3 840 ₽", priceNum: 3840, colors: ["rose-gold"], subcategory: "girl" },
    { id: 169, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7cb80026-8eb2-4e44-96a4-7d8405629e43.JPG", title: "Набор для девушки 169", description: "Шары-Цифры фольгированные (2шт), Сердца фольгированные (3шт), Прозрачные шары с конфетти (2шт), Хром шары (2шт), Пастель шары (2шт), Ленты атласные (11шт)", price: "3 740 ₽", priceNum: 3740, colors: ["cream"], subcategory: "girl" },

    { id: 177, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/aed0079a-a8d4-4495-b406-167c518789c4.jpg", title: "Набор для девушки 177", description: "Сердце гигант фольгированное с надписью (1шт), Сердце фольгированное (1шт), Стеклянные шары (7шт), Ленты атласные (9шт)", price: "3 470 ₽", priceNum: 3470, colors: ["purple", "white"], subcategory: "girl" },

    { id: 181, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3e18d3de-c67d-4588-a399-f1d343991c2c.jpg", title: "Набор для девушки 181", description: "Шары-Цифры фольгированные (2шт), Сердца фольгированные (3шт), Прозрачные шары с конфетти (3шт), Хром шары золотые (3шт), Пастель шары красные (3шт)", price: "4 120 ₽", priceNum: 4120, colors: ["gold", "red"], subcategory: "girl" },
    { id: 182, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f668458a-5b7e-48d1-bd16-44178b48ebf4.jpg", title: "Набор для девушки 182", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Прозрачные шары с конфетти (4шт), Красные шары рефлекс180 (5шт), Ленты атласные (10шт)", price: "3 800 ₽", priceNum: 3800, colors: ["red"], subcategory: "girl" },

    { id: 187, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/0530d4db-14af-4915-9d72-e93d95880543.jpg", title: "Набор для девушки 187", description: "Красивая композиция из шаров на день рождения.", price: "6 500 ₽", priceNum: 6500, colors: ["cream", "black"], subcategory: "girl" },

    { id: 189, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/dcb470df-25cb-4ac2-86ea-211c2724d249.jpg", title: "Набор для девушки 189", description: "Шар-Баблс гигант стеклянный с бантиками и надписью (1шт), Сердца фольгированные (2шт), Стеклянные шары (5шт), Ленты атласные (8шт)", price: "3 900 ₽", priceNum: 3900, colors: ["cream", "brown"], subcategory: "girl" },
    { id: 190, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ca0f67ea-ea96-4e32-afc0-9d10819d184a.jpg", title: "Набор для девушки 190", description: "Шар-Баблс гигант прозрачный с конфетти и надписью (1шт), Пастель шары (5шт)", price: "2 450 ₽", priceNum: 2450, colors: ["pink"], subcategory: "girl" },
    { id: 191, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/015c0400-37d6-449c-b866-4787f38b1937.jpg", title: "Набор для девушки 191", description: "Шар-Сердце гигант с надписью (1шт), Пастель шары (10шт), Ленты атласные (11шт)", price: "2 910 ₽", priceNum: 2910, colors: ["red", "silver"], subcategory: "girl" },
    { id: 192, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/0939b555-3c19-471a-b3d2-6523da59fe51.png", title: "Набор для девушки 192", description: "Шар-Баблс гигант прозрачный с перьями и надписью (1шт), Шары-Цифры фольгированные (2шт), Стеклянные шары (7шт)", price: "4 760 ₽", priceNum: 4760, colors: ["pink"], subcategory: "girl" },
    

    { id: 197, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1db9ce67-ab76-4822-bfa2-30940743c934.jpg", title: "Набор для девушки 197", description: "Шары-Цифры фольгированные (2шт), Пастель шары с бантиками (10шт), Ленты атласные (12шт)", price: "3 000 ₽", priceNum: 3000, colors: ["white", "black"], subcategory: "girl" },
    { id: 199, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/47bb0c39-4483-4235-9a65-1f2727c2c82b.jpg", title: "Набор для девушки 199", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Прозрачные шары (2шт), Пастель шары (6шт), Ленты атласные (9шт)", price: "3 230 ₽", priceNum: 3230, colors: ["white", "cream"], subcategory: "girl" },
    { id: 200, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2c56389b-d8de-47c1-b427-c22f2f020328.jpg", title: "Набор для девушки 200", description: "Шар-Баблс стеклянный гигант с конфетти и надписью (1шт), Звезда фольгированная с надписью (1шт), Сердце фольгированное (2шт), Шары пастель черные и розовые (3шт), Ленты атласные (7шт)", price: "4 060 ₽", priceNum: 4060, colors: ["black", "pink"], subcategory: "girl" },

    { id: 202, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/32026cfc-70a5-4d97-b78d-cb523af000dc.jpg", title: "Набор для девушки 202", description: "Шары-Цифры фольгированные (2шт), Хром шары золотые (4шт), Пастель шары белые (4шт)", price: "2 760 ₽", priceNum: 2760, colors: ["white", "gold"], subcategory: "girl" },
    { id: 203, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d02c4901-1a8d-43c4-8c4f-ab84e9f66e77.jpg", title: "Набор для девушки 203", description: "Шар-Баблс гигант стеклянный с бантиками и надписью (1шт), Стеклянные шары розовые (5шт), Пастель шары желтые (5шт)", price: "3 800 ₽", priceNum: 3800, colors: ["yellow"], subcategory: "girl" },



    

    { id: 218, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/0ca586a2-417b-4869-8951-850abfd2c4b6.png", title: "Набор для девушки 218", description: "Шары-Цифры фольгированные (2шт), Хром шары золотые (4шт), Прозрачные шары (2шт), Пастель шары черные (4шт)", price: "3 000 ₽", priceNum: 3000, colors: ["gold"], subcategory: "girl" },






    { id: 230, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/dab62de6-2fe1-446b-b323-dd0cb8f46df4.jpg", title: "Набор для девушки 230", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Сердца фольгированные (3шт), Прозрачные шары конфетти (2шт), Стеклянные шары кремовые (2шт), Пастель шар коричневый (1шт), Ленты атласные (10шт)", price: "3 780 ₽", priceNum: 3780, colors: ["cream"], subcategory: "girl" },
    { id: 233, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b5a9ac27-c8ef-445c-bd82-b03e271d82d8.jpg", title: "Набор для девушки 233", description: "Шары-Цифры фольгированные (2шт), Сердце фольгированное с надписью (1шт), Хром шары фиолетовые (3шт), Пастель шары фиолетовые (5шт), Пастель шары черные (5шт)", price: "3 880 ₽", priceNum: 3880, colors: ["purple"], subcategory: "girl" },

    { id: 238, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/269c223f-5e1b-4a11-9dd2-3aca2e72cf01.jpg", title: "Набор для девушки 238", description: "Шар-Баблс прозрачный с перьями и надписью (1шт), Сердце фольгированное (1шт), Стеклянные шары (8шт)", price: "3 690 ₽", priceNum: 3690, colors: ["blue", "pink"], subcategory: "girl" },
    { id: 239, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/51bf200c-719e-4e82-903a-f1dea9886645.jpg", title: "Набор для девушки 239", description: "Шары-Цифры (2шт), Сердца фольгированные с надписью (2шт), Хром шары серебро (3шт), Пастель шары черные (4шт), Ленты атласные (11шт)", price: "3 560 ₽", priceNum: 3560, colors: ["black", "red"], subcategory: "girl" },
    { id: 240, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6270621c-0e2e-4247-a282-79c0018afe0c.jpg", title: "Набор для девушки 240", description: "Шары-Цифры фольгированные (2шт), Хром шары черные и золотые (24шт), Ленты атласные (26шт)", price: "5 680 ₽", priceNum: 5680, colors: ["gold", "black"], subcategory: "girl" },

    { id: 242, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b19ea713-c192-40dd-a8be-e84c58626e0e.jpg", title: "Набор для девушки 242", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Сердца фольгированные (2шт), Прозрачные шары с конфетти (2шт), Стеклянные шары с конфетти (4шт)", price: "4 200 ₽", priceNum: 4200, colors: ["cream", "gold"], subcategory: "girl" },

    { id: 246, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5d9477a3-9ff3-4c32-a373-869a2506b573.jpg", title: "Набор для девушки 246", description: "Шар-Баблс гигант стеклянный с конфетти и надписью (1шт), Сердце фольгированное (1шт), Прозрачный шар с конфетти (1шт), Хром шары фиолетовые и серебро (5шт), Пастель шары нежно фиолетовые (3шт), Ленты атласные (11шт)", price: "3 900 ₽", priceNum: 3900, colors: ["purple"], subcategory: "girl" },



    { id: 252, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a1703ffa-3145-4027-a453-85e891c88a9d.jpg", title: "Набор для девушки 252", description: "Шар-Баблс гигант стеклянный с конфетти и надписью (1шт), Стеклянные шары кремовые (4шт), Хром шары золотые (4шт)", price: "3 760 ₽", priceNum: 3760, colors: ["rosegold"], subcategory: "girl" },
    

    { id: 255, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/005619a2-3d9c-4ee4-9142-864f3dd88856.jpg", title: "Набор для девушки 255", description: "Шар-Баблс гигант прозрачный с шариками внутри и надписью (1шт), Прозрачные шары с конфетти (2шт), Хром шары золотые (4шт), Пастель шары кремовые и белые (4шт), Ленты атласные (11шт)", price: "3 670 ₽", priceNum: 3670, colors: ["gold"], subcategory: "girl" },
    { id: 256, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/567ecf0d-f909-4992-b5bb-282027121a0c.jpg", title: "Набор для девушки 256", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Хром шары золотые (3шт), Стеклянные шары розовые (3шт), Пастель шары белые (3шт), Ленты атласные (10шт)", price: "3 610 ₽", priceNum: 3610, colors: ["pink"], subcategory: "girl" },
    { id: 258, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/95539e51-e817-4357-bf8d-7a14423936f4.jpg", title: "Набор для девушки 258", description: "Мишка фигурка фольгированная (1шт), Сердца фольгированные (5шт), Пастель шары (11шт), Ленты атласные (17шт)", price: "3 950 ₽", priceNum: 3950, colors: ["beige", "white"], subcategory: "girl" },
    { id: 259, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/aa9e98ff-5068-41aa-9070-007ec7eda96e.jpg", title: "Набор для девушки 259", description: "Шар-Баблс гигант прозрачный с перьями и надписью (1шт), Сердца фольгированные (3шт), Пастель шары (7шт)", price: "3 860 ₽", priceNum: 3860, colors: ["multicolor"], subcategory: "girl" },
    { id: 262, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2a2c3713-f940-4bab-8a71-0d5c630ce963.jpg", title: "Набор для девушки 262", description: "Шар-Баблс гигант стеклянный с бантиками и надписью (1шт), Пастель шары с бантиками (5шт)", price: "3 150 ₽", priceNum: 3150, colors: ["black", "white"], subcategory: "girl" },

    { id: 264, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/652dc60b-512d-4ff1-8a01-33c5c9dcec02.jpg", title: "Набор для девушки 264", description: "Баблс стеклянный с бантиками и надписью (1шт), Хром шар серебро (1шт), Пастель шары белые и голубые (4шт)", price: "3 200 ₽", priceNum: 3200, colors: ["white"], subcategory: "girl" },
    { id: 265, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/35396cb9-b1b3-4173-9bd1-ffc93ee413ea.jpg", title: "Набор для девушки 265", description: "Шар-Баблс гигант стеклянный с бантиками и надписью (1шт), Прозрачные шары с конфетти (2шт), Стеклянные шары (3шт), Пастель шар (1шт)", price: "3 320 ₽", priceNum: 3320, colors: ["blue", "white"], subcategory: "girl" },

    { id: 270, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f1232ebc-89e4-4d0c-85fd-cddd73bf5bcb.jpg", title: "Набор для девушки 270", description: "Шар-Сердце гигант с надписью и фотографией, Прозрачные шары с конфетти (3шт), Хром шары коричневые (4шт), Стеклянные шары кремовые (4шт)", price: "3 960 ₽", priceNum: 3960, colors: ["beige"], subcategory: "girl" },
    { id: 271, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7ae5c690-16d0-412a-bd6d-90259887a947.jpg", title: "Набор для девушки 271", description: "Шар-Баблс гигант прозрачный с перьями и надписью (1шт), Шары-Цифры фольгированные (2шт), Пастель шары (7шт)", price: "4 410 ₽", priceNum: 4410, colors: ["pink"], subcategory: "girl" },
    { id: 272, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/22cad5f4-3a1e-4470-b0d3-aa1b8e1f1c2a.jpg", title: "Набор для девушки 272", description: "Шар-Сердце гигант с надписью (1шт), Стеклянные шары с бабочками (10шт)", price: "3 800 ₽", priceNum: 3800, colors: ["red", "white"], subcategory: "girl" },

    { id: 275, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/031c37d7-3d8c-48da-80a0-caf0eff82ff9.jpg", title: "Набор для девушки 275", description: "Красивая композиция из шаров на день рождения.", price: "4 100 ₽", priceNum: 4100, colors: ["cream", "gold"], subcategory: "girl" },

    { id: 281, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5978a7d3-eda5-4b0b-a079-db82036fc2d9.jpg", title: "Набор для девушки 281", description: "Шары-Цифры фольгированные (2шт), Сердца фольгированные (3шт), Прозрачные шары с конфетти (2шт), Хром шары золотые (2шт), Пастель шары белые и кремовые (3шт)", price: "3 760 ₽", priceNum: 3760, colors: ["cream"], subcategory: "girl" },

    { id: 283, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f4b227cb-c1e0-4719-b8a5-5e1c96886d52.jpg", title: "Набор для девушки 283", description: "Шар-Баблс стеклянный с конфетти и надписью (1шт), Сердца фольгированные (2шт), Пастель шары (18шт)", price: "5 440 ₽", priceNum: 5440, colors: ["pink"], subcategory: "girl" },
    { id: 284, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7bd1cab2-88b5-4361-8ad0-b2d3de557075.jpg", title: "Набор для девушки 284", description: "Шары-Цифры фольгированные (2шт), Фигурка Зайка фольгированная (1шт), Пастель шары (14шт), Ленты атласные (17шт)", price: "4 390 ₽", priceNum: 4390, colors: ["cream", "white"], subcategory: "girl" },
    { id: 286, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a36043d1-3e30-4418-90c2-fe48e74869e2.jpg", title: "Набор для девушки 286", description: "Шар-Баблс стеклянный с конфетти и надписью (1шт), Прозрачные шары с конфетти (3шт), Хром шары золотые (3шт), Пастель шары черные (3шт)", price: "3 870 ₽", priceNum: 3870, colors: ["black", "gold"], subcategory: "girl" },
    { id: 288, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8c3324af-1e0b-416c-a4d1-fb26c1179dcc.jpg", title: "Набор для девушки 288", description: "Шар-Баблс прозрачный с перьями и надписью (1шт), Пастель шары (5шт), Бантики на розовый шар", price: "2 600 ₽", priceNum: 2600, colors: ["black"], subcategory: "girl" },
    { id: 289, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f1d69972-9a31-4f82-8243-bcf05f064fcd.jpg", title: "Набор для девушки 289", description: "Фигурка Мишка с тортиком фольгированная (1шт), Хром шары (9шт)", price: "2 140 ₽", priceNum: 2140, colors: ["gold", "white", "pink"], subcategory: "girl" },
    { id: 291, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8b84a13f-7934-4523-9cde-850eb610fdbf.jpg", title: "Набор для девушки 291", description: "Шар-Баблс прозрачный с фатином внутри и надписью (1шт), Хром шары золотые (4шт), Пастель шары белые (4шт)", price: "3 160 ₽", priceNum: 3160, colors: ["gold", "white"], subcategory: "girl" },
    { id: 293, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/0d36b720-c06e-49b0-98d9-1121e0f48d06.jpg", title: "Набор для девушки 293", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Стеклянные шары (10шт)", price: "3 900 ₽", priceNum: 3900, colors: ["yellow"], subcategory: "girl" },
    { id: 294, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a8b8c354-505c-4186-a7e7-aba01fb6b897.jpg", title: "Набор для девушки 294", description: "Шар-Баблс гигант стеклянный с бантиками и надписью (1шт), Прозрачные шары с конфетти (2шт), Перламутр шары фиолетовые (2шт), Пастель шары фиолетовые и белые (6шт)", price: "3 690 ₽", priceNum: 3690, colors: ["purple"], subcategory: "girl" },
    { id: 306, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c5dbfb99-2d55-4a28-9528-ac7a4fec5a4c.jpg", title: "Набор для девушки 306", description: "Шар-Баблс гигант прозрачный с конфетти и надписью (1шт), Сердца фольгированные (3шт), Прозрачные шары с конфетти (3шт), Хром шары золотые (3шт), Пастель шары черные (2шт)", price: "4 190 ₽", priceNum: 4190, colors: ["black"], subcategory: "girl" },
    { id: 308, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/98f48454-24dd-482c-99e4-9a467202c0b3.jpg", title: "Набор для девушки 308", description: "Шар-баблс гигант латексный с надписью (1шт), Сердца фольгированные (4шт), Хром шары золотые (2шт), Пастель шары белые (8шт)", price: "4 560 ₽", priceNum: 4560, colors: ["beige"], subcategory: "girl" },
    { id: 312, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3dcd8e0f-9f18-4f25-a530-625b3b57f1a3.jpg", title: "Набор для девушки 312", description: "Шар-Баблс гигант латексный с бантиками и надписью (1шт), Сердца фольгированные (3шт), Стеклянные шары (5шт)", price: "3 900 ₽", priceNum: 3900, colors: ["white", "red"], subcategory: "girl" },
    { id: 314, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/276027a2-d6ed-4cc3-8473-d63641de5fa2.jpg", title: "Набор для девушки 314", description: "Шар-Баблс гигант прозрачный с перьями (1шт), Звезда фольгированная (1шт), Прозрачные шары с конфетти (3шт), Перламутр шары (7шт)", price: "3 760 ₽", priceNum: 3760, colors: ["orange"], subcategory: "girl" },
    { id: 315, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/439f6afd-35ea-46b5-82a4-1ade692126ec.jpg", title: "Набор для девушки 315", description: "Шар-Баблс гигант стеклянный с конфетти и надписью (1шт), Сердце фольгированное (1шт), Прозрачные шары с конфетти (3шт), Хром шар золотой (1шт), Пастель шары белые (4шт)", price: "4 410 ₽", priceNum: 4410, colors: ["white", "gold"], subcategory: "girl" },
    { id: 316, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6c438982-2441-42b3-bdea-325eaf6c90cb.jpg", title: "Набор для девушки 316", description: "Шар-Баблс гигант стеклянный с бантиками и надписью (1шт), Стеклянные шары с бантиками (6шт), Ленты атласные (7шт)", price: "3 700 ₽", priceNum: 3700, colors: ["cream"], subcategory: "girl" },
    { id: 319, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/629b8ee9-969f-4201-8430-5a143c2343e0.jpg", title: "Набор для девушки 319", description: "Шары-Цифры фольгированные (2шт), Фигурка Шампанское (1шт), Пастель шары белые (7шт)", price: "3 410 ₽", priceNum: 3410, colors: ["gold", "white"], subcategory: "girl" },
    { id: 324, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5a2d9ce2-ea8d-4055-b039-782fa99305b2.jpg", title: "Набор для девушки 324", description: "Шар-Баблс стеклянный с надписью (1шт), Сердца фольгированные (4шт), Хром шары розовое золото (6шт), Пастель шары кремовые (6шт)", price: "5 240 ₽", priceNum: 5240, colors: ["cream"], subcategory: "girl" },
    { id: 326, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/49e4987c-caeb-4219-92e0-b9f2acb0c015.jpg", title: "Набор для девушки 326", description: "Шары-Цифры фольгированные с бантиками (2шт), Пастель шары (14шт)", price: "3 620 ₽", priceNum: 3620, colors: ["cream", "yellow"], subcategory: "girl" },
    { id: 328, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/aa2d4870-e09d-4e0a-a965-332c2a501df7.jpg", title: "Набор для девушки 328", description: "Шары-Цифры фольгированные (2шт), Хром шары (13шт), Звезда фольгированная с надписью (1шт), Ленты дождик (16шт)", price: "4 340 ₽", priceNum: 4340, colors: ["green", "gold"], subcategory: "girl" },
    { id: 330, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/92b93509-758e-4f85-9ef2-32c9bbef20f5.jpg", title: "Набор для девушки 330", description: "Шар-Баблс гигант стеклянный с конфетти, бантиками и надписью (1шт), Сердца фольгированные (3шт), Стеклянные шары с конфетти (5шт)", price: "4 850 ₽", priceNum: 4850, colors: ["white", "red"], subcategory: "girl" },
    { id: 334, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/bb9af16b-fbd8-4ded-9530-0692d6c04716.jpg", title: "Набор для девушки 334", description: "Шар-Баблс гигант латексный с надписью (1шт), Сердце фольгированное (1шт), Пастель шары (6шт)", price: "2 930 ₽", priceNum: 2930, colors: ["red", "pink"], subcategory: "girl" },
    { id: 335, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2f415df1-561e-4b6f-b950-f514c7708933.jpg", title: "Набор для девушки 335", description: "Шары-Цифры фольгированные (2шт), Сердце фольгированное с надписью (1шт), Прозрачные шары с конфетти (2шт), Хром шары золотые (2шт), Пастель шар белый (1шт)", price: "2 950 ₽", priceNum: 2950, colors: ["gold"], subcategory: "girl" },
    { id: 336, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4627897e-2364-45ba-b9a2-e4135e190124.jpg", title: "Набор для девушки 336", description: "Шар-Баблс гигант прозрачный с конфетти и надписью (1шт), Котик фигурка фольгированная (1шт), Сердца фольгированные (2шт), Прозрачные шары (2шт), Пастель шар белый (1шт)", price: "3 830 ₽", priceNum: 3830, colors: ["purple"], subcategory: "girl" },
    { id: 337, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6ff1c61d-a2c8-4f6c-b1f5-095998591c20.jpg", title: "Набор для девушки 337", description: "Сердце гигант фольгированное с надписью (1шт), Стеклянные шары с бантиками (7шт), Ленты атласные (8шт)", price: "3 190 ₽", priceNum: 3190, colors: ["red", "white"], subcategory: "girl" },
    { id: 339, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/771ce3c3-ef65-4962-a544-96757b819246.jpg", title: "Набор для девушки 339", description: "Бантик фигурка фольгированная (1шт), Стеклянные шары с бантиками (20шт)", price: "5 400 ₽", priceNum: 5400, colors: ["cream", "pink"], subcategory: "girl" },
    { id: 344, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/28eb5ae7-3de9-44b5-b3b1-9ea3f6249e91.jpg", title: "Набор для девушки 344", description: "Сердце гигант фольгированное с надписью (1шт), Сердца фольгированные (7шт), Ленты-дождик (8шт)", price: "4 000 ₽", priceNum: 4000, colors: ["purple"], subcategory: "girl" },
    { id: 347, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f3410b1d-4bef-40ea-b7d7-cf3dc42af4f3.jpg", title: "Набор для девушки 347", description: "Шар-Баблс гигант стеклянный с бантиками и надписью (1шт), Стеклянные шары с бантиками (5шт), Ленты атласные (6шт)", price: "3 460 ₽", priceNum: 3460, colors: ["white"], subcategory: "girl" },
    { id: 349, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/673b2240-534f-4e62-b9d4-a657890d2be5.jpg", title: "Набор для девушки 349", description: "Шар-Баблс гигант прозрачный с конфетти и надписью (1шт), Сердце фольгированное (1шт), Прозрачные шары с конфетти (2шт), Хром шары (3шт)", price: "3 000 ₽", priceNum: 3000, colors: ["pink"], subcategory: "girl" },
    { id: 350, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c93d7fdb-48d6-4614-8167-e68ba6ac25bc.jpg", title: "Набор для девушки 350", description: "Сердце гигант фольгированное с надписью (1шт), Шары-Цифры фольгированные (2шт), Сердца фольгированные красные (3шт), Хром шары серебро (10шт), Пастель шары черные (8шт)", price: "6 790 ₽", priceNum: 6790, colors: ["silver"], subcategory: "girl" },
    { id: 354, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3fd1c73d-bcfa-4b96-a0ff-9f51f6fa9eff.jpg", title: "Набор для девушки 354", description: "Шар-Баблс гигант стеклянный с бантиками и надписью (1шт), Сердце фольгированное с бантиками (1шт), Пастель шары с бантиками (5шт)", price: "3 550 ₽", priceNum: 3550, colors: ["white", "pink"], subcategory: "girl" },
    { id: 356, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2a311d2c-199a-4b9e-8bcd-20c18e399225.jpg", title: "Набор для девушки 356", description: "Шар-Баблс гигант стеклянный с бантиками и надписью (1шт), Сердца фольгированные (4шт), Стеклянные шары (10шт), Ленты атласные (11шт)", price: "5 560 ₽", priceNum: 5560, colors: ["pink", "gold"], subcategory: "girl" },
    { id: 357, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d13c322c-b568-4793-a2ba-0e3686d7d001.jpg", title: "Набор для девушки 357", description: "Шар-Баблс гигант стеклянный с бантиками и надписью (1шт), Сердце фольгированное (2шт), Пастель шары (7шт)", price: "3 860 ₽", priceNum: 3860, colors: ["pink", "white"], subcategory: "girl" },
    { id: 361, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/14cf9cb4-5e1b-41dc-8658-c4b09faa8ba6.jpg", title: "Набор для девушки 361", description: "Шар-Баблс стеклянный с бантиками и надписью (1шт), Хром шары с бантиками (3шт), Пастель шары с бантиками (7шт)", price: "4 140 ₽", priceNum: 4140, colors: ["pink"], subcategory: "girl" },
  ],
  man: [
    { id: 8, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/01e7ae2d-2743-430b-a430-07f040a6c6dc.jpg", title: "Набор для мужчины 8", description: "Шар-Баблс гигант стеклянный с конфетти и надписью (1шт), Сердце фольгированное сердце с надписью (1шт), Звезды фольгированная с надписью (1шт), Прозрачные шары с конфетти (2шт), Хром шары коричневый и золотые (4шт), Пастель шары кремовые (2шт)", price: "5 000 ₽", priceNum: 5000, colors: ["cream", "brown"], subcategory: "man" },
    { id: 9, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/800dd386-d12f-4ad8-9efd-8f5ec69d18df.jpg", title: "Набор для мужчины 9", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Стеклянный шары синие (3шт), Хром шары серебро (2шт)", price: "2 950 ₽", priceNum: 2950, colors: ["blue"], subcategory: "man" },
    { id: 11, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d31b7e40-58dd-400d-8549-46b93da1df23.jpg", title: "Набор для мужчины 11", description: "Доллар фигурка фольгированная (1шт), Прозрачные шары с конфетти (6шт), Стеклянные шары зеленые (6шт), Хром шары серебро (6шт)", price: "4 000 ₽", priceNum: 4000, colors: ["green"], subcategory: "man" },
    { id: 12, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5521286d-5b01-4d03-bf0b-93f664ea1296.jpg", title: "Набор для мужчины 12", description: "Цифры фольгированные (2шт), Сердце фольгированное с надписью (1шт), Прозрачные шары с конфетти (2шт), Хром шары серебро (2шт), Пастель шары черные (2шт)", price: "3 050 ₽", priceNum: 3050, colors: ["silver", "black"], subcategory: "man" },
    { id: 13, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3be29414-41b1-4b07-bd26-e687d4c7370d.jpg", title: "Набор для мужчины 13", description: "Звезда гигант фольгированная с надписью (1шт), Стеклянные шары (10шт)", price: "3 300 ₽", priceNum: 3300, colors: ["black"], subcategory: "man" },
    { id: 14, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/af1e4c0c-5e59-4d21-96b2-b196b5c627c4.jpg", title: "Набор для мужчины 14", description: "Шар-Баблс гигант стеклянный с конфетти и надписью (1шт), Хром шары серебро (10шт), Пастель шары синие (10шт)", price: "5 300 ₽", priceNum: 5300, colors: ["blue"], subcategory: "man" },
    { id: 15, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/56eca436-d44e-44ae-9fe7-f4f720405054.jpg", title: "Набор для мужчины 15", description: "Шар-Баблс гигант стеклянный с конфетти и надписью (1шт), Сердце фольгированное с надписью (1шт), Прозрачные шары с конфетти (2шт), Пастель шары черные (3шт)", price: "3 690 ₽", priceNum: 3690, colors: ["black"], subcategory: "man" },
    { id: 16, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b5897295-4ea0-47c2-9621-3e4b39939556.jpg", title: "Набор для мужчины 16", description: "Звезды гигант фольгированная с надписью (1шт), Хром шары зеленые (5шт), Пастель шары черные (5шт)", price: "2 950 ₽", priceNum: 2950, colors: ["black", "green"], subcategory: "man" },
    { id: 23, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/242c22e8-51d8-4bad-9fe5-e62457f014a0.jpg", title: "Набор для мужчины 23", description: "Шар-Баблс гигант стеклянный хром с надписью (1шт), Доллары фигурки фольгированные (4шт), Хром шары серебро (4шт), Стеклянные шары зеленые (4шт)", price: "6 500 ₽", priceNum: 6500, colors: ["silver"], subcategory: "man" },
    { id: 24, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8ebbc792-96fd-48f0-b370-4df22815633f.jpg", title: "Набор для мужчины 24", description: "Шар-Баблс гигант прозрачный с конфетти и надписью (1шт), Сердца фольгированные (6шт), Прозрачные шары с конфетти (6шт), Хром шары (8шт)", price: "6 680 ₽", priceNum: 6680, colors: ["silver", "black"], subcategory: "man" },
    { id: 26, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1765ff60-d1d3-44dd-9814-92e0a6c588ee.jpg", title: "Набор для мужчины 26", description: "Цифры фольгированные (2шт), Пастель шары (14шт)", price: "3 420 ₽", priceNum: 3420, colors: ["black", "gold"], subcategory: "man" },
    { id: 27, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d85eea34-88cc-4955-baa8-00e90ad3464c.jpg", title: "Набор для мужчины 27", description: "Шар-Баблс гигант стеклянный с конфетти и надписью (1шт), Цифры фольгированные (2шт), Хром шары (5шт), Пастель шары (5шт)", price: "5 450 ₽", priceNum: 5450, colors: ["black"], subcategory: "man" },
    { id: 30, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b28afa88-9844-4d85-81ee-534a3a348d6f.jpg", title: "Набор для мужчины 30", description: "Шар-Баблс гигант прозрачный с перьями и надписью (1шт), Стеклянные шары (10шт)", price: "3 800 ₽", priceNum: 3800, colors: ["green"], subcategory: "man" },
    { id: 31, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9847c4b4-9ff2-4a43-8d04-03afcbc3682e.jpg", title: "Набор для мужчины 31", description: "Цифры фольгированные (2шт), Сердце фольгированное с надписью (1шт), Прозрачные шары с конфетти (2шт), Хром шары серебро (3шт), Пастель шары черные (4шт)", price: "3 500 ₽", priceNum: 3500, colors: ["silver", "black"], subcategory: "man" },
    { id: 38, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/99637f5b-9824-40c3-a689-bbd44fc20c91.jpg", title: "Набор для мужчины 38", description: "Цифры фольгированные (2шт), Хром шары золотые (5шт), Пастель шары черные (5шт)", price: "3 000 ₽", priceNum: 3000, colors: ["black", "gold"], subcategory: "man" },
    { id: 39, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2e268027-7388-4441-9ae4-db384eaf93de.jpg", title: "Набор для мужчины 39", description: "Шар-Баблс стеклянный с надписью (1шт), Сердца фольгированные с надписью (2шт), Звезды фольгированные (2шт), Хром шары серебро (4шт), Пастель шары черные (4шт)", price: "5 000 ₽", priceNum: 5000, colors: ["silver", "black"], subcategory: "man" },
    { id: 41, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/42f0e39c-c072-4c53-8e1d-586fe2efd724.jpg", title: "Набор для мужчины 41", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Хром шары серебро (6шт), Пастель шары синие (6шт)", price: "3 840 ₽", priceNum: 3840, colors: ["blue", "silver", "white"], subcategory: "man" },
    { id: 45, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ba35447e-1cb2-4596-845a-8c55fd269770.jpg", title: "Набор для мужчины 45", description: "Шар-Баблс гигант прозрачный с перьями и конфетти (1шт), Прозрачные шары с конфетти (4шт), Хром шары серебро (2шт), Стеклянные шары синие и кремовые (12шт)", price: "5 280 ₽", priceNum: 5280, colors: ["blue", "cream"], subcategory: "man" },
    { id: 48, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d43112a4-9f99-4461-a889-16c45b6983bc.jpg", title: "Набор для мужчины 48", description: "Шар-Баблс гигант прозрачный с надписью (1шт), Стеклянные шары (10шт)", price: "3 100 ₽", priceNum: 3100, colors: ["green"], subcategory: "man" },
    { id: 50, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6c6e9f29-c451-4eaf-be0d-6637f3bbc4ea.jpg", title: "Набор для мужчины 50", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Мотоцикл фигурка фольгированная (1шт), Звезды фольгированные (3шт), Пастель шары (6шт)", price: "5 000 ₽", priceNum: 5000, colors: ["red", "black"], subcategory: "man" },
    { id: 51, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/25a04e01-ee95-4397-863c-c0a78ad53f89.jpg", title: "Набор для мужчины 51", description: "Шар-Баблс прозрачный с шариками внутри и надписью (1шт), Цифры фольгированные (2шт), Хром шары золотые (4шт), Пастель шары черные (5шт)", price: "4 900 ₽", priceNum: 4900, colors: ["black", "gold"], subcategory: "man" },
    { id: 53, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/25331d5e-d168-43ff-8c2b-73be3ab7b7f2.jpg", title: "Набор для мужчины 53", description: "Шар-Баблс гигант стеклянный с конфетти и надписью (1шт), Цифры фольгированные (2шт), Звезда гигант фольгированная с надписью (1шт)", price: "5 200 ₽", priceNum: 5200, colors: ["black", "gold"], subcategory: "man" },
    { id: 56, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/154d10c8-dcf7-4e33-ae57-f20f5fdae899.jpg", title: "Набор для мужчины 56", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Цифры фольгированные (2шт), Хром шары золотые (5шт), Пастель шары синие (5шт)", price: "5 150 ₽", priceNum: 5150, colors: ["cream", "blue"], subcategory: "man" },
    { id: 59, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ca209889-45e2-413c-ac46-a135ebdf76af.jpg", title: "Набор для мужчины 59", description: "Шар-Баблс гигант стеклянный с наклейками и надписью (1шт), Хром шары серебро (8шт), Стеклянные шары зеленые (4шт), Пастель шары черные (4шт)", price: "4 900 ₽", priceNum: 4900, colors: ["green", "silver", "black"], subcategory: "man" },
    { id: 62, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3dea611b-8f2a-4405-ac95-08abdf629394.jpg", title: "Набор для мужчины 62", description: "Шар-Баблс гигант хром с надписью (1шт), Доллар фигурка фольгированная (1шт), Хром шары серебро (4шт), Стеклянные шары зеленые (2шт)", price: "4 220 ₽", priceNum: 4220, colors: ["silver"], subcategory: "man" },
    { id: 65, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a92c49c8-3b40-4860-a13b-e53b42ebda98.jpg", title: "Набор для мужчины 65", description: "Шары для мужчины.", price: "4 920 ₽", priceNum: 4920, colors: ["cream", "blue"], subcategory: "man" },
    { id: 66, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/de7d217c-d21f-44b8-9241-6152ffc0ac72.jpg", title: "Набор для мужчины 66", description: "Шар-Баблс стеклянный с надписью (1шт), Цифры фольгированные (2шт), Стеклянные шары белые (8шт)", price: "5 140 ₽", priceNum: 5140, colors: ["white", "black"], subcategory: "man" },
    { id: 68, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d77e909f-f77e-4530-82b3-a05641a6bd89.jpg", title: "Набор для мужчины 68", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Звезды фольгированные (6шт)", price: "4 200 ₽", priceNum: 4200, colors: ["black", "gold"], subcategory: "man" },
    { id: 69, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e8c53c00-7616-4dff-aff5-e1fe21733882.jpg", title: "Набор для мужчины 69", description: "Цифры фольгированные (2шт), Бэтмен фигурка фольгированная (1шт), Прозрачные шары с конфетти (2шт), Хром шары золотые (3шт), Стеклянные шары (14шт)", price: "5 900 ₽", priceNum: 5900, colors: ["black", "gold"], subcategory: "man" },
    { id: 70, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2fe01970-2f3d-4474-a86b-c2ae0cadf883.jpg", title: "Набор для мужчины 70", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Хром шары серебро (12шт), Пастель шары (16шт)", price: "6 100 ₽", priceNum: 6100, colors: ["black", "silver"], subcategory: "man" },
    { id: 71, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/504e5462-e350-4d34-87ee-f201f8faa7d0.jpg", title: "Набор для мужчины 71", description: "Шар-Баблс гигант стеклянный хром с надписью (1шт), Цифры фольгированные (2шт), Хром шары (14шт)", price: "6 440 ₽", priceNum: 6440, colors: ["gold", "blue"], subcategory: "man" },
    { id: 74, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/13e052d7-ee7c-4a5b-ad80-6e420993b0e2.jpg", title: "Набор для мужчины 74", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Сердца фольгированные (2шт), Надпись на сердце фольгированное (1шт), Пастель шары (8шт)", price: "3 990 ₽", priceNum: 3990, colors: ["silver"], subcategory: "man" },
    { id: 81, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a784bd9c-e094-4338-a439-d5d52ce7e2e3.jpg", title: "Набор для мужчины 81", description: "Шар-Баблс гигант прозрачный с деньгами и надписью (1шт), Хром шары серебро (3шт), Стеклянные шары (2шт)", price: "2 950 ₽", priceNum: 2950, colors: ["green", "silver"], subcategory: "man" },
    { id: 82, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4c003f32-ad53-4707-a460-6eb958569dd2.jpg", title: "Набор для мужчины 82", description: "Цифры фольгированные (2шт), Прозрачные шары с конфетти (6шт), Хром шары золотые (10шт), Пастель шары черные (8шт)", price: "5 440 ₽", priceNum: 5440, colors: ["gold", "black"], subcategory: "man" },
    { id: 83, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/502dafee-e407-4215-9fe9-8cb6582f065f.jpg", title: "Набор для мужчины 83", description: "Цифры фольгированные (2шт), Сердца фольгированные (2шт), Прозрачные шары с конфетти (4шт), Звезды фольгированные (6шт), Хром шары серебро (8шт)", price: "6 000 ₽", priceNum: 6000, colors: ["blue", "silver"], subcategory: "man" },
    { id: 87, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/89c7d44d-c852-45c1-a076-41ab0afc9cae.jpg", title: "Набор для мужчины 87", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Хром шары серебро (8шт), Пастель шары синие (6шт)", price: "4 160 ₽", priceNum: 4160, colors: ["blue", "silver"], subcategory: "man" },
    { id: 88, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2be56d36-4ab6-4912-b56b-7a2b53779d34.jpg", title: "Набор для мужчины 88", description: "Цифры фольгированные (2шт), Хром шары золотые (12шт), Пастель шары (12шт)", price: "5 050 ₽", priceNum: 5050, colors: ["gold", "black"], subcategory: "man" },
    { id: 94, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b918cfc0-bad3-41aa-8113-17518faa0c73.jpg", title: "Набор для мужчины 94", description: "Звезда гигант фольгированная с надписью (1шт), Хром шары серебро (4шт), Пастель шары черные и крем (6шт)", price: "2 950 ₽", priceNum: 2950, colors: ["white"], subcategory: "man" },
    { id: 97, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a3e59f75-fc9c-4954-88a6-4418142021be.jpg", title: "Набор для мужчины 97", description: "Звезда гигант фольгированная с надписью (1шт), Пастель шары (8шт)", price: "2 500 ₽", priceNum: 2500, colors: ["black", "silver"], subcategory: "man" },
    { id: 103, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/62e1fbc1-ea52-41b3-9714-e5b62df28c35.jpg", title: "Набор для мужчины 103", description: "Шар-Баблс гигант прозрачный с надписью (1шт), Прозрачные шары с конфетти (6шт), Хром шары золотые (6шт), Пастель шары черные (6шт), Ленты атласные (19шт)", price: "4 900 ₽", priceNum: 4900, colors: ["gold", "black"], subcategory: "man" },
    { id: 107, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c8c53a17-bb13-4049-be0b-7e9cd9bd7a92.jpg", title: "Набор для мужчины 107", description: "Торт фигурка фольгированная (1шт), Котик фигурка фольгированная (1шт), Круги с надписью фольгированные (2шт), Хром шары (8шт)", price: "3 880 ₽", priceNum: 3880, colors: ["gold"], subcategory: "man" },
    { id: 110, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/951fe81d-9289-4d78-a7a4-e70707cd79a6.jpg", title: "Набор для мужчины 110", description: "Шар-Баблс стеклянный с конфетти и надписью (1шт), Прозрачные шары с конфетти (2шт), Стеклянные шары с конфетти (3шт), Хром шары серебро (2шт)", price: "3 870 ₽", priceNum: 3870, colors: ["blue", "silver"], subcategory: "man" },
    { id: 112, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c6100ec8-33a4-4d72-a94b-2da39f17113b.jpg", title: "Набор для мужчины 112", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Прозрачные шары с конфетти (4шт), Хром шары серебро (4шт), Стеклянные шары черные (4шт), Пастель шары крем (4шт)", price: "4 780 ₽", priceNum: 4780, colors: ["black", "cream"], subcategory: "man" },
    { id: 118, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/09d49c53-8ed7-4b26-9294-50fde63da295.jpg", title: "Набор для мужчины 118", description: "Звезды гигант с надписью (1шт), Рыба фигурка фольгированная (1шт)", price: "2 300 ₽", priceNum: 2300, colors: ["green"], subcategory: "man" },
    { id: 119, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/48da3438-5bd4-4cdc-acbb-08393cc8ea56.jpg", title: "Набор для мужчины 119", description: "Цифры фольгированные (2шт), Пастель шары (9шт)", price: "2 770 ₽", priceNum: 2770, colors: ["black", "white"], subcategory: "man" },

    { id: 122, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/cd1504de-4e8e-49b6-84ff-aa630d5299e9.jpg", title: "Набор для мужчины 122", description: "Шар-Баблс гигант стеклянный хром с надписью (1шт), Сердце фольгированное (1шт), Хром шары золотые (3шт), Пастель шары (3шт)", price: "3 620 ₽", priceNum: 3620, colors: ["gold"], subcategory: "man" },
    { id: 124, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/bc677dfb-90ff-4e48-80e8-079cdf9d3b27.jpg", title: "Набор для мужчины 124", description: "Шар-Баблс гигант стеклянный с конфетти и надписью (1шт), Хром шары золотые (2шт), Пастель шары синие (3шт)", price: "3 270 ₽", priceNum: 3270, colors: ["blue", "gold"], subcategory: "man" },
    { id: 128, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2fc75f2f-0207-4002-8cdc-b59c51286456.jpg", title: "Набор для мужчины 128", description: "Цифры фольгированные (2шт), Звезда фольгированная с надписью (1шт), Прозрачный шар с конфетти (1шт), Хром шары (1шт), Пастель шары черные (2шт)", price: "2 720 ₽", priceNum: 2720, colors: ["black", "silver"], subcategory: "man" },
    { id: 132, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e13d89db-df23-48a8-b748-b3ae6819b5cc.jpg", title: "Набор для мужчины 132", description: "Шар-Баблс гигант стеклянный с купюрами и надписью (1шт), Цифры фольгированные (2шт), Пастель шары (10шт)", price: "5 300 ₽", priceNum: 5300, colors: ["black", "white"], subcategory: "man" },

    { id: 134, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d0966f5d-3363-4496-b76a-9486e90dbfe2.jpg", title: "Набор для мужчины 134", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Звезды фольгированные (5шт), Атласные ленты (6шт)", price: "3 850 ₽", priceNum: 3850, colors: ["black", "gold"], subcategory: "man" },
    { id: 135, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4172d68c-c4f9-4398-b205-3ecdfd88c8f5.jpg", title: "Набор для мужчины 135", description: "Шары-Цифры (2шт), Звезды фольгированные (2шт), Прозрачные шары с конфетти (2шт), Хром шары серебро (2шт), Пастель шары черные (2шт)", price: "3 430 ₽", priceNum: 3430, colors: ["silver", "black"], subcategory: "man" },
    { id: 136, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f7e8f0e1-f86c-4aaa-91a8-a829984c0983.jpg", title: "Набор для мужчины 136", description: "Цифры фольгированные (2шт), Звезды фольгированные (2шт), Круги фольгированные (2шт), Хром шары (4шт)", price: "3 790 ₽", priceNum: 3790, colors: ["cream", "beige"], subcategory: "man" },
    { id: 140, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/09511e79-e8a8-40b2-a54a-b66786d487de.JPG", title: "Набор для мужчины 140", description: "Кружка пива фигурка фольгированная (1шт), Бутылка пива фигурка фольгированная (1шт), Рак фигурка фольгированная (1шт), Рыба фигурка фольгированная (1шт)", price: "3 200 ₽", priceNum: 3200, colors: ["multicolor"], subcategory: "man" },
    { id: 141, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7aa5f6d6-f62e-4ad2-abcd-4cbda18704f9.JPG", title: "Набор для мужчины 141", description: "Звезда гигант фольгированная с надписью (1шт), Кот в колпаке фигурка фольгированная (1шт), Сердца фольгированные (3шт), Хром шары золотые (4шт), Пастель шары черные (4шт)", price: "4 500 ₽", priceNum: 4500, colors: ["black", "gold"], subcategory: "man" },
    { id: 142, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/204bfdf3-7400-42c3-85f5-0b6e0de3d40d.JPG", title: "Набор для мужчины 142", description: "Звезда фольгированная с надписью (1шт), Кубок фигурка фольгированная (1шт), Перчатки фигурки фольгированные (2шт), Кроссовок фигурка фольгированная (1шт), Звезды фольгированные (2шт), Хром шары золотые (3шт)", price: "5 580 ₽", priceNum: 5580, colors: ["red", "gold"], subcategory: "man" },
    { id: 148, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f4e58fe7-4d5e-4730-acd2-e2cd1eb39453.jpg", title: "Набор для мужчины 148", description: "Цифры фольгированные (2шт), Шар-Баблс прозрачный с конфетти и надписью (1шт), Сердца фольгированные (2шт), Хром шары золотые (2шт), Пастель шары (7шт)", price: "5 630 ₽", priceNum: 5630, colors: ["cream"], subcategory: "man" },
    { id: 150, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e22c2bf2-594c-45bf-82bb-432bf62cd2f6.jpg", title: "Набор для мужчины 150", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Звезды фольгированные (4шт), Хром шары серебро (6шт), Пастель шары синие (6шт)", price: "5 240 ₽", priceNum: 5240, colors: ["blue", "silver"], subcategory: "man" },
    { id: 154, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/83625ada-9170-4c40-9b3c-876ff24d5d51.jpg", title: "Набор для мужчины 154", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Хром шары серебро (8шт), Стеклянные шары синие (3шт)", price: "3 280 ₽", priceNum: 3280, colors: ["blue", "silver"], subcategory: "man" },
    { id: 160, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/196d7457-5787-4977-af2b-3294492d535d.jpg", title: "Набор для мужчины 160", description: "Шар-Баблс гигант стеклянный с конфетти и надписью (1шт), Сердца фольгированные (4шт), Прозрачные шары с конфетти (2шт), Стеклянные шары синие (4шт), Хром шары серебро (2шт), Пастель шары белые (2шт)", price: "4 740 ₽", priceNum: 4740, colors: ["blue"], subcategory: "man" },

    { id: 162, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4f39fed4-fed0-4039-89b4-c4c414d37612.jpg", title: "Набор для мужчины 162", description: "Шар-баблс гигант с надписью (1шт), Бэтмен фигурка фольгированная (1шт), Сердца фольгированные (5шт)", price: "4 800 ₽", priceNum: 4800, colors: ["black", "red"], subcategory: "man" },
    { id: 164, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e5fe32d4-4736-417e-a8ad-3b33e2a35cce.jpg", title: "Набор для мужчины 164", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Хром шары серебро и синие (6шт), Пастель шары черные (4шт)", price: "3 580 ₽", priceNum: 3580, colors: ["black", "blue", "silver"], subcategory: "man" },
    { id: 167, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/820d9007-fb93-4bd5-a9f1-2edf74a8b781.jpg", title: "Набор для мужчины 167", description: "Цифры фольгированная (2шт), Пастель шары (22шт), Ленты-дождик (24шт)", price: "4 700 ₽", priceNum: 4700, colors: ["black", "white"], subcategory: "man" },
    { id: 168, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1dc8babb-4c25-4087-841a-cf565a1228fc.jpg", title: "Набор для мужчины 168", description: "Шар-Баблс прозрачный с перьями и надписью (1шт), Прозрачные шары (3шт), Стеклянные шары коричневые (4шт), Пастель шары кремовые (3шт), Ленты атласные (11шт)", price: "3 400 ₽", priceNum: 3400, colors: ["beige"], subcategory: "man" },
    { id: 172, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/69b48624-1a7c-41ea-ac18-82d880ac6313.jpg", title: "Набор для мужчины 172", description: "Сердце гигант с надписью (1шт), Стеклянные шары зеленые (6шт)", price: "2 580 ₽", priceNum: 2580, colors: ["green", "black"], subcategory: "man" },
    { id: 173, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7a25a2c7-2fb7-4211-bbb7-efb84887e8da.jpg", title: "Набор для мужчины 173", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Хром синие и золотые (12шт)", price: "4 000 ₽", priceNum: 4000, colors: ["blue", "gold"], subcategory: "man" },

    { id: 178, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/eb7c5fe7-48b2-40c3-8951-672823d3ed4c.jpg", title: "Набор для мужчины 178", description: "Цифры фольгированные (2шт), Сердце фольгированное (1шт), Хром шары коричневые (3шт), Стеклянные шары кремовые (4шт)", price: "3 000 ₽", priceNum: 3000, colors: ["beige"], subcategory: "man" },
    { id: 183, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/11829b1a-2173-4f97-8550-7a9cdd416ed3.jpg", title: "Набор для мужчины 183", description: "Шар-Баблс стеклянный с надписью (1шт), Цифры фольгированные (2шт), Хром шары золотые и синие (18шт)", price: "6 100 ₽", priceNum: 6100, colors: ["gold", "blue"], subcategory: "man" },
    { id: 187, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/09efb7a5-eb73-4cdb-9056-b9bf61c74ff6.jpg", title: "Набор для мужчины 187", description: "Шар-Баблс стеклянный с надписью (1шт), Звезды фольгированные (4шт), Хром шары серебро и синие (12шт), Пастель шары синие (12шт)", price: "7 000 ₽", priceNum: 7000, colors: ["blue", "silver"], subcategory: "man" },
    { id: 192, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/cd9d9cc9-1975-48f0-981d-6403bbc52e3b.jpg", title: "Набор для мужчины 192", description: "Цифры фольгированные (2шт), Прозрачные шары (2шт), Хром шары золотые (4шт), Пастель шары черные (4шт)", price: "3 000 ₽", priceNum: 3000, colors: ["gold", "black"], subcategory: "man" },
    { id: 193, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6ad392e3-d866-407d-8a14-bc6fb80df0ef.jpg", title: "Набор для мужчины 193", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Кот в колпаке фигурка фольгированная, Прозрачные шары (2шт), Стеклянные шары коричневые (2шт), Пастель шары белые (3шт)", price: "4 000 ₽", priceNum: 4000, colors: ["cream", "beige"], subcategory: "man" },
    { id: 197, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/0a2c688f-f250-4cc7-a450-08371d10d61f.jpg", title: "Набор для мужчины 197", description: "Сердце фольгированное с надписью (1шт), Прозрачные шары с конфетти (2шт), Хром шары золотые (2шт), Пастель шары (2шт)", price: "1 480 ₽", priceNum: 1480, colors: ["gold", "beige"], subcategory: "man" },
    { id: 200, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/372568fe-d02c-4b64-bb64-e1fbbd6b4840.jpg", title: "Набор для мужчины 200", description: "Цифры фольгированные (2шт), Звезда с надписью (1шт), Хром шары (9шт)", price: "3 540 ₽", priceNum: 3540, colors: ["blue"], subcategory: "man" },
    { id: 201, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/659d4ed3-60f5-411c-a8a0-60aacf873915.jpg", title: "Набор для мужчины 201", description: "Сердце фольгированное с надписью (1шт), Бэтмен фигурка фольгированная (1шт), Хром шары (10шт)", price: "4 000 ₽", priceNum: 4000, colors: ["red", "black"], subcategory: "man" },

    { id: 204, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5d8e4b53-dc44-471c-8750-79cf21d64726.jpg", title: "Набор для мужчины 204", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Цифры фольгированные (2шт), Прозрачные шары с конфетти (3шт), Хром шары золотые (3шт), Пастель шары черные (4шт)", price: "5 300 ₽", priceNum: 5300, colors: ["white", "gold", "black"], subcategory: "man" },
    { id: 213, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4075a45b-234c-4097-957a-a106cb9de131.jpg", title: "Набор для мужчины 213", description: "Шар-Баблс гигант с конфетти и надписью (1шт), Прозрачные шары с конфетти (3шт), Хром шары золотые (3шт), Пастель шары (3шт)", price: "3 570 ₽", priceNum: 3570, colors: ["gold"], subcategory: "man" },
    { id: 215, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4fd33cf8-c610-4895-9fce-98536a8980a5.jpg", title: "Набор для мужчины 215", description: "Шар-Баблс прозрачный с перьями и надписью (1шт), Кот фигурка фольгированная (1шт), Звезда фольгированная с надписью (1шт), Пастель шары черные (2шт)", price: "3 600 ₽", priceNum: 3600, colors: ["black", "orange"], subcategory: "man" },
    { id: 217, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/004b6465-564a-4f62-a30b-eba340201691.jpg", title: "Набор для мужчины 217", description: "Шар-Баблс стеклянный с надписью (1шт), Бэтмен фигурка фольгированная с надписью (1шт)", price: "3 200 ₽", priceNum: 3200, colors: ["white", "black"], subcategory: "man" },
    { id: 218, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/cd25de3e-3c77-484d-82e0-f75c594ab9c4.jpg", title: "Набор для мужчины 218", description: "Цифры фольгированные (2шт), Прозрачные шары с конфетти (3шт), Хром шары золотые (4шт), Пастель шары черные (3шт)", price: "3 230 ₽", priceNum: 3230, colors: ["gold", "black"], subcategory: "man" },
    { id: 221, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/29a89100-961a-4f01-90c3-e92a994bd8a1.jpg", title: "Набор для мужчины 221", description: "Цифры фольгированные (2шт), Прозрачные шары с конфетти (4шт), Хром шары серебро (6шт), Пастель шары синие (8шт)", price: "4 400 ₽", priceNum: 4400, colors: ["blue"], subcategory: "man" },
    { id: 222, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4ea3df42-8f8c-4d31-9855-3c498ac51091.jpg", title: "Набор для мужчины 222", description: "Шар-Баблс стеклянный с надписью (1шт), Прозрачные шары с конфетти (4шт), Стеклянные шары черные и крем (10шт), Хром шары серебро (4шт)", price: "5 340 ₽", priceNum: 5340, colors: ["black", "cream", "silver"], subcategory: "man" },
  ],
  boy: [
    { id: 5, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/76c876c4-614f-4868-9130-65c236898921.jpg", title: "Набор для мальчика 5", description: "Цифра фольгированная (1шт), Мишка фигурка фольгированная (1шт), Звезда фольгированная (1шт), Хром шары (3шт), Пастель шары (6шт)", price: "3 200 ₽", priceNum: 3200, colors: ["brown"], subcategory: "boy" },
    { id: 6, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c7b78983-1f63-46d2-bebc-96575c5480ad.jpg", title: "Набор для мальчика 6", description: "Цифра фольгированная (1шт), Геймпад фигурка фольгированная (1шт), Звезда фольгированная (1шт), Круг фольгированный (не посчитан), Хром шары серебро (2шт), Пастель шары черные (2шт)", price: "2 500 ₽", priceNum: 2500, colors: ["green"], subcategory: "boy" },
    { id: 7, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/157742de-5187-48b3-9d2d-526fe2a34253.jpg", title: "Набор для мальчика 7", description: "Шар-Баблс стеклянный с наклейками и надписью (1шт), Машинки фигурки (2шт), Пастель шары (36шт)", price: "8 800 ₽", priceNum: 8800, colors: ["multicolor", "blue", "orange", "red"], subcategory: "boy" },
    { id: 8, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f6283705-e06a-4663-87e5-0f00ffe3fc66.jpg", title: "Набор для мальчика 8", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Мишка фигурка фольгированная (1шт), Пастель шары (7шт), Ленты атласные (8шт)", price: "3 900 ₽", priceNum: 3900, colors: ["white", "cream", "brown"], subcategory: "boy" },
    { id: 15, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4b4279a4-e700-4107-99ac-e2ad5717b991.jpg", title: "Набор для мальчика 15", description: "Цифра фольгированная (1шт), Звезда фольгированная с надписью (1шт), Хром шары (3шт), Пастель шары (6шт)", price: "2 550 ₽", priceNum: 2550, colors: ["blue"], subcategory: "boy" },
    { id: 19, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/93cc7183-1932-4ea9-bad1-d5bc31fa34e2.jpg", title: "Набор для мальчика 19", description: "Цифры фольгированные (2шт), Сердце фольгированное с надписью (1шт), Хром шары (9шт)", price: "3 550 ₽", priceNum: 3550, colors: ["blue"], subcategory: "boy" },
    { id: 23, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/33246776-9aa7-4ab6-9be1-9973708478fd.jpg", title: "Набор для мальчика 23", description: "Шар-Баблс гигант прозрачный с шариками внутри и надписью (1шт), Синий трактор фигурка фольгированная большая (1шт), Хром шары синие и серебро (10шт), Пастель шары голубые и белые (8шт)", price: "5 600 ₽", priceNum: 5600, colors: ["blue"], subcategory: "boy" },
    { id: 24, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c4d1f259-c697-456f-845c-c194c5997fbf.jpg", title: "Набор для мальчика 24", description: "Цифра фольгированная (1шт), Грузовичок Лева фигурка фольгированная (1шт), Пастель шары (7шт)", price: "2 600 ₽", priceNum: 2600, colors: ["blue", "orange"], subcategory: "boy" },
    { id: 25, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f9af8f31-de18-42e2-9553-9eb20836fe37.jpg", title: "Набор для мальчика 25", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Цифра фольгированная (1шт), Грузовичок Лева фигурка фольгированная (1шт), Стеклянные шары (14шт), Ленты атласные (15шт)", price: "6 500 ₽", priceNum: 6500, colors: ["blue", "orange"], subcategory: "boy" },
    { id: 27, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b33d743e-89c8-4e09-8bf6-2dc2ae4d5be3.jpg", title: "Набор для мальчика 27", description: "Цифра фольгированная (1шт), Звезды фольгированные (2шт), Прозрачные шары с конфетти (4шт), Хром шары (14шт)", price: "4 550 ₽", priceNum: 4550, colors: ["blue"], subcategory: "boy" },
    { id: 28, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/64a9d829-2383-40ce-af9d-48da7a88b28e.jpg", title: "Набор для мальчика 28", description: "Цифра фольгированная (1шт), Сердца фольгированные (2шт), Звезда фольгированная (1шт), Хром шары (3шт), Стеклянные шары (2шт), Пастель шары (2шт)", price: "3 000 ₽", priceNum: 3000, colors: ["purple", "blue"], subcategory: "boy" },
    { id: 29, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/80dc25ce-7bbd-44a9-8fc7-256429fcbca1.jpg", title: "Набор для мальчика 29", description: "Цифра фольгированная (1шт), Синий трактор фигурка фольгированная (1шт), Прозрачные шары с конфетти (4шт), Хром шары (12шт), Пастель шары (10шт), Воздушные шары на пол (10шт)", price: "6 150 ₽", priceNum: 6150, colors: ["blue"], subcategory: "boy" },
    { id: 31, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/45af28a9-df69-4eb3-95fb-9806c5e32ede.jpg", title: "Набор для мальчика 31", description: "Цифры фольгированные (2шт), Звезда фольгированная с надписью (1шт), Прозрачные шары с конфетти (2шт), Пастель шары (3шт)", price: "2 900 ₽", priceNum: 2900, colors: ["brown"], subcategory: "boy" },
    { id: 33, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9cb4bf76-8243-4e88-b45a-969ea09b2da4.jpg", title: "Набор для мальчика 33", description: "Синий трактор фигурка фольгированная (1шт), Звезды фольгированные (2шт), Прозрачные шары с наполнением (2шт), Пастель шары (3шт)", price: "2 300 ₽", priceNum: 2300, colors: ["blue"], subcategory: "boy" },
    { id: 37, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/bc708991-c14f-43ec-9bcd-a08a7045ef2d.jpg", title: "Набор для мальчика 37", description: "Шар-Баблс гигант прозрачный с шариками внутри и надписью (1шт), Звезда фольгированная (1шт), Прозрачный шар с конфетти (1шт), Хром шары (6шт)", price: "3 500 ₽", priceNum: 3500, colors: ["blue"], subcategory: "boy" },
    { id: 38, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c9fccf74-95ed-494d-a57a-ec2285eff9b6.jpg", title: "Набор для мальчика 38", description: "Цифра фольгированная (1шт), Торт фигурка фольгированная (1шт), Прозрачные шары с конфетти (3шт), Пастель шары (7шт)", price: "3 100 ₽", priceNum: 3100, colors: ["green"], subcategory: "boy" },
    { id: 41, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f2fe3727-107d-4377-b388-504311c90495.jpg", title: "Набор для мальчика 41", description: "Шар-Баблс гигант прозрачный с конфетти и надписью (1шт), Капибара фигурка фольгированная (1шт), Звезда фольгированная (1шт), Стеклянные шары (6шт)", price: "Цена по запросу", priceNum: 0, colors: ["multicolor", "brown", "blue"], subcategory: "boy" },
    { id: 44, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5b7c6fef-91d7-4a3a-9d5f-7ed255e9c596.jpg", title: "Набор для мальчика 44", description: "Шар-Баблс гигант стеклянный с наклейками и надписью (1шт), Мишка фигурка фольгированная (1шт), Мяч фигурка фольгированная (1шт), Пастель шары (9шт)", price: "4 900 ₽", priceNum: 4900, colors: ["blue", "brown"], subcategory: "boy" },
    { id: 48, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/abf279bc-1bc4-4724-bf31-ca3bbf94d475.jpg", title: "Набор для мальчика 48", description: "Цифра фольгированная (1шт), Чейз из щенячьего патруля фигурка фольгированная (1шт), Лапка фигурка фольгированная (1шт), Пастель шары (7шт)", price: "4 100 ₽", priceNum: 4100, colors: ["blue"], subcategory: "boy" },
    { id: 54, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9ddfe5b0-83bd-458a-8413-40f12b7d4576.jpg", title: "Набор для мальчика 54", description: "Цифра фольгированная (1шт), Звезда фольгированная с надписью (1шт), Прозрачные шары с конфетти (3шт), Хром шары (6шт)", price: "2 850 ₽", priceNum: 2850, colors: ["purple", "silver"], subcategory: "boy" },
    { id: 55, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/860c1d2e-faa1-4c68-a7a3-49d0c82a6087.jpg", title: "Набор для мальчика 55", description: "Звезда гигант фольгированная с надписью (1шт), Прозрачный шар с конфетти (1шт), Хром шары серебро (2шт), Пастель шары синие (2шт)", price: "2 400 ₽", priceNum: 2400, colors: ["blue"], subcategory: "boy" },
    { id: 57, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/41de9b49-329e-456c-88d0-09b6f5059ffb.jpg", title: "Набор для мальчика 57", description: "Мотоциклист фигурка фольгированная (1шт), Звезда фольгированная с наклейками и надписью (1шт), Прозрачные шары с конфетти (2шт), Хром шары (3шт), Пастель шары (4шт)", price: "3 200 ₽", priceNum: 3200, colors: ["red"], subcategory: "boy" },
    { id: 60, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a9343c6b-8d6b-406e-a862-25293f8508c2.jpg", title: "Набор для мальчика 60", description: "Цифра фольгированная (1шт), Чейз щенок фигурка фольгированная (1шт), Звезды фольгированные с наклейками (2шт), Хром шары золотые (2шт), Пастель шары синие и белый (3шт)", price: "3 500 ₽", priceNum: 3500, colors: ["cream", "blue"], subcategory: "boy" },
    { id: 66, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a627e9f2-d1e5-49b8-8735-dc9d41fb040b.jpg", title: "Набор для мальчика 66", description: "Цифра фольгированная (1шт), Самолет фигурка фольгированная (1шт), Прозрачные шары с конфетти (3шт), Хром шары серебро (3шт), Пастель шары синие (3шт)", price: "3 100 ₽", priceNum: 3100, colors: ["blue", "silver"], subcategory: "boy" },
    { id: 70, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/fe050f0b-1016-48ab-aa93-14f09808e806.jpg", title: "Набор для мальчика 70", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Мишка фигурка фольгированная (1шт), Пастель шары (7шт), Круг фольгированный (заменён на пастель шар)", price: "3 800 ₽", priceNum: 3800, colors: ["orange", "blue"], subcategory: "boy" },
    { id: 72, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6a8c67e7-1e63-4a3f-ad97-973f4f8003fc.jpg", title: "Набор для мальчика 72", description: "Цифра фольгированная (1шт), Грузовик фигурка фольгированная (1шт), Пастель шары (7шт)", price: "2 700 ₽", priceNum: 2700, colors: ["multicolor", "orange", "yellow"], subcategory: "boy" },
    { id: 74, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f50b118b-cb9d-44a4-84dc-3a7c3c38f272.jpg", title: "Набор для мальчика 74", description: "Цифра фольгированная (1шт), Лошадь фигурка фольгированная (1шт), Сердце фольгированное с надписью (1шт), Пастель шары (6шт)", price: "3 000 ₽", priceNum: 3000, colors: ["brown", "blue"], subcategory: "boy" },
    { id: 77, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/61c4072c-6651-4864-8f3e-e8a1916612e3.jpg", title: "Набор для мальчика 77", description: "Цифра фольгированная (1шт), Космонавт фигурка фольгированная (1шт), Сердце фольгированное с надписью (1шт), Сердце фольгированное (1шт), Стеклянные шары хром с конфетти (3шт), Хром шары (5шт)", price: "4 200 ₽", priceNum: 4200, colors: ["silver", "blue"], subcategory: "boy" },
    { id: 79, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/af224c55-052c-453e-8279-a4132a62a1f4.jpg", title: "Набор для мальчика 79", description: "Цифра фольгированная (1шт), Чейз щенок фигурка фольгированная (1шт), Пастель шары (9шт)", price: "3 000 ₽", priceNum: 3000, colors: ["blue"], subcategory: "boy" },
    { id: 81, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/0655708d-7abe-4d42-9f16-41e04ae325ec.jpg", title: "Набор для мальчика 81", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Динозаврик фигурка фольгированная (1шт), Пастель шары (6шт)", price: "3 800 ₽", priceNum: 3800, colors: ["blue", "white"], subcategory: "boy" },
    { id: 82, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/35b3bf02-03ec-44bc-b14a-8021dd5aec13.jpg", title: "Набор для мальчика 82", description: "Звезда гигант фольгированная с надписью (1шт), Звезды фольгированные (2шт), Хром шары (8шт)", price: "3 500 ₽", priceNum: 3500, colors: ["blue", "silver"], subcategory: "boy" },
    { id: 83, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4b32bc25-db24-4941-9f01-09a4e47e3ca9.jpg", title: "Набор для мальчика 83", description: "Шар-Баблс гигант с шариками внутри и надписью (1шт), Слоник фигурка фольгированная (1шт), Цифра фольгированная (1шт), Пастель шары (18шт)", price: "5 950 ₽", priceNum: 5950, colors: ["brown", "cream"], subcategory: "boy" },
    { id: 84, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/da908a30-b1d4-4e8d-b159-de907a709601.jpg", title: "Набор для мальчика 84", description: "Цифра фольгированная (1шт), Звезда фольгированная с надписью (1шт), Хром шары (5шт)", price: "2 100 ₽", priceNum: 2100, colors: ["silver", "blue"], subcategory: "boy" },
    { id: 85, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/55824e7e-90dd-4642-b575-828de29aeff3.jpg", title: "Набор для мальчика 85", description: "Цифра фольгированная (1шт), Трактор фигурка фольгированная (1шт), Пастель шары (4шт)", price: "2 220 ₽", priceNum: 2220, colors: ["blue"], subcategory: "boy" },
    { id: 90, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d2814471-65e1-484a-b12d-904de82fa01e.jpg", title: "Набор для мальчика 90", description: "Звезда гигант фольгированная с надписью (1шт), Мяч фигурка фольгированная (1шт), Хром шары (9шт)", price: "3 550 ₽", priceNum: 3550, colors: ["silver", "blue"], subcategory: "boy" },
    { id: 91, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3dfa781a-2fc2-463f-9a54-a1f5d5192144.jpg", title: "Набор для мальчика 91", description: "Шар-Баблс гигант с конфетти и надписью (1шт), Чейз щенок фигурка фольгированная (1шт), Скай щенок фигурка фольгированная (1шт), Косточка фигурка фольгированная (1шт), Хром шары синие (3шт), Пастель шары голубые, синие, крем (6шт)", price: "6 200 ₽", priceNum: 6200, colors: ["cream", "blue"], subcategory: "boy" },
    { id: 96, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2c3b85d4-ee1f-42b8-8d0d-518072bd914d.jpg", title: "Набор для мальчика 96", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Цифра фольгированная (1шт), Слоник фигурка фольгированная (1шт), Стеклянные шары с конфетти синие (2шт), Хром шары коричневые (2шт), Стеклянные шары крем (2шт)", price: "5 000 ₽", priceNum: 5000, colors: ["cream", "blue"], subcategory: "boy" },
    { id: 100, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3f4f11f6-eec6-4b3a-ad27-1c33c389d530.jpg", title: "Набор для мальчика 100", description: "Цифра фольгированная (1шт), Геймпад фигурка фольгированная (1шт), Хром шары серебро (3шт), Пастель шары черные (2шт)", price: "2 400 ₽", priceNum: 2400, colors: ["black", "silver"], subcategory: "boy" },
    { id: 102, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3e7f877b-f4e6-44f8-925a-a93f2d58ded8.jpg", title: "Набор для мальчика 102", description: "Звезда гигант фольгированная с надписью (1шт), Цифра фольгированная (1шт), Самолет фигурка фольгированная (1шт), Хром шары серебро (3шт), Пастель шары красные (4шт), Перламутр шары белые (3шт)", price: "4 600 ₽", priceNum: 4600, colors: ["red", "silver"], subcategory: "boy" },
    { id: 105, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a2698703-87e3-4348-b388-39b0adb980a2.jpg", title: "Набор для мальчика 105", description: "Шар-Баблс гигант стеклянный с конфетти и надписью (1шт), Цифра фольгированная (1шт), Машинка фигурка фольгированная (1шт), Прозрачные шары с конфетти (2шт), Хром шары (3шт), Пастель шары (4шт)", price: "5 500 ₽", priceNum: 5500, colors: ["red", "blue"], subcategory: "boy" },
    { id: 110, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6857c979-9e1f-4337-a14e-71b8f6df54e7.jpg", title: "Набор для мальчика 110", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Цифра фольгированная (1шт), Звезда фольгированная с наклейкой и надписью (1шт), Мячи фигурки фольгированные (2шт), Пастель шары (16шт)", price: "7 000 ₽", priceNum: 7000, colors: ["orange", "multicolor", "blue"], subcategory: "boy" },
    { id: 114, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8c5f78fb-ae15-4b63-bf88-ea7e208e1a4d.jpg", title: "Набор для мальчика 114", description: "Цифра фольгированная (1шт), Мячи фигурки фольгированные (2шт), Пастель шары (5шт)", price: "2 650 ₽", priceNum: 2650, colors: ["orange", "black"], subcategory: "boy" },
    { id: 116, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/cb1ed094-ffdf-4278-a94b-bb63a467424a.jpg", title: "Набор для мальчика 116", description: "Цифра фольгированная (1шт), Прозрачные шары с конфетти (4шт), Хром шары серебро (4шт), Стеклянные шары крем (6шт), Пастель шары оранжевые (6шт)", price: "4 100 ₽", priceNum: 4100, colors: ["orange", "silver"], subcategory: "boy" },
    { id: 117, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e9f8c0ae-36f6-4488-9b83-81c762ff002d.jpg", title: "Набор для мальчика 117", description: "Цифра фольгированная (1шт), Динозавр фигурка фольгированная (1шт), Пастель шары (14шт)", price: "3 500 ₽", priceNum: 3500, colors: ["multicolor", "orange"], subcategory: "boy" },
    { id: 119, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/efd9f830-8541-4f41-ac47-05d482495395.jpg", title: "Набор для мальчика 119", description: "Шар-Баблс гигант прозрачный с конфетти, наклейкой и надписью (1шт), Цифра фольгированная (1шт), Человек паук фигурка фольгированная (1шт), Хром шары синие (3шт), Пастель шары красные (6шт)", price: "5 000 ₽", priceNum: 5000, colors: ["red"], subcategory: "boy" },
    { id: 122, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7702f3ea-9cda-4ad4-be77-9da4421e2dd2.jpg", title: "Набор для мальчика 122", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Динозавр фигурка фольгированная (1шт), Стеклянные шары с конфетти коричневые (2шт), Стеклянные шары крем (3шт)", price: "3 950 ₽", priceNum: 3950, colors: ["brown", "cream"], subcategory: "boy" },
    { id: 127, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/26ae761d-609c-410c-9fbb-c04d8123832c.jpg", title: "Набор для мальчика 127", description: "Шар-Баблс прозрачный с шариками внутри и надписью (1шт), Пастель шары (9шт)", price: "3 170 ₽", priceNum: 3170, colors: ["multicolor"], subcategory: "boy" },
    { id: 135, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/57c15a71-011e-4c06-903b-3e8e533fb76c.jpg", title: "Набор для мальчика 135", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Цифра фольгированная (1шт), Пастель шары (9шт)", price: "4 000 ₽", priceNum: 4000, colors: ["yellow", "cream"], subcategory: "boy" },
    { id: 136, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/20de5c3e-b55e-42b9-a4b9-2a1e1668a6b5.jpg", title: "Набор для мальчика 136", description: "Цифры фольгированные (2шт), Звезды фольгированные (2шт), Хром шары (8шт)", price: "3 580 ₽", priceNum: 3580, colors: ["blue", "yellow"], subcategory: "boy" },
    { id: 137, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/74c0169c-dc2e-4e75-9223-3e4b6e700f19.jpg", title: "Набор для мальчика 137", description: "Шар-Баблс гигант латексный с надписью (1шт), Пастель шары (10шт)", price: "3 100 ₽", priceNum: 3100, colors: ["blue", "white"], subcategory: "boy" },
    { id: 138, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d57b9249-f4cc-41e0-9e5a-033be503f5c7.jpg", title: "Набор для мальчика 138", description: "Цифра фольгированная (1шт), Звезда фольгированная с надписью (1шт), Хром шары (6шт)", price: "2 360 ₽", priceNum: 2360, colors: ["blue"], subcategory: "boy" },
    { id: 140, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ec9ba43a-f16c-4c0c-91a2-4313ca4a57c4.jpg", title: "Набор для мальчика 140", description: "Цифра фольгированная с надписью (1шт), Синий трактор фигурка фольгированная (700р), Пастель шары (10шт)", price: "2 950 ₽", priceNum: 2950, colors: ["blue"], subcategory: "boy" },
    { id: 152, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ffb69ce5-3df3-4720-8a90-c4aa724a685e.jpg", title: "Набор для мальчика 152", description: "Цифра фольгированная (1шт), Зайка фигурка фольгированная (1шт), Самолёт фигурка фольгированная (1шт), Машинка фигурка фольгированная (1шт), Стеклянные шары (18шт)", price: "6 400 ₽", priceNum: 6400, colors: ["green", "blue", "cream", "multicolor"], subcategory: "boy" },
    { id: 157, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/91c32a37-a1ec-4160-a771-a7e023d07d04.jpg", title: "Набор для мальчика 157", description: "Цифра фольгированная (1шт), Грузовик фигурка фольгированная (1шт), Пастель шары (7шт)", price: "2 700 ₽", priceNum: 2700, colors: ["orange", "blue"], subcategory: "boy" },
    { id: 159, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/66b7a0f0-30d6-42c3-9e2c-ff26ce71659f.jpg", title: "Набор для мальчика 159", description: "Шар-Баблс гигант прозрачный с конфетти и надписью (1шт), Жираф фигурка фольгированная (1шт), Пастель шары (9шт)", price: "4 070 ₽", priceNum: 4070, colors: ["green", "brown", "yellow"], subcategory: "boy" },
    { id: 161, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/718f969a-6d88-4629-91e0-05b54af33a9b.jpg", title: "Набор для мальчика 161", description: "Цифра фольгированная (1шт), Щенок фигурка фольгированная (1шт), Хром шары золотые (3шт), Пастель шары коричневые и белые (3шт)", price: "2 570 ₽", priceNum: 2570, colors: ["gold", "cream", "brown"], subcategory: "boy" },
    { id: 171, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/dbba5cd8-689c-4aee-bf13-c293ac7b9d17.jpg", title: "Набор для мальчика 171", description: "Цифра фольгированная (1шт), Хром шары (10шт)", price: "2 400 ₽", priceNum: 2400, colors: ["blue", "silver"], subcategory: "boy" },
    { id: 179, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/104d5051-9d78-4235-8d75-9334fdc0196e.jpg", title: "Набор для мальчика 179", description: "Цифра фольгированная (1шт), Коржик фигурка фольгированная (1шт), Хром шары зеленые (2шт), Пастель шары (3шт)", price: "2 500 ₽", priceNum: 2500, colors: ["green", "orange"], subcategory: "boy" },
    { id: 185, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/fbccc15f-d25a-4737-8c47-5b25c893f726.png", title: "Набор для мальчика 185", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Цифра фольгированная (1шт), Мишка фигурка фольгированная (1шт), Сердца фольгированные с надписью (2шт), Пастель шары (7шт)", price: "5 600 ₽", priceNum: 5600, colors: ["green"], subcategory: "boy" },
    { id: 187, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/11cf617b-a767-4eff-ba93-b14dad10c078.png", title: "Набор для мальчика 187", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Звезды фольгированные (3шт), Мотоцикл фигурка фольгированная (1шт), Пастель шары (6шт)", price: "4 980 ₽", priceNum: 4980, colors: ["black", "red"], subcategory: "boy" },
    { id: 189, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9162e8a1-8d08-4164-a494-b9e5e7a9d26b.jpg", title: "Набор для мальчика 189", description: "Цифры фольгированные (2шт), Звезда фольгированная с надписью и наклейкой (1шт), Мячи фигурка фольгированные (2шт), Пастель шары (20шт)", price: "5 900 ₽", priceNum: 5900, colors: ["orange"], subcategory: "boy" },
    { id: 194, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/87470454-0ceb-4e4c-8503-62e538abb9ba.jpg", title: "Набор для мальчика 194", description: "Цифра фольгированная (1шт), Кит фигурка фольгированная (1шт), Хром шары серебро (3шт), Пастель шары (8шт)", price: "3 120 ₽", priceNum: 3120, colors: ["blue", "silver"], subcategory: "boy" },
    { id: 195, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7a8a9d14-67f2-41f0-a310-e48b17573c1f.jpg", title: "Набор для мальчика 195", description: "Шар-Баблс гигант с конфетти и надписью (1шт), Цифра фольгированная (1шт), Хром шары (4шт), Пастель шары (2шт)", price: "3 600 ₽", priceNum: 3600, colors: ["green", "silver"], subcategory: "boy" },
  ],
  "kid-girl": [
    { id: 5, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6a5360b0-6642-40fa-bb31-5466cd723b06.jpg", title: "Набор для девочки 5", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Стеклянные шары розовые (3шт), Хром шары золотые (3шт), Пастель шары белые (3шт)", price: "3 510 ₽", priceNum: 3510, colors: ["pink"], subcategory: "kid-girl" },


    { id: 10, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/32f17abc-0332-4d28-acb0-4906de9e5b5c.jpg", title: "Набор для девочки 10", description: "Шар-Баблс гигант стеклянный с бантиками и надписью (1шт), Цифры фольгированная (1шт), Мишка фигурка фольгированная (1шт), Сердца фольгированные (2шт), Пастель шары (6шт)", price: "5 330 ₽", priceNum: 5330, colors: ["pink", "cream"], subcategory: "kid-girl" },

    { id: 12, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/cd893d6a-651b-409e-9f17-a0ec00a3cfeb.jpg", title: "Набор для девочки 12", description: "Шар-Баблс гигант стеклянный с бантиками и надписью (1шт), Цифра фольгированная (1шт), Бант фигурка фольгированная, Мишка фигурка фольгированная, Сердца фольгированные (2шт), Пастель шары (5шт)", price: "6 000 ₽", priceNum: 6000, colors: ["cream", "pink"], subcategory: "kid-girl" },
    { id: 14, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e83e7c2e-88b9-45ea-8e80-70f4a9d83fa8.jpg", title: "Набор для девочки 14", description: "Цифра фольгированная (1шт), Сердце фольгированное 46см (1шт), Прозрачные шары с конфетти (3шт), Хром шары (2шт), Пастель шары (5шт)", price: "2 870 ₽", priceNum: 2870, colors: ["rose-gold"], subcategory: "kid-girl" },

    { id: 20, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/64db2d26-d014-46a7-a245-4547a016643c.jpg", title: "Набор для девочки 20", description: "«Коржик» фигурка фольгированная (1шт), Пастель шары (6шт)", price: "1 680 ₽", priceNum: 1680, colors: ["multicolor"], subcategory: "kid-girl" },
    { id: 21, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/08f2bedc-0c87-490c-bc39-dbdfc0c4f7af.jpg", title: "Набор для девочки 21", description: "«Карамелька» фигурка фольгированная (1шт), Пастель шары (5шт)", price: "1 550 ₽", priceNum: 1550, colors: ["multicolor"], subcategory: "kid-girl" },
    { id: 22, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/801f6532-68aa-4e0e-be31-768593c20d58.jpg", title: "Набор для девочки 22", description: "Цифра фольгированная (1шт), «Карамелька» фигурка фольгированная (1шт), Сердце фольгированное (1шт), Шарики с рисунком Три Кота (2шт), Пастель шары (4шт)", price: "2 870 ₽", priceNum: 2870, colors: ["red", "orange"], subcategory: "kid-girl" },
    { id: 25, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5821a24b-ed8c-40de-a40b-29e961ae0a9c.jpg", title: "Набор для девочки 25", description: "Цифра фольгированная (1шт), Щенок Скай фигурка фольгированная (1шт), Сердца фольгированные (2шт), Стеклянные шары конфетти кремовый и белый (2шт), Пастель шары (4шт)", price: "3 420 ₽", priceNum: 3420, colors: ["pink", "white"], subcategory: "kid-girl" },
    { id: 27, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/17df82c7-61fe-4434-b703-07b3fd0af253.jpg", title: "Набор для девочки 27", description: "Цифры фольгированные с наклейками (2шт), Сердце фольгированное с надписью и наклейками (1шт), Пастель шары (10шт)", price: "3 700 ₽", priceNum: 3700, colors: ["pink", "cream"], subcategory: "kid-girl" },

    { id: 29, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4d4aee46-f808-4b87-acc4-15b2e035dba9.jpg", title: "Набор для девочки 29", description: "Мишка фигурка фольгированная (1шт), Сердце фольгированное с надписью (1шт), Прозрачные шары с конфетти (3шт), Пастель шары (5шт)", price: "2 550 ₽", priceNum: 2550, colors: ["cream", "pink"], subcategory: "kid-girl" },

    { id: 31, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/26451936-24e3-4791-a057-a9790d3e98fd.jpg", title: "Набор для девочки 31", description: "Шар-Баблс гигант стеклянный с надписью, бантиком и стразами (1шт), Пастель шары с бантиком (7шт), Ленты атласные (8шт)", price: "3 400 ₽", priceNum: 3400, colors: ["white"], subcategory: "kid-girl" },

    { id: 38, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ff7413d3-65e2-4b1b-8b86-d7ece0580b92.jpg", title: "Набор для девочки 38", description: "Цифры фольгированные (2шт), Сердце фольгированное (1шт), Прозрачные шары с конфетти (2шт), Хром шары (3шт), Пастель шары (4шт)", price: "3 350 ₽", priceNum: 3350, colors: ["rose-gold", "pink"], subcategory: "kid-girl" },

    { id: 50, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/de9499de-2bfc-4fb3-952f-62465a92f6f5.jpg", title: "Набор для девочки 50", description: "Цифра фольгированная (1шт), Фея фигурка фольгированная (1шт), Сердца фольгированные (2шт), Стеклянные шары (7шт)", price: "3 700 ₽", priceNum: 3700, colors: ["pink"], subcategory: "kid-girl" },
    { id: 52, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7dd037dc-4c8d-42e8-b103-11398d7bc9a6.jpg", title: "Набор для девочки 52", description: "Шар-Баблс гигант стеклянный с бантиками и надписью (1шт), Бабочка фигурка фольгированная (1шт), Пастель шары с бантиками (7шт), Ленты атласные (9шт)", price: "4 300 ₽", priceNum: 4300, colors: ["pink", "cream"], subcategory: "kid-girl" },
    { id: 54, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1b057567-81ad-4bf3-b197-4d8638a3470a.jpg", title: "Набор для девочки 54", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Цифра фольгированная (1шт), Хром шары золотые (12шт), Пастель шары зеленые и кремовые (24шт), Ленты-дождик (37шт)", price: "6 550 ₽", priceNum: 6550, colors: ["green", "gold", "cream"], subcategory: "kid-girl" },
    { id: 55, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8b446610-4b8c-4831-9e24-4b77f3ea0fb6.jpg", title: "Набор для девочки 55", description: "Цифры фольгированные (2шт), Пастель шары (8шт), Ленты атласные (10шт)", price: "2 740 ₽", priceNum: 2740, colors: ["cream"], subcategory: "kid-girl" },
    { id: 56, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e6db7ac3-d512-4b37-9cfc-b7a24dcde19f.jpg", title: "Набор для девочки 56", description: "Цифра фольгированная (1шт), Котик в колпаке фигурка фольгированная (1шт), Сердце фольгированное с бантиком (1шт), Пастель шары (6шт)", price: "2 780 ₽", priceNum: 2780, colors: ["pink"], subcategory: "kid-girl" },
    { id: 58, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ba7230e2-7b95-460b-af9e-0b4d5e66ab20.jpg", title: "Набор для девочки 58", description: "Шар-Баблс гигант стеклянный с бантиками и надписью (1шт), Цифра фольгированная с бантиками (1шт), Пастель шары белые (8шт), Стеклянные шары крем (8шт)", price: "6 500 ₽", priceNum: 6500, colors: ["cream"], subcategory: "kid-girl" },
    { id: 59, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/bb065ed3-91b8-4a8c-8b9f-62b16addaebf.jpg", title: "Набор для девочки 59", description: "Цифра фольгированная (1шт), Котик фигурка фольгированная (1шт), Пастель шары с бантиками (7шт), Ленты атласные", price: "2 900 ₽", priceNum: 2900, colors: ["pink", "cream"], subcategory: "kid-girl" },
    { id: 61, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/417a8cbe-65bc-4ee6-a2fe-cf638e653c3b.jpg", title: "Набор для девочки 61", description: "Шар-Баблс гигант прозрачный с конфетти и надписью (1шт), Цифра фольгированная (1шт), Сердца фольгированные (2шт), Прозрачные шары с конфетти (2шт), Пастель шары (4шт)", price: "4 520 ₽", priceNum: 4520, colors: ["red"], subcategory: "kid-girl" },
    { id: 62, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1420f73b-9611-483e-ade9-a8d304c5b763.jpg", title: "Набор для девочки 62", description: "Шар-Баблс гигант прозрачный с перьями и надписью (1шт), Цифра фольгированная (1шт), Сердца фольгированные (3шт), Стеклянные шары фиолетовые (3шт), Пастель шары кремовые (5шт)", price: "5 000 ₽", priceNum: 5000, colors: ["cream", "purple"], subcategory: "kid-girl" },
    { id: 72, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/77caecbc-f5b1-41f1-bc3e-ab6fdc9d999a.jpg", title: "Набор для девочки 72", description: "Мишка фигурка фольгированная (1шт), Сердца фольгированные (6шт), Пастель шары (12шт)", price: "4 500 ₽", priceNum: 4500, colors: ["cream", "brown"], subcategory: "kid-girl" },
    { id: 73, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f4d0dab0-bbf2-4ed1-8350-715aee5c45a8.jpg", title: "Набор для девочки 73", description: "Цифра фольгированная (1шт), «Скай» фигурка фольгированная (1шт), Сердца фольгированные (2шт), Прозрачные шары с конфетти (2шт), Хром шары золотые и фиолетовые (4шт), Пастель шары фиолетовые (2шт)", price: "3 000 ₽", priceNum: 3000, colors: ["purple"], subcategory: "kid-girl" },
    { id: 75, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c3fa1f6f-3869-4cd4-97fd-0a1eebae5c26.jpg", title: "Набор для девочки 75", description: "Цифра фольгированная с бантиками (1шт), Русалочка фигурка фольгированная (1шт), Пастель шары (5шт)", price: "2 400 ₽", priceNum: 2400, colors: ["pink"], subcategory: "kid-girl" },
    { id: 76, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/319cf13e-c8ec-45ed-9f17-d9a3346af087.jpg", title: "Набор для девочки 76", description: "Цифра фольгированная (1шт), Тортик фигурка фольгированная (1шт), Мишка фигурка фольгированная (1шт), Хром шары розовые (3шт), Пастель шары розовые и кремовые (3шт)", price: "3 250 ₽", priceNum: 3250, colors: ["pink", "cream"], subcategory: "kid-girl" },
    { id: 85, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5c9dad5c-2954-45c2-a829-88567dfeeeaf.jpg", title: "Набор для девочки 85", description: "Цифра фольгированная (1шт), Мишка фигурка фольгированная (1шт), Сердца фольгированные (2шт), Пастель шары (8шт)", price: "3 340 ₽", priceNum: 3340, colors: ["cream", "pink"], subcategory: "kid-girl" },
    { id: 88, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ad278b3f-e82e-49a2-82ae-82a70212f53f.jpg", title: "Набор для девочки 88", description: "Шар-Баблс стеклянный с бантиками и надписью (1шт), Сердца фольгированные (3шт), Пастель шары (7шт), Ленты атласные (11шт)", price: "4 320 ₽", priceNum: 4320, colors: ["cream", "white"], subcategory: "kid-girl" },
    { id: 90, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1cf15efd-d269-4443-818b-1fa726211a4f.jpg", title: "Набор для девочки 90", description: "Шар-Баблс стеклянный с бантиками и надписью (1шт), Мишка фигурка фольгированная (1шт), Прозрачные шары с конфетти (3шт), Пастель шары (6шт)", price: "4 430 ₽", priceNum: 4430, colors: ["pink", "white"], subcategory: "kid-girl" },
    { id: 91, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/62e7021c-718e-46dc-82bc-6a6256c1a5e7.jpg", title: "Набор для девочки 91", description: "Шар-Баблс стеклянный с бантиками и надписью (1шт), Сердце фольгированное с бантиком (1шт), Пастель шары с бантиками (5шт)", price: "3 430 ₽", priceNum: 3430, colors: ["pink", "white"], subcategory: "kid-girl" },
    { id: 94, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8d28b8af-6f7d-40a9-beb6-e3e27aef7dd4.jpg", title: "Набор для девочки 94", description: "Цифра фольгированная (1шт), Бабочка фольгированная (1шт), Пастель шары (7шт)", price: "2 500 ₽", priceNum: 2500, colors: ["purple"], subcategory: "kid-girl" },
    { id: 95, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/047bc8d7-0048-4cad-bd5b-296d419868a3.jpg", title: "Набор для девочки 95", description: "Цифра фольгированная (1шт), Сердце фольгированное с надписью (1шт), Пастель шары (5шт)", price: "2 750 ₽", priceNum: 2750, colors: ["pink", "cream"], subcategory: "kid-girl" },
    { id: 96, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/466259e8-1a1c-4529-97f0-45fded71427e.jpg", title: "Набор для девочки 96", description: "Цифра фольгированная (1шт), Котик фигурка фольгированная (1шт), Сердца фольгированные (3шт), Прозрачные шары с конфетти (2шт), Пастель шары (5шт)", price: "3 300 ₽", priceNum: 3300, colors: ["pink", "white"], subcategory: "kid-girl" },
    { id: 97, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4d4b30f6-81dd-4a44-a6f0-e1b7eb3a9585.jpg", title: "Набор для девочки 97", description: "Цифра фольгированная (1шт), Зайчик фигурка фольгированная (1шт), Прозрачные шары с конфетти (3шт), Хром шар золотой (1шт), Пастель шары белые и кремовые (3шт)", price: "2 750 ₽", priceNum: 2750, colors: ["white"], subcategory: "kid-girl" },
    { id: 98, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/899263db-982a-479f-86d5-e8b26efa3471.jpg", title: "Набор для девочки 98", description: "Цифра фольгированная с бантиками (1шт), Стеклянные шары с бантиками (5шт), Ленты атласные (6шт)", price: "2 100 ₽", priceNum: 2100, colors: ["white"], subcategory: "kid-girl" },
    { id: 102, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4aa8bd50-b7e8-42a3-b204-77534282a075.jpg", title: "Набор для девочки 102", description: "Шар-Баблс прозрачный с шариками внутри и надписью (1шт), Динозаврик фигурка фольгированная (1шт), Пастель шары (7шт)", price: "3 800 ₽", priceNum: 3800, colors: ["pink"], subcategory: "kid-girl" },
    { id: 104, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3e91cecf-aa55-4af8-a73e-3cbcff800916.jpg", title: "Набор для девочки 104", description: "Цифры фольгированные (2шт), Пастель шары с бантиками (7шт), Ленты атласные (9шт)", price: "2 950 ₽", priceNum: 2950, colors: ["pink"], subcategory: "kid-girl" },
    { id: 105, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/0724a0f6-fb22-43b7-8d30-6ee20c9b05f7.jpg", title: "Набор для девочки 105", description: "Цифра фольгированная (1шт), Прозрачные шары с конфетти (4шт), Хром шары золотые (3шт), Пастель шары желтые (3шт)", price: "2 470 ₽", priceNum: 2470, colors: ["gold", "yellow"], subcategory: "kid-girl" },
    { id: 106, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/7c12c932-7729-4553-8c00-1dda5d561016.jpg", title: "Набор для девочки 106", description: "Цифра фольгированная (1шт), Сердце фольгированное с надписью (1шт), Звезда фольгированная (1шт), Пастель шары (3шт)", price: "2 100 ₽", priceNum: 2100, colors: ["gold"], subcategory: "kid-girl" },
    { id: 108, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2893f698-2780-47ce-afee-9d4993547417.jpg", title: "Набор для девочки 108", description: "Шар-Баблс стеклянный с надписью и бантиками (1шт), Стеклянные шары с наклейками (6шт)", price: "3 500 ₽", priceNum: 3500, colors: ["white", "cream"], subcategory: "kid-girl" },
    { id: 110, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8362f3ce-a367-43e2-a47d-62f70b8b74bc.jpg", title: "Набор для девочки 110", description: "Шар-Баблс стеклянный с бантиками и надписью (1шт), Стеклянные шары с бантиками (5шт), Ленты атласные (7шт)", price: "3 400 ₽", priceNum: 3400, colors: ["white"], subcategory: "kid-girl" },
    { id: 111, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/91551982-a471-4400-a367-d577a90b91bb.jpg", title: "Набор для девочки 111", description: "Цифра фольгированная (1шт), Фигурка фольгированная (1шт), Сердца фольгированные (2шт), Стеклянные шары (2шт), Пастель шары (3шт)", price: "3 050 ₽", priceNum: 3050, colors: ["pink"], subcategory: "kid-girl" },
    { id: 116, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/fabec4a4-b7b5-4a5d-a2ea-466dcc4c03a8.jpg", title: "Набор для девочки 116", description: "Шар-Баблс стеклянный с бантиками и надписью (1шт), Стеклянные шары розовые (5шт), Пастель шары желтые (5шт)", price: "3 700 ₽", priceNum: 3700, colors: ["yellow"], subcategory: "kid-girl" },
    { id: 119, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/25999fb4-e03e-4cc0-b841-6095e1a30d5c.jpg", title: "Набор для девочки 119", description: "Цифра фольгированная (1шт), Котик с колпаком фигурка фольгированная (1шт), Сердца фольгированные (2шт), Хром шары (4шт), Пастель шар (1шт)", price: "3 050 ₽", priceNum: 3050, colors: ["cream", "gold"], subcategory: "kid-girl" },

    { id: 123, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b62d09df-12ae-4f87-93cb-11b74f819f5f.jpg", title: "Набор для девочки 123", description: "Шар-Баблс стеклянные с бантиками и надписью (1шт), Стеклянные шары с бантиками (5шт), Ленты атласные (5шт)", price: "3 400 ₽", priceNum: 3400, colors: ["white"], subcategory: "kid-girl" },
    { id: 128, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3ae93ace-b744-4df4-a66c-592107b9ebcc.jpg", title: "Набор для девочки 128", description: "Сердце фольгированное гигант с надписью (1шт), Сердца фольгированные (2шт), Стеклянные шары с конфетти (2шт), Стеклянные шары кремовые (3шт), Хром шары (3шт)", price: "3 720 ₽", priceNum: 3720, colors: ["cream", "rose-gold"], subcategory: "kid-girl" },
    { id: 129, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2dab0a54-2af2-44e8-84fb-da67862b5953.jpg", title: "Набор для девочки 129", description: "Стеклянный шар с бантиками и надписью (1шт), Прозрачный шар (1шт), Прозрачные шары с конфетти (2шт), Стеклянные шары (3шт), Ленты атласные (6шт)", price: "3 380 ₽", priceNum: 3380, colors: ["cream"], subcategory: "kid-girl" },
    { id: 131, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5d680ce4-a601-411f-9552-c07c2ea9533f.jpg", title: "Набор для девочки 131", description: "Цифра фольгированная (1шт), Мишка фигурка фольгированная (1шт), Звезда фольгированная (1шт), Хром шары (3шт), Пастель шары (6шт)", price: "3 200 ₽", priceNum: 3200, colors: ["brown", "cream"], subcategory: "kid-girl" },
    { id: 134, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4d5198fb-d439-4742-a185-d2adbe88f736.jpg", title: "Набор для девочки 134", description: "Цифра фольгированная (1шт), Сердце фольгированное (1шт), Шар прозрачный с конфетти (1шт), Стеклянные шары (7шт), Ленты атласные (9шт)", price: "2 600 ₽", priceNum: 2600, colors: ["pink"], subcategory: "kid-girl" },
    { id: 136, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d820756e-f57e-4d09-91df-27934ab49edb.jpg", title: "Набор для девочки 136", description: "Шар-Баблс прозрачный с перьями и надписью (1шт), Сердце фольгированное (1шт), Стеклянные шары (8шт)", price: "3 900 ₽", priceNum: 3900, colors: ["pink", "blue"], subcategory: "kid-girl" },
    { id: 138, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/24b4adf1-e721-40b5-8136-a07bb74da6b5.jpg", title: "Набор для девочки 138", description: "Цифра фольгированная (1шт), Котик в колпаке фигурка фольгированная (1шт), Сердце фольгированное (1шт), Пастель шары (6шт), Ленты атласные (9шт)", price: "3 000 ₽", priceNum: 3000, colors: ["pink"], subcategory: "kid-girl" },
    { id: 139, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9e7d21e7-77b5-41b5-959a-9b122cbff8a2.jpg", title: "Набор для девочки 139", description: "Шар-Баблс гигант стеклянный с бантиками и надписью (1шт), Цифры фольгированные (2шт), Сердца фольгированные (4шт), Стеклянные шары (15шт), Прозрачные шары с конфетти (не Баблс) (4шт), Ленты атласные (25шт)", price: "9 000 ₽", priceNum: 9000, colors: ["white", "cream"], subcategory: "kid-girl" },
    { id: 145, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e831a898-9784-4be0-884b-64562cbbca0a.jpg", title: "Набор для девочки 145", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Цифра фольгированная с бантиком (1шт), Пастель шары с бантиками (7шт)", price: "4 300 ₽", priceNum: 4300, colors: ["pink"], subcategory: "kid-girl" },

    { id: 150, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/448d6af5-ad3a-48b7-a72d-ac565488f666.jpg", title: "Набор для девочки 150", description: "Сердце гигант фольгированное с надписью (1шт), Пастель шары (9шт), Ленты атласные (10шт)", price: "2 750 ₽", priceNum: 2750, colors: ["red", "silver"], subcategory: "kid-girl" },
    { id: 153, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a8d5629c-389e-4352-a955-cab19f5d674b.jpg", title: "Набор для девочки 153", description: "Шар-Баблс гигант прозрачный с наполнением и бантиками (1шт), Цифра фольгированная (1шт), Фея фигурка фольгированная (1шт), Сердце фольгированное (1шт), Пастель шары (4шт), Ленты атласные (7шт)", price: "4 700 ₽", priceNum: 4700, colors: ["multicolor"], subcategory: "kid-girl" },
    { id: 154, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/bc5a31e3-25b1-493f-bbcc-701042c74594.jpg", title: "Набор для девочки 154", description: "Цифра фольгированная (1шт), Прозрачные шары с конфетти (4шт), Сердца фольгированные (4шт), Хром шары (4шт), Пастель шары (8шт)", price: "4 680 ₽", priceNum: 4680, colors: ["pink"], subcategory: "kid-girl" },
    { id: 158, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2910039f-4829-48a3-a717-81590d0e29a1.jpg", title: "Набор для девочки 158", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Стеклянные шары (4шт), Пастель шары (10шт), Ленты атласные (14шт)", price: "4 260 ₽", priceNum: 4260, colors: ["pink", "cream"], subcategory: "kid-girl" },
    { id: 161, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/42d71405-9a28-47f3-b00b-8315a5a099fc.jpg", title: "Набор для девочки 161", description: "Шар-Баблс прозрачный с конфетти и надписью (1шт), Цифра фольгированная (1шт), Пастель шары (5шт)", price: "3 250 ₽", priceNum: 3250, colors: ["purple"], subcategory: "kid-girl" },
    { id: 163, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5f8d1aff-e66f-4022-8f1c-f514ae682006.jpg", title: "Набор для девочки 163", description: "Шар-Баблс стеклянный с бантиками и надписью (1шт), Прозрачные шары с конфетти (2шт), Стеклянные шары (3шт), Пастель шар (1шт)", price: "3 320 ₽", priceNum: 3320, colors: ["blue", "white"], subcategory: "kid-girl" },


    { id: 176, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/96ccbad9-6cba-4fe9-a1f2-bbdd3e3a80f3.jpg", title: "Набор для девочки 176", description: "«Скай» фигурка фольгированная (1шт), Пастель шары (10шт)", price: "2 200 ₽", priceNum: 2200, colors: ["multicolor"], subcategory: "kid-girl" },

    { id: 184, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/83df3dea-905a-406c-ad1f-41b69fced6e9.jpg", title: "Набор для девочки 184", description: "Цифра фольгированная (1шт), Бабочка фольгированная фигурка (1шт), Прозрачные шары с конфетти (2шт), Пастель шары (5шт)", price: "2 650 ₽", priceNum: 2650, colors: ["purple"], subcategory: "kid-girl" },
    { id: 187, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5e944ed6-775e-4463-80ed-09f69df3ebc8.jpg", title: "Набор для девочки 187", description: "Цифра фольгированная (1шт), Торт фигурка фольгированная (1шт), Прозрачные шары с конфетти (3шт), Пастель шары (7шт)", price: "2 900 ₽", priceNum: 2900, colors: ["green"], subcategory: "kid-girl" },
    { id: 188, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/fccccf36-4b38-4dc9-b617-e3e41aa607a0.jpg", title: "Набор для девочки 188", description: "Шар-Баблс гигант латексный с надписью (1шт), Сердце фольгированное (1шт), Пастель шары (6шт)", price: "2 950 ₽", priceNum: 2950, colors: ["red"], subcategory: "kid-girl" },
    { id: 193, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f3a65ae7-cb50-4427-93ad-4024444327c0.jpg", title: "Набор для девочки 193", description: "Шар-Баблс гигант латексный с бантиками и надписью (1шт), Хром шары (3шт), Пастель шары (4шт), Ленты атласные (7шт)", price: "3 000 ₽", priceNum: 3000, colors: ["green"], subcategory: "kid-girl" },
    { id: 194, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1d8e6cd3-d2fd-43d8-95aa-d478adedd406.jpg", title: "Набор для девочки 194", description: "Шар-Баблс гигант латексный с надписью (1шт), Единорожек фигурка фольгированная (1шт), Пастель шары (10шт)", price: "4 200 ₽", priceNum: 4200, colors: ["multicolor"], subcategory: "kid-girl" },
    { id: 196, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/db7a123b-d3dc-462f-addd-cd663dc688b3.jpg", title: "Набор для девочки 196", description: "Цифра фольгированная (1шт), Прозрачные шары с конфетти (4шт), Хром шары серебро (4шт), Стеклянные шары крем и оранжевые (12шт)", price: "4 400 ₽", priceNum: 4400, colors: ["orange"], subcategory: "kid-girl" },

    { id: 212, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/dbb924ef-8361-4016-8d18-778c2da699f6.jpg", title: "Набор для девочки 212", description: "Сердце гигант с надписью (1шт), Бабочка фигурка фольгированная (1шт), Звезда фольгированная (1шт), Сердце фольгированное (1шт), Хром шары (3шт), Пастель шары (3шт)", price: "3 900 ₽", priceNum: 3900, colors: ["pink"], subcategory: "kid-girl" },
    { id: 217, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/671e7047-ab4d-4567-8dd9-4c16d7b6e479.jpg", title: "Набор для девочки 217", description: "Цифра фольгированная (1шт), Пастель шары (18шт)", price: "3 140 ₽", priceNum: 3140, colors: ["pink", "white"], subcategory: "kid-girl" },
    { id: 225, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f317283d-92e0-4dae-8d2e-a55a6c15d533.jpg", title: "Набор для девочки 225", description: "Цифра фольгированная (1шт), Прозрачные шары с конфетти (3шт), Пастель шары (7шт)", price: "2 300 ₽", priceNum: 2300, colors: ["pink"], subcategory: "kid-girl" },

    { id: 236, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/46a62aca-9ac8-4e66-b18d-32b60730bdbc.jpg", title: "Набор для девочки 236", description: "Шар-Баблс гигант стеклянный с бантиками и надписью (1шт), Цифра фольгированная (1шт), Прозрачные шары с конфетти (3шт), Пастель шары (5шт)", price: "4 300 ₽", priceNum: 4300, colors: ["pink"], subcategory: "kid-girl" },
    { id: 237, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/53181645-9c66-4a65-9ac2-feb70b048e02.jpg", title: "Набор для девочки 237", description: "Шар-Баблс гигант стеклянный с конфетти и надписью (1шт), Сердца фольгированные (2шт), Пастель шары (18шт)", price: "5 440 ₽", priceNum: 5440, colors: ["pink"], subcategory: "kid-girl" },
    { id: 238, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4d9c2268-547d-4c6e-a125-9deeef971524.jpg", title: "Набор для девочки 238", description: "Цифра фольгированная (1шт), Стеклянные шары с бантиками (10шт), Ленты атласные (11шт)", price: "3 200 ₽", priceNum: 3200, colors: ["white", "purple"], subcategory: "kid-girl" },

    { id: 246, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/93a7436e-8100-4c5c-af81-bfd98f09f286.jpg", title: "Набор для девочки 246", description: "Шар-Баблс гигант стеклянный с бантиками и надписью (1шт), Прозрачные шары с конфетти (2шт), Перламутр и пастель шары (8шт)", price: "3 700 ₽", priceNum: 3700, colors: ["purple"], subcategory: "kid-girl" },
    { id: 251, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d6522317-d057-41bf-b2df-cb9abab7cba2.jpg", title: "Набор для девочки 251", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Цифра фольгированная (1шт), Пастель шары (7шт)", price: "3 800 ₽", priceNum: 3800, colors: ["pink"], subcategory: "kid-girl" },

    { id: 264, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6663d103-a100-4229-976a-abd970973d05.jpg", title: "Набор для девочки 264", description: "Шар-Баблс гигант стеклянный с бантиками и надписью (1шт), Стеклянные шары с бантиками (10шт), Ленты атласные (10шт)", price: "4 550 ₽", priceNum: 4550, colors: ["cream"], subcategory: "kid-girl" },
    { id: 268, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8f7ee49c-c391-49a3-a71c-101b7663068c.jpg", title: "Набор для девочки 268", description: "Шар-Баблс гигант стеклянный с бантиками и надписью (1шт), Сердце фольгированное с бантиком (1шт), Пастель шары с бантиками (5шт)", price: "3 600 ₽", priceNum: 3600, colors: ["white", "pink"], subcategory: "kid-girl" },
    { id: 270, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a4619e0e-9454-425c-8e6a-f12a242658f4.jpg", title: "Набор для девочки 270", description: "Шар-Баблс гигант стеклянный с бантиками и надписью (1шт), Сердца фольгированные (4шт), Стеклянные шары (8шт), Ленты атласные (12шт)", price: "5 200 ₽", priceNum: 5200, colors: ["pink"], subcategory: "kid-girl" },
    { id: 272, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3a730793-5ce5-4743-863b-c8ca53102684.jpg", title: "Набор для девочки 272", description: "Шар-Баблс гигант стеклянный с бантиками и надписью (1шт), Сердца фольгированные (2шт), Пастель шары (7шт)", price: "3 860 ₽", priceNum: 3860, colors: ["pink", "white"], subcategory: "kid-girl" },
    { id: 274, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/509a4970-d12f-4495-8fbc-1227a5774780.jpg", title: "Набор для девочки 274", description: "Шар-Баблс гигант стеклянный с бантиками и надписью (1шт), Хром шары (3шт), Пастель шары (7шт)", price: "3 650 ₽", priceNum: 3650, colors: ["pink"], subcategory: "kid-girl" },
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

    { id: 99, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/58820ce5-b53c-4276-afeb-c386a1b9b2d6.jpg", title: "Набор на выписку мальчика 6", description: "Сердце гигант фольгированное с надписью (1шт), Лев фигурка фольгированная (1шт), Прозрачные шары с конфетти (2шт), Пастель шары (4шт)", price: "3 320 ₽", priceNum: 3320, colors: ["green", "orange"], subcategory: "boy-discharge" },
    { id: 101, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ece3fd12-e55f-4dfe-94f0-bb31794dbbc4.jpg", title: "Набор на выписку мальчика 8", description: "Шар-Баблс гигант прозрачный с шариками внутри и надписью (1шт), Сердце гигант фольгированное (1шт), Облачко фигурка фольгированная (1шт), Прозрачные шары с конфетти (5шт), Пастель шары (23шт)", price: "8 190 ₽", priceNum: 8190, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 102, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/ee175644-fafe-4798-8f1a-1f97bdbdc1b4.jpg", title: "Набор на выписку мальчика 9", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Облачко фигурка фольгированная (1шт), Пастель шары (6шт)", price: "3 680 ₽", priceNum: 3680, colors: ["white", "cream"], subcategory: "boy-discharge" },
    { id: 109, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/075abab0-8158-4f10-8670-c5db608dc7b2.jpg", title: "Набор на выписку мальчика 16", description: "Шар-Баблс гигант прозрачный с перьями и надписью (1шт), Мишка фигурка фольгированная (1шт), Пастель шары (18шт)", price: "5 140 ₽", priceNum: 5140, colors: ["cream", "white"], subcategory: "boy-discharge" },
    { id: 110, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8a49c6ed-af7b-4ac7-85c1-aea04b3c3077.jpg", title: "Набор на выписку мальчика 17", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Мишка фигурка фольгированная (1шт), Сердца фольгированные (4шт), Пастель шары (16шт)", price: "6 380 ₽", priceNum: 6380, colors: ["brown", "cream", "white"], subcategory: "boy-discharge" },
    { id: 114, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/2ea1b033-6cf2-4ec9-99ed-35a82e65fc51.jpg", title: "Набор на выписку мальчика 21", description: "Шар-Баблс прозрачный с перьями и надписью (1шт), Облачко фигурка фольгированная (1шт), Пастель шары (18шт)", price: "5 140 ₽", priceNum: 5140, colors: ["blue", "cream"], subcategory: "boy-discharge" },
    { id: 118, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/194b1b17-e1cf-4e6b-b08b-fa61065bc301.jpg", title: "Набор на выписку мальчика 25", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Коляска фигурка фольгированная (1шт), Сердца фольгированные (4шт), Пастель шары (16шт)", price: "6 480 ₽", priceNum: 6480, colors: ["white", "cream"], subcategory: "boy-discharge" },
    { id: 123, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/fd6e0df7-427c-4ee3-aac6-eb07b5caa120.jpg", title: "Набор на выписку мальчика 30", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Слоник фигурка фольгированная (1шт), Сердце фольгированное с надписью (1шт), Хром шар золотой (1шт), Пастель шары (4шт)", price: "4 180 ₽", priceNum: 4180, colors: ["cream"], subcategory: "boy-discharge" },
    { id: 132, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/261dbe1f-160b-4f82-9b39-728b54000051.jpg", title: "Набор на выписку мальчика 39", description: "Звезда гигант фольгированная с надписью (1шт), Кит фигурка фольгированная (1шт), Облачко фигурка фольгированная (1шт), Звезда фольгированная (1шт), Прозрачные шары с конфетти (2шт), Стеклянные шары (15шт)", price: "6 650 ₽", priceNum: 6650, colors: ["white", "green"], subcategory: "boy-discharge" },
    { id: 133, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4679bc67-e45d-48e1-b873-99fd17e5ce10.jpg", title: "Набор на выписку мальчика 40", description: "Шар-Баблс латексный с надписью (1шт), Сердце гигант фольгированное с надписью (1шт), Прозрачные шары с конфетти (2шт), Пастель шары (5шт)", price: "5 250 ₽", priceNum: 5250, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 134, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/03f7f746-2c55-4492-abe0-3c09dfc012aa.jpg", title: "Набор на выписку мальчика 41", description: "Шар-Баблс гигант прозрачный с надписью (1шт), Прозрачные шары с конфетти (4шт), Пастель шары (16шт)", price: "4 880 ₽", priceNum: 4880, colors: ["cream", "white"], subcategory: "boy-discharge" },
    { id: 136, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/115839c1-2735-4aea-8a18-aea09e9d850f.jpg", title: "Набор на выписку мальчика 43", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Сердца фольгированные (2шт), Стеклянные шары с конфетти (2шт), Пастель шары (5шт)", price: "3 950 ₽", priceNum: 3950, colors: ["gold", "white", "cream"], subcategory: "boy-discharge" },
    { id: 137, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/87dcdbed-eac4-44d7-9f51-efd510b5d42f.jpg", title: "Набор на выписку мальчика 44", description: "Шар-Баблс гигант стеклянный с конфетти и надписью (1шт), Мишка фигурка фольгированная (1шт), Стеклянные шары с конфетти (3шт), Пастель шары (4шт)", price: "4 470 ₽", priceNum: 4470, colors: ["white", "brown"], subcategory: "boy-discharge" },
    { id: 145, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/e549dd72-ca9b-4a9d-9ac8-6adcd30f3944.jpg", title: "Набор на выписку мальчика 52", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Сердца фольгированные с надписью (2шт), Мишка фигурка фольгированная (1шт), Прозрачные шары (2шт), Пастель шары (14шт)", price: "5 680 ₽", priceNum: 5680, colors: ["white", "brown"], subcategory: "boy-discharge" },
    { id: 147, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b7d33434-b251-49cf-9835-cbc9175c1c8c.jpg", title: "Набор на выписку мальчика 54", description: "Шар-Баблс гигант прозрачный с перьями и надписью (1шт), Мишка фигурка фольгированная (1шт), Пастель шары (18шт)", price: "5 140 ₽", priceNum: 5140, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 173, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/df6206b7-00ac-41a1-859a-c7c631d7f687.jpg", title: "Набор на выписку мальчика 80", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Мишка фигурка фольгированная (1шт), Пастель шары (14шт)", price: "4 720 ₽", priceNum: 4720, colors: ["white", "cream", "brown"], subcategory: "boy-discharge" },
    { id: 174, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c66ca0cb-8e7b-42bf-a77b-729c62b0aa7b.jpg", title: "Набор на выписку мальчика 81", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Сердца фольгированные (4шт), Хром шары (2шт), Пастель шары (8шт)", price: "4 860 ₽", priceNum: 4860, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 182, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/55717254-6c7c-42f4-bcb9-4516d3b84821.jpg", title: "Набор на выписку мальчика 89", description: "Шар-Баблс гигант стеклянный с конфетти и надписью (1шт), Мишка фигурка фольгированная (1шт), Прозрачные шары с конфетти (4шт), Пастель шары (12шт)", price: "5 560 ₽", priceNum: 5560, colors: ["cream"], subcategory: "boy-discharge" },
    { id: 183, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d869dd81-29b6-4cc3-8b67-88707872fed9.jpg", title: "Набор на выписку мальчика 90", description: "Шар-Баблс гигант стеклянный с надписью (2шт), Облачко фигурка фольгированная (1шт), Сердца фольгированные (4шт), Стеклянные шары (20шт)", price: "10 000 ₽", priceNum: 10000, colors: ["blue", "white"], subcategory: "boy-discharge" },

    { id: 195, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f88c192d-42f7-4c92-a7c8-ebfb6ae6026e.jpg", title: "Набор на выписку мальчика 102", description: "Шар-Баблс стеклянный с надписью (1шт), Пастель шары (10шт)", price: "3 300 ₽", priceNum: 3300, colors: ["blue", "white"], subcategory: "boy-discharge" },
    { id: 196, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/91055f5d-2de8-464e-a55c-532eb1f790c8.jpg", title: "Набор на выписку мальчика 103", description: "Шар-Баблс стеклянный с бантиками и надписью (1шт), Аист фигурка фольгированная (1шт), Пастель шары (10шт)", price: "4 500 ₽", priceNum: 4500, colors: ["white", "gold"], subcategory: "boy-discharge" },


    { id: 199, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/eb0c4cee-9172-4b9a-b84c-5229181c7a31.jpg", title: "Набор на выписку мальчика 106", description: "Шар-Баблс стеклянный с надписью (1шт), Мишка фигурка фольгированная (1шт), Сердца фольгированные (2шт), Хром шары золотые (6шт), Пастель шары (22шт)", price: "7 420 ₽", priceNum: 7420, colors: ["blue", "white", "cream"], subcategory: "boy-discharge" },
    { id: 200, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a5681565-bc46-4dc5-8f1f-e435c0902c55.jpg", title: "Набор на выписку мальчика 107", description: "Сердце гигант фольгированное с надписью (1шт), Зайка фигурка фольгированная (1шт), Сердца фольгированные (2шт), Прозрачные шары с конфетти (2шт), Пастель шары (6шт)", price: "4 180 ₽", priceNum: 4180, colors: ["blue", "white"], subcategory: "boy-discharge" },



    { id: 10, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/a405d4b5-92f0-4271-94ea-f3dce8d6d0e9.jpg", title: "Набор на выписку девочки 7", description: "Шар-Баблс стеклянный с конфетти и надписью (1шт), Прозрачные шары с конфетти (3шт), Пастель шары (7шт)", price: "3 910 ₽", priceNum: 3910, colors: ["pink", "cream"], subcategory: "girl-discharge" },
    { id: 11, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4c5e623a-4fab-4d55-9e56-ac43a2ad6e76.jpg", title: "Набор на выписку девочки 8", description: "Шар-Баблс гигант латексный с бантиками и надписью (1шт), Пастель шары (18шт)", price: "4 340 ₽", priceNum: 4340, colors: ["pink", "white"], subcategory: "girl-discharge" },

    { id: 13, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d32221ae-3cef-4353-9e51-3da9e01bcaa5.jpg", title: "Набор на выписку девочки 10", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Облачко фигурка фольгированная (1шт), Пастель шары (10шт)", price: "4 200 ₽", priceNum: 4200, colors: ["pink", "cream"], subcategory: "girl-discharge" },
    { id: 16, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6178bbea-28f8-4f7d-9f5e-30853654f7b1.jpg", title: "Набор на выписку девочки 13", description: "Шар-Баблс стеклянный с бантиками и надписью (1шт), Аист фигурка фольгированная (1шт), Пастель шары (14шт)", price: "4 870 ₽", priceNum: 4870, colors: ["white"], subcategory: "girl-discharge" },

    { id: 34, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/fdfaf9a0-b0af-4dd3-8130-7f449ff07bd2.jpg", title: "Набор на выписку девочки 31", description: "Шар-Баблс гигант стеклянный с надписью (1шт), Сердца фольгированные с надписью (2шт), Стеклянные шары с конфетти (6шт)", price: "4 900 ₽", priceNum: 4900, colors: ["white"], subcategory: "girl-discharge" },
    { id: 45, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/058e735d-79d8-4e46-8bc7-8466816453ab.jpg", title: "Набор на выписку девочки 42", description: "Шар-Баблс латексный с бантиками и надписью (1шт), Хром шар золотой (1шт), Пастель шары (8шт)", price: "3 150 ₽", priceNum: 3150, colors: ["pink"], subcategory: "girl-discharge" },
    { id: 46, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/dd26414f-f6c8-40a4-b70c-5801b95555d9.jpg", title: "Набор на выписку девочки 43", description: "Сердце фольгированное с надписью (1шт), Облачко фигурка фольгированная (1шт), Полумесяц фигурка фольгированная (1шт), Прозрачные шары с конфетти (2шт), Пастель шары (5шт)", price: "3 250 ₽", priceNum: 3250, colors: ["pink"], subcategory: "girl-discharge" },
    { id: 47, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/72e03c14-c49d-4d30-8c91-1c25c6fcc583.jpg", title: "Набор на выписку девочки 44", description: "Сердце гигант фольгированное с надписью (1шт), Сердце фольгированное с надписью (1шт), Облачко фигурка фольгированная (1шт), Хром шары золотые (3шт), Пастель шары (6шт)", price: "4 060 ₽", priceNum: 4060, colors: ["white", "silver", "gold", "cream"], subcategory: "girl-discharge" },
    { id: 51, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/1483df2b-5469-44ef-871e-8b08c063ff1f.jpg", title: "Набор на выписку девочки 48", description: "Сердце гигант фольгированное с надписью (1шт), Прозрачные шары с конфетти (2шт), Хром шары (3шт), Пастель шары (5шт)", price: "3 000 ₽", priceNum: 3000, colors: ["pink"], subcategory: "girl-discharge" },
    { id: 70, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/aaf0e6cf-5996-4591-953b-84b77d40cb39.jpg", title: "Набор на выписку девочки 67", description: "Шар-Баблс гигант стеклянный с бантиками и надписью (1шт), Облачко фигурка фольгированная (1шт), Прозрачные шары с конфетти (2шт), Пастель шары (5шт)", price: "4 100 ₽", priceNum: 4100, colors: ["white"], subcategory: "girl-discharge" },
    { id: 79, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/4c760cd9-8919-45ff-8fe0-f34cea546d2a.jpg", title: "Набор на выписку девочки 76", description: "Шар-Баблс гигант стеклянный с бантиками и надписью (1шт), Сердце фольгированное с надписью (1шт), Пастель шары (20шт)", price: "5 800 ₽", priceNum: 5800, colors: ["white", "pink"], subcategory: "girl-discharge" },

    { id: 99, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/83638ed2-dde5-4c48-a7d5-b0e7b4e52aeb.jpg", title: "Набор на выписку девочки 96", description: "Сердце гигант фольгированное с надписью (1шт), Облачко фигурка фольгированная (1шт), Прозрачные шары с конфетти (3шт), Пастель шары (8шт)", price: "3 940 ₽", priceNum: 3940, colors: ["white", "pink"], subcategory: "girl-discharge" },
    { id: 104, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6bc528d2-458a-4d5c-a5f6-0535da1b44d5.jpg", title: "Набор на выписку девочки 101", description: "Шар-Баблс гигант стеклянный с бантиками и надписью (1шт), Пастель шары с бантиками (7шт)", price: "3 510 ₽", priceNum: 3510, colors: ["white", "pink"], subcategory: "girl-discharge" },
    { id: 109, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/978e15e9-ff20-442e-a22e-c1066ee7bc67.jpg", title: "Набор на выписку девочки 106", description: "Сердце гигант фольгированное с надписью (1шт), Пастель шары (10шт)", price: "2 800 ₽", priceNum: 2800, colors: ["pink", "white"], subcategory: "girl-discharge" },
    { id: 111, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/5a2b13a5-152f-4c97-9955-783cbe241f38.jpg", title: "Набор на выписку девочки 108", description: "Шар-Баблс стеклянный с надписью и бантиками (1шт), Сердца фольгированные (2шт), Стеклянные шары с конфетти (2шт), Пастель шары (6шт)", price: "4 230 ₽", priceNum: 4230, colors: ["pink", "cream"], subcategory: "girl-discharge" },
    { id: 113, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b3fb2106-f704-46b0-b506-a4f977da913d.jpg", title: "Набор на выписку девочки 110", description: "Шар-Баблс гигант с бантиками и надписью (1шт), Бантик фигурка фольгированная (1шт), Прозрачные шары с бантиками (4шт), Пастель шары (14шт)", price: "5 690 ₽", priceNum: 5690, colors: ["pink"], subcategory: "girl-discharge" },
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
  const [searchParams, setSearchParams] = useSearchParams()

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

  const updateParams = (updates: Record<string, string | null>) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev)
      Object.entries(updates).forEach(([k, v]) => {
        if (v === null || v === "") next.delete(k)
        else next.set(k, v)
      })
      // Обязательно сохраняем section
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
          {filtered.slice(0, visibleCount).map((item, idx) => (
            <div
              key={`${item.subcategory ?? "item"}-${item.id}-${idx}`}
              className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-110"
              onClick={() => { window._catalogScrollY = window.scrollY; setModal(item) }}
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
      {filtered.length > visibleCount && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setVisibleCount((prev) => prev + 50)}
            className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            Показать следующие наборы ({filtered.length - visibleCount} шт.)
          </button>
        </div>
      )}

      {modal && (
        <CompositionModal
          modal={modal}
          allItems={filtered}
          onNavigate={(item) => {
            const newIdx = filtered.findIndex(i => i.image === item.image)
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

function CompositionModal({ modal, allItems, onNavigate, onClose }: {
  modal: Composition
  allItems: Composition[]
  onNavigate: (item: Composition) => void
  onClose: () => void
}) {
  const idx = allItems.findIndex((i) => i.image === modal.image)
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

  // Запоминаем раздел в localStorage, восстанавливаем при потере URL
  useEffect(() => {
    if (section) {
      localStorage.setItem("catalog_section", section)
    }
  }, [section])

  useEffect(() => {
    if (!section) {
      const saved = localStorage.getItem("catalog_section")
      if (saved) {
        navigate(`/catalog?section=${saved}`, { replace: true })
      }
    }
  }, [])

  const renderContent = () => {
    if (section === "birthday") {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-16">
          <div className="flex items-center gap-4 mb-3">
            <button
              onClick={() => { localStorage.removeItem("catalog_section"); navigate("/catalog") }}
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
          <CompositionGrid key="birthday" items={allBirthdayCompositions} showSubcategoryBadge />
        </div>
      )
    }

    if (section === "discharge") {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-16">
          <button
            onClick={() => { localStorage.removeItem("catalog_section"); navigate("/catalog") }}
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
          <CompositionGrid key="discharge" items={compositions.discharge} showDischargeBadge />
        </div>
      )
    }

    if (section === "other") {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-16">
          <button
            onClick={() => { localStorage.removeItem("catalog_section"); navigate("/catalog") }}
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
      )
    }

    if (section === "custom") {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-16">
          <button
            onClick={() => { localStorage.removeItem("catalog_section"); navigate("/catalog") }}
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
      )
    }

    return (
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
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      {renderContent()}
      <Footer />
    </div>
  )
}