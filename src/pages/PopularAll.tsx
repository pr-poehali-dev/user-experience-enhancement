import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Icon from "@/components/ui/icon"
import { Footer } from "@/components/Footer"

const packages = [
  { id: 1, title: "Набор для девочки 1", category: "Для девочки", emoji: "👑", rating: "4.9", reviews: "128", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/9c99662e-bef5-4504-a623-e3bdc9ab36a3.jpg", highlights: ["Розовые", "Сиреневые", "Фольга"], price: "1 890 ₽" },
  { id: 2, title: "Набор для мужчины 1", category: "Для мужчины", emoji: "🎩", rating: "4.8", reviews: "94", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/66fd2a4c-a22c-4717-8995-bdd2ec581332.jpg", highlights: ["Синие", "Чёрные", "Серебро"], price: "2 290 ₽" },
  { id: 3, title: "Набор на выписку 1", category: "На выписку", emoji: "👶", rating: "5.0", reviews: "213", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/22d1e846-f3ed-4233-add8-b04c4757b1d6.png", highlights: ["Пастельные", "Звёзды", "Облачка"], price: "3 490 ₽" },
  { id: 4, title: "Набор для девушки 1", category: "Для девушки", emoji: "🌹", rating: "4.9", reviews: "156", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/c4801d79-dc90-4d7f-8763-42f85ecd49bf.jpg", highlights: ["Розовые", "Белые", "Сердечки"], price: "2 100 ₽" },
  { id: 5, title: "Набор для девушки 2", category: "Для девушки", emoji: "🌹", rating: "4.7", reviews: "89", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/3fd83284-b2ec-45ff-bd42-c6eb2cd87246.jpg", highlights: ["Пастель", "Компактный"], price: "990 ₽" },
  { id: 6, title: "Набор для мальчика 1", category: "Для мальчика", emoji: "🚀", rating: "4.8", reviews: "73", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/492be4c8-e1c9-4086-af13-a90da62cb5c5.jpg", highlights: ["Синие", "Серебро", "Звёзды"], price: "1 790 ₽" },
  { id: 7, title: "Набор для девушки 7", category: "Для девушки", emoji: "🌹", rating: "5.0", reviews: "187", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/6b5ed6c2-adbc-46f4-a8da-7c50eab42f8e.jpg", highlights: ["Баблс 60см", "Хром серебро", "Конфетти"], price: "4 230 ₽" },
  { id: 8, title: "Набор на выписку 2", category: "На выписку", emoji: "👶", rating: "4.9", reviews: "145", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b5beb1b2-88f2-4ca4-92d4-d597512dbd8a.png", highlights: ["Белые", "Голубые", "Нежные"], price: "1 590 ₽" },
  { id: 9, title: "Набор для мужчины 2", category: "Для мужчины", emoji: "🎩", rating: "4.8", reviews: "102", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/f5e51be1-3813-4c3c-ab24-38f23ad99861.jpg", highlights: ["Чёрные", "Золото", "Стиль"], price: "2 500 ₽" },
  { id: 10, title: "Набор для девочки 2", category: "Для девочки", emoji: "🎀", rating: "4.9", reviews: "118", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d05c932b-4339-475e-8233-c9868e8a2a6c.jpg", highlights: ["Фиолетовые", "Розовые", "Звёзды"], price: "2 000 ₽" },
  { id: 11, title: "Набор для девочки 3", category: "Для девочки", emoji: "🎀", rating: "5.0", reviews: "201", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/62cb939f-05f5-4e41-89b6-3504437129e0.jpg", highlights: ["Разноцветные", "Яркие"], price: "2 400 ₽" },
  { id: 12, title: "Набор для мужчины 3", category: "Для мужчины", emoji: "🎩", rating: "4.7", reviews: "67", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/01e7ae2d-2743-430b-a430-07f040a6c6dc.jpg", highlights: ["Серебро", "Белые", "Стиль"], price: "1 990 ₽" },
  { id: 13, title: "Набор для девушки 3", category: "Для девушки", emoji: "🌹", rating: "4.9", reviews: "176", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/dfe2ab59-e17a-44cf-800f-d64f8af0c606.jpg", highlights: ["Красные", "Сердечки", "Розы"], price: "2 800 ₽" },
  { id: 14, title: "Набор для мальчика 2", category: "Для мальчика", emoji: "🚀", rating: "4.8", reviews: "91", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/800dd386-d12f-4ad8-9efd-8f5ec69d18df.jpg", highlights: ["Голубые", "Белые", "Звёзды"], price: "1 690 ₽" },
  { id: 15, title: "Набор для девочки 4", category: "Для девочки", emoji: "🎀", rating: "4.9", reviews: "134", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/23a9c8fe-ef93-423b-8aca-7b5c0aebb6a1.jpg", highlights: ["Яркие", "Фольга", "Шик"], price: "2 300 ₽" },
  { id: 16, title: "Набор для девушки 4", category: "Для девушки", emoji: "🌹", rating: "4.8", reviews: "109", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/8f7c075c-87bf-476f-a6b8-629984c74a4a.jpg", highlights: ["Пастельные", "Розовые"], price: "1 500 ₽" },
  { id: 17, title: "Набор на выписку 3", category: "На выписку", emoji: "👶", rating: "5.0", reviews: "167", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/58820ce5-b53c-4276-afeb-c386a1b9b2d6.jpg", highlights: ["Голубые", "Белые", "Нежные"], price: "2 100 ₽" },
  { id: 18, title: "Набор для мужчины 4", category: "Для мужчины", emoji: "🎩", rating: "4.7", reviews: "78", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/b3bd6c91-c75c-4b53-a2eb-1f51d03b55fe.jpg", highlights: ["Красные", "Чёрные", "Стиль"], price: "1 890 ₽" },
  { id: 19, title: "Набор для девочки 5", category: "Для девочки", emoji: "🎀", rating: "4.9", reviews: "142", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/93df0c07-b260-4461-a39b-5d354e8dbe46.jpg", highlights: ["Розовые", "Фиолетовые"], price: "2 200 ₽" },
  { id: 20, title: "Набор для мужчины 5", category: "Для мужчины", emoji: "🎩", rating: "4.8", reviews: "85", image: "https://cdn.poehali.dev/projects/cd804f06-8b0b-4247-96bf-3eb513cea81f/bucket/d31b7e40-58dd-400d-8549-46b93da1df23.jpg", highlights: ["Чёрные", "Белые"], price: "1 290 ₽" },
]

type Pkg = typeof packages[0]

function PopularModal({ item, all, onNav, onClose }: {
  item: Pkg
  all: Pkg[]
  onNav: (p: Pkg) => void
  onClose: () => void
}) {
  const idx = all.findIndex(p => p.id === item.id)
  const hasPrev = idx > 0
  const hasNext = idx < all.length - 1

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm sm:p-4"
      onClick={onClose}
    >
      {/* Mobile */}
      <div
        className="sm:hidden w-full rounded-t-3xl overflow-hidden shadow-2xl bg-white flex flex-col"
        style={{ maxHeight: "92vh" }}
        onClick={e => e.stopPropagation()}
      >
        <div className="relative w-full flex-shrink-0" style={{ aspectRatio: "3/4", maxHeight: "55vh" }}>
          <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
          <button
            className="absolute top-3 right-3 z-10 w-9 h-9 bg-black/40 rounded-full flex items-center justify-center"
            onClick={onClose}
          >
            <Icon name="X" size={18} className="text-white" />
          </button>
          {all.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/40 text-white text-xs px-3 py-1 rounded-full">
              {idx + 1} / {all.length}
            </div>
          )}
          {hasPrev && (
            <button onClick={e => { e.stopPropagation(); onNav(all[idx-1]) }} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg">
              <Icon name="ChevronLeft" size={20} />
            </button>
          )}
          {hasNext && (
            <button onClick={e => { e.stopPropagation(); onNav(all[idx+1]) }} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg">
              <Icon name="ChevronRight" size={20} />
            </button>
          )}
        </div>
        <div className="p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{item.emoji}</span>
            <div>
              <h3 className="font-bold text-base">{item.title}</h3>
              <div className="text-orange-500 font-bold">{item.price}</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {item.highlights.map((h, i) => (
              <span key={i} className="text-xs bg-muted px-2.5 py-1 rounded-full">{h}</span>
            ))}
          </div>
          <div className="flex gap-2 pt-1">
            <a href="tel:+79885973303" className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-2.5 rounded-full font-semibold text-sm">
              <Icon name="Phone" size={14} /> Позвонить
            </a>
            <a href="https://wa.me/79885973303" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-2.5 rounded-full font-semibold text-sm">
              <Icon name="MessageSquare" size={14} /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div
        className="hidden sm:flex w-full max-w-4xl rounded-3xl overflow-hidden bg-white shadow-2xl"
        style={{ height: "80vh" }}
        onClick={e => e.stopPropagation()}
      >
        <div className="relative w-1/2 flex-shrink-0">
          <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
          {hasPrev && (
            <button onClick={e => { e.stopPropagation(); onNav(all[idx-1]) }} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white">
              <Icon name="ChevronLeft" size={22} />
            </button>
          )}
          {hasNext && (
            <button onClick={e => { e.stopPropagation(); onNav(all[idx+1]) }} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white">
              <Icon name="ChevronRight" size={22} />
            </button>
          )}
          {all.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/40 text-white text-xs px-3 py-1 rounded-full">
              {idx + 1} / {all.length}
            </div>
          )}
        </div>
        <div className="flex-1 flex flex-col p-8 gap-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{item.emoji}</span>
              <div>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{item.category}</span>
                <h3 className="text-xl font-bold mt-1">{item.title}</h3>
              </div>
            </div>
            <button onClick={onClose} className="w-9 h-9 bg-muted rounded-full flex items-center justify-center hover:bg-muted/80">
              <Icon name="X" size={18} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            {[1,2,3,4,5].map(s => (
              <span key={s} style={{ color: "#f97316", fontSize: 18 }}>★</span>
            ))}
            <span className="text-sm font-semibold">{item.rating}</span>
            <span className="text-sm text-muted-foreground">({item.reviews} отзывов)</span>
          </div>
          <div className="text-3xl font-bold text-orange-500">{item.price}</div>
          <div className="flex flex-wrap gap-2">
            {item.highlights.map((h, i) => (
              <span key={i} className="text-sm bg-muted px-3 py-1 rounded-full">{h}</span>
            ))}
          </div>
          <div className="mt-auto flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">Напишите нам номер набора, поможем с заказом и доставкой</p>
            <div className="flex gap-2">
              <a href="tel:+79885973303" className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-full font-semibold">
                <Icon name="Phone" size={16} /> 8 988 597 33 03
              </a>
              <a href="https://wa.me/79885973303" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-full font-semibold">
                <Icon name="MessageSquare" size={16} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PopularAll() {
  const navigate = useNavigate()
  const [modal, setModal] = useState<Pkg | null>(null)

  return (
    <main className="min-h-screen pt-[clamp(60px,7.5vw,86px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors text-sm"
        >
          <Icon name="ArrowLeft" size={16} /> На главную
        </button>

        <h1 className="text-3xl sm:text-5xl font-light tracking-tight mb-2">
          Популярные <span className="font-semibold" style={{ color: "#f97316" }}>наборы</span>
        </h1>
        <p className="text-base text-muted-foreground mb-8">Самые любимые композиции наших покупателей</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="group cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 bg-white"
              onClick={() => setModal(pkg)}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full">
                  <span style={{ color: "#f97316", fontSize: 12 }}>★</span>
                  <span className="text-xs font-semibold">{pkg.rating}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-3 sm:p-4">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-lg">{pkg.emoji}</span>
                  <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">{pkg.category}</span>
                </div>
                <h3 className="text-sm font-semibold leading-tight mb-2">{pkg.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-orange-500">{pkg.price}</span>
                  <button className="text-xs bg-primary text-white px-3 py-1.5 rounded-full font-medium">
                    Заказать
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modal && (
        <PopularModal
          item={modal}
          all={packages}
          onNav={setModal}
          onClose={() => setModal(null)}
        />
      )}

      <Footer />
    </main>
  )
}
