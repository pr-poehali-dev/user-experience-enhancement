import { useState } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import Icon from "@/components/ui/icon"

const birthdaySubcategories = [
  { id: "girl", label: "Для девушки", emoji: "💕", color: "from-pink-400 to-rose-500" },
  { id: "man", label: "Для мужчины", emoji: "🎩", color: "from-blue-500 to-blue-700" },
  { id: "boy", label: "Для мальчика", emoji: "🚀", color: "from-cyan-400 to-blue-500" },
  { id: "kid-girl", label: "Для девочки", emoji: "👑", color: "from-purple-400 to-pink-500" },
]

const compositions: Record<string, { id: number; image: string; title: string; description: string; price: string }[]> = {
  girl: [
    { id: 1, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Букет «Нежность»", description: "Розовые и белые шары с фольгированными сердечками. Идеально для романтичного дня рождения.", price: "от 1 490 ₽" },
    { id: 2, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Букет «Принцесса»", description: "Сиреневые и золотые шары с фольгированной короной. Для настоящей принцессы.", price: "от 1 890 ₽" },
    { id: 3, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Облако «Розовая мечта»", description: "Большая облачная композиция из розовых шаров разных размеров.", price: "от 2 200 ₽" },
    { id: 4, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Арка «Фламинго»", description: "Яркая арка из розовых, коралловых и белых шаров для фотозоны.", price: "от 3 500 ₽" },
    { id: 5, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Цифра «25»", description: "Фольгированная цифра на ваш возраст в розово-золотом оформлении.", price: "от 990 ₽" },
    { id: 6, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Композиция «Весна»", description: "Нежные пастельные шары с живыми цветами и атласными лентами.", price: "от 2 800 ₽" },
  ],
  man: [
    { id: 1, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Букет «Стиль»", description: "Синие, чёрные и серебряные шары — строго и стильно.", price: "от 1 690 ₽" },
    { id: 2, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Набор «Джентльмен»", description: "Тёмно-синие шары с золотыми звёздами и фольгированными цифрами.", price: "от 2 290 ₽" },
    { id: 3, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Арка «Синяя волна»", description: "Арка из синих и серебряных шаров — эффектная фотозона.", price: "от 3 200 ₽" },
    { id: 4, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Цифра «40»", description: "Большая фольгированная цифра в синем и золотом цвете.", price: "от 990 ₽" },
  ],
  boy: [
    { id: 1, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Букет «Супергерой»", description: "Яркие синие и красные шары с фольгированными звёздами.", price: "от 1 290 ₽" },
    { id: 2, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Набор «Космонавт»", description: "Синие и серебряные шары с ракетами и звёздами — для маленького исследователя.", price: "от 1 890 ₽" },
    { id: 3, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Арка «Гонки»", description: "Красно-синяя арка с машинками для юного гонщика.", price: "от 2 900 ₽" },
    { id: 4, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/e181a691-cf65-4ea5-b27d-18453bd9656d.jpg", title: "Цифра «5»", description: "Яркая цифра пять в синих и зелёных тонах.", price: "от 890 ₽" },
  ],
  "kid-girl": [
    { id: 1, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Букет «Единорог»", description: "Розовые, белые и сиреневые шары с единорогом — сказочный набор.", price: "от 1 490 ₽" },
    { id: 2, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Арка «Фея»", description: "Нежная арка из лиловых и розовых шаров с фольгированными звёздами.", price: "от 2 800 ₽" },
    { id: 3, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Набор «Барби»", description: "Ярко-розовые шары с надписями и сердечками.", price: "от 1 690 ₽" },
    { id: 4, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/6e06a4e4-06f7-40ba-8231-248d6ee7fa9c.jpg", title: "Цифра «7»", description: "Розово-золотая цифра семь для маленькой принцессы.", price: "от 890 ₽" },
  ],
  discharge: [
    { id: 1, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/30158ce7-cc58-475e-9f95-85bc8e9f0376.jpg", title: "Встреча мальчика", description: "Нежно-голубые и белые шары с надписью «Это мальчик!» и звёздочками.", price: "от 2 490 ₽" },
    { id: 2, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/30158ce7-cc58-475e-9f95-85bc8e9f0376.jpg", title: "Встреча девочки", description: "Розовые и мятные шары с сердечками и надписью «Это девочка!».", price: "от 2 490 ₽" },
    { id: 3, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/30158ce7-cc58-475e-9f95-85bc8e9f0376.jpg", title: "Облако «Малыш»", description: "Большая облачная композиция из пастельных шаров — нежно и воздушно.", price: "от 3 200 ₽" },
    { id: 4, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/30158ce7-cc58-475e-9f95-85bc8e9f0376.jpg", title: "Сюрприз-бокс", description: "Коробка с шарами, которые вылетают при открытии — незабываемый момент!", price: "от 1 890 ₽" },
    { id: 5, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/30158ce7-cc58-475e-9f95-85bc8e9f0376.jpg", title: "Арка «Первый вдох»", description: "Нежная арка из шаров у входа роддома — встречаем по-королевски.", price: "от 4 500 ₽" },
    { id: 6, image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/files/30158ce7-cc58-475e-9f95-85bc8e9f0376.jpg", title: "Набор «Звёздочка»", description: "Жёлтые и белые шары со звёздами — для самого яркого появления на свет.", price: "от 1 990 ₽" },
  ],
}

type ModalItem = { image: string; title: string; description: string; price: string } | null

function CompositionGrid({ categoryId }: { categoryId: string }) {
  const [modal, setModal] = useState<ModalItem>(null)
  const items = compositions[categoryId] || []

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
            onClick={() => setModal(item)}
          >
            <img src={item.image} alt={item.title} className="w-full aspect-square object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white text-sm font-semibold">{item.title}</p>
              <p className="text-white/80 text-xs">{item.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setModal(null)}
        >
          <div
            className="bg-white rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img src={modal.image} alt={modal.title} className="w-full aspect-square object-cover" />
              <button
                className="absolute top-4 right-4 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow"
                onClick={() => setModal(null)}
              >
                <Icon name="X" size={18} />
              </button>
            </div>
            <div className="p-6 space-y-3">
              <h3 className="text-xl font-semibold">{modal.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{modal.description}</p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-lg font-bold text-primary">{modal.price}</span>
                <button className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors">
                  Заказать
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default function Catalog() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const section = searchParams.get("section") // "birthday" | "discharge"
  const sub = searchParams.get("sub") // "girl" | "man" | "boy" | "kid-girl"

  // Уровень 3: сетка композиций
  if (section === "birthday" && sub) {
    const found = birthdaySubcategories.find((c) => c.id === sub)
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-16">
          <button
            onClick={() => navigate("/catalog?section=birthday")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <Icon name="ArrowLeft" size={18} /> Назад
          </button>
          <h1 className="text-4xl md:text-5xl font-semibold mb-2">
            {found?.emoji} {found?.label}
          </h1>
          <p className="text-muted-foreground mb-10">День рождения · Выберите композицию</p>
          <CompositionGrid categoryId={sub} />
        </div>
        <Footer />
      </div>
    )
  }

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
          <CompositionGrid categoryId="discharge" />
        </div>
        <Footer />
      </div>
    )
  }

  // Уровень 2: подкатегории дня рождения
  if (section === "birthday") {
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
          <h1 className="text-4xl md:text-5xl font-semibold mb-2">🎂 На день рождения</h1>
          <p className="text-muted-foreground mb-12">Для кого делаем праздник?</p>
          <div className="grid grid-cols-2 gap-6 max-w-2xl">
            {birthdaySubcategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate(`/catalog?section=birthday&sub=${cat.id}`)}
                className={`group relative rounded-3xl overflow-hidden aspect-square bg-gradient-to-br ${cat.color} flex flex-col items-center justify-center gap-3 shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300`}
              >
                <span className="text-6xl">{cat.emoji}</span>
                <span className="text-white text-xl font-semibold">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Уровень 1: главная страница каталога
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
          {/* День рождения */}
          <button
            onClick={() => navigate("/catalog?section=birthday")}
            className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-pink-400 via-rose-400 to-purple-500 min-h-[400px] flex flex-col items-center justify-center gap-4 shadow-xl hover:scale-[1.02] hover:shadow-2xl transition-all duration-400 p-8"
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            <span className="relative text-8xl">🎂</span>
            <div className="relative text-center">
              <h2 className="text-white text-4xl font-bold mb-2">На день рождения</h2>
              <p className="text-white/80 text-lg">Для девушки, мужчины, мальчика и девочки</p>
            </div>
            <div className="relative flex items-center gap-2 text-white/90 text-sm font-medium mt-2">
              Смотреть разделы <Icon name="ArrowRight" size={18} />
            </div>
          </button>

          {/* Выписка */}
          <button
            onClick={() => navigate("/catalog?section=discharge")}
            className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-sky-300 via-blue-400 to-indigo-500 min-h-[400px] flex flex-col items-center justify-center gap-4 shadow-xl hover:scale-[1.02] hover:shadow-2xl transition-all duration-400 p-8"
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
